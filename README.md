# Forum Diskusi App

Aplikasi Forum Diskusi adalah platform web interaktif yang memungkinkan pengguna untuk mendaftar, login, membuat thread diskusi, memberikan komentar, dan berinteraksi dengan konten dari pengguna lain. Aplikasi ini dibangun menggunakan React, Redux, dan berkomunikasi dengan Dicoding Forum API.

## Daftar Isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [CI/CD](#ci-cd)
- [Testing](#testing)
- [Screenshot](#screenshot)
- [Kredit](#kredit)

## Fitur

### Fitur Utama

- **Autentikasi Pengguna**

  - Registrasi akun baru
  - Login dengan akun yang sudah ada
  - Preload data user dari token yang tersimpan

- **Pengelolaan Thread**

  - Melihat daftar thread
  - Membuat thread baru (harus login)
  - Melihat detail thread beserta komentarnya

- **Interaksi dengan Thread**

  - Memberikan komentar pada thread (harus login)
  - Sistem voting (upvote/downvote) untuk thread
  - Sistem voting untuk komentar

- **Leaderboard**
  - Melihat peringkat pengguna berdasarkan skor

### Fitur UI

- Loading indicator saat memuat data dari API
- Navigasi yang responsif
- Tampilan yang user-friendly

## Teknologi

### Frontend

- **React 19** - Library UI utama
- **Redux Toolkit** - State management
- **React Router DOM v7** - Routing
- **ESLint** - Linting dengan konfigurasi AirBnB
- **Jest & React Testing Library** - Unit & integration testing
- **PropTypes** - Validasi props

### Tooling & Development

- **Create React App** - Setup project
- **ESLint** - Linting dengan konfigurasi AirBnB
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Deployment dan hosting
- **React Strict Mode** - Highlighting bugs potensial

## Struktur Proyek

```
forum-app/
├── public/                  # File statis dan HTML template
├── src/                     # Source code utama
│   ├── components/          # Komponen UI reusable
│   │   ├── Loading.jsx      # Komponen loading indicator
│   │   ├── Navigation.jsx   # Navigasi aplikasi
│   │   ├── ThreadItem.jsx   # Item thread untuk daftar thread
│   │   └── ThreadsList.jsx  # Daftar thread
│   │
│   ├── pages/               # Halaman-halaman aplikasi
│   │   ├── HomePage.jsx             # Halaman utama dengan daftar thread
│   │   ├── LoginPage.jsx            # Halaman login
│   │   ├── RegisterPage.jsx         # Halaman registrasi
│   │   ├── NewThreadPage.jsx        # Halaman pembuatan thread baru
│   │   ├── ThreadDetailPage.jsx     # Halaman detail thread
│   │   └── LeaderboardsPage.jsx     # Halaman leaderboard
│   │
│   ├── states/              # State management dengan Redux
│   │   ├── authUser/        # State untuk autentikasi
│   │   ├── threads/         # State untuk daftar thread
│   │   ├── threadDetail/    # State untuk detail thread
│   │   ├── users/           # State untuk data pengguna
│   │   ├── leaderboards/    # State untuk data leaderboard
│   │   ├── shared/          # Action dan fungsi yang dibagi
│   │   └── index.js         # Konfigurasi Redux store
│   │
│   ├── utils/               # Utility dan helper functions
│   │   ├── api.js           # Fungsi untuk komunikasi dengan API
│   │   ├── hooks.js         # Custom hooks
│   │   └── index.js         # Export dari utils
│   │
│   ├── App.js               # Komponen utama aplikasi
│   ├── index.js             # Entry point aplikasi
│   └── ...
│
├── package.json             # Konfigurasi dependencies
├── .eslintrc.js             # Konfigurasi ESLint
└── README.md                # Dokumentasi proyek
```

## Instalasi

1. Pastikan Node.js dan npm telah terinstall di komputer Anda
2. Clone repositori ini
3. Install dependencies

```bash
# Install dependencies
npm install
```

## Penggunaan

```bash
# Mode development
npm start

# Build untuk production
npm run build

# Menjalankan test
npm test
```

## API

Aplikasi ini menggunakan Dicoding Forum API yang menyediakan berbagai endpoint untuk:

- Autentikasi (register, login)
- Thread (daftar thread, buat thread, detail thread)
- Komentar (buat komentar)
- Vote (upvote/downvote thread dan komentar)
- Leaderboard

## CI/CD

Proyek ini mengimplementasikan CI/CD dengan GitHub Actions untuk:

1. **Continuous Integration**:
   - Lint checking untuk memastikan kualitas kode
   - Unit dan integration testing otomatis
   - Build checking untuk memastikan aplikasi dapat di-build

2. **Continuous Deployment**:
   - Deployment otomatis ke Vercel saat perubahan di-push ke branch main
   - Preview deployment untuk setiap pull request

File konfigurasi CI/CD dapat dilihat di `.github/workflows/ci.yml`.

## Testing

Proyek ini mencakup beberapa jenis test:

1. **Unit Testing**: Untuk menguji fungsi dan reducer individual
   - Test untuk reducer authUser
   - Test untuk reducer threads
   - Test untuk action creators

2. **Component Testing**: Untuk menguji komponen React
   - Test untuk ThreadItem component
   - Test untuk Navigation component

3. **Integration Testing**: Untuk menguji interaksi antar komponen dan state

Untuk menjalankan test:

```bash
# Jalankan semua test
npm test

# Jalankan test dengan coverage
npm test -- --coverage

# Jalankan test untuk file tertentu
npm test -- src/components/__tests__/ThreadItem.test.jsx
```

## Screenshot

_[Screenshots aplikasi akan ditampilkan di sini]_

## Kredit

Dikembangkan untuk memenuhi submission kelas Menjadi React Web Developer Expert di Dicoding.
