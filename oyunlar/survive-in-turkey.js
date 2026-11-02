/* ============================================================
   SURVIVE IN TURKEY — sayfaya özel davranış
   1) KALDIRIM: adama dokun, yalvarsın; her dokunuş +1 ₺ (bozuk para
      kutuya düşer). Eşikler oyunun gerçek fiyatlarına bağlı.
   2) MAHALLE: kendi çizdiğimiz harita; sürüklenir, bir yere basınca
      adam yürür ve yerin kartı açılır.
   3) BASAMAKLAR: altı kıyafet; sicil kartı oyunun denge tablosundan.
   4) ALT BAR: oyunun döngüsünün küçük hâli (her hareket 3 gün).
   5) ŞERİT + RAY: meslek şeridi, sayfa yukarı çıktıkça dolan ray.
   ============================================================ */
(function () {
  "use strict";

  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) {
    return document.getElementById(id);
  }

  function metin(a) {
    var dil = document.documentElement.lang || "en";
    var d = typeof METIN !== "undefined" ? METIN : {};
    return (d[dil] || {})[a] || (d.en || {})[a] || "";
  }

  function sayi(n) {
    try {
      return Number(n).toLocaleString(document.documentElement.lang || "en");
    } catch (e) {
      return String(n);
    }
  }

  function dilDegisince(f) {
    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("#dil-panel")) setTimeout(f, 0);
    });
  }

  /* kazanc: dönem başına ₺ · ac / uy: bir dönemde giden puan · risk: yakalanma % */
  var KIYAFET = [
    { kazanc: 100, ac: 1, uy: 1, risk: 0 },
    { kazanc: 8000, ac: 5, uy: 4, risk: 0 },
    { kazanc: 100000, ac: 50, uy: 5, risk: 0 },
    { kazanc: 150000, ac: 50, uy: 5, risk: 0 },
    { kazanc: 220000, ac: 10, uy: 5, risk: 20 },
    { kazanc: 500000, ac: 1, uy: 2, risk: 0 }
  ];

  /* ---------------- 1) KALDIRIM: yalvar ---------------- */
  var DOKTOR = 100000;
  var ESIK = { 20: ["m1", "pizza"], 100: ["m2", "sepet"], 200: ["m3", "biftek"], 1000: ["m4", "kasa"] };
  var sahne = $("sit-sahne");
  var adam = $("sit-yalvar");
  var kutu = $("sit-kutu");
  var cep = 0;
  var satir = 1;
  var rozetZaman;

  try {
    cep = Math.max(0, parseInt(localStorage.getItem("sit-cep"), 10) || 0);
  } catch (e) {}

  var balon = $("sit-balon");
  balon.removeAttribute("data-i18n");

  function balonYaz() {
    balon.textContent = metin("sit.b.l" + satir);
  }

  function cepYaz() {
    $("sit-cep").textContent = sayi(cep) + " ₺";
    var kalan = Math.max(0, DOKTOR - cep);
    $("sit-hedef-n").textContent = sayi(kalan) + " ₺";
    $("sit-hedef-bar").style.width = Math.min(100, (cep / DOKTOR) * 100) + "%";
    kutu.setAttribute("data-dolu", cep >= 60 ? 4 : cep >= 30 ? 3 : cep >= 10 ? 2 : cep >= 1 ? 1 : 0);
  }

  function rozet(esik) {
    var r = ESIK[esik];
    $("sit-rozet-ic").src = "/gorseller/survive/" + r[1] + ".webp";
    $("sit-rozet-y").textContent = metin("sit.b." + r[0]).replace("{n}", sayi(Math.max(0, DOKTOR - cep)));
    var el = $("sit-rozet");
    el.hidden = false;
    el.classList.remove("yeni");
    void el.offsetWidth;
    el.classList.add("yeni");
    clearTimeout(rozetZaman);
    rozetZaman = setTimeout(function () {
      el.hidden = true;
    }, 5200);
  }

  function patlama(x, y, yazi) {
    var p = document.createElement("span");
    p.className = "patlama sari ses-efekti";
    p.setAttribute("aria-hidden", "true");
    p.textContent = yazi;
    p.style.cssText = "position:absolute;z-index:9;pointer-events:none;left:" + (x - 50) + "px;top:" + (y - 60) + "px";
    p.style.setProperty("--boy", "100px");
    p.style.setProperty("--aci", "-8deg");
    sahne.appendChild(p);
    p.addEventListener("animationend", function () {
      p.remove();
    });
  }

  function kutuyaGirdi() {
    cep += 1;
    try {
      localStorage.setItem("sit-cep", String(cep));
    } catch (e) {}
    cepYaz();
    kutu.classList.remove("zil");
    void kutu.offsetWidth;
    kutu.classList.add("zil");
    var s = sahne.getBoundingClientRect();
    var k = kutu.getBoundingClientRect();
    if (!azalt) patlama(k.left - s.left + k.width / 2, k.top - s.top, "+1 ₺");
    if (ESIK[cep]) rozet(cep);
  }

  function yalvar() {
    var man = adam;
    man.classList.remove("yalvar");
    void man.offsetWidth;
    if (!azalt) man.classList.add("yalvar");

    var dua = $("sit-dua");
    dua.classList.remove("goster");
    void dua.offsetWidth;
    if (!azalt) dua.classList.add("goster");

    satir = (satir % 5) + 1;
    balonYaz();
    balon.classList.remove("yeni");
    void balon.offsetWidth;
    balon.classList.add("yeni");

    if (azalt) {
      kutuyaGirdi();
      return;
    }
    var s = sahne.getBoundingClientRect();
    var k = kutu.getBoundingClientRect();
    var tx = k.left - s.left + k.width / 2 - 17;
    var ty = k.top - s.top - 6;
    var sx = tx + (Math.random() * 240 - 120);
    var c = document.createElement("img");
    c.className = "sit-bozuk";
    c.src = "/gorseller/survive/bozuk.webp";
    c.alt = "";
    c.setAttribute("aria-hidden", "true");
    sahne.appendChild(c);
    var an = c.animate(
      [
        { transform: "translate(" + sx + "px,-50px) rotate(0deg)", opacity: 1 },
        { transform: "translate(" + (sx + (tx - sx) * 0.7) + "px," + ty * 0.7 + "px) rotate(260deg)", opacity: 1, offset: 0.7 },
        { transform: "translate(" + tx + "px," + ty + "px) rotate(420deg)", opacity: 1 }
      ],
      { duration: 640, easing: "cubic-bezier(.4,0,.8,.6)" }
    );
    an.onfinish = function () {
      c.remove();
      kutuyaGirdi();
    };
  }

  adam.addEventListener("click", yalvar);
  $("sit-yalvar-dugme").addEventListener("click", yalvar);

  /* ---------------- 2) MAHALLE: harita ---------------- */
  var BOY = 1000;
  var EN = 1300;
  /* x, y: harita birimi (1300×1000) · foto: oyundan çıkartma · kirp: yakın plan genişliği */
  var YERLER = [
    { id: "apart", x: 215, y: 165, foto: "ev-ic", bilgi: [["sit.m.sleep", "+30"], ["sit.m.hunger", "−5"]] },
    { id: "borsa", x: 665, y: 175, foto: "bilgisayar", bilgi: [] },
    { id: "sokak", x: 1090, y: 170, foto: "maske", bilgi: [["sit.o5.job", "220.000 ₺"], [null, "⚠ 20%"]] },
    { id: "park", x: 215, y: 515, foto: null, bilgi: [] },
    { id: "hastane", x: 665, y: 515, foto: "canta", bilgi: [["sit.o3.job", "100.000 ₺"]] },
    { id: "market", x: 1105, y: 520, foto: "sepet", bilgi: [["sit.m.hunger", "+8", "15 ₺"], ["sit.m.hunger", "+20", "35 ₺"]] },
    { id: "kafe", x: 215, y: 855, foto: "kafe", bilgi: [[null, "150 ₺"]] },
    { id: "manav", x: 690, y: 880, foto: "manav", bilgi: [["sit.m.hunger", "+10", "30 ₺"], ["sit.m.hunger", "+30", "80 ₺"]] },
    { id: "doner", x: 1105, y: 860, foto: "biftek", bilgi: [["sit.m.hunger", "+10", "20 ₺"], ["sit.m.hunger", "+70", "200 ₺"]] }
  ];

  var gorus = $("sh-gorus");
  var dunya = $("sh-dunya");
  var ben = $("sh-ben");
  var kart = $("sh-kart");
  var px = 0;
  var py = 0;
  var olcek = 1;
  var aktif = -1;
  var yurumeZaman, gitZaman, kartZaman;

  var AVATAR = [
    "..rrrrrr..",
    ".rrrrrrrr.",
    ".kkkkkkkk.",
    ".kekkkkek.",
    ".kkkkkkkk.",
    "..kkmmkk..",
    ".bbbbbbbb.",
    "bbbbbbbbbb",
    "kbbbbbbbbk",
    "kbbbbbbbbk",
    ".bbbbbbbb.",
    ".bbbbbbbb.",
    "..dd..dd..",
    "..dd..dd.."
  ];
  var PAL = { r: "#ff3b2f", k: "#e8b48a", e: "#0e0d0c", m: "#8a3a2a", b: "#9b7a4a", d: "#1a1816" };

  (function avatarKur() {
    var s = '<svg viewBox="0 0 10 14" shape-rendering="crispEdges" aria-hidden="true">';
    AVATAR.forEach(function (satirS, y) {
      satirS.split("").forEach(function (ch, x) {
        if (ch !== ".") s += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + PAL[ch] + '"/>';
      });
    });
    ben.innerHTML = s + "</svg>";
  })();

  function sinirla() {
    var vw = gorus.clientWidth;
    var vh = gorus.clientHeight;
    var dw = dunya.offsetWidth;
    var dh = dunya.offsetHeight;
    px = dw <= vw ? (vw - dw) / 2 : Math.min(0, Math.max(vw - dw, px));
    py = dh <= vh ? (vh - dh) / 2 : Math.min(0, Math.max(vh - dh, py));
  }

  function yerles(anim) {
    sinirla();
    if (anim) {
      dunya.classList.add("git");
      clearTimeout(gitZaman);
      gitZaman = setTimeout(function () {
        dunya.classList.remove("git");
      }, 950);
    }
    dunya.style.transform = "translate(" + px + "px," + py + "px)";
  }

  function benKonum(x, y) {
    ben.style.left = x * olcek + "px";
    ben.style.top = y * olcek + "px";
  }

  function olcekle() {
    var vh = gorus.clientHeight;
    var vw = gorus.clientWidth;
    var H = vw < 700 ? vh : BOY;
    gorus.style.setProperty("--H", H + "px");
    olcek = H / BOY;
    ben.style.width = (vw < 700 ? 34 : 46) + "px";
    var yer = aktif >= 0 ? hedef(YERLER[aktif]) : { x: 430, y: 330 };
    benKonum(yer.x, yer.y);
    yerles(false);
  }

  function hedef(y) {
    return { x: y.x - 60, y: y.y + 62 };
  }

  var pinler = [];
  var chipler = [];

  function pinleriKur() {
    YERLER.forEach(function (y, i) {
      var p = document.createElement("button");
      p.type = "button";
      p.className = "sh-pin";
      p.style.left = (y.x / EN) * 100 + "%";
      p.style.top = (y.y / BOY) * 100 + "%";
      p.innerHTML = "<b>" + (i + 1) + "</b><span></span>";
      p.addEventListener("click", function () {
        if (gorus.dataset.surukle === "1") return;
        git(i);
      });
      dunya.appendChild(p);
      pinler.push(p);
    });
    var liste = $("sh-liste");
    var h = document.createElement("h3");
    h.id = "sh-liste-b";
    liste.appendChild(h);
    YERLER.forEach(function (y, i) {
      var c = document.createElement("button");
      c.type = "button";
      c.className = "sh-chip";
      c.innerHTML = "<b>" + (i + 1) + "</b><span></span>";
      c.addEventListener("click", function () {
        git(i);
        var r = gorus.getBoundingClientRect();
        if (r.top < 0 || r.bottom > window.innerHeight) gorus.scrollIntoView({ behavior: azalt ? "auto" : "smooth", block: "center" });
      });
      liste.appendChild(c);
      chipler.push(c);
    });
    adlariYaz();
  }

  function adlariYaz() {
    YERLER.forEach(function (y, i) {
      var ad = metin("sit.y." + y.id + ".n");
      pinler[i].querySelector("span").textContent = ad;
      chipler[i].querySelector("span").textContent = ad;
    });
    $("sh-liste-b").textContent = metin("sit.map.list");
    gorus.setAttribute("aria-label", metin("sit.map.title"));
    if (aktif >= 0 && !kart.hidden) kartYaz(aktif);
  }

  function kartYaz(i) {
    var y = YERLER[i];
    $("sh-ad").textContent = metin("sit.y." + y.id + ".n");
    $("sh-acik").textContent = metin("sit.y." + y.id + ".d");
    var ul = $("sh-bilgi");
    ul.innerHTML = "";
    y.bilgi.forEach(function (b) {
      var li = document.createElement("li");
      var onek = b[2] ? b[2] + " → " : "";
      var ad = b[0] ? metin(b[0]) + " " : "";
      li.innerHTML = onek + ad + "<b></b>";
      li.querySelector("b").textContent = b[1];
      ul.appendChild(li);
    });
    var foto = document.querySelector(".sh-foto");
    var img = $("sh-foto");
    if (y.foto) {
      img.hidden = false;
      img.src = "/gorseller/survive/" + y.foto + ".webp";
    } else {
      img.hidden = true;
    }
    /* Haritanın o noktasına yakın plan */
    var fw = foto.clientWidth || 300;
    var fh = foto.clientHeight || 150;
    var cw = 330;
    var ch = (cw * fh) / fw;
    var sol = Math.max(0, Math.min(EN - cw, y.x - cw / 2));
    var ust = Math.max(0, Math.min(BOY - ch, y.y - ch / 2));
    foto.style.backgroundImage = "url(/gorseller/survive/harita.svg)";
    foto.style.backgroundSize = (EN / cw) * 100 + "% auto";
    foto.style.backgroundPosition = (sol / (EN - cw)) * 100 + "% " + (ust / (BOY - ch)) * 100 + "%";
  }

  function kartAc(i) {
    kart.hidden = false;
    kartYaz(i);
    kart.classList.remove("yeni");
    void kart.offsetWidth;
    if (!azalt) kart.classList.add("yeni");
  }

  function git(i) {
    var y = YERLER[i];
    aktif = i;
    $("sh-ipucu").classList.add("git");
    pinler.forEach(function (p, j) {
      p.classList.toggle("aktif", j === i);
    });
    chipler.forEach(function (c, j) {
      c.classList.toggle("aktif", j === i);
    });
    kart.hidden = true;
    clearTimeout(kartZaman);
    var h = hedef(y);
    benKonum(h.x, h.y);
    var vw = gorus.clientWidth;
    var vh = gorus.clientHeight;
    var dar = vw < 700;
    px = (dar ? vw * 0.5 : vw * 0.36) - h.x * olcek;
    py = (dar ? vh * 0.3 : vh * 0.5) - h.y * olcek;
    ben.classList.add("yuru");
    clearTimeout(yurumeZaman);
    yerles(!azalt);
    yurumeZaman = setTimeout(function () {
      ben.classList.remove("yuru");
    }, azalt ? 0 : 900);
    kartZaman = setTimeout(function () {
      kartAc(i);
    }, azalt ? 0 : 900);
  }

  $("sh-kapat").addEventListener("click", function () {
    kart.hidden = true;
    aktif = -1;
    pinler.forEach(function (p) {
      p.classList.remove("aktif");
    });
    chipler.forEach(function (c) {
      c.classList.remove("aktif");
    });
  });

  gorus.addEventListener("keydown", function (e) {
    var d = { ArrowLeft: [80, 0], ArrowRight: [-80, 0], ArrowUp: [0, 80], ArrowDown: [0, -80] }[e.key];
    if (e.key === "Escape" && !kart.hidden) {
      $("sh-kapat").click();
      return;
    }
    if (!d || e.target !== gorus) return;
    e.preventDefault();
    px += d[0];
    py += d[1];
    yerles(true);
  });

  /* sürükle */
  var tutma = null;
  gorus.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".sh-kart") || e.button > 0) return;
    tutma = { id: e.pointerId, x: e.clientX, y: e.clientY, px: px, py: py, hareket: false };
    gorus.dataset.surukle = "0";
  });
  gorus.addEventListener("pointermove", function (e) {
    if (!tutma || e.pointerId !== tutma.id) return;
    var dx = e.clientX - tutma.x;
    var dy = e.clientY - tutma.y;
    if (!tutma.hareket && Math.abs(dx) + Math.abs(dy) > 6) {
      tutma.hareket = true;
      gorus.dataset.surukle = "1";
      gorus.classList.add("tut");
      $("sh-ipucu").classList.add("git");
      try {
        gorus.setPointerCapture(e.pointerId);
      } catch (x) {}
    }
    if (!tutma.hareket) return;
    dunya.classList.remove("git");
    px = tutma.px + dx;
    py = tutma.py + dy;
    yerles(false);
  });
  function birak(e) {
    if (!tutma || e.pointerId !== tutma.id) return;
    gorus.classList.remove("tut");
    var hareket = tutma.hareket;
    tutma = null;
    if (hareket) setTimeout(function () {
      gorus.dataset.surukle = "0";
    }, 0);
  }
  gorus.addEventListener("pointerup", birak);
  gorus.addEventListener("pointercancel", birak);
  window.addEventListener("resize", olcekle);

  /* ---------------- 3) BASAMAKLAR ---------------- */
  var basamaklar = Array.prototype.slice.call(document.querySelectorAll(".sb-basamak"));
  var simdi = 0;

  function kartYazK() {
    var k = KIYAFET[simdi];
    var n = simdi + 1;
    $("sit-k-no").textContent = n + "/6";
    $("sit-k-meslek").textContent = metin("sit.o" + n + ".job");
    $("sit-k-para").textContent = sayi(k.kazanc) + " ₺";
    $("sit-k-ister").textContent = metin("sit.o" + n + ".need");
    $("sit-k-ac").style.width = Math.min(100, k.ac * 2) + "%";
    $("sit-k-uy").style.width = Math.min(100, k.uy * 2) + "%";
    $("sit-k-ac-n").textContent = "−" + k.ac;
    $("sit-k-uy-n").textContent = "−" + k.uy;
    $("sit-calis-y").textContent = metin("sit.h.work").replace("{job}", metin("sit.o" + n + ".job")).replace("{n}", sayi(k.kazanc));
  }

  function bas(i) {
    simdi = i;
    basamaklar.forEach(function (b, j) {
      b.classList.toggle("aktif", j === i);
      b.setAttribute("aria-pressed", j === i ? "true" : "false");
      b.classList.remove("hop");
    });
    var b = basamaklar[i];
    void b.offsetWidth;
    if (!azalt) b.classList.add("hop");
    kartYazK();
  }

  basamaklar.forEach(function (b, i) {
    b.setAttribute("aria-label", metin("sit.o" + (i + 1) + ".job"));
    b.addEventListener("click", function () {
      bas(i);
    });
  });

  /* ---------------- 4) ALT BAR ---------------- */
  var D;
  var olu = false;

  function basla() {
    D = { gun: 1, para: 0, ac: 100, uy: 100, sa: 100 };
    olu = false;
    $("sit-rip").hidden = true;
    $("sit-hud").classList.remove("olu");
    bildir("");
    hudYaz();
  }

  function tut(v) {
    return Math.max(0, Math.min(100, v));
  }

  function hudYaz() {
    $("sit-gun").textContent = sayi(D.gun);
    $("sit-hud-cep").textContent = sayi(D.para) + " ₺";
    [["ac", "sit-o-ac"], ["uy", "sit-o-uy"], ["sa", "sit-o-sa"]].forEach(function (p) {
      $(p[1]).style.width = D[p[0]] + "%";
      $(p[1] + "-n").textContent = D[p[0]];
      $(p[1]).parentNode.parentNode.classList.toggle("az", D[p[0]] <= 25);
    });
    ["sit-simit", "sit-kebap", "sit-uyu", "sit-calis"].forEach(function (id) {
      $(id).disabled = olu;
    });
  }

  var bildirimZaman;
  function bildir(m) {
    var b = $("sit-bildirim");
    b.textContent = m;
    b.classList.remove("yeni");
    if (m) {
      void b.offsetWidth;
      b.classList.add("yeni");
    }
    clearTimeout(bildirimZaman);
    if (m) bildirimZaman = setTimeout(function () {
      b.textContent = "";
    }, 4200);
  }

  /* Her hareket bir dönem = 3 gün. Açlık ya da uyku sıfırsa sağlık düşer. */
  function donemGec() {
    D.gun += 3;
    if (D.ac === 0 || D.uy === 0) D.sa = tut(D.sa - 10);
    if (D.sa <= 0) olu = true;
    hudYaz();
    if (olu) {
      $("sit-hud").classList.add("olu");
      $("sit-rip-y").textContent = metin("sit.rip.msg").replace("{n}", sayi(D.gun));
      $("sit-rip").hidden = false;
      $("sit-yeniden").focus({ preventScroll: true });
    }
  }

  $("sit-calis").addEventListener("click", function () {
    if (olu) return;
    var k = KIYAFET[simdi];
    D.ac = tut(D.ac - k.ac);
    D.uy = tut(D.uy - k.uy);
    if (k.risk && Math.random() * 100 < k.risk) {
      var ceza = Math.min(D.para, k.kazanc * 3);
      D.para -= ceza;
      bildir(metin("sit.t.caught").replace("{n}", sayi(ceza)));
    } else {
      D.para += k.kazanc;
      bildir(metin("sit.t.work").replace("{n}", sayi(k.kazanc)));
    }
    donemGec();
  });

  function ye(ucret, doyum) {
    return function () {
      if (olu) return;
      if (D.para < ucret) {
        bildir(metin("sit.t.broke"));
        return;
      }
      D.para -= ucret;
      D.ac = tut(D.ac + doyum);
      bildir(metin("sit.t.ate").replace("{n}", doyum));
      donemGec();
    };
  }

  $("sit-simit").addEventListener("click", ye(20, 10));
  $("sit-kebap").addEventListener("click", ye(200, 70));
  $("sit-uyu").addEventListener("click", function () {
    if (olu) return;
    D.uy = tut(D.uy + 30);
    D.ac = tut(D.ac - 5);
    bildir(metin("sit.t.slept"));
    donemGec();
  });
  $("sit-yeniden").addEventListener("click", function () {
    basla();
    $("sit-calis").focus({ preventScroll: true });
  });

  /* ---------------- 5) ŞERİT + RAY ---------------- */
  function seritYaz() {
    var liste = metin("sit.jobs").split("|");
    var html = "";
    for (var t = 0; t < 2; t++) {
      liste.forEach(function (j) {
        html += "<span>" + j.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span><i>✦</i>";
      });
    }
    $("sit-serit").innerHTML = html;
  }

  var rail = $("sit-rail");
  var bolumler = ["sit-hero", "harita", "basamak", "saray"].map($);
  var raylar = Array.prototype.slice.call(rail.querySelectorAll("a"));
  var bekle = false;

  function rayGuncelle() {
    bekle = false;
    var h = document.documentElement;
    var oran = Math.min(1, Math.max(0, window.scrollY / Math.max(1, h.scrollHeight - window.innerHeight)));
    rail.style.setProperty("--yuk", oran);
    var eşik = window.innerHeight * 0.45;
    var en = 0;
    bolumler.forEach(function (b, i) {
      if (b && b.getBoundingClientRect().top <= eşik) en = i;
    });
    raylar.forEach(function (a, i) {
      a.classList.toggle("aktif", i === en);
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!bekle) {
        bekle = true;
        requestAnimationFrame(rayGuncelle);
      }
    },
    { passive: true }
  );

  function hepsiniYaz() {
    kartYazK();
    seritYaz();
    balonYaz();
    adlariYaz();
    cepYaz();
    basamaklar.forEach(function (b, i) {
      b.setAttribute("aria-label", metin("sit.o" + (i + 1) + ".job"));
    });
  }

  dilDegisince(hepsiniYaz);

  pinleriKur();
  basla();
  hepsiniYaz();
  olcekle();
  rayGuncelle();
})();
