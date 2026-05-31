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
    navigateMenu,
    resetFilter,
    selectTime,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../../utils';

test.describe('Shift layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Shifts Dashboard Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Shifts');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Shifts' });
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
        // Shift Day Start Time Input
        await fillFilterInput(filterPanel, '08:00', 2);
        // Start Time Input
        await fillFilterInput(filterPanel, '08:00', 3);
        // End Time Input
        await fillFilterInput(filterPanel, '08:00', 4);
        // Late Time Input
        await fillFilterInput(filterPanel, '08:00', 5);
        // Early Exit Before Input
        await fillFilterInput(filterPanel, '08:00', 6);
        // First Half End Input
        await fillFilterInput(filterPanel, '08:00', 7);
        // Break Time End Input
        await fillFilterInput(filterPanel, '08:00', 8);
        // Color Input
        await fillFilterInput(filterPanel, '08:00', 9);
        // Default Shift Input
        await fillFilterInput(filterPanel, 'false', 10);
        // Status Input
        await fillFilterInput(filterPanel, 'Active', 11);
        // Remark Input
        await fillFilterInput(filterPanel, 'Test Remark', 12);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 13);
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
    test('should verify Update Shifts Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Shifts');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Shifts' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table[data-slot="table"]');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check table header
        await expect(table).toBeVisible();
        // Click Edit button from first row
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Shift', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the Switch
        await page.getByRole('switch', { name: 'Status' }).click();
        // Check Default Shift
        await page.getByRole('switch', { name: 'Default Shift' }).click();
        // Name Input
        await fillInputByLabel(page, /name/i, 'Test Name');
        // Shift Day Start Time
        await selectTime(page, 1, '10', '00', 'AM');
        // Start Time selecting
        await selectTime(page, 1, '10', '00', 'AM');
        // End Time Selecting
        await selectTime(page, 1, '11', '00', 'AM');
        // Late After
        await selectTime(page, 1, '12', '00', 'AM');
        // Early exit before
        await selectTime(page, 1, '1', '00', 'AM');
        // First half end
        await selectTime(page, 1, '3', '00', 'AM');
        // Break Time end
        await selectTime(page, 1, '4', '00', 'AM');
        // save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify new Shifts Functionality', async ({ page }) => {
        // Navigate to Shift Groups
        await navigateMenu(page, 'HR', 'Shift Management', 'Shifts');
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Shifts' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click New button
        await clickNewButton(page, TEST_TIME['10min']);
        // Check if the update form is visible
        const addTitle = page.getByText('Add Shift', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the Switch
        await page.getByRole('switch', { name: 'Status' }).click();
        // Check Default Shift
        await page.getByRole('switch', { name: 'Default Shift' }).click();
        // Name Input
        await fillInputByLabel(page, /name/i, 'Test Name');
        // Shift Day Start Time
        await selectTime(page, 1, '10', '00', 'AM');
        // Start Time selecting
        await selectTime(page, 1, '10', '00', 'AM');
        // End Time Selecting
        await selectTime(page, 1, '11', '00', 'AM');
        // Late After
        await selectTime(page, 1, '12', '00', 'AM');
        // Early exit before
        await selectTime(page, 1, '1', '00', 'AM');
        // First half end
        await selectTime(page, 1, '3', '00', 'AM');
        // Break Time end
        await selectTime(page, 1, '4', '00', 'AM');
        // First Half Absent
        await page.getByRole('switch', { name: 'First Half Absent' }).click();
        // Remark Input
        await fillInputByLabel(page, /remark/i, 'Test Remark');
        // save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
