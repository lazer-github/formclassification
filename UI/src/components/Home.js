import react, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UploadJob from './UploadJob';
import JobDetails from './JobDetails';
import openSocket from 'socket.io-client';

const FORMSURL = "/api/jobs";
const FETCH = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions);
    return await response.json();
};
// /api/jobs
const Home = () => {
    const [jobdetails, SetJobDetails] = useState([]);
    const socketConnection = openSocket('http://localhost:8000', { transports: ['websocket'] });
    useEffect(() => {
        FETCH(`${FORMSURL}`, { method: "GET" }).then(s => SetJobDetails(s));
    }, []);
    socketConnection.on('jobstatusupdate', data => {
        let index = jobdetails?.findIndex(x => x.jobID == data.jobID);       
        if (index != undefined && index != -1) {
            let item = jobdetails[index];           
            item.status = data.status;            
            jobdetails[index] = item;            
            SetJobDetails([...jobdetails]);
        }
    });
    const uploadData = (jobs) => {
        let uploadData = {
            path: 'D:/text',
            count: jobs.length,
            status: 'CREATED'
        };
        FETCH('/api/jobs', {
            method: "POST",
            headers: { "Content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(uploadData)
        })
            .then(data => {
                let tmpJobdetails = jobdetails;
                tmpJobdetails.push(
                    {
                        jobID: data.id,
                        path: uploadData.path,
                        filesCount: uploadData.count,
                        status: uploadData.status
                    }
                );
                SetJobDetails([...tmpJobdetails]);
                //upload forms
                jobs.forEach(element => {
                    fetch('/api/forms',
                        {
                            method: 'post',
                            headers: { "Content-type": "application/json; charset=utf-8" },
                            body: JSON.stringify(
                                {
                                    name: element,
                                    jobid: data.id
                                }
                            )
                        }).then(res => res.json())
                        .then(formdata => console.log(formdata));
                });

            });

    }
    return (
        <Container className='flexbox-container'>
            <Row><Col><UploadJob upload={uploadData} /><p/></Col></Row>
            <Row><Col><JobDetails data={jobdetails} /></Col></Row>
        </Container>
    )
}

export default Home