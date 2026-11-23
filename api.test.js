import { clearLocalDemoData, getShipments } from './api';
import { demoShipments } from '../data/demoData';

beforeEach(() => {
  clearLocalDemoData();
  global.fetch = jest.fn();
});

afterEach(() => {
  clearLocalDemoData();
});

describe('shipment API fallback', () => {
  test('returns records from the mock API when it responds successfully', async () => {
    global.fetch.mockResolvedValue({ ok: true, status: 200, json: async () => [{ id: 'YV-90001', status: 'Pending' }] });
    const result = await getShipments();
    expect(result.offline).toBe(false);
    expect(result.data[0].id).toBe('YV-90001');
  });

  test('uses the seeded local dataset when the API is unavailable', async () => {
    global.fetch.mockRejectedValue(new Error('Network unavailable'));
    const result = await getShipments();
    expect(result.offline).toBe(true);
    expect(result.data).toHaveLength(demoShipments.length);
    expect(result.data[0].id).toBe('YV-10482');
  });
});
