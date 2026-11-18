@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in bilgilerini güncelleyebilmek istiyorum.

  @US014TC04_AFBTIT_patch
  Scenario: Negative -> PATCH [ADMIN=FALSE],[BODY=TRUE],[ID=TRUE],[webinar_id=true]
  /api/updatePricePlan/{id} endpoint'ine
  gecersiz (invalid token) authorization bilgileri ile
  dogru (id) ve dogru datalar (title, dateRange, discount, capacity, webinar_id) iceren bir
  PATCH body gönderildiginde
  dönen status code'in 401 oldugu ve
  response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
    * PricePlans kullanicisi "invalid" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/updatePricePlan/1" parametreleri ve dogru bilgilerle PATCH sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 401 oldugunu dogrular
    * PricePlans kullanicisi "message" bilgisinin "Unauthenticated." oldugunu dogrular
