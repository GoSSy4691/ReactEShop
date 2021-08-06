import s from './cart.module.css';
import closeButton from '../../../files/img/closeButton.png';
import {NavLink} from 'react-router-dom';

let shoppingCart = s.hideCart;
let backGround = s.darkenBackgroundHide;

export function addToCart(name, addFood, render) {
  addFood(name);
  render();
}

export function showCartMenu(render) {
  shoppingCart = s.showCart;
  backGround = s.darkenBackgroundShow;
  render();
}

function hideCartMenu(render) {
  shoppingCart = s.hideCart;
  backGround = s.darkenBackgroundHide;
  render();
}

function Cart(props) {
  return (
    <div className={backGround}>
      <img
        onClick={() => hideCartMenu(props.renderSiteDom)}
        src={closeButton}
        className={s.closeButton}
        alt={'closeButtonInToDoList'}
        title={'Close'}
      />
      <div className={shoppingCart}>
        <div className={s.shoppingCartTitle}>Your choose:</div>
        {props.shopCart.map((currElement, index) =>
          <li key={Math.random()}>{index + 1 + ') ' + currElement}</li>)}
      </div>
      {(() => {
        if (props.shopCart.length > 0) {
          return (<NavLink
            className={s.buttonToOrder}
            exact
            to='/order'
          >Order</NavLink>)
        }})()}
    </div>
  )
}

export default Cart;