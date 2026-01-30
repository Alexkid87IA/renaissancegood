export interface Store {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  phone?: string;
  commercial?: string;
}
