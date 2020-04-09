import React, { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'




const Footer = () => {
  return (
    <footer className="py-4">
      <p className="mb-0 text-center">
         Developed {" "}
        by <a href="https://tr.linkedin.com/in/muhammed-fatih-aksu-70b42ba7" target="_blank">M. Fatih Aksu</a> <span>&nbsp;</span>
        {"   "} | <span>&nbsp;</span> <a href="https://github.com/fthaksu/covidportal" target="_blank"><FontAwesomeIcon icon={faGithub}/></a> 
      </p>
    </footer>
  );
};

export default memo(Footer);