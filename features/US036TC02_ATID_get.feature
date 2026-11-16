@US036TC02
Feature: Bir yönetici olarak API bağlantısı üzerinden blogs'a erişebilmek istiyorum.

  @US036TC02_ATID_get
  Scenario: id(x) olaninin
  response body'de donen bilgileri (category_id, author_id, slug,
  image, visit_count, enable_comment, status, created_at, updated_at, comments_count) doğrulanmalı.
    * Mars kullanicisi "admin" token ile baseUrl olusturur
    * Mars kullanicisi "api/blogs" path parametrelerini olusturur
    * Mars kullanicisi GET sorgusu gonderir ve yaniti kayt eder
    * Mars kullanicisi ID numarlarini "data.blog.id" jsonPathExpression ile listeler
    * Mars kullanicisi "data.blog.id" jsonPathExpression degeri ile minID degerini consola yazdirir
    * Mars kullanicisi "data.blog.id" jsonPathExpression degeri ile maxID degerini consola yazdirir
    * Mars kullanicisi "data.blog.id" jsonPathExpression degeri ile nonExtension degerini consola yazdirir