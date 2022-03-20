import { Fragment, useContext } from "react/cjs/react.development";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart-dropdown.context";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation-bar.styles.scss";

import { signUserOut } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setisCartOpen } = useContext(CartContext);

  const toggleCart = (isCartOpen) => {
    setisCartOpen(!isCartOpen);
    console.log("clicked");
  };

  const signOutHandler = async () => {
    await signUserOut();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-continer" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span onClick={signOutHandler} className="nav-link">
              SIGN-OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN-IN
            </Link>
          )}
          <CartIcon onClick={toggleCart} />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
