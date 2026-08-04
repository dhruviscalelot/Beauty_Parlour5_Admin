import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { PRICE_VALIDATION, TITLE_VALIDATION ,HOURS} from '../../common/ErrorMessageCommom';
import { packagesData } from '../../data/packages';

const AddEditPackages = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()
    //start static add now for the fetch the data edit time
    // const { serviceData } = location.state || {}
    const serviceData = packagesData.find(
        (item) => String(item.id) === String(id)
    );

    const ExistingIcon = serviceData?.icon;
    //end static add now for the fetch the data edit time

    const fileInputRef = React.useRef(null)



    const initialValues = {
        service_id: serviceData?.id || "",
        title: serviceData?.title || "",
        price: serviceData?.price || "",
        hours: serviceData?.hours || "",
        serviceDetails: serviceData?.packageDetails || [
            { packageName: "" }
        ],
    }

    const HandleValidation = Yup.object().shape({
        title: Yup.string().required(TITLE_VALIDATION),
        price: Yup.string().required(PRICE_VALIDATION),
        hours: Yup.string().required(HOURS),
        serviceDetails: Yup.array().of(
            Yup.object().shape({
                packageName: Yup.string().required("Subtitle is Required"),
            })
        )
    })



    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {

            const finalValues = {
                service_id: values.service_id,
                title: values.title,
                price: values.price,
                serviceDetails: values.serviceDetails,
            }

            const response = await dispatch(saveService(finalValues))
            if (response?.IsSuccess) {
                toast.success(response.Message)
                navigate("../packages")
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while saving")
        }
        setSubmitting(false)
    }
    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, isSubmitting }) =>
                        <Form>
                            <div className="flex items-center justify-between">
                                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Package</h6>
                                <div className='flex items-center space-x-3'>
                                    <Link to="../packages" className='btn_secondary w-auto '>Back</Link>
                                    <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Title <span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="title" placeholder="Enter Title" />
                                    <ErrorMessage name="title" component="span" className="error" />
                                </div>

                                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                                    <label className="label">Price <span className='text-red '>*</span></label>
                                    <Field type="text" className="input" name="price" placeholder="Enter Price" />
                                    <ErrorMessage name="price" component="span" className="error" />
                                </div>
                            </div>



                            {/* Service wise subtitle || price || minute */}
                            <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5">
                                <FieldArray name="serviceDetails">
                                    {({ push, remove }) => (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <label className="label mb-0">
                                                    Packages wise service
                                                </label>

                                                <button
                                                    type="button"
                                                    className="btn_primary w-auto"
                                                    onClick={() => push({ subtitle: "", price: "", minute: "" })}
                                                >
                                                    Add More
                                                </button>
                                            </div>

                                            {values.serviceDetails?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="border border-l2 rounded-xl p-4"
                                                >
                                                    <div className="flex flex-wrap items-end -mx-2">
                                                        {/* Subtitle */}
                                                        <div className="w-full md:w-4/12 px-2">
                                                            <label className="label">
                                                                Subtitle / Package Name
                                                            </label>

                                                            <Field
                                                                type="text"
                                                                name={`serviceDetails.${index}.packageName`}
                                                                className="input"
                                                                placeholder="Enter Subtitle"
                                                            />

                                                            <ErrorMessage
                                                                name={`serviceDetails.${index}.packageName`}
                                                                component="span"
                                                                className="error"
                                                            />
                                                        </div>


                                                        {/* Remove Button */}
                                                        <div className="w-full md:w-2/12 px-2">
                                                            <button
                                                                type="button"
                                                                className="btn_secondary w-full"
                                                                onClick={() => remove(index)}
                                                                disabled={
                                                                    values.serviceDetails.length === 1
                                                                }
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                        </Form>
                    }
                </Formik>
            </div>
        </>
    )
}

export default AddEditPackages