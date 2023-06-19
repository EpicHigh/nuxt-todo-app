import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

function resetDatabase() {
  const data = {
    tasks: [],
  };

  const dir = path.join(__dirname, 'db');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const jsonData = JSON.stringify(data, null, 2);

  const filePath = path.join(__dirname, '../', 'db', 'db.json');

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });
}

test.describe('Task Manager', () => {
  test.describe.configure({ mode: 'serial' });
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterAll(() => {
    resetDatabase();
  });

  test('Has an app title', async ({ page }) => {
    const element = page.locator('div').filter({ hasText: /^Task Manager$/ });
    await expect(element).toContainText('Task Manager');
  });

  test('Has an empty state', async ({ page }) => {
    const element = page.getByRole('button', { name: '+ Add a task' });
    await expect(element).toContainText('+ Add a task');
  });

  test('Can add an initial task', async ({ page }) => {
    const addTaskButton = page.getByRole('button', { name: '+ Add a task' });
    await addTaskButton.click();
    await page.fill('input[name="name"]', 'My new task');
    await page.fill('input[name="description"]', 'My new task description');
    await page.selectOption('select[name="priority"]', '1');
    await page.click('button[type="submit"]');
    expect(page.getByText('My new task', { exact: true })).toBeTruthy();
    expect(page.getByText('My new task description')).toBeTruthy();
    expect(page.getByText('LOW')).toBeTruthy();
  });

  test('Can add a more task', async ({ page }) => {
    const addTaskButton = page.getByRole('button', { name: '+ Add a task' });
    await addTaskButton.click();
    await page.fill('input[name="name"]', 'My new task 2');
    await page.fill('input[name="description"]', 'My new task description 2');
    await page.selectOption('select[name="priority"]', '2');
    await page.click('button[type="submit"]');
    expect(page.getByText('My new task', { exact: true })).toBeTruthy();
    expect(page.getByText('My new task description')).toBeTruthy();
    expect(page.getByText('MEDIUM')).toBeTruthy();
    await expect(page.locator('[data-test="edit-button"]')).toHaveCount(2);
    await expect(page.locator('[data-test="delete-button"]')).toHaveCount(2);
  });

  test('Can edit a task', async ({ page }) => {
    await page
      .getByRole('listitem')
      .filter({
        hasText: 'My new task 2MediumMy new task description 2Edit Delete',
      })
      .locator('[data-test="edit-button"]')
      .click();
    await page.fill('input[name="name"]', 'My new task 2 edited');
    await page.fill(
      'input[name="description"]',
      'My new task description 2 edited'
    );
    await page.selectOption('select[name="priority"]', '3');
    await page.click('button[type="submit"]');
    expect(
      page.getByText('My new task 2 edited', { exact: true })
    ).toBeTruthy();
    expect(page.getByText('My new task description 2 edited')).toBeTruthy();
    expect(page.getByText('HIGH')).toBeTruthy();
  });

  test('Can delete a task', async ({ page }) => {
    await page
      .getByRole('listitem')
      .filter({
        hasText:
          'My new task 2 editedHIGHMy new task description 2 editedEdit Delete',
      })
      .locator('[data-test="delete-button"]')
      .click();
    await expect(page.getByText('My new task 2 edited')).not.toBeVisible();
    await expect(
      page.getByText('My new task description 2 edited')
    ).not.toBeVisible();
    await expect(page.getByText('HIGH')).not.toBeVisible();
    page.close();
  });
});
