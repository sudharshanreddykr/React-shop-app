import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import StorageService from "../services/StorageService";
import { CartType } from "../types";
import { BrowserRouter, Link, NavLink, Redirect, useHistory } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import ImageWithFallback from "../components/ImageWithFallback";
type Props = {
  cartItems: any;
  btnClick: () => void;
  deleteCartData: (id: number) => void;
  increamentQty: (id: number) => void;
  decrementQty: (id: number) => void;
} & RouteComponentProps;
type State = {
  change: boolean;
  reRender: boolean;
  totalAmo: number;
};
class Cart extends React.Component<Props, State> {
  state: State = { change: false, reRender: false, totalAmo: 0 };

  deductTotal(price: string) {
    const temp: number = parseInt(price);
    this.setState((prevState) => ({ totalAmo: prevState.totalAmo - temp }));
  }
  render () {
        const AllproductId: any = [];
    let allDataList: any = [];
    const datas = this.props.cartItems.cart;
    let finaldata = datas.map((data: any, index: number, arr: any) => {
      if (AllproductId.includes(data.productId) === false) {
        allDataList.push(data);
        AllproductId.push(data.productId);
      }
    });

    const submit = (e: any) => {
      e.preventDefault();
      this.setState({
        reRender: true,
      });
    };
    const redirecting = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/payment" />;
      }
    };

    let allTotalAmount: number = 0;
    return (
      <Container>
        <Row>
          <Column size={12}>
            <div className="jumbotron text-center">
              <h1 className="display-5 fw-bold">Cart Item</h1>
            </div>
          </Column>
        </Row>
        <Row>
          { allDataList.map( ( data: any, index: number ) =>
            data.productQty > 0 ? (
             <Column
                size={ 6 }
                classes={
                  "justify-content-between rounded-3 align-items-start rounded-3 mt-1 ms-2 shadow-lg h-auto w-auto mb-3  border border-5"
                }
              >

              </Column>
            )) }
          <Row>
            <Column size={6}>
              <br />
              <br />
              <div className="card d-flex border-warning  mb-5 shadow-lg bg-light fw-bold ">
                <div className="card-header text-center text-dark fs-3">
                  Total Amount
                </div>
                <div className="card-body text-dark w-50">
                  <p className="card-title">
                    Sub-Total =
                    <span className="text-dark fs-5">
                      &#8377; {allTotalAmount}
                    </span>
                  </p>
                  <hr />
                  <p className="card-title">
                    Tax =<span className="text-dark fs-5">&#8377; 00.00</span>
                  </p>
                  <hr />
                  <p className="card-title">
                    Total =
                    <span className="text-dark fs-3">
                      &#8377; {allTotalAmount}
                    </span>
                  </p>
                </div>
              </div>
              <NavLink to={"/payment"}>
                <button
                  onClick={() => console.log("checkout")}
                  className="bg-warning border border-3 rounded-3  fw-bold  fs-3 text-light text-center p-1 ms-5 w-75 align-items-center shadow-lg float-center fa fa-shopping-cart"
                  aria-hidden="true"
                >
                  .Check Out
                </button>
              </NavLink>
            </Column>
          </Row>
        </Row>
      </Container>
    );
  }
}

const mapStoreToProps = (store: CartType) => {
  return {
    cartItems: store,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteCartData: (id: number) => dispatch(CartActions.removeItem(id)),
    increamentQty: (id: number) => dispatch(CartActions.increaseQty(id)),
    decrementQty: (id: number) => dispatch(CartActions.decrementQty(id)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Cart);
