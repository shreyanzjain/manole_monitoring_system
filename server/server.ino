#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

#define sensor D5
#define ECHOPIN D7
#define TRIGPIN D6
int sensorPin = A0;

int readings;
int val;
double distance_cm = 0;

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

ESP8266WebServer server(8000); // Server on port 8000

// global variable for the startTime
unsigned long startTime;

void setup(void){
  Serial.begin(9600);
  pinMode(sensor, INPUT);
  pinMode(ECHOPIN, INPUT_PULLUP);
  pinMode(TRIGPIN, OUTPUT);
  digitalWrite(ECHOPIN, HIGH);
  WiFi.begin(ssid, password); // Connect to the network
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/get/readings", handleGetReadings);

  server.begin(); // Start the server
  Serial.println("Server started");

  startTime = millis();
}

void loop(void){
  // get readings from tilt sensor
  readings = digitalRead(sensor);

  // get readings from gas sensor
  val = analogRead(sensorPin);

  // get readings from ultrasonic sensor
  digitalWrite(TRIGPIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGPIN, HIGH);
  delayMicroseconds(15);
  digitalWrite(TRIGPIN, LOW);

  int distance_uS = pulseIn(ECHOPIN, HIGH, 26000);
  distance_cm = (distance_uS / 58.0);

  Serial.print("Distance: ");
  Serial.print(distance_cm);
  Serial.print("cm. ");

  Serial.print("Tilt: ");
  Serial.print(readings);

  Serial.print(" Gas: ");
  Serial.println(val);

  server.handleClient(); // Handle client requests
  delay(500);
}

void handleGetReadings() {
  // Allow all origins
  server.sendHeader("Access-Control-Allow-Origin", "*");
  StaticJsonDocument<200> doc;

  doc["gas"] = val;
  doc["tilt"] = readings;
  doc["distance"] = distance_cm;

  String output;
  serializeJson(doc, output);

  server.send(200, "application/json", output);
}
