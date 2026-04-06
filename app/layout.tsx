import "./globals.css";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // escolha os pesos que quiser
  variable: '--font-montserrat', // opcional (pra usar com Tailwind)
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
      
        {children}
      </body>
    </html>
  );
}
