import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { QUOTE_VALIDATION, NAME_VALIDATION, CATEGOTY_VALIDATION, DESCRIPTION_VALIDATION, TITLE_VALIDATION, IMAGE_VALIDATION, DATE_VALIDATION } from '../../common/ErrorMessageCommom';
import { ImagePlus, Eye, Trash2 } from "lucide-react";
import { blogData } from '../../data/blog';
import { Calendar } from "primereact/calendar";
import CustomDropdown from '../../components/UI/CustomDropdown'

const AddEditBlog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()


    //start static add now for the fetch the data edit time
    // const { serviceData } = location.state || {}
    const blogsData = blogData.find(
        (item) => String(item.id) === String(id)
    );
    console.log("blog data-----",blogsData);

    //end static add now for the fetch the data edit time

    const fileInputRef = React.useRef(null)



    const initialValues = {
        // name: blogsData?.name || "",
        category: blogsData?.category || "",
        description: blogsData?.description || "",
        mainSubtitle: blogsData?.mainSubtitle || "",
        image: blogsData?.image || "", type: "image",
        createdByName: blogsData?.createdByName || "",
        
        date: blogsData?.date || "",
    }

    const HandleValidation = Yup.object().shape({
        // name: Yup.mixed().required(NAME_VALIDATION),
        category: Yup.mixed().required(CATEGOTY_VALIDATION),
        description: Yup.string().required(DESCRIPTION_VALIDATION),
        mainSubtitle: Yup.string().required(TITLE_VALIDATION),
        image: Yup.mixed().required(IMAGE_VALIDATION),
        date: Yup.mixed().required(DATE_VALIDATION),
        createdByName: Yup.string().required(NAME_VALIDATION),
    })

    const handleImageUpload = (e, setFieldValue) => {
        const file = e.target.files[0]
        if (file) {
            setFieldValue("image", file)
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
            let imageUrl = values.image

            // If image is a File object, upload it first
            if (values.image instanceof File) {
                const formData = new FormData()
                formData.append("image", values.image)
                const uploadResponse = await dispatch(uploadImage(formData))
                if (uploadResponse?.IsSuccess) {
                    imageUrl = uploadResponse.Data.imageUrl || uploadResponse.Data.image || uploadResponse.Data
                } else {
                    toast.error("Image upload failed")
                    setSubmitting(false)
                    return
                }
            }

            const finalValues = {
                service_id: values.service_id,
                title: values.title,
                desc: values.description,
                image: imageUrl,
                sortOrder: values.sortOrder
            }

            const response = await dispatch(saveService(finalValues))
            if (response?.IsSuccess) {
                toast.success(response.Message)
                navigate("../testimonials")
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while saving")
        }
        setSubmitting(false)
    }



    const parseDateValue = (date) => {
        if (!date) return "";

        if (date instanceof Date) return date;

        const parsedDate = dayjs(date, ["DD-MM-YYYY", "DD/MM/YYYY", "YYYY-MM-DD"], true);
        return parsedDate.isValid() ? parsedDate.toDate() : "";
    };

    const formatDate = (date) => {
        if (!date) return "";

        const d = date instanceof Date ? date : parseDateValue(date);
        if (!d) return "";

        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        return `${day}-${month}-${year}`;
    };



    const options = [
        { label: "Hair Care", value: "Hair Care" },
        { label: "Skin Care", value: "Skin Care" },
        { label: "Make Up", value: "Make Up" },
        { label: "Nail Care", value: "Nail Care" },
    ]
    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, isSubmitting }) =>
                        <Form>
                            <div className="flex items-center justify-between">
                                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Blogs</h6>
                                <div className='flex items-center space-x-3'>
                                    <Link to="../blogs" className='btn_secondary w-auto '>Back</Link>
                                    <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                                <div className="w-full md:w-1/3 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Category Name <span className='text-red '>*</span></label>
                                    {/* <Field type="text" className="input" name="category" placeholder="Enter Category Name" /> */}
                                    <CustomDropdown
                                        value={values.category}
                                        name="category"
                                        placeholder="Select Category"
                                        options={options}
                                        onType={(val) => setFieldValue("category", val)}
                                        onSelect={(val) => setFieldValue("category", val.value)}
                                        onTouched={() =>
                                            setFieldValue("category", values.category.trim())
                                        }
                                    />
                                    <ErrorMessage name="category" component="span" className="error" />
                                </div>


                                <div className="w-full md:w-1/3 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Title<span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="mainSubtitle" placeholder="Enter Client Title" />
                                    <ErrorMessage name="mainSubtitle" component="span" className="error" />
                                </div>

                                <div className="w-full md:w-1/3 p-1.5 xl:p-2.5 2xl:p-3.5">
                                    <label htmlFor="pickup_date" className="label">
                                        Date <span className="text-red">*</span>
                                    </label>

                                    <Calendar
                                        id="pickup_date"
                                        name="date"
                                        value={values.date}
                                        onChange={(e) => setFieldValue("pickup_date", e.value)}
                                        minDate={new Date()}
                                        dateFormat="dd/mm/yy"
                                        placeholder="Select Date"
                                        showIcon
                                        iconPos="input"
                                        showButtonBar
                                        className="w-full"
                                        inputClassName="input w-full"
                                    />
                                    <ErrorMessage
                                        name="date"
                                        component="span"
                                        className="error"
                                    />
                                </div>

                                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Description <span className='text-red '>*</span></label>
                                    <Field as="textarea" name="description" className="input h-[130px] py-3" placeholder="Enter Customer Description/Review" />
                                    <ErrorMessage name="description" component="span" className="error" />
                                </div>



                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="'image/jpg, image/png, image/webp, image/gif'"
                                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                                    />
                                    <label className="label">Image <span className='text-red '>*</span></label>
                                    <div
                                        className="input relative border border-dashed flex items-center justify-between cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {!values.image ? (
                                            <div className="text-center flex items-center justify-center space-x-2 w-full">
                                                <span className="text-[20px] 2xl:text-[24px] font-medium text-g1"><ImagePlus size={18} /></span>
                                                <span className="text-12 md:text-14 2xl:text-16 text-g7">Upload Photo</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className='text-12 md:text-14 2xl:text-16 text-g1 truncate text-ellipsis overflow-hidden'>
                                                    {values.image instanceof File ? values.image.name : values.image.split("/").pop()}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <span
                                                        className="text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const url = values.image instanceof File ? URL.createObjectURL(values.image) : import.meta.env.VITE_API_URL + values.image;
                                                            window.open(url, '_blank');
                                                        }}
                                                    ><Eye size={25} /></span>
                                                    <span
                                                        className="text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteImage(setFieldValue);
                                                        }}
                                                    ><Trash2 size={22} /></span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <ErrorMessage name="image" component="span" className="error -bottom-2" />
                                    {values.image && (
                                        <div className="mt-4">
                                            <p className="text-12 text-g7 mb-2">Preview:</p>
                                            <img
                                                src={
                                                    values.image instanceof File
                                                        ? URL.createObjectURL(values.image)
                                                        : values.image
                                                }
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-lg border border-l2 shadow-sm"
                                            />
                                        </div>
                                    )}
                                </div>


                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Created By<span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="createdByName" placeholder="Enter Name" />
                                    <ErrorMessage name="createdByName" component="span" className="error" />
                                </div>
                            </div>
                        </Form>
                    }
                </Formik>
            </div>
        </>
    )
}

export default AddEditBlog