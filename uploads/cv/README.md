# CV Uploads Directory

Bu klasör, başvuru formu üzerinden yüklenen CV dosyalarının saklandığı yerdir.

## Dosya Adlandırma Formatı
- Format: `{timestamp}_{originalFileName}`
- Örnek: `1703123456789_cv.pdf`

## Erişim
CV dosyalarına şu URL formatı ile erişilebilir:
```
https://dinero-test-case-aol3.vercel.app/api/cv/{fileName}
```

## Özellikler
- Maksimum dosya boyutu: 10MB
- Desteklenen formatlar: PDF, DOC, DOCX, TXT
- Benzersiz dosya adları (timestamp ile)
- GitHub'da kalıcı saklama

## Güvenlik
- Sadece CV dosyaları kabul edilir
- Dosya boyutu kontrolü yapılır
- Güvenli dosya adlandırma kullanılır 