import React, { useState, useEffect } from 'react'
import { setPageName } from "../../Store/Action/Auth/Auth_Action";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from "../../components/CustomTable";
import { servicesData } from '../../data/service.js';
import { Pencil, Trash2, Search, Plus } from "lucide-react";
import CommonDialog from '../../common/CommonDialog.jsx';
import { InputSwitch } from 'primereact/inputswitch';

const OurServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {}, });
  const [commonData, setCommonData] = useState({});
  const [checked, setChecked] = useState({});


  const handleStatusChange = (id, value) => {
    setChecked((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const columns = [

    // {
    //   key: "icon", label: "Icon", renderCell: (key, row) => {
    //     const IconComponent = row?.icon;
    //     return IconComponent
    //       ? <span className="flex items-center justify-center w-[40px] h-[40px] rounded-lg bg-primary/10">
    //         <IconComponent size={22} className="text-primary" />
    //       </span>
    //       : "-";
    //   }
    // },
    { key: "category", label: "Category Name", className: "w-[200px]", renderCell: (key, row) => row?.category || "-" },
    { key: "service", label: "Service Name", className: "w-[200px]", renderCell: (key, row) => row?.service || "-" },
    { key: "description", label: "Description", className: "w-[200px]", renderCell: (key, row) => row?.description || "-" },
    { key: "duration", label: "Duration", className: "w-[200px]", renderCell: (key, row) => row?.duration || "-" },
    // { key: "recommendedFor", label: "Recommended For", className: "w-[200px]", renderCell: (key, row) => row?.recommendedFor || "-" },
    { key: "price", label: "Price", className: "w-[200px]", renderCell: (key, row) => row?.price || "-" },
    {
      key: "status",
      label: "Status",
      renderCell: (key, row) => (
        <div className="custom-switch">
          <InputSwitch
            checked={checked[row.id] ?? false}
            onChange={(e) => handleStatusChange(row.id, e.value)}
          />
        </div>
      ),
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
  const paginatedData = servicesData.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  const handlePageChange = (newPage, newLimit) => {
    setPagination({ page: newPage, limit: newLimit });
  };
  //end


  useEffect(() => {
    dispatch(setPageName("Our Services"))
  }, []);



  //Delete Open Dialog
  const DeleteOpenDialog = (rowData) => {
    setCommonData({
      title: "Delete Service",
      description: "Are You Sure You Want To Delete This Service? ",
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
          <h6 className="text-20 font-semibold text-primary">Our Services</h6>
          <Link to="./create" className='btn_primary w-auto '><Plus size={20} />
            <span>Add New Service</span>
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
          totalRecords={servicesData.length}
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
      {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
    </>
  )
}

export default OurServices