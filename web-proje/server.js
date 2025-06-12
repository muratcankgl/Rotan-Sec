// server.js
const express  = require('express');
const bcrypt   = require('bcrypt');
const sqlite3  = require('sqlite3').verbose();
const path     = require('path');

const app   = express();
const PORT  = 3000;
const DB_FP = path.join(__dirname, 'users.db');

// 1) Veritabanını aç & tabloyu oluştur
const db = new sqlite3.Database(DB_FP, err => {
  if (err) return console.error('DB AÇILAMADI:', err);
  console.log('DB bağlı:', DB_FP);
});
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT    UNIQUE NOT NULL,
      password TEXT    NOT NULL
    )
  `, err => {
    if (err) console.error('TABLO OLUŞTURULAMADI:', err);
    else       console.log('Tablo hazır: users');
  });
});

// 2) Middleware
app.use(express.json());                             // JSON gövde
app.use(express.urlencoded({ extended: true }));     // form-urlencoded gövde
app.use(express.static(path.join(__dirname, 'public'))); // public klasörü

// 3) REGISTER endpoint
app.post('/register', async (req, res) => {
  console.log('🍀 REGISTER body:', req.body);
  const { username, password, password2 } = req.body || {};

  if (!username || !password || !password2) {
    return res.status(400).json({ error: 'Lütfen tüm alanları doldurun.' });
  }
  if (password !== password2) {
    return res.status(400).json({ error: 'Parolalar eşleşmiyor.' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hash],
      function(err) {
        if (err) {
          console.error('❌ REGISTER DB HATASI:', err);
          return res.status(400).json({ error: 'Bu kullanıcı adı zaten alınmış.' });
        }
        console.log('✅ Yeni kullanıcı id:', this.lastID);
        return res.json({ message: 'Kayıt başarılı.' });
      }
    );
  } catch (err) {
    console.error('🔥 REGISTER HASH HATASI:', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// 4) LOGIN endpoint
app.post('/login', async (req, res) => {
  console.log('🔑 LOGIN body:', req.body);
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Lütfen kullanıcı adı ve parola girin.' });
  }

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, row) => {
      if (err) {
        console.error('❌ LOGIN DB HATASI:', err);
        return res.status(500).json({ error: 'Sunucu hatası.' });
      }
      if (!row) {
        return res.status(400).json({ error: 'Kullanıcı bulunamadı.' });
      }
      const match = await bcrypt.compare(password, row.password);
      if (!match) {
        return res.status(400).json({ error: 'Parola yanlış.' });
      }
      console.log('✅ Giriş başarılı:', username);
      return res.json({ message: 'Giriş başarılı.' });
    }
  );
});

// 5) Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
