'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import { useAuthStore } from '@/store/useAuthStore';
import { WIZARD_STEPS, STEP_TITLES, type WizardStep } from '@/types/generator';
import { LocationStep } from './steps/LocationStep';
import { ClimateStep } from './steps/ClimateStep';
import { CultureStep } from './steps/CultureStep';
import { PreviewStep } from './steps/PreviewStep';
import { ReviewStep } from './steps/ReviewStep';

interface StepIndicatorProps {
  steps: WizardStep[];
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  onStepClick: (step: WizardStep) => void;
  canNavigate: (step: WizardStep) => boolean;
}

function StepIndicator({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  canNavigate,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {steps.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = completedSteps.includes(step);
        const canClick = canNavigate(step);

        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => canClick && onStepClick(step)}
              disabled={!canClick}
              className={`
                flex items-center gap-2 px-4 py-2 text-sm transition-all duration-300
                ${canClick ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
              `}
              style={{
                color: isActive
                  ? 'var(--color-accent)'
                  : isCompleted
                    ? 'var(--color-textPrimary)'
                    : 'var(--color-textSecondary)',
              }}
            >
              {/* Step number/check */}
              <span
                className={`
                  w-6 h-6 flex items-center justify-center text-xs font-mono
                  border transition-all duration-300
                `}
                style={{
                  borderColor: isActive
                    ? 'var(--color-accent)'
                    : isCompleted
                      ? 'var(--color-sage)'
                      : 'var(--color-border)',
                  backgroundColor: isCompleted
                    ? 'var(--color-sage)'
                    : 'transparent',
                  color: isCompleted
                    ? 'white'
                    : isActive
                      ? 'var(--color-accent)'
                      : 'var(--color-textSecondary)',
                }}
              >
                {isCompleted ? '✓' : index + 1}
              </span>

              {/* Step label - hidden on mobile */}
              <span className="hidden sm:inline">{STEP_TITLES[step]}</span>
            </button>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className="w-8 h-px mx-1"
                style={{
                  backgroundColor: completedSteps.includes(steps[index + 1])
                    ? 'var(--color-sage)'
                    : 'var(--color-border)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function GeneratorWizard() {
  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    canNavigateToStep,
    markStepComplete,
    locationData,
    generatedSeasons,
  } = useGeneratorStore();

  const { user, openAuthModal } = useAuthStore();

  // Determine which steps to show (skip review if no seasons generated)
  const visibleSteps = generatedSeasons.length > 0
    ? WIZARD_STEPS
    : WIZARD_STEPS.filter((s) => s !== 'review');

  const handleNext = () => {
    markStepComplete(currentStep);
    const currentIndex = WIZARD_STEPS.indexOf(currentStep);
    if (currentIndex < WIZARD_STEPS.length - 1) {
      setCurrentStep(WIZARD_STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = WIZARD_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(WIZARD_STEPS[currentIndex - 1]);
    }
  };

  const handleStepClick = (step: WizardStep) => {
    if (canNavigateToStep(step)) {
      setCurrentStep(step);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{ backgroundColor: 'var(--color-bgPrimary)' }}
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1
            className="text-4xl lg:text-5xl font-serif mb-4"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            Create Your Microseasons
          </h1>
          <p
            className="text-lg"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Generate 72 unique seasons tailored to your location
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator
          steps={visibleSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
          canNavigate={canNavigateToStep}
        />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentStep === 'location' && (
              <LocationStep onNext={handleNext} />
            )}
            {currentStep === 'climate' && (
              <ClimateStep onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 'culture' && (
              <CultureStep onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 'preview' && (
              <PreviewStep
                onNext={handleNext}
                onBack={handleBack}
                isAuthenticated={!!user}
                onAuthRequired={() => openAuthModal('signup')}
              />
            )}
            {currentStep === 'review' && (
              <ReviewStep onBack={handleBack} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
