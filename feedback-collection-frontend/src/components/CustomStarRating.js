// src/components/CustomStarRating.js
import React from 'react';
import './CustomStarRating.css'; // We will create this CSS file

const CustomStarRating = ({ count, value, onChange, size = '35px', activeColor = '#FFD700', inactiveColor = '#ccc' }) => {
  const stars = [];
  for (let i = 1; i <= count; i++) {
    stars.push(
      <span
        key={i}
        className="custom-star"
        style={{
          fontSize: size,
          color: i <= value ? activeColor : inactiveColor,
          cursor: 'pointer',
          display: 'inline-block', // Ensure stars sit nicely next to each other
          margin: '0 2px', // Small space between stars
        }}
        onClick={() => onChange(i)}
        role="button"
        aria-label={`<span class="math-inline">\{i\} star</span>{i === 1 ? '' : 's'}`}
      >
        &#9733; {/* Unicode character for a solid star */}
      </span>
    );
  }

  return <div className="custom-star-rating-container">{stars}</div>;
};

export default CustomStarRating;