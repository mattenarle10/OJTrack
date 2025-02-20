'use client';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
