import React, { useState } from 'react';

const FAKE_DATA = {
  pharmacies: [
    { id: 'p1', name: 'CVS Pharmacy – Windward Pkwy', address: '123 Windward Pkwy', savePct: 8, cashback: 2.4, distance: 0.7 },
    { id: 'p2', name: 'Walgreens – Old Milton Pkwy', address: '45 Old Milton Pkwy', savePct: 12, cashback: 3.1, distance: 1.2 },
    { id: 'p3', name: 'Rite Aid – Haynes Bridge', address: '800 Haynes Bridge Rd', savePct: 6, cashback: 1.8, distance: 2.4 }
  ],
  petStores: [
    { id: 't1', name: 'PetSmart – North Point', address: '400 North Point Pkwy', savePct: 5, cashback: 1.7, distance: 1.9 },
    { id: 't2', name: 'Hollywood Feed – Avalon', address: '370 Avalon Blvd', savePct: 9, cashback: 2.25, distance: 0.9 }
  ],
  specialty: [
    { id: 's1', name: 'GNC – Mansell Rd', address: '55 Mansell Rd', savePct: 7, cashback: 1.9, distance: 3.2 }
  ],
  transactions: [
    { id: 'tx1', title: 'CVS – Prescription', amountSaved: 3.2, cashback: 2.4, date: '2025-11-26' },
    { id: 'tx2', title: 'PetSmart – Dog Food', amountSaved: 1.5, cashback: 1.7, date: '2025-11-20' },
    { id: 'tx3', title: 'Walgreens – Vitamins', amountSaved: 2.1, cashback: 3.1, date: '2025-10-13' }
  ],
};

function Chip({ children }) {
  return (
    <span className="inline-block text-[11px] font-medium px-2 py-1 rounded-full border border-gray-200 bg-white/70">
      {children}
    </span>
  );
}

function LocationRow({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="w-full p-3 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 text-left"
    >
      <div>
        <div className="font-semibold text-sm">{item.name}</div>
        <div className="text-xs text-gray-500">{item.address}</div>
        <div className="text-xs text-gray-500">{item.distance} mi away</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold">Save {item.savePct}%</div>
        <div className="text-xs text-gray-600">Earn ${item.cashback.toFixed(2)}</div>
      </div>
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState('pharmacies');
  const [active, setActive] = useState(null);
  const [view, setView] = useState('home'); // home | wallet

  const lists = {
    pharmacies: FAKE_DATA.pharmacies,
    'pet-stores': FAKE_DATA.petStores,
    specialty: FAKE_DATA.specialty,
  };

  const totalCashback = FAKE_DATA.transactions.reduce((s, t) => s + t.cashback, 0);
  const lifetimeSaved = FAKE_DATA.transactions.reduce((s, t) => s + t.amountSaved, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex items-start justify-center py-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">Upside+ Rebate Finder</div>
            <div className="text-xs text-gray-500">
              Demo extension for pharmacy, pet, and specialty rebates
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setView('home')}
              className={`px-3 py-2 rounded-xl border text-xs ${
                view === 'home' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setView('wallet')}
              className={`px-3 py-2 rounded-xl border text-xs ${
                view === 'wallet' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white'
              }`}
            >
              Wallet
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {view === 'home' && (
            <>
              {/* Tabs */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setTab('pharmacies')}
                  className={`flex-1 py-2 rounded-lg text-xs border ${
                    tab === 'pharmacies'
                      ? 'bg-amber-50 border-amber-300 font-semibold'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  Pharmacies
                </button>
                <button
                  onClick={() => setTab('pet-stores')}
                  className={`flex-1 py-2 rounded-lg text-xs border ${
                    tab === 'pet-stores'
                      ? 'bg-amber-50 border-amber-300 font-semibold'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  Pet Stores
                </button>
                <button
                  onClick={() => setTab('specialty')}
                  className={`flex-1 py-2 rounded-lg text-xs border ${
                    tab === 'specialty'
                      ? 'bg-amber-50 border-amber-300 font-semibold'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  Specialty
                </button>
              </div>

              {/* Location list */}
              <div className="rounded-xl border border-gray-100 overflow-hidden bg-white">
                {lists[tab].map((item) => (
                  <LocationRow key={item.id} item={item} onOpen={setActive} />
                ))}
                {lists[tab].length === 0 && (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No offers in this category (demo).
                  </div>
                )}
              </div>

              {/* Quick summary */}
              <div className="mt-4 bg-slate-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[11px] text-gray-500">Total potential cashback (demo)</div>
                    <div className="text-lg font-semibold">${totalCashback.toFixed(2)}</div>
                  </div>
                  <Chip>Activate in Upside app</Chip>
                </div>
              </div>
            </>
          )}

          {view === 'wallet' && (
            <div>
              <div className="p-3 bg-gradient-to-r from-amber-50 to-white rounded-xl mb-3 border border-amber-100">
                <div className="text-xs text-gray-500">Lifetime saved (demo)</div>
                <div className="text-2xl font-bold">${lifetimeSaved.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-1">Pending: $0.00</div>
              </div>

              <div className="text-sm font-semibold mb-2">Recent activity</div>
              <div className="rounded-lg border border-gray-100 overflow-hidden bg-white">
                {FAKE_DATA.transactions.map((tx) => (
                  <div key={tx.id} className="p-3 flex justify-between border-b border-gray-100">
                    <div>
                      <div className="text-sm font-semibold">{tx.title}</div>
                      <div className="text-xs text-gray-500">{tx.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Saved ${tx.amountSaved.toFixed(2)}</div>
                      <div className="text-xs text-gray-600">
                        Cashback ${tx.cashback.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-500">Demo • Fake data only</div>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200">
              Share
            </button>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
              Profile
            </button>
          </div>
        </div>

        {/* Detail modal */}
        {active && (
          <div className="absolute inset-0 bg-black/30 flex items-end justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b">
                <div className="text-lg font-semibold">{active.name}</div>
                <div className="text-xs text-gray-500">{active.address}</div>
              </div>
              <div className="p-4">
                <div className="mb-2 text-sm font-semibold">Offer details</div>
                <div className="text-xl font-bold">
                  Save {active.savePct}% • Earn ${active.cashback.toFixed(2)}
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Example: Save up to {active.savePct}% on eligible purchases. Cashback paid within
                  7–14 days. This is a demo-only flow and does not represent real offers.
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      alert('Activate (demo): in a real app this would start the Upside offer flow.')
                    }
                    className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold"
                  >
                    Activate Offer
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="flex-1 py-2 rounded-lg border text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4 text-[11px] text-gray-400">
                  Demo only • Not affiliated with Upside. All locations & amounts are fake.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
