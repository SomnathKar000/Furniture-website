import React from "react";
import OrderContent from "../components/OrderContent";
import PageHero from "../components/PageHero";

const OrderListPage = () => {
  return (
    <div>
      <PageHero title={"Orders"} />
      <OrderContent />
    </div>
  );
};

export default OrderListPage;
