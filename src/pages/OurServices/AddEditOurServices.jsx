import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { SERVICE_VALIDATION, DESCRIPTION_VALIDATION, CATEGOTY_VALIDATION, PRICE_VALIDATION, DURATION_VALIDATION, RECOMMENDEDFOR_VALIDATION } from '../../common/ErrorMessageCommom';
import { ImagePlus } from "lucide-react";
import { servicesData } from '../../data/service.js';
import CustomDropdown from '../../components/UI/CustomDropdown.jsx'


const AddEditOurServices = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()
    //start static add now for the fetch the data edit time
    // const { serviceData } = location.state || {}
    const serviceData = servicesData.find(
        (item) => String(item.id) === String(id)
    );

    // const ExistingIcon = serviceData?.icon;
    //end static add now for the fetch the data edit time

    const fileInputRef = React.useRef(null)



    const initialValues = {
        service_id: serviceData?.id || "",

        category: serviceData?.category || "",
        service: serviceData?.service || "",
        duration: serviceData?.duration || "",
        recommendedfor: serviceData?.recommendedFor || "",
        price: serviceData?.price || "",
        description: serviceData?.description || "",


    }

    const HandleValidation = Yup.object().shape({

        category: Yup.string().required(CATEGOTY_VALIDATION),
        service: Yup.string().required(SERVICE_VALIDATION),
        duration: Yup.string().required(DURATION_VALIDATION),
        recommendedfor: Yup.string().required(RECOMMENDEDFOR_VALIDATION),
        price: Yup.string().required(PRICE_VALIDATION),
        description: Yup.string().required(DESCRIPTION_VALIDATION),
        // serviceDetails: Yup.array().of(
        //     Yup.object().shape({
        //         subtitle: Yup.string().required("Suitable Title is Required"),
        //         subtitle1: Yup.string().required("Description is Required"),
        //         price: Yup.string().required("Price is required"),
        //         minute: Yup.string().required("Minute is required"),
        //     })
        // )
    })


    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {

            const finalValues = {
                service_id: values.service_id,
                title: values.title,
                suitabletitle: values.suitabletitle,
                image: imageUrl,
                sortOrder: values.sortOrder,
                serviceDetails: values.serviceDetails,
            }

            const response = await dispatch(saveService(finalValues))
            if (response?.IsSuccess) {
                toast.success(response.Message)
                navigate("../our-services")
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while saving")
        }
        setSubmitting(false)
    }

    const options = [
        { label: "Hair Care", value: "Hair Care" },
        { label: "Skin Care", value: "Skin Care" },
        { label: "Make Up", value: "Make Up" },
        { label: "Nail Care", value: "Nail Care" },
    ]
    console.log("option----", options)
    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, isSubmitting }) =>

                        <Form>
                            <div className="flex items-center justify-between">
                                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Service</h6>
                                <div className='flex items-center space-x-3'>
                                    <Link to="../our-services" className='btn_secondary w-auto '>Back</Link>
                                    <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Category Name <span className='text-red '>*</span></label>
                                    {/* <Field type="text" className="input" name="name" placeholder="Enter Category Name" /> */}
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




                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Service Name <span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="service" placeholder="Enter Client Type" />
                                    <ErrorMessage name="service" component="span" className="error" />
                                </div>

                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Duration <span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="duration" placeholder="Enter Duration" />
                                    <ErrorMessage name="duration" component="span" className="error" />
                                </div>



                                {/* <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Recommended For <span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="recommendedfor" placeholder="Enter Recommended For" />
                                    <ErrorMessage name="recommendedfor" component="span" className="error" />
                                </div> */}


                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Price <span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="price" placeholder="Enter Price" />
                                    <ErrorMessage name="price" component="span" className="error" />
                                </div>



                                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Description <span className='text-red '>*</span></label>
                                    <Field as="textarea" name="description" className="input h-[130px] py-3" placeholder="Enter Description" />
                                    <ErrorMessage name="description" component="span" className="error" />
                                </div>




                            </div>
                        </Form>
                    }
                </Formik>
            </div>
        </>
    )
}

export default AddEditOurServices