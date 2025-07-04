import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '', 
  style,
  variant = 'primary',
  href
}) => {
  const baseClasses = 'inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-lg text-base sm:text-lg font-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50';
  
  const variantClasses = {
    primary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    secondary: 'bg-card border border-border text-foreground hover:bg-muted/10',
    outline: 'bg-transparent border border-current text-foreground hover:bg-muted/10'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link
        to={href}
        className={buttonClasses}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
