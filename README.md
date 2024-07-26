# wasmoke
Project Ijun bot whatsapp dan alarm untuk deteksi suhu dan potensi kebakaran

Database:
- Firebase (Untuk menampung nilai dari sensor)

Sparepart:
- Smoke detector
- Speaker
- ESP8266
- DHT11
- Buzzer

Penggunaan:

```
npm install
```

```
cp .env.example .env
```

Contoh penggunaan env
```
PORT=9999
NUMBER=+628123456789
AUTHDOMAIN=example.firebaseapp.com
DATABASEURL=https://example.firebaseio.com
WARNING_MESSAGE=Kebakaran terdeteksi, segera lakukan tindakan pencegahan!
ENV1=modeDEV
ENV2=modeBOT
```

```
npm start
```

Paste private key firebase ke key/secret.json

Scan QR

Tunggu hingga muncul client

Contoh output serial monitor
```
Data berhasil diperbaharui
Asap: 0.00
Kelembapan: 17.50%
Suhu: 2.00°C
Kondisi hari ini: Cuaca dingin dan kering, jaga kelembapan kulit.
Status: aman
Diupdate: 3:37:10 Jum'at Juli 26 2024
```