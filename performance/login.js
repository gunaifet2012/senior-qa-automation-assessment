import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<1000', 'p(99)<2000'] }
};

export default function () {
  const base = __ENV.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2';
  const response = http.post(`${base}/auth/login`, JSON.stringify({
    username: __ENV.TEST_USERNAME || 'Admin',
    password: __ENV.TEST_PASSWORD || 'admin123'
  }), { headers: { 'Content-Type': 'application/json' } });
  check(response, { 'login request completed': r => r.status >= 200 && r.status < 500 });
}
