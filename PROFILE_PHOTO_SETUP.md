# Setup Foto Profil Aesthetic

## 📸 Cara Menggunakan

### 1. **Siapkan Foto Profil Anda**
- Ukuran optimal: **280px × 280px** (akan di-crop sesuai ukuran tersebut)
- Format: **JPG**, **PNG**, atau **WebP**
- Rekomendasi: Foto portrait dengan latar belakang yang simple dan clean
- Lokasi simpan: `/public/images/profile.jpg`

### 2. **Upload Foto Profil**
- Copy foto Anda ke folder `public/images/`
- Rename file menjadi `profile.jpg` (atau sesuaikan path di `ProfilePhoto.js` jika nama berbeda)

### 3. **Verifikasi Path**
Di file `src/components/ProfilePhoto.js`, pastikan path gambar benar:
```javascript
<img 
  src="/images/profile.jpg"  // ← Sesuaikan jika nama file berbeda
  alt="Dwiky Candra Profile"
  className="profile-photo"
/>
```

## 🎨 Fitur Aesthetic

### Hover Effects
- ✨ **Zoom Effect**: Foto scale up 5% saat di-hover
- ⬆️ **Lift Effect**: Foto naik 8px ke atas
- 🌟 **Brightness Boost**: Kecerahan meningkat 15%
- 🎆 **Gradient Border**: Border animasi dengan gradient warna accent
- ✨ **Shine Effect**: Efek cahaya halus saat di-hover
- 💫 **Enhanced Shadow**: Shadow yang lebih dalam dan berwarna

### Animasi Otomatis
- Gradient border bergerak secara smooth dengan durasi 6 detik
- Semua transisi menggunakan cubic-bezier untuk effect yang premium
- Responsive: Ukuran berbeda untuk desktop, tablet, mobile

## 📐 Customization

### Mengubah Ukuran Foto
Edit di `src/components/profilePhoto.css`:
```css
.profile-photo-wrapper {
  width: 280px;  /* Ubah ini */
  height: 280px; /* Dan ini */
}

.profile-photo {
  width: 280px;  /* Ubah ini */
  height: 280px; /* Dan ini */
}
```

### Mengubah Warna Accent
Warna border gradient menggunakan variable CSS `--accent` dan `--accent-2`. 
Update di file CSS utama atau di `App.css`:
```css
:root {
  --accent: #9b59ff;
  --accent-2: #f093fb;
}
```

### Mengubah Kecepatan Animasi
Di `profilePhoto.css`, ubah nilai duration:
```css
@keyframes gradientBorder {
  /* Ubah 6s menjadi nilai lain untuk kecepatan berbeda */
  animation: gradientBorder 6s ease infinite;
}
```

### Mengubah Radius Border
Edit `border-radius` di CSS:
```css
.profile-photo {
  border-radius: 20px; /* Ubah ini untuk lebih/kurang rounded */
}
```

## 🖼️ Tips Memilih Foto yang Baik

1. **Lighting**: Pilih foto dengan pencahayaan yang baik, tidak terlalu gelap
2. **Background**: Latar belakang simpel atau blur untuk fokus pada wajah
3. **Expression**: Foto dengan ekspresi natural dan ramah
4. **Composition**: Posisikan wajah di center, headshot atau 3/4 pose
5. **Quality**: Gunakan foto HD/high resolution untuk hasil terbaik

## 🚀 Troubleshooting

### Foto tidak muncul
- Pastikan file ada di `/public/images/profile.jpg`
- Check browser console untuk error messages
- Jika path salah, akan muncul placeholder dari placeholder.com

### Animasi tidak berjalan
- Pastikan CSS file `profilePhoto.css` sudah di-import di `ProfilePhoto.js`
- Clear browser cache dan reload halaman
- Check di DevTools apakah CSS ter-load dengan benar

### Foto terpotong
- Pastikan foto memiliki aspect ratio 1:1 (square)
- Gunakan image editor untuk crop foto jika diperlukan

## 📱 Responsive Behavior

Component sudah responsive dan akan menyesuaikan ukuran pada:
- **Desktop (>768px)**: 280px × 280px
- **Tablet (480px-768px)**: 240px × 240px  
- **Mobile (<480px)**: 200px × 200px

## ✅ Checklist Setup

- [ ] Foto profil sudah siap (280x280px, JPG/PNG)
- [ ] File tersimpan di `/public/images/profile.jpg`
- [ ] Path di `ProfilePhoto.js` sudah benar
- [ ] Buka halaman About Me dan hover pada foto
- [ ] Verifikasi semua effect bekerja dengan baik

Selamat! Profile photo section sudah siap digunakan! 🎉
