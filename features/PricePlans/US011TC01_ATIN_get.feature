@PricePlans
Feature: Bir yönetici olarak API bağlantısı üzerinden course price plans'e erişebilmek istiyorum.

  @US011TC01_ATIN_get
  Scenario: Pozitive -> GET [ADMIN=TRUE],[ID=NONE]
  /api/pricePlans endpoint'ine gecerli authorization bilgileri ile
  bir GET request gönderildiginde
  dönen status code'in 200 ve
  response body'deki remark bilgisinin "success" oldugu dogrulanmali.
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
    * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi sorgu sonucunu kayt eder
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular