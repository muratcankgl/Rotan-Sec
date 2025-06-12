// js/posts.js
document.addEventListener('DOMContentLoaded', () => {
    const posts = [
      {
        id: 1,
        title: "Kapadokya’da Balon Turu Deneyimi",
        date: "2025-04-01",
        excerpt: "Gökyüzünde süzülürken muhteşem peri bacalarını keşfedin…",
        cover: "js/kapadokya.jpg",
        slug: "kapadokya-balon-turu"
      },
      {
        id: 2,
        title: "İstanbul’un Gizli Sokak Lezzetleri",
        date: "2025-03-28",
        excerpt: "Galata’dan Karaköy’e uzanan sokak yemeği turu…",
        cover: "js/istanbulgorsel.jpg",
        slug: "istanbul-sokak-lezzetleri"
      },
      {
        id: 3,
        title: "Antalya’da Sakin Plaj Kaçamağı",
        date: "2025-03-15",
        excerpt: "Kalabalıktan uzak, huzurlu koylarda dinlenin…",
        cover: "js/antalyagorsel.jpg",
        slug: "antalya-sakin-plaj"
      },
      {
        id: 4,
        title: "İzmir’in Sanat Dolu Kafeleri",
        date: "2025-02-20",
        excerpt: "Kordon’dan Alsancak’a uzanan kafe rehberi…",
        cover: "img/posts/izmir-cafe.jpg",
        slug: "izmir-sanat-kafeleri"
      }
    ];
  
    // Sadece son 3 postu al
    const latest = posts.slice(0, 3);
    const container = document.getElementById('latestPosts');
    if (!container) return;
  
    latest.forEach(p => {
      const card = document.createElement('article');
      card.className = 'blog-post';
      card.innerHTML = `
        <img src="${p.cover}" alt="${p.title}">
        <h3>${p.title}</h3>
        <small>${p.date}</small>
        <p>${p.excerpt}</p>
        <a href="blog.html" class="btn btn-primary">
        Devamını Oku <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </a>
      `;
      container.appendChild(card);
    });
  });
  