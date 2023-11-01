import { useState, useEffect } from "react";
import axios from "axios";
import GasData from "./components/GasData";
import DistanceData from "./components/DistanceData";
import "./App.css";
import TiltData from "./components/TiltData";
// import savedData from "./components/Data.json";

function App() {
  const URL = "192.168.0.102";
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await axios
        .get(`http://${URL}:8000/get/readings`)
        .then((res) => {
          console.log(res.data);
          setData((oldData) => {
            let newData = [...oldData, res.data];
            if (newData.length > 50) {
              newData.shift();
            }
            return newData;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  console.log(data);

  return (
    <div className="container-lg h-screen w-full bg-slate-200">
      <div className="flex w-full h-1/2 items-center justify-center gap-8">
        <GasData inputData={data} />
        <DistanceData inputData={data} />
      </div>

      <div className="flex w-full h-1/2 items-center justify-center">
        <TiltData inputData={data} />
      </div>
    </div>
  );
}

export default App;
