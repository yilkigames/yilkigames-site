/* ============================================================
   YILKI GAMES — arayüz davranışları
   Dil değiştirici, kaydırınca beliren paneller, üst bar; ana
   sayfada karalamalar, ses efektleri, kırmızı düğme ve defter eğimi.
   Hepsi isteğe bağlı — ilgili düğüm yoksa sessizce atlanıyor, aynı
   dosya her sayfaya konabiliyor.
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

    /* Yalnızca ekran okuyucuya giden etiketler (simge düğmeler) */
    document.querySelectorAll("[data-i18n-aria]").forEach(function (e) {
      var a = e.getAttribute("data-i18n-aria");
      var m = sozluk[a] !== undefined ? sozluk[a] : yedek[a];
      if (m !== undefined) e.setAttribute("aria-label", m);
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
   KARALAMALAR
   Hero'nun arkasına stüdyonun oyunlarından karışık karikatürler
   diziliyor (index.html'deki <symbol id="c-...">). Her açılışta
   dizilim ve seçim rastgele. Saydamlık konuma bağlı: masaüstünde
   sağdan sola, telefonda aşağıdan yukarı giderek siliniyor — yazının
   arkası hep sakin kalıyor. Sayfa kaydıkça da hepsi biraz daha
   soluyor.

   Dışarıya iki şey veriyor: window.YG_KARALAMALAR (çizim adları)
   ve window.ygKaralama(ad) (<svg><use> üretir). BASMA bunları
   düğmeden fırlattığı çizimler için kullanıyor.
   ============================================================ */
(function () {
  "use strict";

  var ADLAR = ["cay", "simit", "kedi", "x", "o", "tahta", "yumruk", "murekkep", "ko", "gramofon", "kaset", "etiket", "nal", "simsek", "bomba", "parilti"];
  window.YG_KARALAMALAR = ADLAR;

  function karalama(ad) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "cizim");
    svg.setAttribute("viewBox", "0 0 100 100");
    var use = document.createElementNS(ns, "use");
    use.setAttribute("href", "#c-" + ad);
    svg.appendChild(use);
    return svg;
  }
  window.ygKaralama = karalama;

  var alan = document.getElementById("karalama");
  if (!alan || !document.getElementById("c-cay")) return;

  /* Karışık torba: aynı çizim art arda gelmesin, hepsi sırayla çıksın */
  var torba = [];
  function siradaki() {
    if (!torba.length) {
      torba = ADLAR.slice();
      for (var i = torba.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = torba[i];
        torba[i] = torba[j];
        torba[j] = t;
      }
    }
    return torba.pop();
  }

  /* Çoğu kırmızı kalıyor; arada bir sarı ya da mavi */
  function vurguVer(o) {
    var r = Math.random();
    o.style.setProperty("--vurgu", r < 0.14 ? "var(--sari)" : r < 0.27 ? "var(--mavi)" : "var(--kirmizi)");
  }

  function rastgele(a, b) {
    return a + Math.random() * (b - a);
  }

  function diz() {
    alan.textContent = "";
    var g = alan.clientWidth;
    var y = alan.clientHeight;
    if (!g || !y) return;
    var dar = g < 760;
    var hucre = dar ? 92 : 132;
    var sutun = Math.max(3, Math.round(g / hucre));
    var satir = Math.max(3, Math.round(y / hucre));
    var hg = g / sutun;
    var hy = y / satir;

    for (var r = 0; r < satir; r++) {
      for (var c = 0; c < sutun; c++) {
        if (Math.random() < 0.18) continue;
        var x = (c + 0.5 + rastgele(-0.28, 0.28)) * hg;
        var yy = (r + 0.5 + rastgele(-0.28, 0.28)) * hy;
        /* 0 → neredeyse görünmez, 1 → tam mürekkep */
        var konum = dar ? yy / y : x / g;
        var guc = Math.max(0, Math.min(1, (konum - (dar ? 0.42 : 0.3)) / (dar ? 0.5 : 0.62)));
        var saydam = 0.05 + Math.pow(guc, 1.4) * rastgele(0.75, 0.95);

        var o = document.createElement("span");
        o.className = "karalama-ogesi";
        o.appendChild(karalama(siradaki()));
        o.style.left = x.toFixed(1) + "px";
        o.style.top = yy.toFixed(1) + "px";
        o.style.setProperty("--olcu", Math.round(hucre * rastgele(0.55, 0.92)) + "px");
        o.style.setProperty("--aci", Math.round(rastgele(-24, 24)) + "deg");
        o.style.setProperty("--saydam", saydam.toFixed(2));
        vurguVer(o);
        o.style.setProperty("--gec", (-Math.random()).toFixed(2) + "s");
        /* Güçlü olanlar önce beliriyor: kalem sağdan sola çiziyor */
        o.style.setProperty("--sira", (0.15 + (1 - guc) * 0.9 + Math.random() * 0.15).toFixed(2) + "s");
        alan.appendChild(o);
      }
    }
  }

  diz();

  /* Genişlik ciddi değişince (telefon döndü, pencere büyüdü) yeniden diz */
  var sonGenislik = alan.clientWidth;
  var bekle;
  window.addEventListener("resize", function () {
    clearTimeout(bekle);
    bekle = setTimeout(function () {
      if (Math.abs(alan.clientWidth - sonGenislik) > 80) {
        sonGenislik = alan.clientWidth;
        diz();
      }
    }, 200);
  });

  /* Dokunulan karalama patlayıp yerini başka bir karalamaya bırakıyor */
  window.ygKaralamaDegistir = function (o) {
    if (o.classList.contains("pat")) return;
    o.classList.add("pat");
    setTimeout(function () {
      o.replaceChild(karalama(siradaki()), o.firstChild);
      o.style.setProperty("--aci", Math.round(rastgele(-24, 24)) + "deg");
      o.style.setProperty("--sira", "0s");
      vurguVer(o);
      o.classList.remove("pat");
    }, 340);
  };

  /* Kaydırdıkça karalamalar biraz daha soluyor ve geride kalıyor */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var hero = document.getElementById("hero");
    var tik = false;
    window.addEventListener(
      "scroll",
      function () {
        if (tik) return;
        tik = true;
        requestAnimationFrame(function () {
          var o = Math.min(1, window.scrollY / (hero.offsetHeight || 1));
          alan.style.opacity = (1 - o * 0.85).toFixed(3);
          alan.style.transform = "translateY(" + (window.scrollY * 0.25).toFixed(1) + "px)";
          tik = false;
        });
      },
      { passive: true }
    );
  }
})();

/* ============================================================
   SES EFEKTLERİ
   Hero'da boş bir yere dokununca dokunulan noktada çizgi roman
   patlaması beliriyor: "PAT!", "GÜM!"... Oyunlarımızın ilk kuralı
   "her dokunuşa tepki" — site de buna uysun. Bir karalamaya
   dokunulursa o karalama da patlayıp değişiyor.

   Bağlantı ve düğmelere dokunuş sayılmıyor; aynı anda en fazla
   altı patlama ekranda kalıyor, eskisi siliniyor.
   ============================================================ */
(function () {
  "use strict";

  var alan = document.getElementById("hero");
  if (!alan) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SESLER = ["PAT!", "GÜM!", "BAM!", "POW!", "ŞAK!", "ZING!", "VUŞ!", "KA-BUM!", "BİNG!", "ÇAT!"];
  var RENKLER = ["", "kirmizi", "kara", "sari", "kirmizi", "mavi"];
  var sira = 0;
  var canli = [];

  alan.addEventListener("pointerdown", function (e) {
    if (e.target.closest("a, button")) return;

    var oge = e.target.closest(".karalama-ogesi");
    if (oge && window.ygKaralamaDegistir) window.ygKaralamaDegistir(oge);

    var kutu = alan.getBoundingClientRect();
    var p = document.createElement("span");
    p.className = "patlama ses-efekti " + RENKLER[sira % RENKLER.length];
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

/* ============================================================
   KIRMIZI DÜĞME — ikinci sürüm
   Önce şeffaf koruma kapağı kalkıyor. Sonra sekiz kademe:
     1-3  mesaj sertleşiyor, sayfa sarsılıyor, düğmeden karalama fırlıyor
     4    alarm: siren dönüyor, bölüm kırmızı nabız atıyor
     5-6  düğme çatlıyor
     7    son uyarı
     8    3-2-1 geri sayım → tam ekran KA-BUM, karalama yağmuru,
          düğme eziliyor, "Söz dinlemez" damgası ve "Tamir et"
   "Tamir et" her şeyi başa sarıyor (kapak yine kapalı).
   Hiçbir şey kaydedilmiyor, sunucuya gitmiyor.
   Mesajlar o anki dilde: METIN sözlüğünden a.press.*.
   ============================================================ */
(function () {
  "use strict";

  var dugme = document.getElementById("kirmizi-dugme");
  if (!dugme) return;
  var kutu = document.getElementById("basma-kutu");
  var kapak = document.getElementById("basma-kapak");
  var bolum = document.getElementById("basma");
  var mesaj = document.getElementById("basma-mesaj");
  var son = document.getElementById("basma-son");
  var tamir = document.getElementById("basma-tamir");
  var kabum = document.getElementById("kabum");
  var kabumYazi = document.getElementById("kabum-yazi");
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SESLER = ["BAM!", "KRAK!", "GÜM!", "POW!", "ÇAT!", "VUŞ!", "BZZT!"];
  var SINIR = 8;
  var kez = 0;
  var kilit = false;

  function metin(a) {
    var dil = document.documentElement.lang || "en";
    var s = (typeof METIN !== "undefined" && (METIN[dil] || {})[a]) || (typeof METIN !== "undefined" && (METIN.en || {})[a]);
    return s || "";
  }

  function sars(siddet) {
    if (azalt) return;
    document.body.style.setProperty("--siddet", siddet);
    document.body.classList.remove("sarsil");
    void document.body.offsetWidth; /* animasyonu yeniden başlat */
    document.body.classList.add("sarsil");
  }

  function patlat() {
    var p = document.createElement("span");
    var r = Math.random();
    p.className = "patlama ses-efekti ucan " + (r < 0.45 ? "kirmizi" : r < 0.75 ? "kara" : r < 0.88 ? "sari" : "mavi");
    p.setAttribute("aria-hidden", "true");
    p.textContent = SESLER[Math.floor(Math.random() * SESLER.length)];
    p.style.left = 10 + Math.random() * 80 + "vw";
    p.style.top = 15 + Math.random() * 70 + "vh";
    p.style.setProperty("--aci", Math.round(Math.random() * 50 - 25) + "deg");
    p.style.setProperty("--boy", 110 + Math.round(Math.random() * 70) + "px");
    document.body.appendChild(p);
    p.addEventListener("animationend", function () {
      p.remove();
    });
  }

  /* Düğmeden bir karalama fırlıyor, yay çizip ekranın dibine düşüyor */
  function firlat(x, y) {
    if (azalt || !window.ygKaralama || !document.body.animate) return;
    var adlar = window.YG_KARALAMALAR;
    var o = document.createElement("span");
    o.className = "dusen";
    o.setAttribute("aria-hidden", "true");
    o.appendChild(window.ygKaralama(adlar[Math.floor(Math.random() * adlar.length)]));
    o.style.left = x + "px";
    o.style.top = y + "px";
    o.style.setProperty("--olcu", 50 + Math.round(Math.random() * 50) + "px");
    document.body.appendChild(o);
    var dx = (Math.random() - 0.5) * Math.min(window.innerWidth, 900);
    var yuk = 120 + Math.random() * 220;
    var don = (Math.random() - 0.5) * 900;
    var dus = window.innerHeight - y + 160;
    var a = o.animate(
      [
        { transform: "translate(0, 0) rotate(0deg) scale(0.3)", easing: "cubic-bezier(.2,.7,.4,1)" },
        { transform: "translate(" + dx * 0.45 + "px, " + -yuk + "px) rotate(" + don * 0.4 + "deg) scale(1)", offset: 0.32, easing: "cubic-bezier(.5,0,.9,.6)" },
        { transform: "translate(" + dx + "px, " + dus + "px) rotate(" + don + "deg) scale(1)" },
      ],
      { duration: 1500 + Math.random() * 700, fill: "forwards" }
    );
    a.onfinish = function () {
      o.remove();
    };
  }

  function dugmeMerkezi() {
    var r = dugme.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  }

  kapak.addEventListener("click", function () {
    kutu.classList.add("acik");
    dugme.tabIndex = 0;
    dugme.focus({ preventScroll: true });
    mesaj.textContent = metin("a.press.lid");
  });

  dugme.addEventListener("click", function () {
    if (kilit || kez >= SINIR || !kutu.classList.contains("acik")) return;
    kez++;

    if (navigator.vibrate) navigator.vibrate(kez * 20);

    if (kez < SINIR) {
      mesaj.textContent = metin("a.press.m" + kez);
      sars(1 + kez * 0.18);
      var m = dugmeMerkezi();
      for (var i = 0; i < Math.min(kez, 4); i++) {
        setTimeout(patlat, i * 90);
        setTimeout(firlat, i * 70, m[0], m[1]);
      }
      if (kez >= 4) bolum.classList.add("alarm");
      if (kez === 5) kutu.classList.add("catlak-1");
      if (kez === 6) kutu.classList.replace("catlak-1", "catlak-2");
      return;
    }

    /* Sekizinci basış: geri sayım ve patlama */
    kilit = true;
    dugme.classList.add("geri-say");
    var n = 3;
    var etiket = dugme.textContent;
    (function say() {
      if (n > 0) {
        dugme.textContent = n;
        mesaj.textContent = n + "…";
        sars(0.6);
        n--;
        setTimeout(say, azalt ? 400 : 650);
        return;
      }
      dugme.classList.remove("geri-say");
      dugme.textContent = etiket;
      patla();
    })();
  });

  function patla() {
    kabumYazi.textContent = metin("a.press.boom") || "KA-BUM!";
    if (!azalt) {
      kabum.classList.remove("patladi");
      void kabum.offsetWidth;
      kabum.classList.add("patladi");
      sars(3.2);
      for (var i = 0; i < 18; i++) setTimeout(firlat, 250 + i * 45, window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.35 + Math.random() * 0.3));
      for (var j = 0; j < 5; j++) setTimeout(patlat, 300 + j * 120);
    }
    if (navigator.vibrate) navigator.vibrate([90, 40, 200]);
    bolum.classList.remove("alarm");
    kutu.classList.remove("catlak-1", "catlak-2");
    dugme.classList.add("ezik");
    dugme.setAttribute("aria-disabled", "true");
    mesaj.textContent = metin("a.press.m8");
    setTimeout(function () {
      son.hidden = false;
    }, azalt ? 0 : 700);
  }

  tamir.addEventListener("click", function () {
    kez = 0;
    kilit = false;
    son.hidden = true;
    dugme.classList.remove("ezik");
    dugme.removeAttribute("aria-disabled");
    dugme.tabIndex = -1;
    kutu.classList.remove("acik");
    mesaj.textContent = metin("a.press.fixed");
    kapak.focus({ preventScroll: true });
  });

})();

/* ============================================================
   DEFTER EĞİMİ
   Vitrindeki defter fareyi takip ederek birkaç derece yatıyor;
   masada elle tutulan bir defter gibi. Dokunmatikte ve hareket
   azaltmada kapalı.
   ============================================================ */
(function () {
  "use strict";

  if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".defter").forEach(function (k) {
    k.addEventListener("pointermove", function (e) {
      var r = k.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      k.style.setProperty("--ry", (x * 5).toFixed(2) + "deg");
      k.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg");
    });
    k.addEventListener("pointerleave", function () {
      k.style.setProperty("--ry", "0deg");
      k.style.setProperty("--rx", "0deg");
    });
  });
})();

/* ============================================================
   DEFTER — sayfa çevirme
   Sağ yaprak çevrilince arkasında Survive in Turkey, altında Bit
   Pazarı çıkıyor. Görünmeyen yüzdeki bağlantılar sekme sırasından
   ve ekran okuyucudan çıkarılıyor (inert). Telefonda sayfalar alt
   alta dizildiği için çevirme düğmeleri CSS'te gizli.
   ============================================================ */
(function () {
  "use strict";

  var defter = document.getElementById("defter");
  if (!defter) return;
  var ileri = document.getElementById("cevir-ileri");
  var geri = document.getElementById("cevir-geri");
  var on = defter.querySelector(".yuz.on");
  var arka = defter.querySelector(".yuz.arka");
  var ink = defter.querySelector(".s-ink");
  var bit = document.getElementById("sayfa-bit");
  var dar = window.matchMedia("(max-width: 900px)");

  function uygula() {
    var cevrik = defter.classList.contains("cevrildi");
    ileri.hidden = cevrik;
    geri.hidden = !cevrik;
    /* Telefonda dördü de görünüyor; kimse gizlenmesin */
    var gizle = !dar.matches;
    on.inert = gizle && cevrik;
    ink.inert = gizle && cevrik;
    arka.inert = gizle && !cevrik;
    bit.inert = gizle && !cevrik;
  }

  function cevir(yon) {
    defter.classList.toggle("cevrildi", yon);
    uygula();
    (yon ? geri : ileri).focus({ preventScroll: true });
  }

  ileri.addEventListener("click", function () {
    cevir(true);
  });
  geri.addEventListener("click", function () {
    cevir(false);
  });
  if (dar.addEventListener) dar.addEventListener("change", uygula);
  uygula();
})();

/* ============================================================
   SERSEM NİNJA
   Ana sayfanın yazısız sahnesi: Amele Ninja oyundaki sersem
   animasyonuyla sallanıyor. Dokununca bir tokat daha yiyor:
   sarsılıyor, yıldızlar hızlanıyor, başının yanında "PAT!".
   ============================================================ */
(function () {
  "use strict";

  var ninja = document.getElementById("sersem-ninja");
  if (!ninja) return;
  var SESLER = ["PAT!", "BONK!", "TOK!", "ŞAK!", "BAM!"];
  var RENK = ["sari", "kirmizi", "mavi", ""];
  var n = 0;

  ninja.addEventListener("click", function () {
    ninja.classList.remove("tokat");
    void ninja.offsetWidth;
    ninja.classList.add("tokat");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var p = document.createElement("span");
    p.className = "patlama ses-efekti " + RENK[n % RENK.length];
    p.setAttribute("aria-hidden", "true");
    p.textContent = SESLER[n % SESLER.length];
    p.style.left = (n % 2 ? 78 : 22) + "%";
    p.style.top = "22%";
    p.style.setProperty("--aci", (n % 2 ? 14 : -14) + "deg");
    p.style.setProperty("--boy", "120px");
    ninja.appendChild(p);
    p.addEventListener("animationend", function () {
      p.remove();
    });
    n++;
  });
})();

/* ============================================================
   INKLASH NİNJASI
   Inklash sayfasında Amele Ninja gard alıp bekliyor (6 karelik
   bekleme döngüsü). Dokununca oyundaki ileri yumruğu atıyor,
   bitince yine gard. Kareler gorseller/inklash/ninja-*.webp şeritleri.
   ============================================================ */
(function () {
  "use strict";

  var ninja = document.getElementById("ink-ninja");
  if (!ninja) return;
  var sprite = ninja.querySelector(".sprite");
  var kilit = false;

  ninja.addEventListener("click", function () {
    if (kilit) return;
    kilit = true;
    sprite.classList.remove("bekle");
    sprite.classList.add("yumruk");
    var p = document.createElement("span");
    p.className = "patlama ses-efekti sari";
    p.setAttribute("aria-hidden", "true");
    p.textContent = "POW!";
    p.style.left = "86%";
    p.style.top = "40%";
    p.style.setProperty("--aci", "12deg");
    p.style.setProperty("--boy", "110px");
    setTimeout(function () {
      ninja.appendChild(p);
    }, 220);
    p.addEventListener("animationend", function () {
      p.remove();
    });
    setTimeout(function () {
      sprite.classList.remove("yumruk");
      sprite.classList.add("bekle");
      kilit = false;
    }, 470);
  });
})()
;

/* ============================================================
   ŞERİTLER
   Girişin altındaki iki kayan bantta stüdyonun espirileri geçiyor.
   Her açılışta her bandın sırası ayrı karıştırılıyor; listede her söz
   bir kez olduğundan aynısı art arda gelmiyor (iki kopyanın birleştiği
   yerde de: son ve ilk söz farklı). Hız, bant uzunluğundan bağımsız
   olarak saniyede ~45 piksel.
   ============================================================ */
(function () {
  "use strict";

  document.querySelectorAll(".serit-ic").forEach(function (ic) {
    var parcalar = Array.prototype.slice.call(ic.children);
    var yari = parcalar.slice(0, parcalar.length / 2);
    for (var i = yari.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = yari[i];
      yari[i] = yari[j];
      yari[j] = t;
    }
    ic.textContent = "";
    yari.forEach(function (p) {
      ic.appendChild(p);
    });
    yari.forEach(function (p) {
      ic.appendChild(p.cloneNode(true));
    });
    var hizla = function () {
      ic.style.animationDuration = Math.max(30, ic.scrollWidth / 2 / 45).toFixed(1) + "s";
    };
    hizla();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(hizla);
  });
})();

/* ============================================================
   KARELER — Inklash sayfasındaki mürekkep arcade'i
   Telefon ekranında oyundan kareler sırayla geçiyor; yeni kare
   tıklanan (ya da rastgele bir) noktadan mürekkep lekesi gibi açılıyor,
   telefon sarsılıyor, "POW!" patlıyor. Tıkla / kaydır / ok tuşları /
   film şeridi ile gezilir. Fare üstündeyken ve sekme gizliyken durur;
   hareket azaltmada otomatik oynatma kapalı.
   ============================================================ */
(function () {
  "use strict";

  var ekran = document.getElementById("ekran");
  if (!ekran) return;
  var sahne = document.getElementById("kare-sahne");
  var telefon = document.getElementById("telefon");
  var kareler = Array.prototype.slice.call(ekran.querySelectorAll(".kare"));
  var dugmeler = Array.prototype.slice.call(document.querySelectorAll(".film-kare"));
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SESLER = ["POW!", "BAM!", "ŞAK!", "ÇAT!", "GÜM!", "VUŞ!", "PAT!"];
  var RENK = ["sari", "kirmizi", "mavi", "kara"];
  var simdi = 0;
  var gecis = false;
  var gorunur = false;
  var fareUstunde = false;
  var sayac = null;
  var n = 0;

  function metin(a) {
    var dil = document.documentElement.lang || "en";
    var s = (typeof METIN !== "undefined" && (METIN[dil] || {})[a]) || (typeof METIN !== "undefined" && (METIN.en || {})[a]);
    return s || "";
  }

  function etiketle() {
    dugmeler.forEach(function (d, k) {
      d.setAttribute("aria-label", metin("i.shot.n").replace("{n}", k + 1));
      d.setAttribute("aria-current", k === simdi ? "true" : "false");
    });
  }

  function patlat() {
    var p = document.createElement("span");
    p.className = "patlama ses-efekti " + RENK[n % RENK.length];
    p.setAttribute("aria-hidden", "true");
    p.textContent = SESLER[n % SESLER.length];
    p.style.left = 8 + Math.random() * 84 + "%";
    p.style.top = 6 + Math.random() * 54 + "%";
    p.style.zIndex = 6;
    p.style.setProperty("--aci", Math.round(Math.random() * 40 - 20) + "deg");
    p.style.setProperty("--boy", 96 + Math.round(Math.random() * 40) + "px");
    n++;
    sahne.appendChild(p);
    p.addEventListener("animationend", function () {
      p.remove();
    });
  }

  function git(i, x, y) {
    i = (i + kareler.length) % kareler.length;
    if (i === simdi || gecis) return;
    gecis = true;
    var yeni = kareler[i];
    var eski = kareler[simdi];
    yeni.style.setProperty("--x", x != null ? x : 15 + Math.random() * 70 + "%");
    yeni.style.setProperty("--y", y != null ? y : 15 + Math.random() * 70 + "%");
    yeni.classList.add("gelen");
    simdi = i;
    etiketle();
    dugmeler.forEach(function (d, k) {
      d.classList.toggle("aktif", k === i);
    });
    if (!azalt) {
      patlat();
      telefon.classList.remove("sars");
      void telefon.offsetWidth;
      telefon.classList.add("sars");
    }
    setTimeout(
      function () {
        eski.classList.remove("aktif");
        yeni.classList.remove("gelen");
        yeni.classList.add("aktif");
        gecis = false;
      },
      azalt ? 0 : 650
    );
  }

  function zamanla() {
    clearInterval(sayac);
    if (azalt) return;
    sayac = setInterval(function () {
      if (gorunur && !fareUstunde && !document.hidden) git(simdi + 1);
    }, 3800);
  }

  /* Tıklama ve kaydırma: aynı yüzey. Yatay hareket 45 pikseli geçtiyse
     kaydırma sayılıyor, ardından gelen tıklama yutuluyor. */
  var basX = null;
  var kaydirildi = false;
  ekran.addEventListener("pointerdown", function (e) {
    basX = e.clientX;
  });
  ekran.addEventListener("pointerup", function (e) {
    if (basX === null) return;
    var dx = e.clientX - basX;
    basX = null;
    if (Math.abs(dx) > 45) {
      kaydirildi = true;
      git(simdi + (dx < 0 ? 1 : -1));
      zamanla();
    }
  });
  ekran.addEventListener("click", function (e) {
    if (kaydirildi) {
      kaydirildi = false;
      return;
    }
    var r = ekran.getBoundingClientRect();
    var x = e.clientX ? ((e.clientX - r.left) / r.width) * 100 + "%" : null;
    var y = e.clientY ? ((e.clientY - r.top) / r.height) * 100 + "%" : null;
    git(simdi + 1, x, y);
    zamanla();
  });
  ekran.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      git(simdi + (e.key === "ArrowRight" ? 1 : -1));
      zamanla();
    }
  });

  dugmeler.forEach(function (d, k) {
    d.addEventListener("click", function () {
      git(k);
      zamanla();
    });
  });

  /* Sadece fare üstünde durur; dokunmatikte "üstünde" kavramı yok */
  sahne.addEventListener("pointerenter", function (e) {
    if (e.pointerType === "mouse") fareUstunde = true;
  });
  sahne.addEventListener("pointerleave", function () {
    fareUstunde = false;
    telefon.style.setProperty("--rx", "0deg");
    telefon.style.setProperty("--ry", "0deg");
  });

  /* Fareyi takip ederek telefon birkaç derece yatıyor */
  if (!azalt && !window.matchMedia("(hover: none)").matches) {
    sahne.addEventListener("pointermove", function (e) {
      var r = sahne.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      telefon.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
      telefon.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
    });
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (g) {
        gorunur = g[0].isIntersecting;
      },
      { threshold: 0.35 }
    ).observe(sahne);
  } else {
    gorunur = true;
  }

  /* Dil değişince etiketler yeniden yazılsın */
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("#dil-panel")) setTimeout(etiketle, 0);
  });

  etiketle();
  zamanla();
})();

/* ============================================================
   KARAKTERLER BİR ARADA
   Survive adamı eğilip yalvarır (+1 ₺), X zıplar, O döner.
   "Poz ver": dördü birden zıplar, flaş patlar, "ÇIT!" yazar.
   ============================================================ */
(function () {
  "use strict";

  var sahne = document.querySelector(".sersem-ic");
  if (!sahne) return;
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ninja = document.getElementById("sersem-ninja");

  function patla(el, yazi, renk, soldan) {
    if (azalt) return;
    var p = document.createElement("span");
    p.className = "patlama ses-efekti " + renk;
    p.setAttribute("aria-hidden", "true");
    p.textContent = yazi;
    var s = sahne.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    p.style.left = r.left - s.left + r.width * soldan + "px";
    p.style.top = r.top - s.top + "px";
    p.style.setProperty("--aci", (soldan > 0.5 ? 12 : -12) + "deg");
    p.style.setProperty("--boy", "110px");
    sahne.appendChild(p);
    p.addEventListener("animationend", function () {
      p.remove();
    });
  }

  function sek(el) {
    el.classList.remove("sek", "poz");
    void el.offsetWidth;
    el.classList.add("sek");
  }

  var kaz = 0;
  [
    ["grup-adam", function () { kaz += 1; return "+" + kaz + " ₺"; }, "sari", 0.4],
    ["grup-x", function () { return "X!"; }, "kirmizi", 0.5],
    ["grup-o", function () { return "O!"; }, "mavi", 0.5]
  ].forEach(function (g) {
    var el = document.getElementById(g[0]);
    if (!el) return;
    el.addEventListener("click", function () {
      sek(el);
      patla(el, g[1](), g[2], g[3]);
    });
  });

  var poz = document.getElementById("poz-dugme");
  var flas = document.getElementById("poz-flas");
  var tut;
  if (poz) {
    poz.addEventListener("click", function () {
      var ler = ["grup-adam", "grup-x", "grup-o"].map(function (id) { return document.getElementById(id); });
      ler.forEach(function (el, i) {
        el.classList.remove("sek", "poz");
        void el.offsetWidth;
        el.style.animationDelay = i * 0.08 + "s";
        el.classList.add("poz");
      });
      var sp = ninja && ninja.querySelector(".sprite");
      if (sp && !azalt) {
        sp.classList.remove("bekle", "yumruk");
        void sp.offsetWidth;
        sp.classList.add("yumruk");
        setTimeout(function () {
          sp.classList.remove("yumruk");
          sp.classList.add("bekle");
        }, 2600);
      }
      setTimeout(function () {
        flas.classList.remove("git");
        void flas.offsetWidth;
        if (!azalt) flas.classList.add("git");
        patla(poz, "ÇIT!", "kirmizi", 0.5);
      }, azalt ? 0 : 520);
      clearTimeout(tut);
      tut = setTimeout(function () {
        ler.forEach(function (el) {
          el.classList.remove("poz");
          el.style.animationDelay = "";
        });
      }, 2600);
    });
  }
})();

/* ============================================================
   YAN RAY
   Sağ kenardaki küçük kaydırma imleci (Inklash, XOXD): hangi bölümde
   olduğunu gösterir, tıklayınca o bölüme gider.
   ============================================================ */
(function () {
  "use strict";

  document.querySelectorAll(".yan-ray").forEach(function (ray) {
    var linkler = Array.prototype.slice.call(ray.querySelectorAll("a"));
    var bolumler = linkler.map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    });
    var bekle = false;

    function guncelle() {
      bekle = false;
      var esik = window.innerHeight * 0.45;
      var en = 0;
      bolumler.forEach(function (b, i) {
        if (b && b.getBoundingClientRect().top <= esik) en = i;
      });
      linkler.forEach(function (a, i) {
        a.classList.toggle("aktif", i === en);
      });
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!bekle) {
          bekle = true;
          requestAnimationFrame(guncelle);
        }
      },
      { passive: true }
    );
    guncelle();
  });
})();
