/* ============================================================
   SKYHAND — sayfadaki küçük gösteri (oyun değil)

   Oyundaki güçlerin hepsi altta dizili. Birine dokununca Altın El
   gökten iniyor, köyün bir yerine uzanıyor ve o güç sahnede bir kez
   oynuyor. Arka plan oyunun kendi ekran görüntüsü; efektler canvas
   ile üstüne çiziliyor. Puan, bedel, köylü yok: yalnızca tanıtım.
   ============================================================ */

(function () {
  "use strict";

  var cerceve = document.getElementById("s-cerceve");
  if (!cerceve) return;

  var tuval = document.getElementById("s-fx");
  var cx = tuval.getContext("2d");
  var el = document.getElementById("s-el");
  var gucBar = document.getElementById("s-guc");

  var S = {
    tr: ["Yağmur", "Güneş", "Yıldırım", "Kar", "Bereket", "Meteor"],
    en: ["Rain", "Sun", "Lightning", "Snow", "Bounty", "Meteor"],
    es: ["Lluvia", "Sol", "Rayo", "Nieve", "Abundancia", "Meteoro"],
    de: ["Regen", "Sonne", "Blitz", "Schnee", "Segen", "Meteor"],
    fr: ["Pluie", "Soleil", "Foudre", "Neige", "Abondance", "Météore"],
    it: ["Pioggia", "Sole", "Fulmine", "Neve", "Abbondanza", "Meteorite"],
    pt: ["Chuva", "Sol", "Raio", "Neve", "Fartura", "Meteoro"],
    ru: ["Дождь", "Солнце", "Молния", "Снег", "Урожай", "Метеор"],
    zh: ["降雨", "阳光", "闪电", "降雪", "丰收", "陨石"],
    ja: ["雨", "太陽", "雷", "雪", "豊穣", "隕石"]
  };
  function adlar() {
    var d = (document.documentElement.lang || "tr").slice(0, 2);
    return S[d] || S.tr;
  }

  var GUCLER = [
    { id: "yagmur", renk: "#2f9dff", koyu: "#1b72cc", bedel: 15 },
    { id: "gunes", renk: "#ffc531", koyu: "#e09a00", bedel: 10 },
    { id: "yildirim", renk: "#7a63ff", koyu: "#5340d6", bedel: 30 },
    { id: "kar", renk: "#9fd8ff", koyu: "#5fa8d6", bedel: 20 },
    { id: "bereket", renk: "#2fcb72", koyu: "#1d9a53", bedel: 20 },
    { id: "meteor", renk: "#ff8a3d", koyu: "#b34a1f", bedel: 60 }
  ];
  var IKON = {
    yagmur: '<path d="M7 15a4.5 4.5 0 0 1 .6-8.9A6 6 0 0 1 19 8a3.8 3.8 0 0 1-.5 7.6H7Z" fill="#fff"/><path d="M9 18.5l-1 2.4M13 18.5l-1 2.4M17 18.5l-1 2.4" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    gunes: '<circle cx="12" cy="12" r="4.6" fill="#fff"/><path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
    yildirim: '<path d="M13.5 2.5L5.5 13h5.6L9.4 21.5 18.8 9.6h-5.7Z" fill="#fff"/>',
    kar: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#fff"/>',
    bereket: '<path d="M12 21V11" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M12 12C12 7.5 8.5 5.5 4.5 6c0 4.5 3 6.5 7.5 6ZM12 14c0-4 3-6.2 7.5-5.8 0 4.4-3.2 6.4-7.5 5.8Z" fill="#fff"/>',
    meteor: '<circle cx="15.5" cy="14.5" r="5.2" fill="#fff"/><path d="M11 10L3.5 3.5M9 14.5l-6 .5M14 9.5L13.5 3" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>'
  };

  gucBar.innerHTML = "";
  GUCLER.forEach(function (g, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "s-guc-dugme";
    b.style.setProperty("--r", g.renk);
    b.style.setProperty("--k", g.koyu);
    b.innerHTML = '<span class="s-guc-ikon"><svg viewBox="0 0 24 24" aria-hidden="true">' + IKON[g.id] + '</svg><i>' + g.bedel + '</i></span><span class="s-guc-ad"></span>';
    b.addEventListener("click", function () { oyna(i); });
    gucBar.appendChild(b);
  });
  function adlariYaz() {
    var a = adlar();
    [].forEach.call(gucBar.children, function (c, i) { c.querySelector(".s-guc-ad").textContent = a[i]; });
  }
  adlariYaz();
  new MutationObserver(adlariYaz).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  /* ---------------- tuval ---------------- */
  var W = 0, H = 0, dpr = 1;
  function boyut() {
    var r = cerceve.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    tuval.width = Math.round(W * dpr);
    tuval.height = Math.round(H * dpr);
    tuval.style.width = W + "px";
    tuval.style.height = H + "px";
  }
  boyut();
  window.addEventListener("resize", boyut);

  /* ---------------- efektler ---------------- */
  var efektler = [];
  var sarsinti = 0;
  var parlama = 0;
  var parlamaRenk = "#fff";

  function bulut(k, x, y, w, a) {
    k.save();
    k.globalAlpha = a;
    k.fillStyle = "#e9f1f8";
    k.strokeStyle = "#0e0d0c";
    k.lineWidth = 4;
    k.beginPath();
    [[-0.34, 0.1, 0.2], [-0.12, -0.12, 0.26], [0.16, -0.06, 0.24], [0.36, 0.1, 0.18]].forEach(function (c) {
      k.moveTo(x + c[0] * w + c[2] * w, y + c[1] * w);
      k.arc(x + c[0] * w, y + c[1] * w, c[2] * w, 0, Math.PI * 2);
    });
    k.stroke();
    k.fill();
    k.fillRect(x - w * 0.36, y + w * 0.06, w * 0.72, w * 0.16);
    k.restore();
  }

  function yagmur(x, y) {
    var R = W * 0.13, zmn = 0, damlalar = [], sicr = [];
    for (var i = 0; i < 90; i++) damlalar.push({ a: Math.random() * 2 * Math.PI, r: Math.sqrt(Math.random()) * R, ph: Math.random() });
    return { omur: 3.8, guncelle: function (dt, t) { zmn = t; }, ciz: function (k, t) {
      var a = t < 0.4 ? t / 0.4 : t > 3.2 ? Math.max(0, (3.8 - t) / 0.6) : 1;
      var g = k.createRadialGradient(x, y, 0, x, y, R * 1.5);
      g.addColorStop(0, "rgba(20,60,140," + 0.28 * a + ")"); g.addColorStop(1, "rgba(20,60,140,0)");
      k.fillStyle = g; k.fillRect(x - R * 1.6, y - R * 1.6, R * 3.2, R * 3.2);
      bulut(k, x, y - H * 0.38, R * 2.4, a);
      k.strokeStyle = "rgba(60,160,255," + a + ")"; k.lineWidth = 2.4; k.lineCap = "round";
      damlalar.forEach(function (d) {
        var p = ((t * 1.7 + d.ph) % 1);
        var dx = x + Math.cos(d.a) * d.r, dy0 = y - H * 0.3, dy = dy0 + (y + Math.sin(d.a) * d.r * 0.3 - dy0) * p;
        k.beginPath(); k.moveTo(dx, dy - 10); k.lineTo(dx - 1.5, dy + 3); k.stroke();
        if (p > 0.93) { k.beginPath(); k.ellipse(dx, y + Math.sin(d.a) * d.r * 0.3, 6, 2, 0, 0, 7); k.stroke(); }
      });
    } };
  }
  function gunes(x, y) {
    var R = W * 0.15;
    return { omur: 3.2, ciz: function (k, t) {
      var a = t < 0.4 ? t / 0.4 : t > 2.6 ? Math.max(0, (3.2 - t) / 0.6) : 1;
      var g = k.createRadialGradient(x, y, 0, x, y, R * 1.6);
      g.addColorStop(0, "rgba(255,225,110," + 0.55 * a + ")"); g.addColorStop(1, "rgba(255,200,60,0)");
      k.fillStyle = g; k.fillRect(x - R * 2, y - R * 2, R * 4, R * 4);
      var sx = x, sy = y - H * 0.34;
      k.save(); k.translate(sx, sy); k.globalAlpha = a; k.rotate(t * 0.6);
      k.fillStyle = "#ffd23f"; k.strokeStyle = "#0e0d0c"; k.lineWidth = 4;
      for (var i = 0; i < 12; i++) { k.rotate(Math.PI / 6); k.beginPath(); k.moveTo(-9, -38); k.lineTo(0, -62); k.lineTo(9, -38); k.closePath(); k.fill(); k.stroke(); }
      k.restore();
      k.save(); k.globalAlpha = a; k.fillStyle = "#ffd23f"; k.strokeStyle = "#0e0d0c"; k.lineWidth = 4;
      k.beginPath(); k.arc(sx, sy, 34, 0, 7); k.fill(); k.stroke();
      k.fillStyle = "#0e0d0c"; k.fillRect(sx - 12, sy - 8, 5, 8); k.fillRect(sx + 7, sy - 8, 5, 8);
      k.beginPath(); k.arc(sx, sy + 4, 14, 0.15 * Math.PI, 0.85 * Math.PI); k.lineWidth = 3; k.stroke();
      k.restore();
      k.fillStyle = "rgba(255,190,70," + 0.1 * a + ")"; k.fillRect(0, 0, W, H);
    } };
  }
  function yildirim(x, y) {
    var pts = [], x0 = x + (Math.random() - 0.5) * W * 0.12;
    var n = 9;
    for (var i = 0; i <= n; i++) {
      var p = i / n;
      pts.push([x0 + (x - x0) * p + (i && i < n ? (Math.random() - 0.5) * 46 : 0), -10 + (y + 10) * p]);
    }
    var vurdu = false;
    return { omur: 1.5, ciz: function (k, t) {
      if (t > 0.12 && !vurdu) { vurdu = true; parlama = 0.9; parlamaRenk = "#fff"; sarsinti = 0.35; }
      if (t > 0.1 && t < 0.7) {
        var a = t < 0.35 ? 1 : Math.max(0, 1 - (t - 0.35) / 0.35);
        k.save(); k.lineJoin = "round"; k.lineCap = "round"; k.globalAlpha = a;
        [["#0e0d0c", 15], ["#ffd23f", 9], ["#fff", 4]].forEach(function (s) {
          k.strokeStyle = s[0]; k.lineWidth = s[1]; k.beginPath();
          pts.forEach(function (p, i) { i ? k.lineTo(p[0], p[1]) : k.moveTo(p[0], p[1]); });
          k.stroke();
        });
        k.restore();
      }
      if (t > 0.12) {
        var b = Math.max(0, 1 - (t - 0.12) / 1.2);
        var g = k.createRadialGradient(x, y, 0, x, y, 80);
        g.addColorStop(0, "rgba(255,255,200," + 0.9 * b + ")"); g.addColorStop(1, "rgba(255,210,63,0)");
        k.fillStyle = g; k.fillRect(x - 90, y - 90, 180, 180);
        k.strokeStyle = "rgba(14,13,12," + 0.7 * b + ")"; k.lineWidth = 3;
        for (var i = 0; i < 5; i++) { k.beginPath(); k.arc(x + (i - 2) * 16, y - 8 - (t - 0.12) * 40 * (1 + i % 2), 7 + (t * 10), 0, 7); k.stroke(); }
      }
    } };
  }
  function kar(x, y) {
    var R = W * 0.15, tane = [];
    for (var i = 0; i < 80; i++) tane.push({ x: (Math.random() - 0.5) * R * 2.6, ph: Math.random(), s: 1.5 + Math.random() * 2.8, sw: Math.random() * 6 });
    return { omur: 4.2, ciz: function (k, t) {
      var a = t < 0.5 ? t / 0.5 : t > 3.4 ? Math.max(0, (4.2 - t) / 0.8) : 1;
      var g = k.createRadialGradient(x, y, 0, x, y, R * 1.4);
      g.addColorStop(0, "rgba(220,240,255," + 0.45 * a + ")"); g.addColorStop(1, "rgba(220,240,255,0)");
      k.fillStyle = g; k.fillRect(x - R * 1.6, y - R * 1.6, R * 3.2, R * 3.2);
      k.fillStyle = "rgba(190,225,255," + 0.1 * a + ")"; k.fillRect(0, 0, W, H);
      bulut(k, x, y - H * 0.4, R * 2.2, a * 0.9);
      k.fillStyle = "rgba(255,255,255," + a + ")";
      tane.forEach(function (d) {
        var p = (t * 0.45 + d.ph) % 1;
        var px = x + d.x + Math.sin(t * 2 + d.sw) * 12, py = y - H * 0.34 + (H * 0.34 + R * 0.25) * p;
        k.beginPath(); k.arc(px, py, d.s, 0, 7); k.fill();
      });
    } };
  }
  function bereket(x, y) {
    var R = W * 0.12, k1 = [], filiz = [];
    for (var i = 0; i < 26; i++) k1.push({ x: (Math.random() - 0.5) * R * 2, ph: Math.random(), s: 5 + Math.random() * 7 });
    for (var j = 0; j < 7; j++) filiz.push({ x: x + (Math.random() - 0.5) * R * 1.8, y: y + (Math.random() - 0.3) * R * 0.5, t0: 0.2 + Math.random() * 1.2 });
    return { omur: 3.4, ciz: function (k, t) {
      var a = t < 0.3 ? t / 0.3 : t > 2.8 ? Math.max(0, (3.4 - t) / 0.6) : 1;
      var g = k.createRadialGradient(x, y, 0, x, y, R * 1.4);
      g.addColorStop(0, "rgba(80,230,130," + 0.35 * a + ")"); g.addColorStop(1, "rgba(80,230,130,0)");
      k.fillStyle = g; k.fillRect(x - R * 1.6, y - R * 1.6, R * 3.2, R * 3.2);
      filiz.forEach(function (f) {
        var p = Math.max(0, Math.min(1, (t - f.t0) / 0.5)), e = 1 + 1.7 * Math.pow(p - 1, 3) + 0.7 * Math.pow(p - 1, 2);
        if (p <= 0) return;
        k.save(); k.globalAlpha = a; k.translate(f.x, f.y); k.scale(e, e);
        k.strokeStyle = "#0e0d0c"; k.lineWidth = 3; k.fillStyle = "#35d070";
        k.beginPath(); k.moveTo(0, 0); k.lineTo(0, -12); k.stroke();
        k.beginPath(); k.moveTo(0, -10); k.quadraticCurveTo(-13, -12, -12, -22); k.quadraticCurveTo(-1, -20, 0, -10); k.fill(); k.stroke();
        k.beginPath(); k.moveTo(0, -12); k.quadraticCurveTo(13, -14, 12, -24); k.quadraticCurveTo(1, -22, 0, -12); k.fill(); k.stroke();
        k.restore();
      });
      k1.forEach(function (d) {
        var p = (t * 0.5 + d.ph) % 1, px = x + d.x, py = y - p * H * 0.28;
        k.save(); k.globalAlpha = a * (1 - p); k.translate(px, py); k.rotate(p * 3);
        k.fillStyle = "#c8ffd8";
        k.beginPath(); for (var i = 0; i < 8; i++) { var r = i % 2 ? d.s * 0.3 : d.s; k.lineTo(Math.cos(i * Math.PI / 4) * r, Math.sin(i * Math.PI / 4) * r); } k.closePath(); k.fill();
        k.restore();
      });
    } };
  }
  function meteor(x, y) {
    var bas = [x + W * 0.5, -60], vurdu = false, kor = [];
    for (var i = 0; i < 26; i++) kor.push({ a: Math.random() * 2 * Math.PI, v: 60 + Math.random() * 220, s: 2 + Math.random() * 3 });
    return { omur: 4, ciz: function (k, t) {
      var ucus = 0.65;
      if (t < ucus) {
        var p = t / ucus, mx = bas[0] + (x - bas[0]) * p, my = bas[1] + (y - bas[1]) * p;
        var ang = Math.atan2(y - bas[1], x - bas[0]);
        k.save(); k.translate(mx, my); k.rotate(ang);
        k.fillStyle = "#ff8a3d"; k.strokeStyle = "#0e0d0c"; k.lineWidth = 4; k.lineJoin = "round";
        k.beginPath(); k.moveTo(-120, 0); k.lineTo(-20, -20); k.lineTo(-20, 20); k.closePath(); k.fillStyle = "#ffcf5a"; k.fill(); k.stroke();
        k.beginPath(); k.moveTo(-80, 0); k.lineTo(-18, -13); k.lineTo(-18, 13); k.closePath(); k.fillStyle = "#ff5a1f"; k.fill();
        k.beginPath(); k.arc(0, 0, 22, 0, 7); k.fillStyle = "#6a3b22"; k.fill(); k.stroke();
        k.beginPath(); k.arc(-5, -6, 6, 0, 7); k.fillStyle = "#8e5a38"; k.fill();
        k.restore();
      } else {
        if (!vurdu) { vurdu = true; parlama = 1; parlamaRenk = "#fff2c0"; sarsinti = 0.7; }
        var q = t - ucus;
        var a = Math.max(0, 1 - q / 3);
        k.fillStyle = "rgba(14,13,12," + 0.45 * a + ")"; k.beginPath(); k.ellipse(x, y + 4, 46, 17, 0, 0, 7); k.fill();
        k.fillStyle = "rgba(60,30,18," + 0.6 * a + ")"; k.beginPath(); k.ellipse(x, y + 2, 34, 12, 0, 0, 7); k.fill();
        if (q < 0.8) {
          k.strokeStyle = "rgba(255,200,90," + (1 - q / 0.8) + ")"; k.lineWidth = 8 * (1 - q / 0.8) + 2;
          k.beginPath(); k.ellipse(x, y, 20 + q * 220, (20 + q * 220) * 0.4, 0, 0, 7); k.stroke();
        }
        kor.forEach(function (d) {
          var px = x + Math.cos(d.a) * d.v * q, py = y + Math.sin(d.a) * d.v * q * 0.6 - 120 * q + 160 * q * q;
          k.fillStyle = "rgba(255," + Math.round(120 + 100 * (1 - q)) + ",40," + Math.max(0, 1 - q / 1.4) + ")";
          k.beginPath(); k.arc(px, py, d.s, 0, 7); k.fill();
        });
        var g = k.createRadialGradient(x, y, 0, x, y, 90);
        g.addColorStop(0, "rgba(255,140,40," + 0.6 * Math.max(0, 1 - q / 1.4) + ")"); g.addColorStop(1, "rgba(255,140,40,0)");
        k.fillStyle = g; k.fillRect(x - 100, y - 100, 200, 200);
      }
    } };
  }
  var YAPIM = { yagmur: yagmur, gunes: gunes, yildirim: yildirim, kar: kar, bereket: bereket, meteor: meteor };

  var efektler = [];
  var sarsinti = 0;
  var parlama = 0;
  var parlamaRenk = "#fff";

  var onceki = performance.now();
  var gorunur = true;
  function dongu(now) {
    var dt = Math.min(0.05, (now - onceki) / 1000);
    onceki = now;
    if (gorunur) {
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.clearRect(0, 0, W, H);
      for (var i = efektler.length - 1; i >= 0; i--) {
        var e = efektler[i];
        e.t += dt;
        e.fx.ciz(cx, e.t);
        if (e.t >= e.fx.omur) efektler.splice(i, 1);
      }
      if (parlama > 0.01) {
        cx.globalAlpha = parlama; cx.fillStyle = parlamaRenk; cx.fillRect(0, 0, W, H); cx.globalAlpha = 1;
        parlama *= Math.pow(0.003, dt);
      }
      if (sarsinti > 0) {
        sarsinti = Math.max(0, sarsinti - dt);
        var m = sarsinti * 22;
        cerceve.style.setProperty("--sx", ((Math.random() - 0.5) * m).toFixed(1) + "px");
        cerceve.style.setProperty("--sy", ((Math.random() - 0.5) * m).toFixed(1) + "px");
        if (sarsinti === 0) { cerceve.style.setProperty("--sx", "0px"); cerceve.style.setProperty("--sy", "0px"); }
      }
      elGuncelle();
    }
    requestAnimationFrame(dongu);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { gorunur = e[0].isIntersecting; }).observe(cerceve);
  }

  /* ---------------- Altın El: gökten iniyor, dokunuyor, çekiliyor ---------------- */
  var hx = 0, hy = -80, hedefX = 0, hedefY = -80, bosta = true;
  function elGuncelle() {
    hx += (hedefX - hx) * 0.16;
    hy += (hedefY - hy) * 0.16;
    var ol = W < 520 ? 0.62 : 0.85;
    el.style.transform = "translate(" + (hx - 29.5 * ol).toFixed(1) + "px," + (hy - 538 * ol).toFixed(1) + "px) scale(" + ol + ")";
  }
  requestAnimationFrame(dongu);

  var sira = 0;
  var NOKTALAR = [[0.36, 0.56], [0.5, 0.46], [0.62, 0.6], [0.28, 0.5], [0.72, 0.5], [0.44, 0.66]];
  function oyna(i) {
    var g = GUCLER[i];
    var p = NOKTALAR[(sira++) % NOKTALAR.length];
    var x = W * p[0], y = H * p[1];
    hedefX = x; hedefY = y - 60;
    setTimeout(function () {
      hedefY = y;
      el.classList.remove("dokun");
      void el.offsetWidth;
      el.classList.add("dokun");
      efektler.push({ t: 0, fx: YAPIM[g.id](x, y) });
    }, 380);
    setTimeout(function () { hedefY = -120; }, 1500);
  }

  /* Açılışta el bir kez yağmur yağdırıyor */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); setTimeout(function () { oyna(0); }, 800); } }, { threshold: 0.5 });
    io.observe(cerceve);
  }
})();
