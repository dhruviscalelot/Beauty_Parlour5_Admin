import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useToggleSideBar, useToggleSideBarMobile } from '../Store/Selectors/Sidebar/Sidebar_Selectors'
import { setSidebarOpenMobile } from '../Store/Action/Sidebar/Sidebar_Action'
import { ChevronLeft } from 'lucide-react'

function Sidebar({ MainMenu = [] }) {
    const dispatch = useDispatch()

    // Redux state
    const isExpanded = useToggleSideBar()      // desktop: true = expanded, false = collapsed
    const isOpenMobile = useToggleSideBarMobile() // mobile: true = open, false = hidden

    const menuList = [...MainMenu]

    return (
        <>
            {/* Mobile overlay — closes sidebar on backdrop click */}
            {isOpenMobile && (
                <div
                    className="sidebar_overlay"
                    onClick={() => dispatch(setSidebarOpenMobile(false))}
                ></div>
            )}

            <aside className={`sidebar_wrap ${isOpenMobile ? 'sidebar_open' : ''} ${isExpanded ? '' : 'sidebar_collapsed'}`}>
                <div 
                    className={`w-7 h-7 rounded-full bg-primary flex lg:hidden items-center justify-center absolute left-60 top-20 z-50 cursor-pointer transition-opacity duration-300 ${
                        isOpenMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`} 
                    onClick={() => { dispatch(setSidebarOpenMobile(false)) }}
                >
                    <span className="text-[16px] lg:text-[18px] 2xl:text-[20px] text-white">
                        <ChevronLeft size={20} />
                    </span>
                </div>
                <div className="sidebar_logo">
                    <div className="sidebar_logo_icon">
                        <span className="font-Prata text-24 2xl:text-28 text-primary leading-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flower2 lucide-flower-2 h-5 w-5" aria-hidden="true"><path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"></path><circle cx="12" cy="8" r="2"></circle><path d="M12 10v12"></path><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"></path><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"></path></svg>
                        </span>
                    </div>
                    <div className="sidebar_logo_text ml-3">
                        <h2 className="font-Prata text-16 2xl:text-20 text-g1 leading-tight">Luxe Salon & Spa</h2>
                        {/* <p className="text-12 text-g7 uppercase tracking-[0.16em]">Admin Panel</p> */}
                    </div>
                </div>

                <nav className="sidebar_menu">
                    {menuList.filter((item) => item.view).map((item) => {
                        return (
                            <NavLink
                                key={item.displayname}
                                to={item.route}
                                onClick={() => dispatch(setSidebarOpenMobile(false))}
                                className={({ isActive }) => `sidebar_link ${isActive ? 'sidebar_link_active' : ''}`}
                            >
                                <span className="sidebar_icon">
                                    <item.icon size={18} />
                                </span>
                                <span className="sidebar_text">{item.displayname}</span>
                            </NavLink>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}

export default Sidebar
