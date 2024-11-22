import { CONFIG } from 'src/config-global';

import { CheckoutView } from 'src/sections/checkout/view';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export const metadata = { title: `Checkout - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <AuthGuard postLoginRedirectPath="/product/checkout">
      <CheckoutView />
    </AuthGuard>
  );
}
