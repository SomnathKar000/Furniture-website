import { useEffect } from "react";
import OrderContent from "../components/OrderContent";
import { useParams, useHistory } from "react-router-dom";
import { PageHero, Loading, Error } from "../components";
import { usePaymentContext } from "../context/payment_context";

const SingleOrderPage = () => {
  const { id } = useParams();
  const {
    order_list,
    GetSingleOrder,
    single_order_loading,
    single_order_error,
    single_order,
  } = usePaymentContext();
  useEffect(() => {
    const OLIst = [...order_list];
    GetSingleOrder(id, OLIst);
  }, [id]);
  if (single_order_error || Object.keys(single_order).length === 0) {
    return (
      <>
        <PageHero />
        <Error />
      </>
    );
  }
  if (single_order_loading || order_list.length === 0) {
    return (
      <>
        <PageHero />
        <Loading />
      </>
    );
  }
  return (
    <>
      <PageHero />
      <OrderContent items={single_order} />
    </>
  );
};
export default SingleOrderPage;
