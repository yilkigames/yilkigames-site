# yilkigames.com

Yılkı Games'in tanıtım sitesi ve Google Play'in istediği yasal sayfalar.
Statik HTML — derleme adımı ve dış bağımlılık yok (yazı tipleri de
`fontlar/` içinde, Google'a istek gitmiyor). Dosyaları olduğu gibi sunmak
yeterli.

```
index.html             ana sayfa — çizgi roman kapağı, oyunlar, atölye kuralları
oyunlar/inklash.html   Inklash tanıtım sayfası (yakında) — galeri, kadro, modlar
oyunlar/xoxd.html      XOXD sayfası + oynanabilir tahta (xoxd.js)
destek.html            destek / SSS / hesap silme — 10 dilli
gizlilik.html          gizlilik politikası (TR) — Play'e verilecek URL
privacy.html           gizlilik politikası (EN)
kullanim-sartlari.html / terms.html          kullanım şartları
sifre-sifirla.html / reset-password.html    Supabase şifre sıfırlama
support.html           /destek.html'e yönlendirme
metin.js               on dilin tüm metinleri
arayuz.js              dil seçici, beliren paneller, üst bar, hero ses efektleri
tasarim.css            tasarım sistemi — her sayfa bunu kullanıyor
belge.css              uzun metin sayfalarına (gizlilik, şartlar, destek) ek
fontlar/               Bangers (başlık) + Bricolage Grotesque (gövde), woff2
gorseller/inklash/     oyundan ekran görüntüleri ve dekupe karakterler (webp)
CNAME                  GitHub Pages'in özel alan adı için okuduğu dosya
robots.txt / sitemap.xml
```

## Tasarım dili (2026-10): çizgi roman

Eski doğa/yılkı atı teması bırakıldı. Kimlik artık stüdyonun oyunlarından
geliyor: Inklash'ın kalın mürekkep hatları, sarı bant afişleri ve kırmızı
kalem çizgisi, XOXD'nin siyah-kırmızısı. Site bir çizgi roman sayfası gibi:

- **Renkler** `tasarim.css` başındaki `:root`'ta: kâğıt `#fff5dc`, mürekkep
  `#121212`, sarı `#ffd638`, kırmızı `#e0332b`, mavi `#2f6bff`.
- **Parçalar:** `.bant-baslik` (dönük sarı şerit + kırmızı kalem çizgisi),
  `.balon` (konuşma balonu), `.patlama` (yıldız patlama, `--boy` ile
  boyutlanır; uzun yazıda `.uzun` ekle), `.etiket` (anlatıcı kutusu),
  `.kart` (panel), `.raster` (baskı noktası dokusu), `.dugme` (+ `.sari`,
  `.beyaz`).
- **Hero'ya dokununca** "PAT!", "GÜM!" gibi ses efektleri patlıyor
  (`arayuz.js` sonundaki blok). Hareket azaltmayı seçenlerde kapalı.
- **Inklash sayfası** zemini kareli defter kâğıdına çeviriyor (sayfanın
  kendi `<style>` bloğu); oyunun ana menüsüyle aynı dil.
- Eski adlı renk değişkenleri (`--yesil`, `--ak`, `--kart`...) şifre
  sayfalarının satır içi stilleri için takma ad olarak duruyor.
- Favicon'lar ve `gorseller/logo-kare.png` hâlâ eski yeşil at; yeni logo
  çizilince aynı adlarla değiştirmek yeterli. Üst bardaki "YG" patlama
  işareti her sayfada satır içi SVG.

**Görsel ekleme:** oyundan yeni ekran görüntüsü koyarken iki boy üret:
1280 px (`ad.webp`) ve 720 px (`ad-k.webp`), webp kalite ~78. Galerideki
`data-buyuk` büyük olanı, `<img>` küçüğü gösteriyor.

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
- [ ] XOXD sayfasındaki "Google Play'de indir" düğmesi
      `play.google.com/store/apps/details?id=com.yilkigames.xoxd`'e gidiyor;
      uygulama üretime çıkana kadar bu sayfa test kullanıcısı olmayanlara
      açılmaz
- [ ] Yeni logo çizilirse favicon'ları ve `logo-kare.png`'yi değiştir
