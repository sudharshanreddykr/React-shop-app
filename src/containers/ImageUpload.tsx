import React, { SyntheticEvent } from "react";
import Column from "../components/Column";

export class ImageUpload extends React.Component{
    render () {
   const submitHandler = async ( e: SyntheticEvent ) => {
            try {
                e.preventDefault();
            } catch(e) {}
        }

        return (
            <Column size={6} classes={"offset-3"}>
                <form onSubmit={ submitHandler }>
                    <h4 className="bg-dark text-light w-100 fw-bold text-center">Upload Profile Image</h4>
            <input className="form-control" type="file" accept="image/*" />
            <button className="btn btn-primary fw-bold">Upload Image</button>
          </form>
            </Column>
        );
    }
}