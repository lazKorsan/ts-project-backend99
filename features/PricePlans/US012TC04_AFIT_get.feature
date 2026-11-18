@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in detaylı bilgilerine erisebilmeliyim.

  @US012TC04_AFIT_get
  Scenario: Negative -> GET [ADMIN=FALSE],[ID=TRUE]
  /api/pricePlan/{id} endpoint'ine gecersiz (invalid token) authorization bilgileri ve
  dogru data (id) iceren bir GET request gönderildiginde
  dönen status code'in 401 ve
  response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
    * PricePlans kullanicisi "invalid" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/pricePlan/1" path parametrelerini olusturur
    * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi sorgu sonucunu kayt eder
    * PricePlans kullanicisi status code degerinin 401 oldugunu dogrular
    * PricePlans kullanicisi "message" bilgisinin "Unauthenticated." oldugunu dogrular

