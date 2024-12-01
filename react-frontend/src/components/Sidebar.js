import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
   const [activeLink, setActiveLink] = useState("Home"); // Track active link

   const handleMouseEnter = () => {
    setIsExpanded(true); // Expand sidebar when cursor touches
  };


  /*const logout = () => {
    localStorage.setItem('remember',false);
    localStorage.setItem("jwtToken",null);
  };*/

  const handleMouseLeave = () => {
    setIsExpanded(false); // Minimize sidebar when cursor leaves
  };

  const handleClick = (e) => {
        console.log(e.currentTarget.id)
        setActiveLink(e.currentTarget.id)
  };

  return (
    <div className={`d-flex flex-column sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}//collapsed
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <ul className="nav flex-column mt-3"  >
        <li className="nav-item" id="Home">
          <Link to="/" id="Home" className={`nav-link ${activeLink=="Home"? 'bg-white text-black' : 'bg-gray text-white'}`} onClick={handleClick}   >
            <i className="bi bi-house-door"></i>
            {isExpanded ?<span className="ms-2">Document Classification</span>:<span className="ms-2">DC</span>}
          </Link>
        </li>
        <li className="nav-item" id="Corpus">
          <Link to="/Corpus" id="Corpus" className={`nav-link ${activeLink=="Corpus"  ? 'bg-white text-black' : 'bg-gray text-white'}`}  onClick={handleClick}  >
            <i className="bi bi-info-circle"></i>
            {isExpanded ?<span className="ms-2">Corpus Creation</span>:<span className="ms-2">CC</span>}
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
