// js/campaigns.js
const campaigns = [
    {
      title: "%20 Erken Rezervasyon İndirimi!",
      subtitle: "Kapadokya turlarında şimdi yerinizi ayırtın.",
      cta: "Hemen İncele"
    },
    {
      title: "Ailece Tatil Fırsatları",
      subtitle: "4 kişiye 3 kişi fiyatına Antalya paketleri.",
      cta: "Fırsatları Gör"
    },
    {
      title: "Hafta Sonu Kaçamakları",
      subtitle: "İstanbul’da konaklamalı mini turlar size özel.",
      cta: "Detaylara Bak"
    }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const banner  = document.getElementById('campaignBanner');
    const titleEl = banner?.querySelector('.campaign-title');
    const subEl   = banner?.querySelector('.campaign-subtitle');
    const btn     = banner?.querySelector('.campaign-btn');
  
    if (!banner || !titleEl || !subEl || !btn) {
      console.error('Kampanya banner elemanları eksik:', {
        bannerExists: !!banner,
        titleEl, subEl, btn
      });
      return;
    }
  
    let idx = 0;
    function showCampaign(i) {
      const c = campaigns[i];
      titleEl.textContent       = c.title    || '';
      subEl.textContent         = c.subtitle || '';
      btn.textContent           = c.cta      || '';
      btn.setAttribute('href',  '#searchForm');
  
      // Önceki listener'ları temizlemek için clone yöntemi
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
  
      newBtn.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('searchForm')
                .scrollIntoView({ behavior: 'smooth' });
        alert('Rota seçiniz');
      });
    }
  
    // İlk kampanyayı göster ve interval’i başlat
    showCampaign(idx);
    setInterval(() => {
      idx = (idx + 1) % campaigns.length;
      showCampaign(idx);
    }, 5000);
  });
  