import axios from "axios";
import constants from "../constants";
import StorageService from "../services/StorageService";

type Props = {
getData: () => void;
};

const ProfileUpload: React.FC<Props> = (props) => {
let file: any;

const changeFile = (e: any) => {
file = e.target.files[0];
};

const uploadImage = () => {
if (file !== undefined) {
const formData = new FormData();
formData.append("file", file);
const url = `${constants.BASE_URL}/auth/upload`;
return StorageService.getData("token").then((token) =>
axios
.post(url, formData, {
headers: { Authorization: `Bearer ${token}` },
})
.then(() => props.getData())
);
} else {
alert("Select Image");
}
};

return (
<div className="card mx-auto col-md-8">
{/* <h1 className="mx-auto fw-bold ">UpLoad Image</h1> */}
<input type="file" onChange={changeFile} />
<button className={"btn btn-warning "} onClick={uploadImage}>
Upload
</button>{" "}
</div>
);
};

export default ProfileUpload;