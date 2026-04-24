import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import EditSidebar from "../components/EditSidebar";
import BreakdownCost from "../components/BreakdownCost";
import "./ViewInvoice.css";
import DeleteModal from "../components/DeleteModal";

const ViewInvoice = ({ invoices, setInvoices, loadPage, setLoadPage, darkMode, setDarkMode }) => {
  const { id } = useParams();
  const [openEditPage, setOpenEditPage] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const invoice = invoices.find((invoice) => invoice.id === id);
  function openDeleteModal() {
    setDeleteModal(true);
    setOverlay(true);
    document.body.classList.add("no-scroll");
  }

  function editPage() {
    setOpenEditPage(true);
    setOverlay(true);
    document.body.classList.add("no-scroll");
  }

  function markPaid() {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "Paid" } : invoice
      )
    );
  }
  return (
    loadPage && (
      <>
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <section
          className={`details-section dark ${openEditPage ? "edit" : ""}`}
        >
          <div className="back-text-container">
            <Link to="/" className="back-text">
              {"<"}Go back
            </Link>
          </div>
          <div className="details-header">
            <div className="status-row">
              <p>Status</p>
              <div className={`status ${invoice.status.toLowerCase()}`}>
                <span></span>
                {invoice.status}
              </div>
            </div>
            <div className="buttons-row">
              <button className="edit-button" onClick={editPage}>
                Edit
              </button>
              <button className="delete-button" onClick={openDeleteModal}>
                Delete
              </button>
              <button className="paid-button" onClick={markPaid}>
                Mark as Paid
              </button>
            </div>
          </div>
          <div className="content-container">
            <div className="content-desc">
              <div className="content-id-work">
                <p className="invoice-list-id">
                  <span>#</span>
                  {invoice.id}
                </p>
                <p className="work">{invoice.description}</p>
              </div>
              <div className="address">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCode}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>
            <div className="about-invoice-container">
              <div className="about-invoice">
                <div className="invoice-date">
                  <div>
                    <p className="invoice-date-text">Invoice date</p>
                    <p className="dueDate">
                      {new Date(invoice.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="payment-due">
                    <p className="payment-due-text">Payment Due</p>
                    <p className="dueDate">
                      {new Date(invoice.paymentDue).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div className="billing-info">
                  <div>
                    <p className="bill-to">Bill To</p>
                    <p className="billing-name">{invoice.clientName}</p>
                  </div>
                  <div className="billing-address">
                    <p>{invoice.clientAddress.street}</p>
                    <p>{invoice.clientAddress.city}</p>
                    <p>{invoice.clientAddress.postCode}</p>
                    <p>{invoice.clientAddress.country}</p>
                  </div>
                </div>
              </div>
              <div className="email-cont">
                <p className="sent-to">Sent to</p>
                <p className="email-address">{invoice.clientEmail}</p>
              </div>
            </div>
            <BreakdownCost invoice={invoice} />
            <div className="grand-total">
              <p className="amount-due">Amount Due</p>
              <p className="grand-amount">£ {invoice.total.toFixed(2)}</p>
            </div>
          </div>
        </section>

        <div className={`footer-section ${openEditPage ? "edit" : ""}`}>
          <button className="edit-button" onClick={editPage}>
            Edit
          </button>
          <button className="delete-button" onClick={openDeleteModal}>
            Delete
          </button>
          <button className="paid-button" onClick={markPaid}>Mark as Paid</button>
        </div>

        {/* Overlay */}

        {deleteModal && (
          <DeleteModal
            overlay={overlay}
            setOverlay={setOverlay}
            id={id}
            setDeleteModal={setDeleteModal}
            invoices={invoices}
            setInvoices={setInvoices}
          />
        )}

        <EditSidebar
          openEditPage={openEditPage}
          setOpenEditPage={setOpenEditPage}
          overlay={overlay}
          setOverlay={setOverlay}
          invoice={invoice}
          setInvoices={setInvoices}
          invoices={invoices}
        />
      </>
    )
  );
};

export default ViewInvoice;
