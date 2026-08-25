import { expect, Page } from '@playwright/test';

export class EmployeesPage {
  constructor(private readonly page: Page) {}

  async openEmployeeList() {
    await this.page.getByText('PIM', { exact: true }).click();
    await this.page.getByRole('link', { name: 'Employee List' }).click();
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
  }

  async openAddEmployee() {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
    await expect(this.page).toHaveURL(/pim\/addEmployee/);
  }

  async create(firstName: string, middleName: string, lastName: string, employeeId: string) {
    await this.page.locator('input[name="firstName"]').fill(firstName);
    await this.page.locator('input[name="middleName"]').fill(middleName);
    await this.page.locator('input[name="lastName"]').fill(lastName);
    await this.page.locator('input[name="employeeId"]').fill(employeeId);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page).toHaveURL(/pim\/viewPersonalDetails/);
  }

  async updateLastName(lastName: string) {
    await this.page.locator('input[name="lastName"]').fill(lastName);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page.locator('input[name="lastName"]')).toHaveValue(lastName);
  }
}
