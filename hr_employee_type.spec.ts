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

test.describe('Employee Type layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Employee Type Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Employee Type"
        const selectLayout = page.getByText('Employee Type', { exact: true }).first();
        await expect(selectLayout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await selectLayout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Employee Type' });
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
        //  SL Input
        await fillFilterInput(filterPanel, '5', 0);
        // Employee Type Input
        await fillFilterInput(filterPanel, 'Full-Time', 1);
        // remark Input
        await fillFilterInput(filterPanel, 'Test Remark', 2);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 3);
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
    test('should verify update Employee Type Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Employee Type"
        const selectLayout = page.getByText('Employee Type', { exact: true }).first();
        await expect(selectLayout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await selectLayout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Employee Type' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Employee Type', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Full-Time');
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create Employee Type Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Settings"
        const settings = page.getByText('Settings', { exact: true }).first();
        await expect(settings).toBeVisible({ timeout: TEST_TIME['5min'] });
        await settings.click();
        // Click "Employee Type"
        const selectLayout = page.getByText('Employee Type', { exact: true }).first();
        await expect(selectLayout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await selectLayout.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Employee Type' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Name Input
        await fillInputByLabel(page, /name/i, 'Test Type');
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
