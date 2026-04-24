import { useEffect, useState } from "react";

const Header = ({
  invoices,
  setOpenCreatePage,
  setOverlay,
  setLoadPage,
  filterStatus,
  setFilterStatus,
}) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    invoices.map((invoice) => {
      setTotal((prev) => prev + 1);
    });
  }, [invoices]);

  function openCreatePage() {
    setOverlay(true);
    setOpenCreatePage(true);
    document.body.classList.add("no-scroll");
  }

  return (
    <header>
      <div className="left-section">
        <h1>Invoices</h1>
        <p className="invoice-count-desktop">
          There are {total} total invoices
        </p>
        <p className="invoice-count-mobile">{total} Invoices</p>
      </div>
      <div className="right-section">
        <div className="filter-status">
          <p className="filter-paragraph">
            Filter <span className="filter-by-status">by status</span>
            <span className="filter-arrow">v</span>
          </p>
          <div className="filter-options">
            <div>
              <input
                type="checkbox"
                id="all"
                checked={filterStatus === "all"}
                onChange={() => {
                  if (filterStatus === "all") {
                    setFilterStatus("");
                  } else {
                    setFilterStatus("all");
                  }
                }}
              />
              <label htmlFor="all">All</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="draft"
                checked={filterStatus === "draft"}
                onChange={() => {
                  if (filterStatus === "draft") {
                    setFilterStatus("all"); // fallback
                  } else {
                    setFilterStatus("draft");
                  }
                }}
              />
              <label htmlFor="draft">Draft</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="pending"
                checked={filterStatus === "pending"}
                onChange={() => {
                  if (filterStatus === "pending") {
                    setFilterStatus("all");
                  } else {
                    setFilterStatus("pending");
                  }
                }}
              />
              <label htmlFor="pending">Pending</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="paid"
                checked={filterStatus === "paid"}
                onChange={() => {
                  if (filterStatus === "paid") {
                    setFilterStatus("all");
                  } else {
                    setFilterStatus("paid");
                  }
                }}
              />
              <label htmlFor="paid">Paid</label>
            </div>
          </div>
        </div>
        <div className="new-invoice" onClick={openCreatePage}>
          <span className="plus-icon invoice-text">+</span> New{" "}
          <span className="invoice-text">Invoice</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
