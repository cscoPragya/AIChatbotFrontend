import React, { useState } from "react";
// import "./SideBar2.css";

const SideBar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`SideBar2 ${isOpen ? "open" : ""}`} 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="SideBar2-content">
        <p>Developed by <span>Pragya Rajput.</span></p>
      </div>
      <div className="SideBar2-arrow">➤</div>
    </div>
  );
};

export default SideBar2;
