# Senior QA Automation Engineer – OrangeHRM Assessment

Playwright + TypeScript framework for the supplied OrangeHRM demo assessment.

## Application
https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index

## Coverage
- Admin authentication
- PIM / Employee List access validation
- Create employee
- UI-to-API persistence verification
- Update employee
- API verification of update
- Employee deletion
- API verification of deletion
- Page Object Model
- Environment configuration
- Playwright retries, trace, screenshot and video on failure
- GitHub Actions CI with parallel shards
- K6 performance scripts for login and employee creation
- HTML reporting

## Important API note
OrangeHRM REST API v2 uses OAuth2 bearer authentication. Configure `API_TOKEN` as a local environment variable or GitHub Actions secret; never commit a real token.

## Local setup
```bash
npm ci
npx playwright install --with-deps chromium
cp .env.example .env
npm test
npm run report
```

Required variables:
- `APP_BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php`
- `API_BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php/api/v2`
- `TEST_USERNAME=Admin`
- `TEST_PASSWORD=admin123`
- `API_TOKEN=<OAuth2 bearer token>`

## Commands
```bash
npm test
npm run test:smoke
npm run test:api
npm run typecheck
npm run lint
npm run report
```

## CI
`.github/workflows/playwright.yml` installs Node/Playwright, type-checks the code, runs two Playwright shards and uploads reports, traces, screenshots and videos.

## Design decisions
POM keeps UI mechanics separate from test intent. API clients provide deterministic backend verification. Test data is unique to avoid collisions. Playwright web-first assertions and auto-waiting are used instead of fixed sleeps. CI retries are diagnostic and should not hide recurring flaky tests.

## Role-based validation
The lifecycle uses the OrangeHRM Admin account and verifies that PIM/employee-management access is available. A stronger extension is an ESS negative-access test using a separately provisioned ESS user.

## K6
```bash
k6 run performance/login.js
k6 run performance/employee-create.js
```

The K6 thresholds are baseline assessment thresholds and should be aligned to the application's agreed SLA.

## Submission checklist
- Configure GitHub secret `API_TOKEN` before CI API tests.
- Run the suite locally against the supplied OrangeHRM demo.
- Confirm GitHub Actions passes.
- Review generated HTML report and failure artifacts.
- Submit this public repository URL to the assessor.

## References
- OrangeHRM demo: https://opensource-demo.orangehrmlive.com/
- API getting started: https://api-starter-orangehrm.readme.io/reference/get-started
- Get employee: https://api-starter-orangehrm.readme.io/reference/get-an-employee
- Delete employees: https://api-starter-orangehrm.readme.io/reference/delete-employees
