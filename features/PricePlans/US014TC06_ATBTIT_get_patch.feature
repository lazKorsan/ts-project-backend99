@PricePlans
  Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course price plan'in bilgilerini güncelleyebilmek istiyorum.

    @US014TC06_ATBTIT_get_patch
    Scenario: Pozitive -> get,PATCH [ADMIN=TRUE],[BODY=TRUE],[ID=DYNAMIC],[webinar_id=true]
    API uzerinden güncellenmek istenen course price plan kaydinin güncellendigi, API uzerinden dogrulanmali.
    (Response body'de dönen Updated Price Plans ID ile /api/pricePlan/{id} endpoint'ine GET request gönderilerek kaydın güncellendiği doğrulanabilir.)
      * PricePlans kullanicisi "admin" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile maxID degerini consola yazdirir
      * PricePlans kullanicisi "api/pricePlan/{maxID}" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
      * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
      * PricePlans kullanicisi "api/updatePricePlan/{maxID}" parametreleri ve dogru bilgilerle PATCH sorgusu gonderir
      * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
      * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
      * PricePlans kullanicisi "Message" bilgisinin "Successfully Updated." oldugunu dogrular
      * PricePlans kullanicisi "Updated Price Plans ID" degerini konsola yazdırır
      * PricePlans kullanicisi "maxID" degerinin "Updated Price Plans ID" degerine esit oldugunu dogrular

