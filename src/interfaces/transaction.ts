export interface Transaction {
  status: string;
  id: number;
  date: string;
  name: string;
  paymentMethod: string;
  email: string;
  value: string;
  newCustomer: boolean;
}
