import React from "react";
import { about } from './../Static-data';

const About = () => {
    return (<div className="flexbox-container">
        <p>{about.objective}</p>
        <br />
        <ul>
            {about.technologies.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h4>Processing diagram</h4>
    </div>);
}
export default About