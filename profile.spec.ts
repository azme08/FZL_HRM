import { expect, test } from '@playwright/test';

import { clickSaveOrSubmitButton, fillInputByLabel, login, selectDropdown, TEST_TIME } from '../utils';

test.describe('Profile layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'abdullahalazme9955@gmail.com',
            password: '1234',
        });
    });
    test('should verify Profile Dashboard Functionality', async ({ page }) => {
        // Click "Profile"
        const layout = page.getByText('Profile', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // ID Input
        const input = page.locator('input').filter({ hasText: '' }).nth(2);
        await input.fill('200456');
        // Gender Dropdown
        await selectDropdown(page, 'Male', '[role="combobox"]:nth(0)');
        // Primary Display Text
        await fillInputByLabel(page, /primary display text/i, 'Test Text');
        // Secondary Display Text
        await fillInputByLabel(page, /secondary display text/i, 'Test Text 2');
        // RFID Input
        await fillInputByLabel(page, /rfid/i, '1234567890');
        // Card No Input
        await fillInputByLabel(page, /card no/i, '1234567890');
        // Joining Date Input
        await page.locator('[role="gridcell"]').filter({ hasText: '2' }).first().click();
        // Department Dropdown
        await selectDropdown(page, 'SNO', '[role="combobox"]:nth(2)');
        // Sub Department Dropdown
        await selectDropdown(page, 'Compliance', '[role="combobox"]:nth(3)');
        // Designation Dropdown
        await selectDropdown(page, 'Manager', '[role="combobox"]:nth(4)');
        // Employee Type Dropdown
        await selectDropdown(page, 'Permanent', '[role="combobox"]:nth(5)');
        // Line Manager Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(8)');
        // HR Manager Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(9)');
        // Report Position input
        await fillInputByLabel(page, /report position/i, 'Test Position');
        // End Time Input
        await page.locator('[role="gridcell"]').filter({ hasText: '30' }).nth(1).click();
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
        // Check the Heading Scroll
        //await page.getByRole('tab', { name: 'Leave' }).click();
        // Select Option
        // await page.getByText('APPROVER INFORMATION').click();
    });
    test('should verify Approver Information Functionality', async ({ page }) => {
        // Click "Profile"
        const layout = page.getByText('Profile', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Select Option
        await page.getByText('APPROVER INFORMATION').click();
        // First Leave Approver Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(0)');
        // Second Leave Approver Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(1)');
        // First Late Approver Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(2)');
        // Second Late Approver Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(3)');
        // First Manual Entry Approver Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(4)');
        // Second Manual Entry Approver Dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(5)');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify Personal & Contact Info Functionality', async ({ page }) => {
        // Click "Profile"
        const layout = page.getByText('Profile', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Select Option
        await page.getByText('PERSONAL & CONTACT INFO').click();
        // Father's Name Input
        await fillInputByLabel(page, /father's name/i, 'Test Father');
        // Mother's Name Input
        await fillInputByLabel(page, /mother's name/i, 'Test Mother');
        // Blood Group Input
        await fillInputByLabel(page, /blood group/i, 'A+');
        // Date Of Birth Input
        await page.locator('[role="gridcell"]').filter({ hasText: '1' }).first().click();
        // National ID Input
        await fillInputByLabel(page, /national id/i, '12345678901234');
        // Office Phone Input
        await fillInputByLabel(page, /office phone/i, '1234567890');
        // Home Phone Input
        await fillInputByLabel(page, /home phone/i, '1234567890');
        // Personal Phone Input
        await fillInputByLabel(page, /personal phone/i, '1234567890');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify Apply For Leave Functionality', async ({ page }) => {
        // Click "Profile"
        const layout = page.getByText('Profile', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Select Option
        await page.getByText('Apply for Leave').click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'Apply for Leave' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Year Input
        await fillInputByLabel(page, /year/i, '2026');
        // Leave Category Dropdown
        await selectDropdown(page, 'Casual Leave', '[role="combobox"]:nth(10)');
        // Type Dropdown
        await selectDropdown(page, 'Half', '[role="combobox"]:nth(11)');
        // From Date Input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // To Date Input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Reason Input
        await fillInputByLabel(page, /reason/i, 'Test Reason');
        // PDF Input
        const pdfInput2 = page.locator('input[type="file"]').nth(0);
        await pdfInput2.waitFor({ state: 'attached', timeout: 60000 });
        await pdfInput2.setInputFiles('tests/fixtures/test.pdf');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
