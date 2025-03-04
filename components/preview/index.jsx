import React, { useState } from "react";

const ResponsivePreview = ({ children }) => {
  // Define screen sizes
  const screenSizes = {
    mobile: { width: 375, height: 667 }, // Common mobile size
    tablet: { width: 768, height: 1024 }, // Tablet size
    laptop: { width: 1366, height: 768 } // Laptop size
  };

  // State to track current preview size
  const [size, setSize] = useState(screenSizes.laptop);
  const [classDiv,setClassDiv] = useState("laptop")

  // Function to update screen size
  const changeSize = (type) => {
    setClassDiv(type)
    setSize(screenSizes[type]);
  };

  

  return (
    <div className="d-flex flex-column align-items-center w-100">
      {/* Preview Box */}
      <div
        style={{
          width: `${size.width}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.5s, height 0.5s",
          overflow: "hidden",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        className={classDiv}
      >
        {children}
      </div>

      {/* Control Buttons */}
      <div className="mt-3">
        <button className="btn btn-primary mx-2" onClick={() => changeSize("mobile")}>
          📱 Mobile
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => changeSize("tablet")}>
          📟 Tablet
        </button>
        <button className="btn btn-dark mx-2" onClick={() => changeSize("laptop")}>
          💻 Laptop
        </button>
      </div>
    </div>
  );
};

export default ResponsivePreview;
