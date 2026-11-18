@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in bilgilerini güncelleyebilmek istiyorum.

  @US014TC03_A1_ATBTIF_post_patch
  Scenario: Negative ->get,PATCH [ADMIN=TRUE],[ID=nonExisting],[BODY=TRUE],[webinar_id=true]
  /api/updatePricePlan/{id} endpoint'ine gecerli authorization bilgileri ile
  kaydı olmayan bir (id) ve dogru datalar (title, dateRange, discount, capacity, webinar_id) iceren bir
  PATCH body gönderildiginde
  dönen status code'in 203,
  response body'deki remark bilgisinin "failed" ve
  message bilgisinin de "There is not ticket for this id." oldugu dogrulanabilmeli
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
    * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile nonExtension degerini consola yazdirir
    * PricePlans kullanicisi "api/updatePricePlan/{nonExistingID}" parametreleri ve dogru bilgilerle PATCH sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 203 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "failed" oldugunu dogrular
    * PricePlans kullanicisi "data.message" bilgisinin "There is not ticket for this id." oldugunu dogrular




