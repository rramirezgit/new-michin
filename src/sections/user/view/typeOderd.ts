interface ChargeDetail {
  id: string;
  chargeId: string;
  status: string;
  creationDate: string;
  operationDate: string;
  description: string;
  cardType: string;
  cardBrand: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpirationYear: string;
  cardExpirationMonth: string;
  cardBankName: string;
  amount: number;
  feeAmount: number;
  feeTax: number;
  feeCurrency: string;
  currency: string;
  method: string;
  ticket: number;
  orderId: string;
}

interface Attendee {
  id: string;
  name: string;
  birthDate: string;
  kind: string;
  orderId: string;
}

interface Customer {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  birthDate: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  orderId: string;
}

interface OrderItem {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  productType: string;
  productPrice: number;
  quantity: number;
  reserveId: string;
  availabilityId: string;
  startTime: string;
  endTime: string;
  orderId: string;
}

export interface OrderProps {
  id: string;
  userEmail: string;
  uuid: string;
  store: string;
  eventDate: string;
  totalAmount: number;
  adultsQty: number;
  childrenQty: number;
  responsive: boolean;
  noticeOfPrivacy: boolean;
  regulation: boolean;
  deviceSessionId: string;
  sourceId: string;
  errorMessage: string | null;
  qrData: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  chargeDetail: ChargeDetail;
  attendees: Attendee[];
  customer: Customer;
  orderItem: OrderItem[];
}
