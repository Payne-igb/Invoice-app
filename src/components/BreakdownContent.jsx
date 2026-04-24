const BreakdownContent = ({ item }) => {
  return (
    <div className="item-contents">
      <p className="item-desc">{item.name}</p>
      <p className="item-quantity">{item.quantity}</p>
      <p className="item-amount">£ {item.price.toFixed(2)}</p>
      <p className="item-total">£ {item.total.toFixed(2)}</p>
    </div>
  );
};

export default BreakdownContent;
