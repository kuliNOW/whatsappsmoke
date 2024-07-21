# wasmoke
Project Ijun bot whatsapp dan alarm untuk deteksi suhu dan potensi kebakaran

Database:
- Firebase (Untuk menampung nilai dari sensor)
- SQLite (Untuk menampung history chat yang masuk ke whatsapp bot)

Sparepart:
- Smoke detector
- Speaker
- ESP8266
- DHT11
- Buzzer

Penggunaan:
```
cp .env.example .env
```

```
npm i firebase-admin --save

```

```
npm install
```


```
npm run dev
```

Contoh output serial monitor
```
Data berhasil diperbaharui
Asap: 0.00
Kelembapan: 18.80%
Suhu: 1.50°C
Kondisi hari ini: Cuaca dingin dan kering, jaga kelembapan kulit.
Status: aman
Diupdate: Minggu 05:58:18
```