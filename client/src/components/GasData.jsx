/* eslint-disable react/prop-types */
import Plot from "react-plotly.js";

function GasData({ inputData }) {
  const gasData = {
    x: inputData.map((_, index) => index),
    y: inputData.map((item) => item.gas),
    type: "scatter",
    mode: "lines",
    name: "Gas",
    fill: "tozeroy",
    line: { color: "orange" },
  };
  return (
    <Plot
      className="rounded-md p-2 shadow-md bg-white"
      data={[gasData]}
      layout={{
        width: 512,
        height: 300,
        title: "Gas Readings",
        xaxis: { title: "No. of datapoints ->" },
        yaxis: { title: "Parts per Million ->" },
      }}
      config={{ responsive: true }}
    />
  );
}

export default GasData;
