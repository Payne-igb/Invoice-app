import { Link } from "react-router-dom";

const Invoice = ({ invoice }) => {
  return (
    <Link
      className="invoice-list"
      to={`/${invoice.id}`}
      onClick={() => {
        console.log(invoice.id);
      }}
    >
      <div className="invoice-list-id">
        <span className="invoice-list-hash">#</span>
        {invoice.id}
      </div>
      <div className="due-date">{invoice.paymentDue}</div>
      <div className="invoice-amount">£{invoice.total.toFixed(2)}</div>
      <div className="middle-section">
        <span className="invoice-name">{invoice.clientName}</span>
      </div>
      <div className={`status ${invoice.status.toLowerCase()}`}>
        <span></span>
        {invoice.status}
      </div>
      <span className="arrow">&gt;</span>
    </Link>
  );
};

export default Invoice;
