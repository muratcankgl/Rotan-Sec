const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db', err => {
  if (err) console.error('DB açılamadı:', err);
  else console.log('DB bağlı: users.db');
});

// Tablo yoksa oluştur
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, err => {
    if (err) console.error('Tablo oluşturulamadı:', err);
    else console.log('Tablo hazır: users');
  });
});
