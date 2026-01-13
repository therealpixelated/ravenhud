/**
 * RavenHUD Website - Internationalization (i18n)
 * Supports: English, Portuguese, Spanish, French, Indonesian, Vietnamese
 */

const translations = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.download': 'Download',
    'nav.security': 'Security',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'Track Everything. Play Smarter.',
    'hero.description': 'An always-on-top overlay tool to track cosmetics, trophies, tradepacks, farming, and more.',
    'hero.download': 'Download for Windows',
    'hero.demo': 'Try Demo',
    'hero.see-features': 'See Features',

    // Features
    'features.title': 'Features',
    'features.cosmetics.title': 'Cosmetics Tracker',
    'features.cosmetics.desc': 'Track your collection progress across all cosmetic categories. See what you own, what\'s missing, and your completion percentage.',
    'features.trophies.title': 'Trophy Tracker',
    'features.trophies.desc': 'Monitor your trophy achievements. Filter by category, search for specific trophies, and track your hunting progress.',
    'features.tradepacks.title': 'Tradepack Calculator',
    'features.tradepacks.desc': 'Optimize your trade routes. Calculate profits, compare destinations, and find the best deals for your tradepacks.',
    'features.farming.title': 'Farming Cards',
    'features.farming.desc': 'Interactive guides for crops and animals. See growth times, yields, and optimal farming strategies at a glance.',
    'features.land.title': 'Land Simulator',
    'features.land.desc': 'Plan your estate layouts before committing. Test different configurations and optimize your land usage.',
    'features.overlay.title': 'Overlay Mode',
    'features.overlay.desc': 'Always-on-top transparent window that works while you play. Click-through support so it never interferes with gameplay.',

    // Download
    'download.title': 'Download',
    'download.recommended': 'Recommended',
    'download.windows': 'Windows Installer',
    'download.portable': 'Portable ZIP',
    'download.installer-btn': 'Download Installer',
    'download.zip-btn': 'Download ZIP',
    'download.auto-updates': 'Includes automatic updates',
    'download.no-install': 'No installation required',
    'download.note': 'Requires Windows 10 or later. The installer version will automatically download and install updates.',

    // Requirements
    'requirements.title': 'System Requirements',
    'requirements.os': 'OS:',
    'requirements.ram': 'RAM:',
    'requirements.storage': 'Storage:',
    'requirements.display': 'Display:',

    // Security
    'security.title': 'Security & Transparency',
    'security.intro': 'Every release is automatically verified for your safety.',
    'security.verify.title': 'How to Verify Your Download',
    'security.verify.step1': 'Check signature:',
    'security.verify.step1.detail': 'Right-click .exe \u2192 Properties \u2192 Digital Signatures \u2192 Should show "therealcloudvikinggmail.onmicrosoft.com"',
    'security.verify.step2': 'VirusTotal:',
    'security.verify.step2.detail': 'Each release includes a link to the scan results in the release notes',
    'security.verify.step3': 'Hash check:',
    'security.verify.step3.detail': 'Compare the SHA256 hash shown in release notes',

    // Footer
    'footer.made-by': 'RavenHUD is a community project made by',
    'footer.disclaimer': 'Not affiliated with Tavernlight Games. Game assets belong to Tavernlight Games.',
    'footer.report-bug': 'Report Bug',

    // Lightbox
    'lightbox.click-details': 'Click for details',
    'lightbox.previous': '\u2190 Previous',
    'lightbox.next': 'Next \u2192'
  },

  pt: {
    // Navigation
    'nav.features': 'Recursos',
    'nav.download': 'Baixar',
    'nav.security': 'Seguran\u00e7a',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'Rastreie Tudo. Jogue Melhor.',
    'hero.description': 'Uma ferramenta de overlay sempre vis\u00edvel para rastrear cosm\u00e9ticos, trof\u00e9us, pacotes de com\u00e9rcio, agricultura e mais.',
    'hero.download': 'Baixar para Windows',
    'hero.demo': 'Testar Demo',
    'hero.see-features': 'Ver Recursos',

    // Features
    'features.title': 'Recursos',
    'features.cosmetics.title': 'Rastreador de Cosm\u00e9ticos',
    'features.cosmetics.desc': 'Acompanhe seu progresso de cole\u00e7\u00e3o em todas as categorias de cosm\u00e9ticos. Veja o que voc\u00ea possui, o que est\u00e1 faltando e sua porcentagem de conclus\u00e3o.',
    'features.trophies.title': 'Rastreador de Trof\u00e9us',
    'features.trophies.desc': 'Monitore suas conquistas de trof\u00e9us. Filtre por categoria, pesquise trof\u00e9us espec\u00edficos e acompanhe seu progresso.',
    'features.tradepacks.title': 'Calculadora de Pacotes',
    'features.tradepacks.desc': 'Otimize suas rotas comerciais. Calcule lucros, compare destinos e encontre as melhores ofertas para seus pacotes.',
    'features.farming.title': 'Cart\u00f5es de Agricultura',
    'features.farming.desc': 'Guias interativos para culturas e animais. Veja tempos de crescimento, rendimentos e estrat\u00e9gias \u00f3timas rapidamente.',
    'features.land.title': 'Simulador de Terreno',
    'features.land.desc': 'Planeje seus layouts antes de construir. Teste diferentes configura\u00e7\u00f5es e otimize o uso do seu terreno.',
    'features.overlay.title': 'Modo Overlay',
    'features.overlay.desc': 'Janela transparente sempre vis\u00edvel que funciona enquanto voc\u00ea joga. Suporte click-through para nunca interferir na gameplay.',

    // Download
    'download.title': 'Baixar',
    'download.recommended': 'Recomendado',
    'download.windows': 'Instalador Windows',
    'download.portable': 'ZIP Port\u00e1til',
    'download.installer-btn': 'Baixar Instalador',
    'download.zip-btn': 'Baixar ZIP',
    'download.auto-updates': 'Inclui atualiza\u00e7\u00f5es autom\u00e1ticas',
    'download.no-install': 'Sem instala\u00e7\u00e3o necess\u00e1ria',
    'download.note': 'Requer Windows 10 ou superior. A vers\u00e3o instalador baixar\u00e1 e instalar\u00e1 atualiza\u00e7\u00f5es automaticamente.',

    // Requirements
    'requirements.title': 'Requisitos do Sistema',
    'requirements.os': 'SO:',
    'requirements.ram': 'RAM:',
    'requirements.storage': 'Armazenamento:',
    'requirements.display': 'Tela:',

    // Security
    'security.title': 'Seguran\u00e7a e Transpar\u00eancia',
    'security.intro': 'Cada lan\u00e7amento \u00e9 automaticamente verificado para sua seguran\u00e7a.',
    'security.verify.title': 'Como Verificar Seu Download',
    'security.verify.step1': 'Verificar assinatura:',
    'security.verify.step1.detail': 'Clique direito no .exe \u2192 Propriedades \u2192 Assinaturas Digitais \u2192 Deve mostrar "therealcloudvikinggmail.onmicrosoft.com"',
    'security.verify.step2': 'VirusTotal:',
    'security.verify.step2.detail': 'Cada lan\u00e7amento inclui um link para os resultados da verifica\u00e7\u00e3o nas notas de lan\u00e7amento',
    'security.verify.step3': 'Verificar hash:',
    'security.verify.step3.detail': 'Compare o hash SHA256 mostrado nas notas de lan\u00e7amento',

    // Footer
    'footer.made-by': 'RavenHUD \u00e9 um projeto comunit\u00e1rio feito por',
    'footer.disclaimer': 'N\u00e3o afiliado com Tavernlight Games. Assets do jogo pertencem \u00e0 Tavernlight Games.',
    'footer.report-bug': 'Reportar Bug',

    // Lightbox
    'lightbox.click-details': 'Clique para detalhes',
    'lightbox.previous': '\u2190 Anterior',
    'lightbox.next': 'Pr\u00f3ximo \u2192'
  },

  es: {
    // Navigation
    'nav.features': 'Funciones',
    'nav.download': 'Descargar',
    'nav.security': 'Seguridad',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'Rastrea Todo. Juega Mejor.',
    'hero.description': 'Una herramienta de overlay siempre visible para rastrear cosm\u00e9ticos, trofeos, paquetes de comercio, agricultura y m\u00e1s.',
    'hero.download': 'Descargar para Windows',
    'hero.demo': 'Probar Demo',
    'hero.see-features': 'Ver Funciones',

    // Features
    'features.title': 'Funciones',
    'features.cosmetics.title': 'Rastreador de Cosm\u00e9ticos',
    'features.cosmetics.desc': 'Sigue el progreso de tu colecci\u00f3n en todas las categor\u00edas de cosm\u00e9ticos. Ve lo que tienes, lo que falta y tu porcentaje de completado.',
    'features.trophies.title': 'Rastreador de Trofeos',
    'features.trophies.desc': 'Monitorea tus logros de trofeos. Filtra por categor\u00eda, busca trofeos espec\u00edficos y sigue tu progreso de caza.',
    'features.tradepacks.title': 'Calculadora de Paquetes',
    'features.tradepacks.desc': 'Optimiza tus rutas comerciales. Calcula ganancias, compara destinos y encuentra las mejores ofertas para tus paquetes.',
    'features.farming.title': 'Tarjetas de Agricultura',
    'features.farming.desc': 'Gu\u00edas interactivas para cultivos y animales. Ve tiempos de crecimiento, rendimientos y estrategias \u00f3ptimas de un vistazo.',
    'features.land.title': 'Simulador de Terreno',
    'features.land.desc': 'Planifica tus dise\u00f1os antes de construir. Prueba diferentes configuraciones y optimiza el uso de tu terreno.',
    'features.overlay.title': 'Modo Overlay',
    'features.overlay.desc': 'Ventana transparente siempre visible que funciona mientras juegas. Soporte click-through para nunca interferir con el juego.',

    // Download
    'download.title': 'Descargar',
    'download.recommended': 'Recomendado',
    'download.windows': 'Instalador Windows',
    'download.portable': 'ZIP Port\u00e1til',
    'download.installer-btn': 'Descargar Instalador',
    'download.zip-btn': 'Descargar ZIP',
    'download.auto-updates': 'Incluye actualizaciones autom\u00e1ticas',
    'download.no-install': 'Sin instalaci\u00f3n requerida',
    'download.note': 'Requiere Windows 10 o posterior. La versi\u00f3n instalador descargar\u00e1 e instalar\u00e1 actualizaciones autom\u00e1ticamente.',

    // Requirements
    'requirements.title': 'Requisitos del Sistema',
    'requirements.os': 'SO:',
    'requirements.ram': 'RAM:',
    'requirements.storage': 'Almacenamiento:',
    'requirements.display': 'Pantalla:',

    // Security
    'security.title': 'Seguridad y Transparencia',
    'security.intro': 'Cada lanzamiento es verificado autom\u00e1ticamente para tu seguridad.',
    'security.verify.title': 'C\u00f3mo Verificar tu Descarga',
    'security.verify.step1': 'Verificar firma:',
    'security.verify.step1.detail': 'Clic derecho en .exe \u2192 Propiedades \u2192 Firmas Digitales \u2192 Debe mostrar "therealcloudvikinggmail.onmicrosoft.com"',
    'security.verify.step2': 'VirusTotal:',
    'security.verify.step2.detail': 'Cada lanzamiento incluye un enlace a los resultados del escaneo en las notas de lanzamiento',
    'security.verify.step3': 'Verificar hash:',
    'security.verify.step3.detail': 'Compara el hash SHA256 mostrado en las notas de lanzamiento',

    // Footer
    'footer.made-by': 'RavenHUD es un proyecto comunitario hecho por',
    'footer.disclaimer': 'No afiliado con Tavernlight Games. Los assets del juego pertenecen a Tavernlight Games.',
    'footer.report-bug': 'Reportar Bug',

    // Lightbox
    'lightbox.click-details': 'Clic para detalles',
    'lightbox.previous': '\u2190 Anterior',
    'lightbox.next': 'Siguiente \u2192'
  },

  fr: {
    // Navigation
    'nav.features': 'Fonctionnalit\u00e9s',
    'nav.download': 'T\u00e9l\u00e9charger',
    'nav.security': 'S\u00e9curit\u00e9',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'Suivez Tout. Jouez Mieux.',
    'hero.description': 'Un outil overlay toujours visible pour suivre les cosm\u00e9tiques, troph\u00e9es, paquets commerciaux, agriculture et plus.',
    'hero.download': 'T\u00e9l\u00e9charger pour Windows',
    'hero.demo': 'Essayer la D\u00e9mo',
    'hero.see-features': 'Voir les Fonctionnalit\u00e9s',

    // Features
    'features.title': 'Fonctionnalit\u00e9s',
    'features.cosmetics.title': 'Suivi des Cosm\u00e9tiques',
    'features.cosmetics.desc': 'Suivez votre progression de collection dans toutes les cat\u00e9gories de cosm\u00e9tiques. Voyez ce que vous poss\u00e9dez, ce qui manque et votre pourcentage de compl\u00e9tion.',
    'features.trophies.title': 'Suivi des Troph\u00e9es',
    'features.trophies.desc': 'Surveillez vos succ\u00e8s de troph\u00e9es. Filtrez par cat\u00e9gorie, recherchez des troph\u00e9es sp\u00e9cifiques et suivez votre progression.',
    'features.tradepacks.title': 'Calculateur de Paquets',
    'features.tradepacks.desc': 'Optimisez vos routes commerciales. Calculez les profits, comparez les destinations et trouvez les meilleures offres.',
    'features.farming.title': 'Cartes d\'Agriculture',
    'features.farming.desc': 'Guides interactifs pour les cultures et animaux. Voyez les temps de croissance, rendements et strat\u00e9gies optimales en un coup d\'\u0153il.',
    'features.land.title': 'Simulateur de Terrain',
    'features.land.desc': 'Planifiez vos am\u00e9nagements avant de construire. Testez diff\u00e9rentes configurations et optimisez l\'utilisation de votre terrain.',
    'features.overlay.title': 'Mode Overlay',
    'features.overlay.desc': 'Fen\u00eatre transparente toujours visible pendant que vous jouez. Support click-through pour ne jamais interf\u00e9rer avec le gameplay.',

    // Download
    'download.title': 'T\u00e9l\u00e9charger',
    'download.recommended': 'Recommand\u00e9',
    'download.windows': 'Installateur Windows',
    'download.portable': 'ZIP Portable',
    'download.installer-btn': 'T\u00e9l\u00e9charger l\'Installateur',
    'download.zip-btn': 'T\u00e9l\u00e9charger ZIP',
    'download.auto-updates': 'Inclut les mises \u00e0 jour automatiques',
    'download.no-install': 'Aucune installation requise',
    'download.note': 'N\u00e9cessite Windows 10 ou ult\u00e9rieur. La version installateur t\u00e9l\u00e9chargera et installera automatiquement les mises \u00e0 jour.',

    // Requirements
    'requirements.title': 'Configuration Requise',
    'requirements.os': 'OS:',
    'requirements.ram': 'RAM:',
    'requirements.storage': 'Stockage:',
    'requirements.display': '\u00c9cran:',

    // Security
    'security.title': 'S\u00e9curit\u00e9 et Transparence',
    'security.intro': 'Chaque version est automatiquement v\u00e9rifi\u00e9e pour votre s\u00e9curit\u00e9.',
    'security.verify.title': 'Comment V\u00e9rifier Votre T\u00e9l\u00e9chargement',
    'security.verify.step1': 'V\u00e9rifier la signature:',
    'security.verify.step1.detail': 'Clic droit sur .exe \u2192 Propri\u00e9t\u00e9s \u2192 Signatures Num\u00e9riques \u2192 Doit afficher "therealcloudvikinggmail.onmicrosoft.com"',
    'security.verify.step2': 'VirusTotal:',
    'security.verify.step2.detail': 'Chaque version inclut un lien vers les r\u00e9sultats d\'analyse dans les notes de version',
    'security.verify.step3': 'V\u00e9rifier le hash:',
    'security.verify.step3.detail': 'Comparez le hash SHA256 affich\u00e9 dans les notes de version',

    // Footer
    'footer.made-by': 'RavenHUD est un projet communautaire cr\u00e9\u00e9 par',
    'footer.disclaimer': 'Non affili\u00e9 \u00e0 Tavernlight Games. Les assets du jeu appartiennent \u00e0 Tavernlight Games.',
    'footer.report-bug': 'Signaler un Bug',

    // Lightbox
    'lightbox.click-details': 'Cliquez pour d\u00e9tails',
    'lightbox.previous': '\u2190 Pr\u00e9c\u00e9dent',
    'lightbox.next': 'Suivant \u2192'
  },

  id: {
    // Navigation
    'nav.features': 'Fitur',
    'nav.download': 'Unduh',
    'nav.security': 'Keamanan',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'Lacak Segalanya. Main Lebih Cerdas.',
    'hero.description': 'Alat overlay yang selalu terlihat untuk melacak kosmetik, piala, paket dagang, pertanian, dan lainnya.',
    'hero.download': 'Unduh untuk Windows',
    'hero.demo': 'Coba Demo',
    'hero.see-features': 'Lihat Fitur',

    // Features
    'features.title': 'Fitur',
    'features.cosmetics.title': 'Pelacak Kosmetik',
    'features.cosmetics.desc': 'Lacak kemajuan koleksi Anda di semua kategori kosmetik. Lihat apa yang Anda miliki, yang kurang, dan persentase penyelesaian Anda.',
    'features.trophies.title': 'Pelacak Piala',
    'features.trophies.desc': 'Pantau pencapaian piala Anda. Filter berdasarkan kategori, cari piala tertentu, dan lacak kemajuan berburu Anda.',
    'features.tradepacks.title': 'Kalkulator Paket Dagang',
    'features.tradepacks.desc': 'Optimalkan rute dagang Anda. Hitung keuntungan, bandingkan tujuan, dan temukan penawaran terbaik untuk paket Anda.',
    'features.farming.title': 'Kartu Pertanian',
    'features.farming.desc': 'Panduan interaktif untuk tanaman dan hewan. Lihat waktu tumbuh, hasil panen, dan strategi optimal secara sekilas.',
    'features.land.title': 'Simulator Tanah',
    'features.land.desc': 'Rencanakan tata letak properti sebelum membangun. Uji berbagai konfigurasi dan optimalkan penggunaan tanah Anda.',
    'features.overlay.title': 'Mode Overlay',
    'features.overlay.desc': 'Jendela transparan yang selalu terlihat saat Anda bermain. Dukungan click-through agar tidak pernah mengganggu gameplay.',

    // Download
    'download.title': 'Unduh',
    'download.recommended': 'Direkomendasikan',
    'download.windows': 'Installer Windows',
    'download.portable': 'ZIP Portabel',
    'download.installer-btn': 'Unduh Installer',
    'download.zip-btn': 'Unduh ZIP',
    'download.auto-updates': 'Termasuk pembaruan otomatis',
    'download.no-install': 'Tidak perlu instalasi',
    'download.note': 'Membutuhkan Windows 10 atau lebih baru. Versi installer akan mengunduh dan menginstal pembaruan secara otomatis.',

    // Requirements
    'requirements.title': 'Persyaratan Sistem',
    'requirements.os': 'OS:',
    'requirements.ram': 'RAM:',
    'requirements.storage': 'Penyimpanan:',
    'requirements.display': 'Layar:',

    // Security
    'security.title': 'Keamanan & Transparansi',
    'security.intro': 'Setiap rilis diverifikasi secara otomatis untuk keamanan Anda.',
    'security.verify.title': 'Cara Memverifikasi Unduhan Anda',
    'security.verify.step1': 'Periksa tanda tangan:',
    'security.verify.step1.detail': 'Klik kanan .exe \u2192 Properties \u2192 Digital Signatures \u2192 Harus menampilkan "therealcloudvikinggmail.onmicrosoft.com"',
    'security.verify.step2': 'VirusTotal:',
    'security.verify.step2.detail': 'Setiap rilis menyertakan tautan ke hasil pemindaian di catatan rilis',
    'security.verify.step3': 'Periksa hash:',
    'security.verify.step3.detail': 'Bandingkan hash SHA256 yang ditampilkan di catatan rilis',

    // Footer
    'footer.made-by': 'RavenHUD adalah proyek komunitas yang dibuat oleh',
    'footer.disclaimer': 'Tidak berafiliasi dengan Tavernlight Games. Aset game milik Tavernlight Games.',
    'footer.report-bug': 'Laporkan Bug',

    // Lightbox
    'lightbox.click-details': 'Klik untuk detail',
    'lightbox.previous': '\u2190 Sebelumnya',
    'lightbox.next': 'Berikutnya \u2192'
  },

  vi: {
    // Navigation
    'nav.features': 'T\u00ednh N\u0103ng',
    'nav.download': 'T\u1ea3i Xu\u1ed1ng',
    'nav.security': 'B\u1ea3o M\u1eadt',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'Theo D\u00f5i T\u1ea5t C\u1ea3. Ch\u01a1i Th\u00f4ng Minh H\u01a1n.',
    'hero.description': 'C\u00f4ng c\u1ee5 overlay lu\u00f4n hi\u1ec3n th\u1ecb \u0111\u1ec3 theo d\u00f5i m\u1ef9 ph\u1ea9m, cúp, gói th\u01b0\u01a1ng m\u1ea1i, n\u00f4ng nghi\u1ec7p và nhi\u1ec1u h\u01a1n n\u1eefa.',
    'hero.download': 'T\u1ea3i cho Windows',
    'hero.demo': 'Th\u1eed Demo',
    'hero.see-features': 'Xem T\u00ednh N\u0103ng',

    // Features
    'features.title': 'T\u00ednh N\u0103ng',
    'features.cosmetics.title': 'Theo D\u00f5i M\u1ef9 Ph\u1ea9m',
    'features.cosmetics.desc': 'Theo d\u00f5i ti\u1ebfn \u0111\u1ed9 b\u1ed9 s\u01b0u t\u1eadp c\u1ee7a b\u1ea1n trong t\u1ea5t c\u1ea3 danh m\u1ee5c m\u1ef9 ph\u1ea9m. Xem nh\u1eefng g\u00ec b\u1ea1n c\u00f3, thi\u1ebfu g\u00ec và ph\u1ea7n tr\u0103m ho\u00e0n th\u00e0nh.',
    'features.trophies.title': 'Theo D\u00f5i Cúp',
    'features.trophies.desc': 'Gi\u00e1m s\u00e1t th\u00e0nh t\u00edch cúp c\u1ee7a b\u1ea1n. L\u1ecdc theo danh m\u1ee5c, t\u00ecm ki\u1ebfm cúp c\u1ee5 th\u1ec3 và theo d\u00f5i ti\u1ebfn \u0111\u1ed9 s\u0103n cúp.',
    'features.tradepacks.title': 'M\u00e1y T\u00ednh Gói H\u00e0ng',
    'features.tradepacks.desc': 'T\u1ed1i \u01b0u h\u00f3a tuy\u1ebfn th\u01b0\u01a1ng m\u1ea1i. T\u00ednh l\u1ee3i nhu\u1eadn, so s\u00e1nh \u0111i\u1ec3m \u0111\u1ebfn và t\u00ecm giao d\u1ecbch t\u1ed1t nh\u1ea5t cho gói h\u00e0ng.',
    'features.farming.title': 'Th\u1ebb N\u00f4ng Nghi\u1ec7p',
    'features.farming.desc': 'H\u01b0\u1edbng d\u1eabn t\u01b0\u01a1ng t\u00e1c cho c\u00e2y tr\u1ed3ng và \u0111\u1ed9ng v\u1eadt. Xem th\u1eddi gian t\u0103ng tr\u01b0\u1edfng, s\u1ea3n l\u01b0\u1ee3ng và chi\u1ebfn l\u01b0\u1ee3c t\u1ed1i \u01b0u nhanh ch\u00f3ng.',
    'features.land.title': 'M\u00f4 Ph\u1ecfng \u0110\u1ea5t',
    'features.land.desc': 'L\u1eadp k\u1ebf ho\u1ea1ch b\u1ed1 tr\u00ed tr\u01b0\u1edbc khi x\u00e2y d\u1ef1ng. Th\u1eed nghi\u1ec7m c\u00e1c c\u1ea5u h\u00ecnh kh\u00e1c nhau và t\u1ed1i \u01b0u h\u00f3a vi\u1ec7c s\u1eed d\u1ee5ng \u0111\u1ea5t.',
    'features.overlay.title': 'Ch\u1ebf \u0110\u1ed9 Overlay',
    'features.overlay.desc': 'C\u1eeda s\u1ed5 trong su\u1ed1t lu\u00f4n hi\u1ec3n th\u1ecb khi b\u1ea1n ch\u01a1i. H\u1ed7 tr\u1ee3 click-through \u0111\u1ec3 kh\u00f4ng bao gi\u1edd c\u1ea3n tr\u1edf gameplay.',

    // Download
    'download.title': 'T\u1ea3i Xu\u1ed1ng',
    'download.recommended': '\u0110\u1ec1 Xu\u1ea5t',
    'download.windows': 'Tr\u00ecnh C\u00e0i \u0110\u1eb7t Windows',
    'download.portable': 'ZIP Di \u0110\u1ed9ng',
    'download.installer-btn': 'T\u1ea3i Tr\u00ecnh C\u00e0i \u0110\u1eb7t',
    'download.zip-btn': 'T\u1ea3i ZIP',
    'download.auto-updates': 'Bao g\u1ed3m c\u1eadp nh\u1eadt t\u1ef1 \u0111\u1ed9ng',
    'download.no-install': 'Kh\u00f4ng c\u1ea7n c\u00e0i \u0111\u1eb7t',
    'download.note': 'Y\u00eau c\u1ea7u Windows 10 tr\u1edf l\u00ean. Phi\u00ean b\u1ea3n c\u00e0i \u0111\u1eb7t s\u1ebd t\u1ef1 \u0111\u1ed9ng t\u1ea3i v\u00e0 c\u00e0i \u0111\u1eb7t c\u1eadp nh\u1eadt.',

    // Requirements
    'requirements.title': 'Y\u00eau C\u1ea7u H\u1ec7 Th\u1ed1ng',
    'requirements.os': 'H\u0110H:',
    'requirements.ram': 'RAM:',
    'requirements.storage': 'B\u1ed9 Nh\u1edb:',
    'requirements.display': 'M\u00e0n H\u00ecnh:',

    // Security
    'security.title': 'B\u1ea3o M\u1eadt & Minh B\u1ea1ch',
    'security.intro': 'M\u1ed7i phi\u00ean b\u1ea3n \u0111\u01b0\u1ee3c x\u00e1c minh t\u1ef1 \u0111\u1ed9ng cho an to\u00e0n c\u1ee7a b\u1ea1n.',
    'security.verify.title': 'C\u00e1ch X\u00e1c Minh T\u1ea3i Xu\u1ed1ng',
    'security.verify.step1': 'Ki\u1ec3m tra ch\u1eef k\u00fd:',
    'security.verify.step1.detail': 'Nh\u1ea5p chu\u1ed9t ph\u1ea3i .exe \u2192 Properties \u2192 Digital Signatures \u2192 Ph\u1ea3i hi\u1ec3n th\u1ecb "therealcloudvikinggmail.onmicrosoft.com"',
    'security.verify.step2': 'VirusTotal:',
    'security.verify.step2.detail': 'M\u1ed7i phi\u00ean b\u1ea3n bao g\u1ed3m li\u00ean k\u1ebft \u0111\u1ebfn k\u1ebft qu\u1ea3 qu\u00e9t trong ghi ch\u00fa ph\u00e1t h\u00e0nh',
    'security.verify.step3': 'Ki\u1ec3m tra hash:',
    'security.verify.step3.detail': 'So s\u00e1nh hash SHA256 hi\u1ec3n th\u1ecb trong ghi ch\u00fa ph\u00e1t h\u00e0nh',

    // Footer
    'footer.made-by': 'RavenHUD l\u00e0 d\u1ef1 \u00e1n c\u1ed9ng \u0111\u1ed3ng \u0111\u01b0\u1ee3c t\u1ea1o b\u1edfi',
    'footer.disclaimer': 'Kh\u00f4ng li\u00ean k\u1ebft v\u1edbi Tavernlight Games. T\u00e0i nguy\u00ean game thu\u1ed9c v\u1ec1 Tavernlight Games.',
    'footer.report-bug': 'B\u00e1o L\u1ed7i',

    // Lightbox
    'lightbox.click-details': 'Nh\u1ea5p \u0111\u1ec3 xem chi ti\u1ebft',
    'lightbox.previous': '\u2190 Tr\u01b0\u1edbc',
    'lightbox.next': 'Ti\u1ebfp \u2192'
  }
};

// Language configuration with flags
const languageConfig = {
  en: { code: 'en', name: 'English', flag: '\ud83c\uddfa\ud83c\uddf8' },
  pt: { code: 'pt', name: 'Portugu\u00eas', flag: '\ud83c\udde7\ud83c\uddf7' },
  es: { code: 'es', name: 'Espa\u00f1ol', flag: '\ud83c\uddf2\ud83c\uddfd' },
  fr: { code: 'fr', name: 'Fran\u00e7ais', flag: '\ud83c\uddeb\ud83c\uddf7' },
  id: { code: 'id', name: 'Indonesia', flag: '\ud83c\uddee\ud83c\udde9' },
  vi: { code: 'vi', name: 'Ti\u1ebfng Vi\u1ec7t', flag: '\ud83c\uddfb\ud83c\uddf3' }
};

const STORAGE_KEY = 'ravenhud-language';
const supportedLanguages = Object.keys(languageConfig);
let currentLanguage = 'en';

/**
 * Get saved language from localStorage or detect browser language
 */
function getSavedLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && supportedLanguages.includes(saved)) {
    return saved;
  }

  // Detect browser language
  const browserLang = navigator.language.toLowerCase();

  // Check for exact matches first
  for (const lang of supportedLanguages) {
    if (browserLang.startsWith(lang)) {
      return lang;
    }
  }

  return 'en';
}

/**
 * Save language preference to localStorage
 */
function saveLanguage(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
}

/**
 * Get translation for a key
 */
function t(key) {
  return translations[currentLanguage]?.[key] || translations['en']?.[key] || key;
}

/**
 * Update all elements with data-i18n attribute
 */
function updatePageTranslations() {
  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Update elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Update elements with data-i18n-aria attribute
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', t(key));
  });

  // Update HTML lang attribute
  document.documentElement.lang = currentLanguage;

  // Update language switcher display
  const config = languageConfig[currentLanguage];
  const flagEl = document.querySelector('.language-switcher .language-flag');
  const textEl = document.querySelector('.language-btn-text');

  if (flagEl && config) {
    flagEl.textContent = config.flag;
  }
  if (textEl && config) {
    textEl.textContent = config.code.toUpperCase();
  }

  // Update active state in dropdown
  document.querySelectorAll('.language-option').forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    btn.classList.toggle('active', lang === currentLanguage);
    btn.setAttribute('aria-selected', lang === currentLanguage);
  });
}

/**
 * Switch language
 */
function setLanguage(lang) {
  if (!supportedLanguages.includes(lang)) return;

  currentLanguage = lang;
  saveLanguage(lang);
  updatePageTranslations();
}

/**
 * Initialize language switcher
 */
function initLanguageSwitcher() {
  const switcher = document.querySelector('.language-switcher');
  if (!switcher) return;

  const btn = switcher.querySelector('.language-btn');
  const dropdown = switcher.querySelector('.language-dropdown');

  if (!btn || !dropdown) return;

  // Toggle dropdown on button click
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', dropdown.classList.contains('open'));
  });

  // Handle language selection
  dropdown.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = option.getAttribute('data-lang');
      setLanguage(lang);
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });

  // Close dropdown on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
}

/**
 * Initialize i18n system
 */
function initI18n() {
  currentLanguage = getSavedLanguage();
  updatePageTranslations();
  initLanguageSwitcher();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}

// Export for external use
window.i18n = {
  t,
  setLanguage,
  getCurrentLanguage: () => currentLanguage,
  getSupportedLanguages: () => supportedLanguages,
  getLanguageConfig: () => languageConfig
};
