import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
   const [activeLink, setActiveLink] = useState(""); // Track active link

   const handleMouseEnter = () => {
    setIsExpanded(true); // Expand sidebar when cursor touches
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Minimize sidebar when cursor leaves
  };
  /*const handleClick = (e) => {
        setActiveLink(e.target.id);
  };*/

  return (
    <div className={`d-flex flex-column sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter} // Trigger on cursor hover
      onMouseLeave={handleMouseLeave} // Trigger when cursor leaves
    >

      <ul className="nav flex-column mt-3"  >
        <li className="nav-item" id="Home">
          <Link to="/Home" id="Home" className={`nav-link ${activeLink=="Home" ? 'bg-white text-black' : 'bg-gray text-white'}`}   >
            <i className="bi bi-house-door"></i>
            {isExpanded ?<span className="ms-2">Document Classification</span>:<span className="ms-2">DC</span>}
          </Link>
        </li>
        <li className="nav-item" id="Corpus">
          <Link to="/Corpus" id="Corpus" className={`nav-link ${activeLink=="Corpus"  ? 'bg-white text-black' : 'bg-gray text-white'}`}   >
            <i className="bi bi-info-circle"></i>
            {isExpanded ?<span className="ms-2">Corpus Creation</span>:<span className="ms-2">CC</span>}
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
