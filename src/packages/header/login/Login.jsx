import s from "./login.module.css";
import patternCSS from "../../patternMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useDetectClickOut from "../../../files/useDetectClickOut.js";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";

import penEdit from "../../../files/img/penEdit.svg";

export default function Login() {
  const user = useSelector((state) => state.user);
  const dialogState = useSelector((state) => state.user.dialogState);
  const refLogin = useDetectClickOut(() =>
    dispatch({ type: "PROFILE_DIALOG_SHOW" })
  );
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { t } = useTranslation();

  function logoutBtn() {
    dispatch({
      type: "SHOW_MESSAGE",
      payload: t("Log out confirmed"),
      color: "green",
    });
    dispatch({ type: "LOGOUT_CONFIRM" });
    dispatch({ type: "PROFILE_DIALOG_SHOW" });
    dispatch({ type: "SET_UNPAID_SOMETHING", payload: false });
    dispatch({ type: "CLEAN_ORDERS_LIST" });
  }

  function closeAndRefresh() {
    if (cookies.get("Token") !== undefined) {
      dispatch({
        type: "SHOW_MESSAGE",
        payload: t("Token received"),
        color: "green",
      });
      dispatch({ type: "PROFILE_DIALOG_SHOW" });
      dispatch({ type: "LOAD_PROFILE" });
    } else {
      dispatch({
        type: "SHOW_MESSAGE",
        payload: t("Didn't get token"),
        color: "red",
      });
      dispatch({ type: "PROFILE_DIALOG_STATE", payload: "byPhone" });
    }
  }
  return (
    <div className={patternCSS.darkenBackground}>
      <div className={s.loginDialog} ref={refLogin}>
        <div className={s.naming}>{t("Login to your account")}</div>
        {(() => {
          switch (dialogState) {
            case "byPhone":
              return <ByPhone />;
            case "byPass":
              return <ByPass />;
            case "Wait":
              return (
                <div className={s.afterName}>
                  <div className={s.afterTokenDialog}>
                    {t("Please verify your profile in new window")}
                  </div>
                  <button className={s.logoutBtn} onClick={closeAndRefresh}>
                    {t("Ok")}
                  </button>
                </div>
              );
            case "Profile":
              return (
                <div className={s.afterName}>
                  <div className={s.firstLine}>
                    <div className={s.token}>
                      {t("Hello")},
                      {user.userData.name.length > 0
                        ? user.userData.name
                        : user.userData.login !== null
                        ? user.userData.login
                        : user.userData.phone}
                      !
                    </div>
                    <button>
                      <img
                        alt={"Edit"}
                        src={penEdit}
                        className={s.penEdit}
                        onClick={() =>
                          dispatch({
                            type: "SHOW_MESSAGE",
                            payload: t("Didn't work yet"),
                            color: "red",
                          })
                        }
                      />
                    </button>
                  </div>
                  <div className={s.token}>
                    {user.userData.phone > 0
                      ? user.userData.phone
                      : t("Phone not set")}
                  </div>
                  <div className={s.token}>
                    {user.userData.birthday > 0
                      ? user.userData.birthday
                      : t("Birthday not set")}
                  </div>
                  <NavLink
                    className={s.ordersLink}
                    exact
                    to="/orders"
                    onClick={() => dispatch({ type: "PROFILE_DIALOG_SHOW" })}
                  >
                    {t("Show orders")}
                  </NavLink>
                  <button className={s.logoutBtn} onClick={logoutBtn}>
                    {t("Log out")}
                  </button>
                </div>
              );
            default:
              return <div className={s.afterName}>{t("Error")}</div>;
          }
        })()}
      </div>
    </div>
  );
}
