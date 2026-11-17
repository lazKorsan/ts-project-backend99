@PricePlans
  Feature: Bir yönetici olarak API bağlantısı üzerinden yeni bir course price plan kaydı olusturabilmek istiyorum.
    @US013TC03_AFBTIT_post
    Scenario: Negative -> POST [ADMIN=FALSE], [BODY=TRUE],[webinar_id=true]
    /api/addPricePlan endpoint'ine gecersiz (invalid token) authorization bilgileri ile
    dogru datalar (title, dateRange, discount, capacity, webinar_id) iceren bir POST body gönderildiginde
    dönen status code'in 401 oldugu ve
    response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
      * PricePlans kullanicisi "invalid" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/addPricePlan" parametrelerine gecerli veri ile POST sorgusu gonderir
      * PricePlans kullanicisi status code degerinin 401 oldugunu dogrular
      * PricePlans kullanicisi "message" bilgisinin "Unauthenticated." oldugunu dogrular
