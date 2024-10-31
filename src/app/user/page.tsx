// ----------------------------------------------------------------------

import UserView from 'src/sections/user/user-view';

import { AuthGuard } from 'src/auth/guard';

export const metadata = {
  title: 'Acuarios Michin',
  description: '',
};

export default function Page() {
  return (
    <AuthGuard>
      <UserView />
    </AuthGuard>
  );
}
