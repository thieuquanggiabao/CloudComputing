#!/usr/bin/env node

/**
 * 🔑 Zoho OAuth Refresh Token Generator
 * 
 * Cách dùng:
 * node get-refresh-token.js
 * 
 * Rồi nhập Client ID, Client Secret, Authorization Code
 */

import readline from "readline";
import axios from "axios";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (prompt) =>
    new Promise((resolve) => {
        rl.question(prompt, resolve);
    });

async function main() {
    console.log("\n🔑 Zoho OAuth Refresh Token Generator\n");
    console.log("📝 Hãy điền thông tin bạn vừa lấy từ Zoho Developer Console\n");

    const clientId = await question("📌 Client ID: ");
    const clientSecret = await question("📌 Client Secret: ");
    const authCode = await question("📌 Authorization Code: ");

    if (!clientId || !clientSecret || !authCode) {
        console.error("❌ Vui lòng điền đầy đủ thông tin!");
        rl.close();
        return;
    }

    console.log("\n⏳ Đang lấy Refresh Token...\n");

    try {
        const response = await axios.post(
            "https://accounts.zoho.com/oauth/v2/token",
            null,
            {
                params: {
                    client_id: clientId.trim(),
                    client_secret: clientSecret.trim(),
                    code: authCode.trim(),
                    grant_type: "authorization_code",
                    redirect_uri: "http://localhost:5000/callback",
                }
            }
        );

        console.log("✅ Thành công!\n");
        console.log("📋 Lưu thông tin sau vào backend/.env.local:\n");
        console.log("=====================================");
        console.log(
            `ZOHO_CLIENT_ID=${clientId}`
        );
        console.log(
            `ZOHO_CLIENT_SECRET=${clientSecret}`
        );
        console.log(
            `ZOHO_REFRESH_TOKEN=${response.data.refresh_token}`
        );
        console.log("=====================================\n");

        console.log("💾 Hoặc chạy lệnh sau để append vào .env.local:\n");
        console.log(
            `echo "" >> backend/.env.local`
        );
        console.log(
            `echo "ZOHO_CLIENT_ID=${clientId}" >> backend/.env.local`
        );
        console.log(
            `echo "ZOHO_CLIENT_SECRET=${clientSecret}" >> backend/.env.local`
        );
        console.log(
            `echo "ZOHO_REFRESH_TOKEN=${response.data.refresh_token}" >> backend/.env.local`
        );

    } catch (error) {
        console.error("❌ Lỗi:", error.response?.data?.error_description || error.message);
    }

    rl.close();
}

main();
