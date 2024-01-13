import { loginFailure, loginStart, loginSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const updateUsers = async (id, user, dispatch ) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/user`);
    dispatch(updateUserSuccess({id, user}))
  } catch(err){
    dispatch(updateUserFailure());
  }
};