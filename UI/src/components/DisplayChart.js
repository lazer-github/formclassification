// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
// https://developers.google.com/chart/interactive/docs/gallery/areachart#configuration-options
import React from "react";
import { Chart } from "react-google-charts";

const DisplayChart = ({ data }) => {
  const groupedResults = data.reduce((acc, item) => {
    acc[item.form_type] = acc[item.form_type] + 1 || 1;
    return acc;
  }, {});
  
  let finalResult = [["Category", "Count"]];
  Object.entries(groupedResults).forEach(([key, value]) => {
    (key) ? finalResult.push([key, value]) :finalResult.push(["Unclassified", value]);
  });
  
  return (
    <>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={finalResult}
        options={{
          legend: 'bottom'
        }}
        rootProps={{ "": "1" }}
      />
    </>
  );
};
export default DisplayChart;
