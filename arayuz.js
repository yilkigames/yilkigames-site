/* ============================================================
   YILKI GAMES — arayüz davranışları
   Üç iş: ipe bağlı dil değiştirici, kaydırınca beliren bölümler,
   kaydırınca koyulaşan üst bar. Hepsi isteğe bağlı — ilgili düğüm
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

  if (belirecekler.length) {
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
      belirecekler.forEach(function (e) {
        gozcu.observe(e);
      });
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
   HERO PARALLAKS
   Katmanlar farklı hızda kayıyor. Kaydırma olayında değil,
   requestAnimationFrame içinde çiziliyor — aksi hâlde her
   kaydırma karesinde düzen yeniden hesaplanıyor ve mobilde
   takılıyor.

   Hareketi azaltmayı seçmiş kullanıcılarda hiç çalışmıyor.
   ============================================================ */
(function () {
  "use strict";

  /* Telefonda parallaks hesabı hiç çalışmasın: CSS zaten katmanları
     sabitliyor, burada da boşuna kare harcamayalım. */
  var azalt =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 900px)").matches;
  var katlar = document.querySelectorAll(".hero .kat");
  if (azalt || !katlar.length) return;

  var bekliyor = false;

  function ciz() {
    bekliyor = false;
    var y = window.scrollY;
    if (y > window.innerHeight * 1.2) return; /* hero geçildiyse boşuna çizme */
    for (var i = 0; i < katlar.length; i++) {
      var hiz = parseFloat(katlar[i].dataset.hiz || "0");
      katlar[i].style.transform =
        "translateX(-50%) translate3d(0," + y * hiz + "px,0)";
    }
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!bekliyor) {
        bekliyor = true;
        requestAnimationFrame(ciz);
      }
    },
    { passive: true }
  );

  ciz();
})();
