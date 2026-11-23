import { demoProfile, demoShipments, demoUsers } from '../data/demoData.js';

const API_BASE = (typeof __API_URL__ !== 'undefined' && __API_URL__) || 'http://localhost:3001';
const clone = (value) => JSON.parse(JSON.stringify(value));
const CACHE_KEYS = {
  shipments: 'wayline.shipments.v1',
  profile: 'wayline.profile.v1',
  users: 'wayline.users.v1',
};

function readCache(key, fallback) {
  try {
    const raw = globalThis.localStorage?.getItem(key);
    return raw ? JSON.parse(raw) : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

function writeCache(key, data) {
  try {
    globalThis.localStorage?.setItem(key, JSON.stringify(data));
  } catch {
    // Storage can be unavailable in private browsing or when the quota is full.
  }
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    if (response.status === 204) return null;
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function getShipments() {
  try {
    const data = await request('/shipments');
    writeCache(CACHE_KEYS.shipments, data);
    return { data, offline: false };
  } catch {
    return { data: readCache(CACHE_KEYS.shipments, demoShipments), offline: true };
  }
}

export async function getShipment(id) {
  const all = await getShipments();
  return all.data.find((shipment) => String(shipment.id) === String(id)) || null;
}

export async function createShipment(values) {
  const current = readCache(CACHE_KEYS.shipments, demoShipments);
  const nextId = `YV-${String(Math.max(10489, ...current.map((item) => Number(String(item.id).replace(/\D/g, '')) || 10489)) + 1)}`;
  const created = {
    ...values,
    id: nextId,
    reference: `PO-${String(Number(nextId.replace(/\D/g, '')) + 9232)}`,
    status: 'Pending',
    priority: values.priority || 'Standard',
    createdAt: new Date().toISOString(),
    assignedTo: 'Unassigned',
    progress: 8,
    podName: '',
    podNote: '',
    timeline: [
      { title: 'Shipment created', detail: 'Pickup request received', date: new Date().toLocaleString('en-IN'), complete: true },
      { title: 'Picked up', detail: 'Awaiting pickup confirmation', date: 'Pending', complete: false },
      { title: 'In transit', detail: 'Awaiting dispatch scan', date: 'Pending', complete: false },
      { title: 'Out for delivery', detail: 'Not yet scheduled', date: 'Pending', complete: false },
      { title: 'Delivered', detail: 'Proof of delivery pending', date: 'Pending', complete: false },
    ],
  };
  try {
    const saved = await request('/shipments', { method: 'POST', body: JSON.stringify(created) });
    writeCache(CACHE_KEYS.shipments, [saved, ...current]);
    return { data: saved, offline: false };
  } catch {
    writeCache(CACHE_KEYS.shipments, [created, ...current]);
    return { data: created, offline: true };
  }
}

export async function updateShipment(id, changes) {
  const current = readCache(CACHE_KEYS.shipments, demoShipments);
  const updated = current.map((shipment) => (String(shipment.id) === String(id) ? { ...shipment, ...changes } : shipment));
  writeCache(CACHE_KEYS.shipments, updated);
  try {
    const saved = await request(`/shipments/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(changes) });
    const finalData = updated.map((shipment) => (String(shipment.id) === String(id) ? { ...shipment, ...saved } : shipment));
    writeCache(CACHE_KEYS.shipments, finalData);
    return { data: finalData.find((shipment) => String(shipment.id) === String(id)), offline: false };
  } catch {
    return { data: updated.find((shipment) => String(shipment.id) === String(id)), offline: true };
  }
}

export async function getProfile() {
  try {
    const data = await request('/profile');
    writeCache(CACHE_KEYS.profile, data);
    return { data, offline: false };
  } catch {
    return { data: readCache(CACHE_KEYS.profile, demoProfile), offline: true };
  }
}

export async function updateProfile(changes) {
  const current = readCache(CACHE_KEYS.profile, demoProfile);
  const updated = { ...current, ...changes };
  writeCache(CACHE_KEYS.profile, updated);
  try {
    const saved = await request('/profile', { method: 'PATCH', body: JSON.stringify(changes) });
    writeCache(CACHE_KEYS.profile, saved);
    return { data: saved, offline: false };
  } catch {
    return { data: updated, offline: true };
  }
}

export async function getUsers() {
  try {
    const data = await request('/users');
    writeCache(CACHE_KEYS.users, data);
    return { data, offline: false };
  } catch {
    return { data: readCache(CACHE_KEYS.users, demoUsers), offline: true };
  }
}

export function clearLocalDemoData() {
  Object.values(CACHE_KEYS).forEach((key) => {
    try { globalThis.localStorage?.removeItem(key); } catch { /* no-op */ }
  });
}
