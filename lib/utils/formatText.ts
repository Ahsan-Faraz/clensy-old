import React from 'react';

/**
 * Convert <blue>text</blue> syntax to JSX with blue styling
 */
export function formatText(text: string): React.ReactNode {
  if (!text) return text;
  
  // Split the text by the <blue> and </blue> tags
  const parts = text.split(/(<blue>|<\/blue>)/g);
  
  // Track whether we're inside a <blue> tag
  let insideBlueTag = false;
  
  // Process the parts and return an array of strings/JSX elements
  const formattedParts = parts
    .filter(Boolean)
    .map((part, index) => {
      if (part === '<blue>') {
        insideBlueTag = true;
        return null; // Skip the tag itself
      }
      
      if (part === '</blue>') {
        insideBlueTag = false;
        return null; // Skip the tag itself
      }
      
      // Return the text with or without blue styling
      return insideBlueTag ? (
        React.createElement('span', { key: index, className: 'text-[#007BFF]' }, part)
      ) : part;
    })
    .filter(Boolean); // Remove null values
  
  return React.createElement(React.Fragment, {}, ...formattedParts);
}

/**
 * Process the text in the preview to show blue text properly
 * For use in admin preview sections
 */
export function formatTextForPreview(text: string): React.ReactNode {
  if (!text) return text;
  
  // Replace <blue>text</blue> with blue styled spans
  const blueTagRegex = /<blue>(.*?)<\/blue>/g;
  const parts: React.ReactNode[] = [];
  
  let lastIndex = 0;
  let match;
  let key = 0;
  
  // Find all matches of blue tags
  while ((match = blueTagRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(React.createElement(React.Fragment, { key: key++ }, text.substring(lastIndex, match.index)));
    }
    
    // Add the blue text
    parts.push(React.createElement('span', { key: key++, className: 'text-[#007BFF]' }, match[1]));
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(React.createElement(React.Fragment, { key: key++ }, text.substring(lastIndex)));
  }
  
  return React.createElement(React.Fragment, {}, ...parts);
}