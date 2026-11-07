/* ============================================================
   KUMPAS — sayfadaki kamp (oyun değil, tanıtım sahnesi)

   Sekiz kişi ateşin etrafında oturuyor, içlerinden biri kurt.
   Sağdaki düğme geceyle gündüzü değiştiriyor: gece herkes uyuyor,
   kurt uyanık ve kurt kılığında; gündüz herkes insan, kurt kimse
   belli olmuyor. Oyundaki kuralın tek cümlelik hali bu.
   Çizimler oyunun kendi sprite'ları (gorseller/kumpas/s).
   ============================================================ */

(function () {
  "use strict";

  var kamp = document.getElementById("k-kamp");
  if (!kamp) return;

  var sahne = document.getElementById("k-sahne");
  var ates = document.getElementById("k-ates");
  var anahtar = document.getElementById("k-anahtar");
  var YOL = "/gorseller/kumpas/s/";

  /* x, y: kütüğün alt orta noktası (kapak çiziminin ızgarası, 280×168) */
  var KOLT = [[70, 126], [106, 118], [174, 118], [210, 126], [40, 156], [100, 160], [180, 160], [240, 156]];
  var KURT = 6;

  var koltuklar = KOLT.map(function (k, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "k-koltuk";
    b.style.left = (k[0] / 280 * 100).toFixed(2) + "%";
    b.style.top = (k[1] / 168 * 100).toFixed(2) + "%";
    b.style.zIndex = String(k[1]);
    b.setAttribute("aria-hidden", "true");
    b.tabIndex = -1;
    var img = document.createElement("img");
    img.className = "k-kisi";
    img.alt = "";
    img.width = 32;
    img.height = 58;
    b.appendChild(img);
    kamp.appendChild(b);
    return { i: i, el: b, img: img };
  });

  /* Orman: ocak, çalı, çim, mantar (kapak çiziminin ızgarasında) */
  var OT = [["cali-a", 16, 112], ["cali-b", 50, 106], ["cali-a", 140, 100], ["cali-b", 232, 104], ["cali-a", 266, 112], ["cali-b", 12, 160], ["cali-a", 268, 164], ["cali-b", 86, 112], ["cali-b", 200, 110], ["cim-b", 26, 134], ["cim-a", 64, 140], ["cim-c", 82, 128], ["cim-b", 124, 134], ["cim-a", 158, 128], ["cim-c", 150, 160], ["cim-b", 196, 132], ["cim-a", 226, 142], ["cim-c", 254, 134], ["cim-b", 18, 148], ["cim-a", 118, 164], ["cim-b", 166, 166], ["cim-a", 56, 166], ["cim-c", 214, 160], ["cim-b", 262, 150], ["cim-a", 100, 126], ["cim-c", 186, 150], ["cim-a", 38, 120], ["cim-b", 244, 122], ["mantar", 76, 152], ["mantar", 200, 150], ["mantar", 124, 168], ["cicek-sari", 60, 150], ["cicek-beyaz", 232, 154], ["cicek-sari", 172, 168]];
  var BOY = { "ocak": 48, "cali-a": 26, "cali-b": 17, "cim-a": 11, "cim-b": 16, "cim-c": 7, "mantar": 9, "cicek-sari": 5, "cicek-beyaz": 5 };
  OT.forEach(function (o) {
    var im = document.createElement("img");
    im.className = "k-ot";
    im.alt = "";
    im.src = YOL + o[0] + ".png";
    im.style.left = (o[1] / 280 * 100).toFixed(2) + "%";
    im.style.top = (o[2] / 168 * 100).toFixed(2) + "%";
    im.style.width = (BOY[o[0]] / 280 * 100).toFixed(2) + "%";
    im.style.zIndex = String(o[2] - 1);
    kamp.insertBefore(im, kamp.firstChild);
  });
  var ocak = document.getElementById("k-ocak");
  if (ocak) { ocak.style.zIndex = "145"; }

  function yaz(K, d) { K.img.src = YOL + "c" + K.i + "-front-" + d + ".png"; }

  function ciz() {
    var gece = sahne.dataset.faz === "gece";
    koltuklar.forEach(function (K) {
      yaz(K, gece ? (K.i === KURT ? "wolf" : "asleep") : "awake");
    });
  }
  ciz();

  anahtar.addEventListener("click", function () {
    var gece = sahne.dataset.faz === "gece";
    sahne.dataset.faz = gece ? "gunduz" : "gece";
    anahtar.setAttribute("aria-pressed", gece ? "true" : "false");
    ciz();
  });

  /* Karaktere dokununca bir an kurt kesilip geri dönüyor */
  koltuklar.forEach(function (K) {
    K.el.tabIndex = 0;
    K.el.removeAttribute("aria-hidden");
    K.el.setAttribute("aria-label", "Kumpas");
    K.el.addEventListener("click", function () {
      yaz(K, "wolf");
      K.el.classList.add("sallan");
      setTimeout(function () {
        K.el.classList.remove("sallan");
        var gece = sahne.dataset.faz === "gece";
        yaz(K, gece ? (K.i === KURT ? "wolf" : "asleep") : "awake");
      }, 520);
    });
  });

  /* Ateş: dört kare */
  var af = 0;
  setInterval(function () { af = (af + 1) % 4; ates.src = YOL + "f" + af + ".png"; }, 130);

  /* Yıldızlar */
  var yb = document.getElementById("k-yildizlar");
  if (yb) {
    for (var y = 0; y < 46; y++) {
      var s = document.createElement("i");
      s.className = "k-yildiz";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = (-Math.random() * 3.4).toFixed(2) + "s";
      if (Math.random() < 0.2) s.style.width = s.style.height = "5px";
      yb.appendChild(s);
    }
  }
})();
