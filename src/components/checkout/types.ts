export interface ShippingFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  addressComplement: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export type FormErrors = Partial<Record<keyof ShippingFormData, string>>;

export const COUNTRY_CODES: Record<string, string> = {
  'France': 'FR',
  'Belgique': 'BE',
  'Suisse': 'CH',
  'Luxembourg': 'LU',
};
