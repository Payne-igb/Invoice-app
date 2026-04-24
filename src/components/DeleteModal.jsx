import { useNavigate } from "react-router-dom";
const DeleteModal = ({ overlay, setOverlay, id, setDeleteModal, invoices, setInvoices }) => {
    const navigate = useNavigate();
  function removeDeleteModal() {
      setOverlay(false);
      setDeleteModal(false);
      document.body.classList.remove('no-scroll')
  }

    function deleteInvoiceItem() {
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
        removeDeleteModal();
        navigate('/');
    }
    
  return (
    <>
      {overlay && <div className="overlay-delete"></div>}
      <div className="delete-modal">
        <h3>Confirm Deletion</h3>
        <p>
          {`Are you sure you want to delete invoice #${id}? This action cannot be
          undone.`}
        </p>
        <div className="modal-button-row">
          <button className="cancel-button delete" onClick={removeDeleteModal}>
            Cancel
          </button>
          <button className="final-delete-btn" onClick={deleteInvoiceItem}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
