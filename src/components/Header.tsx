// src/components/Header.tsx

import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <div className="">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          Big Dawks Moving Company
        </Link>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><Link href="/" className="nav-link px-2 link-secondary">Home</Link></li>
          <li><Link href="/features" className="nav-link px-2 link-dark">Features</Link></li>
          <li><Link href="/pricing" className="nav-link px-2 link-dark">Pricing</Link></li>
          <li><Link href="/faqs" className="nav-link px-2 link-dark">FAQs</Link></li>
          <li><Link href="/about" className="nav-link px-2 link-dark">About</Link></li>
        </ul>
        <div className="col-md-3 text-end">
          {/* Keep the buttons as they are, assuming they are client-side */}
          <button type="button" className="btn btn-outline-primary me-2">Login</button>
          <button type="button" className="btn btn-primary">Sign-up</button>
        </div>
      </header>
    </div>
  );
}

export default Header;