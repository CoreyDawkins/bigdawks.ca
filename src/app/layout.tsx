import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { Roboto } from 'next/font/google';
const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

import Header from '../components/Header';
import Footer from '../components/Footer';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={roboto.className}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Big Dawks Moving Company</title>
                <meta
                    name="description"
                    content="Big Dawks Moving Company, your trusted partner for local and long-distance moves. Professional, reliable, and affordable moving services."
                />
                {/* Bootstrap CSS */}
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                    crossOrigin="anonymous"
                />
                <style>
                    {`
                        /* Add FontAwesome styles globally */
                        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
                    `}
                </style>
            </head>
            <body className="d-flex flex-column min-vh-100">
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
