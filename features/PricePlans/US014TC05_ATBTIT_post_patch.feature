@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in bilgilerini güncelleyebilmek istiyorum.

  @US014TC05_ATBTIT_post_patch
  Scenario: Pozitive -> post,PATCH [ADMIN=TRUE],[BODY=TRUE],[ID=TRUE],[webinar_id=true]
  /api/updatePricePlan/{id} endpoint'inden donen response body icindeki
  Updated Price Plans ID bilgisinin /api/updatePricePlan/{id} endpoint'inde yazan id path parametresi ile ayni oldugu dogrulanmali.
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