/* eslint-disable react/prop-types */
import Plot from "react-plotly.js";

function DistanceData({ inputData }) {
  const distanceData = {
    x: inputData.map((_, index) => index),
    y: inputData.map((item) => item.distance),
    type: "scatter",
    mode: "lines",
    name: "Distance",
    fill: "tozeroy",
    line: { color: "green" },
  };

  return (
    <Plot
      className="rounded-md p-2 shadow-md bg-white"
      data={[distanceData]}
      layout={{
        width: 512,
        height: 300,
        title: "Distance Readings",
        xaxis: { title: "No. of datapoints ->" },
        yaxis: { title: "Distance in cm. ->" },
      }}
			config={
        {responsive: true}
      }
    />
  );
}

export default DistanceData;
