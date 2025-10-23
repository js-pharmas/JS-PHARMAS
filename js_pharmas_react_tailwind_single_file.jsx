/*
JS PHARMAS - Single-file React component (previewable)
Instructions (read first):
1. This is a single React component you can drop into a create-react-app / Vite React project.
2. Put your logo file in the public folder and name it: /public/logo.png (or change the path in the code below).
   - You uploaded a logo; when building locally, copy that file to the project's public/logo.png
3. Tailwind CSS: this code uses Tailwind classes. If you don't have Tailwind, either add it or replace classes with your own CSS.
4. Pricing: Prices are hidden by default (as requested). To edit prices, open "Admin -> Edit Prices" and enter the admin passcode (default: "jsadmin").
   - Edited prices are saved to localStorage so you can update them without a backend.
5. Contact details are prefilled with your provided info — change them in the CONTACTS object below if needed.

Files you will likely want to create when using this component:
- src/App.jsx  <- paste this component content
- public/logo.png  <- your uploaded logo
- index.css (Tailwind styles) or regular CSS if not using Tailwind

*/

import React, { useEffect, useState } from 'react';

// -------------------- CONFIG (EDIT THESE) --------------------
const CONTACTS = {
  name: 'JS PHARMAS',
  phone: '+923462028982',
  email: 'jspharmas34@gmail.com',
  address: 'Lahore, Punjab Pakistan',
};

// Default products (no prices shown publicly). Edit names/descriptions here.
const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Paracetamol Tablets 500mg', desc: 'Effective pain reliever and fever reducer.' },
  { id: 'p2', name: 'Amoxicillin Capsules', desc: 'Broad-spectrum antibiotic.' },
  { id: 'p3', name: 'Multivitamin Syrup', desc: 'Daily vitamins for overall health.' },
];

// Admin passcode to access price editor. Change it before sharing publicly.
const ADMIN_PASSCODE = 'jsadmin';
// --------------------------------------------------------------

export default function App() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [prices, setPrices] = useState({}); // { productId: price }
  const [showPrices, setShowPrices] = useState(false); // public-facing: default hide
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState(null); // id of product being edited

  useEffect(() => {
    // load prices from localStorage (so edits persist)
    const saved = localStorage.getItem('jspharmas_prices_v1');
    if (saved) {
      try {
        setPrices(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse saved prices', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jspharmas_prices_v1', JSON.stringify(prices));
  }, [prices]);

  function handleEnterAdmin() {
    const attempt = prompt('Enter admin passcode to edit prices');
    if (attempt === ADMIN_PASSCODE) {
      setIsAdmin(true);
      alert('Admin mode enabled — you can now edit prices.');
    } else {
      alert('Incorrect passcode.');
    }
  }

  function handleEditPrice(id) {
    setEditing(id);
  }

  function savePrice(id, value) {
    const cleaned = value === '' ? null : value;
    setPrices(prev => {
      const copy = { ...prev };
      if (cleaned === null) delete copy[id];
      else copy[id] = cleaned;
      return copy;
    });
    setEditing(null);
  }

  function resetPrices() {
    if (!confirm('Reset all saved prices to empty?')) return;
    setPrices({});
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="JS PHARMAS logo" className="h-16 w-16 object-contain rounded-md shadow-sm bg-white" />
            <div>
              <h1 className="text-2xl font-extrabold">{CONTACTS.name}</h1>
              <p className="text-sm text-gray-600">Pharmaceuticals — Trusted. Reliable. Local.</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <a href="#products" className="text-sm font-medium hover:underline">Products</a>
            <a href="#contact" className="text-sm font-medium hover:underline">Contact</a>
            <button
              onClick={() => setShowPrices(s => !s)}
              className="px-3 py-2 bg-transparent border rounded text-sm"
              title="Toggle price visibility (admin only)"
            >
              {showPrices ? 'Hide Prices' : 'Hide Prices'}
            </button>
            <button onClick={handleEnterAdmin} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Admin</button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-r from-teal-50 to-white">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Reliable pharmaceutical products for your community</h2>
              <p className="text-gray-700 mb-6">JS PHARMAS provides quality medicines and healthcare products with a focus on safety and local availability. Contact us for wholesale or pharmacy stocking.</p>

              <div className="flex gap-3">
                <a href={`tel:${CONTACTS.phone.replace(/\s+/g, '')}`} className="px-4 py-2 bg-blue-600 text-white rounded">Call Us</a>
                <a href={`mailto:${CONTACTS.email}`} className="px-4 py-2 border rounded">Email</a>
              </div>

            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Quick Contact</h3>
              <p className="text-sm text-gray-600"><strong>Phone:</strong> <a href={`tel:${CONTACTS.phone.replace(/\s+/g, '')}`}>{CONTACTS.phone}</a></p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a></p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {CONTACTS.address}</p>
            </div>
          </div>
        </section>

        <section id="products" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="text-sm text-gray-600">Prices are hidden publicly. Admin can add/edit prices.</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(prod => (
              <div key={prod.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{prod.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{prod.desc}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    <span className="block">Price:</span>
                    <span className="font-medium text-lg">
                      {showPrices && prices[prod.id] ? `PKR ${prices[prod.id]}` : '—'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdmin ? (
                      <>
                        <button onClick={() => handleEditPrice(prod.id)} className="px-3 py-1 border rounded text-sm">Edit Price</button>
                      </>
                    ) : (
                      <button onClick={() => alert('To order or see prices, please contact us using the contact information.') } className="px-3 py-1 border rounded text-sm">Enquire</button>
                    )}
                  </div>
                </div>

                {/* Inline price editor when editing */}
                {editing === prod.id && isAdmin && (
                  <div className="mt-3">
                    <label className="text-xs text-gray-600">Enter numeric price (no currency):</label>
                    <div className="flex gap-2 mt-1">
                      <input defaultValue={prices[prod.id] ?? ''} id={`price-${prod.id}`} className="flex-1 border rounded px-2 py-1 text-sm" />
                      <button onClick={() => savePrice(prod.id, document.getElementById(`price-${prod.id}`).value)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Save</button>
                      <button onClick={() => setEditing(null)} className="px-3 py-1 border rounded text-sm">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => setShowPrices(true)} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Show Prices Publicly</button>
              <button onClick={() => setShowPrices(false)} className="px-3 py-2 border rounded text-sm">Hide Prices Publicly</button>
              <button onClick={resetPrices} className="px-3 py-2 border rounded text-sm">Reset Saved Prices</button>
            </div>
          )}

        </section>

        <section id="contact" className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">For orders, wholesale inquiries, or distribution requests, reach out using the form or contact details.</p>

              <div className="space-y-3 text-sm text-gray-700">
                <div><strong>Phone:</strong> <a href={`tel:${CONTACTS.phone.replace(/\s+/g, '')}`}>{CONTACTS.phone}</a></div>
                <div><strong>Email:</strong> <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a></div>
                <div><strong>Address:</strong> {CONTACTS.address}</div>
              </div>
            </div>

            <div>
              <ContactForm contacts={CONTACTS} />
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-gray-900 text-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-10 w-10 object-contain rounded-sm bg-white" />
            <div>
              <div className="font-semibold">{CONTACTS.name}</div>
              <div className="text-xs">{CONTACTS.address}</div>
            </div>
          </div>

          <div className="mt-3 md:mt-0 text-xs text-gray-400">© {new Date().getFullYear()} {CONTACTS.name}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm({ contacts }) {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    // For a static site we simply open the default mail client. If you add a backend or form service,
    // replace this with a fetch() call.
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
    window.location.href = `mailto:${contacts.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Your name</label>
        <input name="name" required className="w-full border rounded px-2 py-2 text-sm" />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input name="email" type="email" required className="w-full border rounded px-2 py-2 text-sm" />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" rows={4} required className="w-full border rounded px-2 py-2 text-sm" />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send Message</button>
        <div className="text-xs text-gray-500">Or call us: <a href={`tel:${contacts.phone.replace(/\s+/g, '')}`} className="underline">{contacts.phone}</a></div>
      </div>
    </form>
  );
}
