import axios from 'axios';
import dotenv from 'dotenv';

// .env dosyasındaki değişkenleri yükle
dotenv.config();

export class Authentication {

    /**
     * Admin kullanıcı bilgileri ile /api/token endpoint'ine POST isteği atarak token alır.
     * @returns Bearer/Access Token string değerini döndürür.
     */
    public static async generateToken(): Promise<string> {
        // .env ortam değişkenlerinden konfigürasyonu al
        const baseUrl = process.env.API_BASE_URL;
        const email = process.env.API_ADMIN_EMAIL;
        const password = process.env.API_ADMIN_PASSWORD;
        const apiKey = process.env.API_X_API_KEY;

        // İstek gövdesi (Request Body)
        const reqBody = {
            email: email,
            password: password
        };

        try {
            // Axios ile POST isteği gönder
            const response = await axios.post(`${baseUrl}/api/token`, reqBody, {
                headers: {
                    'User-Agent': 'PostmanRuntime/7.52.0',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-api-key': apiKey
                }
            });

            // DEBUG: Konsol çıktıları
            console.log(`Status Code: ${response.status}`);
            console.log('Response Body:', response.data);

            // Status Code kontrolü
            if (response.status !== 200) {
                throw new Error(`Token alınamadı! Status Code: ${response.status}, Response: ${JSON.stringify(response.data)}`);
            }

            // Response içerisinden access_token değerini al
            const token = response.data?.data?.access_token;

            if (!token) {
                throw new Error('Yanıt alındı ancak "data.access_token" alanı bulunamadı!');
            }

            console.log(`Token : ${token}`);
            return token;

        } catch (error: any) {
            // Axios hata yakalama yönetimi
            if (error.response) {
                console.error(`Token alma hatası! Status Code: ${error.response.status}`);
                console.error('Hata Detayı:', error.response.data);
            } else {
                console.error('İstek gönderilirken bağlantı hatası oluştu:', error.message);
            }
            throw error;
        }
    }
}