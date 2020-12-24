import React from "react";
const engineers = ['Nim', 'Vignesh', 'Lazer']
const Contributors = () => {
    return (
        <div className="flexbox-container">
            <p>
                <ul>
                    {engineers.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </p>
        </div>
    );
}

export default Contributors