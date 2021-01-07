import react, { useState, useRef } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";

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
        <Container>
            <Row><Col>
                <input type="file" id="image_uploads" name="image_uploads" className="visually-hidden"
                    accept="images/*" multiple onChange={onFileChange}
                    ref={imageInputRef} />
                <label htmlFor="image_uploads" className="btn btn-secondary">
                    Select Images to Extract Text</label>
            </Col><Col> <Button variant="secondary" onClick={onFileUpload}>Upload</Button></Col></Row>
            <Row><Col>
                <div className="sample-code-frame">
                    {imagePreview()}
                </div></Col>
            </Row>
        </Container>
    );
}

export default UploadJob;