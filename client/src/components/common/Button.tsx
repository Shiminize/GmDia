import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'btn-' + variant;
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 sm:px-6 py-3 text-base',
    lg: 'px-6 sm:px-8 py-4 text-lg'
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// Example usage components for demonstration
export const ButtonExamples: React.FC = () => {
  return (
    <div className="p-8 space-y-6 bg-background text-foreground">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Enhanced Button Examples</h2>
        
        {/* Primary Buttons */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Primary Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">Small Primary</Button>
            <Button variant="primary" size="md">Medium Primary</Button>
            <Button variant="primary" size="lg">Large Primary</Button>
            <Button variant="primary" disabled>Disabled Primary</Button>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Secondary Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Secondary</Button>
            <Button variant="muted">Muted</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive Elements</h3>
          <div className="flex flex-wrap gap-3">
            <div className="card-luxury interactive-scale p-4 cursor-pointer">
              <p>Luxury Card with Scale Effect</p>
            </div>
            <div className="card-elevated interactive-fade p-4 cursor-pointer">
              <p>Elevated Card with Fade Effect</p>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Accessibility Features</h3>
          <div className="space-y-2">
            <Button variant="primary" className="focus-visible-ring">
              Focus Ring Button
            </Button>
            <input 
              type="text" 
              placeholder="Enhanced input field"
              className="input-field"
              aria-label="Example input with enhanced accessibility"
            />
          </div>
        </div>

        {/* Dark Mode Toggle Example */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Dark Mode Support</h3>
          <Button 
            variant="accent"
            onClick={() => {
              document.documentElement.classList.toggle('dark');
            }}
          >
            Toggle Dark Mode
          </Button>
          <p className="text-sm text-muted-foreground">
            Click to see the enhanced light/dark mode transitions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Button;
