import React from "react";
import { useAuthContext } from "../../components/context/AuthContext";
import { formatCurrency, formatDate } from "../../utils/format";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {!!!paymentInfo.length && <p>Không có dữ liệu.</p>}
      {!!paymentInfo.length &&
        paymentInfo.map((item, index) => {
          const { id, name, paymentMethod, createdAt, course } = item;
          return (
            <div
              key={id || new Date().getTime() + index}
              className="itemhistory"
            >
              <div className="name">{name}</div>
              <div className="payment">{paymentMethod}</div>
              <div className="date">{formatDate(createdAt)}</div>
              <div className="money">{formatCurrency(course?.price)} VND</div>
            </div>
          );
        })}
    </div>
  );
};

export default MyPayment;
