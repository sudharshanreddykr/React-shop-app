import React from "react";
import styled from "styled-components";

type State = { no: number; count: number };
class Demo extends React.Component<{}, State> {
  state: State = { no: 0, count: 0 };

  render() {
    return (     
      <div className="container-fluid mt-3">
        <Hello>
          <img
            src="https://media.istockphoto.com/photos/online-shopping-and-payment-man-using-tablet-with-shopping-cart-icon-picture-id1206800961?k=6&m=1206800961&s=612x612&w=0&h=XTcMw90XcgIFRuZvZ_B7q6D5X92-8hcDZ-J_HYh3Sas="
            height={"400px"}
            width={"800px"}
        />
        </Hello>
        </div>
    );
  }
}
export default Demo;

const Hello = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  padding: 15% 1%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
