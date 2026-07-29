import { useEffect } from 'react'
import { setPageName } from "../../Store/Action/Auth/Auth_Action";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Layers3, 
  Scissors, 
  Users, 
  Images, 
  MessageSquare, 
  Star, 
  Gift, 
  Newspaper, 
  Gem, 
  Crown,
  Clock,
  Sparkles,
  PhoneCall,
  CalendarDays,
  ChevronRight
} from 'lucide-react';

import { categoryData } from '../../data/category';
import { servicesData } from '../../data/service';
import { ourExportsData } from '../../data/ourexport';
import { galleryData } from '../../data/gallery';
import { contactData } from '../../data/contact';
import { testimonialsData } from '../../data/testimonial';
import { offersData } from '../../data/offeres';
import { blogData } from '../../data/blog';
import { packagesData } from '../../data/packages';
import { membershipData } from '../../data/membership';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageName("Dashboard"))
  }, [dispatch]);

  const statsData = [
    {
      title: "Categories",
      value: categoryData.length,
      info: "Service classifications",
      icon: Layers3,
      route: "/category",
    },
    {
      title: "Services",
      value: servicesData.length,
      info: "Active beauty treatments",
      icon: Scissors,
      route: "/our-services",
    },
    {
      title: "Experts",
      value: ourExportsData.length,
      info: "Professional beauticians",
      icon: Users,
      route: "/our-experts",
    },
    {
      title: "Gallery Photos",
      value: galleryData.length,
      info: "Published salon media",
      icon: Images,
      route: "/gallery",
    },
    {
      title: "Inquiries",
      value: contactData.length,
      info: "Recent client messages",
      icon: MessageSquare,
      route: "/contact",
    },
    {
      title: "Special Offers",
      value: offersData.length,
      info: "Active discount deals",
      icon: Gift,
      route: "/offeres",
    },
    {
      title: "Salon Packages",
      value: packagesData.length,
      info: "Curated beauty combos",
      icon: Gem,
      route: "/packages",
    },
    {
      title: "Memberships",
      value: membershipData.length,
      info: "VIP membership tiers",
      icon: Crown,
      route: "/membership",
    },
  ];

  return (
    <>
      <div className="space-y-4 lg:space-y-6 xl:space-y-8">

        {/* --- Top Feature Metrics Stats Grid --- */}
        <div className="flex flex-wrap -mx-1.5 lg:-mx-2.5 2xl:-mx-3.5">
          {statsData.map((item) => {
            const Icon = item.icon;

            return (
              <div className="w-full xs:w-1/2 sm:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 lg:p-2.5 2xl:p-3.5 flex items-center" key={item.title}>
                <Link to={item.route} className="bg-white rounded-xl lg:rounded-2xl p-4 md:p-5 min-h-[132px] w-full flex flex-col justify-between main_shadow hover:scale-[1.01] transition-transform duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 2xl:w-12 2xl:h-12 rounded-xl bg-l3 text-primary flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="text-g7 opacity-50 hover:opacity-100">
                      <ChevronRight size={18} />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-12 md:text-14 font-medium text-g7 mb-1">{item.title}</span>
                    <strong className="block font-Prata text-26 md:text-30 2xl:text-36 text-g1 leading-tight">{item.value}</strong>
                    <p className="text-12 md:text-14 text-g7 mt-1 truncate">{item.info}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* --- Section 1: Inquiries & Offers --- */}
        <div className="flex flex-wrap items-start -mx-1.5 lg:-mx-2.5 2xl:-mx-3.5">
          {/* Recent Contact Inquiries */}
          <div className="w-full xl:w-7/12 p-1.5 lg:p-2.5 2xl:p-3.5">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-5 main_shadow">
              <div className="flex items-center justify-between mb-4 lg:mb-5">
                <div>
                  <h2 className="text-18 md:text-18 font-semibold text-primary flex items-center gap-2">
                    <MessageSquare size={20} /> Client Inquiries
                  </h2>
                  <p className="text-12 md:text-14 text-g7 mt-1">Latest customer booking requests & messages</p>
                </div>
                <Link to="/contact" className="btn_secondary w-auto">View All ({contactData.length})</Link>
              </div>

              <div className="space-y-3">
                {contactData.slice(0, 3).map((item) => (
                  <div className="flex flex-col sm:flex-row sm:items-center rounded-xl border border-l2 bg-l4 p-3 gap-3" key={item.id}>
                    <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shrink-0">
                      <PhoneCall size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-14 md:text-16 font-semibold text-g1 truncate">{item.fullName}</h3>
                        <span className="text-11 md:text-12 text-primary font-medium bg-primary-light px-2 py-0.5 rounded-full">
                          Via {item.preferedContact}
                        </span>
                      </div>
                      <p className="text-12 md:text-14 text-g7 truncate mt-0.5">{item.serviceName} • {item.message}</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-l2">
                      <span className="text-11 md:text-12 text-g7 flex items-center gap-1 sm:justify-end">
                        <CalendarDays size={14} /> {item.preferedDate}
                      </span>
                      <span className="text-11 md:text-12 font-semibold text-g1 block mt-0.5">
                        <Clock size={12} className="inline mr-1" />{item.preferedTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Offers */}
          <div className="w-full xl:w-5/12 p-1.5 lg:p-2.5 2xl:p-3.5">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-5 main_shadow">
              <div className="flex items-center justify-between mb-4 lg:mb-5">
                <div>
                  <h2 className="text-18 md:text-18 font-semibold text-primary flex items-center gap-2">
                    <Gift size={20} /> Active Deals & Offers
                  </h2>
                  <p className="text-12 md:text-14 text-g7 mt-1">Current promotions & discount campaigns</p>
                </div>
                <Link to="/offeres" className="btn_secondary w-auto">Manage</Link>
              </div>

              <div className="space-y-3">
                {offersData.slice(0, 3).map((item) => (
                  <div className="flex items-start rounded-xl border border-l2 bg-l4 p-3" key={item.id}>
                    <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mr-3 shrink-0 font-bold text-12 text-center border border-l2">
                      <Sparkles size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-14 md:text-16 font-semibold text-g1 truncate">{item.title}</h3>
                        <span className="text-11 font-bold text-white bg-primary px-2 py-0.5 rounded-full shrink-0 ml-2">
                          {item.offertitle}
                        </span>
                      </div>
                      <p className="text-12 text-g7 line-clamp-2 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 2: Experts, Packages & Blogs --- */}
        <div className="flex flex-wrap -mx-1.5 lg:-mx-2.5 2xl:-mx-3.5">
          {/* Our Experts */}
          <div className="w-full lg:w-1/3 p-1.5 lg:p-2.5 2xl:p-3.5">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-5 main_shadow h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-18 font-semibold text-primary flex items-center gap-2">
                    <Users size={20} /> Beauty Experts
                  </h2>
                  <Link to="/our-experts" className="text-12 font-medium text-primary hover:underline">View All</Link>
                </div>

                <div className="space-y-3">
                  {ourExportsData.map((expert) => (
                    <div key={expert.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-l2 bg-l4">
                      <img src={expert.image} alt={expert.name} className="w-11 h-11 rounded-full object-cover shrink-0 border border-white shadow-sm" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-14 font-semibold text-g1 truncate">{expert.name}</h4>
                        <p className="text-12 text-primary font-medium truncate">{expert.quote}</p>
                        <span className="text-11 text-g7 truncate block">{expert.year} exp • {expert.clientType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Salon Packages */}
          <div className="w-full lg:w-1/3 p-1.5 lg:p-2.5 2xl:p-3.5">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-5 main_shadow h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-18 font-semibold text-primary flex items-center gap-2">
                    <Gem size={20} /> Combo Packages
                  </h2>
                  <Link to="/packages" className="text-12 font-medium text-primary hover:underline">View All</Link>
                </div>

                <div className="space-y-3">
                  {packagesData.slice(0, 3).map((pkg) => (
                    <div key={pkg.id} className="p-3 rounded-xl border border-l2 bg-l4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-14 font-semibold text-g1">{pkg.title}</h4>
                        <span className="text-14 font-bold text-primary">₹{pkg.price}</span>
                      </div>
                      <p className="text-11 text-g7 mt-1">
                        Includes: {pkg.packageDetails?.map(p => p.packageName).slice(0, 3).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blogs & Tips */}
          <div className="w-full lg:w-1/3 p-1.5 lg:p-2.5 2xl:p-3.5">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-5 main_shadow h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-18 font-semibold text-primary flex items-center gap-2">
                    <Newspaper size={20} /> Latest Blogs
                  </h2>
                  <Link to="/blogs" className="text-12 font-medium text-primary hover:underline">View All</Link>
                </div>

                <div className="space-y-3">
                  {blogData.slice(0, 3).map((blog) => (
                    <div key={blog.id} className="flex gap-3 p-2.5 rounded-xl border border-l2 bg-l4 items-center">
                      <img src={blog.image} alt={blog.mainSubtitle} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-14 font-bold text-primary uppercase tracking-wider">{blog.category}</span>
                        <h4 className="text-14 font-semibold text-g1 truncate">{blog.mainSubtitle}</h4>
                        <span className="text-14 text-g7">{blog.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 3: Categories & Membership Tiers --- */}
        <div className="flex flex-wrap -mx-1.5 lg:-mx-2.5 2xl:-mx-3.5">
          {/* Categories Overview */}
          <div className="w-full lg:w-1/2 p-1.5 lg:p-2.5 2xl:p-3.5">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-5 main_shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-18 font-semibold text-primary flex items-center gap-2">
                    <Layers3 size={20} /> Service Categories
                  </h2>
                  <p className="text-12 text-g7 mt-0.5">Top salon departments</p>
                </div>
                <Link to="/category" className="btn_secondary w-auto">Manage Categories</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryData.slice(0, 4).map((cat) => (
                  <div key={cat.id} className="flex items-center gap-3 p-3 rounded-xl border border-l2 bg-l4">
                    <img src={cat.image} alt={cat.category} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-14 font-semibold text-g1 truncate">{cat.category}</h4>
                      <p className="text-11 text-g7 truncate">{cat.mainSubtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Membership Plans */}
          <div className="w-full lg:w-1/2 p-1.5 lg:p-2.5 2xl:p-3.5">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-5 main_shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-18 font-semibold text-primary flex items-center gap-2">
                    <Crown size={20} /> VIP Memberships
                  </h2>
                  <p className="text-12 text-g7 mt-0.5">Exclusive membership tiers</p>
                </div>
                <Link to="/membership" className="btn_secondary w-auto">Manage Tiers</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {membershipData.map((plan) => (
                  <div key={plan.id} className="p-3 rounded-xl border border-l2 bg-l4 flex flex-col justify-between text-center">
                    <div>
                      <span className="inline-block p-1.5 rounded-full bg-white text-primary mb-2 shadow-sm">
                        <Crown size={16} />
                      </span>
                      <h4 className="text-14 font-semibold text-g1">{plan.title}</h4>
                      <span className="text-12 font-bold text-primary block mt-1">{plan.price}</span>
                    </div>
                    <p className="text-10 text-g7 mt-2 border-t border-l2 pt-2 truncate">
                      {plan.packageDetails?.[0]?.packageName || "Exclusive Benefits"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard;
