@PricePlans
  Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in detaylı bilgilerine erisebilmeliyim.
    @US012TC03_A2_ATIF_get
    Scenario: Negative -> GET [ADMIN=TRUE], [ID=FALSE]
    (id) icermeyen bir GET request gönderildiginde de
    dönen status code'un 203,
    response body'deki remark bilgisinin "failed" ve
    message bilgisinin de "No id" oldugu dogrulanmali.
      * PricePlans kullanicisi "admin" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/pricePlan/" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi status code degerinin 203 oldugunu dogrular
      * PricePlans kullanicisi "remark" bilgisinin "failed" oldugunu dogrular
      * PricePlans kullanicisi "data.message" bilgisinin "No id" oldugunu dogrular