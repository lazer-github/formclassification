import react from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const viewClassificationFormatter = (cell, row) => {
    console.log(row.jobID);
    if (cell == 'COMPLETED')
        return (<a href={`Classification/${row.jobID}`}>View</a>);
    else
        return "";
}
const JobDetails = (props) => {

    return (
        <>
            <BootstrapTable maxHeight={300} data={props.data} pagination striped condensed version='4'>
                <TableHeaderColumn dataField="jobID" width="5%" isKey>
                    ID
        </TableHeaderColumn>
                <TableHeaderColumn dataField="path" width="45%" >Path</TableHeaderColumn>
                <TableHeaderColumn
                    dataField="filesCount"
                    width="10%">Files Count</TableHeaderColumn>
                <TableHeaderColumn dataField="status" width="20%">Status</TableHeaderColumn>
                <TableHeaderColumn dataFormat={viewClassificationFormatter} dataField="status" width="20%">View Classification</TableHeaderColumn>
            </BootstrapTable>
        </>

    )
}
export default JobDetails;