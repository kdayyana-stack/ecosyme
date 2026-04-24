# EcoQuest - Website Edukasi Ecoenzim 🌱

Website edukasi interaktif untuk belajar tentang ecoenzim dengan sistem gamifikasi lengkap!

## ✨ Fitur Utama

### 📚 Sistem Pembelajaran
- **4 Modul Lengkap**: Dari pengenalan hingga troubleshooting
- **Materi Interaktif**: Dengan ilustrasi dan penjelasan detail
- **Kuis Pemahaman**: Di setiap akhir modul
- **Progress Tracking**: Unlock modul secara bertahap

### 🎮 3 Game Edukasi
1. **Sortir Sampah** (60 detik)
   - Pilih sampah organik yang tepat
   - Sistem poin: +10 untuk benar, -5 untuk salah
   - High score tracking

2. **Racik Ecoenzim**
   - Atur rasio bahan dengan slider interaktif
   - Target: Sampah 3 : Gula 1 : Air 10
   - Feedback real-time

3. **Kuis Ecoenzim**
   - 5 pertanyaan pilihan ganda
   - 20 poin per jawaban benar
   - Skor maksimal: 100

### 🔥 FITUR STREAK HARIAN (BARU!)

#### Cara Kerja Streak:
1. **Main Game Setiap Hari**: Pilih game apapun (Sortir, Racik, atau Kuis)
2. **Selesaikan Game**: Finish hingga akhir untuk mencatat streak
3. **Bonus XP**: Dapatkan bonus XP = Streak x 10
   - Streak 1 hari = +10 XP
   - Streak 5 hari = +50 XP
   - Streak 30 hari = +300 XP

#### Fitur Streak:
- ✅ **Status Harian**: Tahu apakah sudah main hari ini
- 🔥 **Streak Counter**: Angka besar menunjukkan berapa hari berturut-turut
- 🏆 **Longest Streak**: Rekor streak terpanjang tersimpan
- 📅 **Calendar Visual**: Lihat 14 hari terakhir aktivitas
- ⚡ **Reminder**: Notifikasi jika belum main hari ini
- 💔 **Streak Reset**: Otomatis reset jika tidak main >1 hari

#### Mekanisme Streak:
- **Hari Pertama**: Streak dimulai dari 1
- **Hari Berikutnya**: Streak +1 jika main di hari konsekutif
- **Skip 1 Hari**: Streak kembali ke 0
- **Sudah Main Hari Ini**: Tombol disabled sampai besok
- **Setiap Game Dihitung**: Main game apapun untuk lanjutkan streak

### 🏆 Sistem Gamifikasi Lengkap

#### Level & XP System
- **XP dari Berbagai Aktivitas**:
  - Selesai modul: +100 XP
  - Jawab kuis benar: +50 XP
  - Main game: XP berdasarkan skor
  - **STREAK BONUS**: Hari ke-N x 10 XP

- **Level Up**: Setiap level butuh Level x 100 XP
  - Level 1 → 2: 100 XP
  - Level 2 → 3: 200 XP
  - Level 5 → 6: 500 XP

#### Badge System
Unlock badge berdasarkan level:
- 🌟 **Pemula** - Level 2
- 🔬 **Ilmuwan** - Level 5
- 🏅 **Ahli Eco** - Level 10
- 👑 **Master** - Level 20

#### Avatar Kustomisasi
Ganti avatar dengan klik "Ubah Avatar":
🌱 🌿 🍀 🌾 🌳 🌲 🌴 🌵 🌸 🌺 🌻 🌼

### 💾 Data Persistence
- **LocalStorage**: Semua progress tersimpan di browser
- **Auto Save**: Otomatis save setiap ada perubahan
- **Data Tersimpan**:
  - Level & XP
  - Modul yang selesai
  - High score game
  - Badge yang didapat
  - **Streak & history bermain**
  - Avatar pilihan

## 🎯 Tujuan Edukasi

1. **Literasi Lingkungan**: Memahami cara mengurangi sampah organik
2. **Keterampilan Praktis**: Belajar membuat ecoenzim dari nol
3. **Kepedulian Lingkungan**: Menumbuhkan awareness tentang sustainability
4. **Habit Building**: Streak system mendorong konsistensi belajar

## 🚀 Cara Menggunakan

### Setup:
1. Download 3 file: `index.html`, `styles.css`, `script.js`
2. Letakkan di folder yang sama
3. Buka `index.html` di browser

### Tips Maksimalkan Pembelajaran:
1. **Mulai dari Modul 1**: Pelajari secara berurutan
2. **Jaga Streak**: Main minimal 1 game setiap hari
3. **Target Level 20**: Untuk unlock semua badge
4. **Coba Semua Game**: Setiap game punya pembelajaran berbeda
5. **Catat Rekor**: Beat your high score!

## 📱 Kompatibilitas

- ✅ Chrome / Edge / Firefox / Safari
- ✅ Desktop & Laptop
- ✅ Tablet & Mobile (responsive)
- ⚠️ Butuh JavaScript aktif
- ⚠️ Butuh localStorage aktif

## 🛠️ Teknologi

- **HTML5**: Struktur semantic modern
- **CSS3**: 
  - Flexbox & Grid layout
  - Animations & transitions
  - Gradient backgrounds
  - Responsive design
- **Vanilla JavaScript**:
  - Event handling
  - LocalStorage API
  - Date manipulation untuk streak
  - Game logic
  - No dependencies!

## 🎓 Target Pengguna

- **Pelajar SMP-SMA** (13-18 tahun)
- **Mahasiswa** yang tertarik sustainability
- **Guru** untuk media pembelajaran
- **Komunitas Lingkungan**
- **Siapa saja** yang ingin belajar ecoenzim

## 📊 Materi yang Diajarkan

### Modul 1: Dasar Ecoenzim
- Definisi ecoenzim
- Sejarah penemuan
- Proses fermentasi 3 bulan
- Timeline pembuatan

### Modul 2: Manfaat
- Kegunaan rumah tangga (12 manfaat)
- Dampak lingkungan positif
- Penghematan biaya
- Statistik dampak

### Modul 3: Cara Membuat
- Bahan & alat yang dibutuhkan
- Rasio 3:1:10 (Sampah:Gula:Air)
- 6 langkah pembuatan detail
- Do's and Don'ts

### Modul 4: Tips & Troubleshooting
- Ciri ecoenzim berhasil
- 4 masalah umum + solusi
- Cara optimasi hasil

## 🏃 Roadmap Pengembangan

### Version 2.0 (Bisa Ditambahkan):
- [ ] Leaderboard global
- [ ] Share progress ke sosmed
- [ ] Export sertifikat completion
- [ ] Video tutorial
- [ ] Forum komunitas
- [ ] Notifikasi push untuk reminder streak
- [ ] Weekly/Monthly challenges
- [ ] Multiplayer game mode

## 💡 Ide Penggunaan

1. **Di Sekolah**: 
   - Media pembelajaran Biologi/IPA
   - Projek lingkungan hidup
   - Ekstrakurikuler

2. **Di Rumah**:
   - Belajar mandiri
   - Family activity
   - Mulai produksi ecoenzim

3. **Di Komunitas**:
   - Workshop lingkungan
   - Campaign zero waste
   - Social media content

## 🤝 Kontribusi

Untuk mengembangkan lebih lanjut:
1. Fork project ini
2. Tambahkan fitur baru
3. Customize desain sesuai brand
4. Tambah konten materi
5. Integrasikan dengan backend/database

## 📝 Lisensi

Feel free to use, modify, and distribute!
Cocok untuk:
- Tugas sekolah/kuliah
- Project akhir
- Proposal kegiatan
- Media pembelajaran

## 🌟 Highlight Features

✨ **Streak System** - Habit building yang efektif!
🎮 **3 Game Interaktif** - Belajar sambil bermain
📚 **4 Modul Lengkap** - Dari dasar hingga advanced
🏆 **Gamifikasi Penuh** - Level, badge, XP
💾 **Auto Save** - Progress tidak hilang
📱 **Responsive** - Bisa dimainkan di mana saja
🚀 **No Installation** - Langsung bisa dipakai

---

**Dibuat dengan ❤️ untuk pendidikan lingkungan yang lebih menyenangkan!**

🌱 Start your eco journey today! 🌍
