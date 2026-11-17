import { JSONPath } from "jsonpath-plus";
import assert from "node:assert/strict";

/**
 * Verilen JSON yanıtı içinden belirtilen path ile ID değerlerini bulur,
 * konsola listeler ve ID dizisini döner.
 */
export function analyzeAndPrintIDs(
    responseData: any,
    modulesName: string,
    jsonPathExpression: string
): number[] {
    const rootArray = responseData?.[modulesName];

    if (!Array.isArray(rootArray) || rootArray.length === 0) {
        console.log(`⚠️  UYARI: "${modulesName}" anahtarı altında dizi bulunamadı veya boş!`);
        return [];
    }

    const localPath = jsonPathExpression.startsWith(`${modulesName}.`)
        ? jsonPathExpression.substring(modulesName.length + 1)
        : jsonPathExpression;

    // JSONPath'ten dönen sonucu any[] olarak zorluyoruz
    const idsResult = JSONPath({
        path: `$..${localPath}`,
        json: rootArray,
        resultType: "value"
    }) as any[];

    const ids: number[] = idsResult
        .map((v: any) => Number(v))
        .filter((n: number) => !isNaN(n));

    console.log("----------------------------------------");
    console.log(`📋 ${modulesName} ID Listesi (${jsonPathExpression}):`);

    rootArray.forEach((item: any, index: number) => {
        // Buradaki JSONPath sonucunu da any[] olarak zorluyoruz
        const itemResult = JSONPath({
            path: `$..${localPath}`,
            json: item,
            resultType: "value"
        }) as any[];

        const id = itemResult[0];
        console.log(`   ${modulesName}[${index}] id: ${id}`);
    });

    console.log("----------------------------------------");
    console.log(`🔢 Toplam ${ids.length} adet ID bulundu.`);

    return ids;
}

/**
 * Verilen JSON yanıtı içinden en büyük ID değerini bulur ve döner.
 */
export function getMaxId(
    responseData: any,
    modulesName: string,
    jsonPathExpression: string
): number | null {
    const ids = extractIds(responseData, modulesName, jsonPathExpression);

    if (ids.length === 0) {
        console.log(`⚠️  getMaxId: ID listesi boş, değer dönülemedi.`);
        return null;
    }

    const maxId = Math.max(...ids);
    console.log(`📈 ${modulesName} | Max ID (${jsonPathExpression}): ${maxId}`);
    return maxId;
}

/**
 * Verilen JSON yanıtı içinden en küçük ID değerini bulur ve döner.
 */
export function getMinId(
    responseData: any,
    modulesName: string,
    jsonPathExpression: string
): number | null {
    const ids = extractIds(responseData, modulesName, jsonPathExpression);

    if (ids.length === 0) {
        console.log(`⚠️  getMinId: ID listesi boş, değer dönülemedi.`);
        return null;
    }

    const minId = Math.min(...ids);
    console.log(`📉 ${modulesName} | Min ID (${jsonPathExpression}): ${minId}`);
    return minId;
}

/**
 * İç yardımcı: Belirtilen modulesName ve jsonPathExpression ile ID listesini çıkarır.
 */
function extractIds(
    responseData: any,
    modulesName: string,
    jsonPathExpression: string
): number[] {
    const rootArray: any = responseData?.[modulesName];
    if (!Array.isArray(rootArray) || rootArray.length === 0) return [];

    const localPath: string = jsonPathExpression.startsWith(`${modulesName}.`)
        ? jsonPathExpression.substring(modulesName.length + 1)
        : jsonPathExpression;

    // JSONPath dönüşünü any[] olarak cast ediyoruz
    const result = JSONPath({
        path: `$..${localPath}`,
        json: rootArray,
        resultType: "value"
    }) as any[];

    return result
        .map((v: any) => Number(v))
        .filter((n: number) => !isNaN(n));
}

// ==========================================
// ASSERTION METODLARI
// ==========================================

/**
 * Gelen değerin beklenen değere eşit olup olmadığını kontrol eder (String).
 * @param actual Gerçek değer
 * @param expected Beklenen değer
 * @param message Hata durumunda ekrana yazılacak özel mesaj (opsiyonel)
 */
export function assertString(actual: any, expected: string, message?: string) {
    try {
        // Gelen değer null/undefined değilse string'e çevirip karşılaştırıyoruz
        const actualStr = actual !== undefined && actual !== null ? String(actual) : actual;
        assert.strictEqual(actualStr, expected);
        console.log(`✅ [ASSERT PASS] String eşleşti: "${actualStr}"`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] String eşleşmedi! Beklenen: "${expected}", Gelen: "${actual}"`);
        throw new Error(message || `String doğrulama hatası: Beklenen "${expected}", Gelen "${actual}"`);
    }
}

/**
 * Gelen değerin beklenen değere eşit olup olmadığını kontrol eder (Number).
 * @param actual Gerçek değer
 * @param expected Beklenen değer
 * @param message Hata durumunda ekrana yazılacak özel mesaj (opsiyonel)
 */
export function assertNumber(actual: any, expected: number, message?: string) {
    try {
        // Gelen değer string ise number'a çeviriyoruz, değilse olduğu gibi alıyoruz
        const actualNum = typeof actual === 'string' ? Number(actual) : actual;
        assert.strictEqual(actualNum, expected);
        console.log(`✅ [ASSERT PASS] Number eşleşti: ${actualNum}`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] Number eşleşmedi! Beklenen: ${expected}, Gelen: ${actual}`);
        throw new Error(message || `Number doğrulama hatası: Beklenen ${expected}, Gelen ${actual}`);
    }
}

/**
 * HTTP Status Code'un beklenen koda eşit olup olmadığını kontrol eder.
 * @param actualStatus Gerçek status kodu (örn: response.status)
 * @param expectedStatus Beklenen status kodu (örn: 200)
 */
export function assertStatusCode(actualStatus: number, expectedStatus: number) {
    try {
        assert.strictEqual(actualStatus, expectedStatus);
        console.log(`✅ [ASSERT PASS] Status Code doğru: ${actualStatus}`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] Status Code hatalı! Beklenen: ${expectedStatus}, Gelen: ${actualStatus}`);
        throw new Error(`Status Code doğrulama hatası: Beklenen ${expectedStatus}, Gelen ${actualStatus}`);
    }
}

/**
 * Gelen değerin "true" veya "false" olup olmadığını kontrol eder (Boolean).
 * @param actual Gerçek değer
 * @param expected Beklenen boolean değer
 */
export function assertBoolean(actual: any, expected: boolean) {
    try {
        const actualBool = typeof actual === 'string' ? actual.toLowerCase() === 'true' : Boolean(actual);
        assert.strictEqual(actualBool, expected);
        console.log(`✅ [ASSERT PASS] Boolean eşleşti: ${actualBool}`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] Boolean eşleşmedi! Beklenen: ${expected}, Gelen: ${actual}`);
        throw new Error(`Boolean doğrulama hatası: Beklenen ${expected}, Gelen ${actual}`);
    }
}

export function assertJsonKeyValue(responseData: any, key: string, expectedValue: any) {
    try {
        const result = (JSONPath as any)({
            path: `$.${key}`,
            json: responseData,
            resultType: "value"
        }) as any[];

        const actualValue = result.length > 0 ? result[0] : undefined;

        // Eğer Feature'dan "null" (string) gelirse, bunu gerçek null'a çevirelim
        const expected = expectedValue === "null" ? null : expectedValue;

        // Hem tip hem değer olarak eşit mi kontrol et (strictEqual kullanıyoruz)
        assert.strictEqual(actualValue, expected);

        console.log(`✅ [ASSERT PASS] JSON Key "${key}" doğru: ${actualValue === null ? 'null' : actualValue}`);
    } catch (error: any) {
        const result = (JSONPath as any)({ path: `$.${key}`, json: responseData, resultType: "value" }) as any[];
        const actualValue = result.length > 0 ? result[0] : undefined;

        console.error(`❌ [ASSERT FAIL] JSON Key "${key}" hatalı! Beklenen: ${expectedValue}, Gelen: ${actualValue}`);
        throw new Error(`JSON Key doğrulama hatası: "${key}" için beklenen ${expectedValue}, gelen ${actualValue}`);
    }
}

/**
 * JSON yanıtı içinden belirli bir key'in değerini çeker ve döner (Doğrulama yapmaz).
 * Boşluklu key'leri ("Added Price Plans ID" gibi) destekler.
 * İlerideki adımlarda kullanılmak üzere (örn: Delete işlemi) değer almak için kullanılır.
 *
 * @param responseData Ham JSON verisi (örn: this.response.data)
 * @param key Aranacak anahtar (örn: "Added Price Plans ID")
 * @returns Bulunan değer (number, string vb.) veya undefined
 */
export function extractJsonValue(responseData: any, key: string): any {
    if (!responseData) return undefined;

    // Eğer direkt key varsa dön (örn: responseData["Added Price Plans ID"])
    if (responseData[key] !== undefined) {
        return responseData[key];
    }

    // Eğer nested bir key ise (örn: "data.id") JSONPath ile bul
    try {
        const result = (JSONPath as any)({
            path: `$.${key}`,
            json: responseData,
            resultType: "value"
        }) as any[];

        return result.length > 0 ? result[0] : undefined;
    } catch (e) {
        return undefined;
    }
}