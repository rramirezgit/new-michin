import { CONFIG } from 'src/config-global';

import { CheckoutTimeOut } from 'src/sections/checkout/checkout-time-out';

// ----------------------------------------------------------------------

export const metadata = { title: `Checkout - ${CONFIG.site.name}` };

export default function Page() {
  return <CheckoutTimeOut />;
}
