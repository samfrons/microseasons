'use server';

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';
import type { LocationData, GenerationPreferences, CustomSeason } from '@/types/generator';

// Streaming encoder for SSE
const encoder = new TextEncoder();

function createSSEMessage(data: object): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

// Generate the Claude prompt for microseasons
function buildPrompt(location: LocationData, preferences: GenerationPreferences): string {
  const seasonTypes = preferences.seasonTypes.join(', ');
  const weatherPatterns = preferences.weatherPatterns.length > 0
    ? `Notable weather patterns: ${preferences.weatherPatterns.join(', ')}.`
    : '';
  const festivals = preferences.festivals.length > 0
    ? `Local festivals and holidays: ${preferences.festivals.join(', ')}.`
    : '';
  const flora = preferences.flora.length > 0
    ? `Notable plants and trees: ${preferences.flora.join(', ')}.`
    : '';
  const fauna = preferences.fauna.length > 0
    ? `Notable wildlife: ${preferences.fauna.join(', ')}.`
    : '';
  const additionalNotes = preferences.additionalNotes
    ? `Additional context: ${preferences.additionalNotes}`
    : '';

  return `You are an expert in creating culturally-sensitive microseasons inspired by Japan's traditional 72 microseasons (sekki and ko). Your task is to generate 72 unique microseasons specifically tailored for ${location.city}, ${location.country}.

LOCATION DETAILS:
- City: ${location.city}
- Region: ${location.region || 'N/A'}
- Country: ${location.country}
- Coordinates: ${location.latitude}, ${location.longitude}

CLIMATE & ENVIRONMENT:
- Climate type: ${preferences.climateType}
- Seasons experienced: ${seasonTypes}
${weatherPatterns}

CULTURAL CONTEXT:
- Primary language for names: ${preferences.localLanguage}
- Emphasis: ${preferences.emphasis}
${festivals}
${flora}
${fauna}
${preferences.includeHolidays ? '- Include major holidays in descriptions where relevant.' : ''}
${additionalNotes}

INSTRUCTIONS:
Generate exactly 72 microseasons that span the entire year (approximately 5 days each). For each microseason, provide:

1. name_local: A poetic name in ${preferences.localLanguage} that captures the essence of that period
2. name_english: English translation/interpretation of the name
3. description: A 2-3 sentence evocative description of what makes this period special in ${location.city}
4. start_month: Month number (1-12)
5. start_day: Day of month (1-31)
6. end_month: Month number (1-12)
7. end_day: Day of month (1-31)
8. colors: Array of 3 hex color codes that represent this microseason's palette

The seasons should:
- Flow naturally through the year, capturing subtle transitions
- Reflect local ${preferences.emphasis === 'nature' ? 'natural phenomena, plant and animal behaviors' : preferences.emphasis === 'culture' ? 'cultural events, traditions, and celebrations' : preferences.emphasis === 'agriculture' ? 'farming cycles, harvest traditions, and agricultural rhythms' : 'environmental and lifestyle changes with a balanced perspective'}
- Be authentic to ${location.city}'s unique character
- Have poetic, memorable names

OUTPUT FORMAT:
Respond with a JSON array of 72 season objects. Each object must have exactly these fields:
{
  "season_number": 1,
  "name_local": "...",
  "name_english": "...",
  "description": "...",
  "start_month": 1,
  "start_day": 1,
  "end_month": 1,
  "end_day": 5,
  "colors": ["#hex1", "#hex2", "#hex3"]
}

Start with season 1 beginning January 1st and end with season 72 ending December 31st.

Generate all 72 seasons now:`;
}

export async function POST(request: NextRequest) {
  try {
    // Check for Anthropic API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { location, preferences } = body as {
      location: LocationData;
      preferences: GenerationPreferences;
    };

    if (!location || !preferences) {
      return NextResponse.json(
        { error: 'Missing location or preferences data' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check generation limits for free users
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier, generations_count')
      .eq('id', user.id)
      .single();

    if (profile && profile.subscription_tier === 'free' && profile.generations_count >= 1) {
      return NextResponse.json(
        { error: 'Free generation limit reached. Please upgrade to premium.' },
        { status: 403 }
      );
    }

    // Create the microseason set in database
    const { data: setData, error: setError } = await supabase
      .from('microseason_sets')
      .insert({
        user_id: user.id,
        location_name: `${location.city}, ${location.country}`,
        city: location.city,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
        title: `${location.city} Microseasons`,
        is_public: false,
      })
      .select()
      .single();

    if (setError) {
      console.error('Error creating microseason set:', setError);
      return NextResponse.json(
        { error: 'Failed to create microseason set' },
        { status: 500 }
      );
    }

    const setId = setData.id;

    // Initialize Anthropic client
    const anthropic = new Anthropic({ apiKey });

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial status
          controller.enqueue(createSSEMessage({
            status: 'Connecting to AI...',
            progress: 5
          }));

          const prompt = buildPrompt(location, preferences);

          // Call Claude API with streaming
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 16000,
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
          });

          controller.enqueue(createSSEMessage({
            status: 'Generating microseasons...',
            progress: 20
          }));

          // Extract the text content
          const textContent = response.content.find(block => block.type === 'text');
          if (!textContent || textContent.type !== 'text') {
            throw new Error('No text response from Claude');
          }

          const responseText = textContent.text;

          // Parse the JSON response
          // Find JSON array in the response
          const jsonMatch = responseText.match(/\[[\s\S]*\]/);
          if (!jsonMatch) {
            throw new Error('No valid JSON array found in response');
          }

          const seasons: CustomSeason[] = JSON.parse(jsonMatch[0]);

          if (!Array.isArray(seasons) || seasons.length !== 72) {
            throw new Error(`Expected 72 seasons, got ${seasons?.length || 0}`);
          }

          controller.enqueue(createSSEMessage({
            status: 'Saving microseasons...',
            progress: 60
          }));

          // Save seasons to database in batches
          const batchSize = 12;
          for (let i = 0; i < seasons.length; i += batchSize) {
            const batch = seasons.slice(i, i + batchSize).map((season, index) => ({
              set_id: setId,
              season_number: i + index + 1,
              name_local: season.name_local,
              name_english: season.name_english,
              description: season.description,
              start_month: season.start_month,
              start_day: season.start_day,
              end_month: season.end_month,
              end_day: season.end_day,
              colors: season.colors,
              is_edited: false,
            }));

            const { error: insertError } = await supabase
              .from('custom_seasons')
              .insert(batch);

            if (insertError) {
              console.error('Error inserting seasons batch:', insertError);
            }

            // Send progress and individual seasons
            const progress = 60 + Math.floor((i / seasons.length) * 35);
            for (const season of batch) {
              controller.enqueue(createSSEMessage({
                season: {
                  ...season,
                  season_number: season.season_number,
                },
                progress,
                status: `Saved season ${season.season_number}/72...`
              }));
            }
          }

          // Update user's generation count
          await supabase
            .from('profiles')
            .update({
              generations_count: (profile?.generations_count || 0) + 1
            })
            .eq('id', user.id);

          // Log the generation
          await supabase
            .from('generation_logs')
            .insert({
              user_id: user.id,
              set_id: setId,
              tokens_used: response.usage?.input_tokens + response.usage?.output_tokens || 0,
              model_used: 'claude-sonnet-4-20250514',
            });

          // Send completion
          controller.enqueue(createSSEMessage({
            complete: true,
            setId,
            status: 'Generation complete!',
            progress: 100
          }));

        } catch (error: unknown) {
          console.error('Generation error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Generation failed';
          controller.enqueue(createSSEMessage({
            error: errorMessage
          }));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: unknown) {
    console.error('API route error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
