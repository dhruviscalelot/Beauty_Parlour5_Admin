import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as Authservices from "../../../Services/services";
import { AUTH_SYNC, AUTH } from "../../Helpers/Type";

export const login = createAsyncAction(Authservices.login, AUTH.LOGIN);

//Synchronous action creator for logout and setVerifyEmail
export const logoutUser = () => { localStorage.clear(); return { type: AUTH_SYNC.LOGOUT }; }

export const setPageName = (payload) => ({
    type: AUTH_SYNC.SET_PAGE_NAME,
    payload,
})