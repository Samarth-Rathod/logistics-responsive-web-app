import { validateProfile, validateShipment } from './validation';

describe('validateShipment', () => {
  const validShipment = {
    sender: 'Northstar Foods', recipient: 'Aarav Mehta', recipientPhone: '+91 98765 43210',
    origin: 'Mumbai, MH', destination: 'Pune, MH', cargo: 'Food cartons', weight: '250 kg', expectedDelivery: '2026-12-01',
  };

  test('accepts a complete shipment with a valid phone and weight', () => {
    expect(validateShipment(validShipment)).toEqual({});
  });

  test('requires the sender and recipient details', () => {
    const errors = validateShipment({ ...validShipment, sender: '', recipient: '', recipientPhone: '' });
    expect(errors.sender).toBe('This field is required.');
    expect(errors.recipient).toBe('This field is required.');
    expect(errors.recipientPhone).toBe('This field is required.');
  });

  test('rejects an invalid phone number, weight and identical route', () => {
    const errors = validateShipment({ ...validShipment, recipientPhone: 'abc', weight: 'a lot', destination: 'Mumbai, MH' });
    expect(errors.recipientPhone).toBe('Enter a valid phone number.');
    expect(errors.weight).toMatch(/number followed by kg/);
    expect(errors.destination).toBe('Destination must be different from origin.');
  });
});

describe('validateProfile', () => {
  test('requires a name and a valid email address', () => {
    expect(validateProfile({ name: '', email: 'not-an-email', phone: '' })).toMatchObject({
      name: 'Name is required.', email: 'Enter a valid email address.',
    });
  });
});
