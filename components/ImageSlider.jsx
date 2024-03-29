import React, { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import Link from 'next/link';

export function ImageSlider({ media, heroBanner }) {
  const [mediaIndex, setMediaIndex] = useState(0);

  function showNextMedia() {
    setMediaIndex(index => {
      if (index === media.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevMedia() {
    setMediaIndex(index => {
      if (index === 0) return media.length - 1;
      return index - 1;
    });
  }

  return (
    <section aria-label="Image Slider" style={{ width: "100%", height: "660px", position: "relative" }}>
      <a href="#after-media-slider-controls" className="skip-link">
        Skip Media Slider Controls
      </a>
      <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", }}>
        {media.map(({ type, url, alt }, index) => (
          type === 'image' ? (
            <img
              key={url}
              src={url}
              alt={alt}
              aria-hidden={mediaIndex !== index}
              className="img-slider-img"
              style={{ transform: `translateX(${-100 * mediaIndex}%)` }}
            />
          ) : (
            <video
              key={url}
              src={url}
              alt={alt}
              aria-hidden={mediaIndex !== index}
              className="img-slider-video"
              style={{ transform: `translateX(${-100 * mediaIndex}%)` }}
              autoPlay
              muted
              loop
            />
          )
        ))}
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)" }}></div>
      <div className="hero-banner-container">

        <div>
          <Link href={`/customs`}>
          {/* product/${heroBanner.product} */}
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <p>{heroBanner.desc}</p>
          </div>

        </div>
      </div>

      <button
        onClick={showPrevMedia}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Media"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextMedia}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Media"
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
        {media.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Media ${index + 1}`}
            onClick={() => setMediaIndex(index)}
          >
            {index === mediaIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id="after-media-slider-controls" />
    </section>
  );
}
