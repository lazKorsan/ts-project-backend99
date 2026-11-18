@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan bilgilerini silebilmek istiyorum.

  @US015TC02_A1_ATIF_get_delete
  Scenario: Negative -> get,DELETE [ADMIN=TRUE],[ID=FALSE]
  /api/deletePricePlan/{id} endpoint'ine
  gecerli authorization bilgileri ve
  kaydı olmayan bir (id) iceren bir DELETE request gönderildiginde
  dönen status code'in 203,
  response body'deki remark bilgisinin "failed" ve
  message bilgisinin de "There is not ticket for this id." oldugu dogrulanmali
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
    * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile nonExtension degerini consola yazdirir
    * PricePlans kullanicisi "api/deletePricePlan/{nonExistingID}" path parametrelerini olusturur
    * PricePlans kullanicisi DELETE sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi sorgu sonucunu kayt eder
    * PricePlans kullanicisi status code degerinin 203 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "failed" oldugunu dogrular
    * PricePlans kullanicisi "data.message" bilgisinin "There is not ticket for this id." oldugunu dogrular