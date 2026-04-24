import { FaTrash } from "react-icons/fa";
const ItemListCreate = ({ item, onChange, onDelete }) => {
  return (
    <>
      <div className="item-name">
        <label htmlFor="item-name">Item Name</label>
        <input
          type="text"
          id="item-name"
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
        />
      </div>

      <div className="final-check-quantity">
        <div>
          <label htmlFor="qty">Qty.</label>
          <input
            type="number"
            id="qty"
            value={item.quantity}
            onChange={(e) =>
              onChange({
                ...item,
                quantity: Number(e.target.value),
                total: Number(e.target.value) * item.price,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={item.price}
            onChange={(e) =>
              onChange({
                ...item,
                price: Number(e.target.value),
                total: item.quantity * Number(e.target.value),
              })
            }
          />
        </div>

        <div className="total-items-1">
          <p className="total">Total</p>
          <p className="total-amount">{item.total?.toFixed(2) || "0.00"}</p>
        </div>
        <div className="delete-icon create" onClick={onDelete}>
          <FaTrash color="#888eb0" />
        </div>
      </div>
    </>
  );
};

export default ItemListCreate;
