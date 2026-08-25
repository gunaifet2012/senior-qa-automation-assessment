import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<1200', 'p(99)<2500'] }
};

export default function () {
  const base = __ENV.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2';
  const suffix = `${Date.now()}-${__VU}-${__ITER}`;
  const response = http.post(`${base}/pim/employees`, JSON.stringify({
    firstName: 'K6', lastName: `Employee${suffix}`, employeeId: `K6${suffix}`
  }), {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${__ENV.API_TOKEN || ''}` }
  });
  check(response, { 'employee request completed': r => r.status >= 200 && r.status < 500 });
}
