import { Icon } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import Column from "../components/Column";
import Container from "../components/Container";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
type Props = {};
type State = {
  profileData: any;
  address: any;
  delAddress: any;
  
};



class Profile extends React.Component<Props, State> {
  state: State = { profileData: [], address:[], delAddress:[] };
  
  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      this.setState( {
        profileData: data,
        address: data.address,
     })
      
    } catch (e) {
      console.log(e);
    }
  } async getData () {
    const { data } = await UserService.profile();
    this.setState( {
      address: data.address
    })
  }
  render () {
    console.log( this.state.address )
    console.log(this.state.profileData);
    const delAddress = ( e: any ) => {
      let delAddressId = e.target.value;

      return StorageService.getData( "token" ).then( ( token ) =>
        axios.delete( ` http://localhost:5000/address/${ delAddressId }`, {
        headers: {Authorization: `Bearer ${token}`},
        } )
        .then(()=> {
          this.getData();
          console.log("data deleted");
        }).catch(err=> console.log(err))
      )
    }
    return (
      <Container>
        <Row>
          <Column size={6} classes={"offset-3 fw-bold bg-light fs-3"}>
            <div className="header text-light bg-dark text-center">
              User Profile
            </div>
            <div className="card align-items-center border border-5 fs-6 shadow-lg ">
              <div className="imgfallback ">
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
                {this.state.address.map((address: any) => (
                  <li className="list-group-item">
                    {" "}
                    Address :
                    <span className="text-warning">
                      {address.line1} ,{address.line2}, {address.city},{" "}
                      {address.state} ,{address.pincode}.
                    </span>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-5 float-end"
                      value={address.id}
                      onClick={delAddress}
                    >
                      <i className="fas fa-trash display-7"></i>
                    </button>
                  </li>
                ))}
                <NavLink to={"/address"}>
                  <button type="button" className="btn btn-primary btn-sm">
                    Update
                  </button>
                </NavLink>
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
