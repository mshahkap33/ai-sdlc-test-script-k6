import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const baseUrl = __ENV.BASE_URL || 'https://test.k6.io';
  const endpoint = `${baseUrl}/public/crocodiles/`;

  const response = http.get(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
