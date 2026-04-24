import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewInvoice from "./pages/ViewInvoice";
import InvoicesList from "./pages/InvoicesList";
import "./App.css";

function App() {
  const [invoices, setInvoices] = useState(() => {
    const stored = localStorage.getItem("invoices");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: "RT3080",
            createdAt: "2021-08-18",
            paymentDue: "2021-08-19",
            description: "Re-branding",
            clientName: "Jensen Huang",
            clientEmail: "jensen@example.com",
            status: "Paid",
            total: 1800.9,
            senderAddress: {
              street: "19 Union Terrace",
              city: "London",
              postCode: "E1 3EZ",
              country: "United Kingdom",
            },
            clientAddress: {
              street: "106 Kensington Road",
              city: "London",
              postCode: "SW1 4LG",
              country: "United Kingdom",
            },
            items: [
              {
                id: crypto.randomUUID(),
                name: "Brand Guidelines",
                quantity: 1,
                price: 1800.9,
                total: 1800.9,
              },
            ],
          },
          {
            id: "XM9141",
            createdAt: "2021-08-18",
            paymentDue: "2021-08-19",
            description: "Re-branding",
            clientName: "Alex Grim",
            clientEmail: "alexgrim@example.com",
            status: "Pending",
            total: 556.0,
            senderAddress: {
              street: "19 Union Terrace",
              city: "London",
              postCode: "E1 3EZ",
              country: "United Kingdom",
            },
            clientAddress: {
              street: "106 Kensington Road",
              city: "London",
              postCode: "SW1 4LG",
              country: "United Kingdom",
            },
            items: [
              {
                id: crypto.randomUUID(),
                name: "Brand Guidelines",
                quantity: 1,
                price: 556.0,
                total: 556.0,
              },
            ],
          },
          {
            id: "RG0314",
            createdAt: "2021-08-18",
            paymentDue: "2021-08-19",
            description: "Re-branding",
            clientName: "John Morrison",
            clientEmail: "morrison@example.com",
            status: "Pending",
            total: 14002.33,
            senderAddress: {
              street: "19 Union Terrace",
              city: "London",
              postCode: "E1 3EZ",
              country: "United Kingdom",
            },
            clientAddress: {
              street: "106 Kensington Road",
              city: "London",
              postCode: "SW1 4LG",
              country: "United Kingdom",
            },
            items: [
              {
                id: crypto.randomUUID(),
                name: "Brand Guidelines",
                quantity: 1,
                price: 14002.33,
                total: 14002.33,
              },
            ],
          },
          {
            id: "RT2080",
            createdAt: "2021-08-18",
            paymentDue: "2021-08-19",
            description: "Re-branding",
            clientName: "Alyssa Werner",
            clientEmail: "werner@example.com",
            status: "Pending",
            total: 102.04,
            senderAddress: {
              street: "19 Union Terrace",
              city: "London",
              postCode: "E1 3EZ",
              country: "United Kingdom",
            },
            clientAddress: {
              street: "106 Kensington Road",
              city: "London",
              postCode: "SW1 4LG",
              country: "United Kingdom",
            },
            items: [
              {
                id: crypto.randomUUID(),
                name: "Brand Guidelines",
                quantity: 1,
                price: 102.04,
                total: 102.04,
              },
            ],
          },
          {
            id: "AA1449",
            createdAt: "2021-08-18",
            paymentDue: "2021-08-19",
            description: "Re-branding",
            clientName: "Melissa Clarke",
            clientEmail: "jensen@example.com",
            status: "Paid",
            total: 4032.33,
            senderAddress: {
              street: "19 Union Terrace",
              city: "London",
              postCode: "E1 3EZ",
              country: "United Kingdom",
            },
            clientAddress: {
              street: "106 Kensington Road",
              city: "London",
              postCode: "SW1 4LG",
              country: "United Kingdom",
            },
            items: [
              {
                id: crypto.randomUUID(),
                name: "Brand Guidelines",
                quantity: 1,
                price: 4032.33,
                total: 4032.33,
              },
            ],
          },
          {
            id: "TY9141",
            createdAt: "2021-08-18",
            paymentDue: "2021-08-19",
            description: "Re-branding",
            clientName: "Tom Wayne",
            clientEmail: "tomwayne@example.com",
            status: "Pending",
            total: 6155.91,
            senderAddress: {
              street: "19 Union Terrace",
              city: "London",
              postCode: "E1 3EZ",
              country: "United Kingdom",
            },
            clientAddress: {
              street: "106 Kensington Road",
              city: "London",
              postCode: "SW1 4LG",
              country: "United Kingdom",
            },
            items: [
              {
                id: crypto.randomUUID(),
                name: "Brand Guidelines",
                quantity: 1,
                price: 6155.91,
                total: 6155.91,
              },
            ],
          },
          {
            id: "FV2353",
            createdAt: "2021-08-18",
            paymentDue: "2021-08-19",
            description: "Re-branding",
            clientName: "Anita Wrainwright",
            clientEmail: "wrainwright@example.com",
            status: "Draft",
            total: 3102.04,
            senderAddress: {
              street: "19 Union Terrace",
              city: "London",
              postCode: "E1 3EZ",
              country: "United Kingdom",
            },
            clientAddress: {
              street: "106 Kensington Road",
              city: "London",
              postCode: "SW1 4LG",
              country: "United Kingdom",
            },
            items: [
              {
                id: crypto.randomUUID(),
                name: "Brand Guidelines",
                quantity: 1,
                price: 3102.04,
                total: 3102.04,
              },
            ],
          },
        ];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const [loadPage, setLoadPage] = useState(true);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <InvoicesList
            invoices={invoices}
            setInvoices={setInvoices}
            setLoadPage={setLoadPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />
      <Route
        path="/:id"
        element={
          <ViewInvoice
            invoices={invoices}
            setInvoices={setInvoices}
            loadPage={loadPage}
            setLoadPage={setLoadPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />
    </Routes>
  );
}

export default App;
