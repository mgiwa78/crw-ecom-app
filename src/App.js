import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigaiton-bar/navigation-bar.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./components/shop/shop.component";
import CheckOut from "./routes/check-out/checkout.component";

function App() {
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
