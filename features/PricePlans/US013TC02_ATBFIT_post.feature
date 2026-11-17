@PricePlan
  Feature: Bir yönetici olarak API bağlantısı üzerinden yeni bir course price plan kaydı olusturabilmek istiyorum.
    @US014TC02_ATBFIT_post
    Scenario: Negative -> POST [ADMIN=TRUE],[BODY=FALSE],[webinar_id=true]
    /api/addPricePlan endpoint'ine
    gecerli authorization bilgileri ve
    data icermeyen bir POST request gönderildiginde dönen
    status code'in 422 oldugu ve
    response body'deki message bilgisinin "The title field is required. (and 3 more errors)" oldugu dogrulanmali
      * PricePlans kullanicisi "admin" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/addPricePlan" parametrelerine bos bir POST sorgusu gonderir
      * PricePlans kullanicisi status code degerinin 422 oldugunu dogrular
      * PricePlans kullanicisi "message" bilgisinin "The title field is required. (and 3 more errors)" oldugunu dogrular
      * PricePlans kullanicisi "errors.title[0]" bilgisinin "The title field is required." oldugunu dogrular
      * PricePlans kullanicisi "errors.dateRange[0]" bilgisinin "The date range field is required." oldugunu dogrular
      * PricePlans kullanicisi "errors.discount[0]" bilgisinin "The discount field is required." oldugunu dogrular
      * PricePlans kullanicisi "errors.webinar_id[0]" bilgisinin "The webinar id field is required." oldugunu dogrular
