# ai-sdlc-test-script-k6

Grafana k6 REST API testing scripts live in this repository.

## Repository layout

- `scripts/` - k6 test scripts
  - `scripts/car-management/` - k6 test scripts for the car management APIs
- `config/.env.example` - local environment variable template

## Local usage (k6 is not installed by this repository)

1. Install k6 on your own machine.
2. Copy the env template and set values for your target API:
   - `cp config/.env.example .env`
3. Run a script locally (example):
   - `k6 run -e BASE_URL=https://api.example.com scripts/rest_api_smoke_test.js`
   - `k6 run -e BASE_URL=https://api.example.com scripts/car-management/add-vehicle-test.js`

## Notes

- This repository does **not** install k6.
- Pass sensitive values (like tokens) via local environment variables.