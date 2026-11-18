@PricePlans
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan bilgilerini silebilmek istiyorum.

  @US015TC02_A2_ATIF_delete
  Scenario: Negative -> DELETE [ADMIN=TRUE],[ID=FALSE]
  (id) icermeyen bir DELETE request gönderildiginde de
  dönen status code'in 203,
  response body'deki remark bilgisinin "failed" ve
  message bilgisinin de "No id" oldugu dogrulanmali.
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/deletePricePlan/" path parametrelerini olusturur
    * PricePlans kullanicisi DELETE sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi sorgu sonucunu kayt eder
    * PricePlans kullanicisi status code degerinin 203 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "failed" oldugunu dogrular
    * PricePlans kullanicisi "data.message" bilgisinin "No id" oldugunu dogrular
