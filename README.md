# Proje Kurulum ve Bağımlılık Rehberi

Bu proje, TypeScript ve Cucumber kullanılarak geliştirilmiş bir API test otomasyon projesidir.

## 1. Projeyi İndirdikten Sonra Çalıştırılacak Komut

Projeyi bilgisayarına indirdikten sonra, terminali projenin kök dizininde (package.json dosyasının olduğu yerde) açın ve ana bağımlılıkları kurmak için aşağıdaki komutu çalıştırın:

```bash
npm install @cucumber/cucumber@13.3.0 axios@1.21.0 dotenv@18.0.9 jsonpath-plus@11.2.2