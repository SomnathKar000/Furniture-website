import { useEffect } from "react";
import OrderContent from "../components/OrderContent";
import { useParams, useHistory } from "react-router-dom";
import { PageHero, Loading, Error } from "../components";
import { usePaymentContext } from "../context/payment_context";

const SingleOrderPage = () => {
  const { id } = useParams();
  const {
    GetSingleOrder,
    single_order_loading,
    single_order_error,
    single_order,
  } = usePaymentContext();
  useEffect(() => {
    GetSingleOrder(id);
  }, [id]);
  if (single_order_error) {
    return (
      <>
        <PageHero />
        <Error />
      </>
    );
  }
  if (single_order_loading) {
    return (
      <>
        <PageHero />
        <Loading />
      </>
    );
  }

  // const { items } = single_order;
  return (
    <>
      <PageHero />
      <OrderContent items={single_order} />
    </>
  );
};
export default SingleOrderPage;
