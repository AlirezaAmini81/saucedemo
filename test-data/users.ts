const defaultPassword = process.env.E2E_PASSWORD ?? 'secret_sauce';

export const users = {
  standard: {
    username: process.env.E2E_USERNAME ?? 'standard_user',
    password: defaultPassword,
  },
  lockedOut: {
    username: 'locked_out_user',
    password: defaultPassword,
  },
} as const;

export const checkoutCustomer = {
  firstName: 'Jordan',
  lastName: 'Lee',
  postalCode: '10001',
} as const;
