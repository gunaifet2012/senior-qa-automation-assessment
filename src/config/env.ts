import 'dotenv/config';

export const config = {
  appBaseUrl: process.env.APP_BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php',
  apiBaseUrl: process.env.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2',
  username: process.env.TEST_USERNAME || 'Admin',
  password: process.env.TEST_PASSWORD || 'admin123',
  apiToken: process.env.API_TOKEN || '',
  employeeApiPath: process.env.EMPLOYEE_API_PATH || '/pim/employees',
  headless: process.env.HEADLESS !== 'false'
};
