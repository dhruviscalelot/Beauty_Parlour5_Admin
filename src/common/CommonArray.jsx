import { CalendarDays, ClipboardList, LayoutDashboard, Scissors, Settings, Sparkles, Users, Images, Star, Gift, Gem, Layers3, Newspaper, Crown, CalendarCheck } from 'lucide-react'

export const MainMenu = [
    {
        displayname: "Dashboard",
        route: "/dashboard",
        isOpen: false,
        view: true,
        icon: CalendarDays,
    },
    {
        displayname: "Category",
        route: "/category",
        isOpen: false,
        view: true,
        icon: Layers3,
        children: [
            {
                displayname: "Our Services",
                route: "/our-services",
                view: true,
                icon: Scissors,
            }
        ]
    },
    {
        displayname: "Our Experts",
        route: "/our-experts",
        isOpen: false,
        view: true,
        icon: Scissors,
    },
    {
        displayname: "Gallery",
        route: "/gallery",
        isOpen: false,
        view: true,
        icon: Images,
    },
    {
        displayname: "Contact",
        route: "/contact",
        isOpen: false,
        view: true,
        icon: Images,
    },
    {
        displayname: "Testimonials",
        route: "/testimonials",
        isOpen: false,
        view: true,
        icon: Star,
    },
    {
        displayname: "Offeres",
        route: "/offeres",
        isOpen: false,
        view: true,
        icon: Gift,
    },
    {
        displayname: "Blogs",
        route: "/blogs",
        isOpen: false,
        view: true,
        icon: Newspaper,
    },
    {
        displayname: "Packages",
        route: "/packages",
        isOpen: false,
        view: true,
        icon: Gem,
    },
    {
        displayname: "Membership",
        route: "/membership",
        isOpen: false,
        view: true,
        icon: Crown,
    },
    {
        displayname: "Booking",
        route: "/booking",
        isOpen: false,
        view: true,
        icon:  CalendarCheck,
    },
]



export const galleryTag = [,
    { value: "Bridal", label: "Bridal" },
    { value: "Hair", label: "Hair" },
    { value: "Skin", label: "Facial" },
    { value: "Nails", label: "Nails" },
    { value: "Spa", label: "Spa" },
    { value: "Mehendi", label: "Mehendi" },
]