import React, { useState, useRef } from 'react';

const BoxDrawing = ({ imageUrl, onValuesChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();

    setIsDragging(true);
    setStartX(e.clientX - containerRect.left);
    setStartY(e.clientY - containerRect.top);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const containerRect = containerRef.current.getBoundingClientRect();

      setEndX(e.clientX - containerRect.left);
      setEndY(e.clientY - containerRect.top);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onValuesChange({ startX, startY, endX, endY });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        id="tshirtImage"
        src={imageUrl}
        alt="Your Image"
        style={{ width: '100%', height: 'auto' }}
      />

      {isDragging && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(startX, endX),
            top: Math.min(startY, endY),
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY),
            border: '2px solid red',
          }}
        />
      )}
    </div>
  );
};

export default BoxDrawing;
