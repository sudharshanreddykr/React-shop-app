import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Column from "../components/Column";
import { CartType, StoreType } from "../types";
import {
  NavLink,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";

type Props = {
  cartItems: CartType[];
  deleteCartData: (id: number) => void;
  increamentQty: (id: number) => void;
  decrementQty: (id: number) => void;
} & RouteComponentProps;
type State = {
  reRender: boolean;
  totalAmo: number;
};

class Cart extends React.Component<Props, State> {
  state: State = { reRender: false, totalAmo: 0 };

  render() {
    console.log("total", this.state.totalAmo);
    const submit = (e: any) => {
      e.preventDefault();
      this.setState({
        reRender: true,
      });
    };
    const redirecting = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/checkout" />;
      }
    };

    let TotalAmount: number = 0;
    return (
      <Container>
        <Row>
          <Column size={8}>
            <div className="jumbotron text-center"></div>
          </Column>
        </Row>

        <Column size={12}>
          <div className="container card col-md-8">
            {redirecting()}
            <h1 className="display-5 fw-bold text-primary text-center ">
              CART LIST
            </h1>
            <table className="table">
              <tbody>
                {this.props.cartItems.map((data: any, index: number) =>
                  data.productQty > 0 ? (
                    <tr key={data.productId}>
                      <div className="">
                        <td>
                          <img
                            src={data.productImage}
                            className="col-md-3"
                            alt="img"
                          />
                        </td>
                      </div>
                      <th className="fw-bold display-7" scope="row">
                        {index + 1}
                      </th>
                      <td className="fw-bold display-7">{data.productId}</td>
                      <td className="fw-bold display-7">{data.productName}</td>
                      <td className="fw-bold display-7">
                        INR {data.productSalePrice}
                      </td>
                      <td>
                        <button
                          className="btn btn-success m-1"
                          onClick={() =>
                            this.props.increamentQty(data.productId)
                          }
                        >
                          +
                        </button>
                        {data.productQty}
                        <button
                          className="btn btn-danger m-1"
                          onClick={() =>
                            this.props.decrementQty(data.productId)
                          }
                        >
                          -
                        </button>
                      </td>
                      <td className="fw-bold display-7">
                        INR {data.productSalePrice * data.productQty}
                        <p style={{ display: "none" }}>
                          {
                            (TotalAmount =
                              TotalAmount +
                              data.productSalePrice * data.productQty)
                          }
                        </p>
                      </td>

                      <td>
                        <div className="mt-5  pb-0 mb-1  rounded ">
                          <button
                            className="btn btn-info fw-bold"
                            onClick={() => {
                              this.props.deleteCartData(data.productId);
                            }}
                          >
                            <i className="fas fa-trash display-7"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
            <div className="card-body border border-5 w-50 bg-secondary">
              <h5 className={"totalProductPrice fw-bold"}>
                Sub-Total Price: <b className="text-light"> {TotalAmount}</b>
              </h5>
            </div>
            <br />
            <NavLink to="/payment">
              <button
                className="bg-warning w-50 fw-bold border border-5 border-warning text-light p-1 rounded-3 "
                onClick={submit}
              >
                CHECK OUT
              </button>
            </NavLink>
            <br />
          </div>
        </Column>
      </Container>
    );
  }
}

const mapStoreToProps = (state: StoreType) => {
  return {
    cartItems: state.cart,
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
