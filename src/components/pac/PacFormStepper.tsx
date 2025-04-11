
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  CircleDot,
  Users,
  Key,
  Package,
  ShieldCheck,
  ClipboardCheck,
  Send
} from 'lucide-react';

interface StepProps {
  activeStep: number;
  index: number;
  label: string;
  icon: React.ReactNode;
}

const Step = ({ activeStep, index, label, icon }: StepProps) => {
  const isActive = activeStep === index;
  const isCompleted = activeStep > index;

  return (
    <div className={`flex items-center ${isActive ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full
        ${isActive ? 'bg-primary text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}
      `}>
        {isCompleted ? <CheckCircle className="h-5 w-5" /> : icon}
      </div>
      <span className="ml-2 text-sm font-medium">
        {label}
      </span>
    </div>
  );
};

interface PacFormStepperProps {
  activeStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isNextDisabled?: boolean;
}

export const PacFormStepper = ({ 
  activeStep, 
  totalSteps, 
  onNext, 
  onBack, 
  onSubmit,
  isSubmitting = false,
  isNextDisabled = false
}: PacFormStepperProps) => {
  const steps = [
    { label: 'General Info', icon: <CircleDot className="h-4 w-4" /> },
    { label: 'Team Details', icon: <Users className="h-4 w-4" /> },
    { label: 'Access Matrix', icon: <Key className="h-4 w-4" /> },
    { label: 'Software Utilities', icon: <Package className="h-4 w-4" /> },
    { label: 'Security Checklist', icon: <ShieldCheck className="h-4 w-4" /> },
    { label: 'Custom Checklist', icon: <ClipboardCheck className="h-4 w-4" /> },
    { label: 'Review & Submit', icon: <Send className="h-4 w-4" /> }
  ];

  return (
    <div className="w-full">
      {/* Desktop stepper */}
      <div className="hidden md:flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <Step 
              activeStep={activeStep} 
              index={index} 
              label={step.label} 
              icon={step.icon} 
            />
            {index < steps.length - 1 && (
              <div className={`h-0.5 w-24 mt-3 ${activeStep > index ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile stepper */}
      <div className="md:hidden mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`h-1 flex-1 ${
                index < activeStep
                  ? 'bg-green-500'
                  : index === activeStep
                  ? 'bg-primary'
                  : 'bg-gray-200'
              } ${index !== 0 ? 'ml-1' : ''}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Step {activeStep + 1} of {totalSteps}
          </div>
          <div className="text-sm font-medium">
            {steps[activeStep].label}
          </div>
        </div>
      </div>
      
      {/* Stepper navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={activeStep === 0}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        
        {activeStep === totalSteps - 1 ? (
          <Button 
            onClick={onSubmit} 
            disabled={isSubmitting || isNextDisabled}
            className="flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit PAC <Send className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button 
            onClick={onNext} 
            disabled={isNextDisabled}
            className="flex items-center"
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
