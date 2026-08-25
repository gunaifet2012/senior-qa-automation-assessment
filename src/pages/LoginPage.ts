import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('button[type="submit"]').click();
    await expect(this.page).toHaveURL(/dashboard\/index/);
    await expect(this.page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  }
}
