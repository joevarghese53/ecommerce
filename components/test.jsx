import React, { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import Link from 'next/link';

export function ImageSlider({ images, heroBanner }) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex(index => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex(index => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  return (
    <section aria-label="Image Slider" style={{ position: "relative" }}>
      <a href="#after-image-slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div style={{ position: "relative", width: "100%", height: "660px", overflow: "hidden" }}>
        <div style={{ display: "flex", transition: "transform 0.5s", transform: `translateX(-${imageIndex * 100}%)` }}>
          {images.map(({ url, alt }, index) => (
            <img
              key={url}
              src={url}
              alt={alt}
              aria-hidden={imageIndex !== index}
              className="img-slider-img"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ))}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.3)" }}></div>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "20px", boxSizing: "border-box" }}>
            <Link href={`/product/${heroBanner.product}`}>
              <button type="button">{heroBanner.buttonText}</button>
            </Link>
            <div className="desc">
              <p>{heroBanner.desc}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  );
}
