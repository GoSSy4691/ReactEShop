import s from "./header.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import API from "../../files/API/api.js";
import LogoImg from "./logoGoose/LogoImage.jsx";
import Cart from "../menu/Cart.jsx";
import Login from "../login/Login.jsx";

import shopCartIco from "../../files/img/shopCart.png";

export default function Header() {
  const store = useSelector((state) => state.cart);
  const headerStatus = useSelector((state) => state.user.headerStatus);
  const isDialogOpen = useSelector((state) => state.user.isDialogOpen);
  const [isShowCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  //load profile
  if (headerStatus === "Loading") {
    console.log("Loading profile");
    API.getProfile(cookies.get("Token"))
      .then((res) => {
        dispatch({ type: "LOGIN_CONFIRM", payload: res.data[0] });
        dispatch({ type: "PROFILE_DIALOG_STATE", payload: "Profile" });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: "LOGOUT_CONFIRM" });
        dispatch({ type: "ERROR_MESSAGE", payload: "Token expired" });
      });
  }

  return (
    <div className={s.nav}>
      <div className={s.leftSide}>
        <LogoImg />
        <div className={s.bar}>
          <li>
            <NavLink
              className={s.textInactive}
              exact
              activeClassName={s.textActive}
              to="/"
              onClick={() =>
                dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Shops" })
              }
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              className={s.textInactive}
              exact
              activeClassName={s.textActive}
              to="/about"
            >
              About
            </NavLink>
          </li>
        </div>
      </div>
      <div className={s.rightSide}>
        <div
          className={s.userIco}
          onClick={
            headerStatus === "Loading"
              ? null
              : () => dispatch({ type: "PROFILE_DIALOG_SHOW" })
          }
        >
          {headerStatus}
        </div>
      </div>
      <Route exact path="/">
        <div
          title={"Cart"}
          className={s.shopIcoDiv}
          onClick={() => setShowCart(true)}
        >
          <img alt={"CartImage"} src={shopCartIco} className={s.shopIco} />
          {store.itemsCount > 0 ? (
            <div className={s.shopIcoCount}>{store.itemsCount}</div>
          ) : null}
        </div>
      </Route>
      {isDialogOpen ? <Login /> : null}
      {isShowCart ? (
        <Cart isShowCart={isShowCart} setShowCart={setShowCart} />
      ) : null}
    </div>
  );
}
