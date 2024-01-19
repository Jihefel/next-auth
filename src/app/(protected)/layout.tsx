import Navbar from "./_components/navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex-col gap-y-10 center bg-default">
      <Navbar />
      {children}
    </div>
  );
}
