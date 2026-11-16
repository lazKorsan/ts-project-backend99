import { Before, After } from '@cucumber/cucumber';
import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { Authentication } from '../../utils/Authentication';

dotenv.config();

// ANSI Renk Kodları ve Fonksiyonları...
const ANSI_RESET = "\u001B[0m";
const ANSI_RED = "\u001B[31m";
const ANSI_GREEN = "\u001B[32m";
const ANSI_YELLOW = "\u001B[33m";
const ANSI_BLUE = "\u001B[34m";
const ANSI_RED_BOLD = "\u001B[1;31m";
const ANSI_GREEN_BOLD = "\u001B[1;32m";

const red = (text: string) => `${ANSI_RED}${text}${ANSI_RESET}`;
const redBold = (text: string) => `${ANSI_RED_BOLD}${text}${ANSI_RESET}`;
const green = (text: string) => `${ANSI_GREEN}${text}${ANSI_RESET}`;
const greenBold = (text: string) => `${ANSI_GREEN_BOLD}${text}${ANSI_RESET}`;
const blue = (text: string) => `${ANSI_BLUE}${text}${ANSI_RESET}`;
const yellow = (text: string) => `${ANSI_YELLOW}${text}${ANSI_RESET}`;

function formatTokenCount(count: number): string {
    const countStr = String(count);
    if (count <= 27) return redBold(countStr);
    if (count <= 75) return red(countStr);
    if (count <= 125) return green(countStr);
    return greenBold(countStr);
}

export let apiSpec: AxiosInstance;
export let currentToken: string;
let localTestCount = 0;

export async function setUpApi(userType: string = "admin") {
    let token: string;

    if (userType === "admin") {
        token = await Authentication.generateToken();
    } else {
        token = process.env.API_INVALID_TOKEN || "invalid";
    }

    currentToken = token;

    apiSpec = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'PostmanRuntime/7.52.0',
            'x-api-key': process.env.API_X_API_KEY || '1234',
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const firstToken = "30985|Uu9IN8FI9m5eulDoxKc3vh23C1A7R8ELyVfSRrJS";
        const firstTokenId = parseInt(firstToken.split("|")[0], 10);

        if (token && token.includes("|")) {
            const lastTokenId = parseInt(token.split("|")[0], 10);
            const totalTokensInSprint = lastTokenId - firstTokenId;
            localTestCount++;

            console.log(blue("═".repeat(42)));
            console.log(`🔑 ${yellow("İlk  Token ID:")} ${red(String(firstTokenId))}`);
            console.log(`🔑 ${yellow("Son Token ID:")} ${red(String(lastTokenId))}`);
            console.log(`📊 ${yellow("Sprint Boyunca Yapılan Test Sayısı:")} ${redBold(String(totalTokensInSprint))}`);
            console.log(`📊 ${yellow("Locale de Yapılan Test Sayısı:")} ${formatTokenCount(localTestCount)}`);
            console.log(blue("═".repeat(42)));
        } else {
            console.log(blue("═".repeat(42)));
            console.log(`⚠️  ${yellow("Token Bilgisi:")} ${red("Geçerli token üretilmedi veya format uyumsuz (Negatif Test)")}`);
            console.log(blue("═".repeat(42)));
        }
    } catch (error: any) {
        console.log(blue("═".repeat(42)));
        console.log(`⚠️  ${yellow("Token Bilgisi:")} ${red("Token ID ayrıştırılamadı (Negatif Test)")}`);
        console.log(blue("═".repeat(42)));
    }
}

// Otomatik çalışan Before hook'u içinden setUpApi kaldırıldı.
// Artık sadece Feature dosyasındaki adım çağrıldığında 1 kez çalışır.
Before(function () {
    // İsteğe bağlı senaryo başı logları konabilir
});