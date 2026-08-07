# yilkigames.com

Yılkı Games'in tanıtım sitesi ve Google Play'in istediği yasal sayfalar.
Statik HTML — derleme adımı ve dış bağımlılık yok. Dosyaları olduğu gibi
sunmak yeterli.

```
index.html      ana sayfa (oyunlar + stüdyo + iletişim) — 10 dilli
destek.html     destek / SSS / hesap silme — 10 dilli
i18n.js         on dilin tüm metinleri + dil seçme mantığı
gizlilik.html   gizlilik politikası (TR) — Play'e verilecek URL
privacy.html    gizlilik politikası (EN)
style.css       tek stil dosyası, hepsi bunu kullanıyor
CNAME           GitHub Pages'in özel alan adı için okuduğu dosya
robots.txt / sitemap.xml
```

## Diller

Site oyunla aynı on dili konuşuyor: **tr en es de fr it pt ru zh ja**.

Dil şu sırayla belirlenir: `?lang=de` gibi bir adres parametresi → daha önce
seçilmiş dil (`localStorage`) → tarayıcının dili → İngilizce. Seçim üst
bardaki listeden değiştirilir ve hatırlanır.

**Yeni metin eklerken:** HTML'e `data-i18n="anahtar"` koy (içinde etiket
geçiyorsa `data-i18n-html`), sonra `i18n.js` içindeki on sözlüğe de karşılığını
yaz. Bir dilde anahtar eksikse orada İngilizcesi görünür, sayfa bozulmaz.
Sayfaya özel başlık/açıklama için `<body data-title="..." data-desc="...">`.

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
Ayrı bir destek adresi açarsan `i18n.js`, `gizlilik.html`, `privacy.html` ve
`index.html` içinde toplu değiştir.

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
- [ ] Inklash yayına yaklaşınca ana sayfadaki rozetini güncelle
