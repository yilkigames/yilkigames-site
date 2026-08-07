/* Yılkı Games — çok dilli metin katmanı.
   Diller oyunla birebir aynı: tr en es de fr it pt ru zh ja
   Yeni metin eklerken: HTML'e data-i18n="anahtar" koy, buraya on karşılığını yaz.
   İçinde etiket geçen metinler data-i18n-html ile yazılır. */

const DILLER = {
  tr: "Türkçe",
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
};

const VARSAYILAN = "en";

const METIN = {
  tr: {
    "meta.title": "Yılkı Games — Bağımsız mobil oyun stüdyosu",
    "meta.desc":
      "Yılkı Games, Türkiye merkezli bağımsız bir mobil oyun stüdyosudur. Öğrenmesi bir dakika, ustalaşması aylar süren oyunlar yapıyoruz.",
    "nav.games": "Oyunlar",
    "nav.studio": "Stüdyo",
    "nav.contact": "İletişim",
    "nav.privacy": "Gizlilik",
    "nav.support": "Destek",
    "hero.title": "Küçük kurallar,<br />derin <em>oyunlar</em>.",
    "hero.sub":
      "Türkiye merkezli bağımsız bir mobil oyun stüdyosuyuz. Öğrenmesi bir dakika, ustalaşması aylar süren oyunlar yapıyoruz.",
    "hero.eyebrow": "Bağımsız oyun stüdyosu",
    "demo.hint":
      "Hücrelere dokun. Kurduğun her X-O-X dizisi puan getirir — XOXD'nin tek kuralı bu.",
    "demo.score": "Puan",
    "demo.reset": "Temizle",
    "games.label": "Oyunlar",
    "xoxd.badge": "Yakında",
    "xoxd.desc":
      "Tanıdık bir tahta, tanımadığınız bir kural. Her turda X ya da O koyarsınız; puanı X-O-X dizileri getirir. Çevrimiçi eşleşme, sıralı maçlar, kaos modu ve yirmi seviyelik meydan okuma.",
    "inklash.badge": "Yapım aşamasında",
    "inklash.desc":
      "Hızlı tempolu iki boyutlu dövüş. Tek bakışta okunabilen, ustalaşması zaman isteyen bir savaş sistemi üzerine kurulu.",
    "studio.label": "Stüdyo",
    "studio.body":
      "Küçük bir ekibiz ve tek bir şeye inanıyoruz: iyi bir oyunun kuralları tek cümleyle anlatılabilmeli, ama ustalaşması aylar sürmeli. Oyunlarımızı on dilde yayınlıyoruz, çünkü iyi bir kural her dilde aynı işler.",
    "contact.label": "İletişim",
    "contact.body": "Destek, hata bildirimi ve iş birliği için:",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Dil",
    "sup.meta.title": "Destek — Yılkı Games",
    "sup.meta.desc":
      "Yılkı Games oyunları için destek, hata bildirimi, hesap silme ve sık sorulan sorular.",
    "sup.title": "Destek",
    "sup.sub": "Sorularınızı yanıtlıyoruz — genellikle iki iş günü içinde.",
    "sup.boxBody":
      "Bir hata bildiriyorsanız kullanıcı adınızı, telefon modelinizi ve sorunun hangi ekranda çıktığını yazın. Varsa ekran görüntüsü ekleyin — çok daha hızlı çözeriz.",
    "faq.label": "Sık sorulan sorular",
    "faq.q1": "Hesabımı nasıl silerim?",
    "faq.a1":
      "Hesabınıza kayıtlı e-posta adresinden <a href=\"mailto:info@yilkigames.com?subject=Hesap%20silme%20talebi\">info@yilkigames.com</a> adresine “Hesap silme talebi” konulu bir e-posta gönderin. Talebi otuz gün içinde tamamlar ve size dönüş yaparız. Hangi verilerin silindiğini <a href=\"/gizlilik.html#hesap-silme\">gizlilik politikasında</a> ayrıntılı yazdık.",
    "faq.q2": "Şifremi unuttum.",
    "faq.a2":
      "Giriş ekranındaki şifre sıfırlama bağlantısını kullanın. E-posta gelmediyse spam klasörünüze bakın; yine yoksa bize yazın.",
    "faq.q3": "Premium aldım ama reklamlar hâlâ çıkıyor.",
    "faq.a3":
      "Üyeliğiniz hesabınıza bağlıdır, cihaza değil. Doğru hesapla giriş yaptığınızdan emin olun ve uygulamayı kapatıp yeniden açın. Sorun sürerse Google Play satın alma numaranızla birlikte bize yazın.",
    "faq.q4": "Bir oyuncuyu nasıl şikâyet ederim?",
    "faq.a4":
      "Maç geçmişinden veya arkadaş listesinden oyuncunun profilini açın, şikâyet butonuna dokunun ve bir sebep seçin. Şikâyetleri elle inceliyoruz.",
    "faq.q5": "İlerlemem kayboldu.",
    "faq.a5":
      "Puanınız, rütbeniz ve kozmetikleriniz sunucuda tutulur; aynı hesapla giriş yaptığınızda geri gelir. Meydan okuma modundaki seviye ilerlemesi ise yalnızca cihazda saklanır ve uygulamayı sildiğinizde kaybolur.",
    "faq.q6": "Oyun “bağlantı yok” diyor.",
    "faq.a6":
      "İnternet bağlantınızı kontrol edip yeniden deneyin. Bağlantı olmadan da çevrimdışı modda tek oyunculu oyun ve meydan okuma açıktır.",
    "legal.notice":
      "Bu belge Türkçe ve İngilizce olarak yayımlanır. Diğer dillerdeki oyuncularımız için geçerli sürüm İngilizcesidir.",
  },

  en: {
    "meta.title": "Yılkı Games — Independent mobile game studio",
    "meta.desc":
      "Yılkı Games is an independent mobile game studio based in Türkiye. We make games that take a minute to learn and months to master.",
    "nav.games": "Games",
    "nav.studio": "Studio",
    "nav.contact": "Contact",
    "nav.privacy": "Privacy",
    "nav.support": "Support",
    "hero.title": "Small rules,<br />deep <em>games</em>.",
    "hero.sub":
      "We are an independent mobile game studio based in Türkiye. We make games that take a minute to learn and months to master.",
    "hero.eyebrow": "Independent game studio",
    "demo.hint":
      "Tap the cells. Every X-O-X line you make scores a point — that is XOXD's only rule.",
    "demo.score": "Points",
    "demo.reset": "Clear",
    "games.label": "Games",
    "xoxd.badge": "Coming soon",
    "xoxd.desc":
      "A familiar board, a rule you have not played before. Each turn you place either an X or an O; points come from completing X-O-X lines. Online matchmaking, ranked play, a chaos mode and a twenty-level challenge.",
    "inklash.badge": "In development",
    "inklash.desc":
      "Fast-paced 2D combat, built on a fighting system you can read at a glance but takes time to master.",
    "studio.label": "Studio",
    "studio.body":
      "We are a small team with one conviction: a good game should be explainable in a single sentence, yet take months to master. We ship in ten languages, because a good rule works the same in all of them.",
    "contact.label": "Contact",
    "contact.body": "For support, bug reports and partnerships:",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Language",
    "sup.title": "Support",
    "sup.meta.title": "Support — Yılkı Games",
    "sup.meta.desc":
      "Support, bug reports, account deletion and frequently asked questions for Yılkı Games.",
    "sup.sub": "We answer your questions, usually within two working days.",
    "sup.boxBody":
      "If you are reporting a bug, tell us your username, your phone model and which screen the problem appears on. Attach a screenshot if you have one — it makes the fix much faster.",
    "faq.label": "Frequently asked questions",
    "faq.q1": "How do I delete my account?",
    "faq.a1":
      "Send an email titled “Account deletion request” to <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> from the address registered to your account. We complete requests within thirty days and confirm by email. The <a href=\"/privacy.html#account-deletion\">privacy policy</a> lists exactly what gets erased.",
    "faq.q2": "I forgot my password.",
    "faq.a2":
      "Use the password reset link on the sign-in screen. If the email does not arrive, check your spam folder; if it is still missing, write to us.",
    "faq.q3": "I bought premium but I still see ads.",
    "faq.a3":
      "Your membership is tied to your account, not your device. Make sure you are signed in with the right account, then close and reopen the app. If it persists, write to us with your Google Play order number.",
    "faq.q4": "How do I report a player?",
    "faq.a4":
      "Open the player's profile from your match history or friend list, tap the report button and choose a reason. We review reports by hand.",
    "faq.q5": "My progress is gone.",
    "faq.a5":
      "Your points, rank and cosmetics live on the server and come back when you sign in with the same account. Challenge-mode level progress is stored only on your device and is lost if you uninstall the game.",
    "faq.q6": "The game says there is no connection.",
    "faq.a6":
      "Check your internet connection and try again. Even offline, single-player and challenge mode remain available.",
    "legal.notice":
      "This document is published in Turkish and English. For players in other languages, the English version is the one that applies.",
  },

  es: {
    "meta.title": "Yılkı Games — Estudio independiente de juegos móviles",
    "meta.desc":
      "Yılkı Games es un estudio independiente de juegos móviles con sede en Türkiye. Creamos juegos que se aprenden en un minuto y se dominan en meses.",
    "nav.games": "Juegos",
    "nav.studio": "Estudio",
    "nav.contact": "Contacto",
    "nav.privacy": "Privacidad",
    "nav.support": "Soporte",
    "hero.title": "Reglas simples,<br /><em>juegos</em> profundos.",
    "hero.sub":
      "Somos un estudio independiente de juegos móviles con sede en Türkiye. Creamos juegos que se aprenden en un minuto y se dominan en meses.",
    "hero.eyebrow": "Estudio independiente",
    "demo.hint":
      "Toca las casillas. Cada línea X-O-X suma un punto: esa es la única regla de XOXD.",
    "demo.score": "Puntos",
    "demo.reset": "Limpiar",
    "games.label": "Juegos",
    "xoxd.badge": "Próximamente",
    "xoxd.desc":
      "Un tablero conocido con una regla que no has jugado antes. En cada turno colocas una X o una O; los puntos llegan al completar líneas X-O-X. Partidas en línea, modo clasificatorio, modo caos y un desafío de veinte niveles.",
    "inklash.badge": "En desarrollo",
    "inklash.desc":
      "Combate 2D de ritmo rápido, con un sistema que se entiende de un vistazo pero exige tiempo para dominarse.",
    "studio.label": "Estudio",
    "studio.body":
      "Somos un equipo pequeño con una sola convicción: un buen juego debe explicarse en una frase, pero tardar meses en dominarse. Publicamos en diez idiomas, porque una buena regla funciona igual en todos.",
    "contact.label": "Contacto",
    "contact.body": "Para soporte, informes de errores y colaboraciones:",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Idioma",
    "sup.meta.title": "Soporte — Yılkı Games",
    "sup.meta.desc":
      "Soporte, informes de errores, eliminación de cuenta y preguntas frecuentes de Yılkı Games.",
    "sup.title": "Soporte",
    "sup.sub":
      "Respondemos tus preguntas, normalmente en dos días laborables.",
    "sup.boxBody":
      "Si informas de un error, indícanos tu nombre de usuario, el modelo de tu teléfono y en qué pantalla aparece el problema. Adjunta una captura si la tienes: acelera mucho la solución.",
    "faq.label": "Preguntas frecuentes",
    "faq.q1": "¿Cómo elimino mi cuenta?",
    "faq.a1":
      "Envía un correo con el asunto “Solicitud de eliminación de cuenta” a <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> desde la dirección registrada en tu cuenta. Completamos las solicitudes en treinta días y te confirmamos por correo. La <a href=\"/privacy.html#account-deletion\">política de privacidad</a> detalla qué se borra.",
    "faq.q2": "He olvidado mi contraseña.",
    "faq.a2":
      "Usa el enlace de restablecimiento en la pantalla de inicio de sesión. Si el correo no llega, revisa la carpeta de spam; si sigue sin aparecer, escríbenos.",
    "faq.q3": "Compré premium pero sigo viendo anuncios.",
    "faq.a3":
      "Tu suscripción está vinculada a tu cuenta, no al dispositivo. Comprueba que has iniciado sesión con la cuenta correcta y reinicia la aplicación. Si continúa, escríbenos con tu número de pedido de Google Play.",
    "faq.q4": "¿Cómo denuncio a un jugador?",
    "faq.a4":
      "Abre el perfil del jugador desde tu historial de partidas o tu lista de amigos, pulsa el botón de denuncia y elige un motivo. Revisamos las denuncias manualmente.",
    "faq.q5": "He perdido mi progreso.",
    "faq.a5":
      "Tus puntos, tu rango y tus cosméticos se guardan en el servidor y vuelven al iniciar sesión con la misma cuenta. El progreso del modo desafío se guarda solo en tu dispositivo y se pierde si desinstalas el juego.",
    "faq.q6": "El juego dice que no hay conexión.",
    "faq.a6":
      "Comprueba tu conexión a internet e inténtalo de nuevo. Incluso sin conexión, el modo de un jugador y el modo desafío siguen disponibles.",
    "legal.notice":
      "Este documento se publica en turco e inglés. Para los jugadores de otros idiomas, la versión aplicable es la inglesa.",
  },

  de: {
    "meta.title": "Yılkı Games — Unabhängiges Mobile-Games-Studio",
    "meta.desc":
      "Yılkı Games ist ein unabhängiges Mobile-Games-Studio aus der Türkei. Wir machen Spiele, die man in einer Minute lernt und in Monaten meistert.",
    "nav.games": "Spiele",
    "nav.studio": "Studio",
    "nav.contact": "Kontakt",
    "nav.privacy": "Datenschutz",
    "nav.support": "Support",
    "hero.title": "Kleine Regeln,<br />tiefe <em>Spiele</em>.",
    "hero.sub":
      "Wir sind ein unabhängiges Mobile-Games-Studio aus der Türkei. Wir machen Spiele, die man in einer Minute lernt und in Monaten meistert.",
    "hero.eyebrow": "Unabhängiges Spielestudio",
    "demo.hint":
      "Tippen Sie auf die Felder. Jede X-O-X-Reihe bringt einen Punkt — das ist die einzige Regel von XOXD.",
    "demo.score": "Punkte",
    "demo.reset": "Leeren",
    "games.label": "Spiele",
    "xoxd.badge": "Demnächst",
    "xoxd.desc":
      "Ein vertrautes Spielfeld mit einer Regel, die Sie so noch nicht gespielt haben. Pro Zug setzen Sie ein X oder ein O; Punkte gibt es für vollständige X-O-X-Reihen. Online-Matchmaking, Ranglistenspiele, ein Chaos-Modus und eine Herausforderung über zwanzig Stufen.",
    "inklash.badge": "In Entwicklung",
    "inklash.desc":
      "Schnelle 2D-Kämpfe mit einem System, das man auf den ersten Blick versteht, aber erst nach einiger Zeit beherrscht.",
    "studio.label": "Studio",
    "studio.body":
      "Wir sind ein kleines Team mit einer Überzeugung: Ein gutes Spiel lässt sich in einem Satz erklären, braucht aber Monate zum Meistern. Wir veröffentlichen in zehn Sprachen, denn eine gute Regel funktioniert in allen gleich.",
    "contact.label": "Kontakt",
    "contact.body": "Für Support, Fehlermeldungen und Kooperationen:",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Sprache",
    "sup.title": "Support",
    "sup.sub":
      "Wir beantworten Ihre Fragen, in der Regel innerhalb von zwei Werktagen.",
    "sup.meta.title": "Support — Yılkı Games",
    "sup.meta.desc":
      "Support, Fehlermeldungen, Kontolöschung und häufige Fragen zu Yılkı Games.",
    "sup.boxBody":
      "Wenn Sie einen Fehler melden, nennen Sie uns bitte Ihren Benutzernamen, Ihr Telefonmodell und den Bildschirm, auf dem das Problem auftritt. Ein Screenshot beschleunigt die Lösung erheblich.",
    "faq.label": "Häufige Fragen",
    "faq.q1": "Wie lösche ich mein Konto?",
    "faq.a1":
      "Senden Sie von der bei Ihrem Konto registrierten Adresse eine E-Mail mit dem Betreff „Account deletion request“ an <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a>. Wir bearbeiten Anfragen innerhalb von dreißig Tagen und bestätigen per E-Mail. Was genau gelöscht wird, steht in der <a href=\"/privacy.html#account-deletion\">Datenschutzerklärung</a>.",
    "faq.q2": "Ich habe mein Passwort vergessen.",
    "faq.a2":
      "Nutzen Sie den Link zum Zurücksetzen auf dem Anmeldebildschirm. Kommt die E-Mail nicht an, prüfen Sie den Spam-Ordner; fehlt sie weiterhin, schreiben Sie uns.",
    "faq.q3": "Ich habe Premium gekauft, sehe aber weiterhin Werbung.",
    "faq.a3":
      "Ihre Mitgliedschaft ist an Ihr Konto gebunden, nicht an das Gerät. Prüfen Sie, ob Sie mit dem richtigen Konto angemeldet sind, und starten Sie die App neu. Besteht das Problem weiter, schreiben Sie uns mit Ihrer Google-Play-Bestellnummer.",
    "faq.q4": "Wie melde ich einen Spieler?",
    "faq.a4":
      "Öffnen Sie das Profil des Spielers über den Spielverlauf oder Ihre Freundesliste, tippen Sie auf die Meldefunktion und wählen Sie einen Grund. Wir prüfen Meldungen von Hand.",
    "faq.q5": "Mein Fortschritt ist weg.",
    "faq.a5":
      "Punkte, Rang und Kosmetik liegen auf dem Server und kehren zurück, sobald Sie sich mit demselben Konto anmelden. Der Fortschritt im Herausforderungsmodus liegt nur auf Ihrem Gerät und geht bei einer Deinstallation verloren.",
    "faq.q6": "Das Spiel meldet „keine Verbindung“.",
    "faq.a6":
      "Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut. Auch offline bleiben der Einzelspieler- und der Herausforderungsmodus verfügbar.",
    "legal.notice":
      "Dieses Dokument erscheint auf Türkisch und Englisch. Für Spielerinnen und Spieler anderer Sprachen gilt die englische Fassung.",
  },

  fr: {
    "meta.title": "Yılkı Games — Studio indépendant de jeux mobiles",
    "meta.desc":
      "Yılkı Games est un studio indépendant de jeux mobiles basé en Turquie. Nous créons des jeux qui s’apprennent en une minute et se maîtrisent en plusieurs mois.",
    "nav.games": "Jeux",
    "nav.studio": "Studio",
    "nav.contact": "Contact",
    "nav.privacy": "Confidentialité",
    "nav.support": "Assistance",
    "hero.title": "Des règles simples,<br />des <em>jeux</em> profonds.",
    "hero.sub":
      "Nous sommes un studio indépendant de jeux mobiles basé en Turquie. Nous créons des jeux qui s’apprennent en une minute et se maîtrisent en plusieurs mois.",
    "hero.eyebrow": "Studio indépendant",
    "demo.hint":
      "Touchez les cases. Chaque alignement X-O-X rapporte un point : c’est la seule règle de XOXD.",
    "demo.score": "Points",
    "demo.reset": "Effacer",
    "games.label": "Jeux",
    "xoxd.badge": "Bientôt",
    "xoxd.desc":
      "Un plateau familier, une règle inédite. À chaque tour, vous placez un X ou un O ; les points viennent des alignements X-O-X. Matchmaking en ligne, parties classées, mode chaos et un défi de vingt niveaux.",
    "inklash.badge": "En développement",
    "inklash.desc":
      "Combat 2D nerveux, bâti sur un système qui se lit d’un coup d’œil mais demande du temps pour être maîtrisé.",
    "studio.label": "Studio",
    "studio.body":
      "Nous sommes une petite équipe avec une seule conviction : un bon jeu doit s’expliquer en une phrase, mais demander des mois pour être maîtrisé. Nous publions en dix langues, parce qu’une bonne règle fonctionne pareil dans toutes.",
    "contact.label": "Contact",
    "contact.body": "Pour l’assistance, les rapports de bugs et les partenariats :",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Langue",
    "sup.meta.title": "Assistance — Yılkı Games",
    "sup.meta.desc":
      "Assistance, rapports de bugs, suppression de compte et questions fréquentes pour Yılkı Games.",
    "sup.title": "Assistance",
    "sup.sub":
      "Nous répondons à vos questions, généralement sous deux jours ouvrés.",
    "sup.boxBody":
      "Si vous signalez un bug, indiquez votre nom d’utilisateur, le modèle de votre téléphone et l’écran où le problème apparaît. Joignez une capture d’écran si vous en avez une : la résolution sera bien plus rapide.",
    "faq.label": "Questions fréquentes",
    "faq.q1": "Comment supprimer mon compte ?",
    "faq.a1":
      "Envoyez un e-mail intitulé « Account deletion request » à <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> depuis l’adresse enregistrée sur votre compte. Nous traitons les demandes sous trente jours et confirmons par e-mail. La <a href=\"/privacy.html#account-deletion\">politique de confidentialité</a> détaille ce qui est effacé.",
    "faq.q2": "J’ai oublié mon mot de passe.",
    "faq.a2":
      "Utilisez le lien de réinitialisation sur l’écran de connexion. Si l’e-mail n’arrive pas, vérifiez vos courriers indésirables ; s’il reste introuvable, écrivez-nous.",
    "faq.q3": "J’ai acheté le premium mais je vois encore des publicités.",
    "faq.a3":
      "Votre abonnement est lié à votre compte, pas à votre appareil. Vérifiez que vous êtes connecté avec le bon compte, puis relancez l’application. Si le problème persiste, écrivez-nous avec votre numéro de commande Google Play.",
    "faq.q4": "Comment signaler un joueur ?",
    "faq.a4":
      "Ouvrez le profil du joueur depuis l’historique des parties ou votre liste d’amis, appuyez sur le bouton de signalement et choisissez un motif. Nous examinons les signalements à la main.",
    "faq.q5": "J’ai perdu ma progression.",
    "faq.a5":
      "Vos points, votre rang et vos cosmétiques sont conservés sur le serveur et reviennent dès que vous vous connectez avec le même compte. La progression du mode défi est stockée uniquement sur votre appareil et disparaît si vous désinstallez le jeu.",
    "faq.q6": "Le jeu indique « pas de connexion ».",
    "faq.a6":
      "Vérifiez votre connexion internet puis réessayez. Même hors ligne, le mode solo et le mode défi restent accessibles.",
    "legal.notice":
      "Ce document est publié en turc et en anglais. Pour les joueurs des autres langues, la version anglaise fait foi.",
  },

  it: {
    "meta.title": "Yılkı Games — Studio indipendente di giochi mobili",
    "meta.desc":
      "Yılkı Games è uno studio indipendente di giochi mobili con sede in Turchia. Creiamo giochi che si imparano in un minuto e si padroneggiano in mesi.",
    "nav.games": "Giochi",
    "nav.studio": "Studio",
    "nav.contact": "Contatti",
    "nav.privacy": "Privacy",
    "nav.support": "Assistenza",
    "hero.title": "Regole semplici,<br /><em>giochi</em> profondi.",
    "hero.sub":
      "Siamo uno studio indipendente di giochi mobili con sede in Turchia. Creiamo giochi che si imparano in un minuto e si padroneggiano in mesi.",
    "hero.eyebrow": "Studio indipendente",
    "demo.hint":
      "Tocca le caselle. Ogni sequenza X-O-X vale un punto: è l’unica regola di XOXD.",
    "demo.score": "Punti",
    "demo.reset": "Pulisci",
    "games.label": "Giochi",
    "xoxd.badge": "In arrivo",
    "xoxd.desc":
      "Una griglia familiare con una regola che non hai mai giocato. A ogni turno metti una X o una O; i punti arrivano completando sequenze X-O-X. Matchmaking online, partite classificate, modalità caos e una sfida da venti livelli.",
    "inklash.badge": "In sviluppo",
    "inklash.desc":
      "Combattimento 2D dal ritmo serrato, costruito su un sistema che si legge a colpo d’occhio ma richiede tempo per essere padroneggiato.",
    "studio.label": "Studio",
    "studio.body":
      "Siamo una squadra piccola con una sola convinzione: un buon gioco deve spiegarsi in una frase, ma richiedere mesi per essere padroneggiato. Pubblichiamo in dieci lingue, perché una buona regola funziona uguale in tutte.",
    "contact.label": "Contatti",
    "contact.body": "Per assistenza, segnalazioni e collaborazioni:",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Lingua",
    "sup.meta.title": "Assistenza — Yılkı Games",
    "sup.meta.desc":
      "Assistenza, segnalazioni, eliminazione dell’account e domande frequenti su Yılkı Games.",
    "sup.title": "Assistenza",
    "sup.sub":
      "Rispondiamo alle tue domande, di solito entro due giorni lavorativi.",
    "sup.boxBody":
      "Se segnali un problema, indicaci il tuo nome utente, il modello del telefono e la schermata in cui si presenta. Allega uno screenshot se ce l’hai: la soluzione arriva molto più in fretta.",
    "faq.label": "Domande frequenti",
    "faq.q1": "Come elimino il mio account?",
    "faq.a1":
      "Invia un’email con oggetto “Account deletion request” a <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> dall’indirizzo registrato sul tuo account. Completiamo le richieste entro trenta giorni e confermiamo via email. L’<a href=\"/privacy.html#account-deletion\">informativa privacy</a> elenca esattamente cosa viene cancellato.",
    "faq.q2": "Ho dimenticato la password.",
    "faq.a2":
      "Usa il link di reimpostazione nella schermata di accesso. Se l’email non arriva, controlla la posta indesiderata; se non c’è nemmeno lì, scrivici.",
    "faq.q3": "Ho comprato premium ma vedo ancora la pubblicità.",
    "faq.a3":
      "L’abbonamento è legato all’account, non al dispositivo. Verifica di aver effettuato l’accesso con l’account giusto e riavvia l’app. Se il problema persiste, scrivici indicando il numero d’ordine di Google Play.",
    "faq.q4": "Come segnalo un giocatore?",
    "faq.a4":
      "Apri il profilo del giocatore dalla cronologia delle partite o dalla lista amici, tocca il pulsante di segnalazione e scegli un motivo. Esaminiamo le segnalazioni a mano.",
    "faq.q5": "Ho perso i miei progressi.",
    "faq.a5":
      "Punti, grado e oggetti estetici sono salvati sul server e tornano quando accedi con lo stesso account. I progressi della modalità sfida restano solo sul dispositivo e si perdono disinstallando il gioco.",
    "faq.q6": "Il gioco dice che non c’è connessione.",
    "faq.a6":
      "Controlla la connessione a internet e riprova. Anche offline restano disponibili la modalità a giocatore singolo e la modalità sfida.",
    "legal.notice":
      "Questo documento è pubblicato in turco e inglese. Per i giocatori di altre lingue fa fede la versione inglese.",
  },

  pt: {
    "meta.title": "Yılkı Games — Estúdio independente de jogos móveis",
    "meta.desc":
      "A Yılkı Games é um estúdio independente de jogos móveis sediado na Turquia. Criamos jogos que se aprendem num minuto e se dominam em meses.",
    "nav.games": "Jogos",
    "nav.studio": "Estúdio",
    "nav.contact": "Contacto",
    "nav.privacy": "Privacidade",
    "nav.support": "Suporte",
    "hero.title": "Regras simples,<br /><em>jogos</em> profundos.",
    "hero.sub":
      "Somos um estúdio independente de jogos móveis sediado na Turquia. Criamos jogos que se aprendem num minuto e se dominam em meses.",
    "hero.eyebrow": "Estúdio independente",
    "demo.hint":
      "Toque nas casas. Cada sequência X-O-X vale um ponto — é a única regra do XOXD.",
    "demo.score": "Pontos",
    "demo.reset": "Limpar",
    "games.label": "Jogos",
    "xoxd.badge": "Em breve",
    "xoxd.desc":
      "Um tabuleiro familiar com uma regra que ainda não jogou. Em cada turno coloca um X ou um O; os pontos vêm de completar sequências X-O-X. Emparelhamento online, partidas classificadas, modo caos e um desafio de vinte níveis.",
    "inklash.badge": "Em desenvolvimento",
    "inklash.desc":
      "Combate 2D de ritmo rápido, assente num sistema que se percebe num relance mas exige tempo para dominar.",
    "studio.label": "Estúdio",
    "studio.body":
      "Somos uma equipa pequena com uma só convicção: um bom jogo deve explicar-se numa frase, mas levar meses a dominar. Publicamos em dez línguas, porque uma boa regra funciona igual em todas.",
    "contact.label": "Contacto",
    "contact.body": "Para suporte, relatos de erros e parcerias:",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Idioma",
    "sup.meta.title": "Suporte — Yılkı Games",
    "sup.meta.desc":
      "Suporte, relatos de erros, eliminação de conta e perguntas frequentes da Yılkı Games.",
    "sup.title": "Suporte",
    "sup.sub":
      "Respondemos às suas perguntas, normalmente em dois dias úteis.",
    "sup.boxBody":
      "Se está a comunicar um erro, indique o seu nome de utilizador, o modelo do telemóvel e o ecrã em que o problema aparece. Junte uma captura de ecrã, se tiver — acelera muito a resolução.",
    "faq.label": "Perguntas frequentes",
    "faq.q1": "Como elimino a minha conta?",
    "faq.a1":
      "Envie um email com o assunto “Account deletion request” para <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> a partir do endereço registado na sua conta. Concluímos os pedidos em trinta dias e confirmamos por email. A <a href=\"/privacy.html#account-deletion\">política de privacidade</a> indica exatamente o que é apagado.",
    "faq.q2": "Esqueci-me da palavra-passe.",
    "faq.a2":
      "Use a ligação de reposição no ecrã de início de sessão. Se o email não chegar, verifique a pasta de spam; se continuar em falta, escreva-nos.",
    "faq.q3": "Comprei premium mas continuo a ver anúncios.",
    "faq.a3":
      "A subscrição está ligada à sua conta, não ao dispositivo. Confirme que iniciou sessão com a conta certa e reinicie a aplicação. Se persistir, escreva-nos com o número de encomenda da Google Play.",
    "faq.q4": "Como denuncio um jogador?",
    "faq.a4":
      "Abra o perfil do jogador a partir do histórico de partidas ou da lista de amigos, toque no botão de denúncia e escolha um motivo. Analisamos as denúncias manualmente.",
    "faq.q5": "Perdi o meu progresso.",
    "faq.a5":
      "Os seus pontos, patente e cosméticos ficam no servidor e regressam quando inicia sessão com a mesma conta. O progresso do modo desafio fica apenas no dispositivo e perde-se se desinstalar o jogo.",
    "faq.q6": "O jogo diz que não há ligação.",
    "faq.a6":
      "Verifique a ligação à internet e tente novamente. Mesmo sem ligação, o modo de um jogador e o modo desafio continuam disponíveis.",
    "legal.notice":
      "Este documento é publicado em turco e inglês. Para jogadores de outras línguas, aplica-se a versão inglesa.",
  },

  ru: {
    "meta.title": "Yılkı Games — независимая студия мобильных игр",
    "meta.desc":
      "Yılkı Games — независимая студия мобильных игр из Турции. Мы делаем игры, которые осваиваются за минуту, а совершенствуются месяцами.",
    "nav.games": "Игры",
    "nav.studio": "Студия",
    "nav.contact": "Контакты",
    "nav.privacy": "Конфиденциальность",
    "nav.support": "Поддержка",
    "hero.title": "Простые правила,<br />глубокие <em>игры</em>.",
    "hero.sub":
      "Мы независимая студия мобильных игр из Турции. Мы делаем игры, которые осваиваются за минуту, а совершенствуются месяцами.",
    "hero.eyebrow": "Независимая студия",
    "demo.hint":
      "Нажимайте на клетки. Каждая линия X-O-X даёт очко — это единственное правило XOXD.",
    "demo.score": "Очки",
    "demo.reset": "Очистить",
    "games.label": "Игры",
    "xoxd.badge": "Скоро",
    "xoxd.desc":
      "Знакомое поле и правило, в которое вы ещё не играли. Каждый ход вы ставите X или O; очки приносят завершённые линии X-O-X. Онлайн-подбор соперников, рейтинговые матчи, режим хаоса и испытание из двадцати уровней.",
    "inklash.badge": "В разработке",
    "inklash.desc":
      "Динамичные двумерные поединки. Боевая система читается с первого взгляда, но освоение требует времени.",
    "studio.label": "Студия",
    "studio.body":
      "Мы небольшая команда с одним убеждением: хорошую игру можно объяснить одной фразой, но осваивать её нужно месяцами. Мы выпускаем игры на десяти языках, потому что хорошее правило работает одинаково на любом из них.",
    "contact.label": "Контакты",
    "contact.body": "Поддержка, сообщения об ошибках и сотрудничество:",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "Язык",
    "sup.meta.title": "Поддержка — Yılkı Games",
    "sup.meta.desc":
      "Поддержка, сообщения об ошибках, удаление аккаунта и частые вопросы Yılkı Games.",
    "sup.title": "Поддержка",
    "sup.sub": "Мы отвечаем на вопросы, обычно в течение двух рабочих дней.",
    "sup.boxBody":
      "Если вы сообщаете об ошибке, укажите имя пользователя, модель телефона и экран, на котором возникает проблема. Приложите скриншот, если он есть, — так мы решим вопрос гораздо быстрее.",
    "faq.label": "Частые вопросы",
    "faq.q1": "Как удалить аккаунт?",
    "faq.a1":
      "Отправьте письмо с темой «Account deletion request» на адрес <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> с электронной почты, привязанной к аккаунту. Мы выполняем запросы в течение тридцати дней и подтверждаем по почте. Что именно удаляется, описано в <a href=\"/privacy.html#account-deletion\">политике конфиденциальности</a>.",
    "faq.q2": "Я забыл пароль.",
    "faq.a2":
      "Воспользуйтесь ссылкой для сброса пароля на экране входа. Если письмо не пришло, проверьте папку со спамом; если его там нет, напишите нам.",
    "faq.q3": "Я купил премиум, но реклама всё равно показывается.",
    "faq.a3":
      "Подписка привязана к аккаунту, а не к устройству. Убедитесь, что вы вошли в нужный аккаунт, и перезапустите приложение. Если проблема осталась, напишите нам и укажите номер заказа в Google Play.",
    "faq.q4": "Как пожаловаться на игрока?",
    "faq.a4":
      "Откройте профиль игрока из истории матчей или списка друзей, нажмите кнопку жалобы и выберите причину. Жалобы мы разбираем вручную.",
    "faq.q5": "Мой прогресс пропал.",
    "faq.a5":
      "Очки, ранг и косметика хранятся на сервере и вернутся, когда вы войдёте в тот же аккаунт. Прогресс режима испытаний хранится только на устройстве и теряется при удалении игры.",
    "faq.q6": "Игра пишет, что нет соединения.",
    "faq.a6":
      "Проверьте подключение к интернету и повторите попытку. Даже без сети доступны одиночная игра и режим испытаний.",
    "legal.notice":
      "Этот документ публикуется на турецком и английском языках. Для игроков, говорящих на других языках, действует английская версия.",
  },

  zh: {
    "meta.title": "Yılkı Games — 独立手机游戏工作室",
    "meta.desc":
      "Yılkı Games 是一家位于土耳其的独立手机游戏工作室。我们做的游戏，一分钟就能学会，却要花上几个月才能精通。",
    "nav.games": "游戏",
    "nav.studio": "工作室",
    "nav.contact": "联系我们",
    "nav.privacy": "隐私",
    "nav.support": "支持",
    "hero.title": "规则简单，<br />玩法<em>深邃</em>。",
    "hero.sub":
      "我们是一家位于土耳其的独立手机游戏工作室。我们做的游戏，一分钟就能学会，却要花上几个月才能精通。",
    "hero.eyebrow": "独立游戏工作室",
    "demo.hint":
      "点击格子试试。每连成一条 X-O-X 就得一分 —— 这是 XOXD 唯一的规则。",
    "demo.score": "分",
    "demo.reset": "清空",
    "games.label": "游戏",
    "xoxd.badge": "即将推出",
    "xoxd.desc":
      "熟悉的棋盘，陌生的规则。每回合你可以落 X 或 O；连成 X-O-X 才能得分。支持在线匹配、排位对战、混沌模式，以及二十关的挑战模式。",
    "inklash.badge": "开发中",
    "inklash.desc":
      "节奏明快的 2D 格斗。战斗系统一眼就能看懂，但要精通仍需时间。",
    "studio.label": "工作室",
    "studio.body":
      "我们是一支小团队，只坚持一件事：好游戏应该一句话就能讲清楚，却要花上几个月才能精通。我们以十种语言发行，因为好的规则在每种语言里都同样成立。",
    "contact.label": "联系我们",
    "contact.body": "技术支持、问题反馈与合作洽谈：",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "语言",
    "sup.meta.title": "支持 — Yılkı Games",
    "sup.meta.desc":
      "Yılkı Games 的技术支持、问题反馈、账号删除与常见问题。",
    "sup.title": "支持",
    "sup.sub": "我们会回复您的问题，通常在两个工作日内。",
    "sup.boxBody":
      "反馈问题时，请告诉我们您的用户名、手机型号，以及问题出现在哪个界面。如果有截图请一并附上，这样能快得多。",
    "faq.label": "常见问题",
    "faq.q1": "如何删除我的账号？",
    "faq.a1":
      "请使用账号注册时的邮箱，向 <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> 发送一封主题为「Account deletion request」的邮件。我们会在三十天内处理完毕并回复确认。具体删除哪些数据，请见<a href=\"/privacy.html#account-deletion\">隐私政策</a>。",
    "faq.q2": "我忘记密码了。",
    "faq.a2":
      "请使用登录界面的密码重置链接。如果没有收到邮件，请检查垃圾邮件文件夹；仍然找不到就写信给我们。",
    "faq.q3": "我买了高级会员，但还是有广告。",
    "faq.a3":
      "会员绑定的是账号而非设备。请确认登录的是正确的账号，然后重启应用。若问题依旧，请附上 Google Play 订单号写信给我们。",
    "faq.q4": "如何举报玩家？",
    "faq.a4":
      "在对战记录或好友列表中打开该玩家的资料，点击举报按钮并选择理由。所有举报都由人工审核。",
    "faq.q5": "我的进度不见了。",
    "faq.a5":
      "积分、段位和外观保存在服务器上，用同一账号登录即可恢复。挑战模式的关卡进度只保存在本机，卸载游戏后会丢失。",
    "faq.q6": "游戏提示没有网络连接。",
    "faq.a6":
      "请检查网络连接后重试。即使离线，单人模式和挑战模式仍然可以游玩。",
    "legal.notice":
      "本文件以土耳其语和英语发布。对于使用其他语言的玩家，以英文版本为准。",
  },

  ja: {
    "meta.title": "Yılkı Games — インディーモバイルゲームスタジオ",
    "meta.desc":
      "Yılkı Games はトルコを拠点とするインディーのモバイルゲームスタジオです。覚えるのは一分、極めるのは数か月かかるゲームを作っています。",
    "nav.games": "ゲーム",
    "nav.studio": "スタジオ",
    "nav.contact": "お問い合わせ",
    "nav.privacy": "プライバシー",
    "nav.support": "サポート",
    "hero.title": "ルールは小さく、<br /><em>ゲーム</em>は深く。",
    "hero.sub":
      "トルコを拠点とするインディーのモバイルゲームスタジオです。覚えるのは一分、極めるのは数か月かかるゲームを作っています。",
    "hero.eyebrow": "インディーゲームスタジオ",
    "demo.hint":
      "マスをタップしてみてください。X-O-X が並ぶたびに 1 点 — XOXD のルールはこれだけです。",
    "demo.score": "点",
    "demo.reset": "クリア",
    "games.label": "ゲーム",
    "xoxd.badge": "近日公開",
    "xoxd.desc":
      "見慣れた盤面に、遊んだことのないルール。毎ターン X か O を置き、X-O-X の並びを作ると得点になります。オンラインマッチング、ランク戦、カオスモード、そして二十段階のチャレンジを収録。",
    "inklash.badge": "開発中",
    "inklash.desc":
      "テンポの速い 2D バトル。ひと目で理解できるのに、極めるには時間のかかる戦闘システムです。",
    "studio.label": "スタジオ",
    "studio.body":
      "私たちは小さなチームで、信じていることはひとつだけです。良いゲームは一文で説明できるべきであり、それでいて極めるには数か月かかるべきだ、ということ。十言語で配信しているのは、良いルールはどの言語でも同じように働くからです。",
    "contact.label": "お問い合わせ",
    "contact.body": "サポート、不具合のご報告、協業のご相談はこちらへ：",
    "footer.rights": "© 2026 Yılkı Games",
    "lang.label": "言語",
    "sup.meta.title": "サポート — Yılkı Games",
    "sup.meta.desc":
      "Yılkı Games のサポート、不具合のご報告、アカウント削除、よくある質問。",
    "sup.title": "サポート",
    "sup.sub": "ご質問には通常、二営業日以内にお答えします。",
    "sup.boxBody":
      "不具合をご報告いただく際は、ユーザー名、端末の機種、問題が出る画面をお知らせください。スクリーンショットを添えていただけると解決がずっと早くなります。",
    "faq.label": "よくある質問",
    "faq.q1": "アカウントを削除するには？",
    "faq.a1":
      "アカウントに登録されているメールアドレスから、件名を「Account deletion request」として <a href=\"mailto:info@yilkigames.com?subject=Account%20deletion%20request\">info@yilkigames.com</a> 宛にご連絡ください。三十日以内に対応し、完了をメールでお知らせします。削除される内容は<a href=\"/privacy.html#account-deletion\">プライバシーポリシー</a>に記載しています。",
    "faq.q2": "パスワードを忘れました。",
    "faq.a2":
      "ログイン画面のパスワード再設定リンクをご利用ください。メールが届かない場合は迷惑メールフォルダをご確認のうえ、それでも見つからなければご連絡ください。",
    "faq.q3": "プレミアムを購入したのに広告が表示されます。",
    "faq.a3":
      "プレミアムは端末ではなくアカウントに紐づいています。正しいアカウントでログインしているかご確認のうえ、アプリを再起動してください。解決しない場合は Google Play の注文番号を添えてご連絡ください。",
    "faq.q4": "プレイヤーを通報するには？",
    "faq.a4":
      "対戦履歴またはフレンドリストからそのプレイヤーのプロフィールを開き、通報ボタンを押して理由を選んでください。通報はすべて手作業で確認しています。",
    "faq.q5": "進行状況が消えました。",
    "faq.a5":
      "ポイント、ランク、装飾はサーバーに保存されており、同じアカウントでログインすれば元に戻ります。チャレンジモードの進行状況は端末内にのみ保存され、アンインストールすると失われます。",
    "faq.q6": "「接続がありません」と表示されます。",
    "faq.a6":
      "インターネット接続をご確認のうえ、もう一度お試しください。オフラインでもシングルプレイとチャレンジモードはお楽しみいただけます。",
    "legal.notice":
      "本書はトルコ語と英語で公開しています。その他の言語のプレイヤーの方には英語版が適用されます。",
  },
};

/* ---------------------------------------------------------------- */

/* Ülke kodundan dil. Burada olmayan her ülke İngilizceye düşer.
   Not: pt metinleri Avrupa Portekizcesi, zh ise Basitleştirilmiş Çince —
   Brezilya ve Tayvan için ayrı sürüm gerekirse buradan ayrıştırılır. */
const ULKE_DILI = {
  TR: "tr",

  ES: "es", MX: "es", AR: "es", CO: "es", PE: "es", VE: "es", CL: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", UY: "es", PR: "es", GQ: "es",

  DE: "de", AT: "de", CH: "de", LI: "de",

  FR: "fr", BE: "fr", MC: "fr", LU: "fr", CI: "fr", SN: "fr", ML: "fr",
  BF: "fr", NE: "fr", TG: "fr", BJ: "fr", GA: "fr", CG: "fr", CD: "fr",
  CM: "fr", MG: "fr", HT: "fr",

  IT: "it", SM: "it", VA: "it",

  PT: "pt", BR: "pt", AO: "pt", MZ: "pt", CV: "pt", GW: "pt", ST: "pt",
  TL: "pt",

  RU: "ru", BY: "ru", KZ: "ru", KG: "ru", TJ: "ru",

  CN: "zh", TW: "zh", HK: "zh", MO: "zh",

  JP: "ja",
};

const ULKE_ANAHTAR = "yg_ulke";
const ULKE_OMUR = 7 * 24 * 60 * 60 * 1000; /* ülkeyi 7 gün önbellekte tut */
const ULKE_SURE = 700; /* servis bu sürede cevap vermezse vazgeç */

/* Ziyaretçinin ülkesini IP'sinden öğrenir. İki servise aynı anda sorar,
   ilk cevap verene bakar; ikisi de yetişmezse null döner ve tarayıcı
   diline geri düşeriz. Sonuç önbelleğe yazılır, her ziyarette sorulmaz. */
async function ulkeKodu() {
  try {
    const kayit = JSON.parse(localStorage.getItem(ULKE_ANAHTAR) || "null");
    if (kayit && Date.now() - kayit.zaman < ULKE_OMUR) return kayit.ulke;
  } catch (_) {}

  const sor = (adres, ayikla) =>
    fetch(adres, { signal: AbortSignal.timeout(ULKE_SURE) })
      .then((cevap) => cevap.json())
      .then((veri) => {
        const kod = String(ayikla(veri) || "").toUpperCase();
        if (!/^[A-Z]{2}$/.test(kod)) throw new Error("ülke kodu yok");
        return kod;
      });

  try {
    const kod = await Promise.any([
      sor("https://get.geojs.io/v1/ip/country.json", (v) => v.country),
      sor("https://ipwho.is/?fields=country_code", (v) => v.country_code),
    ]);
    try {
      localStorage.setItem(
        ULKE_ANAHTAR,
        JSON.stringify({ ulke: kod, zaman: Date.now() })
      );
    } catch (_) {}
    return kod;
  } catch (_) {
    return null;
  }
}

function tarayiciDili() {
  for (const tercih of navigator.languages || [navigator.language || ""]) {
    const kod = tercih.toLowerCase().split("-")[0];
    if (METIN[kod]) return kod;
  }
  return null;
}

function uygula(dil, kaydet) {
  const s = METIN[dil] || METIN[VARSAYILAN];

  document.documentElement.lang = dil;

  /* Her sayfa kendi başlık/açıklama anahtarını body üstünde bildirebilir. */
  const basAnahtar = document.body.dataset.title || "meta.title";
  const acAnahtar = document.body.dataset.desc || "meta.desc";
  if (s[basAnahtar]) document.title = s[basAnahtar];
  const aciklama = document.querySelector('meta[name="description"]');
  if (aciklama && s[acAnahtar]) aciklama.content = s[acAnahtar];

  document.querySelectorAll("[data-i18n]").forEach((dugum) => {
    const deger = s[dugum.dataset.i18n];
    if (deger !== undefined) dugum.textContent = deger;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((dugum) => {
    const deger = s[dugum.dataset.i18nHtml];
    if (deger !== undefined) dugum.innerHTML = deger;
  });

  /* Sadece ziyaretçi listeden bilerek seçtiyse kaydediyoruz. Ülkeden ya da
     tarayıcıdan türetilen dili kaydedersek, sonradan değişen tercihini
     bir daha yakalayamayız. */
  if (kaydet) {
    try {
      localStorage.setItem("yg_lang", dil);
    } catch (_) {}
  }

  const secici = document.getElementById("dil-secici");
  if (secici) {
    secici.value = dil;
    secici.setAttribute("aria-label", s["lang.label"] || "Language");
  }
}

function seciciyiKur() {
  const secici = document.getElementById("dil-secici");
  if (!secici) return;

  for (const [kod, ad] of Object.entries(DILLER)) {
    const secenek = document.createElement("option");
    secenek.value = kod;
    secenek.textContent = ad;
    secici.appendChild(secenek);
  }

  secici.addEventListener("change", () => uygula(secici.value, true));
}

function goster() {
  document.documentElement.classList.remove("on-yukleme");
}

/* Sıra önemli:
   1. ?lang=de gibi açık bir istek — her şeyi ezer
   2. ziyaretçinin listeden yaptığı seçim
   3. IP'den bulunan ülke
   4. tarayıcı dili
   5. İngilizce                                                        */
async function baslat() {
  seciciyiKur();

  const adresten = new URLSearchParams(location.search).get("lang");
  if (adresten && METIN[adresten]) {
    uygula(adresten, true);
    goster();
    return;
  }

  let secilmis = null;
  try {
    secilmis = localStorage.getItem("yg_lang");
  } catch (_) {}
  if (secilmis && METIN[secilmis]) {
    uygula(secilmis);
    goster();
    return;
  }

  const kod = await ulkeKodu();
  uygula((kod && ULKE_DILI[kod]) || tarayiciDili() || VARSAYILAN);
  goster();
}

baslat().catch(goster);
