@PricePlans
  Feature: Bir yönetici olarak API bağlantısı üzerinden course price plans'e erişebilmek istiyorum.
    @US011TC02_ATID_get
    Scenario: Pozitive -> get,GET [ADMIN=TRUE],[ID=DYNAMIC]
    id(x) olaninin response body'de donen bilgileri
    (creator_id, webinar_id, bundle_id, start_date, end_date, discount, capacity,
    order, created_at, updated_at, deleted_at, title, id, ticket_id, locale, title) doğrulanmalı.
      * PricePlans kullanicisi "admin" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile minID degerini consola yazdirir
      * PricePlans kullanicisi "api/pricePlan/{minID}" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi status code degerinin 200 oldugunu dogrular
      * PricePlans kullanicisi "remark" bilgisinin "success" oldugunu dogrular
      * PricePlans kullanicisi "data.creator_id" bilgisinin 1015 oldugunu dogrular
      * PricePlans kullanicisi "data.webinar_id" bilgisinin 2002 oldugunu dogrular
      * PricePlans kullanicisi "data.start_date" bilgisinin 1751328000 oldugunu dogrular
      * PricePlans kullanicisi "data.end_date" bilgisinin 1782777600 oldugunu dogrular
      * PricePlans kullanicisi "data.discount" bilgisinin 20 oldugunu dogrular
      * PricePlans kullanicisi "data.capacity" bilgisinin 50 oldugunu dogrular
      * PricePlans kullanicisi "data.translations[0].id" bilgisinin 1 oldugunu dogrular
      * PricePlans kullanicisi "data.translations[0].locale" bilgisinin "en" oldugunu dogrular
      * PricePlans kullanicisi "data.bundle_id" bilgisinin (null) oldugunu dogrula
      * PricePlans kullanicisi "data.bundle_id" bilgisinin "null" oldugunu dogrular




