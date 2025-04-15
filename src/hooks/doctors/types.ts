
export interface Service {
  id: string;
  name: string;
  price: number;  // Ensure price is consistently a number
  category?: string;
}
