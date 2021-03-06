import axios from "axios";
import constants from "../constants";
import { LoginResponseType, RegisterResponseType } from "../types";
import StorageService from "./StorageService";

const login = (email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/login`;
  return axios
    .post<LoginResponseType>(url, { email, password })
    .catch((e) => Promise.reject(e.response.data));
};

const register = (email: string, password: string, name:string) => {
  const url = `${constants.BASE_URL}/auth/register`;
  return axios
    .post<RegisterResponseType>(url, { email, password, name })
    .catch((e) => Promise.reject(e.response.data));
};

const profile = () => {
  const url = `${constants.BASE_URL}/auth/profile`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};

const address = () => {
  const url = `${ constants.BASE_URL }/address`;
  return StorageService.getData("token").then((token)=> 
    axios.get( url, {
    headers: {Authorization: `Bearer ${token}` },
  })
  )
}

const paymentPost = (cardName: string, cardNo: number,  cvv: number) => {
  const url = `${constants.BASE_URL}/payment`;
  return StorageService.getData("token").then((token) =>
    axios.post(url, { cardName,cardNo,cvv}, {
      headers: { Authorization: `Bearer ${token}`, },
    })
  );
};


const addressPost = (line1: string, line2: string, city: string, state: string, pincode: number) => {
  const url = `${constants.BASE_URL}/address`;
  return StorageService.getData("token").then((token) =>
    axios.post(url, { line1, line2, city, state, pincode }, {
      headers: { Authorization: `Bearer ${token}`, },
    })
  );
};


const orderPost = (amount:number, qty:number, OSDate:number,productId:number) => {
const url = `${constants.BASE_URL}/order`;
return StorageService.getData("token").then((token) =>
axios.post(url, {amount, qty, OSDate,productId}, {
headers: { Authorization: `Bearer ${token}`, },
})
);
};
const orderGet = () => {
const url = `${constants.BASE_URL}/order`;
return StorageService.getData("token").then((token) =>
axios.get(url, {
headers: { Authorization: `Bearer ${token}` },
})
);
};



export default { login, profile, register, address, addressPost, paymentPost, orderPost, orderGet};
