import { APIRequestContext, expect } from '@playwright/test';
import { config } from '../config/env';

export class EmployeeApi {
  constructor(private readonly request: APIRequestContext) {}

  private url(id?: number | string) {
    return `${config.apiBaseUrl}${config.employeeApiPath}${id ? `/${id}` : ''}`;
  }

  async getById(empNumber: number | string) {
    const response = await this.request.get(this.url(empNumber));
    expect(response.status()).toBe(200);
    return response.json();
  }

  async deleteById(empNumber: number | string) {
    const response = await this.request.delete(`${config.apiBaseUrl}${config.employeeApiPath}`, {
      data: { ids: [Number(empNumber)] }
    });
    expect(response.status()).toBe(200);
  }

  async verifyDeleted(empNumber: number | string) {
    const response = await this.request.get(this.url(empNumber));
    expect(response.status()).toBe(404);
  }
}
