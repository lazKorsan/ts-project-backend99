@US036TC01_ATIN_get
Feature: Bir yönetici olarak API bağlantısı üzerinden blogs'a erişebilmek istiyorum.

  @US036TC01_ATIN_getTC01
  Scenario: /api/blogs endpoint'ine
  gecerli authorization bilgileri ile
  bir GET request gönderildiginde
  dönen status code'in 200 ve
  response body'deki remark bilgisinin "success" oldugu dogrulanmali.
    * Mars kullanicisi "admin" token ile baseUrl olusturur
    * Mars kullanicisi "api/blogs" path parametrelerini olusturur
    * Mars kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * Mars kullanicisi sorgu sonucunu kayt eder
    * Mars kullanicisi status code degerinin 200 oldugunu dogrular
    * Mars kullanicisi "remark" bilgisinin "success" oldugunu dogrular
