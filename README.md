# EduPulse — Student Early Warning System

EduPulse adalah aplikasi web **Student Early Warning System** yang membantu sekolah memantau kondisi akademik siswa melalui data nilai, presensi, performa, dan informasi risiko.

Aplikasi ini dirancang untuk membantu guru dan pihak sekolah **mengidentifikasi siswa yang membutuhkan perhatian lebih awal**, melihat faktor yang berkaitan dengan risiko, serta menyediakan dashboard yang berbeda sesuai kebutuhan pengguna.

> **Project type:** Capstone / Educational Project  
> **Frontend:** React + Vite  
> **Backend:** Django REST API  
> **Status:** Active Development

---

## 1. Latar Belakang

Dalam proses pembelajaran, kondisi siswa tidak selalu dapat diketahui hanya dari nilai akhir. Perubahan nilai, presensi, performa tugas, dan indikator akademik lainnya dapat menjadi tanda bahwa seorang siswa membutuhkan perhatian lebih awal.

EduPulse dikembangkan untuk menyatukan informasi tersebut dalam satu dashboard sehingga guru, sekolah, siswa, dan orang tua dapat melihat informasi yang relevan sesuai perannya.

---

## 2. Tujuan

EduPulse memiliki tujuan utama untuk:

- Memusatkan data akademik siswa dalam satu aplikasi.
- Membantu guru memantau nilai dan presensi siswa.
- Menampilkan tingkat risiko siswa berdasarkan hasil analisis/prediksi dari API backend.
- Membantu sekolah menemukan siswa yang membutuhkan perhatian lebih awal.
- Memberikan dashboard khusus untuk guru/admin, siswa, dan orang tua.

---

## 3. Fitur Utama

### Dashboard Sekolah / Guru

- Ringkasan jumlah siswa.
- Distribusi tingkat risiko siswa.
- Analisis performa akademik.
- Grafik tren performa.
- Analisis berdasarkan kelas dan mata pelajaran.
- Daftar siswa dengan risiko tinggi.
- Informasi intervensi / rekomendasi siswa.

### Manajemen Siswa

- Melihat daftar siswa.
- Filter siswa berdasarkan data akademik.
- Melihat detail siswa.
- Melihat analisis risiko siswa.
- Melihat rekomendasi berdasarkan data risiko.
- Menambahkan data siswa.

### Input Nilai & Presensi

- Memilih kelas dan mata pelajaran.
- Melihat siswa berdasarkan kelas.
- Input nilai siswa.
- Input presensi siswa.
- Mengirim data ke REST API backend.

### Pengaturan Akademik

- Mengelola data kelas.
- Mengelola data mata pelajaran.

### Dashboard Siswa

Siswa dapat melihat informasi akademiknya sendiri, termasuk:

- Performa akademik.
- Presensi.
- Study time.
- Hasil assessment.
- Indikator risiko.
- Informasi rekomendasi.

### Dashboard Orang Tua

Orang tua dapat melihat perkembangan akademik siswa yang terkait dengan akun mereka, termasuk:

- Performa siswa.
- Presensi.
- Study time.
- Assessment.
- Indikator risiko.
- Informasi rekomendasi.

---

## 4. Role Pengguna

| Role | Akses Utama |
| --- | --- |
| **ADMIN** | Dashboard, daftar siswa, input nilai & presensi, pengaturan |
| **GURU** | Dashboard, daftar siswa, input nilai & presensi |
| **SISWA** | Dashboard siswa |
| **ORANG TUA** | Dashboard orang tua |

Redirect setelah login ditentukan berdasarkan role yang diberikan oleh API backend.

---

## 5. Tech Stack

### Frontend

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Recharts](https://recharts.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Lucide React](https://lucide.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

### Development Tools

- ESLint
- Vite Dev Server
- JavaScript / JSX

### Backend Integration

Frontend terhubung ke **REST API Django** untuk autentikasi, data akademik, siswa, nilai, presensi, dashboard, prediksi risiko, dan rekomendasi.

---

## 6. Arsitektur Frontend

Struktur project menggunakan pemisahan antara halaman, komponen, custom hook, service API, utility, constant, dan stylesheet.

```text
src/
├── assets/             # Asset gambar dan icon
├── components/         # Komponen UI yang dapat digunakan kembali
├── constants/          # Constant aplikasi
├── data/               # Data statis / dummy untuk kebutuhan UI tertentu
├── hooks/              # Custom hooks untuk state dan business logic
├── pages/              # Halaman utama aplikasi
├── services/           # Komunikasi dengan REST API
├── styles/             # CSS per halaman + theme global
└── utils/              # Utility function bersama
```

### Custom Hook Utama

Beberapa logic yang digunakan oleh lebih dari satu halaman sudah dipusatkan ke custom hook, di antaranya:

- `useCurrentUser` — mengambil user aktif dari session/cache.
- `useTeachingFilters` — filter kelas dan mata pelajaran untuk input akademik.
- `useStudentsByClass` — mengambil daftar siswa berdasarkan kelas.
- `useAcademicResource` — logic CRUD generic untuk resource akademik.
- `useDashboardByStudent` — logic bersama dashboard siswa dan orang tua.
- `useStudentRecommendation` — mengambil dan mengelola rekomendasi siswa.
- `useStudentRiskMapel` — mengelola data risiko berdasarkan mata pelajaran.

---

## 7. Routing

| Path | Halaman |
| --- | --- |
| `/` | Landing Page |
| `/login` | Login |
| `/dashboard` | Dashboard sekolah/guru |
| `/daftar-siswa` | Daftar siswa |
| `/detail-siswa/:id` | Detail siswa |
| `/tambah-siswa` | Tambah siswa |
| `/input-nilai-dan-absensi` | Input nilai & presensi |
| `/pengaturan` | Pengaturan |
| `/pengaturan-akademik` | Pengaturan akademik |
| `/dashboard-siswa/:nisn` | Dashboard siswa |
| `/dashboard-ortu/:nisn` | Dashboard orang tua |

---

## 8. Integrasi REST API

Seluruh komunikasi HTTP utama dipusatkan di:

```text
src/services/api.js
```

API service menangani antara lain:

- Login.
- Refresh access token.
- Pengambilan user aktif.
- Dashboard summary.
- School analytics.
- Data siswa.
- Data kelas.
- Data mata pelajaran.
- Data semester / tahun ajaran.
- Nilai.
- Presensi.
- Prediksi risiko.
- Rekomendasi.

Authentication menggunakan access token dan refresh token yang disimpan pada `localStorage`.

Saat access token mendapatkan response `401`, Axios interceptor mencoba melakukan refresh token sebelum request diulang.

---

## 9. Environment Variable

Project menyediakan contoh konfigurasi environment melalui:

```text
.env.example
.env.local.example
```

### Development

Saat development, frontend menggunakan **Vite proxy** agar request API tidak langsung melakukan CORS ke domain backend/ngrok dari browser.

Buat file `.env.local` di root project:

```env
VITE_API_PROXY_TARGET=https://URL-NGROK-BACKEND-AKTIF.ngrok-free.app
```

**Jangan menambahkan `/api` pada `VITE_API_PROXY_TARGET`.**

Benar:

```env
VITE_API_PROXY_TARGET=https://abc123.ngrok-free.app
```

Bukan:

```env
VITE_API_PROXY_TARGET=https://abc123.ngrok-free.app/api
```

### Production

Untuk production, gunakan:

```env
VITE_API_BASE_URL=https://domain-backend-kamu.example.com/api
```

Backend production tetap harus mengizinkan origin frontend melalui konfigurasi CORS.

> Jangan commit file `.env`, `.env.local`, atau secret/token ke repository.

---

## 10. Cara Menjalankan Project

### Prerequisites

Pastikan sudah terinstall:

- Node.js
- npm
- Backend API EduPulse yang dapat diakses

### Install dependency

```bash
npm install
```

### Konfigurasi API

Buat `.env.local` dari template:

```text
.env.local.example → .env.local
```

Kemudian isi URL backend ngrok yang sedang aktif.

### Jalankan development server

```bash
npm run dev
```

Aplikasi akan tersedia melalui URL yang diberikan Vite, biasanya:

```text
http://localhost:5173
```

### Build production

```bash
npm run build
```

### Preview hasil build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 11. Alur Autentikasi

Secara umum alur login adalah:

```text
Login Form
    ↓
POST /v1/auth/login/
    ↓
Access Token + Refresh Token + User
    ↓
Simpan session di localStorage
    ↓
Identifikasi role
    ↓
Redirect ke dashboard sesuai role
```

Untuk session yang masih aktif, request API menyertakan:

```http
Authorization: Bearer <access_token>
```

Jika access token expired dan backend mengembalikan `401`, frontend mencoba melakukan refresh token.

---

## 12. Development Proxy & CORS

Pada mode development, frontend memakai Vite proxy untuk request `/api`.

```text
Browser
   ↓
http://localhost:5173/api/...
   ↓
Vite Proxy
   ↓
Backend API / ngrok
   ↓
Django REST API
```

Pendekatan ini membantu menghindari masalah CORS ketika frontend development berjalan di `localhost:5173`.

Untuk production, konfigurasi CORS tetap perlu dilakukan pada backend Django sesuai domain frontend yang digunakan.

---

## 13. Design System

UI menggunakan pendekatan visual yang konsisten dengan palette yang lembut dan low-contrast.

Style global berada di:

```text
src/styles/theme.css
```

Style per halaman dipisahkan berdasarkan kebutuhan halaman, misalnya:

```text
src/styles/dashboard-page.css
src/styles/student-detail-page.css
src/styles/student-list-page.css
src/styles/input-nilai-dan-absensi.css
```

Style bersama yang sebelumnya berulang telah dipusatkan untuk mengurangi duplikasi CSS.

---

## 14. Repository Documentation Checklist

Dokumentasi minimum yang disarankan untuk repository ini:

- `README.md` — dokumentasi utama project.
- `.env.example` — contoh konfigurasi environment tanpa secret.
- `REFACTOR_NOTES.md` — catatan refactor dan perubahan struktur kode.
- `docs/images/` — screenshot produk.
- Link demo video.
- Link dokumentasi API backend.

Dokumen tambahan seperti `CONTRIBUTING.md`, `CHANGELOG.md`, dan `LICENSE` dapat ditambahkan sesuai kebutuhan repository.

---

## 15. Git Workflow

Contoh workflow sederhana untuk perubahan fitur:

```bash
git switch main
git pull --rebase origin main

git add .
git commit -m "feat: add student risk dashboard"
git push origin main
```

Untuk perubahan refactor:

```bash
git commit -m "refactor: improve frontend structure and API proxy"
```

Gunakan pesan commit yang menjelaskan tujuan perubahan agar riwayat repository mudah dibaca.

---

## 16. Project Structure

```text
EduPulse/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .env.local.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── REFACTOR_NOTES.md
└── vite.config.js
```

---

## 17. Team / Contributors

Fullstack Developer
B26B14R010  - Sutri Purnomo 
B26B14R015 - Anita Dewi 
B26B14R005 - Ali Zaenal Abidin
Data Science
B26B14S007 - Muhammad Hizam Al Ibrahim


---
