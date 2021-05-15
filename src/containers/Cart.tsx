import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, NavLink } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import 'styled-components'
import { CartType, ProductType, StoreType } from "../types";
import formatter from "../utils/formatter";
import Container from "../components/Container";
import CartActions from "../store/actions/CartActions";
import { Dispatch } from "redux";


type Props = {
  cartitems: CartType[];
  removeCartItem: (id: number) => void;
  increament: (id: number) => void;
  decreament: (id: number) => void;
} & RouteComponentProps;
type State = { total: number, quantity: number}
class Cart extends React.Component<Props, State> {
  state: State = { total: 0, quantity: 1}
   
  
  componentDidMount () {
    this.updateTotal()
  }
  updateTotal() {

    this.props.cartitems.map( ( val ) => {
      const temp: number = parseInt( val.productSalePrice )
      this.setState( ( prevState ) => ( { total: prevState.total + temp } ) )
    })
  }

  deductTotal ( price: string ) {
    const temp: number = parseInt( price )
    this.setState((prevState)=> ({total: prevState.total - temp}))
  }



 
  render () {
    
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
          {this.props.cartitems.map((val) => (
            
              <Column
                size={6}
                classes={
                  "justify-content-between rounded-3 align-items-start rounded-3 mt-1 ms-2 shadow-lg h-auto w-auto mb-3  border border-5"
                }
              >
                <Link to={`/productdetail/${val.productId}`}>
                  <div className="imgfall">
                    <ImageWithFallback
                      source={val.productImage}
                      classes={" img-thumbnail float-start rounded-3"}
                    />
                  </div>
                </Link>
                <div className="d-flex fw-bold align-items-start flex-column">
                  <h5 className={"mt-4 fw-bold"}>
                    {formatter.titlecase(val.productName)}
                  </h5>
                  <p className="mt-2 text-dark ">Price: {val.productPrice}</p>
                  <p className="mt-2 text-danger">Stock: {val.productStock}</p>
                  <p className="mt-2 text-success">
                    Sale Price: {val.productSalePrice}
                  </p>
                  <div className="CountBtn d-flex align-items-end  ">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.props.increament(val.productId)}
                    >
                      +
                    </button>
                    <p className="bg-gray ms-3 ">{val.productQty}</p>
                    <button
                      className=" btn btn-danger ms-3"
                      onClick={() => this.props.decreament(val.productId)}
                    >
                      -
                    </button>

                    <button
                      className="btn btn-danger fw-bold align-items-end ms-5"
                      onClick={() => {
                        this.props.removeCartItem(val.productId);
                        this.deductTotal(val.productSalePrice);
                      }}
                    >
                      <i className="fas fa-trash display-7"></i>
                    </button>
                  </div>
                  <br />
                  <p className="subTotal flat-right">
                    <strong>Total: </strong>
                    <span className="text-warning">&#8377;</span>
                  </p>
                </div>
              </Column>
            
          ))}
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
                    &#8377; {this.state.total}
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
                    &#8377; {this.state.total}
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

const mapStateToProps = (state: StoreType) => {
  return {
    cartitems: state.cart,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    removeCartItem: (id: number) => dispatch(CartActions.removeItem(id)),
    increament: (id: number) => dispatch(CartActions.increaseQuantity(id)),
    decreament: (id: number) => dispatch(CartActions.decreaseQuantity(id)),
  };
};

  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
