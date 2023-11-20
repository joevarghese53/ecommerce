// // pages/customs.js
// import React, { useState } from 'react';

// const Customs = () => {
//   const [tshirtColor, setTshirtColor] = useState('#ffffff'); // Default to white
//   const [customText, setCustomText] = useState('');

//   const handleColorChange = (color) => {
//     setTshirtColor(color);
//   };

//   const handleTextChange = (e) => {
//     setCustomText(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Customize Your T-shirt</h1>

//       {/* Display the customizable T-shirt */}
//       <div
//         className="customizable-tshirt"
//         style={{
//           backgroundColor: tshirtColor,
//           width: '200px',
//           height: '300px',
//           border: '1px solid #ccc',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           position: 'relative',
//         }}
//       >
//         <img
//           src="/img/white.png" // Replace with the path to your T-shirt image
//           alt="Customizable T-shirt"
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             filter: `brightness(80%) sepia(100%) hue-rotate(${tshirtColor}deg)`,
//           }}
//         />
//         <p className="custom-text">{customText}</p>
//       </div>

//       {/* Color picker */}
//       <label>Choose T-shirt Color:</label>
//       <input type="color" value={tshirtColor} onChange={(e) => handleColorChange(e.target.value)} />

//       {/* Text input */}
//       <label>Custom Text:</label>
//       <input type="text" value={customText} onChange={handleTextChange} />

//       {/* You can add more customization options as needed */}
//     </div>
//   );
// };

// export default Customs;





// pages/customs.js
import React, { useState } from 'react';

const Customs = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff'); // Default to white
  const [customText, setCustomText] = useState('');

  const handleColorChange = (color) => {
    setTshirtColor(color);
  };

  const handleTextChange = (e) => {
    setCustomText(e.target.value);
  };

  return (
    <div>
      <h1>Customize Your T-shirt</h1>

      {/* Display the customizable T-shirt */}
      <div
        className="customizable-tshirt"
        style={{
          backgroundColor: tshirtColor,
          width: '200px',
          height: '300px',
          border: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img
          src="/img/white.png" // Replace with the path to your T-shirt image
          alt="Customizable T-shirt"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          className="color-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: tshirtColor,
            opacity: 0.8, // Adjust the opacity as needed
          }}
        ></div>
        <p className="custom-text">{customText}</p>
      </div>

      {/* Color picker */}
      <label>Choose T-shirt Color:</label>
      <input type="color" value={tshirtColor} onChange={(e) => handleColorChange(e.target.value)} />

      {/* Text input */}
      <label>Custom Text:</label>
      <input type="text" value={customText} onChange={handleTextChange} />

      {/* You can add more customization options as needed */}
    </div>
  );
};

export default Customs;



