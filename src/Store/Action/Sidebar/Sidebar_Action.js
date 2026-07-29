import { SIDEBAR_SYNC } from "../../Helpers/Type";

//Action creators for the sidebar 
export const setSidebarOpen = (payload) => ({ type: SIDEBAR_SYNC.TOGGLE_DESKTOP, payload });
export const setSidebarOpenMobile = (payload) => ({ type: SIDEBAR_SYNC.TOGGLE_MOBILE, payload });

