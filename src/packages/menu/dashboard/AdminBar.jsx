import s from "./CSS/adminBar.module.css";
import { useState } from "react";
import UsersDialog from "./UsersDialog.jsx";
import PointsDialog from "./PointsDialog.jsx";

import menuOpenSVG from "../../../files/img/adminBar/00_menuOpen.svg";
import userSVG from "../../../files/img/adminBar/01_user.svg";
import menuSVG from "../../../files/img/adminBar/02_menu.svg";
import cartSVG from "../../../files/img/adminBar/03_cart.svg";
import statsSVG from "../../../files/img/adminBar/04_stats.svg";
import dialogSVG from "../../../files/img/adminBar/05_dialog.svg";
import warehouseSVG from "../../../files/img/adminBar/06_warehouse.svg";

export default function AdminBar() {
  const [isBarOpen, setBarOpen] = useState(false);
  const [isUsersShow, setUsersShow] = useState(false);
  const [isPointsShow, setPointsShow] = useState(false);

  return (
    <>
      {isUsersShow && <UsersDialog isUsersShow={isUsersShow} setUsersShow={setUsersShow} />}
      {isPointsShow && <PointsDialog isPointsShow={isPointsShow} setPointsShow={setPointsShow} />}
      <div
        className={s.box}
        style={isBarOpen ? { width: "108px" } : { width: "40px" }}
      >
        <button onClick={() => setBarOpen(!isBarOpen)}>
          <img
            alt={"openBar"}
            src={menuOpenSVG}
            className={s.barOpenBtn}
            style={isBarOpen ? { transform: "rotate(90deg)" } : null}
          />
        </button>
        <button onClick={() => setUsersShow(!isUsersShow)}>
          <img alt={"user"} src={userSVG} />
          {isBarOpen && <p>Users</p>}
        </button>
        <button onClick={() => setPointsShow(!isPointsShow)}>
          <img alt={"menu"} src={menuSVG} />
          {isBarOpen && <p>Menu</p>}
        </button>
        <button>
          <img alt={"orders"} src={cartSVG} />
          {isBarOpen && <p>Orders</p>}
        </button>
        <button>
          <img alt={"stats"} src={statsSVG} />
          {isBarOpen && <p>Stats</p>}
        </button>
        <button>
          <img alt={"dialog"} src={dialogSVG} />
          {isBarOpen && <p>Feedback</p>}
        </button>
        <button>
          <img alt={"warehouse"} src={warehouseSVG} />
          {isBarOpen && <p>Warehouse</p>}
        </button>
      </div>
    </>
  );
}