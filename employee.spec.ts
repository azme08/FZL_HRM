import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillAndVerifyPassword,
    fillFilterInput,
    fillInputByLabel,
    login,
    resetFilter,
    selectDropdown,
    //selectDropdown,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Employee layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Employee Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Employee"
        const employee = page.getByText('Employee', { exact: true }).first();
        await expect(employee).toBeVisible({ timeout: TEST_TIME['5min'] });
        await employee.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Employee' });
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
        //  ID Input
        await fillFilterInput(filterPanel, '123456', 0);
        // Email Input
        await fillFilterInput(filterPanel, 'test@fzl.com', 1);
        // Leave Policy Input
        await fillFilterInput(filterPanel, 'Annual Leave', 2);
        // Employment Type Input
        await fillFilterInput(filterPanel, 'Full-time', 3);
        // Workplace Input
        await fillFilterInput(filterPanel, 'Headquarters', 4);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remark', 5);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 6);
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
        // Employee Type dropdown
        // await selectDropdown(page, 'Staff', '[role="combobox"]:nth(0)');
        // Click Add Bulk Button
        const newButton = page.getByRole('button', { name: 'Add Bulk' });
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await newButton.click();
        // Click Upload button
        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles('tests/fixtures/test.xlsx');
        // Next save button
        // await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify Employee Table layout', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Employee"
        const employee = page.getByText('Employee', { exact: true }).first();
        await expect(employee).toBeVisible({ timeout: TEST_TIME['5min'] });
        await employee.click();

        await page
            .getByRole('table')
            .filter({ hasText: 'Employee' })
            .locator('tbody tr')
            .first()
            .locator('td')
            .last()
            .locator('button')
            .click();
        // Click Edit option
        const editOption = page.getByRole('menuitem', { name: 'Edit' });
        await expect(editOption).toBeVisible();
        await editOption.click();
        // Wait for Update Employee page
        const updateTitle = page.getByText('Update Employee', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        //Fill Name input
        await fillInputByLabel(page, /name/i, 'John Doe');
        //Fill Email input
        await fillInputByLabel(page, /email/i, 'jdoe@fzlcom');
        // Department Dropdown
        await selectDropdown(page, 'HR', '[role="combobox"]:nth(2)');
        // Designation Dropdown
        await selectDropdown(page, 'Manager', '[role="combobox"]:nth(3)');
        // Employee Type Dropdown
        await selectDropdown(page, 'Staff', '[role="combobox"]:nth(4)');
        // Phone  Input
        await fillInputByLabel(page, /phone/i, '01884-375958');
        // remarks input
        await fillInputByLabel(page, /remarks/i, 'Test Remark');
        // Employee ID Input
        await fillInputByLabel(page, /employee id/i, '123456');
        // Gender Dropdown
        await selectDropdown(page, 'Female', '[role="combobox"]:nth(5)');
        // Start Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Joining Amount input
        await fillInputByLabel(page, /joining amount/i, '1000');
        // Standard Amount input
        await fillInputByLabel(page, /standard amount/i, '1000');
        // Tax Amount Input
        await fillInputByLabel(page, /tax amount/i, '1000'); 
        // Basic Part
        // Sub Department dropdown
        await selectDropdown(page, 'Compliance', '[role="combobox"]:nth(7)');
        // Report Position input
        await fillInputByLabel(page, /report position/i, 'Test Report Position');
        // Employment Type dropdown
        await selectDropdown(page, 'Permanent', '[role="combobox"]:nth(8)');
        // Device
        await page.getByRole('tab', { name: 'Device' }).click();
        // RFID Input
        await fillInputByLabel(page, /rfid/i, '1234567890');
        //  Card No Input
        await fillInputByLabel(page, /card no/i, '1234567890');
        // Primary Disply Text
        await fillInputByLabel(page, /primary display text/i, 'Test');
        // Secondary Display Text
        await fillInputByLabel(page, /secondary display text/i, 'Test');
        // Permissions
        await page.getByRole('tab', { name: 'Permissions' }).click();
        // Check the Permission
        await page.getByRole('switch', { name: 'HR Manager' }).click();
        // Assign
        await page.getByRole('tab', { name: 'Assign' }).click();
        // Line Manager dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(6)');
        // HR Manager
        // await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(7)');
        // End of Employment
        await page.getByRole('tab', { name: 'End of Employment' }).click();
        // End Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Submit button
        // await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify create an Employee Account layout', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Employee"
        const employee = page.getByText('Employee', { exact: true }).first();
        await expect(employee).toBeVisible({ timeout: TEST_TIME['5min'] });
        await employee.click();
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Employee page to load
        const addTitle = page.getByText('Add Employee', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['1min'] });
        //Fill Name input
        await fillInputByLabel(page, /name/i, 'John Doe');
        //Fill Email input
        await fillInputByLabel(page, /email/i, 'jdoe@fzlcom');
        // Department Dropdown
        await selectDropdown(page, 'HR', '[role="combobox"]:nth(2)');
        // Designation Dropdown
        await selectDropdown(page, 'Manager', '[role="combobox"]:nth(3)');
        // Employee Type Dropdown
        await selectDropdown(page, 'Staff', '[role="combobox"]:nth(4)');
        // Phone  Input
        await fillInputByLabel(page, /phone/i, '01884-375958');
        // Password input
        await fillAndVerifyPassword({ page, password: '123456', timeout: TEST_TIME['10min'] });
        // Confirm Password input
        await fillAndVerifyPassword({ page, password: '123456', timeout: TEST_TIME['10min'] });
        // remarks input
        await fillInputByLabel(page, /remarks/i, 'Test Remark');
        // Employee ID Input
        await fillInputByLabel(page, /employee id/i, '123456');
        // Gender Dropdown
        await selectDropdown(page, 'Female', '[role="combobox"]:nth(5)');
        // Start Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Joining Amount input
        await fillInputByLabel(page, /joining amount/i, '1000');
        // Standard Amount input
        await fillInputByLabel(page, /standard amount/i, '1000');
        // Tax Amount Input
        await fillInputByLabel(page, /tax amount/i, '1000');
        // Basic Part
        // Sub Department dropdown
        await selectDropdown(page, 'Compliance', '[role="combobox"]:nth(7)');
        // Report Position input
        await fillInputByLabel(page, /report position/i, 'Test Report Position');
        // Employment Type dropdown
        await selectDropdown(page, 'Permanent', '[role="combobox"]:nth(8)');
        // Device
        await page.getByRole('tab', { name: 'Device' }).click();
        // RFID Input
        await fillInputByLabel(page, /rfid/i, '1234567890');
        //  Card No Input
        await fillInputByLabel(page, /card no/i, '1234567890');
        // Primary Disply Text
        await fillInputByLabel(page, /primary display text/i, 'Test');
        // Secondary Display Text
        await fillInputByLabel(page, /secondary display text/i, 'Test');
        // Permissions
        await page.getByRole('tab', { name: 'Permissions' }).click();
        // Check the Permission
        await page.getByRole('switch', { name: 'HR Manager' }).click();
        // Assign
        await page.getByRole('tab', { name: 'Assign' }).click();
        // Line Manager dropdown
        await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(6)');
        // HR Manager
        // await selectDropdown(page, 'Abdullah Al Azme', '[role="combobox"]:nth(7)');
        // End of Employment
        await page.getByRole('tab', { name: 'End of Employment' }).click();
        // End Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Submit button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
