#include <ESP8266WiFi.h>
#include "pitches.h"
#include "DHT.h"
#include <FirebaseESP8266.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <TimeLib.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define WIFI_SSID ""
#define WIFI_PASS ""
#define FIREBASE_API_KEY ""
#define FIREBASE_URL ""
#define FIREBASE_EMAIL ""
#define FIREBASE_PASS ""
#define POOL ""
#define SMOKE_PIN 15
#define BUZZER_PIN 13
#define DHT_PIN 12
#define DURATION 4
#define DHT_TYPE DHT11
#define SMODE NOTE_C4
#define HMIN 30
#define HMAX 60
#define TMIN 18
#define TMAX 60
#define DURR 60000
#define SEC 0

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, POOL, SEC, DURR); 

String date, uid, cond;
const char *status;
const char *condition[] = {
  "Cuaca dingin dan kering, jaga kelembapan kulit.",
  "Cuaca dingin, pastikan tetap hangat.",
  "Cuaca dingin dan lembap, waspadai kelembapan berlebih.",
  "Cuaca normal tetapi kering, minum cukup air.",
  "Cuaca normal, kondisi ideal.",
  "Cuaca normal dan lembap, kondisi nyaman.",
  "Peringatan suhu panas, tetap terhidrasi dan hindari aktivitas berat.",
  "Peringatan suhu panas, hindari paparan langsung sinar matahari.",
  "Peringatan suhu panas dan lembap, waspadai risiko dehidrasi.",
  "Kondisi tidak terdeteksi."
};

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
DHT dht(DHT_PIN, DHT_TYPE);

// Untuk SMODE atau sound bisa disesuaikan sendiri, sesuai pilihan dibawah ini
// NOTE_C4, NOTE_G3, NOTE_G3, NOTE_A3, NOTE_G3, 0, NOTE_B3, NOTE_C4

void wifiSetup() {
  Serial.print("Sedang menyambungkan ke WiFi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi berhasil terhubung");
}

void setupFirebase() {
  auth.user.email = FIREBASE_EMAIL;
  auth.user.password = FIREBASE_PASS;
  config.api_key = FIREBASE_API_KEY;
  config.database_url = FIREBASE_URL;
  config.token_status_callback = tokenStatusCallback;
  config.max_token_generation_retry = 5;
  Firebase.begin(&config, &auth);
  while ((auth.token.uid.c_str()) == "") {
    Serial.print('.');
    delay(1000);
  }
  uid = auth.token.uid.c_str();
  Serial.print(F("User UID: "));
  Serial.println(uid);
  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);
  Serial.println(F("Berhasil tersambung Firebase"));
}

void setup() {
  Serial.begin(115200);
  pinMode(SMOKE_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(DHT_PIN, INPUT);
  wifiSetup();
  setupFirebase();
  dht.begin();
  timeClient.begin();
  timeClient.setTimeOffset(25200); 
}

String humidity(float h) {
  if (h < HMIN) {
    return "Kering";
  } else if (h >= HMIN && h < HMAX) {
    return "Normal";
  } else {
    return "Lembap";
  }
}

String temperature(float t) {
  if (t < TMIN) {
    return "Dingin";
  } else if (t >= TMIN && t < TMAX) {
    return "Normal";
  } else {
    return "Panas";
  }
}

String kondisi(String tt, String hh) {
  int idx;
  if (tt == "Dingin" && hh == "Kering") {
    idx = 0;
  } else if (tt == "Dingin" && hh == "Normal") {
    idx = 1;
  } else if (tt == "Dingin" && hh == "Lembap") {
    idx = 2;
  } else if (tt == "Normal" && hh == "Kering") {
    idx = 3;
  } else if (tt == "Normal" && hh == "Normal") {
    idx = 4;
  } else if (tt == "Normal" && hh == "Lembap") {
    idx = 5;
  } else if (tt == "Panas" && hh == "Kering") {
    idx = 6;
  } else if (tt == "Panas" && hh == "Normal") {
    idx = 7;
  } else if (tt == "Panas" && hh == "Lembap") {
    idx = 8;
  } else {
    idx = 9;
  }
  return condition[idx];
}

void addData(float ss, float hh, float tt, String c, const char *st, String dt) {
  if (Firebase.setFloat(fbdo, "/data/asap", ss) && Firebase.setFloat(fbdo, "/data/kelembapan", hh) && Firebase.setFloat(fbdo, "/data/suhu", tt) && Firebase.setString(fbdo, "/data/kondisi", c) && Firebase.setString(fbdo, "/data/status", st) && Firebase.setString(fbdo, "/data/diupdate", dt)) {
    Serial.println("Data berhasil diperbaharui");
  } else {
    Serial.println("Gagal memperbaharui data");
  }
}

void output(float ss, float hh, float tt, String c, const char *st, String dt) {
  Serial.print(F("Asap: "));
  Serial.println(ss);
  Serial.print(F("Kelembapan: "));
  Serial.print(hh);
  Serial.println(F("%"));
  Serial.print(F("Suhu: "));
  Serial.print(tt);
  Serial.println(F("°C"));
  Serial.print(F("Kondisi hari ini: "));
  Serial.println(c);
  Serial.print(F("Status: "));
  Serial.println(st);
  Serial.print(F("Diupdate: "));
  Serial.println(dt);
  Serial.println();
}

String printDigits(int digits) {
  String dig = ":";
  if (digits < 10) dig += '0';
  dig += String(digits);
  return dig;
}

String dayIndo(int day) {
  switch(day) {
    case 1: return "Minggu";
    case 2: return "Senin";
    case 3: return "Selasa";
    case 4: return "Rabu";
    case 5: return "Kamis";
    case 6: return "Jum'at";
    case 7: return "Sabtu";
    default: return "";
  }
}

String monthIndo(int month) {
  switch(month) {
    case 1: return "Januari";
    case 2: return "Februari";
    case 3: return "Maret";
    case 4: return "April";
    case 5: return "Mei";
    case 6: return "Juni";
    case 7: return "Juli";
    case 8: return "Agustus";
    case 9: return "September";
    case 10: return "Oktober";
    case 11: return "November";
    case 12: return "Desember";
    default: return "";
  }
}

String dateNOW() {
  date = String(hour(), DEC);
  date += printDigits(minute());
  date += printDigits(second());
  date += " ";
  date += dayIndo(weekday());
  date += " ";
  date += String(day(), DEC);
  date += " ";
  date += monthIndo(month());
  date += " ";
  date += String(year(), DEC);
  return date;
}

void loop() {
  timeClient.update();
  setTime(timeClient.getEpochTime());
  float sp = analogRead(SMOKE_PIN);
  float hmdty = dht.readHumidity();
  float temp = dht.readTemperature();
  cond = kondisi(temperature(temp), humidity(hmdty));
  dateNOW();

  if (isnan(sp) || isnan(hmdty) || isnan(temp)) {
    Serial.println("Gagal membaca data dari sensor");
    return;
  }

  if (sp > 0) {
    status = "tidak aman";
    output(sp, hmdty, temp, cond, status, date);
    addData(sp, hmdty, temp, cond, status, date);
    int dursound = 1000 / DURATION;
    tone(BUZZER_PIN, SMODE, dursound);
    int pause = dursound * 1.0;
    delay(pause);
    noTone(BUZZER_PIN);
  } else {
    status = "aman";
    output(sp, hmdty, temp, cond, status, date);
    addData(sp, hmdty, temp, cond, status, date);
  }
  delay(500);
}