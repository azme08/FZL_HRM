import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    fillMultiInputByLabel,
    login,
    resetFilter,
    selectDropdown,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../../utils';

test.describe('Configuration layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Configuration Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Leave"
        const layout = page.getByText('Leave', { exact: true }).nth(0);
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Click "Configuration"
        const layout2 = page.getByText('Configuration', { exact: true }).first();
        await expect(layout2).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout2.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'Work/Leave Configuration' });
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
        await fillFilterInput(filterPanel, '1234', 0);
        // Policy Input
        await fillFilterInput(filterPanel, 'Test Policy', 1);
        // Leave Category Input
        await fillFilterInput(filterPanel, 'Test Category', 2);
        // Earned Leave Status Input
        await fillFilterInput(filterPanel, 'Active', 3);
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
    test('should verify update Configuration Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Leave"
        const layout = page.getByText('Leave', { exact: true }).nth(0);
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Click "Configuration"
        const layout2 = page.getByText('Configuration', { exact: true }).first();
        await expect(layout2).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout2.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'Work/Leave Configuration' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Edit Configuration', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Leave Policy Dropdown
        await selectDropdown(page, 'Test Policy', '[role="combobox"]:nth(0)');
        // Leave Category Dropdown
        await selectDropdown(page, 'Test Category', '[role="combobox"]:nth(1)');
        // Maximum Number of Allowed Leaves Input
        await fillMultiInputByLabel(page, /maximum number of allowed leaves/i, '20', 0);
        // Consecutive Days Input
        await fillMultiInputByLabel(page, /consecutive days/i, '2', 0);
        // Count Off Days as Leaves
        await page.getByRole('switch', { name: 'Count Off Days as Leaves' }).nth(0).click();
        // Maximum Number of Leave Per Month Input
        await fillMultiInputByLabel(page, /maximum number of leave per month/i, '20', 0);
        // Applicability Dropdown
        await selectDropdown(page, 'Male', '[role="combobox"]:nth(2)');
        // Eligible After Joining Input
        await fillMultiInputByLabel(page, /eligible after joining/i, '20', 0);
        // Enable Pro Rata
        await page.getByRole('switch', { name: 'Enable Pro Rata' }).nth(0).click();
        // Max Available Time
        await fillMultiInputByLabel(page, /max available time/i, '20', 0);
        // Enable Earned Leave
        await page.getByRole('switch', { name: 'Enable Earned Leave' }).nth(0).click();
        // Number of Leaves to Provide File
        await fillMultiInputByLabel(page, /number of leaves to provide file/i, '20', 0);
        // Leave Carry Dropdown
        await selectDropdown(page, 'Percentage', '[role="combobox"]:nth(3)');
        // Maximum Number of Leaves to Carry Input
        await fillMultiInputByLabel(page, /maximum number of leaves to carry/i, '20', 0);
        // Enable Previous Day Selection
        // await page.getByRole('switch', { name: 'Enable Previous Day Selection' }).nth(0).click();
        // Enable Next Day Selection Input
        // await fillMultiInputByLabel(page, /enable previous day selection/i, '20', 0);
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create Configuration Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Leave"
        const layout = page.getByText('Leave', { exact: true }).nth(0);
        await expect(layout).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout.click();
        // Click "Configuration"
        const layout2 = page.getByText('Configuration', { exact: true }).first();
        await expect(layout2).toBeVisible({ timeout: TEST_TIME['5min'] });
        await layout2.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'Work/Leave Configuration' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Check if the Add Leave Category is visible
        const addTitle = page.getByText('Add New Configuration', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Leave Policy Dropdown
        await selectDropdown(page, 'Policy 1', '[role="combobox"]:nth(0)');
        // Another new button
        await clickNewButton(page, TEST_TIME['10min']);
        // Leave Category Dropdown
        await selectDropdown(page, 'Test Category', '[role="combobox"]:nth(1)');
        // Maximum Number of Allowed Leaves Input
        await fillMultiInputByLabel(page, /maximum number of allowed leaves/i, '20', 0);
        // Consecutive Days Input
        await fillMultiInputByLabel(page, /consecutive days/i, '2', 0);
        // Count Off Days as Leaves
        await page.getByRole('switch', { name: 'Count Off Days as Leaves' }).nth(0).click();
        // Maximum Number of Leave Per Month Input
        await fillMultiInputByLabel(page, /maximum number of leave per month/i, '20', 0);
        // Applicability Dropdown
        await selectDropdown(page, 'Male', '[role="combobox"]:nth(2)');
        // Eligible After Joining Input
        await fillMultiInputByLabel(page, /eligible after joining/i, '20', 0);
        // Enable Pro Rata
        await page.getByRole('switch', { name: 'Enable Pro Rata' }).nth(0).click();
        // Max Available Time
        await fillMultiInputByLabel(page, /max available time/i, '20', 0);
        // Enable Earned Leave
        await page.getByRole('switch', { name: 'Enable Earned Leave' }).nth(0).click();
        // Number of Leaves to Provide File
        await fillMultiInputByLabel(page, /number of leaves to provide file/i, '20', 0);
        // Leave Carry Dropdown
        await selectDropdown(page, 'Percentage', '[role="combobox"]:nth(3)');
        // Maximum Number of Leaves to Carry Input
        await fillMultiInputByLabel(page, /maximum number of leaves to carry/i, '20', 0);
        // Enable Previous Day Selection
        // await page.getByRole('switch', { name: 'Enable Previous Day Selection' }).nth(0).click();
        // Enable Next Day Selection Input
        // await fillMultiInputByLabel(page, /enable previous day selection/i, '20', 0);
        // Leave Category Dropdown
        await selectDropdown(page, 'Test Category', '[role="combobox"]:nth(4)');
        // Maximum Number of Allowed Leaves Input
        await fillMultiInputByLabel(page, /maximum number of allowed leaves/i, '20', 1);
        // Consecutive Days Input
        await fillMultiInputByLabel(page, /consecutive days/i, '2', 1);
        // Count Off Days as Leaves
        await page.getByRole('switch', { name: 'Count Off Days as Leaves' }).nth(1).click();
        // Maximum Number of Leave Per Month Input
        await fillMultiInputByLabel(page, /maximum number of leave per month/i, '20', 1);
        // Applicability Dropdown
        await selectDropdown(page, 'Male', '[role="combobox"]:nth(5)');
        // Eligible After Joining Input
        await fillMultiInputByLabel(page, /eligible after joining/i, '20', 1);
        // Enable Pro Rata
        await page.getByRole('switch', { name: 'Enable Pro Rata' }).nth(1).click();
        // Max Available Time
        await fillMultiInputByLabel(page, /max available time/i, '20', 1);
        // Enable Earned Leave
        await page.getByRole('switch', { name: 'Enable Earned Leave' }).nth(1).click();
        // Number of Leaves to Provide File
        await fillMultiInputByLabel(page, /number of leaves to provide file/i, '20', 1);
        // Leave Carry Dropdown
        await selectDropdown(page, 'Percentage', '[role="combobox"]:nth(6)');
        // Maximum Number of Leaves to Carry Input
        await fillMultiInputByLabel(page, /maximum number of leaves to carry/i, '20', 1);
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
