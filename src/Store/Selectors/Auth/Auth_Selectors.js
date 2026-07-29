import { useSelector } from "react-redux";
import { useMemo } from "react";

//page name for the sidebar
const selectPageName = (state) => state?.pageNameReducer?.pageName || "";
export const usePageName = () => {
    const pageName = useSelector(selectPageName);
    return useMemo(() => pageName,[pageName]);
}

//login
const selectLogin = (state) => state?.LoginReducer || {};
export const useLogin = () => {
    const login = useSelector(selectLogin);
    return useMemo(() => login,[login]);
}



