export class PricePlansTestData {

    // ==========================================
    // BODY / PAYLOAD DATALARI
    // ==========================================

    /**
     * Başarılı POST ve PATCH işlemleri için geçerli bir gövde (body).
     */
    static get validBody() {
        return {
            "title": "Test Price Plans",
            "dateRange": "2024-06-01 - 2024-06-30",
            "discount": 20,
            "capacity": 50,
            "webinar_id": 2002
        };
    }

    /**
     * PATCH işlemleri için güncellenmiş (update) gövde.
     */
    static get updatedBody() {
        return {
            "title": "Test Price Plans Updated",
            "dateRange": "2024-06-01 - 2024-06-30",
            "discount": 20,
            "capacity": 50,
            "webinar_id": 2002
        };
    }

    /**
     * Boş gövde (body) senaryoları için.
     */
    static get emptyBody() {
        return {};
    }

    // ==========================================
    // ID ve DIGER DEGISKENLER
    // ==========================================

    /**
     * Geçerli bir Price Plan ID'si.
     * (Not: Gerçek bir testte bu ID'nin dinamik gelmesi gerekebilir.
     * Şimdilik cURL'den aldığımız örnek bir ID koyuyoruz.)
     */
    static get validPricePlanId() {
        return 197;
    }

    /**
     * Var olmayan (Non-existing) bir Price Plan ID'si.
     */
    static get nonExistingPricePlanId() {
        return 14256;
    }

    /**
     * Yetkisiz işlemler için geçersiz token veya api-key.
     * (Eğer header'da kullanıyorsan diye ekliyorum.)
     */
    static get invalidApiKey() {
        return "invalid_api_key_123";
    }
}