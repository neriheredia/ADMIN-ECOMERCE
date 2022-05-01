import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productReducer";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
} from "./usersReducer";
import { publicRequest } from "../requestMethods";

//LOGIN DE USUARIO
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//GET PRODUCT
export const getProducts = async (dispatch, accessToken) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("products", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

//DELETE PRODUCT
export const deleteProduct = async (id, dispatch, accessToken) => {
  dispatch(deleteProductStart());
  try {
    const res = await publicRequest.delete(`products/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

//UPDATE PRODUCT
export const updateProduct = async (dispatch, id, product, accessToken) => {
  dispatch(updateProductStart());
  try {
    const res = await publicRequest.put(`/products/${id}`, product, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

//ADD PRODUCT
export const addProduct = async (product, dispatch, accessToken) => {
  dispatch(addProductStart());
  try {
    const res = await publicRequest.post(`/products`, product, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//GET USERS
export const getUsers = async (dispatch, accessToken) => {
  dispatch(getUsersStart());
  try {
    const res = await publicRequest.get("users", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

//DELETE USER
export const deleteUsers = async (id, dispatch, accessToken) => {
  dispatch(deleteUsersStart());
  try {
    const res = await publicRequest.delete(`users/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};

//UPDATE USER
export const updateUser = async (dispatch, id, newUsersUp, accessToken) => {
  dispatch(updateUsersStart());
  try {
    const res = await publicRequest.put(`/users/${id}`, newUsersUp, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateUsersSuccess(res.data));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};
