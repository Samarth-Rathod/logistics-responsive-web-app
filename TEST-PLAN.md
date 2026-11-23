# Test plan and quality record

## Automated tests included

| Test area | Coverage | Test file |
|---|---|---|
| Shipment validation | Required values, phone format, weight format, origin/destination mismatch | `src/utils/validation.test.js` |
| Profile validation | Required name and email format | `src/utils/validation.test.js` |
| Status component | Accessible status announcement and unknown-status fallback | `src/components/StatusBadge.test.jsx` |
| API behaviour | Successful API response and offline seeded-data fallback | `src/services/api.test.js` |

## Manual acceptance checklist

- [ ] Dashboard displays shipment totals from the current data source.
- [ ] Sidebar routes to Overview, Shipments and Admin panel.
- [ ] Search matches shipment ID, reference, sender, recipient and route.
- [ ] Status filter, sorting and pagination work together.
- [ ] Shipment detail route opens the correct record and displays the timeline.
- [ ] Invalid shipment fields show inline errors and do not submit.
- [ ] A valid shipment is created and appears in the list.
- [ ] Profile changes validate and persist.
- [ ] Admin status changes update the shipment and progress value.
- [ ] CSV export downloads the current shipment list.
- [ ] Mobile navigation opens and closes with the menu and backdrop.
- [ ] App shell loads from the service-worker cache after the first online visit.
- [ ] Previously loaded data remains available when the API is unreachable.
- [ ] Keyboard users can reach links, inputs, selectors and buttons with visible focus.
- [ ] Browser console contains no application errors during the acceptance flow.

## Test execution record

Run `npm test` to execute the Jest and React Testing Library tests. Run `npm run build` to verify the production bundle. Lighthouse must be run against the deployed production build in Chrome DevTools; the target is 90 or higher for Performance and Accessibility on mobile. A Lighthouse score is environment-dependent, so this repository does not claim a score until a real audit has been performed.
