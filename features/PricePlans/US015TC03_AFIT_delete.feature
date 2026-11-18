@PricePlans
  Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan bilgilerini silebilmek istiyorum.
    @US015TC03_AFIT_delete
    Scenario: Negative -> DELETE [ADMIN=TRUE],[ID=TRUE]
    /api/deletePricePlan/{id} endpoint'ine
    gecersiz (invalid token) authorization bilgileri ile
    dogru (id) iceren bir DELETE request gönderildiginde
    dönen status code'in 401 oldugu ve
    response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
      * PricePlans kullanicisi "invalid" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/deletePricePlan/1" path parametrelerini olusturur
      * PricePlans kullanicisi DELETE sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi status code degerinin 401 oldugunu dogrular
      * PricePlans kullanicisi "message" bilgisinin "Unauthenticated." oldugunu dogrular
