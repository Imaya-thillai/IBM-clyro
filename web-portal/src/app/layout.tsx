import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CYLRO - IBM Legacy Modernization',
  description: 'Evidence-Based Legacy Modernization with IBM Bob',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 min-h-screen selection:bg-blue-900 selection:text-white flex flex-col`}>
        <Header />
        <div className="flex flex-1 max-w-full">
            <Sidebar />
            <main className="flex-1 min-w-0 px-4 md:px-8 py-8 h-[calc(100vh-3.5rem)] overflow-y-auto">
                {children}
            </main>
        </div>
      </body>
    </html>
  );
}
