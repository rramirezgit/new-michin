import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <MainLayout slotsDisplay={{ car: false, store: false, rightAreaStart: false }}>
      {children}
    </MainLayout>
  );
}
