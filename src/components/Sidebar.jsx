import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useToggleSideBar, useToggleSideBarMobile } from '../Store/Selectors/Sidebar/Sidebar_Selectors'
import { setSidebarOpenMobile } from '../Store/Action/Sidebar/Sidebar_Action'
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'

function Sidebar({ MainMenu = [] }) {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // Redux state
    const isExpanded = useToggleSideBar()      // desktop: true = expanded, false = collapsed
    const isOpenMobile = useToggleSideBarMobile() // mobile: true = open, false = hidden

    const menuList = [...MainMenu]

    // Track open submenus by displayname
    const [openSubmenus, setOpenSubmenus] = useState({})

    // Auto-expand parent menu if current location matches any child route or parent route
    useEffect(() => {
        const initialOpenState = {}
        menuList.forEach((item) => {
            if (item.children && item.children.length > 0) {
                const isChildActive = item.children.some(child => 
                    location.pathname === child.route || (child.route !== '/' && location.pathname.startsWith(child.route))
                )
                const isParentActive = location.pathname === item.route || (item.route !== '/' && location.pathname.startsWith(item.route))
                if (isChildActive || isParentActive) {
                    initialOpenState[item.displayname] = true
                }
            }
        })
        setOpenSubmenus(initialOpenState)
    }, [location.pathname])

    const toggleSubmenu = (displayname, e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation()
        }
        setOpenSubmenus(prev => ({
            ...prev,
            [displayname]: !prev[displayname]
        }))
    }

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
                        <h2 className="font-Prata text-16 2xl:text-20 text-l3 leading-tight">Luxe Salon & Spa</h2>
                    </div>
                </div>

                <nav className="sidebar_menu">
                    {menuList.filter((item) => item.view).map((item) => {
                        const hasChildren = item.children && item.children.length > 0
                        const isSubmenuOpen = !!openSubmenus[item.displayname]

                        if (hasChildren) {
                            const isParentActive = location.pathname === item.route || 
                                (item.route !== '/' && location.pathname.startsWith(item.route)) ||
                                item.children.some(child => location.pathname === child.route || (child.route !== '/' && location.pathname.startsWith(child.route)))

                            return (
                                <div key={item.displayname} className="w-full space-y-1">
                                    <div
                                        onClick={() => {
                                            toggleSubmenu(item.displayname)
                                            if (item.route) {
                                                navigate(item.route)
                                            }
                                        }}
                                        className={`sidebar_link cursor-pointer justify-between ${isParentActive ? 'sidebar_link_active' : ''}`}
                                    >
                                        <div className="flex items-center">
                                            <span className="sidebar_icon">
                                                <item.icon size={18} />
                                            </span>
                                            <span className="sidebar_text">{item.displayname}</span>
                                        </div>
                                        <span 
                                            className="sidebar_text ml-auto p-1 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleSubmenu(item.displayname, e)
                                            }}
                                        >
                                            {isSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </span>
                                    </div>

                                    {/* Submenu List */}
                                    {isSubmenuOpen && (
                                        <div className="space-y-1 py-0.5">
                                            {item.children.filter(child => child.view).map((child) => (
                                                <NavLink
                                                    key={child.displayname}
                                                    to={child.route}
                                                    onClick={() => dispatch(setSidebarOpenMobile(false))}
                                                    className={({ isActive }) => `sidebar_sublink ${isActive ? 'sidebar_sublink_active' : ''}`}
                                                >
                                                    <span className="sidebar_text">{child.displayname}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        }

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


