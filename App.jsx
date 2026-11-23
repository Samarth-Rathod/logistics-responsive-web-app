import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import AppShell from './components/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingState from './components/LoadingState';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Shipments = lazy(() => import('./pages/Shipments'));
const ShipmentDetails = lazy(() => import('./pages/ShipmentDetails'));
const NewShipment = lazy(() => import('./pages/NewShipment'));
const Profile = lazy(() => import('./pages/Profile'));
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <ErrorBoundary>
      <AppShell>
        <Suspense fallback={<LoadingState label="Loading screen…" />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/shipments/:shipmentId" element={<ShipmentDetails />} />
            <Route path="/new-shipment" element={<NewShipment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppShell>
    </ErrorBoundary>
  );
}
