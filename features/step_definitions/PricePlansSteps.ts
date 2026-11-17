import {Given} from "@cucumber/cucumber";
import {apiSpec, setUpApi} from "../support/hooks";
import assert from "node:assert/strict";
import {assertJsonKeyValue, assertStatusCode, extractJsonValue} from "../../utils/API_Methods";
import {PricePlansTestData} from "../../utils/PricePlansTestData";
import path = require("node:path");


const {JSONPath} = require('jsonpath-plus');

let pathParam: string = '';
let response: any;

Given(/^PricePlans kullanicisi "([^"]*)" token ile baseUrl olusturur$/, async function (userType: string) {
    await setUpApi(userType);
});
//  * PricePlans kullanicisi "api/pricePlan/{nonExtensionsID}" path parametrelerini olusturur
Given(/^PricePlans kullanicisi "([^"]*)" path parametrelerini olusturur$/, function (path: string) {
    let resolvedPath = path
        .replace(/{minID}/gi, String(this.minID))
        .replace(/{maxID}/gi, String(this.maxID))
        .replace(/{nonExtensionsID}/gi, String(this.nonExistingID))  // s'li versiyon
        .replace(/{nonExistingID}/gi, String(this.nonExistingID))    // s'siz versiyon (senin feature'da kullandığın)
        .replace(/{addedPricePlanId}/gi, String(this.addedPricePlanId))
        .replace(/{updatedPricePlanId}/gi, String(this.updatedPricePlanId))
        .replace(/{deletedPricePlanId}/gi, String(this.deletedPricePlanId));

    if (resolvedPath.includes('undefined')) {
        throw new Error(`❌ HATA: Path içindeki placeholder değeri bulunamadı! Gelen Path: ${path}. Lütfen önceki adımların çalıştığından emin olun.`);
    }

    pathParam = resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`;
    console.log(`📌 Oluşturulan Path Parametresi: ${pathParam}`);
});

Given(/^PricePlans kullanicisi GET sorgusu gonderir ve yaniti kayt eder$/, async function () {
    try {
        response = await apiSpec.get(pathParam);
        this.response = response;
        console.log(`✅ GET İsteği Başarılı | Status Code: ${response.status}`);
    } catch (error: any) {
        response = error.response;
        this.response = response;
        console.error(`❌ GET İsteği Hata Aldı | Status Code: ${response?.status}`);
    }
});

Given(/^PricePlans kullanicisi ID numarlarini "([^"]*)" jsonPathExpression ile listeler$/, async function (jsonPathExpression) {
    // DİKKAT: data direkt dizi, o yüzden data?.pricePlans değil sadece data
    const responseData = this.response?.data || this.response;
    const pricePlans: Array<{ id: number }> = responseData?.data || [];

    if (!pricePlans || pricePlans.length === 0) {
        console.log("UYARI: Kaydedilen yanıtta Price Plans dizisi bulunamadı veya boş!");
        return;
    }

    console.log("----------------------------------------");
    console.log(`preCondition PricePlans ID List - ${jsonPathExpression} değerleri:`);

    pricePlans.forEach((plan, index) => {
        console.log(`PricePlans[${index}] id: ${plan.id}`);
    });

    console.log("----------------------------------------");

    // ID listesini sakla
    this.idList = pricePlans.map(plan => Number(plan.id));
});

Given(/^PricePlans kullanicisi "([^"]*)" jsonPathExpression degeri ile minID degerini consola yazdirir$/, async function (jsonPathExpression: string) {
    // DİKKAT: Fallback olarak data?.pricePlans yerine sadece data kullan
    const idList: number[] = this.idList || (this.response?.data?.data || []).map((b: any) => Number(b.id));
    this.minID = Math.min(...idList);

    console.log(`Path: ${jsonPathExpression} | Min PricePlans ID: ${this.minID}`);
});

Given(/^PricePlans kullanicisi "([^"]*)" jsonPathExpression degeri ile maxID degerini consola yazdirir$/, async function (jsonPathExpression: string) {
    const idList: number[] = this.idList || (this.response?.data?.data || []).map((b: any) => Number(b.id));
    this.maxID = Math.max(...idList);

    console.log(`Path: ${jsonPathExpression} | Max Price Plans ID: ${this.maxID}`);
});

Given(/^PricePlans kullanicisi "([^"]*)" jsonPathExpression degeri ile nonExtension degerini consola yazdirir$/, async function (jsonPathExpression: string) {
    // DİKKAT: data?.blog yerine data?.data kullanıldı
    const idList: number[] = this.idList || (this.response?.data?.data || []).map((b: any) => Number(b.id));

    this.maxID = Math.max(...idList);
    this.nonExistingID = this.maxID + 5;

    console.log(`Path: ${jsonPathExpression} | Non-Existing ID (Max + 5): ${this.nonExistingID}`);
});

Given(/^PricePlans kullanicisi status code degerinin (\d+) oldugunu dogrular$/, async function (statusCode: number) {
    assertStatusCode(this.response.status, Number(statusCode));
});

Given(/^PricePlans kullanicisi "([^"]*)" bilgisinin "([^"]*)" oldugunu dogrular$/, async function (key: string, expectedValue: string) {
    assertJsonKeyValue(this.response.data, key, expectedValue);
});

Given('PricePlans kullanicisi sorgu sonucunu kayt eder', function () {
    console.dir(response.data, {depth: null, colors: true});
});
Given(/^PricePlans kullanicisi "([^"]*)" bilgisinin (\d+) oldugunu dogrular$/, async function (key: string, expectedValue: string) {
    assertJsonKeyValue(this.response.data, key, expectedValue);
});
Given(/^PricePlans kullanicisi "([^"]*)" bilgisinin \(null\) oldugunu dogrula$/, async function (key: string) {
    const {JSONPath} = require('jsonpath-plus');

    const result = JSONPath({path: `$.${key}`, json: this.response.data, resultType: "value"});
    const actualValue = result.length > 0 ? result[0] : undefined;

    assert.strictEqual(actualValue, null, `Beklenen null, gelen: ${actualValue}`);
    console.log(`✅ [ASSERT PASS] JSON Key "${key}" başarıyla null olarak doğrulandı.`);
});
Given(/^PricePlans kullanicisi "([^"]*)" parametrelerine gecerli veri ile POST sorgusu gonderir$/, async function (path: string) {

    const url = path.startsWith('/') ? path : `/${path}`;

    try {
        const payload = PricePlansTestData.validBody;
        const response = await apiSpec.post(url, payload);
        console.dir(response.data, {depth: null, colors: true});
        this.response = response;

        console.log(`✅ POST İsteği Başarılı | Status Code: ${response.status}`);
    } catch (error: any) {
        this.response = error.response;
        console.error(`❌ POST İsteği Hata Aldı | Status Code: ${this.response?.status}`);

    }
});
//  * PricePlans kullanicisi "Updated Price Plans ID" degerini konsola yazdırır
Given(/^PricePlans kullanicisi "([^"]*)" degerini konsola yazdırır$/, async function (key: string) {

    // 1. Değeri çek
    const value = extractJsonValue(this.response.data, key);

    if (value === undefined) {
        throw new Error(`❌ HATA: "${key}" anahtarı yanıtta bulunamadı! Yanıt: ${JSON.stringify(this.response.data)}`);
    }

    console.log(`📌 ${key}: ${value}`);

    // 2. Dinamik Hafıza Kaydı (Key ismine göre this'e atama yapıyoruz)
    // "Added Price Plans ID" -> this.addedPricePlanId
    // "Updated Price Plans ID" -> this.updatedPricePlanId
    // "Deleted Price Plan Id" -> this.deletedPricePlanId

    if (key.toLowerCase().includes("id")) {
        // Başlığı temizleyip camelCase'e çeviriyoruz (Örn: "Added Price Plans ID" -> "addedPricePlansId")
        // Ancak senin daha önce kullandığın isimlerle uyumlu olması için manuel eşleştirme yapalım:

        let memoryKeyName = "";
        if (key === "Added Price Plans ID") memoryKeyName = "addedPricePlanId";
        else if (key === "Updated Price Plans ID") memoryKeyName = "updatedPricePlanId";
        else if (key === "Deleted Price Plan Id") memoryKeyName = "deletedPricePlanId";
        else memoryKeyName = "dynamic_" + key.replace(/\s+/g, '_').toLowerCase(); // Diğerleri için fallback

        this[memoryKeyName] = Number(value); // Number olarak kaydediyoruz
        console.log(`💾 Hafızaya kaydedildi -> this.${memoryKeyName} = ${this[memoryKeyName]}`);
    }


});
Given(/^PricePlans kullanicisi "([^"]*)" parametrelerine bos bir POST sorgusu gonderir$/, async function (path: string) {

    const url = path.startsWith('/') ? path : `/${path}`;

    try {
        const payload = PricePlansTestData.emptyBody;
        const response = await apiSpec.post(url, payload);
        console.dir(response.data, {depth: null, colors: true});
        this.response = response;

        console.log(`✅ POST İsteği Başarılı | Status Code: ${response.status}`);
    } catch (error: any) {
        this.response = error.response;
        console.error(`❌ POST İsteği Hata Aldı | Status Code: ${this.response?.status}`);

    }

});
// * PricePlans kullanicisi "Added Price Plans ID" degerinin "Updated Price Plans ID" degerine esit oldugunu dogrular
Given(/^PricePlans kullanicisi "([^"]*)" degerinin "([^"]*)" degerine esit oldugunu dogrular$/, async function (actualKey: string, expectedKey: string) {

    // 1. Hafızadaki değişkenlerin sözlüğü (Genişletildi)
    const memoryVariables: Record<string, any> = {
        "Added Price Plans ID": this.addedPricePlanId,
        "Updated Price Plans ID": this.updatedPricePlanId, // Yeni eklendi
        "Deleted Price Plan Id": this.deletedPricePlanId,  // Yeni eklendi
        "maxID": this.maxID,
        "minID": this.minID,
        "nonExtensionsID": this.nonExistingID
    };

    // 2. Değerleri al
    const actualValue = memoryVariables[actualKey];
    const expectedValue = memoryVariables[expectedKey];

    // 3. Hafızada var mı kontrolü
    if (actualValue === undefined) {
        throw new Error(`❌ HATA: "${actualKey}" değeri hafızada bulunamadı! Lütfen önceki adımların çalıştığından emin olun.`);
    }
    if (expectedValue === undefined) {
        throw new Error(`❌ HATA: "${expectedKey}" değeri hafızada bulunamadı! Lütfen önceki adımların çalıştığından emin olun.`);
    }

    // 4. Karşılaştırma
    assert.strictEqual(
        Number(actualValue),
        Number(expectedValue),
        `❌ HATA: "${actualKey}" (${actualValue}) ile "${expectedKey}" (${expectedValue}) eşleşmiyor!`
    );

    console.log(`✅ [ASSERT PASS] "${actualKey}" (${actualValue}) değeri, "${expectedKey}" (${expectedValue}) değerine eşit.`);
});
Given(/^PricePlans kullanicisi "([^"]*)" parametreleri ve dogru bilgilerle PATCH sorgusu gonderir$/, async function (path: string) {

    // Gelen path içindeki {placeholder} ifadelerini this'teki değerlerle değiştiriyoruz
    let resolvedPath = path
        .replace(/{minID}/g, String(this.minID))
        .replace(/{maxID}/g, String(this.maxID))
        .replace(/{nonExtensionsID}/g, String(this.nonExistingID))
        .replace(/{addedPricePlanId}/g, String(this.addedPricePlanId)); //
    // Not: Yukarıdaki adımda nonExtension değerini this.nonExistingID olarak kaydetmiştik.

    // Eğer değişkenlerden biri henüz set edilmemişse (undefined), hata vermesini engellemek için kontrol edebiliriz
    if (resolvedPath.includes('undefined')) {
        throw new Error(`❌ HATA: Path içindeki placeholder değeri bulunamadı! Lütfen önceki adımların çalıştığından emin olun. Gelen Path: ${path}`);
    }

    // Başına '/' ekleme kontrolü
    pathParam = resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`;

    console.log(`📌 Oluşturulan Path Parametresi: ${pathParam}`);



    try {
        const payload = PricePlansTestData.updatedBody;
        const response = await apiSpec.patch(resolvedPath, payload);
        console.dir(response.data, {depth: null, colors: true});
        this.response = response;

        console.log(`✅ PATCH İsteği Başarılı | Status Code: ${response.status}`);
    } catch (error: any) {
        this.response = error.response;
        console.error(`❌ PATCH İsteği Hata Aldı | Status Code: ${this.response?.status}`);

    }

});
Given(/^PricePlans kullanicisi "([^"]*)" parametreleri ile bos PATCH sorgusu gonderir$/, async function (path: string) {

    // Gelen path içindeki {placeholder} ifadelerini this'teki değerlerle değiştiriyoruz
    let resolvedPath = path
        .replace(/{minID}/g, String(this.minID))
        .replace(/{maxID}/g, String(this.maxID))
        .replace(/{nonExtensionsID}/g, String(this.nonExistingID))
        .replace(/{addedPricePlanId}/g, String(this.addedPricePlanId)); //
    // Not: Yukarıdaki adımda nonExtension değerini this.nonExistingID olarak kaydetmiştik.

    // Eğer değişkenlerden biri henüz set edilmemişse (undefined), hata vermesini engellemek için kontrol edebiliriz
    if (resolvedPath.includes('undefined')) {
        throw new Error(`❌ HATA: Path içindeki placeholder değeri bulunamadı! Lütfen önceki adımların çalıştığından emin olun. Gelen Path: ${path}`);
    }

    // Başına '/' ekleme kontrolü
    pathParam = resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`;

    console.log(`📌 Oluşturulan Path Parametresi: ${pathParam}`);



    try {
        const payload = PricePlansTestData.emptyBody;
        const response = await apiSpec.patch(resolvedPath, payload);
        console.dir(response.data, {depth: null, colors: true});
        this.response = response;

        console.log(`✅ PATCH İsteği Başarılı | Status Code: ${response.status}`);
    } catch (error: any) {
        this.response = error.response;
        console.error(`❌ PATCH İsteği Hata Aldı | Status Code: ${this.response?.status}`);

    }

});