@PricePlans
  Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in detaylı bilgilerine erisebilmeliyim.
    @US012TC01_ATID_get
    Scenario: Pozitive -> get,GET [ADMIN=TRUE],[ID=DYNAMIC]
    /api/pricePlan/{id} endpoint'ine gecerli
    authorization bilgileri ve dogru data (id) iceren bir
    GET request gönderildiginde
    dönen status code'in 200 ve
    response body'deki remark bilgisinin "success" oldugu dogrulanmali.
      * PricePlans kullanicisi "admin" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile minID degerini consola yazdirir
      * PricePlans kullanicisi "api/pricePlan/{minID}" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
      * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular