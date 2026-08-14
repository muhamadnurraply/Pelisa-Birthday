# Website Ulang Tahun 💌

Website satu halaman, tema elegant dark + gold/rose. Alur: amplop bersegel → buka →
greeting → galeri foto → surat → 3 lilin surprise → musik latar.

## Cara buka & preview di VS Code

1. Buka folder ini di VS Code.
2. Install extension **Live Server** (kalau belum ada).
3. Klik kanan `index.html` → **Open with Live Server**.
4. Website kebuka di browser, auto-reload tiap kamu save.

## Yang WAJIB diganti sebelum kirim

### 1. Nama & teks personal
Cari placeholder ini di `index.html` dan ganti sesuai kebutuhan:
- `[Nama Dia]` — muncul 3 kali (amplop, hero, final reveal)
- `[Nama Kamu]` — signature surat & footer
- `[panggilan sayang]`, `[dia yang selalu ada / ...]` — sesuaikan gaya bahasa kamu
- Isi lengkap surat di bagian `<div class="letter-body">`
- Caption tiap foto di `<figcaption>`
- 3 pesan rahasia lilin, di `data-msg="..."` pada tiap `<button class="candle">`

### 2. Foto
Masukkan foto ke folder `assets/photos/`, lalu di `index.html` ganti tiap:
```html
<div class="photo-placeholder">📷<span>ganti-fotomu-1.jpg</span></div>
```
jadi:
```html
<img src="assets/photos/nama-file-kamu.jpg" alt="caption singkat">
```
(boleh tambah CSS `.photo-placeholder` style ke `img` kalau mau, atau kasih tau aku biar aku sesuaikan)

### 3. Musik latar
Taruh file mp3 di `assets/music/lagu.mp3` (nama file harus persis `lagu.mp3`,
atau ganti path-nya di `index.html` pada tag `<source src="...">`).

> Catatan: browser sering **block autoplay** musik sebelum ada interaksi user.
> Karena situs ini dibuka lewat klik amplop dulu, musik akan otomatis dicoba
> diputar tepat setelah amplop diklik — biasanya berhasil. Kalau tidak,
> tombol musik di pojok kanan bawah bisa dipencet manual.

## Deploy gratis (biar bisa dikirim via link)

**Opsi termudah — Netlify Drop:**
1. Buka https://app.netlify.com/drop
2. Drag & drop seluruh folder `birthday-website`
3. Dapat link langsung jadi, tinggal share

**Opsi lain — GitHub Pages:**
1. Push folder ini ke repo GitHub baru
2. Settings → Pages → pilih branch `main` → Save
3. Link jadi di `https://username.github.io/nama-repo`

## Struktur file
```
birthday-website/
├── index.html      ← struktur & isi teks
├── style.css        ← semua styling & warna
├── script.js         ← interaksi (amplop, lilin, musik, animasi scroll)
├── assets/
│   ├── photos/       ← taruh foto kamu di sini
│   └── music/         ← taruh lagu di sini
└── README.md
```

Kalau mau ubah warna, tinggal ubah nilai di bagian `:root{ }` paling atas `style.css` —
semua elemen lain otomatis ikut.
