Project Ijun bot whatsapp dan alarm untuk deteksi suhu dan potensi kebakaran

Realtime Database:
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
PORT_DEV=8000
PORT_BOT=9000
NUMBER=6289123456789
AUTHDOMAIN=xxxxxxx-xxxxx.firebaseapp.com
DATABASEURL=https://xxxxxxxxxxx-default-rtdb.firebaseio.com
WARNING_MESSAGE=Kebakaran terdeteksi, segera lakukan tindakan pencegahan!
ENV_DEV=devMode
ENV_BOT=botMode
```

Paste private key firebase ke config/secret.json

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

Untuk mode chat
```
npm run mode-chat
```
Scan QR

Tunggu hingga Otentikasi berhasil dan Siap digunakan

![image](https://github.com/kuliNOW/whatsappsmoke/blob/main/mode%20chat.jpg)


Untuk mode monitoring
```
npm run mode-mon
```
Scan QR

Tunggu hingga Otentikasi berhasil dan Siap digunakan

![image](https://github.com/kuliNOW/whatsappsmoke/blob/main/mode%20mon.jpg)

nb: Apabila folder session ada maka tidak perlu scan QRCode lagi

Skematik alat

![image](https://github.com/kuliNOW/whatsappsmoke/blob/main/Skematik.PNG)
