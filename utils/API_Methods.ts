import { JSONPath } from "jsonpath-plus";

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