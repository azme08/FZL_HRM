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

test.describe('Workplace layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Workplace Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "WorkPlace"
        const layout = page.getByText('Workplace', { exact: true }).first();
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/WorkPlace' });
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
        //  Hierarchy Input
        await fillFilterInput(filterPanel, '0', 0);
        // Name Input
        await fillFilterInput(filterPanel, 'Head Office', 1);
        // Status Input
        await fillFilterInput(filterPanel, 'Active', 2);
        // Remark Input
        await fillFilterInput(filterPanel, 'Test Remark', 3);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 4);
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
    test('should verify update WorkPlace Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "WorkPlace"
        const designation = page.getByText('Workplace', { exact: true }).first();
        await expect(designation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await designation.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/WorkPlace' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update WorkPlace', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Test Place');
        // Hierarchy Input
        await fillInputByLabel(page, /hierarchy/i, '2');
        // Latitude Input
        await fillInputByLabel(page, /latitude/i, '1234');
        // Longitude Input
        await fillInputByLabel(page, /longitude/i, '5678');
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create WorkPlace Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "WorkPlace"
        const designation = page.getByText('Workplace', { exact: true }).first();
        await expect(designation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await designation.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/WorkPlace' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Name Input
        await fillInputByLabel(page, /name/i, 'Test Place');
        // Hierarchy Input
        await fillInputByLabel(page, /hierarchy/i, '2');
        // Latitude Input
        await fillInputByLabel(page, /latitude/i, '1234');
        // Longitude Input
        await fillInputByLabel(page, /longitude/i, '5678');
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
