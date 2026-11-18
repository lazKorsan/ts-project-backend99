@PricePlans
Feature: Bir yönetici olarak API bağlantısı üzerinden yeni bir course price plan kaydı olusturabilmek istiyorum.

  @US013TC01_ATBTIT_post
  Scenario: Pozitive -> Post [ADMIN=TRUE],[BODY=TRUE],[webinar_id=true]
  /api/addPricePlan endpoint'ine gecerli authorization bilgileri ve
  dogru datalar (title, dateRange, discount, capacity, webinar_id) iceren bir POST body gönderildiginde
  dönen status code'in 200,
  response body'deki remark bilgisinin "success" ve
  Message bilgisinin de "Successfully Added." oldugu dogrulanmali.
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/addPricePlan" parametrelerine gecerli veri ile POST sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Message" bilgisinin "Successfully Added." oldugunu dogrular
    * PricePlans kullanicisi "Added Price Plans ID" degerini konsola yazdırır
    * PricePlans kullanicisi "Added Price Plans Title" bilgisinin "Test Price Plans" oldugunu dogrular


