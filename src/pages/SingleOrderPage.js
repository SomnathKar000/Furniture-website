import { useEffect } from "react";
import OrderContent from "../components/OrderContent";
import { useParams, useHistory } from "react-router-dom";
import { PageHero } from "../components";
import { usePaymentContext } from "../context/payment_context";

const SingleOrderPage = () => {
  // const { id } = useParams();
  // const { GetSingleOrder, single_order } = usePaymentContext();
  // useEffect(() => {
  //   GetSingleOrder(id);
  // }, [id]);

  return (
    <>
      <PageHero />
      <OrderContent />
    </>
  );
};
export default SingleOrderPage;
