import s from "./menu.module.css";
import emptyImg from "../../../files/img/noItem.png";
import runForestRun from "../../../files/img/runForestRun.png";
import shopCartIco from "../../../files/img/shopCart.png";
import Cart from "./cart.js";

function isFoodInOrder(name, inCart) {
  // чет мне кажется это не очень производительно, можно лучше сделать
  //return inCart.find(el => el.name === name) //как то так
  return !!inCart
    .map((element) => element.name)
    .find((element) => element === name);
}

function addInCart(name, addFood, renderSiteDom) {
  addFood(name);
  renderSiteDom();
}

function deleteInCart(name, deleteFood, renderSiteDom) {
  deleteFood(name);
  renderSiteDom();
}

let isCartIcoPushed = false;

function showCartMenu(needCloseOrOpen, render) {
  if (needCloseOrOpen === "close") {
    isCartIcoPushed = false;
  }
  if (needCloseOrOpen === "open") {
    isCartIcoPushed = true;
  }
  render();
}

function CartImgOnTopRight(props) {
  //никогда не сокращай слова в названии, название должно быть не больше пяти слов, идеально когда 3
  return (
    <div className={s.topBar}>
      <img
        alt={"CartImage"}
        src={shopCartIco}
        className={s.shopIco}
        onClick={() => showCartMenu("open", props.renderSiteDom)}
      />
      <div className={s.shopIcoCount}>{props.cart.inCart[0].value}</div>
    </div>
  );
}

function MenuContainers(props) {
  //слишком длинная функция, сочетающая как отображения, так и логику, нужно разделить
  if (props.allMenu.length === 0) return <div>Loading</div>;
  //а если получили, но массив пустой?
  else
    return (
      <div>
        {props.allMenu.map((p) => (
          <div
            className={`${
              isFoodInOrder(p.name, props.cart.inCart)
                ? s.foodElementInOrder
                : s.foodElement
            }`}
            key={p.id}
          >
            <div
              className={`${
                isFoodInOrder(p.name, props.cart.inCart)
                  ? s.itemInOrder
                  : s.item
              }`}
            >
              <img
                src={(() => {
                  if (p.icon === undefined) return emptyImg;
                  else return "https://zloi.space/restaurant/images/" + p.icon;
                })()}
                onError={(e) => (e.target.src = emptyImg)}
                className={s.foodImg}
                alt={"logo"}
              />
              <div className={s.name}>
                <li>{p.name}</li>
              </div>
              <div className={s.sectorOfPriceCountBuy}>
                <div className={s.price}>
                  <li>{p.cost + " ₽"}</li>
                </div>
                {(() => {
                  if (isFoodInOrder(p.name, props.cart.inCart)) {
                    return (
                      <div className={s.deleteAndCountFood}>
                        <button
                          className={s.deleteItem}
                          onClick={() =>
                            deleteInCart(
                              p.name,
                              props.cart.deleteFood,
                              props.renderSiteDom
                            )
                          }
                        >
                          -
                        </button>
                        <div className={s.countItem}>
                          {
                            props.cart.inCart.find((e) => e.name === p.name)
                              .value
                          }
                        </div>
                      </div>
                    );
                  }
                })()}
                <button
                  className={s.buyButton}
                  onClick={() =>
                    addInCart(p.name, props.cart.addFood, props.renderSiteDom)
                  }
                >
                  add
                </button>
              </div>
              <div className={s.description}>
                <li>{p.description}</li>
                {(() => {
                  if (p.description === undefined) {
                    p.description =
                      "Пока ещё нет описания. Но это очень вкусно";
                  }
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default function Menu(props) {
  return (
    <div className={s.showRoom}>
      {(() => {
        if (isCartIcoPushed === true) {
          return (
            <Cart
              cart={props.cart}
              renderSiteDom={props.renderSiteDom}
              showCartMenu={showCartMenu}
            />
          );
        }
      })()}
      <CartImgOnTopRight
        cart={props.cart}
        renderSiteDom={props.renderSiteDom}
      />
      <MenuContainers
        cart={props.cart}
        allMenu={props.allMenu}
        renderSiteDom={props.renderSiteDom}
      />
      <img
        alt={"footer"}
        className={s.footerImg}
        src={runForestRun}
        key={Math.random()}
      />
    </div>
  );
}
