@PricePlansDataParsing
  Feature: Bir yönetici olarak API bağlantısı üzerinden course price plans'e erişebilmek istiyorum.
    @PricePlansDataParsing_ATIN_get
    Scenario: GET sorgusundan donen ham veriyi islemeklik
      * PricePlans kullanicisi "admin" token ile baseUrl olusturur
      * PricePlans kullanicisi "api/pricePlans" path parametrelerini olusturur
      * PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder
      * PricePlans kullanicisi sorgu sonucunu kayt eder
      * PricePlans kullanicisi ID numarlarini "data.id" jsonPathExpression ile listeler
      * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile minID degerini consola yazdirir
      * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile maxID degerini consola yazdirir
      * PricePlans kullanicisi "data.id" jsonPathExpression degeri ile nonExtension degerini consola yazdirir