import React from "react";
import Column from "../components/Column";
import Container from "../components/Container";
import Row from "../components/Row";

export class Payment extends React.Component {
    render () {
        return (
          <Container>
            <Row>
              <Column size={12}>
                <h2 className=" bg-primary text-light fw-bold fs-3 p-2 text-center   mb-3">
                  Billing
                </h2>
                <Row>
                  <Column size={6} classes="bg-light" >
                    <form
                      className="needs-validation border border-5 p-4 shadow-lg bg-secondary rounded fw-bold"
                      noValidate
                    >
                      Name:
                      <input type="text" className="form-control" required />
                      Email Id:
                      <input
                        type="email"
                        className="form-control"
                        placeholder="abc@xyz.com"
                        required
                      />
                      Phone No.:
                      <input type="number" className="form-control" required />
                      Address Line 1:
                      <input type="text" className="form-control" required />
                      Address Line 2
                      <input
                        type="text"
                        className="form-control"
                        required
                      />{" "}
                      <br />
                      <div className="d-flex">
                        city:
                        <input
                          type="text"
                          className="form-control"
                          required
                        />{" "}
                        state:
                        <input type="text" className="form-control" required />
                        pin:
                        <input
                          type="number"
                          className="form-control"
                          required
                        />
                      </div>
                      <hr className="border border-5 bg-gradient" />
                      Name on Card
                      <input type="text" className="form-control" required />
                      Debit/Credit Card Number
                      <input type="number" className="form-control" required />
                      <br />
                      <div className="d-flex">
                        <label htmlFor="">Expiration:</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="MM/YYYY"
                          required
                        />
                        <label htmlFor="">CVV:</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="XXX"
                          required
                        />
                      </div> <br />
                      <button
                        id="btn"
                        className="btn btn-primary btn-sm active"
                        type="submit"
                      >
                        Continue to checkout
                      </button>
                    </form>
                  </Column>
                  <Column size={ 3 } classes="offset-md-3 mt-5">
                    <div className="card border border-3 fw-bold shadow-lg">Total Amount: </div>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Container>
        );
    }
}