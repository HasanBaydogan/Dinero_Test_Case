# Dinero Case - Hasan BAYDOGAN

Bu proje, Dinero şirketi için geliştirilmiş modern bir iş başvuru formu uygulamasıdır. React ve Tailwind CSS kullanılarak geliştirilmiş, responsive tasarıma sahip ve dark mode desteği olan bir web uygulamasıdır.

## 🚀 Özellikler

### ✨ Ana Özellikler
- **Responsive Tasarım**: Desktop ve mobil cihazlarda mükemmel görünüm
- **Dark Mode Desteği**: Kullanıcı dostu tema değiştirme özelliği
- **Modern UI/UX**: Temiz ve profesyonel arayüz tasarımı
- **Form Validasyonu**: Gerçek zamanlı form doğrulama
- **CV Yükleme**: Dosya yükleme desteği (PNG, JPEG, PDF)
- **Adres Bilgileri**: İsteğe bağlı adres bilgileri ekleme

### 🎨 Tasarım Özellikleri
- **Dinero Branding**: Şirket logosu ve renk paleti
- **Floating Labels**: Modern input etiketleri
- **Smooth Animations**: Yumuşak geçiş animasyonları
- **Loading States**: Yükleme durumları için animasyonlar
- **Error Handling**: Kullanıcı dostu hata mesajları

### 📱 Responsive Layout
- **Desktop Layout**: Geniş ekranlar için optimize edilmiş
- **Mobile Layout**: Mobil cihazlar için özel tasarım
- **Adaptive Components**: Ekran boyutuna göre uyarlanabilir bileşenler

## 🛠️ Teknolojiler

- **React 18**: Modern React hooks ve functional components
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Hızlı build tool
- **Zod**: Form validasyonu
- **Lottie**: Animasyon desteği
- **PostCSS**: CSS işleme

## 📦 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd HASAN_BAYDOGAN
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:5173
```

## 🚀 Kullanım

### Form Alanları
- **Kişisel Bilgiler**: Ad, soyad, e-posta, telefon
- **Adres Bilgileri**: İl, ilçe, açık adres (isteğe bağlı)
- **Profesyonel Bilgiler**: LinkedIn URL, maaş beklentisi
- **CV Yükleme**: Dosya formatı ve boyut kontrolü
- **KVKK Onayı**: Kişisel veri işleme onayı

### Dark Mode
- Sağ üst köşedeki tema toggle butonuna tıklayarak dark/light mode arasında geçiş yapabilirsiniz
- Tema tercihi otomatik olarak kaydedilir

### Form Validasyonu
- Gerçek zamanlı doğrulama
- E-posta format kontrolü
- Telefon numarası formatı
- Dosya boyutu ve format kontrolü
- Zorunlu alan kontrolü

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── form/           # Form bileşenleri
│   │   ├── Input.jsx   # Input bileşeni
│   │   ├── CVUpload.jsx # CV yükleme
│   │   ├── Header.jsx  # Form başlığı
│   │   └── ToggleSwitch/ # Toggle switch
│   ├── SingleForm.jsx  # Ana form bileşeni
│   └── ResponseModal.jsx # Yanıt modalı
├── layout/             # Layout bileşenleri
│   ├── DesktopLayout.jsx
│   └── MobileLayout.jsx
├── state/              # State yönetimi
│   └── FormContext.jsx
├── services/           # API servisleri
│   └── apiService.js
├── validation/         # Form validasyonu
│   └── formSchema.js
├── hooks/              # Custom hooks
├── assets/             # Statik dosyalar
│   ├── images/         # Görseller
│   ├── fonts/          # Fontlar
│   └── animations/     # Animasyonlar
└── App.jsx            # Ana uygulama bileşeni
```

## 🎯 Özellikler Detayı

### Form Validasyonu
- **Zod Schema**: Tip güvenli form validasyonu
- **Real-time Validation**: Gerçek zamanlı doğrulama
- **Error Messages**: Kullanıcı dostu hata mesajları
- **Field-specific Validation**: Alan bazlı doğrulama

### Responsive Design
- **Mobile First**: Mobil öncelikli tasarım
- **Breakpoint System**: Tailwind breakpoint sistemi
- **Adaptive Components**: Uyarlanabilir bileşenler
- **Touch Friendly**: Dokunmatik cihaz uyumlu

### Accessibility
- **ARIA Labels**: Erişilebilirlik etiketleri
- **Keyboard Navigation**: Klavye navigasyonu
- **Screen Reader Support**: Ekran okuyucu desteği
- **Focus Management**: Odak yönetimi

## 🔧 Geliştirme

### Scripts
```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run preview      # Build önizleme
npm run lint         # Linting
```

### Code Style
- **ESLint**: Kod kalitesi kontrolü
- **Prettier**: Kod formatı
- **Conventional Commits**: Commit mesaj standardı

## 📄 Lisans

Bu proje Dinero şirketi için özel olarak geliştirilmiştir.

## 👨‍💻 Geliştirici

**Hasan BAYDOGAN**
- LinkedIn: [Hasan BAYDOGAN](https://www.linkedin.com/in/hasan-baydogan)
- E-posta: [E-posta adresi]

---

**Not**: Bu proje Dinero Case çalışması kapsamında geliştirilmiştir.
