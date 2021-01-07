import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../css/Table.css";
function rowClassNameFormat(row, rowIdx) {
  return rowIdx % 2 === 0 ? "Even-Row" : "Odd-Row";
}
const extractTextFormatter = (cell) => {
  return <span title={cell}>{cell}</span>
}
const ClassificationDetails = ({ data }) => {
  return (
    <>
      <BootstrapTable maxHeight={350} data={data} exportCSV pagination search striped condensed version='4'>
        <TableHeaderColumn dataField="id" width="5%" isKey>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" width="25%" >Title</TableHeaderColumn>
        <TableHeaderColumn
          dataField="extractText"
          width="50%"
          dataFormat={extractTextFormatter}
        >Extracted Text</TableHeaderColumn>
        <TableHeaderColumn dataField="formType" width="20%">Form Type</TableHeaderColumn>
      </BootstrapTable>
    </>
  );
};
export default ClassificationDetails;