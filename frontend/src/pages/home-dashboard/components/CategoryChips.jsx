import React, { useRef, useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const CategoryChips = ({ selectedCategory, onCategoryChange }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    'All',
    'Gaming',
    'Music',
    'Sports',
    'News',
    'Entertainment',
    'Education',
    'Technology',
    'Cooking',
    'Travel',
    'Fitness',
    'Comedy',
    'Science',
    'Art',
    'Fashion',
    'DIY',
    'Pets',
    'Cars'
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons);
    
    const resizeObserver = new ResizeObserver(checkScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      resizeObserver.disconnect();
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    
    // Scroll the selected chip into view
    const container = scrollContainerRef.current;
    const selectedChip = container?.querySelector(`[data-category="${category}"]`);
    
    if (selectedChip && container) {
      const chipRect = selectedChip.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      if (chipRect.left < containerRect.left || chipRect.right > containerRect.right) {
        selectedChip.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 w-10 h-10 bg-gradient-to-r from-background via-background to-transparent flex items-center justify-center hover:bg-surface rounded-full transition-colors duration-150"
          aria-label="Scroll categories left"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-3 overflow-x-auto scrollbar-hide px-4 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <button
            key={category}
            data-category={category}
            onClick={() => handleCategoryClick(category)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-text-primary text-background' :'bg-surface text-text-primary hover:bg-surface-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 w-10 h-10 bg-gradient-to-l from-background via-background to-transparent flex items-center justify-center hover:bg-surface rounded-full transition-colors duration-150"
          aria-label="Scroll categories right"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      )}
    </div>
  );
};

export default CategoryChips;