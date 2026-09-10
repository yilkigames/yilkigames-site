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

  function ciz() {
    var yanan = {};
    var puan = 0;

    for (var d = 0; d < DIZILER.length; d++) {
      var a = DIZILER[d];
      if (durum[a[0]] === "X" && durum[a[1]] === "O" && durum[a[2]] === "X") {
        puan++;
        yanan[a[0]] = yanan[a[1]] = yanan[a[2]] = true;
      }
    }

    for (var i = 0; i < 9; i++) {
      hucreler[i].textContent = durum[i];
      hucreler[i].classList.toggle("yanan", !!yanan[i]);
      hucreler[i].classList.toggle("dolu", durum[i] !== "");
    }

    if (puanKutusu) puanKutusu.textContent = puan;
  }

  ciz();
})();
