const BreakdownContentMobile = ({item}) => {
    return (
      <div className="breakdown-content">
        <div>
          <p>{item.name}</p>
          <p className="quantity">{item.quantity} x £ {item.price.toFixed(2)}</p>
        </div>
            <p>£ {item.total.toFixed(2)} </p>
      </div>
    );
}
 
export default BreakdownContentMobile;