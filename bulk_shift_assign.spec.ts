import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    login,
    navigateMenu,
    resetFilter,
    selectDropdown,
    selectTableDropdown,
    TEST_TIME,
    USER_FIELD,
} from '../../utils';

test.describe('Bulk Shift layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Bulk Shifts Dashboard Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Bulk Shift Assign');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'Add Bulk Shifts' });
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
        //  Employee Input
        await fillFilterInput(filterPanel, 'Arif Hossain', 0);
        // Current Shift Input
        await fillFilterInput(filterPanel, 'Day', 1);
        // Next Shift Input
        await fillFilterInput(filterPanel, 'Day', 2);
        // Assigned Shift Input
        await fillFilterInput(filterPanel, 'Day', 3);
        //Effective Date Input
        await fillFilterInput(filterPanel, '23', 4);
        //close filter panel
        await closeFilterPanel(filterPanel);
        // Reset Filter button
        await resetFilter(filterButton, USER_FIELD.FILTER_BUTTON);
    });
    test('should verify add Bulk Shifts Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Bulk Shift Assign');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'Add Bulk Shifts' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Add Shift button
        const newButton = page.getByRole('button', { name: 'Add Shift' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await newButton.click();
        // Check if the add shift is visible
        const addTitle = page.getByText('Preview', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Shift Group dropdown
        await selectDropdown(page, 'New Shift (Shift C)', '[role="combobox"]:nth(5)');
        // Effective Date Input
        await page.getByRole('gridcell', { name: '23' }).click();
        // Apply Button
        const saveButton = page.getByRole('button', { name: /apply/i });
        await expect(saveButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await saveButton.click();
    });
    test('should verify Assign Shifts Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Bulk Shift Assign');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'Add Bulk Shifts' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // User Type Dropdown
        await selectDropdown(page, 'All', '[role="combobox"]:nth(0)');
        // Department Dropdown
        await selectDropdown(page, 'Admin', '[role="combobox"]:nth(1)');
        // Designation Dropdown
        await selectDropdown(page, 'Admin', '[role="combobox"]:nth(2)');
        // Employment Type Dropdown
        // await selectDropdown(page, 'All', '[role="combobox"]:nth(3)');
        // Click to search Button
        const saveButton = page.getByRole('button', { name: /search/i });
        await expect(saveButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await saveButton.click();
        await selectTableDropdown({
            page,
            rowIndex: 0,
            columnIndex: 4,
            value: 'New Shift (Shift C)',
        });
        // Effective Date Input
        await page.getByRole('gridcell', { name: '23' }).click();
        await page.locator('tbody tr').first().getByRole('checkbox').first().check();
        // Save Button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
        // Click on the delete icon
        const icon = page.locator('svg.lucide-trash-2');
        await icon.hover();
        await icon.click();
        // Confirm delete in modal
        await page.getByRole('button', { name: 'Confirm' }).click();
        
    });
});
