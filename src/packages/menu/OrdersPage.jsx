import s from "./CSS/ordersPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import zloiAPI from "../../files/API/zloiAPI.js";
import OrderContentDialog from "../dashboard/OrderContentDialog.jsx";

// import rejected from "../../files/img/payment/rejected.svg";
// import checking from "../../files/img/payment/checking.svg";
// import confirmed from "../../files/img/payment/confirmed.svg";
// import exitImg from "../../files/img/exit.svg";

export default function OrdersPage() {
  const { t } = useTranslation();
  const orders = useSelector((state) => state.admin.orders);
  const [isOrderShow, setOrderShow] = useState(false);
  const [title, setTitle] = useState(t("Loading"));
  const dispatch = useDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("Token") && orders.length === 0) {
      zloiAPI
        .getOrders(cookies.get("Token"))
        .then((res) => {
          if (res.data.data.length !== 0) {
            dispatch({ type: "LOAD_ALL_ORDERS", payload: res.data.data });
          } else {
            setTitle(t("No orders"));
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: "SHOW_MESSAGE",
            payload: "Loading orders error",
            color: "red",
          });
          setTitle("Error");
        });
    } else {
      if (title !== "Your login doesn't have any order") {
        setTitle("Your login doesn't have any order");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders.length]);

  //repeated in OrdersDialog.jsx
  function formattedDate(el_date) {
    let t = el_date.split(/\D/g);
    return {
      date: t[2] + "." + t[1] + "." + t[0].slice(-2),
      time: t[3] + ":" + t[4],
    };
  }

  const reversedArray = orders.map((e, i, a) => a[a.length - 1 - i]);

  return (
    <>
      {isOrderShow && <OrderContentDialog setOrderContentShow={setOrderShow} />}
      <ul className={s.wrapFlex}>
        {orders.length === 0 && <div className={s.noOrderTitle}>{title}</div>}
        {reversedArray.map((el, index) => (
          <li
            className={`${s.orderElement} `}
            key={index}
            onClick={(e) => {
              dispatch({
                type: "SET_ORDER_CONTENT",
                payload: el.content,
                id: el.id,
                comment: el.comment,
                payments: el.payments,
                scrollPosition:
                  e.target.nodeName === "P"
                    ? e.target.parentElement.parentElement.scrollTop
                    : e.target.parentElement.scrollTop,
              });
              setOrderShow(true);
            }}
          >
            <p>{el.id}</p>
            <p>{formattedDate(el.create_date).date}</p>
            <p>{formattedDate(el.create_date).time}</p>
            <p>{el.total}</p>
            <p>{el.status}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
