export const KeysLocalStorage = {
  selectedTickets: 'A1B2C3',
  totalPeople: 'D4E5F6',
  totalPrice: 'G7H8I9',
  orderCheckout: 'J1K2L3',
  maxAdultCount: 'M4N5O6',
  maxChildCount: 'P7Q8R9',
  checkoutFormAdult: 'S1T2U3',
  checkoutFormChild: 'V4W5X6',
  checkoutFormTitular: 'Y7Z8A9',
  checkoutFormTitularErrors: 'B1C2D3',
  keyAccessToken: 'ASDFGHJKL',
  keyAuthenticated: 'QWERTYUI',
  timeLeft: 'ZXCVBNM',
  countdownStarted: 'ASDFGHJKL',
};

export const removeAllStorage = () => {
  Object.values(KeysLocalStorage).forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const removeCheckoutStorage = () => {
  Object.keys(KeysLocalStorage).forEach((key) => {
    if (key.includes('checkout')) {
      localStorage.removeItem(KeysLocalStorage[key as keyof typeof KeysLocalStorage]);
    }
  });
};
