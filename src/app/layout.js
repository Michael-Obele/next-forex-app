import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Forex Realtime',
  description:
    'Get ahead of the game with real-time forex data, interactive chat, and Forex news. Master 80+ global markets, major FX pairs, and analyze price movements at a glance using intuitive charting tools. Stay on top of the latest Forex news and trends with our comprehensive coverage.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
