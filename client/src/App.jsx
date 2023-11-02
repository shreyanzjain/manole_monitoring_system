import { useState, useEffect } from "react";
import axios from "axios";
import GasData from "./components/GasData";
import DistanceData from "./components/DistanceData";
import "./App.css";
import TiltData from "./components/TiltData";
// import savedData from "./components/Data.json";

function App() {
  const URL = "192.168.181.69"; // Your NodeMCU IP ADDRESS
  const [data, setData] = useState([]);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      await axios
        .get(`http://${URL}:8000/get/readings`)
        .then((res) => {
          console.log(res.data);
          if (live == false) {
            setLive(true);
          }
          setData((oldData) => {
            let newData = [...oldData, res.data];
            if (newData.length > 50) {
              newData.shift();
            }
            return newData;
          });
        })
        .catch((err) => {
          if (live == true) {
            setLive(false);
          }
          console.log(err);
        });
    }, 100);

    return () => clearInterval(interval);
  });

  console.log(data);

  return (
    <div className="container-lg h-auto w-full pt-16">
      <div className="container-lg w-full h-16 bg-eerieblack fixed top-0 z-10">
        <div className="flex w-full h-full items-center justify-between">
          <p className="text-eggshell text-2xl font-semibold ms-2">
            Manhole Monitoring System
          </p>
          {!live && <a className="border-2 border-red-400 me-2 px-2 rounded-md text-red-400">Offline</a>}
          {live && <a className="border-2 border-green-400 me-2 px-2 rounded-md text-green-400">Online</a>}
        </div>
      </div>
      <div className="container-lg h-screen bg-eggshell">
        <div className="flex w-full h-1/2 items-center justify-center gap-8">
          <GasData inputData={data} />
          <DistanceData inputData={data} />
        </div>

        <div className="flex w-full h-1/2 items-center justify-center">
          <TiltData inputData={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
