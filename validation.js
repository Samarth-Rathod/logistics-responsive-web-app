const PHONE_PATTERN = /^[+]?[-\s0-9()]{8,18}$/;

export function validateShipment(values) {
  const errors = {};
  const required = ['sender', 'recipient', 'recipientPhone', 'origin', 'destination', 'cargo', 'weight', 'expectedDelivery'];
  required.forEach((field) => {
    if (!String(values[field] ?? '').trim()) errors[field] = 'This field is required.';
  });
  if (values.recipientPhone && !PHONE_PATTERN.test(values.recipientPhone.trim())) {
    errors.recipientPhone = 'Enter a valid phone number.';
  }
  if (values.origin && values.destination && values.origin.trim().toLowerCase() === values.destination.trim().toLowerCase()) {
    errors.destination = 'Destination must be different from origin.';
  }
  if (values.weight && !/^\d+(\.\d+)?\s?(kg|g|tonnes?|t)$/i.test(values.weight.trim())) {
    errors.weight = 'Use a number followed by kg, g or tonnes (for example, 250 kg).';
  }
  if (values.expectedDelivery) {
    const date = new Date(`${values.expectedDelivery}T00:00:00`);
    if (Number.isNaN(date.getTime())) errors.expectedDelivery = 'Enter a valid delivery date.';
  }
  return errors;
}

export function validateProfile(values) {
  const errors = {};
  if (!String(values.name || '').trim()) errors.name = 'Name is required.';
  if (!String(values.email || '').trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.phone && !PHONE_PATTERN.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.';
  return errors;
}
