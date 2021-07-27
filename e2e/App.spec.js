import { by, element, expect, waitFor } from "detox";
import { reloadApp } from "detox-expo-helpers";

/**
 * 
 * @param {*} ms 
 */
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("App Works", () => {
    beforeEach(async () => {
        await reloadApp();
        await timeout(5000);
    });

    it("Logs In", async () => {
        await element(by.id('emailinput')).tap();
        await element(by.id('emailinput')).typeText('placeholder__creds.ca');
        await element(by.id('passwordinput')).tap();
        await element(by.id('passwordinput')).typeText('password');
        await timeout(1000);
        await element(by.id('loginbutton')).tap();
        await element(by.id('loginbutton')).tap();
        await timeout(3000);
        await expect(element(by.id('homescreen'))).toBeVisible();
    });

    it("Navigate To Benefits Card", async () => {
        // Open hamburger Menu
        await element(by.id('hamburger')).tap();
        // Tap on Benefits Card
        await element(by.id('benefitscard')).tap();
        // Expect Benefits Card page
        await timeout(1000);
        await expect(element(by.id('benefitscardpage'))).toBeVisible();
    });

    it("Navigate To Spending Accounts", async () => {
        // Open hamburger Menu
        await element(by.id('hamburger')).tap();
        // Tap on Spending Accounts
        await element(by.id('spendingaccounts')).tap();
        await timeout(1000);
        // Expect Spending Accounts page
        await expect(element(by.id('spendingaccountspage'))).toBeVisible();
    });

    it("Navigate To Claims", async () => {
        // Open hamburger Menu
        await element(by.id('hamburger')).tap();
        // Tap on Claims
        await element(by.id('claims')).tap();
        await timeout(1000);
        // Expect Claims page
        await expect(element(by.id('claimspage'))).toBeVisible();
    });

    it("Navigate To My Usage", async () => {
        // Open hamburger Menu
        await element(by.id('hamburger')).tap();
        await element(by.id('myusage')).tap();
        await timeout(1000);
        // Expect page
        await expect(element(by.id('myusagepage'))).toBeVisible();
    });

    it("Navigate To Plan Coverage", async () => {
        // Open hamburger Menu
        await element(by.id('hamburger')).tap();
        await element(by.id('plancoverage')).tap();
        await timeout(1000);
        // Expect page
        await expect(element(by.id('plancoveragepage'))).toBeVisible();
    });

    it("Navigate To Submit Claim", async () => {
        // Open hamburger Menu
        await element(by.id('hamburger')).tap();
        await element(by.id('submitclaim')).tap();
        await timeout(1000);
        // Expect page
        await expect(element(by.id('submitclaimpage'))).toBeVisible();
    });

    it("Navigate To Help", async () => {
        // Open hamburger Menu
        await element(by.id('hamburger')).tap();
        await element(by.id('help')).tap();
        await timeout(1000);
        // Expect  page
        await expect(element(by.id('helppage'))).toBeVisible();
    });

    it("User Can Navigate to settings page", async () => {
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('settings')).tap();
        await timeout(1000);
        await expect(element(by.id('settingspage'))).toBeVisible();
    });

    it("User Can Navigate to change password page", async () => {  
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('changepassword')).tap();
        await timeout(1000);
        await expect(element(by.id('changepasswordpage'))).toBeVisible();
    });

    it("User Can Navigate to payments page", async () => {  
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('payments')).tap();
        await timeout(1000);
        await expect(element(by.id('paymentspage'))).toBeVisible();
    });

    it("User Can Navigate to dependents page", async () => {  
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('dependents')).tap();
        await timeout(1000);
        await expect(element(by.id('dependentspage'))).toBeVisible();
    });

    it("User Can Navigate to beneficiaries page", async () => {  
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('beneficiaries')).tap();
        await timeout(1000);
        await expect(element(by.id('beneficiariespage'))).toBeVisible();
    });

    it("User Can Navigate to trustee page", async () => {  
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('trustee')).tap();
        await timeout(1000);
        await expect(element(by.id('trusteepage'))).toBeVisible();
    });

    it("User Can Navigate to terms of use page", async () => {  
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('termsofuse')).tap();
        await timeout(1000);
        await expect(element(by.id('termsofusepage'))).toBeVisible();
    });

    it("User Can Navigate to privacy policy page", async () => {  
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('privacypolicy')).tap();
        await timeout(1000);
        await expect(element(by.id('privacypolicypage'))).toBeVisible();
    });

    it("User Can Logout", async () => {
        // Open hamburger Menu
        await element(by.id('profile')).tap();
        await element(by.id('logout')).tap();
        await timeout(1000);
        // Expect  page
        await expect(element(by.id('emailinput'))).toBeVisible();
    });
});