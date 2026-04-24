import Sidebar from "./Sidebar";
import Header from "./Header";
const EmptyInvoice = ({
  darkMode,
  setDarkMode,
  invoices,
  setOpenCreatePage,
  setOverlay,
  setLoadPage,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="empty-invoice-container">
      <Header
        invoices={invoices}
        setOpenCreatePage={setOpenCreatePage}
        setOverlay={setOverlay}
        setLoadPage={setLoadPage}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <div className="empty-invoice">
        <h2 className="empty-invoice-header">There's nothing here</h2>
        <div className="empty-invoice-text">
          <p>Create an invoice by clicking the</p>
          <p>New Invoice button to get started</p>
        </div>
      </div>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default EmptyInvoice;
