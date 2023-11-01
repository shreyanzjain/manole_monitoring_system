/* eslint-disable react/prop-types */
import Plot from "react-plotly.js";

function TiltData({ inputData }) {
  const tiltData = {
    x: inputData.map((_, index) => index),
    y: inputData.map((item) => item.tilt),
    type: "bar",
    name: "Tilt",
  };
  return (
    <Plot
      className="rounded-md p-2 shadow-md bg-white"
      data={[tiltData]}
      layout={{ width: 1072, height: 300, title: "Tilt Readings" }}
      config={
        {responsive: true}
      }
    />
  );
}

export default TiltData;
