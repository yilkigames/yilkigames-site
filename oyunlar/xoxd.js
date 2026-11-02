/* ============================================================
   XOXD — sayfadaki oynanabilir tahta

   Amaç oyunu oynatmak değil, KURALI tek dokunuşta anlatmak.
   Rakip yok, kaybetme yok. Dokunuş hücreyi boş → X → O → boş diye
   döndürüyor; tamamlanan her X-O-X dizisi kırmızı yanıyor ve puan
   artıyor.

   Açılışta dört dizi tamamlanmış bir düzenle başlıyor: ziyaretçi
   daha ilk bakışta yanan satırları görüyor, "burada bir şey oluyor"
   diyor. Boş tahtayla başlasak kimse dokunmuyordu.
   ============================================================ */

(function () {
  "use strict";

  var tahta = document.getElementById("demo-tahta");
  if (!tahta) return;

  var puanKutusu = document.getElementById("demo-puan");
  var sifirla = document.getElementById("demo-sifirla");

  /* Üç satır, üç sütun, iki çapraz */
  var DIZILER = [];
  for (var s = 0; s < 3; s++) DIZILER.push([s * 3, s * 3 + 1, s * 3 + 2]);
  for (var t = 0; t < 3; t++) DIZILER.push([t, t + 3, t + 6]);
  DIZILER.push([0, 4, 8], [2, 4, 6]);

  var BASLANGIC = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
  var durum = BASLANGIC.slice();
  var hucreler = [];

  for (var i = 0; i < 9; i++) {
    var h = document.createElement("button");
    h.type = "button";
    h.className = "demo-hucre";
    h.setAttribute("aria-label", "Hücre " + (i + 1));
    (function (indis) {
      h.addEventListener("click", function () {
        var s = durum[indis];
        durum[indis] = s === "" ? "X" : s === "X" ? "O" : "";
        ciz();
      });
    })(i);
    hucreler.push(h);
    tahta.appendChild(h);
  }

  if (sifirla) {
    sifirla.addEventListener("click", function () {
      durum = ["", "", "", "", "", "", "", "", ""];
      ciz();
    });
  }

  /* Oyundaki gibi: tamamlanan dizinin üstünden kırmızı çizgi geçiyor.
     Tahta 3×3 birim; çizgi ilk hücrenin ortasından son hücreninkine. */
  var ns = "http://www.w3.org/2000/svg";
  var cizgiler = document.createElementNS(ns, "svg");
  cizgiler.setAttribute("class", "demo-cizgiler");
  cizgiler.setAttribute("viewBox", "0 0 30 30");
  cizgiler.setAttribute("aria-hidden", "true");
  tahta.appendChild(cizgiler);
  var oncekiler = {};

  function merkez(i) {
    return [(i % 3) * 10 + 5, Math.floor(i / 3) * 10 + 5];
  }

  function ciz() {
    var yanan = {};
    var puan = 0;
    var simdikiler = {};
    cizgiler.textContent = "";

    for (var d = 0; d < DIZILER.length; d++) {
      var a = DIZILER[d];
      if (durum[a[0]] === "X" && durum[a[1]] === "O" && durum[a[2]] === "X") {
        puan++;
        yanan[a[0]] = yanan[a[1]] = yanan[a[2]] = true;
        var b = merkez(a[0]);
        var s = merkez(a[2]);
        /* Biraz taşsın: çizgi uçtaki hücrelerin kenarına kadar */
        var dx = (s[0] - b[0]) * 0.18;
        var dy = (s[1] - b[1]) * 0.18;
        var l = document.createElementNS(ns, "line");
        l.setAttribute("x1", b[0] - dx);
        l.setAttribute("y1", b[1] - dy);
        l.setAttribute("x2", s[0] + dx);
        l.setAttribute("y2", s[1] + dy);
        /* Yeni tamamlanan dizi çiziliyor, eskiler yerinde duruyor */
        if (oncekiler[d]) l.style.animation = "none";
        if (oncekiler[d]) l.style.strokeDashoffset = "0";
        simdikiler[d] = true;
        cizgiler.appendChild(l);
      }
    }
    oncekiler = simdikiler;

    for (var i = 0; i < 9; i++) {
      hucreler[i].textContent = durum[i];
      hucreler[i].classList.toggle("yanan", !!yanan[i]);
      hucreler[i].classList.toggle("dolu", durum[i] !== "");
    }

    if (puanKutusu) puanKutusu.textContent = puan;
  }

  ciz();
})();

/* ============================================================
   KARELER — dikey telefon vitrini
   Ekranda oyundan gerçek kareler sırayla geçiyor; geçişte oyundaki
   gibi kırmızı çizgi çekiliyor. Tıkla / kaydır / ok tuşları / soldaki
   küçük kareler. Fare üstündeyken ve sekme gizliyken durur; hareket
   azaltmada otomatik oynatma kapalı. Aktif küçük karenin altındaki
   oynatma çubuğu CSS'te doluyor (süre --xk-sure ile aynı).
   ============================================================ */
(function () {
  "use strict";

  var ekran = document.getElementById("xk-ekran");
  if (!ekran) return;
  var sahne = document.getElementById("xk-sahne");
  var bolum = sahne.closest(".x-kareler");
  var kareler = Array.prototype.slice.call(ekran.querySelectorAll(".xk-kare"));
  var kucukler = Array.prototype.slice.call(document.querySelectorAll(".xk-kucuk"));
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SURE = 4200;
  var simdi = 0;
  var gorunur = false;
  var fareUstunde = false;
  var sayac = null;

  bolum.style.setProperty("--xk-sure", SURE / 1000 + "s");

  function metin(a) {
    var dil = document.documentElement.lang || "en";
    var s = (typeof METIN !== "undefined" && (METIN[dil] || {})[a]) || (typeof METIN !== "undefined" && (METIN.en || {})[a]);
    return s || "";
  }

  function etiketle() {
    kucukler.forEach(function (d, k) {
      d.setAttribute("aria-label", metin("i.shot.n").replace("{n}", k + 1));
      d.setAttribute("aria-current", k === simdi ? "true" : "false");
    });
  }

  function isaretle() {
    kucukler.forEach(function (d, k) {
      /* sınıf çıkıp girerek oynatma çubuğunu baştan başlatıyor */
      d.classList.remove("aktif");
      if (k === simdi) {
        void d.offsetWidth;
        d.classList.add("aktif");
      }
    });
    etiketle();
  }

  function git(i) {
    i = (i + kareler.length) % kareler.length;
    if (i === simdi) return;
    if (!azalt) {
      ekran.classList.remove("cizgi");
      void ekran.offsetWidth;
      ekran.classList.add("cizgi");
    }
    kareler[simdi].classList.remove("aktif");
    kareler[i].classList.add("aktif");
    simdi = i;
    isaretle();
  }

  function zamanla() {
    clearInterval(sayac);
    isaretle();
    if (azalt) return;
    sayac = setInterval(function () {
      if (gorunur && !fareUstunde && !document.hidden) git(simdi + 1);
    }, SURE);
  }

  var basX = null;
  var kaydirildi = false;
  ekran.addEventListener("pointerdown", function (e) {
    basX = e.clientX;
  });
  ekran.addEventListener("pointerup", function (e) {
    if (basX === null) return;
    var dx = e.clientX - basX;
    basX = null;
    if (Math.abs(dx) > 40) {
      kaydirildi = true;
      git(simdi + (dx < 0 ? 1 : -1));
      zamanla();
    }
  });
  ekran.addEventListener("click", function () {
    if (kaydirildi) {
      kaydirildi = false;
      return;
    }
    git(simdi + 1);
    zamanla();
  });
  ekran.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      git(simdi + (e.key === "ArrowRight" ? 1 : -1));
      zamanla();
    }
  });
  kucukler.forEach(function (d, k) {
    d.addEventListener("click", function () {
      git(k);
      zamanla();
    });
  });

  sahne.addEventListener("pointerenter", function (e) {
    if (e.pointerType === "mouse") {
      fareUstunde = true;
      bolum.classList.add("xk-durdu");
    }
  });
  sahne.addEventListener("pointerleave", function () {
    if (!fareUstunde) return;
    fareUstunde = false;
    bolum.classList.remove("xk-durdu");
    zamanla();
  });

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

  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("#dil-panel")) setTimeout(etiketle, 0);
  });

  zamanla();
})();
