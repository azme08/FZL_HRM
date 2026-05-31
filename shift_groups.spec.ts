import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    fillInputByLabel,
    login,
    navigateMenu,
    resetFilter,
    selectDropdown,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../../utils';

test.describe('Shift Groups layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Shift Groups Dashboard Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Shifts Groups');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Shift Groups' });
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
        // Name Input
        await fillFilterInput(filterPanel, 'Test Name', 1);
        // Shifts Input
        await fillFilterInput(filterPanel, 'General', 2);
        // Current Shift Input
        await fillFilterInput(filterPanel, 'Day', 3);
        // Next Off Day Input
        await fillFilterInput(filterPanel, 'Saturday', 4);
        // Next Shift Change Input
        await fillFilterInput(filterPanel, 'Saturday', 5);
        // Defaul Shift Input
        await fillFilterInput(filterPanel, 'false', 6);
        // Status Input
        await fillFilterInput(filterPanel, 'Active', 7);
        // Remark Input
        await fillFilterInput(filterPanel, 'Test Remark', 8);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 9);
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
    test('should verify update Shift Groups Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Shifts Groups');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Shift Groups' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        await page
            .getByRole('table')
            .filter({ hasText: 'Name' })
            .locator('tbody tr')
            .first()
            .locator('td')
            .last()
            .locator('button')
            .click();
        // Click Edit option
        const editOption = page.getByRole('menuitem', { name: 'Edit' }).nth(0);
        await expect(editOption).toBeVisible();
        await editOption.click();
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Shift Group', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Test Name');
        // Shift Dropdown
        await selectDropdown(page, 'Shift A', '[role="combobox"]:nth(1)');
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create Shift Groups Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Shifts Groups');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Shift Groups' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        await clickNewButton(page, TEST_TIME['2min']);
        // Check if the create form is visible
        const addTitle = page.getByText('Add Shift Group', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Basic Group');
        // Shift Dropdown
        await selectDropdown(page, 'Shift A', '[role="combobox"]:nth(1)');
        // Off Days
        await selectDropdown(page, 'Friday', '[role="group"]:nth(8)');
        await page.mouse.click(0, 0);
        // Effective Date Input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
