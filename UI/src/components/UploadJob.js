import react, { useState, useRef } from 'react';
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
        if (files.length == 0) return;
        let filesToUpload = [];
        for (const file of files) {
            filesToUpload.push(file.name);
        }
        props.upload(filesToUpload);
        reset();
    };

    const reset = () => {
        selectedFiles([]);
        imageInputRef.current.value = "";
    }
 
    return (
        <>
            <label htmlFor="image_uploads" style={btnStyle}>
                Select Images</label>
            <input type="file" id="image_uploads" name="image_uploads" style={{ opacity: '0' }}
                accept="images/*" multiple onChange={onFileChange}
                ref={imageInputRef} size={10} />
            <button onClick={onFileUpload}>Upload</button>
        </>
    );
}

export default UploadJob;