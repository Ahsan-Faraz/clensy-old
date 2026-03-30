"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, X, Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollPosition(currentScrollPos);
      setVisible(true); // Always visible, Apple-style
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Don't close if clicking on dropdown buttons or dropdown content
      if (!target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Immediate page detection function
  const isWhiteBackgroundPage = () => {
    if (typeof window === 'undefined') return false;
    const whiteBackgroundPages = ['/booking', '/contact', '/about', '/faq'];
    return whiteBackgroundPages.includes(window.location.pathname);
  };

  const isWhiteBackground = isWhiteBackgroundPage();

  // Dynamic opacity with proper minimum for white background pages
  const bgOpacity = isWhiteBackground
    ? Math.max(0.85, Math.min(scrollPosition / 100, 0.98))
    : Math.max(0.1, Math.min(scrollPosition / 200, 0.95));

  // Enhanced border and shadow logic
  const shouldShowBorder = isWhiteBackground || scrollPosition > 50;
  const borderOpacity = isWhiteBackground ? 0.2 : 0.1;
  const shadowOpacity = isWhiteBackground ? 0.15 : 0.05;

  // Dynamic text color with proper contrast
  const textColor = scrollPosition > 100 || isWhiteBackground ? 'text-black' : 'text-white';

  // Dynamic logo filter
  const logoFilter = scrollPosition > 100 || isWhiteBackground ? '' : 'brightness(0) invert(1)';

  // Dynamic button styling
  const buttonBg = scrollPosition > 100 || isWhiteBackground ? 'bg-black text-white' : 'bg-white text-black';

  const toggleDropdown = (dropdown: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 !z-[9999999] transition-all duration-300"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: shouldShowBorder ? `1px solid rgba(0, 0, 0, ${borderOpacity})` : 'none',
          boxShadow: shouldShowBorder ? `0 2px 15px rgba(0, 0, 0, ${shadowOpacity})` : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Always left aligned */}
            <div className="flex-shrink-0 flex items-center h-full py-2">
              <a href="/" className="flex items-center h-full">
                <img
                  src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1754578702/x50aedpsjrpfubhn0d8b_-_Edited_cvx0kj.png"
                  alt="Clensy Logo"
                  style={{
                    objectFit: 'contain',
                    maxHeight: '100%',
                    filter: logoFilter,
                    transition: 'all 0.3s ease',
                    width: '110px',
                    height: '45px',
                  }}
                  className="transition-all duration-300 h-full w-auto max-w-32 sm:max-w-128"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {/* Services Dropdown */}
              <div className="relative dropdown group">
                <button className={`flex items-center ${textColor} hover:opacity-80 transition-opacity`}>
                  <span className="text-sm font-medium">Services</span>
                </button>
                <div className="dropdown-content apple-dropdown-content absolute left-1/2 transform -translate-x-1/2 mt-2 w-[500px] z-50 grid grid-cols-2 gap-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-lg p-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Residential</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="/services/routine-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Routine Cleaning
                        </a>
                      </li>
                      <li>
                        <a href="/services/deep-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Deep Cleaning
                        </a>
                      </li>
                      <li>
                        <a href="/services/moving-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Moving Cleaning
                        </a>
                      </li>
                      <li>
                        <a href="/services/post-construction-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Post Construction
                        </a>
                      </li>
                      <li>
                        <a href="/services/airbnb-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Airbnb Cleaning
                        </a>
                      </li>
                      <li>
                        <a href="/services/extras" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Extras
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Commercial</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="/services/office-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Offices & Corporate Buildings
                        </a>
                      </li>
                      <li>
                        <a href="/services/medical-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Medical & Healthcare Facilities
                        </a>
                      </li>
                      <li>
                        <a href="/services/retail-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Retail Stores
                        </a>
                      </li>
                      <li>
                        <a href="/services/gym-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Gyms & Fitness Centers
                        </a>
                      </li>
                      <li>
                        <a href="/services/school-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Schools & Childcare Facilities
                        </a>
                      </li>
                      <li>
                        <a href="/services/property-cleaning" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Property & Building Common Areas
                        </a>
                      </li>
                      <li>
                        <a href="/services/other-commercial" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Other Commercial Spaces
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Company Dropdown */}
              <div className="relative dropdown group">
                <button className={`flex items-center ${textColor} hover:opacity-80 transition-opacity`}>
                  <span className="text-sm font-medium">Company</span>
                </button>
                <div className="dropdown-content apple-dropdown-content absolute left-1/2 transform -translate-x-1/2 mt-2 w-[300px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-lg p-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="/company/checklist" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Cleaning Checklist
                        </a>
                      </li>
                      <li>
                        <a href="/company/about" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/careers" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Join The Team
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Locations Dropdown */}
              <div className="relative dropdown group">
                <a href="/locations" className={`flex items-center ${textColor} hover:opacity-80 transition-opacity`}>
                  <span className="text-sm font-medium">Locations</span>
                </a>
                <div className="dropdown-content apple-dropdown-content absolute left-1/2 transform -translate-x-1/2 mt-2 w-[300px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-lg p-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Service Areas</h4>
                    <ul className="space-y-2 grid grid-cols-2">
                      <li>
                        <a href="/locations/bergen" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Bergen County
                        </a>
                      </li>
                      <li>
                        <a href="/locations/hudson" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Hudson County
                        </a>
                      </li>
                      <li>
                        <a href="/locations/essex" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Essex County
                        </a>
                      </li>
                      <li>
                        <a href="/locations/passaic" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Passaic County
                        </a>
                      </li>
                      <li>
                        <a href="/locations/union" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Union County
                        </a>
                      </li>
                      <li>
                        <a href="/locations/morris" className="block text-gray-600 hover:text-gray-900 transition-colors">
                          Morris County
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <a href="/faq" className={`text-sm font-medium ${textColor} hover:opacity-80 transition-opacity`}>
                FAQ
              </a>
              <a href="/contact" className={`text-sm font-medium ${textColor} hover:opacity-80 transition-opacity`}>
                Contact Us
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://clensy.maidcentral.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium ${textColor} hover:opacity-80 transition-opacity`}
              >
                Login
              </a>
              <button
                onClick={() => window.location.href = '/booking'}
                className={`text-sm font-medium ${buttonBg} hover:opacity-90 px-5 py-2 rounded-full transition-colors flex items-center`}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Book Now
              </button>
            </div>

            {/* Mobile/Tablet Actions */}
            <div className="flex lg:hidden items-center space-x-2 sm:space-x-3">
              {/* Mobile Book Button - Always visible */}
              <button
                onClick={() => window.location.href = '/booking'}
                className={`text-xs sm:text-sm font-medium ${buttonBg} hover:opacity-90 px-3 sm:px-4 py-2 rounded-full transition-colors flex items-center whitespace-nowrap`}
              >
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden xs:inline sm:hidden">Book</span>
                <span className="hidden sm:inline">Book Now</span>
                <span className="xs:hidden">Book</span>
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md ${textColor} hover:bg-gray-100/10 focus:outline-none transition-colors`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/20 shadow-lg mobile-menu-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <nav className="space-y-1">
                {/* Services Section */}
                <div className="border-b border-gray-100 pb-2">
                  <button
                    onClick={(e) => toggleDropdown('services', e)}
                    className="flex items-center justify-between w-full text-left text-gray-900 font-medium py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === 'services' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === 'services' && (
                    <div className="mt-2 pl-4 space-y-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Residential</h4>
                        <div className="space-y-2">
                          <a
                            href="/services/routine-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Routine Cleaning
                          </a>
                          <a
                            href="/services/deep-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Deep Cleaning
                          </a>
                          <a
                            href="/services/moving-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Moving Cleaning
                          </a>
                          <a
                            href="/services/post-construction-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Post Construction
                          </a>
                          <a
                            href="/services/airbnb-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Airbnb Cleaning
                          </a>
                          <a
                            href="/services/extras"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Extras
                          </a>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Commercial</h4>
                        <div className="space-y-2">
                          <a
                            href="/services/office-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Offices & Corporate Buildings
                          </a>
                          <a
                            href="/services/medical-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Medical & Healthcare Facilities
                          </a>
                          <a
                            href="/services/retail-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Retail Stores
                          </a>
                          <a
                            href="/services/gym-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Gyms & Fitness Centers
                          </a>
                          <a
                            href="/services/school-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Schools & Childcare Facilities
                          </a>
                          <a
                            href="/services/property-cleaning"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Property & Building Common Areas
                          </a>
                          <a
                            href="/services/other-commercial"
                            className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            Other Commercial Spaces
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Company Section */}
                <div className="border-b border-gray-100 pb-2">
                  <button
                    onClick={(e) => toggleDropdown('company', e)}
                    className="flex items-center justify-between w-full text-left text-gray-900 font-medium py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  >
                    <span>Company</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === 'company' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === 'company' && (
                    <div className="mt-2 pl-4 space-y-2 bg-gray-50 rounded-lg p-4">
                      <a
                        href="/company/checklist"
                        className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Cleaning Checklist
                      </a>
                      <a
                        href="/company/about"
                        className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        About Us
                      </a>
                      <a
                        href="/careers"
                        className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Join The Team
                      </a>
                    </div>
                  )}
                </div>

                {/* Locations Section */}
                <div className="border-b border-gray-100 pb-2">
                  <button
                    onClick={(e) => toggleDropdown('locations', e)}
                    className="flex items-center justify-between w-full text-left text-gray-900 font-medium py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  >
                    <span>Locations</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === 'locations' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === 'locations' && (
                    <div className="mt-2 pl-4 bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <a
                          href="/locations/bergen"
                          className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          Bergen County
                        </a>
                        <a
                          href="/locations/hudson"
                          className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          Hudson County
                        </a>
                        <a
                          href="/locations/essex"
                          className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          Essex County
                        </a>
                        <a
                          href="/locations/passaic"
                          className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          Passaic County
                        </a>
                        <a
                          href="/locations/union"
                          className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          Union County
                        </a>
                        <a
                          href="/locations/morris"
                          className="block text-sm text-gray-600 hover:text-gray-900 py-2 hover:bg-white rounded px-2 transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          Morris County
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Links */}
                <a
                  href="/faq"
                  className="block text-gray-900 font-medium py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  onClick={closeAllDropdowns}
                >
                  FAQ
                </a>
                <a
                  href="/contact"
                  className="block text-gray-900 font-medium py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  onClick={closeAllDropdowns}
                >
                  Contact Us
                </a>

                {/* Login Link */}
                <a
                  href="https://clensy.maidcentral.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-900 font-medium py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  onClick={closeAllDropdowns}
                >
                  Login
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}