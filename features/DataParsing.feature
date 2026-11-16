@MarsDataParsing
Feature: API Response Data Parsing and Aggregation
  As an admin,
  I want to process the API response from the blogs endpoint,
  So that I can list, extract, and log specific ID metrics (min/max).

  @MarsDataParsingTC01
  Scenario: Successfully parse and extract ID metrics from the blogs response
    * Mars kullanicisi "admin" token ile baseUrl olusturur
    * Mars kullanicisi "api/blogs" path parametrelerini olusturur
    * Mars kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * Mars kullanicisi ID numarlarini "data.blog.id" jsonPathExpression ile listeler
    * Mars kullanicisi "data.blog.id" jsonPathExpression degeri ile minID degerini consola yazdirir
    * Mars kullanicisi "data.blog.id" jsonPathExpression degeri ile maxID degerini consola yazdirir
    * Mars kullanicisi "data.blog.id" jsonPathExpression degeri ile nonExtension degerini consola yazdirir