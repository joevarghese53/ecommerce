import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BoxDrawing from '@/components/BoxDrawing';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const ColorSelector = ({ setNewColor }) => {
  const colors = ['white', 'black', 'yellow', 'blue', 'red'];
  const [activeColor, setActiveColor] = useState('white');

  const handleColorClick = (color) => {
    if (color !== activeColor) {
      setActiveColor(color);
      setNewColor(color);
    }
  };

  return (
    <div className="color-content">
      <h3>select color</h3>
      <div className="color-groups">
        {colors.map((color) => (
          <div
            key={color}
            className={`color color-${color} ${color === activeColor ? 'active-color' : ''}`}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const App = () => {
  const [boxDrawingValues, setBoxDrawingValues] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  const [value, setValue] = useState(0);
  const [activeColor, setActiveColor] = useState('white');
  const [textareaValue, setTextareaValue] = useState('');

  const setNewColor = (color) => {
    setActiveColor(color);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = '63px';
    let scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
  };

  const handleBoxDrawingValuesChange = (values) => {
    setBoxDrawingValues(values);
    console.log('BoxDrawing values:', values);
  };

  


  const handleSubmit = () => {
    const boxDrawingValuesArray = Object.values(boxDrawingValues);
    const formattedBoxDrawingValues = boxDrawingValuesArray.join('_');
    const formattedTextareaValue = textareaValue.replace(/ /g, '_');
    
    const postData = `prompt-input=${formattedTextareaValue} ${activeColor} ${formattedBoxDrawingValues}`;
  
    fetch('https://b3b7-35-197-122-142.ngrok-free.app/submit-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // You can use response.text() if the server returns plain text
      })
      .then(data => {
        console.log('Success:', data);
        // Handle the success response from the server
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });
  };
  

  return (
    <header>
      <section className="banner-wrapper">
        {/* image and color selector */}
        <div className="centered-content">
          {/* banner right */}
          <div className="banner-content">
            <div className="banner-right">
            <BoxDrawing imageUrl={`./img/tshirt_${activeColor}.jpg`} onValuesChange={handleBoxDrawingValuesChange} />
            </div>
            {/* color selector */}
            <ColorSelector setNewColor={setNewColor} />
          </div>
        </div>

        {/* tabs */}
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
          <Tabs
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab icon={<CloudUploadIcon />} label="Upload File" {...a11yProps(1)} />
            <Tab icon={<SmartToyIcon />} label="Generate" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            Upload
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="wrapper">
              <textarea
                spellCheck="false"
                placeholder="Type something here..."
                value={textareaValue}
                onChange={handleTextareaChange}
                onKeyUp={handleTextareaResize}
              ></textarea>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </section>
    </header>
  );
};

export default App;


