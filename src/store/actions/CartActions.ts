import { ProductType } from "../../types";

const ActionTypes = {
  ADD_TO_CART: "[Cart] Add to cart",
  REMOVE_ITEM: "[Cart] Remove item",
  INCREAMENT: "[Cart] Increment",
  DECREAMENT: "[Cart] Decreament"
};

const addToCart = (product: ProductType) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    product,
  };
};
const removeItem = (id: number) => {
  return {
    type: ActionTypes.REMOVE_ITEM,
    id,
  };
};

const increaseQuantity = ( idno: number ) => {
  return {
    type: ActionTypes.INCREAMENT,
    idno,
  }
}

const decreaseQuantity = ( id: number ) => {
  return {
    type: ActionTypes.DECREAMENT,
    id,
  }
}

export default { ActionTypes, addToCart, removeItem, increaseQuantity, decreaseQuantity };
