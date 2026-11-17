@PricePlans
  Feature: Bir yönetici olarak API bağlantısı üzerinden course price plans'e erişebilmek istiyorum.
    @US011TC03_AFIN_get
    Scenario: Negative ->GET [ADMIN=FALSE],[ID=NONE]
    /api/pricePlans endpoint'ine
    gecersiz (invalid token) authorization bilgileri ile
    bir GET request gönderildiginde
    dönen status code'in 401 ve
    response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali.
      * PricePlans kullanicisi "invalid" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi status code degerinin 401 oldugunu dogrular
      * PricePlans kullanicisi "message" bilgisinin "Unauthenticated." oldugunu dogrular