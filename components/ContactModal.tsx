"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ContactModal({ 
  isOpen, 
  onClose, 
  title = "Contact Us" 
}: ContactModalProps) {
  // Handle modal body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[99999999] flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-4xl mx-4 h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Modal Body - Iframe Container */}
          <div className="relative w-full h-[calc(100%-73px)] overflow-hidden">
            <iframe id="msqiframe" src="https://clensy.maidcentral.com/quoting/lead" style={{border: "none", height: "600px"}} width="100%" scrolling="no"></iframe>

          </div>
        </div>
      </div>

      {/* Load the external script when modal is open */}
      {isOpen && (
        <script src="https://clensy.maidcentral.com/resources/embed.js" defer></script>
      )}
    </>
  );
}