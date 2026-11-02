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
   GALERİ — tahtanın kendisi sahne
   Kaydırma hiçbir şeyi değiştirmez: sayfa normal akar. Kareler elle
   değişir (telefona dokun, noktalar, kaydır, ok tuşları). Her karede:
     - ortadaki telefonda oyundan o kare görünüyor,
     - çevredeki hücrelere sırayla X / O "yazılıyor" (data-adim),
     - 3. karede üst satır, 6. karede alt satır X-O-X oluyor:
       kırmızı çizgi çekiliyor ve +1 patlıyor,
     - solda dev numara ve oyun içi mod adı.
   ============================================================ */
(function () {
  "use strict";

  var bolum = document.getElementById("xg");
  if (!bolum) return;
  var sahne = document.getElementById("xg-sahne");
  var bar = document.getElementById("ust-bar");
  var ekran = document.getElementById("xg-ekran");
  var kareler = Array.prototype.slice.call(document.querySelectorAll("#xg-ekran .xs-kare"));
  var hucreler = Array.prototype.slice.call(sahne.querySelectorAll(".xs-h[data-adim]"));
  var noktalar = Array.prototype.slice.call(document.querySelectorAll(".xs-nokta"));
  var no = document.getElementById("xg-no");
  var ad = document.getElementById("xg-ad");
  var c1 = document.getElementById("xg-c1");
  var c2 = document.getElementById("xg-c2");
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var N = kareler.length;
  var simdi = -2; /* henüz çizilmedi */

  function ayarla() {
    bolum.style.setProperty("--ustb", (bar ? bar.offsetHeight : 0) + "px");
  }

  function metin(a) {
    var dil = document.documentElement.lang || "en";
    var s = (typeof METIN !== "undefined" && (METIN[dil] || {})[a]) || (typeof METIN !== "undefined" && (METIN.en || {})[a]);
    return s || "";
  }

  function yaz(k, anim) {
    var yeniNo = ("0" + (k + 1)).slice(-2);
    var yeniAd = metin("x.g" + (k + 1)) || ad.textContent;
    if (no.textContent !== yeniNo || ad.textContent !== yeniAd) {
      no.textContent = yeniNo;
      ad.textContent = yeniAd;
      if (anim && !azalt) {
        [no, ad].forEach(function (e) {
          e.classList.remove("degis");
          void e.offsetWidth;
          e.classList.add("degis");
        });
      }
    }
    ekran.setAttribute("aria-label", metin("i.shot.next"));
    noktalar.forEach(function (n, i) {
      n.classList.toggle("aktif", i === k);
      n.setAttribute("aria-label", metin("i.shot.n").replace("{n}", i + 1));
      n.setAttribute("aria-current", i === k ? "true" : "false");
    });
  }

  function patlat(ust) {
    if (azalt) return;
    var p = document.createElement("span");
    p.className = "patlama kirmizi ses-efekti";
    p.setAttribute("aria-hidden", "true");
    p.textContent = "+1";
    p.style.left = "88%";
    p.style.top = ust ? "17%" : "83%";
    p.style.zIndex = 6;
    p.style.setProperty("--aci", "10deg");
    p.style.setProperty("--boy", "112px");
    sahne.appendChild(p);
    p.addEventListener("animationend", function () {
      p.remove();
    });
  }

  function uygula(k) {
    if (k === simdi) return;
    var ileri = k > simdi;
    kareler.forEach(function (r, i) {
      r.classList.toggle("aktif", i === k);
      if (i === k) r.removeAttribute("aria-hidden");
      else r.setAttribute("aria-hidden", "true");
    });
    hucreler.forEach(function (h) {
      h.classList.toggle("dolu", k >= Number(h.getAttribute("data-adim")));
    });
    var ust = k >= 2;
    var alt = k >= 5;
    if (ust && !c1.classList.contains("acik") && ileri) patlat(true);
    if (alt && !c2.classList.contains("acik") && ileri) patlat(false);
    c1.classList.toggle("acik", ust);
    c2.classList.toggle("acik", alt);
    yaz(k, simdi !== -2);
    simdi = k;
  }

  function git(k) {
    uygula(((k % N) + N) % N);
  }

  /* Telefona dokun → sonraki kare; yatay kaydırma → ileri / geri */
  var bx = null, by = null, kaydirdi = false;
  ekran.addEventListener("click", function () {
    if (kaydirdi) { kaydirdi = false; return; }
    git(simdi + 1);
  });
  ekran.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") { e.preventDefault(); git(simdi + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); git(simdi - 1); }
  });
  ekran.addEventListener("touchstart", function (e) {
    bx = e.touches[0].clientX; by = e.touches[0].clientY; kaydirdi = false;
  }, { passive: true });
  ekran.addEventListener("touchend", function (e) {
    if (bx === null) return;
    var dx = e.changedTouches[0].clientX - bx, dy = e.changedTouches[0].clientY - by;
    bx = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) { kaydirdi = true; git(simdi + (dx < 0 ? 1 : -1)); }
  }, { passive: true });

  noktalar.forEach(function (n, i) {
    n.addEventListener("click", function () { git(i); });
  });

  window.addEventListener("resize", ayarla);
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("#dil-panel")) setTimeout(function () {
      var k = Math.max(0, simdi);
      simdi = -2;
      uygula(k);
    }, 0);
  });
  ayarla();
  uygula(0);
})();
