import React, { useState } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="px-3 py-2 rounded-md text-lg font-medium text-brand-dark hover:bg-brand-orange/20 transition-colors duration-300"
  >
    {children}
  </a>
);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = (
        <>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#avatars">Avatars</NavLink>
            <NavLink href="#stories">Stories</NavLink>
            <NavLink href="#activities">Activities</NavLink>
            <NavLink href="#videos">Videos</NavLink>
        </>
    );

    return (
        <header className="bg-brand-light/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
                <div className="flex items-center justify-between h-20">
                    <a href="#home" className="flex items-center">
                         <span className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-orange">
                            Devi for Kids
                         </span>
                    </a>
                    <div className="hidden md:flex items-center space-x-2">
                        {links}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:bg-brand-orange/20 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden pb-4" id="mobile-menu">
                        <div className="flex flex-col items-start space-y-2">
                           {links}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;