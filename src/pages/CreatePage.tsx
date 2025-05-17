import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import Button from '../components/ui/Button';
import { TEMPLATES, TONE_OPTIONS, PRIVACY_OPTIONS } from '../config/constants';
import { createPage } from '../services/pageService';
import axiosInstance from '../services/axiosInstance';


// Step interfaces
interface ToneSelection {
  tone: string;
  context: string;
}

interface ContentCreation {
  title: string;
  message: string;
  media: File[];
}

interface TemplateSelection {
  templateId: string;
  primaryColor: string;
  backgroundColor: string;
}

interface PrivacySettings {
  privacy: string;
  customUrl: string;
  expiryDate: string;
}

const CreatePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data for each step
  const [toneData, setToneData] = useState<ToneSelection>({
    tone: '',
    context: '',
  });
  
  const [contentData, setContentData] = useState<ContentCreation>({
    title: '',
    message: '',
    media: [],
  });
  
  const [templateData, setTemplateData] = useState<TemplateSelection>({
    templateId: '',
    primaryColor: '#6D28D9',
    backgroundColor: '#ffffff',
  });
  
  const [privacyData, setPrivacyData] = useState<PrivacySettings>({
    privacy: 'public',
    customUrl: '',
    expiryDate: '',
  });
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
     try {
    const formData = new FormData();
    formData.append('tone', toneData.tone);
    formData.append('context', toneData.context);
    formData.append('title', contentData.title);
    formData.append('message', contentData.message);
    formData.append('template', templateData.templateId);
    formData.append('primary_color', templateData.primaryColor);
    formData.append('background_color', templateData.backgroundColor);
    formData.append('privacy', privacyData.privacy);
    formData.append('expiry_Date', privacyData.expiryDate);
    formData.append('status', "published");

    // Ajoute les fichiers médias
    contentData.media.forEach((file) => {
      formData.append('media', file);
    });

    // Appel API pour créer la page
    const createdPage = await createPage(formData);
    console.log('createdPage:', createdPage);
    const slug = createdPage.slug;
    console.log('Slug:', slug);

for (const file of contentData.media) {
  if (file.type.startsWith('image/')) {
    const mediaForm = new FormData();
    mediaForm.append('file', file);
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    mediaForm.append('file_type', ext);

    await axiosInstance.post(
      `/pages/${slug}/upload_media/`,
      mediaForm
    );
  }
}

    // Redirige vers la page créée (adapte selon ta route)
    navigate(`./ViewPage/${createdPage.id}`);
  } catch (error) {
    console.error('Error creating page:', error);
    setIsSubmitting(false);
  }
};
  
  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="mb-8 flex justify-center">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="flex items-center"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                step === currentStep
                  ? 'bg-primary-600 text-white'
                  : step < currentStep
                  ? 'bg-primary-200 text-primary-800 dark:bg-primary-800 dark:text-primary-200'
                  : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={`h-1 w-10 ${
                  step < currentStep
                    ? 'bg-primary-200 dark:bg-primary-800'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;
    if (!files) return;
    // Filter files to max 10MB and only images/videos
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (
        (file.type.startsWith('image/') || file.type.startsWith('video/')) &&
        file.size <= 10 * 1024 * 1024
      ) {
        validFiles.push(file);
      }
    }
    setContentData((prev) => ({
      ...prev,
      media: [...prev.media, ...validFiles],
    }));
    // Reset input so same file can be selected again if needed
    event.target.value = '';
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-center">Create Your Farewell Page</h1>
      
      {renderStepIndicators()}
      
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
      >
        {/* Step 1: Tone Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="mb-4">Choose Your Tone</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Select the emotional tone that best fits your farewell.
            </p>
            
            <div className="mb-6">
              <label className="mb-2 block font-medium">Tone</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TONE_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setToneData({ ...toneData, tone: option.value })}
                    className={`cursor-pointer rounded-lg border p-4 text-center transition-colors hover:border-primary-300 dark:hover:border-primary-600 ${
                      toneData.tone === option.value
                        ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="context" className="mb-2 block font-medium">
                What are you saying goodbye to?
              </label>
              <textarea
                id="context"
                rows={3}
                className="textarea w-full"
                placeholder="E.g., My job at Acme Corp, A relationship of 5 years, etc."
                value={toneData.context}
                onChange={(e) => setToneData({ ...toneData, context: e.target.value })}
              ></textarea>
            </div>
          </div>
        )}
        
        {/* Step 2: Content Creation */}
        {currentStep === 2 && (
          <div>
            <h2 className="mb-4">Create Your Message</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Express yourself with words and media.
            </p>
            
            <div className="mb-6">
              <label htmlFor="title" className="mb-2 block font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="input w-full"
                placeholder="E.g., Farewell Acme Corp!"
                value={contentData.title}
                onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="mb-2 block font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="textarea w-full"
                placeholder="Share your thoughts, feelings, and memories..."
                value={contentData.message}
                onChange={(e) => setContentData({ ...contentData, message: e.target.value })}
              ></textarea>
            </div>
            
            <div>
              <label className="mb-2 block font-medium">
                Add Media (optional)
              </label>
              <div className="mb-4 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-700">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop files, or{' '}
                    <button
                      type="button"
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      browse
                    </button>
                  </p>
                  
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Supports images, GIFs, and videos (max 10MB)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  {contentData.media.length > 0 && (
                    <div className="mt-2 text-xs text-gray-700 dark:text-gray-200">
                      {contentData.media.map((file, idx) => (
                        <div key={idx}>{file.name}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Template Selection */}
        {currentStep === 3 && (
          <div>
            <h2 className="mb-4">Choose a Template</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Select a design template for your farewell page.
            </p>
            
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setTemplateData({ ...templateData, templateId: template.id })}
                  className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-colors hover:border-primary-300 dark:hover:border-primary-600 ${
                    templateData.templateId === template.id
                      ? 'border-primary-500 dark:border-primary-400'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <label className="mb-2 block font-medium">
                Customize Colors
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primaryColor" className="mb-1 block text-sm">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    id="primaryColor"
                    value={templateData.primaryColor}
                    onChange={(e) => setTemplateData({ ...templateData, primaryColor: e.target.value })}
                    className="h-10 w-full cursor-pointer rounded border"
                  />
                </div>
                <div>
                  <label htmlFor="backgroundColor" className="mb-1 block text-sm">
                    Background Color
                  </label>
                  <input
                    type="color"
                    id="backgroundColor"
                    value={templateData.backgroundColor}
                    onChange={(e) => setTemplateData({ ...templateData, backgroundColor: e.target.value })}
                    className="h-10 w-full cursor-pointer rounded border"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Privacy Settings */}
        {currentStep === 4 && (
          <div>
            <h2 className="mb-4">Privacy & Sharing</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Control who can see your farewell page and how it's shared.
            </p>
            
            <div className="mb-6">
              <label className="mb-2 block font-medium">
                Privacy Level
              </label>
              <div className="space-y-3">
                {PRIVACY_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setPrivacyData({ ...privacyData, privacy: option.value })}
                    className={`cursor-pointer rounded-lg border p-4 transition-colors hover:border-primary-300 dark:hover:border-primary-600 ${
                      privacyData.privacy === option.value
                        ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={privacyData.privacy === option.value}
                        onChange={() => {}}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label className="ml-3">
                        <span className="block font-medium">{option.label}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="customUrl" className="mb-2 block font-medium">
                Custom URL (optional)
              </label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-700 dark:bg-gray-800">
                  theend.page/
                </span>
                <input
                  type="text"
                  id="customUrl"
                  className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
                  placeholder="your-custom-url"
                  value={privacyData.customUrl}
                  onChange={(e) => setPrivacyData({ ...privacyData, customUrl: e.target.value })}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Only letters, numbers, and hyphens are allowed.
              </p>
            </div>
            
            <div>
              <label htmlFor="expiryDate" className="mb-2 block font-medium">
                Page Expiry (optional)
              </label>
              <input
                type="date"
                id="expiryDate"
                className="input w-full"
                value={privacyData.expiryDate}
                onChange={(e) => setPrivacyData({ ...privacyData, expiryDate: e.target.value })}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Set a date when your page will automatically expire. Leave blank to keep indefinitely.
              </p>
            </div>
          </div>
        )}
      </motion.div>
      
      <div className="mt-6 flex justify-between">
        {currentStep > 1 ? (
          <Button
            variant="outline"
            onClick={handlePrevious}
            icon={<ArrowLeft size={16} />}
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 4 ? (
          <Button
            variant="primary"
            onClick={handleNext}
            icon={<ArrowRight size={16} />}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            icon={<Save size={16} />}
          >
            Create Page
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreatePage;