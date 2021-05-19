import React, { SyntheticEvent } from "react";
import { Redirect} from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import Container from "../components/Container";

type State = {
  file: any;
  redirect: boolean;
};
class CvUpload extends React.Component<State> {
  state: State = { file: [], redirect: false };

  handleSubmit = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitFile = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const { file } = this.state;
      //const { data } = await UserService.uploadImage(file);
      this.setState({
        file: this.state.file,
        redirect: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const redirecting = () => {
      if (this.state.redirect === true) {
        return <Redirect to="/payment" />;
      }
    };
    console.log("files", this.state.file);
    return (
      <Container>
        <Row>
          <Column size={5}>
            <div className="card mx-auto col-md-8">
              <h1 className="mx-auto fw-bold ">UpLoad Resume</h1>
              <form action="" onSubmit={this.submitFile}>
                {redirecting()}
                <label htmlFor="file"></label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.handleSubmit}
                />
                {/* <TextBox
                  type={"file"}
                  textChange={(file) => this.setState({ file })}
                /> */}
                <button className={"btn btn-dark w-100 text-uppercase"}>
                  Submit{" "}
                </button>
              </form>
            </div>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default CvUpload;
