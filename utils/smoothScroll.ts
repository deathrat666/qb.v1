import React from 'react';

export const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
  const targetId = event.currentTarget.getAttribute('href');

  // Return if the href is not a valid hash link for on-page navigation
  if (!targetId || !targetId.startsWith('#') || targetId.length === 1) {
    return;
  }
  
  // Prevent default anchor behavior only for our valid hash links
  event.preventDefault();

  // Use getElementById for performance and correctness
  const targetElement = document.getElementById(targetId.substring(1));
  if (!targetElement) {
    return;
  }

  const header = document.querySelector('header');
  // Use a fallback of 0 if header isn't found or has no height
  const headerHeight = header ? header.offsetHeight : 0;
  
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};
