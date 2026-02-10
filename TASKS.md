# Workshop ülesanded

## Faas 1: Projekti tundmaõppimine

1. Käivita rakendus (`npm run dev`)
2. Tee käsitsi API päringuid Swagger UI-st (`http://localhost:3000/docs`) või cURL-iga
3. Uuri koodi struktuuri — kuidas Route → Controller → Service → Repository töötab
4. Käivita olemasolevad testid (`npm test`)

---

## Faas 2: Unit testid — Service kihi testimine

### 2.1 Baastase: BookingService testid

Loo fail `tests/unit/bookingService.test.js`.

Näide on juba ette antud ("loob broneeringu kui kohti on"). Kirjuta järgmised testid:

1. **Workshop on täis** → peaks viskama vea "Workshop is full"
2. **Kasutaja on juba broneerinud** → peaks viskama vea "User already booked this workshop"
3. **Workshop ei eksisteeri** → peaks viskama vea "Workshop not found"

### 2.2 Kesktase: UserService ja WorkshopService testid

**UserService** (`tests/unit/userService.test.js`):
- Kasutaja loomine õnnestub
- Puuduv nimi või email viskab vea

**WorkshopService** (`tests/unit/workshopService.test.js`):
- Workshop loomine õnnestub
- Puuduv title või capacity viskab vea

### 2.3 Edasijõudnud: Mock meetodite kontroll

- Kontrolli, et `createBooking` kutsutakse õigete argumentidega
- Kontrolli, et `createBooking` EI kutsuta, kui workshop on täis

---

## Faas 3: Integratsioonitestid — API testimine

### 3.1 Baastase: GET /health

Fail `tests/integration/health.test.js` on juba olemas näitena.

### 3.2 Baastase: POST /users

Loo fail `tests/integration/users.test.js`:

1. Loob uue kasutaja → 201
2. Puuduv nimi → 400
3. Puuduv email → 400
4. Duplikaat-email → 400

### 3.3 Kesktase: POST /workshops

Loo fail `tests/integration/workshops.test.js`:

1. Workshop loomine (happy path) → 201
2. Puuduv title → 400

### 3.4 Kesktase: POST /bookings

Loo fail `tests/integration/bookings.test.js`:

1. Broneering õnnestub (happy path) → 201
2. Workshop on täis → 409
3. Topeltbroneering (sama kasutaja, sama workshop) → 409
4. Olematu workshop → 404

### 3.5 Edasijõudnud: Vigade struktuuri kontroll

- Kõik veavastused sisaldavad `error` välja

### 3.6 Edasijõudnud: Konkurentsuse test

- Kaks paralleelset päringut, 1 koht → üks õnnestub (201), teine ebaõnnestub (409)

---

## Faas 4: Laiendus (kui aega jääb üle)

- Lisa `GET /workshops` endpoint
- Kirjuta sellele integratsioontest
- Lisa Swagger dokumentatsiooni

---

## Hindamiskriteeriumid

| Tase | Nõuded |
|------|--------|
| **Baas** | GET /health test, POST /users happy path + veacase, POST /bookings happy path, `beforeEach` puhastab andmebaasi |
| **Kesk** | POST /workshops testid, POST /bookings veacased (täis, duplikaat, olematu), Unit testid service kihile |
| **Edasijõudnud** | Mock meetodite kontroll, vigade struktuuri valideerimine, konkurentsuse test |
