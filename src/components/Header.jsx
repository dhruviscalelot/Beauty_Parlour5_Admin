import { Bell, ChevronLeft, ChevronRight, LogOut, Menu, UserRound, UserPen } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { usePageName } from '../Store/Selectors/Auth/Auth_Selectors'
import { useToggleSideBar, useToggleSideBarMobile } from '../Store/Selectors/Sidebar/Sidebar_Selectors'
import { setSidebarOpen, setSidebarOpenMobile } from '../Store/Action/Sidebar/Sidebar_Action'
import Logout from '../auth/LogOut'
import { useState } from 'react'

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Redux state
    const isOpen = useToggleSideBar()
    const isOpenMobile = useToggleSideBarMobile()
    const title = usePageName()
    const [isLogout, setIsLogout] = useState(false);

    // const adminEmail = localStorage.getItem('adminEmail') || 'admin@beautyparlour.com'

    const handleLogout = () => {
        // localStorage.removeItem('accessToken')
        // localStorage.removeItem('adminEmail')
        navigate('/')
    }

    return (
        <>
            <header
                className={`h-[70px] bg-white z-40 flex items-center justify-between px-4 md:px-8 transition-all duration-300 ease-in-out`}
            >
                {/* left side - toggle button & title */}
                <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                    <button
                        type="button"
                        onClick={() => {
                            if (window.innerWidth < 1024) {
                                dispatch(setSidebarOpenMobile(true))
                            } else {
                                dispatch(setSidebarOpen(!isOpen))
                            }
                        }}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/80 transition-all shadow-sm shrink-0 active:scale-95"
                        aria-label="Toggle sidebar"
                    >
                        <span className="lg:hidden flex items-center justify-center">
                            <Menu size={20} />
                        </span>
                        <span className="hidden lg:flex items-center justify-center overflow-hidden">
                            {isOpen ? (
                                <ChevronLeft size={20} />
                            ) : (
                                <ChevronRight size={20} />
                            )}
                        </span>
                    </button>

                    <div className="flex-1 flex mr-0 md:mr-12">
                        <h2 className="text-lg md:text-xl font-bold text-g1 truncate">{title}</h2>
                    </div>
                </div>


                {/* right side  */}
                <div className="flex items-center space-x-3 md:space-x-6">
                    {/* Notification */}
                    <div className="relative">
                        <span className="w-2.5 h-2.5 rounded-full bg-red absolute right-1 top-0 border-2 border-white"></span>
                        <button
                            type="button"
                            className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-full bg-white border border-l2 flex items-center justify-center cursor-pointer text-g7 hover:text-primary hover:border-primary transition-all"
                            aria-label="Notifications"
                        >
                            <Bell size={20} fill="currentColor" />
                        </button>
                    </div>

                    {/* Avatar */}
                    <div className="relative group">
                        <button
                            type="button"
                            className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:bg-primary/80 transition-colors overflow-hidden"
                            aria-label="Open profile menu"
                        >
                            <UserRound size={20} />
                        </button>

                        <div className="absolute top-14 right-0 w-40 bg-white border border-l2 rounded-xl py-3 px-2 z-50 shadow-[0_16px_40px_rgba(47,37,39,0.14)] translate-y-8 invisible group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                            {/* <div className="px-3 pb-3 mb-2 border-b border-l2">
                                <p className="text-12 text-g7 mb-0.5">Signed in as</p>
                                <p className="text-13 md:text-14 font-semibold text-g1 truncate">{adminEmail}</p>
                            </div> */}

                            <Link
                                // onClick={handleLogout}
                                className="w-full flex items-center px-3 py-2 rounded-lg text-12 md:text-14 font-medium text-g1 hover:bg-l3 transition-colors"
                            >
                                <UserPen size={17} className="mr-2" />
                                <span>Edit Profile</span>
                            </Link>

                            <Link
                                onClick={() => setIsLogout(true)}
                                className="w-full flex items-center px-3 py-2 rounded-lg text-12 md:text-14 font-medium text-red hover:bg-l3 transition-colors"
                            >
                                <LogOut size={17} className="mr-2" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            {isLogout && <Logout onClose={() => setIsLogout(false)} />}
        </>

    )
}

export default Header
