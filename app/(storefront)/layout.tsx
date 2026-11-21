import Header from "@/components/navigation/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

