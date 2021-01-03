import react, { useState, useEffect } from 'react';
import InitiateJob from './InitiateJob';
import JobDetailsTable from './JobDetailsTable';

const FORMSURL = "/api/jobs";
const FETCH = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions);
    return await response.json();
};
// /api/jobs
const Upload = () => {
    const [jobdetails, SetJobDetails] = useState([]);
    useEffect(() => {
        FETCH(`${FORMSURL}`, { method: "GET" }).then(s => SetJobDetails(s));
    }, []);
    const uploadData = (jobs) => {
        let uploadData = {
            path: 'D:/text',
            count: jobs.length,
            status: 'CREATED'
        };
        console.log(uploadData);
        fetch('/api/jobs', {
            method: "POST",
            headers: { "Content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(uploadData)
        })
            .then((res) => res.json())
            .then(data => {
                let tmpJobdetails = jobdetails;
                tmpJobdetails.push(
                    {
                        jobID: data.id,
                        path: uploadData.path,
                        ilesCount: uploadData.count,
                        status: uploadData.status
                    }
                );
                SetJobDetails([...tmpJobdetails]);
                //upload forms
                jobs.forEach(element => {                    
                    fetch('/api/forms',
                    { method : 'post',
                      headers: { "Content-type": "application/json; charset=utf-8" },
                      body : JSON.stringify(
                          {
                              name : element,
                              jobid : data.id
                          }
                      )
                    }).then(res => res.json())                    
                    .then(formdata => console.log(formdata));
                });
            });

    }
    return (
        <>
            <InitiateJob upload={uploadData} />
            <JobDetailsTable data={jobdetails} />
        </>
    )
}

export default Upload