import React from 'react';

interface CardProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ onClick, className, children }) => {
  const baseClasses = "bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300";
  const interactiveClasses = onClick ? "hover:shadow-2xl hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-orange/50" : "";

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      className={`${baseClasses} ${interactiveClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;