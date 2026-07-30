import React, { useEffect, useState } from 'react'
import { setPageName } from "../../Store/Action/Auth/Auth_Action";
import { bookingData } from '../../data/Booking.js';
import { useDispatch } from 'react-redux';
import CustomTable from '../../components/CustomTable.jsx';
import { Eye, Search, Trash2 } from 'lucide-react';
import CommonDialog from '../../common/CommonDialog.jsx';

const Booking = () => {

    const dispatch = useDispatch();
    const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {} })
    const [commonData, setCommonData] = useState({});

    const columns = [
        { key: "fullName", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Mobile" },
        { key: "expertName", label: "Expert Name" },
        { key: "serviceName", label: "Service Name" },
        { key: "Date", label: "Date" },
        {
            key: "status", label: "Status",
        },
        {

            key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
                <span className="text-[18px] lg:text-[20px] xl:text-[24px cursor-pointer" onClick={() => DeleteOpenDialog(row)} ><Eye size={20} /></span>
                <span className="text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)} ><Trash2 size={18} /></span>
            </div>
        }
    ]

    useEffect(() => {
        dispatch(setPageName("Booking"))
    }, []);


    const DeleteOpenDialog = (rowData) => {
        setCommonData({
            title: "Delete Booking",
            description: "Are You Sure You Want To Delete This Booking ? ",
            buttonNames: { firstBtn: "Cancel", secondBtn: "Delete" },
        });
        setDeletePopup({
            isOpen: true,
            resData: rowData,
        });
    };


    const deleteCloseDialog = async (closeEvent) => {
        if (closeEvent) {
            if (DeletePopup?.resData) {
                let resData = DeletePopup?.resData;
                const payload = { inquiry_id: resData?._id || "", };
                const response = await dispatch(deleteInquiry(payload));
                if (response?.IsSuccess) {
                    toast.success(response?.Message);
                    GetInquiryData();
                }
                setDeletePopup({
                    isOpen: false,
                    resData: {},
                });
            }
        } else {
            setDeletePopup({ isOpen: false, resData: {}, });
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Booking</h6>
                </div>
                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'><Search size={20} /></span>
                            <input type="text" placeholder='Search' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' />
                        </div>
                    </div>
                </div>
                <CustomTable columns={columns} data={bookingData} isPagination={false} />

            </div>
            {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
        </>
    )
}

export default Booking