import React from "react";
import { about } from './../Static-data';
import diagram from './../images/TechLinkImage.PNG'
const About = () => {
    return (<div className="flexbox-container">        
        <p>{about.objective}</p>  
        <h4>Technology Map</h4>      
        <img src={diagram} height={250} width={550} /> 
        <h4>Technologies</h4>
        <ul>
            {about.technologies.map((item, i) => <li key={i}>{item}</li>)}
        </ul>  
    </div>);
}
export default About