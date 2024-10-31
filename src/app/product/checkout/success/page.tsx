import { CONFIG } from 'src/config-global';

import { CheckoutSuccess } from 'src/sections/checkout/checkout-success';

// ----------------------------------------------------------------------

export const metadata = { title: `Checkout - ${CONFIG.site.name}` };

export default function Page() {
  return <CheckoutSuccess />;
}
