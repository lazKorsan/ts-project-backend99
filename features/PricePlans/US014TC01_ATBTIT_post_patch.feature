@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in bilgilerini güncelleyebilmek istiyorum.

  @US014TC01_ATBTIT_post_patch
  Scenario: Pozitive -> post,PATCH  [ADMIN=TRUE],[BODY=TRUE],[ID=DYNAMIC],[webinar_id=true]
  /api/updatePricePlan/{id} endpoint'ine
  gecerli authorization bilgileri ile
  dogru (id) ve dogru datalar (title, dateRange, discount, capacity, webinar_id) iceren bir
  PATCH body gönderildiginde dönen
  status code'in 200,
  response body'deki remark bilgisinin "success" ve
  Message bilgisinin de "Successfully Updated." oldugu dogrulanmali.
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/addPricePlan" parametrelerine gecerli veri ile POST sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Message" bilgisinin "Successfully Added." oldugunu dogrular
    * PricePlans kullanicisi "Added Price Plans ID" degerini konsola yazdırır
    * PricePlans kullanicisi "api/updatePricePlan/{addedPricePlanId}" parametreleri ve dogru bilgilerle PATCH sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Message" bilgisinin "Successfully Updated." oldugunu dogrular
    * PricePlans kullanicisi "Updated Price Plans ID" degerini konsola yazdırır
    * PricePlans kullanicisi "Added Price Plans ID" degerinin "Updated Price Plans ID" degerine esit oldugunu dogrular


