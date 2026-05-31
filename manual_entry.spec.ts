import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    fillInputByLabel,
    login,
    resetFilter,
    selectDropdown,
    //selectDropdown,
    TEST_TIME,
    USER_FIELD,
} from '../utils';

test.describe('Manual Entry layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@fzl.com',
            password: 'fzl@dmin2025',
        });
    });
    test('should verify Manual Entry Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Manual Entry"
        const manual_entry = page.getByText('Manual Entry', { exact: true }).first();
        await expect(manual_entry).toBeVisible({ timeout: TEST_TIME['5min'] });
        await manual_entry.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Manual Entry' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test');
        // Click on filter button after submission
        const filterButton = page
            .getByRole('button', {
                name: 'Filters All Columns',
            })
            .nth(0);
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        //  ID Input
        await fillFilterInput(filterPanel, '123456', 0);
        // Type Input
        await fillFilterInput(filterPanel, 'Test', 1);
        // Entry Time Input
        await fillFilterInput(filterPanel, '2022-01-01', 2);
        // Exit Time Input
        await fillFilterInput(filterPanel, '2022-01-01', 3);
        // Reason Input
        await fillFilterInput(filterPanel, 'Test', 4);
        // Location Input
        await fillFilterInput(filterPanel, 'Test', 5);
        // Status Input
        await fillFilterInput(filterPanel, 'Pending', 6);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remark', 7);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 8);
        //close filter panel
        await closeFilterPanel(filterPanel);
        // Reset Filter button
        await resetFilter(filterButton, USER_FIELD.FILTER_BUTTON);
        // Employee Type dropdown
        await selectDropdown(page, 'All', '[role="combobox"]:nth(0)');
    });

    test('should verify Create Manual Entry Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "manual_entry"
        const manual_entry = page.getByText('Manual Entry', { exact: true }).first();
        await expect(manual_entry).toBeVisible({ timeout: TEST_TIME['5min'] });
        await manual_entry.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Manual Entry' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' }).nth(0);
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await newButton.click();
        /// Wait for Employee page to load
        const addTitle = page.getByText('Add Manual Entry', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Employee Dropdown
        await selectDropdown(page, 'Fahim Faysal', '[role="combobox"]:nth(4)');
        // Status Dropdown
        await selectDropdown(page, 'Approved', '[role="combobox"]:nth(5)');
        // Type Dropdown
        await selectDropdown(page, 'Manual Entry', '[role="combobox"]:nth(6)');
        // date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        await page.mouse.click(0, 0);
        // date input
        await page.locator('[role="gridcell"]').filter({ hasText: '24' }).first().click();
        await page.mouse.click(0, 0);
        // Reason input
        await fillInputByLabel(page, /reason/i, 'Test Reason');
        // save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });

    test('should verify Update Manual Entry Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "manual_entry"
        const manual_entry = page.getByText('Manual Entry', { exact: true }).first();
        await expect(manual_entry).toBeVisible({ timeout: TEST_TIME['5min'] });
        await manual_entry.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Manual Entry' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table').nth(0);
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check Action button Functionality
        const tableheader = page.locator('table').nth(0);
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Manual Entry', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Employee Dropdown
        await selectDropdown(page, 'Fahim Faysal', '[role="combobox"]:nth(4)');
        // Status Dropdown
        //await selectDropdown(page, 'Approved', '[role="combobox"]:nth(5)');
        // Type Dropdown
        // await selectDropdown(page, 'Manual Entry', '[role="combobox"]:nth(6)');
        // Area Input
        await fillInputByLabel(page, /area/i, 'Test Area');
        // date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        await page.mouse.click(0, 0);
        // date input
        await page.locator('[role="gridcell"]').filter({ hasText: '24' }).first().click();
        await page.mouse.click(0, 0);
        // Reason input
        await fillInputByLabel(page, /reason/i, 'Test Reason');
        // save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });

    test('should verify Missing Punch Dashboard Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "manual_entry"
        const manual_entry = page.getByText('Manual Entry', { exact: true }).first();
        await expect(manual_entry).toBeVisible({ timeout: TEST_TIME['5min'] });
        await manual_entry.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Missing Punch' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test');
        // Click on filter button after submission
        const filterButton = page
            .getByRole('button', {
                name: 'Filters All Columns',
            })
            .nth(1);
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        //  Employee Input
        await fillFilterInput(filterPanel, 'Fahim Faysal', 0);
        // Time Input
        await fillFilterInput(filterPanel, '2022-01-01', 1);
        // Reason Input
        await fillFilterInput(filterPanel, 'Test Reason', 2);
        // Status Input
        await fillFilterInput(filterPanel, 'Pending', 3);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remark', 4);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin User', 5);
        //close filter panel
        await closeFilterPanel(filterPanel);
        // Reset Filter button
        await resetFilter(filterButton, USER_FIELD.FILTER_BUTTON);
        // Employee Type dropdown
        await selectDropdown(page, 'All', '[role="combobox"]:nth(2)');
    });

    test('should verify Create Missing Punch Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "Manual Entry"
        const manual_entry = page.getByText('Manual Entry', { exact: true }).first();
        await expect(manual_entry).toBeVisible({ timeout: TEST_TIME['5min'] });
        await manual_entry.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Missing Punch' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the "New" button
        const newButton = page.getByRole('button', { name: 'New' }).nth(1);
        await expect(newButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await newButton.click();
        /// Wait for Employee page to load
        const addTitle = page.getByText('Add Missing Punch', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['1min'] });
        // Employee Dropdown
        await selectDropdown(page, 'Fahim Faysal', '[role="combobox"]:nth(4)');
        // Status Dropdown
        await selectDropdown(page, 'Approved', '[role="combobox"]:nth(5)');
        // Device Dropdown
        await selectDropdown(page, 'Zkteco', '[role="combobox"]:nth(6)');
        // date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        await page.mouse.click(0, 0);
        // Reason input
        await fillInputByLabel(page, /reason/i, 'Test Reason');
        // save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
    test('should verify Update Missing Punch Functionality', async ({ page }) => {
        // Click "HR"
        const hr = page.getByText('HR', { exact: true }).first();
        await expect(hr).toBeVisible({ timeout: TEST_TIME['5min'] });
        await hr.click();
        // Click "manual_entry"
        const manual_entry = page.getByText('Manual Entry', { exact: true }).first();
        await expect(manual_entry).toBeVisible({ timeout: TEST_TIME['5min'] });
        await manual_entry.click();
        // Check the page header
        const pageHeader = page.getByRole('heading', { name: 'HR/Missing Punch' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table').nth(1);
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check Action button Functionality
        const tableheader = page.locator('table').nth(1);
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Missing Punch', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Employee Dropdown
        await selectDropdown(page, 'Fahim Faysal', '[role="combobox"]:nth(4)');
        // Status Dropdown
        // await selectDropdown(page, 'Approved', '[role="combobox"]:nth(5)');
        // Device Dropdown
        await selectDropdown(page, 'Zkteco', '[role="combobox"]:nth(6)');
        // date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        await page.mouse.click(0, 0);
        // Reason input
        await fillInputByLabel(page, /reason/i, 'Test Reason');
        // save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
