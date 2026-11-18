@PricePlans
  Feature:
    @US015TC04_ATID_get_delete
    Scenario: Pozitive -> get,DELETE [ADMIN=TRUE],[ID=DYNAMIC
    /api/deletePricePlan/{id} endpoint'inden donen response body icindeki
    Deleted Price Plan Id bilgisinin /api/deletePricePlan/{id} endpoint'inde yazan id path parametresi ile ayni oldugu dogrulanmali.
      * PricePlans kullanicisi "admin" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile maxID degerini consola yazdirir
      * PricePlans kullanicisi "api/deletePricePlan/{maxID}" path parametrelerini olusturur
      * PricePlans kullanicisi DELETE sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
      * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
      * PricePlans kullanicisi "Deleted Price Plan Id" degerini konsola yazdırır
      * PricePlans kullanicisi "maxID" degerinin "Deleted Price Plan Id" degerine esit oldugunu dogrular