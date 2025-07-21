# Environment Variables Setup

Bu proje için gerekli environment değişkenlerini ayarlamak için aşağıdaki adımları takip edin.

## 1. Environment Dosyası Oluşturma

Proje ana dizininde `.env` dosyası oluşturun:

```bash
# .env dosyası oluştur
touch .env
```

## 2. Environment Değişkenlerini Ayarlama

`.env` dosyasına aşağıdaki değişkenleri ekleyin:

```env
# API Configuration
VITE_API_BASE_URL=https://test.com.tr/api/test/case
VITE_PROVINCES_API_URL=https://api.aidath.com/api/v1/global/public/getprovincesordistricts

# API Headers
VITE_CLIENT_ID=2
VITE_OS_ID=2

# Timeout Settings (in milliseconds)
VITE_API_TIMEOUT=30000
VITE_PROVINCES_API_TIMEOUT=10000
```

## 3. Environment Değişkenleri Açıklaması

| Değişken | Açıklama | Varsayılan Değer |
|----------|----------|------------------|
| `VITE_API_BASE_URL` | Ana API endpoint URL'i | `https://test.com.tr/api/test/case` |
| `VITE_PROVINCES_API_URL` | İl/İlçe API endpoint URL'i | `https://api.aidath.com/api/v1/global/public/getprovincesordistricts` |
| `VITE_CLIENT_ID` | API client ID | `2` |
| `VITE_OS_ID` | API OS ID | `2` |
| `VITE_API_TIMEOUT` | Ana API timeout (ms) | `30000` |
| `VITE_PROVINCES_API_TIMEOUT` | İl/İlçe API timeout (ms) | `10000` |

## 4. Güvenlik Notları

⚠️ **Önemli**: `.env` dosyasını asla git repository'sine commit etmeyin!

- `.env` dosyası `.gitignore` dosyasına eklenmiştir
- Hassas bilgiler (API anahtarları, şifreler vb.) bu dosyada saklanmalıdır
- Production ortamında farklı değerler kullanın

## 5. Development vs Production

### Development (.env)
```env
VITE_API_BASE_URL=https://test.com.tr/api/test/case
VITE_CLIENT_ID=2
```

### Production (.env.production)
```env
VITE_API_BASE_URL=https://production-api.com/api
VITE_CLIENT_ID=production_client_id
```

## 6. Environment Değişkenlerini Kullanma

Kod içinde environment değişkenlerini şu şekilde kullanabilirsiniz:

```javascript
// Environment değişkenini al
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Varsayılan değer ile birlikte kullan
const timeout = import.meta.env.VITE_API_TIMEOUT || 30000;
```

## 7. Vite Environment Variables

Bu proje Vite kullandığı için:
- Tüm environment değişkenleri `VITE_` prefix'i ile başlamalıdır
- Bu prefix olmadan tanımlanan değişkenler client-side'da erişilemez
- Environment değişkenleri build time'da bundle'a dahil edilir

## 8. Troubleshooting

### Environment değişkeni çalışmıyor?
1. `.env` dosyasının proje ana dizininde olduğundan emin olun
2. Değişken adının `VITE_` ile başladığından emin olun
3. Development server'ı yeniden başlatın: `npm run dev`

### Production build'de sorun var?
1. `.env.production` dosyası oluşturun
2. Production değerlerini bu dosyaya ekleyin
3. Build komutunu çalıştırın: `npm run build` 