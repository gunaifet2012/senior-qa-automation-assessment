import { test, expect, config } from '../fixtures/test';

test('@smoke @regression OrangeHRM employee lifecycle', async ({ page, loginPage, employeesPage, employeeApi }) => {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 100)}`;
  const firstName = 'QA';
  const middleName = 'Automation';
  const lastName = `Employee${suffix}`;
  const employeeId = `QA${suffix}`;

  await page.goto('/auth/login');
  await loginPage.login(config.username, config.password);

  // Admin role validation: PIM must be available to manage employees.
  await expect(page.getByText('PIM', { exact: true })).toBeVisible();

  await employeesPage.openEmployeeList();
  await employeesPage.openAddEmployee();
  await employeesPage.create(firstName, middleName, lastName, employeeId);

  const match = page.url().match(/empNumber=(\d+)/);
  expect(match).not.toBeNull();
  const empNumber = Number(match![1]);

  const created = await employeeApi.getById(empNumber);
  const createdData = created.data ?? created;
  expect(createdData.employeeId).toBe(employeeId);
  expect(createdData.firstName).toBe(firstName);
  expect(createdData.lastName).toBe(lastName);

  const updatedLastName = `${lastName}Updated`;
  await employeesPage.updateLastName(updatedLastName);
  const updated = await employeeApi.getById(empNumber);
  expect((updated.data ?? updated).lastName).toBe(updatedLastName);

  await employeeApi.deleteById(empNumber);
  await employeeApi.verifyDeleted(empNumber);
});
