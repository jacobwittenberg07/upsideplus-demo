import React, { useState } from "react";

const FAKE_DATA = {
  pharmacies: [
    {
      id: "p1",
      name: "CVS Pharmacy – Windward Pkwy",
      address: "123 Windward Pkwy",
      savePct: 8,
      cashback: 2.4,
      distance: 0.7,
    },
    {
      id: "p2",
      name: "Walgreens – Old Milton Pkwy",
      address: "45 Old Milton Pkwy",
      savePct: 12,
      cashback: 3.1,
      distance: 1.2,
    },
    {
      id: "p3",
      name: "Rite Aid – Haynes Bridge",
      address: "800 Haynes Bridge Rd",
      savePct: 6,
      cashback: 1.8,
      distance: 2.4,
    },
  ],
  petStores: [
    {
      id: "t1",
      name: "PetSmart – North Point",
      address: "400 North Point Pkwy",
      savePct: 5,
      cashback: 1.7,
      distance: 1.9,
    },
    {
      id: "t2",
      name: "Hollywood Feed – Avalon",
      address: "370 Avalon Blvd",
      savePct: 9,
      cashback: 2.25,
      distance: 0.9,
    },
  ],
  specialty: [
    {
      id: "s1",
      name: "GNC – Mansell Rd",
      address: "55 Mansell Rd",
      savePct: 7,
      cashback: 1.9,
      distance: 3.2,
    },
  ],
  transactions: [
    {
      id: "tx1",
      title: "CVS – Prescription",
      amountSaved: 3.2,
      cashback: 2.4,
      date: "2025-11-26",
    },
    {
      id: "tx2",
      title: "PetSmart – Dog Food",
      amountSaved: 1.5,
      cashback: 1.7,
      date: "2025-11-20",
    },
    {
      id: "tx3",
      title: "Walgreens – Vitamins",
      amountSaved: 2.1,
      cashback: 3.1,
      date: "2025-10-13",
    },
  ],
};

function Chip({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        padding: "4px 8px",
        borderRadius: 999,
        border: "1px solid #e5e7eb",
        background: "rgba(255,255,255,0.7)",
      }}
    >
      {children}
    </span>
  );
}

function LocationRow({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      style={{
        width: "100%",
        padding: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f3f4f6",
        background: "white",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{item.address}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          {item.distance} mi away
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          Save {item.savePct}%
        </div>
        <div style={{ fontSize: 12, color: "#4b5563" }}>
          Earn ${item.cashback.toFixed(2)}
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("pharmacies");
  const [active, setActive] = useState(null);
  const [view, setView] = useState("home"); // 'home' | 'wallet'

  const lists = {
    pharmacies: FAKE_DATA.pharmacies,
    "pet-stores": FAKE_DATA.petStores,
    specialty: FAKE_DATA.specialty,
  };

  const totalCashback = FAKE_DATA.transactions.reduce(
    (s, t) => s + t.cashback,
    0
  );
  const lifetimeSaved = FAKE_DATA.transactions.reduce(
    (s, t) => s + t.amountSaved,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9fafb, #e5e7eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid #f3f4f6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              Upside+ Rebate Finder
            </div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>
              Pharmacy, pet, and specialty rebates (demo)
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, fontSize: 11 }}>
            <button
              onClick={() => setView("home")}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: view === "home" ? "#0f172a" : "white",
                color: view === "home" ? "white" : "#111827",
                cursor: "pointer",
              }}
            >
              Browse
            </button>
            <button
              onClick={() => setView("wallet")}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: view === "wallet" ? "#0f172a" : "white",
                color: view === "wallet" ? "white" : "#111827",
                cursor: "pointer",
              }}
            >
              Wallet
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 16 }}>
          {view === "home" && (
            <>
              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 12,
                  fontSize: 12,
                }}
              >
                {[
                  ["pharmacies", "Pharmacies"],
                  ["pet-stores", "Pet Stores"],
                  ["specialty", "Specialty"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 12,
                      border:
                        tab === key
                          ? "1px solid #fbbf24"
                          : "1px solid #e5e7eb",
                      background:
                        tab === key ? "#fffbeb" : "rgba(255,255,255,0.8)",
                      fontWeight: tab === key ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Location list */}
              <div
                style={{
                  borderRadius: 16,
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                {lists[tab].map((item) => (
                  <LocationRow
                    key={item.id}
                    item={item}
                    onOpen={setActive}
                  />
                ))}
                {lists[tab].length === 0 && (
                  <div
                    style={{
                      padding: 16,
                      textAlign: "center",
                      fontSize: 13,
                      color: "#6b7280",
                    }}
                  >
                    No offers in this category (demo).
                  </div>
                )}
              </div>

              {/* Summary */}
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 12,
                  background: "#f3f4f6",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}
                  >
                    Total potential cashback (demo)
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>
                    ${totalCashback.toFixed(2)}
                  </div>
                </div>
                <Chip>Activate in Upside app</Chip>
              </div>
            </>
          )}

          {view === "wallet" && (
            <>
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  background:
                    "linear-gradient(to right, #fffbeb, #ffffff)",
                  border: "1px solid #fbbf24",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 11, color: "#6b7280" }}>
                  Lifetime saved (demo)
                </div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>
                  ${lifetimeSaved.toFixed(2)}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                  Pending: $0.00
                </div>
              </div>

              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Recent activity
              </div>
              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                {FAKE_DATA.transactions.map((tx) => (
                  <div
                    key={tx.id}
                    style={{
                      padding: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>
                        {tx.title}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#6b7280" }}
                      >
                        {tx.date}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14 }}>
                        Saved ${tx.amountSaved.toFixed(2)}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#4b5563" }}
                      >
                        Cashback ${tx.cashback.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: 12,
            borderTop: "1px solid #f3f4f6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
          }}
        >
          <div style={{ color: "#6b7280" }}>Demo • Fake data only</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: "white",
                cursor: "pointer",
              }}
            >
              Share
            </button>
            <button
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #fbbf24",
                background: "#fffbeb",
                cursor: "pointer",
              }}
            >
              Profile
            </button>
          </div>
        </div>

        {/* Detail modal */}
        {active && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              padding: 16,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                background: "white",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(15,23,42,0.3)",
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  {active.name}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  {active.address}
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div
                  style={{ marginBottom: 4, fontSize: 13, fontWeight: 600 }}
                >
                  Offer details
                </div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  Save {active.savePct}% • Earn $
                  {active.cashback.toFixed(2)}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "#4b5563",
                  }}
                >
                  Example: Save up to {active.savePct}% on eligible
                  purchases. Cashback paid within 7–14 days. This is a
                  demo-only flow and does not represent real offers.
                </div>

                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Activate (demo): in a real app this would start the Upside offer flow."
                      )
                    }
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      borderRadius: 12,
                      border: "none",
                      background: "#0f172a",
                      color: "white",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Activate Offer
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      borderRadius: 12,
                      border: "1px solid #e5e7eb",
                      background: "white",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
                    color: "#9ca3af",
                  }}
                >
                  Demo only • Not affiliated with Upside. All locations &
                  amounts are fake.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
