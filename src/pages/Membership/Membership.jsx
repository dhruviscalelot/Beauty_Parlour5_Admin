
import React, { useState, useEffect } from 'react'
import { setPageName } from "../../Store/Action/Auth/Auth_Action";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from "../../components/CustomTable";
import { membershipData } from '../../data/membership.js';
import { Pencil, Trash2, Search, Plus } from "lucide-react";
import CommonDialog from '../../common/CommonDialog.jsx';

const Membership = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {}, });
    const [commonData, setCommonData] = useState({});

    const columns = [
        { key: "title", label: "Title", renderCell: (key, row) => row?.title || "-" },
        { key: "price", label: "Price", renderCell: (key, row) => row?.price || "-" },
        {
            key: "packageDetails",
            label: "Packages Details",
            renderCell: (key, row) => (
                <div className="flex flex-col space-y-1 text-sm">
                    {row?.packageDetails?.map((service, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-3 min-w-[180px]"
                        >
                            <span className="font-medium capitalize text-g1 w-[160px] text-left truncate">
                                {service?.packageName}
                            </span>
                        </div>
                    ))}
                </div>
            )
        },

        {
            key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-3">
                <span className="text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => navigate(`./edit/${row.id}`,)} ><Pencil size={18} /></span>
                <span className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)} ><Trash2 size={18} /></span>
            </div>
        }
    ]

    // Pagination state — 10 items per page
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });


    // Slice static data for current page
    const paginatedData = membershipData.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit
    );

    const handlePageChange = (newPage, newLimit) => {
        setPagination({ page: newPage, limit: newLimit });
    };
    //end


    useEffect(() => {
        dispatch(setPageName("Membership"))
    }, []);



    //Delete Open Dialog
    const DeleteOpenDialog = (rowData) => {
        setCommonData({
            title: "Delete Service",
            description: "Are You Sure You Want To Delete This Membership? ",
            buttonNames: { firstBtn: "Cancel", secondBtn: "Delete" },
        });
        setDeletePopup({
            isOpen: true,
            resData: rowData,
        });
    };


    //Delete Close Dialog
    const deleteCloseDialog = async (closeEvent) => {
        if (closeEvent) {
            if (DeletePopup?.resData) {
                let resData = DeletePopup?.resData;
                const payload = { service_id: resData?._id || "", };
                // const response = await dispatch(deleteService(payload));
                if (response?.IsSuccess) {
                    toast.success(response?.Message);
                    // GetServicesData();
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
                    <h6 className="text-20 font-semibold text-primary">Our Membership</h6>
                    <Link to="./create" className='btn_primary w-auto '><Plus size={20} />
                        <span>Add New Membership</span>
                    </Link>
                </div>

                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='text-g7 block text-[18px] xl:text-[20px] cursor-pointer'><Search size={20} /></span>
                            <input type="text" placeholder='Search' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' />
                        </div>
                    </div>
                </div>

                <CustomTable
                    columns={columns}
                    data={paginatedData}
                    isPagination={true}
                    totalRecords={membershipData.length}
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                />
            </div>
            {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
        </>
    )
}

export default Membership
