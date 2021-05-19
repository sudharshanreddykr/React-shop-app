import axios from "axios";
import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import { CartType, StoreType } from "../types";
import { Redirect } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import UserService from "../services/UserService";
import CartActions from "../store/actions/CartActions";

type Props = {
  cartItems: CartType[];
  deleteCartData: (id: number) => void;
  resetCart: () => void;
} & RouteComponentProps;

type State = {
  reRender: boolean;
  Cname: any;
  cardNo: any;
  cvv: any;
  userList: any;
  addressData: any;
};

class Checkout extends React.Component<Props, State> {
  state: State = {
    reRender: false,
    Cname: "",
    cardNo: "",
    cvv: "",
    userList: [],
    addressData: [],
  };

  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      console.log("userData", data);
      this.setState({
        userList: data,
        addressData: data.address,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log();
    const submitHandler = async (e: any) => {
      e.preventDefault();
      this.props.resetCart();
      alert("Payment Done Successfully ");
      const { Cname, cardNo, cvv } = this.state;
      const payment = await UserService.paymentPost(Cname, cardNo, cvv);

      this.setState({
        // reRender: true,
        Cname: this.state.Cname,
        cardNo: this.state.cardNo,
        // expiration: this.state.expiration,
        cvv: this.state.cvv,
        userList: data,
      });
    };

    let finalPrice: number = 0;
    const data = this.props.cartItems.map((val: any) => {
      {
        finalPrice = finalPrice + val.productSalePrice * val.productQty;
      }
    });

    const redirect = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/products" />;
      }
    };
    return (
      <>
        <Container>
          <Row>
            <Column size={12}>
              <h2 className=" fw-bold fs-3 p-2 text-center mb-3 bg-dark text-light">
                Billing Details
              </h2>
              <Row>
                <Column size={5} classes="bg-light">
                  <h4 className="text-center fw-bold">Payment</h4>
                  <form
                    onSubmit={submitHandler}
                    className="border border-5 card"
                  >
                    {redirect()}
                    <input
                      placeholder={"NameOnCard"}
                      type={"text"}
                      onChange={(Cname) => this.setState({ Cname })}
                      className="form-control"
                      required
                    />
                    <input
                      placeholder={"CardNo"}
                      type={"number"}
                      onChange={(cardNo) => this.setState({ cardNo })}
                      className="form-control"
                      required
                    />
                    <input
                      placeholder={"expDate"}
                      type={"number"}
                      className="form-control"
                      required
                    />
                    <input
                      placeholder={"CVV"}
                      type={"number"}
                      onChange={(cvv) => this.setState({ cvv })}
                      className="form-control"
                      required
                    />
                    <button
                      className={
                        "btn btn-dark w-100 border-rounded shadow-lg text-uppercase"
                      }
                    >
                      CheckOut
                    </button>
                  </form>
                </Column>
                <Column size={4} classes="offset-md-3 mt-5 shadow-lg">
                  <div className="card border border-5 border-light shadow-lg">
                    <h6 className="text-black bg-light float-center">
                      <span className="text-info fw-bold ">
                        - {this.state.userList.userName}
                        <br />- {this.state.userList.userEmail}
                      </span>
                    </h6>{" "}
                    <hr />
                    {this.state.addressData.map((address: any) => (
                      <div className="text-black bg-light fw-bold">
                        <input type="radio" /> Address:
                        <span className="text-secondary">
                          {address.line1} ,{address.line2} ,{address.city} ,
                          {address.state} ,{address.pincode} .
                          <br /> <br />
                        </span>
                      </div>
                    ))}
                  </div>
                  <br /> <br />
                  <div className="w-auto card-header border border-5 border-light">
                    <h5 className="m-3 fw-bold">Sub-Total: {finalPrice}</h5>
                    <h5 className="m-3 text-success">Discount :0 </h5>
                    <h5 className="m-3 text-success">Offer: </h5>
                    <h3 className="m-3 fw-bold">
                      Total : <span className="text-primary">{finalPrice}</span>{" "}
                    </h3>
                  </div>
                </Column>
              </Row>
            </Column>
          </Row>
        </Container>
      </>
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
    resetCart: () => dispatch(CartActions.resetCart()),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Checkout);
