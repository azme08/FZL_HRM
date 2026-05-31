import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
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
    toggleColumnAndActions,
    USER_FIELD,
} from '../../utils';

test.describe('Fiscal Year layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Fiscal Year Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Fiscal Year"
        const layout = page.getByText('Fiscal Year', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Fiscal Year' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        //  Year Input
        await fillFilterInput(filterPanel, '2023', 0);
        // From month Input
        await fillFilterInput(filterPanel, 'February ', 1);
        // To month Input
        await fillFilterInput(filterPanel, 'February ', 2);
        // Challan Info Input
        await fillFilterInput(filterPanel, 'Test Challan Info', 3);
        // remark Input
        await fillFilterInput(filterPanel, 'Test Remark', 4);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 5);
        //close filter panel
        await closeFilterPanel(filterPanel);
        // Reset Filter button
        await resetFilter(filterButton, USER_FIELD.FILTER_BUTTON);
        // Toggle Column and Actions
        await toggleColumnAndActions({
            page,
            filterButton,
            toggleSearchSelector: USER_FIELD.TOGGLE_SEARCH,
            togglePanelSelector: USER_FIELD.TOGGLE_PANEL,
            toggleFieldSelector: USER_FIELD.TOGGLE_FIELD_NAME,
            downloadButtonSelector: USER_FIELD.PDF_BUTTON,
            refreshButtonSelector: USER_FIELD.REFRESH_BUTTON,
        });
    });
    test('should verify update Fiscal Year Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Fiscal Year"
        const layout = page.getByText('Fiscal Year', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Fiscal Year' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Fiscal Year', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Year Dropdown
        await selectDropdown(page, '2026-2027', '[role="combobox"]:nth(1)');
        // Challan Info Input
        await fillInputByLabel(page, /challan info/i, 'Test Challan Info');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create Fiscal Year Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Fiscal Year"
        const layout = page.getByText('Fiscal Year', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Fiscal Year' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Year Dropdown
        await selectDropdown(page, '2027-2028', '[role="combobox"]:nth(1)');
        // From Month input
        await page.getByText('Jan').first().click();
        // To month Input
        await page.getByText('Dec').first().click();
        // Challan Info Input
        await fillInputByLabel(page, /challan info/i, 'Test Challan Info');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
