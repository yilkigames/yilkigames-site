# yilkigames.com

Yılkı Games'in tanıtım sitesi ve Google Play'in istediği yasal sayfalar.
Statik HTML — derleme adımı ve dış bağımlılık yok (yazı tipleri de
`fontlar/` içinde, Google'a istek gitmiyor). Dosyaları olduğu gibi sunmak
yeterli.

```
index.html             ana sayfa — karalamalı kapak, defter vitrini, BASMA düğmesi, sersem ninja sahnesi
                       (karalama çizimleri <symbol> olarak bu dosyanın başında)
oyunlar/inklash.html   Inklash tanıtım sayfası (yakında) — canlı ninja, 4 karelik karikatür, mürekkep arcade'i (telefon + film şeridi)
oyunlar/xoxd.html      XOXD sayfası (kapalı test) + oynanabilir tahta (xoxd.js)
oyunlar/survive-in-turkey.html  Survive in Turkey sayfası + gardırop/alt bar (survive-in-turkey.js)
destek.html            destek / SSS / hesap silme — 10 dilli
gizlilik.html          gizlilik politikası (TR) — Play'e verilecek URL
privacy.html           gizlilik politikası (EN)
kullanim-sartlari.html / terms.html          kullanım şartları
sifre-sifirla.html / reset-password.html    Supabase şifre sıfırlama
support.html           /destek.html'e yönlendirme
metin.js               on dilin tüm metinleri
arayuz.js              dil seçici, beliren paneller, üst bar, karalamalar, ses efektleri, BASMA,
                       defter eğimi ve sayfa çevirme, sersem ninja, Inklash ninjası
tasarim.css            tasarım sistemi — her sayfa bunu kullanıyor
belge.css              uzun metin sayfalarına (gizlilik, şartlar, destek) ek
fontlar/               Bangers (başlık) + Bricolage Grotesque (gövde) + Space Grotesk (yalnız XOXD), woff2
gorseller/logo.svg     stüdyo logosu (vektör, üst bar)
icon-*.png, favicon.ico, apple-touch-icon.png, site.webmanifest   favicon seti
gorseller/inklash/     ninja.webp — dekupe Amele Ninja
                       ninja-sersem/bekle/yumruk.webp — oyunun 6 karelik animasyon şeritleri
                       hikaye-karikatur.webp — 4 karelik hikâye (Canva, yazısız),
                       dojo-murekkep.webp — oyunun dojo arenası, mürekkebe çevrilmiş,
                       kare-*.webp (2000×900) ve kare-*-k.webp (480×216 önizleme) — oyun içi kareler
gorseller/bitpazari-insaat.webp, survive-kapak.webp, xoxd-kapak.webp — vitrin görselleri
gorseller/xoxd-*.webp — XOXD oyun kareleri (6 kare, 900×1600)
CNAME                  GitHub Pages'in özel alan adı için okuduğu dosya
robots.txt / sitemap.xml
```

## Tasarım dili (2026-10): gece baskısı

Site, gece basılmış bir çizgi roman gibi: zemin mürekkep siyahı, çizgiler
kemik beyazı, ana vurgu kırmızı; sarı ve mavi yalnızca araya serpilen
küçük detaylarda. Kalın çerçeveler, sert kırmızı gölgeler,
"PAT!" patlamaları, iki kalıbın kaydığı yanlış baskı (`.kayik`), yırtık
kenarlar (`.yirtik`) ve sayfanın üstünde hafif bir baskı greni. Konuşma
balonları ve belge kâğıdı (gizlilik, şartlar) açık renk kalıyor.

- **Renkler** `tasarim.css` başındaki `:root`'ta: mürekkep `#0e0d0c`,
  paneller `#1a1816` / `#27241f`, kemik `#f1ece2`, kırmızı `#ff3b2f`.
  Açık paneller için `--beyaz` `#f6f1e7`. Ara renkler `--sari` `#ffd23f`
  ve `--mavi` `#2f5bff` yalnızca detayda: maskeleme bantları, tükenmez
  notları, inşaat bandı, çevirme düğmeleri, hikâyenin anlatıcı kutuları,
  bazı patlamalar, yanlış baskının ikinci kalıbı. Büyük alanlara sarı/mavi
  verme.
- **Logo:** kırmızı yılkı atı kafası. Canva'da üretildi, `vtracer` ile
  vektöre çevrildi → `gorseller/logo.svg` (üst bar).
  **Favicon seti:** kemik rengi yuvarlak kareye oturtulmuş at kafası
  (koyu ve açık temada aynı okunsun diye): `favicon.ico` (16/32/48),
  `icon-96/192/512.png`, `apple-touch-icon.png`, `site.webmanifest`.
  Google yalnızca 48'in katı boyutları alıyor; SVG favicon bilerek
  bağlanmadı. İkon değişince Google eski ikonu haftalarca tutabiliyor:
  Search Console → URL Denetimi → ana sayfa → "Dizine eklenmesini iste"
  ve yeni URL'ler (`?v=3`, yeni dosya adları) kullanmak süreci hızlandırır.
  `gorseller/logo-kare.png` yapısal verideki logo.
- **Karalamalar:** oyunlarımızdan karikatür çizimler, `index.html`'in
  başında `<symbol id="c-...">` olarak (100×100, çizgi `currentColor`,
  vurgu kırmızı). Inklash: yumruk, mürekkep, ko · XOXD: x, o, tahta ·
  Survive in Turkey: çay, simit, kedi · Bit Pazarı: gramofon, kaset,
  etiket · stüdyo: nal, şimşek, bomba, parıltı. Yeni çizim eklerken
  `arayuz.js`'teki `ADLAR` listesine de ekle. Kırmızı vurgu
  `style="fill: var(--vurgu, #ff3b2f)"` ile yazılı; hero'da bazılarına
  sarı ya da mavi düşüyor.
- **Oyun vitrini:** masaya açılmış spiralli defter (Inklash'ın menüsü de
  kareli defter). Kemik kâğıt, soluk mavi kareler, kırmızı kenar çizgisi.
  Dört oyun tek defterde: ilk açılış Inklash (Amele Ninja kırmızı panelden
  taşıyor) | XOXD (bantlı polaroid). Sağ alttaki sarı düğme sağ yaprağı
  3B çeviriyor: arkasında Survive in Turkey, altında Bit Pazarı (Canva'da
  çizilmiş "oyun inşaatı" görseli, köşesinde sarı-siyah bant). Görünmeyen
  sayfalar `inert`. Defter fareyle hafifçe yatıyor; telefonda dört sayfa
  alt alta, çevirme yok.
- **Sersem sahne (eski atölye kuralları):** yazısız. Oyunun sersem
  animasyonuyla sallanan Amele Ninja, başında dönen yıldız ve kuşlar,
  yerde kavga döküntüsü. Dokununca tokat yiyip "PAT!" diyor.
- **Kare animasyonu:** `.sprite` + `.sersem` / `.bekle` / `.yumruk`.
  Şeritler `Documents/inklash/karakterler/amele/kareler` karelerinden,
  ortak ölçekle ve sol-alt hizayla (oyundaki ayak çapası) üretildi.
  Tek seferlik animasyon ayrı keyframe adı kullanmalı (`kare6-tek`);
  aynı adla tarayıcı sonsuz döngüyü sürdürüp yumruğu hiç oynatmıyor.
- **Parçalar:** `.bant-baslik` (dönük kırmızı şerit, sarı kalem çizgisi), `.balon`,
  `.patlama` (`--boy` ile boyutlanır; `.kirmizi`, `.kara`, `.sari`, `.mavi`, uzun yazıda
  `.uzun`), `.damga`, `.etiket`, `.raster`, `.dugme` (+ `.gece`), `.bant`
  (maskeleme bandı), `.polaroid`, `.insaat-bandi`, `.cevir`.
- **Marjinal kısımlar** (hepsi `arayuz.js`'te, hareket azaltmayı
  seçenlerde sessiz):
  - girişte karalamalar her açılışta rastgele diziliyor; masaüstünde
    sağdan sola, telefonda aşağıdan yukarı giderek saydamlaşıyor,
    çizgileri çizgi film gibi "kaynıyor". Birine dokununca patlayıp
    yerine başkası geliyor; boş yere dokununca "PAT!", "GÜM!";
  - "BASMA" düğmesi: önce koruma kapağı, sonra sekiz kademe — sarsıntı
    ve düğmeden fırlayan karalamalar, 4'te alarm ve siren, 5-6'da çatlak,
    7'de son uyarı, 8'de 3-2-1 ve tam ekran KA-BUM. Ardından "Söz
    dinlemez" damgası ve "Tamir et". Sayaç yok, hiçbir şey kaydedilmiyor.
    Metinler `a.press.*`;
  - logo üstüne gelince sallanıyor;
  - alt bilginin dibinde kesik, kaymış baskılı dev "YILKI GAMES".
- **Oyun içerikleri bilerek kısa.** Ana sayfada oyun içi ekran görüntüsü
  yok; Inklash sayfasında yalnızca iki kare var (fazlasını koyma). Amele
  Ninja vitrinde, sersem sahnede ve Inklash sayfasında; girişte yok.
- **Inklash hikâyesi:** sakar bir ninja ustası son nefesinde öğrencisine
  boş bir parşömen verip "dünyanın en güçlü dövüşçüsüne götür" diyor;
  Amele Ninja yola çıkıyor. Karikatür Canva'da `ninja.webp` referans
  verilerek tek görsel (2×2) çizildi; **görsellerde yazı yok**, metinler
  sitede (`i.s1`–`i.s4`, yanda numaralı liste) ki on dile çevrilebilsin.
  Yeni Canva görsellerinde de yazı istemeyin.
- **Oyun kareleri nasıl alındı:** Inklash projesine geçici bir sahne
  eklenip (`hedef=dovus_alani p1=amele p2=manyak`, oyuncu da yapay zekâ)
  `get_viewport().get_texture().get_image().save_png()` ile kare kare
  kaydedildi; sahne sonra silindi.
- **Oyundan kareler vitrini (Inklash sayfası):** yan yatmış kalın çerçeveli
  telefon; ekranda 6 kare sırayla geçiyor, yenisi tıklanan noktadan
  mürekkep lekesi gibi açılıyor (`clip-path`), telefon sarsılıyor, "POW!"
  patlıyor. Altından kırmızı mürekkep damlıyor, köşesine shuriken
  saplanmış, vizör köşeleri ve yanıp sönen kayıt ışığı var, altında
  sprocket delikli film şeridi. Tıkla / kaydır / ok tuşları / film
  şeridi; fare üstündeyken ve sekme gizliyken durur; hareket azaltmada
  otomatik oynatma kapalı. Yeni kare eklemek: `kare-<ad>.webp` +
  `kare-<ad>-k.webp` koy, HTML'de hem `.ekran` içine hem `.film`'e ekle.
  Kareler oyundan **tam çözünürlükte** alınır: geçici sahnede oyun bir
  `SubViewport` (2400×1080) içine kurulup `get_texture().get_image()`
  ile kaydedilir (pencere ekrandan büyük olamadığı için doğrudan pencere
  görüntüsü 1920'de kalıyordu); sahne sonra silinir.
- **Şerit espirileri:** `a.joke1`–`a.joke10`. Her bantta bir kez, her
  açılışta karışık sırayla (arayuz.js → ŞERİTLER); hız bant uzunluğundan
  bağımsız ~45 px/sn. Yeni söz eklerken iki bandın HTML'ine de iki kopya
  olarak ekle.
- Sayfalarda küçük açıklama yazıları (balon notları, "çizimlere dokun",
  sayaç) bilerek yok; kullanıcı istemedi.
- **XOXD oyun galerisi — "tahtanın kendisi sahne":** sayfa kaydıkça sahne
  (`position: sticky`, bölüm yüksekliği JS ile `.xg-aktif`) yerinde kalıyor
  ve oyunun 3×3 tahtası çiziliyor. Ortadaki hücrede dikey telefon, oyundan
  6 gerçek kare; her karede çevredeki hücrelere bir X ya da O "yazılıyor"
  (`stroke-dashoffset`), 3. karede üst satır, 6. karede alt satır X-O-X
  oluyor → kırmızı çizgi çekiliyor ve `+1` patlıyor (oyundaki puan kuralı).
  Solda dev numara ve oyun içi mod adı (`x.g1`–`x.g6`), sağda karelere
  atlayan noktalar. Dar ekranda sol hücre cilt sırtı gibi dikey okunuyor.
  Telefon sade ama ana siteyle akraba: sert kırmızı gölge, sarı bant, iki
  karikatür X/O. Kodu `xoxd.js` sonu (GALERİ) ve CSS `.xg*`/`.xs-*`.
  Kareler `Documents/xoxd-magaza/ekran_*_tr.png` (1080×1920) →
  `gorseller/xoxd-<ad>.webp` (900×1600); fotoğrafı değiştirmek için aynı
  adla üzerine yaz (tek, harita, kalp, kaos, ayna, buyuk). Hamle sırası ve
  hangi hücrenin hangi karede dolduğu HTML'deki `data-adim` ile belirli.
- **XOXD sayfası oyunun kendi dilinde:** üst bar ve alt bilgi siteninki,
  "Tüm oyunlar" ve "Çıkınca haber ver" sitenin çizgi roman parçaları
  (XOXD'nin kırmızısıyla); gerisi sade — `#0b0b0b` zemin, Space Grotesk, düz beyaz X/O, tek vurgu
  `#d9262a` (oyundaki renkler). Çizgi roman efekti ve gren yok; demo
  tahtada tamamlanan dizilerin üstünden oyundaki gibi kırmızı çizgi geçiyor.
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

## Survive in Turkey sayfası

Sayfaya özel stil `oyunlar/survive-in-turkey.css` (tasarim.css'e girmez), davranış `oyunlar/survive-in-turkey.js`.
Sayfa "yukarı çıkış" fikriyle kurulu: kaldırım (0 ₺) → mahalle → basamaklar → saray (altın). Oyunun harita ve
arayüz görselleri taslak olduğu için kullanılmadı; harita bize ait, sitenin dilinde çizildi.

- **Kaldırım:** adama (ya da "Yalvar" düğmesine) dokununca eğilir, gökten bozuk para düşüp kutuya girer, +1 ₺.
  Eşikler oyunun fiyatları: 20 simit, 100 bir dönem dilencilik, 200 kebap, 1000; "Doktor olmaya kalan" çubuğu.
  Sayaç tarayıcıda `localStorage` ("sit-cep") ile hatırlanır.
- **Mahalle haritası:** `gorseller/survive/harita.svg` (1300×1000 birim, düz SVG; elle düzenlenebilir). Sürüklenir;
  pin ya da çipe basınca piksel adam yürür, yerin kartı açılır (yakın plan = aynı harita, köşede oyundan bir çıkartma).
  Yerler/pin koordinatları `YERLER` dizisinde (JS), metinler `sit.y.<id>.n/.d`.
- **Basamaklar:** 6 kıyafet = 6 meslek (Dilenci, Market, Doktor, CEO, Hacker, Cumhurbaşkanı). Sicil kartındaki
  kazanç/açlık/uyku/gerekenler oyunun `src/denge.gd` tablosundan (kazanç ×100 ölçekli, dönem başına).
- **Alt bar:** oyunun döngüsünün küçük hâli; her hareket 3 gün, açlık/uyku 0 olunca sağlık düşer, sağlık 0 → R.I.P.
  Hacker'da %20 yakalanma riski ve 3 kat ceza oyundaki gibi.
- Kıyafet görselleri değişirse `gorseller/survive/kiyafet-*.webp` üzerine aynı adla yazmak yeterli.
- Metinler `sit.*` anahtarları (10 dil); JS'in okuduğu anahtarlar metin üretici betikte `kullanilan` kümesine eklenmeli.

XOXD galerisi artık kaydırmayla ilerlemiyor: kareler telefona dokununca, noktalarla, yatay kaydırmayla ya da
ok tuşlarıyla değişiyor (sayfa normal akıyor).
