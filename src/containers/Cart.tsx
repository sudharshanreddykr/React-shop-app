import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, NavLink } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import 'styled-components'
import { CartType, StoreType } from "../types";
import formatter from "../utils/formatter";
import Container from "../components/Container";

type Props = {
  cart: CartType[];
} & RouteComponentProps;
type State = { count: number}
class Cart extends React.Component<Props> {
  state: State = { count: 0};
   
  increamentQty = () => {
    this.setState( {
      count: ( this.state.count + 1 )
    } );
  }
  decreamentQty = () => {
    this.setState( {
      count: ( this.state.count - 1 )
    } )
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
          {this.props.cart.map((val) => (
            <Column
              size={5}
              classes={
                "d-flex justify-content-between rounded-3 align-items-start rounded-3 float-start mt-1 shadow-lg h-50 w-50 mb-3  border border-5"
              }
            >
              <Link to={`/productdetail/${val.productId}`}>
                <div className="imgfall">
                  <ImageWithFallback
                    source={val.productImage}
                    classes={
                      "w-25 h-25 img-thumbnail rounded float-start rounded-3"
                    }
                  />
                </div>
              </Link>
              <div className="d-flex fw-bold align-items-start flex-column">
                <h5 className={"mt-4 fw-bold"}>
                  {formatter.titlecase(val.productName)}
                </h5>
                <p className="mt-2 text-dark ">
                  SalePrice: {val.productSalePrice}
                </p>
                <p className="mt-2 text-danger">Stock: {val.productStock}</p>
                <p className="mt-2 text-success">Price: {val.productPrice}</p>
                <div className="CountBtn d-flex align-items-end  ">
                  <button
                    className="btn btn-primary"
                    onClick={this.increamentQty}
                  >
                    +
                  </button>
                  <p className="bg-gray ms-3 ">{this.state.count}</p>
                  <button
                    className=" btn btn-danger ms-3"
                    onClick={this.decreamentQty}
                  >
                    -
                  </button>

                  <button className="btn btn-danger fw-bold align-items-end ms-5">
                    <i className="fas fa-trash display-7"></i>
                  </button>
                </div>
                <br />
                <p className="subTotal flat-right">
                  <strong>subTotal: </strong>
                  <span className="text-warning">
                    {this.state.count} * {val.productPrice} = &#8377;
                    {}
                  </span>
                </p>
              </div>
              <div className="btn d-flex align-items-start flex-column"></div>
            </Column>
          ))}
        </Row>
        <Row>
          <Column size={12} classes="align-items-center">
            <NavLink to={"/payment"}>
              <button
                onClick={() => console.log("checkout")}
                className="bg-warning border border-3 rounded-3  fw-bold  fs-3 text-light text-center p-2 w-50 align-items-start shadow-lg float-end"
              >
                Check Out
              </button>
            </NavLink>
          </Column>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Cart);
