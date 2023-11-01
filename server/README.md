# README.md - Server

This folder contains the .ino Arduino file that can be uploaded to your NodeMCU.

## System Components
Our system uses the following components to monitor the conditions inside a manhole and create a server on port 8000 of the NodeMCU:

1. Gas Sensor
2. Waterproof Ultrasonic Sensor
3. Tilt Sensor

## Routes
To access the data collected by the NodeMCU server, you can use the following routes:

| Route            | Response Schema          |
|------------------|--------------------------|
| `/get/readings/` | `{gas, tilt, distance}` |
