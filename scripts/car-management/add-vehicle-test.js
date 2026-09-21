import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

// Generates a unique VIN-like value so that each iteration/VU sends a
// different payload, avoiding duplicate-key collisions on the API.
function randomVin() {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

function randomUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomPolicyNumber() {
  return `POLICY-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function () {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:8080';
  const endpoint = `${baseUrl}/api/v1/vehicles`;

  const payload = JSON.stringify({
    vin: randomVin(),
    'purchase-date': '2024-01-15',
    'purchase-cost': 25000.5,
    'insurance-policy-number': randomPolicyNumber(),
    'insurance-expiry-date': '2027-01-15',
    'odometer-reading': 10,
    brand: 'Toyota',
    model: 'Camry',
    'manufacturing-year': 2023,
    size: 'medium',
    'vehicle-class-id': randomUuid(),
    seats: 5,
    'fuel-type': 'gas',
    'home-location-id': randomUuid(),
  });

  const response = http.post(endpoint, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  check(response, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}
