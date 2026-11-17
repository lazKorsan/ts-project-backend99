@PricePlans
Feature: Bir yönetici olarak API bağlantısı üzerinden yeni bir course price plan kaydı olusturabilmek istiyorum.

  @US013TC04_A1_ATBTIT_post_getTC01
  Scenario: Pozitive ->POST,GET [ADMIN=TRUE],[BODY=TRUE],[webinar_id=true]
  API uzerinden olusturulmak istenen yeni course price plan kaydinin olustugu API uzerinden dogrulanmali.
  (Response bodyde dönen Added Price Plans ID ile /api/pricePlan/{id} endpoint'ine GET request gönderilerek kayıt oluşturulduğu doğrulanabilir.)
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/addPricePlan" parametrelerine gecerli veri ile POST sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Message" bilgisinin "Successfully Added." oldugunu dogrular
    * PricePlans kullanicisi "Added Price Plans ID" degerini konsola yazdırır
    * PricePlans kullanicisi "api/pricePlan/{addedPricePlanId}" path parametrelerini olusturur
    * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular





