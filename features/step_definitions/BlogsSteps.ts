import {Given} from "@cucumber/cucumber";

import {apiSpec} from '../support/hooks'
import {setUpApi} from "../support/hooks";
import assert from "node:assert/strict";

const {JSONPath} = require('jsonpath-plus');

let pathParam: string = '';
let response: any;

Given(/^Mars kullanicisi "([^"]*)" token ile baseUrl olusturur$/, async function (userType: string) {
// "admin" veya "invalid" değerini hooks.ts içindeki setUpApi metoduna gönderiyoruz
    await setUpApi(userType);
});

Given(/^Mars kullanicisi "([^"]*)" path parametrelerini olusturur$/, function (path: string) {
    // Gelen path bilgisini (örn: "api/blogs") değişkene atıyoruz
    // Başına '/' ekleme durumunu kontrol ederek temizliyoruz
    pathParam = path.startsWith('/') ? path : `/${path}`;
    console.log(`📌 Oluşturulan Path Parametresi: ${pathParam}`);
});

Given(/^Mars kullanicisi GET sorgusu gonderir ve yaniti kayt eder$/, async function () {
    try {
        // hooks.ts içindeki apiSpec (BaseURL, Header ve Token hazır olan Axios nesnesi) ile isteği atıyoruz
        response = await apiSpec.get(pathParam);

        // Dönen yanıtı Cucumber'ın senaryo hafızasında (this) saklayabiliriz
        this.response = response;

        console.log(`✅ GET İsteği Başarılı | Status Code: ${response.status}`);
        //console.log('📄 Response Data:', response.data);
        //console.log('📄 Response Data:', JSON.stringify(response.data, null, 2));
        //console.dir(response.data, {depth: null, colors: true});
    } catch (error: any) {
        // Hata durumunda (4xx veya 5xx) hatayı yakalayıp response'u kaydediyoruz
        response = error.response;
        this.response = response;
        console.error(`❌ GET İsteği Hata Aldı | Status Code: ${response?.status}`);
    }
});

Given(/^Mars kullanicisi ID numarlarini "([^"]*)" jsonPathExpression ile listeler$/, async function (jsonPathExpression) {

    // 1. Zaten kaydedilmiş olan yanıtı hafızadan alıyoruz
    const responseData = this.response?.data || this.response;

    // 2. Yanıtın içindeki blog dizisine ulaşıyoruz
    const blogs: Array<{ id: number }> = responseData?.data?.blog || [];

    if (blogs.length === 0) {
        console.log("UYARI: Kaydedilen yanıtta blog dizisi bulunamadı veya boş!");
        return;
    }

    // 3. ID'leri konsola yazdırıyoruz
    console.log("----------------------------------------");
    console.log(`US36_preCondition_IDList - ${jsonPathExpression} değerleri:`);

    blogs.forEach((blog, index) => {
        console.log(`Blog[${index}] id: ${blog.id}`);
    });

    console.log("----------------------------------------");

    // 4. Sonraki min/max adımları kolayca kullanabilsin diye ID listesini saklıyoruz
    this.idList = blogs.map(blog => Number(blog.id));

});
Given(/^Mars kullanicisi "([^"]*)" jsonPathExpression degeri ile minID degerini consola yazdirir$/, async function (jsonPathExpression: string) {
    const idList: number[] = this.idList || (this.response?.data?.blog || []).map((b: any) => Number(b.id));
    this.minID = Math.min(...idList);
    const minID = Math.min(...idList);

    console.log(`Path: ${jsonPathExpression} | Min Blog ID: ${minID}`);
});
Given(/^Mars kullanicisi "([^"]*)" jsonPathExpression degeri ile maxID degerini consola yazdirir$/, async function (jsonPathExpression: string) {
    const idList: number[] = this.idList || (this.response?.data?.blog || []).map((b: any) => Number(b.id));
    this.maxID = Math.max(...idList);
    const maxID = Math.max(...idList);

    console.log(`Path: ${jsonPathExpression} | Max Blog ID: ${maxID}`);
});
Given(/^Mars kullanicisi "([^"]*)" jsonPathExpression degeri ile nonExtension degerini consola yazdirir$/, async function (jsonPathExpression: string) {
    const idList: number[] = this.idList || (this.response?.data?.blog || []).map((b: any) => Number(b.id));

    this.maxID = Math.max(...idList);
    this.nonExistingID = this.maxID + 5;

    const maxID = Math.max(...idList);
    const nonExistingID = maxID + 5;

    console.log(`Path: ${jsonPathExpression} | Non-Existing ID (Max + 5): ${nonExistingID}`);
});
Given(/^Mars kullanicisi status code degerinin (\d+) oldugunu dogrular$/, async function (statusCode: number) {

    assert.equal(this.response.status, Number(statusCode));


});
Given(/^Mars kullanicisi "([^"]*)" bilgisinin "([^"]*)" oldugunu dogrular$/, async function (key: string, expectedValue: string) {

    assert.equal(this.response.data?.[key], expectedValue);

});

Given('Mars kullanicisi sorgu sonucunu kayt eder', function () {
    console.dir(response.data, {depth: null, colors: true});
});
