# Low-fidelity wireframes

These layouts describe the screen hierarchy implemented in the React application. They are intentionally low-fidelity and should be paired with the running UI during evaluator review.

## Shared application frame

```text
┌──────────────────────────┬─────────────────────────────────────────────────────────────┐
│ WAYLINE                  │ Workspace / Current page                 Connected  Profile │
│                          ├─────────────────────────────────────────────────────────────┤
│ WORKSPACE                │                                                             │
│  Overview                │  Page title + short description          Primary action     │
│  Shipments               │                                                             │
│  Admin panel             │  Page content                                                │
│                          │                                                             │
│ Need a hand?             │                                                             │
│ Support link             │                                                             │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
```

## Dashboard

```text
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ Good evening, [name]                                      [+ Create shipment]          │
├────────────────┬────────────────┬────────────────┬────────────────────────────────────┤
│ Total           │ In transit     │ Delivered      │ Need attention                     │
├──────────────────────────────────────────────┬────────────────────────────────────────┤
│ Weekly movement / delivery performance       │ Network snapshot / active routes     │
├──────────────────────────────────────────────┴────────────────────────────────────────┤
│ Recent shipments table                                                                  │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

## Shipments and details

```text
Shipments: Search input | Status filter | Sort
Shipment ID | Recipient | Route | Expected date | Status | View

Details: Shipment ID + status
Route overview + progress
Shipment timeline                         Delivery contact + proof of delivery
```

## New shipment and profile

```text
New shipment: 01 Shipment details (sender, cargo, weight, priority)
              02 Delivery route (origin, destination, expected delivery)
              03 Recipient information (name, phone)
              Cancel | Create shipment

Profile: Profile summary card | Editable personal information form
```

## Admin

```text
Admin: Shipment totals | Delivered | Delayed | Active users
Shipment controls table with per-row status selector and CSV export
Workspace users table with role, account status and last active time
```
