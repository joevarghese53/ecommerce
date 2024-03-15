import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

import { ImageSlider } from './ImageSlider';

const slide1 = '/img/slide-01.jpg';
const slide2 = '/img/slide-02.jpg';
const slide3 = '/img/slide-03.jpg';
const slide4 = '/img/slide-04.jpg';
const slide5 = '/img/slide-05.jpg';
const slide6 = '/img/slide-06.jpg';
const slide7 = '/img/slide-07.jpg';

const HeroBanner = ({ heroBanner }) => {
  const IMAGES = [
    { url: slide1, alt: "slide1" },
    { url: slide2, alt: "slide2" },
    { url: slide3, alt: "slide3" },
    { url: slide4, alt: "slide4" },
    { url: slide5, alt: "slide5" },
    { url: slide6, alt: "slide5" },
    { url: slide7, alt: "slide5" },
  ]
  return (
    // <div className="hero-banner-container">
      // <div>
      //   <p className="beats-solo">{heroBanner.smallText}</p>
      //   <h3>{heroBanner.midText}</h3>
      //   <h1>{heroBanner.largeText1}</h1>
      //   {/* <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" /> */}

      //   <div>
      //     <Link href={`/product/${heroBanner.product}`}>
      //       <button type="button">{heroBanner.buttonText}</button>
      //     </Link>
      //     <div className="desc">
      //       <p>{heroBanner.desc}</p>
      //     </div>
      //   </div>
      // </div>
    // </div>
    <div
      style={{
        
        width: "100%",
        
        margin: "0 auto",
      }}
    >
      <ImageSlider images={IMAGES} heroBanner={heroBanner} />
      
    </div>
  )
}

export default HeroBanner