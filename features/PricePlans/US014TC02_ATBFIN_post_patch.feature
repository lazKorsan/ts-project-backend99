@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in bilgilerini güncelleyebilmek istiyorum.

  @US014TC02_ATBFIN_post_patch
  Scenario: Negative ->post,PATCH [ADMIN=TRUE],[BODY=FALSE],[ID=DYNAMIC]
  /api/updatePricePlan/{id} endpoint'ine
  gecerli authorization bilgileri ile
  dogru (id) ve data icermeyen bir PATCH request gönderildiginde
  dönen status code'in 203,
  response body'deki remark bilgisinin "failed" ve
  message bilgisinin de "There is no information to update." oldugu dogrulanmali.
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/addPricePlan" parametrelerine gecerli veri ile POST sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Message" bilgisinin "Successfully Added." oldugunu dogrular
    * PricePlans kullanicisi "Added Price Plans ID" degerini konsola yazdırır
    * PricePlans kullanicisi "api/updatePricePlan/{addedPricePlanId}" parametreleri ile bos PATCH sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 203 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "failed" oldugunu dogrular
    * PricePlans kullanicisi "message" bilgisinin "There is no information to update." oldugunu dogrular
