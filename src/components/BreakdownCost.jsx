import BreakdownContent from "./BreakdownContent";
import BreakdownContentMobile from "./BreakdownContentMobile";

const BreakdownCost = ({ invoice }) => {
  return (
    <>
      <div className="breakdown-cost mobile">
        {invoice.items.map((item) => (
          <BreakdownContentMobile key={item.id} item={item} />
        ))}
      </div>
      <div className="breakdown-cost desktop">
        <div className="item-headers">
          <p className="item-header name">Item Name</p>
          <p className="item-header qty">QTY.</p>
          <p className="item-header price">Price</p>
          <p className="item-header total">Total</p>
        </div>
          {invoice.items.map((item) => (
            <BreakdownContent key={item.id} item={item} />
          ))}
        </div>
    </>
  );
};

export default BreakdownCost;
