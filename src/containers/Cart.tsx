import React from "react";
import { connect } from "react-redux";
import Column from "../components/Column";
import { CartType, StoreType } from "../types";
import { NavLink, Redirect, RouteComponentProps } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";

type Props = {
  cartItems: CartType[];
  deleteCartData: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
} & RouteComponentProps;
type State = {
  reRender: boolean;
  totalAmount: number;
};

class Cart extends React.Component<Props, State> {
  state: State = { reRender: false, totalAmount: 0 };

  render() {
    const ProductId: any = [];
    let ProductData: any = [];
    const datas = this.props.cartItems;
    let finalProductdata = datas.map((data: any, index: number, arr: any) => {
      if (ProductId.includes(data.productId) === false) {
        ProductData.push(data);
        ProductId.push(data.productId);
      }
    });

    console.log("total", this.state.totalAmount);

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

    let fianlPrice: number = 0;
    return (
      <Container>
        <Row>
          <Column size={8}>
            <div className="jumbotron text-center"></div>
          </Column>
        </Row>

        <Column size={12}>
          <div className="container card col-md-8 border border-5 shadow-lg">
            {redirecting()}
            <h1 className="fs-3 fw-bold text-light bg-dark text-center ">
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
                      <td className=" display-7">{data.productId}</td>
                      <td className="fw-bold display-7">{data.productName}</td>
                      <td className="fw-bold display-7">
                        S.Price {data.productSalePrice}
                      </td>
                      <td className="d-flex">
                        <button
                          className="btn btn-info m-1"
                          onClick={() =>
                            this.props.increaseQty(data.productId)
                          }
                        >
                          +
                        </button>
                        <span className="fw-bold">{data.productQty}</span>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() =>
                            this.props.decreaseQty(data.productId)
                          }
                        >
                          -
                        </button>
                      </td>
                      <td className="fw-bold display-7">
                        Total : {data.productSalePrice * data.productQty}
                        <p style={{ display: "none" }}>
                          {
                            (fianlPrice =
                              fianlPrice +
                              data.productSalePrice * data.productQty)
                          }
                        </p>
                      </td>

                      <td>
                        <div className="mt-5 pb-0 mb-1 rounded ">
                          <button
                            className="btn btn-danger fw-bold"
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
            <div className="card-body border border-5 border-secondary shadow-lg w-50 bg-secondary">
              <h5 className={"totalProductPrice fw-bold"}>
                Sub-Total : <b className="text-light"> {fianlPrice}</b>
              </h5>
              <h5 className="fw-bold">Tax: 00.00</h5>
              <h5 className={"totalProductPrice fw-bold"}>
                Total : <b className="text-light"> {fianlPrice}</b>
              </h5>
            </div>
            <br />
            <NavLink to={"/checkout"}>
              <button className="fas fa-shopping-cart bg-warning w-50 fw-bold shadow-lg border border-5 border-warning text-light p-2 rounded-3 ">
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
    increaseQty: (id: number) => dispatch(CartActions.increaseQty(id)),
    decreaseQty: (id: number) => dispatch(CartActions.decreaseQty(id)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Cart);
