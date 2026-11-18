@PricePlans
Feature: Bir yonetici olarak pricepalns olusturabilmeli ve silebilmeliyim

  @zzz_C_R_U_D_
  Scenario: Pozitive -> POST,GET,PATCH,DELETE [ADMIN=TRUE],[ID=TRUE],[BODY=TRUE],[webinar_id=true]
  Bu senaryo, bir Price Plan kaydının uçtan uca (End-to-End) yaşam döngüsünü doğrular.
  1. Ekleme: /api/addPricePlan endpoint'ine geçerli verilerle POST isteği atılır.
  2. Okuma: Dönen ID ile /api/pricePlan/{id} endpoint'inden kayıt çekilir ve maxID ile eşleştiği doğrulanır.
  3. Güncelleme: /api/updatePricePlan/{id} endpoint'ine PATCH isteği atılır ve dönen ID'nin aynı olduğu doğrulanır.
  4. Silme: /api/deletePricePlan/{id} endpoint'ine DELETE isteği atılır ve silinen ID'nin aynı olduğu doğrulanır.
    * PricePlans kullanicisi "admin" token ile baseUrl olusturur
    * PricePlans kullanicisi "api/addPricePlan" parametrelerine gecerli veri ile POST sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Message" bilgisinin "Successfully Added." oldugunu dogrular
    * PricePlans kullanicisi "Added Price Plans ID" degerini konsola yazdırır
    * PricePlans kullanicisi "api/pricePlan/{addedPricePlanId}" path parametrelerini olusturur
    * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi sorgu sonucunu kayt eder
    * PricePlans kullanicisi "data.creator_id" bilgisinin 1918 oldugunu dogrular
    * PricePlans kullanicisi "data.webinar_id" bilgisinin 2002 oldugunu dogrular
    * PricePlans kullanicisi "data.start_date" bilgisinin 1717200000 oldugunu dogrular
    * PricePlans kullanicisi "data.end_date" bilgisinin 1719705600 oldugunu dogrular
    * PricePlans kullanicisi "data.discount" bilgisinin 20 oldugunu dogrular
    * PricePlans kullanicisi "data.capacity" bilgisinin 50 oldugunu dogrular
    * PricePlans kullanicisi "data.translations[0].locale" bilgisinin "en" oldugunu dogrular
    * PricePlans kullanicisi "data.translations[0].title" bilgisinin "Test Price Plans" oldugunu dogrular
    * PricePlans kullanicisi "api/updatePricePlan/{addedPricePlanId}" parametreleri ve dogru bilgilerle PATCH sorgusu gonderir
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Message" bilgisinin "Successfully Updated." oldugunu dogrular
    * PricePlans kullanicisi "Updated Price Plans ID" degerini konsola yazdırır
    * PricePlans kullanicisi "Added Price Plans ID" degerinin "Updated Price Plans ID" degerine esit oldugunu dogrular
    * PricePlans kullanicisi "api/deletePricePlan/{addedPricePlanId}" path parametrelerini olusturur
    * PricePlans kullanicisi DELETE sorgusu gonderir ve yaniti kayt eder
    * PricePlans kullanicisi sorgu sonucunu kayt eder
    * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
    * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * PricePlans kullanicisi "Deleted Price Plan Id" degerini konsola yazdırır
    * PricePlans kullanicisi "Added Price Plans ID" degerinin "Deleted Price Plan Id" degerine esit oldugunu dogrular




