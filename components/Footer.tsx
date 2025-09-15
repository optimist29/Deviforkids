
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-light mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-display text-lg">
          Happy Navaratri! May the Devis bless you with joy and wisdom.
        </p>
        <p className="mt-2 text-sm opacity-70">
          &copy; {new Date().getFullYear()} Devi for Kids. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
