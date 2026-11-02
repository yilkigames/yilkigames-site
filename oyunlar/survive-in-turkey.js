/* ============================================================
   SURVIVE IN TURKEY — sayfaya özel davranış
   1) KAPI: gökten banknotlar yağıyor; dokunulan banknot patlıyor,
      cep sayacı 0 ₺'de kalıyor.
   2) GARDIROP: altı kıyafet (askı + sicil kartı). Rakamlar oyunun
      denge tablosundan (kazanç = dönem başına, açlık/uyku bedeli).
   3) ALT BAR: oyunun döngüsünün küçük hâli — her hareket 3 gün,
      açlık ya da uyku bitince sağlık düşer, sağlık bitince R.I.P.
   4) ŞERİT: oyundaki tüm işler, dilenciden başkana.
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

  /* kazanc: dönem başına ₺ · ac / uy: bir dönemde giden puan · risk: yakalanma % */
  var KIYAFET = [
    { kazanc: 100, ac: 1, uy: 1, risk: 0, bar: 12 },
    { kazanc: 8000, ac: 5, uy: 4, risk: 0, bar: 30 },
    { kazanc: 100000, ac: 50, uy: 5, risk: 0, bar: 52 },
    { kazanc: 150000, ac: 50, uy: 5, risk: 0, bar: 62 },
    { kazanc: 220000, ac: 10, uy: 5, risk: 20, bar: 72 },
    { kazanc: 500000, ac: 1, uy: 2, risk: 0, bar: 100 }
  ];

  /* ---------------- 1) KAPI: yağan banknotlar ---------------- */
  var paraKutu = $("sit-para");
  var sahne = $("sit-sahne");
  var cepSayac = $("sit-cep");

  function notaYap(i) {
    var n = document.createElement("button");
    n.type = "button";
    n.className = "sit-nota";
    n.tabIndex = -1;
    n.setAttribute("aria-hidden", "true");
    n.innerHTML = "<i></i><b>₺</b>";
    n.style.left = 4 + ((i * 37) % 88) + "%";
    n.style.setProperty("--sure", 7 + ((i * 13) % 6) + "s");
    n.style.setProperty("--gecik", -((i * 1.7) % 11) + "s");
    n.style.setProperty("--aci", ((i * 29) % 50) - 25 + "deg");
    n.style.setProperty("--boy", 0.8 + (i % 4) * 0.14);
    n.addEventListener("click", function (e) {
      if (n.classList.contains("pat")) return;
      n.classList.add("pat");
      var r = sahne.getBoundingClientRect();
      var p = document.createElement("span");
      p.className = "patlama sari ses-efekti";
      p.setAttribute("aria-hidden", "true");
      p.textContent = "+0 ₺";
      p.style.cssText = "position:absolute;z-index:9;pointer-events:none;left:" + (e.clientX - r.left - 55) + "px;top:" + (e.clientY - r.top - 55) + "px";
      p.style.setProperty("--boy", "110px");
      p.style.setProperty("--aci", "-8deg");
      sahne.appendChild(p);
      p.addEventListener("animationend", function () {
        p.remove();
      });
      cepSayac.classList.remove("sars");
      void cepSayac.offsetWidth;
      cepSayac.classList.add("sars");
      setTimeout(function () {
        n.remove();
        paraKutu.appendChild(notaYap(i + 14));
      }, 400);
    });
    return n;
  }

  if (paraKutu && !azalt) {
    for (var i = 0; i < 12; i++) paraKutu.appendChild(notaYap(i));
  }

  /* ---------------- 2) GARDIROP ---------------- */
  var askilar = Array.prototype.slice.call(document.querySelectorAll(".sit-aski"));
  var giyenler = Array.prototype.slice.call(document.querySelectorAll("#sit-giyen img"));
  var podyum = $("sit-podyum");
  var askCizim = $("sit-ask-cizim");
  var simdi = 0;

  function kartYaz() {
    var k = KIYAFET[simdi];
    var n = simdi + 1;
    $("sit-no").textContent = n + "/6";
    $("sit-k-no").textContent = n + "/6";
    $("sit-k-meslek").textContent = metin("sit.o" + n + ".job");
    $("sit-k-para").textContent = sayi(k.kazanc) + " ₺";
    $("sit-k-ister").textContent = metin("sit.o" + n + ".need");
    $("sit-k-ac").style.width = Math.min(100, k.ac * 2) + "%";
    $("sit-k-uy").style.width = Math.min(100, k.uy * 2) + "%";
    $("sit-k-ac-n").textContent = "−" + k.ac;
    $("sit-k-uy-n").textContent = "−" + k.uy;
    var bars = document.querySelectorAll("#sit-merdiven i");
    Array.prototype.forEach.call(bars, function (b, j) {
      b.classList.toggle("sec", j === simdi);
    });
    var is = metin("sit.h.work").replace("{job}", metin("sit.o" + n + ".job")).replace("{n}", sayi(k.kazanc));
    $("sit-calis-y").textContent = is;
  }

  function giy(i, ses) {
    if (i === simdi) return;
    var eski = giyenler[simdi];
    simdi = i;
    giyenler.forEach(function (g, j) {
      g.classList.remove("cikan");
      if (j === i) {
        g.classList.add("aktif");
        g.removeAttribute("aria-hidden");
        g.classList.remove("yeni");
        void g.offsetWidth;
        if (!azalt) g.classList.add("yeni");
      } else if (g === eski) {
        g.classList.remove("aktif");
        g.setAttribute("aria-hidden", "true");
        if (!azalt) g.classList.add("cikan");
      } else {
        g.classList.remove("aktif");
        g.setAttribute("aria-hidden", "true");
      }
    });
    askilar.forEach(function (a, j) {
      a.classList.toggle("aktif", j === i);
      a.setAttribute("aria-selected", j === i ? "true" : "false");
      a.tabIndex = j === i ? 0 : -1;
    });
    if (!azalt) {
      askCizim.classList.remove("sallan");
      void askCizim.offsetWidth;
      askCizim.classList.add("sallan");
      var p = document.createElement("span");
      p.className = "patlama sari ses-efekti sit-zip";
      p.setAttribute("aria-hidden", "true");
      p.textContent = "ZIP!";
      p.style.setProperty("--boy", "96px");
      p.style.setProperty("--aci", i % 2 ? "8deg" : "-8deg");
      podyum.appendChild(p);
      p.addEventListener("animationend", function () {
        p.remove();
      });
    }
    kartYaz();
    calisHazir();
  }

  askilar.forEach(function (a, i) {
    a.tabIndex = i === 0 ? 0 : -1;
    a.addEventListener("click", function () {
      giy(i);
    });
    a.addEventListener("keydown", function (e) {
      var d = 0;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") d = 1;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") d = -1;
      if (!d) return;
      e.preventDefault();
      var j = (i + d + askilar.length) % askilar.length;
      askilar[j].focus();
      giy(j);
    });
  });

  /* ---------------- 3) ALT BAR ---------------- */
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
    calisHazir();
  }

  function calisHazir() {
    if (!D) return;
    $("sit-simit").disabled = olu;
    $("sit-kebap").disabled = olu;
    $("sit-uyu").disabled = olu;
    $("sit-calis").disabled = olu;
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
    hudYaz();
    if (D.sa <= 0) {
      olu = true;
      $("sit-hud").classList.add("olu");
      $("sit-rip-y").textContent = metin("sit.rip.msg").replace("{n}", sayi(D.gun));
      $("sit-rip").hidden = false;
      calisHazir();
      $("sit-yeniden").focus({ preventScroll: true });
    }
  }

  $("sit-calis").addEventListener("click", function () {
    if (olu) return;
    var k = KIYAFET[simdi];
    var n = simdi + 1;
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

  /* ---------------- 4) ŞERİT ---------------- */
  function seritYaz() {
    var ray = $("sit-serit");
    var liste = metin("sit.jobs").split("|");
    var html = "";
    for (var t = 0; t < 2; t++) {
      liste.forEach(function (j) {
        html += "<span>" + j.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span><i>✦</i>";
      });
    }
    ray.innerHTML = html;
  }

  function hepsiniYaz() {
    kartYaz();
    seritYaz();
    $("sit-calis-y");
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("#dil-panel")) setTimeout(hepsiniYaz, 0);
  });

  basla();
  hepsiniYaz();
})();
