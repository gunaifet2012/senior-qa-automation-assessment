import { test, expect } from '../fixtures/test';

test('@api OrangeHRM employee API smoke', async ({ employeeApi }) => {
  const empNumber = process.env.EXISTING_EMP_NUMBER;
  test.skip(!empNumber, 'Set EXISTING_EMP_NUMBER for a non-destructive API smoke test.');
  const employee = await employeeApi.getById(empNumber!);
  expect(employee.data ?? employee).toBeTruthy();
});
