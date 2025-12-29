-- Microseasons Generator Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  generations_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. MICROSEASON SETS TABLE (72-season collections)
-- ============================================
CREATE TABLE IF NOT EXISTS public.microseason_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Location data
  location_name TEXT NOT NULL,
  city TEXT,
  region TEXT,
  country TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT,

  -- Metadata
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  share_slug TEXT UNIQUE,

  -- Generation metadata
  generation_prompt JSONB,
  climate_type TEXT,
  cultural_notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. CUSTOM SEASONS TABLE (individual seasons)
-- ============================================
CREATE TABLE IF NOT EXISTS public.custom_seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id UUID REFERENCES public.microseason_sets(id) ON DELETE CASCADE NOT NULL,

  -- Season data
  season_number INTEGER NOT NULL CHECK (season_number >= 1 AND season_number <= 72),
  name_local TEXT NOT NULL,
  name_english TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Dates
  start_month INTEGER NOT NULL CHECK (start_month >= 1 AND start_month <= 12),
  start_day INTEGER NOT NULL CHECK (start_day >= 1 AND start_day <= 31),
  end_month INTEGER NOT NULL CHECK (end_month >= 1 AND end_month <= 12),
  end_day INTEGER NOT NULL CHECK (end_day >= 1 AND end_day <= 31),

  -- Visual data
  colors JSONB NOT NULL DEFAULT '[]',
  imagery JSONB NOT NULL DEFAULT '[]',
  solar_term TEXT,

  -- Edit tracking
  is_edited BOOLEAN DEFAULT false,
  original_ai_response JSONB,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure unique season numbers within a set
  UNIQUE(set_id, season_number)
);

-- ============================================
-- 4. GENERATION LOGS TABLE (for analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS public.generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  set_id UUID REFERENCES public.microseason_sets(id) ON DELETE SET NULL,

  location_name TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  tokens_used INTEGER,
  generation_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.microseason_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Microseason sets policies
CREATE POLICY "Users can view own sets" ON public.microseason_sets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public sets" ON public.microseason_sets
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert own sets" ON public.microseason_sets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sets" ON public.microseason_sets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sets" ON public.microseason_sets
  FOR DELETE USING (auth.uid() = user_id);

-- Custom seasons policies
CREATE POLICY "Users can view seasons of own sets" ON public.custom_seasons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.microseason_sets
      WHERE id = custom_seasons.set_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view seasons of public sets" ON public.custom_seasons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.microseason_sets
      WHERE id = custom_seasons.set_id
      AND is_public = true
    )
  );

CREATE POLICY "Users can insert seasons to own sets" ON public.custom_seasons
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.microseason_sets
      WHERE id = custom_seasons.set_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update seasons of own sets" ON public.custom_seasons
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.microseason_sets
      WHERE id = custom_seasons.set_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete seasons of own sets" ON public.custom_seasons
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.microseason_sets
      WHERE id = custom_seasons.set_id
      AND user_id = auth.uid()
    )
  );

-- Generation logs policies
CREATE POLICY "Users can view own logs" ON public.generation_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON public.generation_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 6. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_microseason_sets_user_id ON public.microseason_sets(user_id);
CREATE INDEX IF NOT EXISTS idx_microseason_sets_share_slug ON public.microseason_sets(share_slug);
CREATE INDEX IF NOT EXISTS idx_microseason_sets_is_public ON public.microseason_sets(is_public);
CREATE INDEX IF NOT EXISTS idx_custom_seasons_set_id ON public.custom_seasons(set_id);
CREATE INDEX IF NOT EXISTS idx_generation_logs_user_id ON public.generation_logs(user_id);

-- ============================================
-- 7. FUNCTIONS & TRIGGERS
-- ============================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate unique share slug
CREATE OR REPLACE FUNCTION public.generate_share_slug()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_microseason_sets_updated_at
  BEFORE UPDATE ON public.microseason_sets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_custom_seasons_updated_at
  BEFORE UPDATE ON public.custom_seasons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- 8. GRANT PERMISSIONS
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
