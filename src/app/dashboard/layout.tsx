// /Users/matt/ojtrack/src/app/dashboard/layout.tsx
"use client";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
    
      <main className="flex-grow">{children}</main> {/* Dashboard Content */}
  
    </div>
  );
};

export default DashboardLayout;
