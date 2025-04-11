
import { useState } from 'react';
import { PacFormStepper } from '@/components/pac/PacFormStepper';
import { GeneralInfoStep, GeneralInfoFormValues } from '@/components/pac/steps/GeneralInfoStep';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/apiService';

// Import other steps as they are created

const PacSubmissionPage = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    generalInfo: undefined,
    teamDetails: undefined,
    accessMatrix: undefined,
    softwareUtilities: undefined,
    securityChecklist: undefined,
    customChecklist: undefined,
  });

  // Handle step navigation
  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  // Save form data for each step
  const saveGeneralInfo = (data: GeneralInfoFormValues) => {
    setFormData({ ...formData, generalInfo: data });
    handleNext();
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Submit to backend API
      await api.post('/pac', formData);
      
      toast({
        title: "PAC Submitted Successfully",
        description: "Your PAC has been submitted for review.",
      });
      
      // Redirect to PAC list or dashboard
      // navigate('/pac/list');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred during submission",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the appropriate step
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <GeneralInfoStep 
          defaultValues={formData.generalInfo} 
          onSaveData={saveGeneralInfo} 
        />;
      case 1:
        // Will render TeamDetailsStep when created
        return <div>Team Details Step (To be implemented)</div>;
      case 2:
        // Will render AccessMatrixStep when created
        return <div>Access Matrix Step (To be implemented)</div>;
      case 3:
        // Will render SoftwareUtilitiesStep when created
        return <div>Software Utilities Step (To be implemented)</div>;
      case 4:
        // Will render SecurityChecklistStep when created
        return <div>Security Checklist Step (To be implemented)</div>;
      case 5:
        // Will render CustomChecklistStep when created
        return <div>Custom Checklist Step (To be implemented)</div>;
      case 6:
        // Will render ReviewStep when created
        return <div>Review & Submit Step (To be implemented)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">PAC Submission Form</h1>
        <p className="text-muted-foreground mt-2">
          Complete all steps to submit your Project Access Control request
        </p>
      </div>
      
      <div className="mb-8">
        <PacFormStepper 
          activeStep={activeStep}
          totalSteps={7}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isNextDisabled={isNextDisabled}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {renderStep()}
      </div>
    </div>
  );
};

export default PacSubmissionPage;
