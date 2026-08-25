import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { EmployeesPage } from '../../src/pages/EmployeesPage';
import { EmployeeApi } from '../../src/api/EmployeeApi';
import { config } from '../../src/config/env';

type Fixtures = { loginPage: LoginPage; employeesPage: EmployeesPage; employeeApi: EmployeeApi };

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  employeesPage: async ({ page }, use) => use(new EmployeesPage(page)),
  employeeApi: async ({ playwright }, use) => {
    if (!config.apiToken) throw new Error('API_TOKEN is required for API verification.');
    const context = await playwright.request.newContext({
      baseURL: config.apiBaseUrl,
      extraHTTPHeaders: { Authorization: `Bearer ${config.apiToken}`, Accept: 'application/json' }
    });
    await use(new EmployeeApi(context));
    await context.dispose();
  }
});

export { expect, config };
