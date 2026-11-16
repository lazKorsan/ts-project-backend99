import {Given} from "@cucumber/cucumber";
import {apiSpec, setUpApi} from "../support/hooks";
import assert from "node:assert/strict";
import {assertJsonKeyValue, assertStatusCode} from "../../utils/API_Methods";

const {JSONPath} = require('jsonpath-plus');

let pathParam: string = '';
let response: any;

Given(/^PricePlans kullanicisi "([^"]*)" token ile baseUrl olusturur$/, async function (userType: string) {
    await setUpApi(userType);
});

Given(/^PricePlans kullanicisi "([^"]*)" path parametrelerini olusturur$/, function (path: string) {
    pathParam = path.startsWith('/') ? path : `/${path}`;
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