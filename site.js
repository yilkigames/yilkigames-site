/* Yılkı Games — arayüz davranışları.
   Üç iş yapar: hero'daki oynanabilir tahta, kaydırınca beliren bölümler,
   kaydırınca koyulaşan üst bar. Hepsi isteğe bağlı; ilgili düğüm yoksa
   sessizce atlanır, böylece aynı dosyayı her sayfaya koyabiliyoruz. */

(function () {
  "use strict";

  /* ---------------- hero'daki oynanabilir XOXD tahtası ----------------
     Dokunuş hücreyi boş → X → O → boş diye döndürür. Tamamlanan her
     X-O-X dizisi kırmızı yanar ve puanı bir artırır. Rakip yok; amaç
     oyunu oynatmak değil, kuralı tek dokunuşta anlatmak. */

  const tahta = document.getElementById("demo-tahta");

  if (tahta) {
    const DIZILER = [];
    for (let s = 0; s < 3; s++) DIZILER.push([s * 3, s * 3 + 1, s * 3 + 2]);
    for (let s = 0; s < 3; s++) DIZILER.push([s, s + 3, s + 6]);
    DIZILER.push([0, 4, 8], [2, 4, 6]);

    /* Açılışta dört dizi tamamlanmış bir düzenle başlıyoruz: ziyaretçi
       daha ilk bakışta yanan satırları ve puanı görüyor. */
    const BASLANGIC = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

    const durum = BASLANGIC.slice();
    const hucreler = [];
    const puanKutusu = document.getElementById("demo-puan");

    for (let i = 0; i < 9; i++) {
      const dugme = document.createElement("button");
      dugme.type = "button";
      dugme.className = "hucre";
      dugme.addEventListener("click", function () {
        durum[i] = durum[i] === "" ? "X" : durum[i] === "X" ? "O" : "";
        ciz();
      });
      tahta.appendChild(dugme);
      hucreler.push(dugme);
    }

    function ciz() {
      const yanan = new Set();
      let puan = 0;

      for (const dizi of DIZILER) {
        if (
          durum[dizi[0]] === "X" &&
          durum[dizi[1]] === "O" &&
          durum[dizi[2]] === "X"
        ) {
          puan++;
          dizi.forEach((k) => yanan.add(k));
        }
      }

      hucreler.forEach(function (dugme, i) {
        dugme.textContent = durum[i];
        dugme.classList.toggle("dolu", durum[i] !== "");
        dugme.classList.toggle("yanan", yanan.has(i));
        dugme.setAttribute(
          "aria-label",
          (i + 1) + ": " + (durum[i] === "" ? "—" : durum[i])
        );
      });

      if (puanKutusu) puanKutusu.textContent = puan;
    }

    const sifirla = document.getElementById("demo-sifirla");
    if (sifirla) {
      sifirla.addEventListener("click", function () {
        durum.fill("");
        ciz();
      });
    }

    ciz();
  }

  /* ---------------- kaydırınca beliren bölümler ---------------- */

  const belirecekler = document.querySelectorAll(".beliriv");

  if (belirecekler.length) {
    const hepsiniGoster = function () {
      belirecekler.forEach((d) => d.classList.add("gorundu"));
    };

    if (!("IntersectionObserver" in window)) {
      hepsiniGoster();
    } else {
      /* Gizlemeyi ancak burada açıyoruz: betik buraya kadar geldiyse
         animasyonu yürütecek her şey elimizde demektir. */
      document.documentElement.classList.add("hareket");

      const gozcu = new IntersectionObserver(
        function (girisler) {
          girisler.forEach(function (giris) {
            if (giris.isIntersecting) {
              giris.target.classList.add("gorundu");
              gozcu.unobserve(giris.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      belirecekler.forEach((d) => gozcu.observe(d));

      /* Son emniyet: gözcü herhangi bir sebeple çalışmazsa (sekme hiç
         çizilmemişse, eklenti engellemişse) içerik gizli kalmasın. */
      setTimeout(hepsiniGoster, 2500);
    }
  }

  /* ---------------- dar ekran menüsü ---------------- */

  const menuDugme = document.getElementById("menu-dugme");
  const anaNav = document.getElementById("ana-nav");

  if (menuDugme && anaNav) {
    const kapat = function () {
      anaNav.classList.remove("acik");
      menuDugme.setAttribute("aria-expanded", "false");
    };

    menuDugme.addEventListener("click", function () {
      const acik = anaNav.classList.toggle("acik");
      menuDugme.setAttribute("aria-expanded", acik ? "true" : "false");
    });

    anaNav.querySelectorAll("a").forEach(function (bag) {
      bag.addEventListener("click", kapat);
    });

    document.addEventListener("keydown", function (olay) {
      if (olay.key === "Escape") kapat();
    });
  }

  /* ---------------- kaydırınca koyulaşan üst bar ---------------- */

  const bar = document.querySelector("header");

  if (bar) {
    let bekliyor = false;
    const guncelle = function () {
      bar.classList.toggle("kaydi", window.scrollY > 12);
      bekliyor = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!bekliyor) {
          bekliyor = true;
          requestAnimationFrame(guncelle);
        }
      },
      { passive: true }
    );
    guncelle();
  }
})();
