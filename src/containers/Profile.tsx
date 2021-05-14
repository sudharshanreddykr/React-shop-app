import React from "react";
import { NavLink } from "react-router-dom";
import Column from "../components/Column";
import Container from "../components/Container";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import UserService from "../services/UserService";
type Props = {};
type State = {
  profileData: any;
  address: any;
};



class Profile extends React.Component<Props, State> {
  state: State = { profileData: [] , address: []};
  
  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      const address = await UserService.address();
      console.log( address );
      this.setState( {
        profileData: data,
        address: address.data[0],
      } )
    } catch (e) {
      console.log(e.response.data);
    }
  }
  render () {
    console.log(this.state.profileData);
    return (
      <Container>
        <Row>
          <Column size={6} classes={"offset-3 fw-bold bg-light fs-3"}>
            <div className="header text-light bg-dark text-center">
              User Profile
            </div>
            <div className="card align-items-center border border-5 shadow-lg ">
              <div className="imgfallback">
                <ImageWithFallback
                  source="https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png"
                  classes="card-img-top img-responsive"
                />
              </div>
              <ul className="list-group list-group-flush fs-5 align-items-start">
                <li className="list-group-item ">
                  Name :
                  <span className="text-info">
                    {this.state.profileData.userName}
                  </span>
                </li>
                <li className="list-group-item">
                  Email :
                  <span className="text-warning">
                    {this.state.profileData.userEmail}
                  </span>
                </li>
                <li className="list-group-item">
                  Created On :
                  <span className="text-warning">
                    {this.state.profileData.createdAt}
                  </span>
                </li>
                <li className="list-group-item">
                  UserId :
                  <span className="text-warning">
                    {this.state.profileData.userId}
                  </span>
                </li>
                <li className="list-group-item">
                  Address :
                  <span className="text-warning">
                    {this.state.address.line1}, {this.state.address.line2} ,
                    {this.state.address.city}, {this.state.address.state} ,
                    {this.state.address.pincode}
                  </span>
                  .
                </li>
                <div
                  className="d-flex ms-5">
                  <button type="button" className="btn btn-primary">
                    update
                  </button>
                  <button type="button" className="btn btn-danger ms-5">
                    Delete
                  </button>
                </div>
                <li className="list-group-item">
                  <NavLink to="/cart">Go to My Orders</NavLink>
                </li>
              </ul>
            </div>
          </Column>
        </Row>
      </Container>
    );
  }
}


export default Profile;
