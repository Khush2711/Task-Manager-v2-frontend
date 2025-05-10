import React from "react";
import { Chart } from "react-google-charts";

const BarChart = ({ counts }) => {
  const chartData = [
    ["Task Status", "Number of Tasks"],
    ["In Progress", counts.Inprogress],
    ["Not Started", counts.Not_Started],
    ["Completed", counts.Finished],
  ];

  const options = {
    chart: {
      title: "Task Status Overview",
    },
    bars: "horizontal",
    colors: ["#1f77b4"],
    legend: { position: "none" },
    chartArea: { width: "70%" },
    hAxis: {
      minValue: 0,
      format: "0",
    },
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
};

export default BarChart;
