import react, { useState , useRef} from 'react';
import Upload from './Upload';

const InitiateJob = (props) => {
    
    const [files, selectedFiles] = useState([]);
    const imageInputRef = useRef();
    const onFileChange = event => {
        selectedFiles([...files, ...event.target.files]);        
    };

    const onFileUpload = () => {
        if(files.length == 0) return;
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
            <label htmlFor="image_uploads">Choose images to upload</label>
            <input type="file" id="image_uploads" name="image_uploads"
                accept="images/*" multiple onChange={onFileChange}
                ref={imageInputRef} />
            <button onClick={onFileUpload}>Submit</button>
        </>
    );
}

export default InitiateJob;