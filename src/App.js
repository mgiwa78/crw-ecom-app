import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navigation from "./routes/navigaiton-bar/navigation-bar.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./components/shop/shop.component";
import CheckOut from "./routes/check-out/checkout.component";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(checkUserSession()), []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user);
  //     }
  //     dispatch(setCurrentUser(user));
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="check-out" element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
