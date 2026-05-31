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

test.describe('Special Holidays layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Special Holidays Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Special Holidays"
        const layout = page.getByText('Special Holidays', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Special HoliDays' });
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
        //  SL No Input
        await fillFilterInput(filterPanel, '1', 0);
        // Name Input
        await fillFilterInput(filterPanel, 'Test', 1);
        // From Date Input
        await fillFilterInput(filterPanel, '2022-01-01', 2);
        // To Date Input
        await fillFilterInput(filterPanel, '2022-01-01', 3);
        // Remark Input
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
    test('should verify update Special Holidays Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Special Holidays"
        const layout = page.getByText('Special Holidays', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Special HoliDays' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });

        const table = page.locator('table[data-slot="table"]');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check table header
        await expect(table).toBeVisible();
        // Click Edit button from first row
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Specials Days', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Test Day');
        // Workplace dropdown
        await selectDropdown(page, 'Factory', '[role="combobox"]:nth(1)');
        // From Date input
        await page.getByRole('gridcell', { name: '23' }).click();
        // To Date input
        await page.getByRole('gridcell', { name: '24' }).click();
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create Special Holidays Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Special Holidays"
        const layout = page.getByText('Special Holidays', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Special HoliDays' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Name Input
        await fillInputByLabel(page, /name/i, 'Eid UL Adha');
        // Workplace dropdown
        await selectDropdown(page, 'Factory', '[role="combobox"]:nth(1)');
        // From Date input
        await page.getByRole('gridcell', { name: '23' }).click();
        // To Date input
        await page.getByRole('gridcell', { name: '24' }).click();
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
