/* ============================================================
   YILKI GAMES — arayüz davranışları
   Dört iş: dil değiştirici, kaydırınca beliren paneller, kaydırınca
   gölgelenen üst bar, hero'da dokununca patlayan ses efektleri. Hepsi isteğe bağlı — ilgili düğüm
   yoksa sessizce atlanıyor, aynı dosya her sayfaya konabiliyor.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- dil seçici ----------------
     Üst bardaki küre düğmesi, altında ana dillerin kendi yazımıyla
     listelendiği panel. Seçim tarayıcıda saklanıyor. */

  /* Metinleri sayfaya yazar. Eksik anahtar hata vermez: o dilde
     karsiligi yoksa varsayilan dilinki, o da yoksa HTML'de yazan
     kalir. Boylece yarim ceviri sayfayi bosaltmiyor. */
  function metinleriUygula(dil) {
    var sozluk = METIN[dil] || {};
    var yedek = METIN[VARSAYILAN] || {};

    document.querySelectorAll("[data-i18n]").forEach(function (e) {
      var a = e.getAttribute("data-i18n");
      var m = sozluk[a] !== undefined ? sozluk[a] : yedek[a];
      if (m !== undefined) e.textContent = m;
    });

    /* İçinde <em>, <strong>, <br> geçen metinler. Ayrı tutuluyor:
       aynı yoldan basarsak etiketler ekranda yazı olarak görünür. */
    document.querySelectorAll("[data-i18n-html]").forEach(function (e) {
      var a = e.getAttribute("data-i18n-html");
      var m = sozluk[a] !== undefined ? sozluk[a] : yedek[a];
      if (m !== undefined) e.innerHTML = m;
    });

    /* Sayfa başlığı ve açıklaması da çevrilsin: <body> üzerindeki
       data-title / data-desc anahtarları buna yarıyor. */
    var g = document.body;
    var bAnahtar = g.getAttribute("data-title");
    var aAnahtar = g.getAttribute("data-desc");
    if (bAnahtar && (sozluk[bAnahtar] || yedek[bAnahtar])) {
      document.title = sozluk[bAnahtar] || yedek[bAnahtar];
    }
    if (aAnahtar) {
      var etiket = document.querySelector('meta[name="description"]');
      if (etiket && (sozluk[aAnahtar] || yedek[aAnahtar])) {
        etiket.setAttribute("content", sozluk[aAnahtar] || yedek[aAnahtar]);
      }
    }

    document.documentElement.lang = dil;
  }

  /* Açılışta: kayıtlı tercih → tarayıcı dili → varsayılan */
  function ilkDil() {
    var kayitli = (localStorage.getItem("yg-dil") || "").toLowerCase();
    if (DILLER[kayitli]) return kayitli;
    var tarayici = (navigator.language || "").slice(0, 2).toLowerCase();
    if (DILLER[tarayici]) return tarayici;
    return VARSAYILAN;
  }

  var dugme = document.getElementById("dil-dugme");
  var panel = document.getElementById("dil-panel");
  var kodYazi = document.getElementById("dil-kod");

  if (dugme && panel && kodYazi) {
    var secili = ilkDil();
    kodYazi.textContent = secili.toUpperCase();
    metinleriUygula(secili);

    Object.keys(DILLER).forEach(function (kod) {
      var d = document.createElement("button");
      d.type = "button";
      d.textContent = DILLER[kod];
      d.setAttribute("role", "menuitem");
      if (kod === secili) d.setAttribute("aria-current", "true");
      d.addEventListener("click", function () {
        localStorage.setItem("yg-dil", kod);
        kodYazi.textContent = kod.toUpperCase();
        metinleriUygula(kod);
        panel.querySelectorAll("button").forEach(function (b) {
          b.removeAttribute("aria-current");
        });
        d.setAttribute("aria-current", "true");
        kapat();
      });
      panel.appendChild(d);
    });

    function ac() {
      panel.classList.add("acik");
      dugme.setAttribute("aria-expanded", "true");
    }

    function kapat() {
      panel.classList.remove("acik");
      dugme.setAttribute("aria-expanded", "false");
    }

    dugme.addEventListener("click", function (e) {
      e.stopPropagation();
      if (panel.classList.contains("acik")) kapat();
      else ac();
    });

    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target)) kapat();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") kapat();
    });
  }

  /* ---------------- kaydırınca beliren bölümler ---------------- */

  var belirecekler = document.querySelectorAll(".beliriv");

  /* Gizleme CSS'te yalnızca html.hareket varken devrede: betik hiç
     çalışmazsa içerik zaten görünür kalıyor. */
  var hareketAzalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (belirecekler.length && !hareketAzalt) {
    if (!("IntersectionObserver" in window)) {
      belirecekler.forEach(function (e) {
        e.classList.add("gorundu");
      });
    } else {
      var gozcu = new IntersectionObserver(
        function (girisler) {
          girisler.forEach(function (g) {
            if (g.isIntersecting) {
              g.target.classList.add("gorundu");
              gozcu.unobserve(g.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.06 }
      );
      document.documentElement.classList.add("hareket");
      belirecekler.forEach(function (e) {
        gozcu.observe(e);
      });
      /* Emniyet: gözcü bir sebeple tetiklenmezse 2,5 sn sonra ekrandaki
         her şey görünür olsun — boş sayfa hiçbir koşulda kalmasın. */
      setTimeout(function () {
        belirecekler.forEach(function (e) {
          var r = e.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) e.classList.add("gorundu");
        });
      }, 2500);
    }
  }

  /* ---------------- üst bar ---------------- */

  var bar = document.getElementById("ust-bar");
  if (bar) {
    var son = -1;
    var tik = function () {
      var inildi = window.scrollY > 40;
      if (inildi !== son) {
        bar.classList.toggle("inildi", inildi);
        son = inildi;
      }
    };
    tik();
    window.addEventListener("scroll", tik, { passive: true });
  }
})();

/* ============================================================
   SES EFEKTLERİ
   Hero'da boş bir yere dokununca dokunulan noktada çizgi roman
   patlaması beliriyor: "PAT!", "GÜM!"... Oyunlarımızın ilk kuralı
   "her dokunuşa tepki" — site de buna uysun.

   Bağlantı ve düğmelere dokunuş sayılmıyor; aynı anda en fazla
   altı patlama ekranda kalıyor, eskisi siliniyor.
   ============================================================ */
(function () {
  "use strict";

  var alan = document.getElementById("hero");
  if (!alan) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SESLER = ["PAT!", "GÜM!", "BAM!", "POW!", "ŞAK!", "ZING!", "VUŞ!", "KA-BUM!", "BİNG!", "ÇAT!"];
  var RENKLER = ["", "kirmizi"];
  var sira = 0;
  var canli = [];

  alan.addEventListener("pointerdown", function (e) {
    if (e.target.closest("a, button")) return;

    var kutu = alan.getBoundingClientRect();
    var p = document.createElement("span");
    p.className = "patlama ses-efekti " + RENKLER[sira % 2];
    p.setAttribute("aria-hidden", "true");
    p.textContent = SESLER[Math.floor(Math.random() * SESLER.length)];
    p.style.left = e.clientX - kutu.left + "px";
    p.style.top = e.clientY - kutu.top + "px";
    p.style.setProperty("--aci", Math.round(Math.random() * 40 - 20) + "deg");
    p.style.setProperty("--boy", 100 + Math.round(Math.random() * 50) + "px");
    sira++;

    alan.appendChild(p);
    canli.push(p);
    if (canli.length > 6) canli.shift().remove();
    p.addEventListener("animationend", function () {
      p.remove();
      var i = canli.indexOf(p);
      if (i > -1) canli.splice(i, 1);
    });
  });
})();
