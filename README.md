# yilkigames.com

Yılkı Games'in tanıtım sitesi ve Google Play'in istediği yasal sayfalar.
Statik HTML — derleme adımı ve dış bağımlılık yok (yazı tipleri de
`fontlar/` içinde, Google'a istek gitmiyor). Dosyaları olduğu gibi sunmak
yeterli.

```
index.html             ana sayfa — kapak, oyunlar, BASMA düğmesi, atölye kuralları
oyunlar/inklash.html   Inklash tanıtım sayfası (yakında) — kısa bilgi
oyunlar/xoxd.html      XOXD sayfası (kapalı test) + oynanabilir tahta (xoxd.js)
destek.html            destek / SSS / hesap silme — 10 dilli
gizlilik.html          gizlilik politikası (TR) — Play'e verilecek URL
privacy.html           gizlilik politikası (EN)
kullanim-sartlari.html / terms.html          kullanım şartları
sifre-sifirla.html / reset-password.html    Supabase şifre sıfırlama
support.html           /destek.html'e yönlendirme
metin.js               on dilin tüm metinleri
arayuz.js              dil seçici, beliren paneller, üst bar, ses efektleri, BASMA, kart eğimi
tasarim.css            tasarım sistemi — her sayfa bunu kullanıyor
belge.css              uzun metin sayfalarına (gizlilik, şartlar, destek) ek
fontlar/               Bangers (başlık) + Bricolage Grotesque (gövde), woff2
gorseller/logo.svg     stüdyo logosu (vektör)
gorseller/inklash/     ninja.webp — dekupe Amele Ninja
CNAME                  GitHub Pages'in özel alan adı için okuduğu dosya
robots.txt / sitemap.xml
```

## Tasarım dili (2026-10): riso çizgi roman

Site, risograf baskı makinesinden yeni çıkmış bir çizgi roman gibi:
kalın mürekkep çerçeveli paneller, raster noktalar, konuşma balonları,
"PAT!" patlamaları, iki rengin üst üste kaydığı yanlış baskı (`.kayik`),
yırtık kâğıt kenarları (`.yirtik`) ve tüm sayfanın üstünde hafif kâğıt greni.

- **Renkler** `tasarim.css` başındaki `:root`'ta: kâğıt `#f1ece2`,
  mürekkep `#141414`, kırmızı `#ff3b2f`, kobalt mavi `#2e4bff`, açık mavi
  `#d9defc`. Sarı bilerek yok.
- **Logo:** kırmızı yılkı atı kafası. Canva'da üretildi, `vtracer` ile
  vektöre çevrildi → `gorseller/logo.svg` (üst bar ve SVG favicon).
  `favicon.ico`, `favicon-48/96.png`, `apple-touch-icon.png` ve
  `gorseller/logo-kare.png` aynı çizimden.
- **Parçalar:** `.bant-baslik` (dönük kırmızı şerit + mavi kalem çizgisi),
  `.balon`, `.patlama` (`--boy` ile boyutlanır; `.kirmizi`, `.mavi`, uzun
  yazıda `.uzun`), `.damga` (çift çizgili mühür), `.etiket`, `.kart`,
  `.raster`, `.dugme` (+ `.mavi`, `.beyaz`).
- **Marjinal kısımlar** (hepsi `arayuz.js` sonunda, hareket azaltmayı
  seçenlerde sessiz):
  - hero'ya dokununca dokunulan yerde "PAT!", "GÜM!" patlıyor;
  - "BASMA" yazan kırmızı düğme: her basışta mesaj sertleşiyor, sayfa
    sarsılıyor, altıncıda düğme eziliyor. Mesajlar `a.press.m1..m6`;
  - oyun kartları fareyle hafifçe yatıyor;
  - üst bardaki at kafası fareyle üstüne gelince sallanıyor;
  - alt bilginin dibinde kesik, kaymış baskılı dev "YILKI GAMES".
- **Oyun içerikleri bilerek kısa.** Oyun içi ekran görüntüsü kullanılmıyor;
  görsel olarak yalnızca Amele Ninja (`gorseller/inklash/ninja.webp`)
  ve XOXD kapak görseli var. Inklash sayfası defter kâğıdı zemininde,
  dört kısa madde ve "ne zaman" bölümünden ibaret.
- Eski adlı renk değişkenleri (`--yesil`, `--ak`, `--kart`...) şifre
  sayfalarının satır içi stilleri için takma ad olarak duruyor.

Kaydırınca beliren paneller `.beliriv` sınıfıyla işaretli. Gizleme yalnızca
`arayuz.js` çalıştığında (`html.hareket`) devreye giriyor ve 2,5 saniyelik
bir emniyet zamanlayıcısı var — betik yüklenmezse ya da
IntersectionObserver çalışmazsa içerik yine görünür.

## Diller

Site oyunla aynı on dili konuşuyor: **tr en es de fr it pt ru zh ja**.

Dil şu sırayla belirlenir: ziyaretçinin listeden yaptığı seçim
(`localStorage` → `yg-dil`), sonra tarayıcı dili, o da yoksa İngilizce.

**Yeni metin eklerken:** HTML'e `data-i18n="anahtar"` koy (içinde etiket
geçiyorsa `data-i18n-html`), sonra `metin.js` içindeki on sözlüğe de
karşılığını yaz. Ana sayfa anahtarları `a.`, Inklash sayfası `i.`, XOXD
`x.` ile başlıyor. Bir dilde anahtar eksikse orada İngilizcesi görünür,
sayfa bozulmaz. Sayfaya özel başlık/açıklama için
`<body data-title="..." data-desc="...">`.

Bangers yazı tipinde Kiril/Çince/Japonca harf yok; o dillerde başlıklar
sistemin kalın yazısına düşüyor, bu bilerek kabul edildi.

**Gizlilik sayfaları bilerek yalnızca TR ve EN.** Hukuki metnin on dile
çevrilmesi sürümler arasında kayma riski taşıyor; sayfaların başında hangi
sürümün geçerli olduğu yazıyor. Play, İngilizce bir gizlilik politikasını
her ülke için kabul ediyor.

---

## 1. Yayına alma (GitHub Pages)

GitHub Pages ücretsiz, HTTPS'i kendi hallediyor ve kök dizinde düz dosya
sunabiliyor — `app-ads.txt` için bu şart. (Google Sites bunu yapamıyor,
o yüzden tercih edilmedi.)

**a. Depoyu oluştur.** github.com'da yeni bir depo aç: `yilkigames-site`,
**Public** (Pages ücretsiz planda public depo ister).

**b. Kodu gönder.** Bu klasörde:

```bash
git remote add origin https://github.com/yilkigames/yilkigames-site.git
git branch -M main
git push -u origin main
```

**c. Pages'i aç.** Depo → Settings → Pages → Source: `Deploy from a branch`,
Branch: `main` / `(root)` → Save.

**d. Özel alan adını gir.** Aynı sayfada Custom domain: `yilkigames.com` →
Save. `Enforce HTTPS` kutusunu, sertifika hazır olunca (10–30 dk) işaretle.

---

## 2. DNS kayıtları

Alan adı Workspace kaydı sırasında alındıysa **Squarespace Domains**'te
kayıtlı. DNS'i Google Admin Console → Alan adları üzerinden veya doğrudan
Squarespace hesabından yönetebilirsin.

**MX kayıtlarına dokunma.** Onlar Workspace e-postasını çalıştırıyor;
silinirse mail durur. Aşağıdakiler MX'i etkilemez.

Şu anda alan adı Squarespace'in "yapım aşamasında" park sayfasına gidiyor.
O A kayıtlarını **sil**, yerine bunları ekle:

| Tip   | Ana makine | Değer               |
| ----- | ---------- | ------------------- |
| A     | `@`        | `185.199.108.153`   |
| A     | `@`        | `185.199.109.153`   |
| A     | `@`        | `185.199.110.153`   |
| A     | `@`        | `185.199.111.153`   |
| CNAME | `www`      | `yilkigames.github.io` |

Yayılması 15 dakika ile birkaç saat sürer. Kontrol:

```bash
nslookup yilkigames.com
```

---

## 3. `app-ads.txt` — AdMob bağlanmadan ÖNCE OKU

AdMob geliri için `https://yilkigames.com/app-ads.txt` adresinin çalışması ve
Play mağaza sayfasındaki "Website" alanının `yilkigames.com` olması gerekiyor.

**Ama bu dosyayı şimdi oluşturma.** İçinde geçerli kayıt olmayan bir
`app-ads.txt`, reklam ağlarına "bu geliştiricinin yetkili satıcısı yok"
demektir ve programatik reklam talebini **tamamen keser**. Boş dosya,
hiç dosya olmamasından kötüdür.

AdMob hesabını açıp yayıncı kimliğini (`pub-...`) aldıktan sonra AdMob →
App Management → app-ads.txt bölümündeki satırı kopyala ve bu klasöre
`app-ads.txt` adıyla ekle. Tek satır şuna benzer:

```
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

---

## 4. E-posta

Sitedeki tüm bağlantılar tek adrese yazıyor: **`info@yilkigames.com`**.
Ayrı bir destek adresi açarsan tüm `.html` dosyalarında ve `metin.js`
içinde toplu değiştir.

---

## 5. Play Console'a girilecek adresler

| Alan                          | Değer                                          |
| ----------------------------- | ---------------------------------------------- |
| Gizlilik politikası URL'i     | `https://yilkigames.com/gizlilik.html`         |
| Hesap silme talebi URL'i      | `https://yilkigames.com/gizlilik.html#hesap-silme` |
| Mağaza sayfası — Web sitesi   | `https://yilkigames.com`                       |
| Mağaza sayfası — Destek maili | `info@yilkigames.com`                          |

Hesap silme URL'i, hesap oluşturma özelliği olan uygulamalar için Play'in
ayrıca istediği bir alandır — gizlilik politikası URL'i onun yerine geçmiyor.

---

## 6. Gizlilik metni hakkında

`gizlilik.html`, XOXD'nin gerçekten sakladığı veriye göre yazıldı: Supabase
kimlik doğrulama, kullanıcı adı ve kozmetikler, maç/puan verileri, sunucuda
ham hâliyle duran sohbet mesajları, şikâyet kayıtları, çevrimiçi sinyali,
premium bitiş tarihi ve Play satın alma jetonu, cihazda kalan `.dat`
dosyaları, AdMob reklam kimliği.

İki şey kritik:

1. **Play'deki "Veri güvenliği" formu bu metinle birebir uyuşmalı.**
   Uyuşmazlık, yayından kaldırmanın en sık sebeplerinden biri.
2. **Oyun değiştikçe metin de değişmeli.** Yeni bir veri toplamaya
   başlarsan buraya ekle, `Gizlilik.SURUM`'u artır (o zaman oyun herkesten
   yeniden onay ister) ve sayfanın üstündeki tarihi güncelle.

Metin gerçek veri akışına göre hazırlandı ama hukuki bir inceleme değildir.
Ticari gelir başladığında bir avukata okutmak yerinde olur.

---

## 7. Yayın öncesi kalan işler

- [ ] Depoyu GitHub'a gönder, Pages'i aç
- [ ] DNS A kayıtlarını GitHub'a çevir, HTTPS'i doğrula
- [ ] XOXD'de `Gizlilik.POLITIKA_ADRESI` sabitini
      `https://yilkigames.com/gizlilik.html` yap (şu an boş, DEVIR.md'de
      "doldurulmadan mağazaya gönderilemez" diye işaretli)
- [ ] AdMob hesabı açılınca `app-ads.txt` ekle
- [ ] Inklash mağazaya çıkınca: `oyunlar/inklash.html` ve ana sayfadaki
      "Çıkınca haber ver" (mailto) düğmelerini Play bağlantısıyla değiştir,
      rozeti `badge.soon` → `badge.live` yap
- [ ] XOXD kapalı testten çıkınca: rozetleri `badge.test` yerine yayında
      yap, `oyunlar/xoxd.html`'deki "Çıkınca haber ver" düğmesini
      `https://play.google.com/store/apps/details?id=com.yilkigames.xoxd`
      bağlantısıyla değiştir
