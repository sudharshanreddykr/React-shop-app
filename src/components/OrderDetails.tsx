import { Container } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Column from "./Column";
import Row from "./Row";
import UserService from "../services/UserService";
import { CartType, StoreType } from "../types";

type Props = {
  cartItems: CartType[];
};
type State = {
  orderData: any;
  orderAmount: any;
};
class OrderDetails extends React.Component<Props, State> {
  state: State = { orderData: [], orderAmount: 0 };
  async componentDidMount() {
    try {
      const { data } = await UserService.orderGet();
      console.log("orderData", data);
      this.setState({
        orderData: data,
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    console.log("state orders", this.state.orderData.orderAmount);

    console.log(this.state.orderData.orderAmount);
    return (
      <Container>
        <Row>
          <Column size={6}>
            {this.state.orderData.map((data: any) => (
              <div>
                <h1>{data.productId.productName}</h1>
                <img src={data.productId.productImage} alt="" />
                <h2>TotalAmount{data.orderAmount}</h2>
              </div>
            ))}
          </Column>
        </Row>
      </Container>
    );
  }
}
const mapStoreToProps = (state: StoreType) => {
  return {
    cartItems: state.cart,
  };
};

export default connect(mapStoreToProps)(OrderDetails);
