import React from 'react';
import { render, screen } from '@testing-library/react';
import ThreeJSViewer from './ThreeJSViewer';

describe('ThreeJSViewer', () => {
  it('renders loading state initially', () => {
    render(<ThreeJSViewer />);
    
    // Check that the loading state is displayed
    expect(screen.getByText('Loading 3D Model')).toBeInTheDocument();
    expect(screen.getByText('Please wait while we prepare your jewelry preview...')).toBeInTheDocument();
  });

  it('shows loading spinner animation', () => {
    render(<ThreeJSViewer />);
    
    // Check that the loading spinner is present
    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();
    expect(loadingSpinner).toHaveClass('animate-spin');
  });

  it('has proper container dimensions', () => {
    render(<ThreeJSViewer />);
    
    // The container should have minimum height
    const container = screen.getByTestId('threejs-container');
    expect(container).toHaveStyle('min-height: 400px');
  });
}); 