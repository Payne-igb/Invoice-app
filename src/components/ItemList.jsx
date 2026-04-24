import { FaTrash } from "react-icons/fa";

const ItemList = ({ item, onChange, onDelete }) => {
  return (
    <>
      <div className="item-name">
        <label htmlFor="item-name">Item Name</label>
        <input
          type="text"
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
                quantity: Number(e.target.value) || 0,
                total:
                  (Number(e.target.value) || 0) * (Number(item.price) || 0),
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
                price: Number(e.target.value) || 0,
                total:
                  (Number(item.quantity) || 0) * (Number(e.target.value) || 0),
              })
            }
          />
        </div>

        <div className="total-items-1">
          <p className="total">Total</p>
          <p className="total-amount">{Number(item.total || 0).toFixed(2)}</p>
        </div>
        <div className="delete-icon" onClick={onDelete}>
          <FaTrash color="#888eb0" />
        </div>
      </div>
    </>
  );
};

export default ItemList;
