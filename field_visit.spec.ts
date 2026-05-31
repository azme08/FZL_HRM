import { expect, test } from '@playwright/test';

import {
    clickActionButtonFromFirstRow,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    fillInputByLabel,
    login,
    resetFilter,
    selectDropdown,
    TEST_TIME,
    USER_FIELD,
} from '../utils';

test.describe('Field Visit layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Field Visit Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const target_nevigation = page.getByText('HR', { exact: true }).first();
        await expect(target_nevigation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await target_nevigation.click();
        // Click "Field Visit"
        const target_layout = page.getByText('Field Visit', { exact: true }).first();
        await expect(target_layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await target_layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Field Visit' });
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
        // Employee Input
        await fillFilterInput(filterPanel, 'Fahim Faysal', 0);
        // Press Enter
        await page.keyboard.press('Enter');
        // Status Input
        // Status Input (skip hidden inputs)
        const statusInput = filterPanel.locator('input:not([type="hidden"]):visible').nth(1);
        await expect(statusInput).toBeVisible();
        await statusInput.fill('Approved');
        // Press Enter
        await page.keyboard.press('Enter');
        //close filter panel
        await closeFilterPanel(filterPanel);
        // Reset Filter button
        await resetFilter(filterButton, USER_FIELD.FILTER_BUTTON);
    });
    test('should verify update Field Visit Functionality', async ({ page }) => {
        // Click "HR"
        const target_nevigation = page.getByText('HR', { exact: true }).first();
        await expect(target_nevigation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await target_nevigation.click();
        // Click "Field Visit"
        const target_layout = page.getByText('Field Visit', { exact: true }).first();
        await expect(target_layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await target_layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Field Visit' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });

        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Field Visit page
        const updateTitle = page.getByText('Apply Field Visit', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Employee Dropdown
        await selectDropdown(page, 'Fahim Faysal', '[role="combobox"]:nth(0)');
        // Status Dropdown
        await selectDropdown(page, 'Pending', '[role="combobox"]:nth(1)');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create Field Visit Functionality', async ({ page }) => {
        // Click "HR"
        const target_nevigation = page.getByText('HR', { exact: true }).first();
        await expect(target_nevigation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await target_nevigation.click();
        // Click "Field Visit"
        const target_layout = page.getByText('Field Visit', { exact: true }).first();
        await expect(target_layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await target_layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Field Visit' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);

        // Wait for Update Invoice page
        const updateTitle = page.getByText('Apply Field Visit', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Employee Dropdown
        await selectDropdown(page, 'Fahim Faysal', '[role="combobox"]:nth(0)');
        // Status Dropdown
        //await selectDropdown(page, 'Pending', '[role="combobox"]:nth(1)');
        // Entry time input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        await page.mouse.click(0, 0);
        // Exit time
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        await page.mouse.click(0, 0);
        // Reason input
        await fillInputByLabel(page, /reason/i, 'Test Reason');
        // Location input
        await fillInputByLabel(page, /location/i, 'Test Location');
        // save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
