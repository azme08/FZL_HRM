import { expect, test } from '@playwright/test';

import {
    clickActionButtonFromFirstRow,
    clickNewButton,
    clickSaveOrSubmitButton,
    fillFilterInput,
    fillInputByLabel,
    login,
    selectDropdown,
    TEST_TIME,
} from '../../utils';

test.describe('Apply layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Apply Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Leave"
        const layout = page.getByText('Leave', { exact: true }).nth(0);
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Click "Apply"
        const layout2 = page.getByText('Apply', { exact: true }).first();
        await expect(layout2).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout2.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Apply Leave' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click on filter button after submission
        const filterButton = page
            .getByRole('button', {
                name: 'Filters All Columns',
            })
            .nth(0);
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        // Category Input
        await fillFilterInput(filterPanel, 'Sick Leave', 0);
        await page.keyboard.press('Enter');
        // Employee Input
        await fillFilterInput(filterPanel, 'Fahim Faysal', 1);
        // Status Input
        await fillFilterInput(filterPanel, 'Approved', 2);
    });
    test('should verify Update Apply Form Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Leave"
        const layout = page.getByText('Leave', { exact: true }).nth(0);
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Click "Apply"
        const layout2 = page.getByText('Apply', { exact: true }).first();
        await expect(layout2).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout2.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Apply Leave' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });

        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Leave Application page
        const updateTitle = page.getByText('Leave Application', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Employee Dropdown
        // await selectDropdown(page, 'Naice Molla', '[role="combobox"]:nth(0)');
        // Status Dropdown
        await selectDropdown(page, 'Approved', '[role="combobox"]:nth(1)');
        // Leave Category Dropdown
        await selectDropdown(page, 'Casual Leave', '[role="combobox"]:nth(2)');
        // Type Dropdown
        await selectDropdown(page, 'Half', '[role="combobox"]:nth(3)');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify New Apply Form Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Leave"
        const layout = page.getByText('Leave', { exact: true }).nth(0);
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Click "Apply"
        const layout2 = page.getByText('Apply', { exact: true }).first();
        await expect(layout2).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout2.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Apply Leave' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Wait for Leave Application page
        const updateTitle = page.getByText('Leave Application', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Employee Dropdown
        await selectDropdown(page, 'Naice Molla', '[role="combobox"]:nth(0)');
        // Status Dropdown
        // await selectDropdown(page, 'Approved', '[role="combobox"]:nth(1)');
        // Leave Category Dropdown
        await selectDropdown(page, 'Sick Leave', '[role="combobox"]:nth(2)');
        // Type Dropdown
        await selectDropdown(page, 'Half', '[role="combobox"]:nth(3)');
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
