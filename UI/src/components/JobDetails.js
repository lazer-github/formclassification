import react from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const viewClassificationFormatter = (cell, row) => {
    if (cell == 'COMPLETED')
        return (<a href={`Classification/${row.jobID}`}>View</a>);
    else
        return "";
}

const statusFormatter = (cell, row) => {
    let css = (cell == 'INPROGRESS') ? 'badge-secondary' :
        (cell == 'COMPLETED') ? 'badge-success' : 'badge-primary';
    css = 'badge badge-pill' + ' ' + css;
    return (<span className={css}>{cell}</span>);
}

const JobDetails = (props) => {
    return (
        <BootstrapTable maxHeight={350} data={props.data} pagination striped condensed version='4'>
            <TableHeaderColumn dataField="jobID" width="5%" isKey>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="path" width="45%" >Path</TableHeaderColumn>
            <TableHeaderColumn dataField="filesCount" width="10%">Files Count</TableHeaderColumn>
            <TableHeaderColumn dataField="status" dataFormat={statusFormatter} width="20%">Status</TableHeaderColumn>
            <TableHeaderColumn dataFormat={viewClassificationFormatter} dataField="status" width="20%">View Classification</TableHeaderColumn>
        </BootstrapTable>
    )
}
export default JobDetails;