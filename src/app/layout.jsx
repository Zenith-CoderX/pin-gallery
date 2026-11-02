import "./globals.css";
import Header from "@/components/header";

export const metadata = {
  title: "Pin Gallery",
  description: "A private image gallery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
