import React from "react";


const BalanceView = (props) => {
  return (
    <div className="balance tile">
      <h3>Your Balance</h3>
      <p>{props.data.balance}</p>
    </div>
  );
}

export default BalanceView;