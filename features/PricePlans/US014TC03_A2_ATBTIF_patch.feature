@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in bilgilerini güncelleyebilmek istiyorum.

  @US014TC03_A2_ATBTIF_patch
  Scenario: Negative ->PATCH [ADMIN=TRUE],[BODY=TRUE],[ID=FALSE],[webinar_id=true]
  (id) icermeyen ve
  dogru datalar (title, dateRange, discount, capacity, webinar_id) iceren bir
  PATCH body gönderildiginde de
  dönen status code'in 203,
  response body'deki remark bilgisinin "failed" ve
  message bilgisinin de "No id" oldugu dogrulanmali.
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/updatePricePlan/" parametreleri ve dogru bilgilerle PATCH sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 203 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "failed" oldugunu dogrular
    * PricePlans kullanicisi "data.message" bilgisinin "No id" oldugunu dogrular