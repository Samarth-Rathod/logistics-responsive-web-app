# Wayline — Logistics Responsive Web App

A responsive React application for a fictional freight company. It demonstrates shipment tracking, delivery progress, proof-of-delivery states and a simple operations admin workspace. The project is built to address the Yuva Intern project brief.

## What is included

- Dashboard with shipment totals, delivery performance visualisation, active-route snapshot and recent records.
- Shipment management with keyword search, status filtering, sorting and pagination.
- Shipment detail view with route progress, event timeline, recipient details and proof-of-delivery state.
- Validated create-shipment form.
- Editable user profile.
- Admin workspace with status controls, user overview and CSV export.
- Reusable UI components, React Router navigation and Context-based shared state.
- JSON Server mock API with realistic seed data in `db.json`.
- Local-storage fallback so previously loaded records remain usable if the mock API is unavailable.
- Lazy-loaded route screens and installable PWA service-worker caching.
- Jest and React Testing Library tests.

## Requirements

- Node.js 22.12 or newer is recommended for the current Vite and PWA toolchain.
- npm 10 or newer.
- A browser with modern JavaScript and service-worker support.

## Run in Replit or on a computer

1. Upload/extract this folder into a Node.js Replit project (or open it in a local development environment).
2. Open the Shell/Terminal and run:

   ```bash
   npm install
   ```

3. Start both the mock API and the website:

   ```bash
   npm run dev:all
   ```

4. Open the Vite web preview at port `5173`. JSON Server runs separately at port `3001`.

If your environment does not support `concurrently`, open two terminal tabs: run `npm run api` in one and `npm run dev` in the other.

## Test and production build

```bash
npm test
npm run test:coverage
npm run build
npm run preview
```

The production files are generated in `dist/`. The test suite checks shipment and profile validation, the accessible status badge, and API/offline fallback behaviour.

## Mock API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/shipments` | List shipment records |
| GET | `/shipments/:id` | Read a shipment |
| POST | `/shipments` | Create a shipment |
| PATCH | `/shipments/:id` | Update shipment fields |
| GET | `/profile` | Read the demo profile |
| PATCH | `/profile` | Update the demo profile |
| GET | `/users` | Read demo workspace users |

The API URL defaults to `http://localhost:3001`. To use a hosted mock or backend service, set `VITE_API_URL` in the deployment environment before building. Never put private API keys or credentials in frontend environment variables.

## Deployment notes

The frontend can be deployed to Netlify or Vercel as a Vite static site. Set the build command to `npm run build` and the output directory to `dist`. Add an SPA rewrite so deep routes (for example `/shipments/YV-10482`) return `index.html`.

A static frontend deployment does not automatically host JSON Server. For a live shared demo, deploy the API separately and set `VITE_API_URL` to its HTTPS URL. If no API is available, the app uses demo seed data and local storage in that browser. This is useful for evaluating UI states but is not a substitute for a production database.

## Accessibility and performance notes

The app uses semantic page landmarks, labelled form controls, table headers, status announcements, a keyboard skip link, visible focus styles, responsive layouts, lightweight inline SVG icons and lazy-loaded route components. Run Lighthouse against the deployed production URL on mobile and target at least 90 for Performance and Accessibility. The actual score depends on the device, browser, network, hosting and audit settings; do not claim a score without saving the audit report.

## Demo data and security boundaries

All names, phone numbers, shipment references and events in `db.json` are fictional sample records. This is not a production logistics platform. There is no authentication, server-enforced role security, live GPS tracking, geocoding, driver device integration or cryptographically verified signature capture. The admin panel is a UI demonstration only. Add a secured backend and appropriate authorisation before handling real customer information.

## Suggested submission package

Submit the source-code ZIP, `PROJECT-REPORT.docx`, your GitHub repository URL, deployed live URL, wireframes, test output and Lighthouse screenshots. Review the project in a real browser before submitting. Never describe an unrun test or Lighthouse score as passed.

## Screenshots for the internship submission

The folder `docs/screenshots/` contains a capture checklist and suggested filenames. Add genuine screenshots after running the app: dashboard, shipment list, shipment detail, create-shipment form, profile and admin screen. Also add the actual mobile Lighthouse report. Do not treat the low-fidelity wireframes as runtime screenshots.
