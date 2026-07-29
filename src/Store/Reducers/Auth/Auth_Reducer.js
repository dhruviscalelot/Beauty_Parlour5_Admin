import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { AUTH_SYNC, AUTH } from "../../Helpers/Type";


//page name reducer
export const pageNameReducer = (state = { pageName: "" }, action) => {
    if (action.type === AUTH_SYNC.SET_PAGE_NAME)
        return { ...state, pageName: action.payload };
    return state;
}

//login reducer
export const LoginReducer = createAsyncReducer(AUTH.LOGIN);

