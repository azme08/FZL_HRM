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
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../../utils';

test.describe('Device List layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Device List Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Device List"
        const layout = page.getByText('Device List', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Device List' });
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
        //  Identifier Input
        await fillFilterInput(filterPanel, 'AP12345678', 0);
        // Name Input
        await fillFilterInput(filterPanel, 'Test Device', 1);
        // Location Input
        await fillFilterInput(filterPanel, 'Test Location', 2);
        // Connection Status Input
        await fillFilterInput(filterPanel, 'Connected', 3);
        // Phone Number Input
        await fillFilterInput(filterPanel, '1234567890', 4);
        // Description Input
        await fillFilterInput(filterPanel, 'Test Description', 5);
        // Employees Input
        await fillFilterInput(filterPanel, 'Test Employees', 6);
        // Remark Input
        await fillFilterInput(filterPanel, 'Test Remark', 7);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 8);
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
    test('should verify update Device List Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Device List"
        const layout = page.getByText('Device List', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Device List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table[data-slot="table"]');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check table header
        await expect(table).toBeVisible();
        // Click Edit button from first row
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Device List', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Device Name Input
        await fillInputByLabel(page, /device name/i, 'Test Device');
        // Phone Number Input
        await fillInputByLabel(page, /phone number/i, '01234-567890');
        // Description Input
        await fillInputByLabel(page, /description/i, 'Test Description');
        // Device Identifier Input
        await fillInputByLabel(page, /device identifier/i, 'AP12345678');
        // Location Input
        await fillInputByLabel(page, /location/i, 'Test Location');
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create Device List Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Device List"
        const layout = page.getByText('Device List', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Device List' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Device Name Input
        await fillInputByLabel(page, /device name/i, 'Test Device');
        // Phone Number Input
        await fillInputByLabel(page, /phone number/i, '01234-567890');
        // Description Input
        await fillInputByLabel(page, /description/i, 'Test Description');
        // Device Identifier Input
        await fillInputByLabel(page, /device identifier/i, 'AP12345678');
        // Location Input
        await fillInputByLabel(page, /location/i, 'Test Location');
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
