// ----------------------------------------------------------------------

import ValidateNewPasswordScreen from 'src/sections/auth-michin/validate-new-password-screen';

export const metadata = {
  title: 'Acuarios Michin',
  description: '',
};

export default function Page({ params }: { params: { id: string; email: string } }) {
  return <ValidateNewPasswordScreen id={params.id} email={params.email} />;
}
