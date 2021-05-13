import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import styled from  "styled-components";
import { CartType, StoreType } from "../types";
import formatter from "../utils/formatter";
import Container from "../components/Container";

type Props = {
  cart: CartType[];
} & RouteComponentProps;
class Cart extends Component<Props> {
  render() {
    return (
      <Container>
          <Row>
            <Column size={9}>
              <div className="jumbotron text-center">
                <h1 className="display-5 fw-bold">Cart Item</h1>
              </div>
            </Column>
        </Row>
        
          <Row>
            {this.props.cart.map((val) => (
              <Column
                size={7}
                classes={
                  "d-flex justify-content-between align-items-start float-start mt-1 shadow-lg h-30 w-60 mb-3 border border-5"
                }
              >
                <Link to={`/productdetail/${val.productId}`}>
                  <ImageWithFallback
                    source={val.productImage}
                    classes={
                      "w-20 h-20 img-thumbnail rounded float-start rounded-3"
                    }
                  />
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
                  {/* <div className=" btn CountBtn d-flex align-items-start  ">
                    <div className="d-flex mb-5">
                      <span>-1</span>
                      <p></p>
                      <span>{ }</span>
                      <p></p>
                      <span>+1</span>
                    </div>
                  </div> */}
                </div> 
              </Column>
            ))}
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
