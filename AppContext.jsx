import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createShipment as createShipmentRequest, getProfile, getShipments, getUsers, updateProfile as updateProfileRequest, updateShipment as updateShipmentRequest } from '../services/api';
import { demoProfile } from '../data/demoData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [shipments, setShipments] = useState([]);
  const [profile, setProfile] = useState(demoProfile);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, tone = 'success') => {
    setToast({ id: Date.now(), message, tone });
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [shipmentResult, profileResult, userResult] = await Promise.all([getShipments(), getProfile(), getUsers()]);
    setShipments(shipmentResult.data);
    setProfile(profileResult.data);
    setUsers(userResult.data);
    setOffline(shipmentResult.offline || profileResult.offline || userResult.offline);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const create = useCallback(async (values) => {
    const result = await createShipmentRequest(values);
    setShipments((current) => [result.data, ...current.filter((item) => item.id !== result.data.id)]);
    setOffline(result.offline);
    notify(result.offline ? 'Shipment saved on this device. Sync when online.' : 'Shipment created successfully.');
    return result.data;
  }, [notify]);

  const update = useCallback(async (id, changes) => {
    const result = await updateShipmentRequest(id, changes);
    setShipments((current) => current.map((item) => (String(item.id) === String(id) ? result.data : item)));
    setOffline(result.offline);
    notify(result.offline ? 'Changes saved locally while offline.' : 'Shipment updated successfully.');
    return result.data;
  }, [notify]);

  const saveProfile = useCallback(async (changes) => {
    const result = await updateProfileRequest(changes);
    setProfile(result.data);
    setOffline(result.offline);
    notify(result.offline ? 'Profile saved on this device.' : 'Profile updated successfully.');
    return result.data;
  }, [notify]);

  const value = useMemo(() => ({ shipments, profile, users, loading, offline, toast, setToast, notify, refresh, createShipment: create, updateShipment: update, updateProfile: saveProfile }), [shipments, profile, users, loading, offline, toast, notify, refresh, create, update, saveProfile]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider.');
  return context;
}
