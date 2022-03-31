import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {
  NavigationBarContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";

import { selectCurrentUser } from "../../store/user/user.selector";
import { signUserOut } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleCart = (isCartOpen) => {
    console.log("clicked");
  };

  const signOutHandler = async () => {
    await signUserOut();
  };

  return (
    <Fragment>
      <NavigationBarContainer as="div">
        <LogoContainer as={Link} className="logo-continer" to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink as={Link} className="nav-link" to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <span onClick={signOutHandler} className="nav-link">
              SIGN-OUT
            </span>
          ) : (
            <NavLink as={Link} className="nav-link" to="/auth">
              SIGN-IN
            </NavLink>
          )}
          <CartIcon onClick={toggleCart} />
          {isCartOpen && <CartDropdown />}
        </NavLinksContainer>
      </NavigationBarContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
