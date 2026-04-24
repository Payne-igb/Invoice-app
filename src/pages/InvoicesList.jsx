import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Invoice from "../components/Invoice";
import CreateInvoice from "../components/CreateInvoice";
import EmptyInvoice from "../components/EmptyInvoice";

const InvoicesList = ({
  invoices,
  setInvoices,
  setLoadPage,
  darkMode,
  setDarkMode,
}) => {
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  return invoices.length === 0 ? (
    <EmptyInvoice
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      invoices={invoices}
      setOpenCreatePage={setOpenCreatePage}
      setOverlay={setOverlay}
      setLoadPage={setLoadPage}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
    />
  ) : (
    <>
      <section
        className={`invoice-section dark ${openCreatePage ? "create" : ""}`}
      >
        <Header
          invoices={invoices}
          setOpenCreatePage={setOpenCreatePage}
          setOverlay={setOverlay}
          setLoadPage={setLoadPage}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <main>
          {invoices
            .filter((invoice) => {
              if (filterStatus === "all") return true;
              return invoice.status.toLowerCase() === filterStatus;
            })
            .map((invoice) => (
              <Invoice key={invoice.id} invoice={invoice} />
            ))}
        </main>
      </section>
      {/* Fixed sidebar */}
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <CreateInvoice
        openCreatePage={openCreatePage}
        setOpenCreatePage={setOpenCreatePage}
        overlay={overlay}
        setOverlay={setOverlay}
        setInvoices={setInvoices}
      />
    </>
  );
};

export default InvoicesList;
