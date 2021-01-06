import react, { useState, useRef } from 'react';
import { Button } from "react-bootstrap";

const btnStyle = {
    borderColor: 'rgb(118,118,118)',
    padding: '1px 6px',
    borderWidth: '2px',
    borderStyle: 'outset',
    backgroundColor: 'rgb(239,239,239)'
};

const UploadJob = (props) => {

    const [files, selectedFiles] = useState([]);
    const imageInputRef = useRef();
    const onFileChange = event => {
        selectedFiles([...files, ...event.target.files]);
    };

    const onFileUpload = () => {
        if (files.length > 0) {
            props.upload([...files].map(s => s.name));
            reset();
        }
    };

    const reset = () => {
        selectedFiles([]);
        imageInputRef.current.value = "";
    }
    const imagePreview = () => {
        if (files.length > 0) {
            return (<ul style={{ columns: "4" }}>
                {
                    [...files].map((s, idx) =>
                        <li key={idx}><img src={URL.createObjectURL(s)} height={60} />                           
                        </li>)}
            </ul>)
        }
        else {
            return <h6>No Images Selected</h6>
        }
    }
    return (
        <>
            <input type="file" id="image_uploads" name="image_uploads" className="visually-hidden"
                accept="images/*" multiple onChange={onFileChange}
                ref={imageInputRef} />
            <label htmlFor="image_uploads" className="btn btn-primary">
                Select Images to Extract Text</label>
            <div className="sample-code-frame">
                {imagePreview()}
            </div>
            <Button variant="primary" onClick={onFileUpload}>Upload</Button>
        </>
    );
}

export default UploadJob;