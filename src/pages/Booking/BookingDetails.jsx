import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageName } from "../../Store/Action/Auth/Auth_Action";
import { bookingData } from '../../data/Booking.js';
import { 
    ArrowLeft, 
    User, 
    Mail, 
    Phone, 
    Scissors, 
    Calendar, 
    Clock, 
    UserCheck, 
    MessageSquare, 
    Tag, 
    IndianRupee,
    FileText
} from 'lucide-react';

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Find the specific booking data by ID
    const booking = bookingData.find((item) => String(item.id) === String(id));

    useEffect(() => {
        dispatch(setPageName("Booking Details"));
    }, [dispatch]);

    if (!booking) {
        return (
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-4 lg:p-6 xl:p-8 space-y-6 text-center">
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <FileText size={48} className="text-g1 opacity-50" />
                    <h5 className="text-20 font-semibold text-primary">Booking Not Found</h5>
                    <p className="text-14 text-g1 max-w-md">
                        No booking details found for ID #{id}. The booking might have been deleted or does not exist.
                    </p>
                    <Link to="/booking" className="btn_secondary w-auto inline-flex items-center space-x-2">
                        <ArrowLeft size={16} />
                        <span>Back to All Bookings</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-5 xl:p-6 space-y-5 lg:space-y-7">
            {/* Top Bar Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-l2 pb-4">
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={() => navigate('/booking')} 
                        className="p-2 rounded-lg bg-l4 border border-l2 text-primary hover:bg-l3 transition-colors cursor-pointer"
                        title="Back to Bookings"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h6 className="text-18 lg:text-20 font-semibold text-primary">Booking #{booking.id}</h6>
                            <span className="bg-l3 text-primary text-12 font-medium px-2.5 py-0.5 rounded-full border border-l2">
                                Confirmed
                            </span>
                        </div>
                        <p className="text-12 text-g1">Created on {booking.Date}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link to="/booking" className="btn_secondary w-auto px-4 py-2 flex items-center space-x-2">
                        <ArrowLeft size={16} />
                        <span>Back</span>
                    </Link>
                </div>
            </div>

            {/* Quick Summary Header Banner */}
            <div className="bg-l4 border border-l2 rounded-xl p-4 lg:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-l3 border border-l2 flex items-center justify-center text-primary shrink-0">
                        <User size={24} />
                    </div>
                    <div>
                        <h5 className="text-16 lg:text-18 font-semibold text-primary">{booking.fullName}</h5>
                        <p className="text-14 text-g1">{booking.serviceName}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-14">
                    <div className="flex items-center space-x-2 text-g1">
                        <Calendar size={18} className="text-primary" />
                        <div>
                            {/* <span className="block text-12 text-g1">Date</span> */}
                            <span className="font-medium text-primary">{booking.Date}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-g1">
                        <Clock size={18} className="text-primary" />
                        <div>
                            {/* <span className="block text-12 text-g1">Time</span> */}
                            <span className="font-medium text-primary">{booking.preferedTime}</span>
                        </div>
                    </div>
                    {booking.price && (
                        <div className="flex items-center space-x-2 text-g1">
                            <IndianRupee size={18} className="text-primary" />
                            <div>
                                {/* <span className="block text-12 text-g1">Amount</span> */}
                                <span className="font-semibold text-primary">₹{Number(booking.price).toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Information Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {/* Customer Information Card */}
                <div className="bg-white border border-l2 rounded-xl p-4 lg:p-5 space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-l2">
                        <User className="text-primary" size={20} />
                        <h6 className="text-16 font-semibold text-primary">Customer Details</h6>
                    </div>
                    <div className="space-y-3.5 text-14">
                        <div className="flex items-start justify-between">
                            <span className="text-g1 flex items-center space-x-2 shrink-0">
                                <User size={16} />
                                <span>Full Name</span>
                            </span>
                            <span className="font-medium text-primary text-right pl-2">{booking.fullName}</span>
                        </div>
                        <div className="flex items-start justify-between">
                            <span className="text-g1 flex items-center space-x-2 shrink-0">
                                <Mail size={16} />
                                <span>Email Address</span>
                            </span>
                            <a href={`mailto:${booking.email}`} className="font-medium text-primary hover:underline text-right pl-2 break-all">
                                {booking.email}
                            </a>
                        </div>
                        <div className="flex items-start justify-between">
                            <span className="text-g1 flex items-center space-x-2 shrink-0">
                                <Phone size={16} />
                                <span>Phone Number</span>
                            </span>
                            <a href={`tel:${booking.phoneNumber}`} className="font-medium text-primary hover:underline text-right pl-2">
                                {booking.phoneNumber}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Service & Booking Details Card */}
                <div className="bg-white border border-l2 rounded-xl p-4 lg:p-5 space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-l2">
                        <Scissors className="text-primary" size={20} />
                        <h6 className="text-16 font-semibold text-primary">Appointment Info</h6>
                    </div>
                    <div className="space-y-3.5 text-14">
                        <div className="flex items-start justify-between">
                            <span className="text-g1 flex items-center space-x-2 shrink-0">
                                <Scissors size={16} />
                                <span>Service Name</span>
                            </span>
                            <span className="font-medium text-primary text-right pl-2">{booking.serviceName}</span>
                        </div>
                        {booking.categoryname && (
                            <div className="flex items-start justify-between">
                                <span className="text-g1 flex items-center space-x-2 shrink-0">
                                    <Tag size={16} />
                                    <span>Category</span>
                                </span>
                                <span className="font-medium text-primary text-right pl-2">{booking.categoryname}</span>
                            </div>
                        )}
                        <div className="flex items-start justify-between">
                            <span className="text-g1 flex items-center space-x-2 shrink-0">
                                <UserCheck size={16} />
                                <span>Assigned Expert</span>
                            </span>
                            <span className="font-medium text-primary text-right pl-2">{booking.expertName}</span>
                        </div>
                        <div className="flex items-start justify-between">
                            <span className="text-g1 flex items-center space-x-2 shrink-0">
                                <Calendar size={16} />
                                <span>Appointment Date</span>
                            </span>
                            <span className="font-medium text-primary text-right pl-2">{booking.Date}</span>
                        </div>
                        <div className="flex items-start justify-between">
                            <span className="text-g1 flex items-center space-x-2 shrink-0">
                                <Clock size={16} />
                                <span>Preferred Time</span>
                            </span>
                            <span className="font-medium text-primary text-right pl-2">{booking.preferedTime}</span>
                        </div>
                        {booking.price && (
                            <div className="flex items-start justify-between">
                                <span className="text-g1 flex items-center space-x-2 shrink-0">
                                    <IndianRupee size={16} />
                                    <span>Price</span>
                                </span>
                                <span className="font-semibold text-primary text-right pl-2">₹{Number(booking.price).toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Customer Message / Special Instructions Card */}
            <div className="bg-white border border-l2 rounded-xl p-4 lg:p-5 space-y-3">
                <div className="flex items-center space-x-2 pb-2 border-b border-l2">
                    <MessageSquare className="text-primary" size={20} />
                    <h6 className="text-16 font-semibold text-primary">Customer Message & Notes</h6>
                </div>
                <div className="bg-l4 border border-l2 rounded-lg p-3.5 lg:p-4">
                    <p className="text-14 text-primary leading-relaxed whitespace-pre-line">
                        {booking.message || "No special message provided."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
