import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}