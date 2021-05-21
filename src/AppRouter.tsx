import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "./components/Container";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./containers/Login";
import ProductDetail from "./containers/ProductDetail";
import ProductList from "./containers/ProductList";
import Demo from "./Demo";
import Cart from "./containers/Cart";
import Register from "./containers/Register";
import address from "./containers/address";
import Checkout from "./containers/Checkout";
import ImageUpload from "./containers/ImageUpload";
import OrderDetails from "./components/OrderDetails";

const LazyProfile = React.lazy(() => import("./containers/Profile"));

const AppRouter: React.FC = () => {
  return (
    <main>
      <Container fluid>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={"/"} component={Demo} exact />
            <Route path={"/products"} component={ProductList} />
            <Route path={"/login"} component={Login} />
            <PrivateRoute path={"/profile"} component={LazyProfile} />
            <Route path={"/productdetail/:id"} component={ProductDetail} />
            <Route path={"/cart"} component={Cart}></Route>
            <Route path={"/register"} component={Register}></Route>
            <Route path={"/checkout"} component={Checkout}></Route>
            <Route path={"/address"} component={address} />
            <Route path={"/imageupload"} component={ImageUpload} />
            <Route path={"/orderdetails"} component={OrderDetails} />
            {/* 404 Route */}
            <Route component={ErrorPage} />
          </Switch>
        </React.Suspense>
      </Container>
    </main>
  );
};
export default AppRouter;
