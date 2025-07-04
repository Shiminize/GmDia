import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Heart, CheckCircle } from 'lucide-react';

interface QuizData {
  vibe: string;
  setting: string;
  shape: string;
  metal: string;
  sustainability: string;
  budget: string;
}

interface QuizStep {
  id: number;
  title: string;
  subtitle?: string;
}

const RingQuizPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    vibe: '',
    setting: '',
    shape: '',
    metal: '',
    sustainability: '',
    budget: ''
  });
  const [showResults, setShowResults] = useState(false);

  const steps: QuizStep[] = [
    { id: 1, title: "What's your vibe in one word?", subtitle: "Let's discover your personal style" },
    { id: 2, title: "Which ring setting speaks to you?", subtitle: "Choose the setting that catches your eye" },
    { id: 3, title: "What shape diamond do you love most?", subtitle: "Every shape tells a different story" },
    { id: 4, title: "What's your ideal metal tone?", subtitle: "The perfect complement to your style" },
    { id: 5, title: "How important is sustainability to you?", subtitle: "Help us understand your values" },
    { id: 6, title: "What's your budget range?", subtitle: "We'll find beautiful options within your range" }
  ];

  const vibeOptions = [
    { value: 'Minimalist', icon: '✨', label: 'Minimalist', description: 'Clean, simple, elegant' },
    { value: 'Glamorous', icon: '💎', label: 'Glamorous', description: 'Bold, sparkly, statement' },
    { value: 'Natural', icon: '🌿', label: 'Natural', description: 'Organic, earth-inspired' },
    { value: 'Edgy', icon: '🖤', label: 'Edgy', description: 'Modern, unique, bold' },
    { value: 'Romantic', icon: '🧡', label: 'Romantic', description: 'Soft, feminine, classic' }
  ];

  const settingOptions = [
    { value: 'Solitaire', label: 'Solitaire', description: 'Single diamond, timeless elegance', image: '/ringsettings/Solitaire_quiz.jpeg.webp' },
    { value: 'Halo', label: 'Halo', description: 'Center stone surrounded by smaller diamonds', image: '/ringsettings/Halo_quiz.jpeg.webp' },
    { value: 'Three-stone', label: 'Three-stone', description: 'Past, present, future symbolism', image: '/ringsettings/threestone_quiz.jpeg.webp' },
    { value: 'Vintage', label: 'Vintage', description: 'Intricate details, old-world charm', image: '/ringsettings/vintage_quiz.jpeg.webp' },
    { value: 'Hidden Halo', label: 'Hidden Halo', description: 'Subtle sparkle, modern twist', image: '/ringsettings/hiddenhalo_quiz.jpeg.webp' }
  ];

  const shapeOptions = [
    { value: 'Round', label: 'Round', description: 'Classic brilliance', image: '/diamondshape/round.jpeg.webp' },
    { value: 'Oval', label: 'Oval', description: 'Elongated elegance', image: '/diamondshape/oval.jpeg.webp' },
    { value: 'Emerald', label: 'Emerald', description: 'Sophisticated step cut', image: '/diamondshape/emerald.jpeg.webp' },
    { value: 'Pear', label: 'Pear', description: 'Unique teardrop shape', image: '/diamondshape/pear.jpeg.webp' },
    { value: 'Cushion', label: 'Cushion', description: 'Vintage-inspired curves', image: '/diamondshape/cushion.jpeg.webp' },
    { value: 'Princess', label: 'Princess', description: 'Modern square cut', image: '/diamondshape/princess.jpeg.webp' }
  ];

  const metalOptions = [
    { value: 'Yellow Gold', label: 'Yellow Gold', description: 'Warm, traditional luxury' },
    { value: 'White Gold', label: 'White Gold', description: 'Modern, versatile elegance' },
    { value: 'Rose Gold', label: 'Rose Gold', description: 'Romantic, contemporary warmth' },
    { value: 'Platinum', label: 'Platinum', description: 'Rare, durable, prestigious' },
    { value: 'Not Sure', label: 'Not Sure Yet', description: 'We\'ll help you decide' }
  ];

  const sustainabilityOptions = [
    { value: 'Very Important', icon: '💯', label: 'Very important', description: 'Sustainability is a priority' },
    { value: 'Somewhat Important', icon: '💚', label: 'Somewhat important', description: 'I care but it\'s not everything' },
    { value: 'Just Learning', icon: '🤔', label: 'Just learning', description: 'Tell me more about it' },
    { value: 'Not Important', icon: '🤷', label: 'Not important', description: 'Not a deciding factor for me' }
  ];

  const budgetOptions = [
    { value: 'under-1000', label: 'Under $1,000', description: 'Beautiful starter options' },
    { value: '1000-2500', label: '$1,000–$2,500', description: 'Quality and value' },
    { value: '2500-5000', label: '$2,500–$5,000', description: 'Premium selection' },
    { value: '5000+', label: '$5,000+', description: 'Luxury collection' },
    { value: 'not-sure', label: 'Not sure yet', description: 'Show me all options' }
  ];

  const handleInputChange = (field: keyof QuizData, value: string) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const getResultMessage = () => {
    const { vibe, setting, shape, metal, sustainability } = quizData;
    return `Based on your ${vibe.toLowerCase()} style, ${setting.toLowerCase()} setting preference, and love for ${shape.toLowerCase()} diamonds in ${metal.toLowerCase()}, we've found the perfect matches for you!`;
  };

  const renderVibeStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vibeOptions.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              quizData.vibe === option.value
                ? 'border-blush bg-blush/10 shadow-md'
                : 'border-champagne hover:border-blush/50'
            }`}
          >
            <input
              type="radio"
              name="vibe"
              value={option.value}
              checked={quizData.vibe === option.value}
              onChange={(e) => handleInputChange('vibe', e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-4xl mb-2">{option.icon}</div>
              <div className="font-medium text-graphite mb-1">{option.label}</div>
              <div className="text-sm text-graphite/70">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderSettingStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingOptions.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              quizData.setting === option.value
                ? 'border-blush bg-blush/10 shadow-md'
                : 'border-champagne hover:border-blush/50'
            }`}
          >
            <input
              type="radio"
              name="setting"
              value={option.value}
              checked={quizData.setting === option.value}
              onChange={(e) => handleInputChange('setting', e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="h-32 flex items-center justify-center mb-4">
                <img
                  src={option.image}
                  alt={option.label}
                  className="max-h-32 w-auto rounded-lg shadow-md object-cover border border-champagne bg-ivory"
                  loading="lazy"
                />
              </div>
              <div className="font-medium text-graphite mb-1">{option.label}</div>
              <div className="text-sm text-graphite/70">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderShapeStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shapeOptions.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              quizData.shape === option.value
                ? 'border-blush bg-blush/10 shadow-md'
                : 'border-champagne hover:border-blush/50'
            }`}
          >
            <input
              type="radio"
              name="shape"
              value={option.value}
              checked={quizData.shape === option.value}
              onChange={(e) => handleInputChange('shape', e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="h-24 flex items-center justify-center mb-3">
                <img
                  src={option.image}
                  alt={option.label}
                  className="max-h-24 w-auto rounded-lg shadow-md object-cover border border-champagne bg-ivory"
                  loading="lazy"
                />
              </div>
              <div className="font-medium text-graphite text-sm mb-1">{option.label}</div>
              <div className="text-xs text-graphite/70">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderMetalStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metalOptions.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              quizData.metal === option.value
                ? 'border-blush bg-blush/10 shadow-md'
                : 'border-champagne hover:border-blush/50'
            }`}
          >
            <input
              type="radio"
              name="metal"
              value={option.value}
              checked={quizData.metal === option.value}
              onChange={(e) => handleInputChange('metal', e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-medium text-graphite mb-1">{option.label}</div>
              <div className="text-sm text-graphite/70">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderSustainabilityStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sustainabilityOptions.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              quizData.sustainability === option.value
                ? 'border-blush bg-blush/10 shadow-md'
                : 'border-champagne hover:border-blush/50'
            }`}
          >
            <input
              type="radio"
              name="sustainability"
              value={option.value}
              checked={quizData.sustainability === option.value}
              onChange={(e) => handleInputChange('sustainability', e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-3xl mb-2">{option.icon}</div>
              <div className="font-medium text-graphite mb-1">{option.label}</div>
              <div className="text-sm text-graphite/70">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderBudgetStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetOptions.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              quizData.budget === option.value
                ? 'border-blush bg-blush/10 shadow-md'
                : 'border-champagne hover:border-blush/50'
            }`}
          >
            <input
              type="radio"
              name="budget"
              value={option.value}
              checked={quizData.budget === option.value}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-medium text-graphite mb-1">{option.label}</div>
              <div className="text-sm text-graphite/70">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="text-center space-y-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blush rounded-full mb-6">
                        <CheckCircle className="w-10 h-10 text-primary-foreground" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-graphite mb-4 font-primary">Your Perfect Ring Awaits!</h2>
        <p className="text-lg text-graphite/80 mb-8 max-w-2xl mx-auto">
          {getResultMessage()}
        </p>
      </div>

      <div className="bg-champagne/20 rounded-xl p-8 max-w-md mx-auto">
        <h3 className="text-xl font-medium text-graphite mb-4">Your Preferences</h3>
        <div className="space-y-2 text-sm text-graphite/80">
          <div><strong>Style:</strong> {quizData.vibe}</div>
          <div><strong>Setting:</strong> {quizData.setting}</div>
          <div><strong>Shape:</strong> {quizData.shape}</div>
          <div><strong>Metal:</strong> {quizData.metal}</div>
          <div><strong>Sustainability:</strong> {quizData.sustainability}</div>
          {quizData.budget && <div><strong>Budget:</strong> {budgetOptions.find(opt => opt.value === quizData.budget)?.label}</div>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/products"
          className="bg-graphite text-ivory px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-graphite/90 hover:-translate-y-0.5"
        >
          View My Matches
        </Link>
        <button
          onClick={() => {
            setShowResults(false);
            setCurrentStep(1);
            setQuizData({
              vibe: '',
              setting: '',
              shape: '',
              metal: '',
              sustainability: '',
              budget: ''
            });
          }}
          className="bg-champagne text-graphite px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-champagne/90 hover:-translate-y-0.5"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );

  const getCurrentStepData = () => {
    switch (currentStep) {
      case 1: return quizData.vibe;
      case 2: return quizData.setting;
      case 3: return quizData.shape;
      case 4: return quizData.metal;
      case 5: return quizData.sustainability;
      case 6: return quizData.budget;
      default: return '';
    }
  };

  const isStepComplete = () => {
    return getCurrentStepData() !== '';
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-champagne py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {renderResults()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-champagne py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blush rounded-full mb-6">
                          <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-graphite mb-4 font-primary">
            Find Your Perfect Ring
          </h1>
          <p className="text-lg text-graphite/80 mb-8 max-w-2xl mx-auto">
            Let us help you discover the ring of your dreams with our personalized quiz
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-graphite/70">Progress</span>
              <span className="text-sm text-graphite/70">{currentStep} of {steps.length}</span>
            </div>
            <div className="w-full bg-champagne rounded-full h-2">
              <div
                className="bg-blush h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="bg-ivory rounded-xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-graphite mb-2 font-primary">
              {steps[currentStep - 1].title}
            </h2>
            {steps[currentStep - 1].subtitle && (
              <p className="text-graphite/70">{steps[currentStep - 1].subtitle}</p>
            )}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && renderVibeStep()}
            {currentStep === 2 && renderSettingStep()}
            {currentStep === 3 && renderShapeStep()}
            {currentStep === 4 && renderMetalStep()}
            {currentStep === 5 && renderSustainabilityStep()}
            {currentStep === 6 && renderBudgetStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-champagne/50 text-graphite/50 cursor-not-allowed'
                  : 'bg-champagne text-graphite hover:bg-champagne/90 hover:-translate-y-0.5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!isStepComplete()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isStepComplete()
                    ? 'bg-graphite text-ivory hover:bg-graphite/90 hover:-translate-y-0.5'
                    : 'bg-graphite/50 text-ivory/50 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepComplete()}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isStepComplete()
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:-translate-y-0.5'
                    : 'bg-secondary/50 text-secondary-foreground/50 cursor-not-allowed'
                }`}
              >
                <Heart className="w-4 h-4" />
                See My Ring Matches
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingQuizPage; 