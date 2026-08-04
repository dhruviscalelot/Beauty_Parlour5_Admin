import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { DATE_VALIDATION, TITLE_VALIDATION, SUBTITLE_VALIDATION } from '../../common/ErrorMessageCommom';
import { ImagePlus } from "lucide-react";
import { offersData } from '../../data/offeres';
import { Calendar } from "primereact/calendar";


const AddEditOfferes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  //start static add now for the fetch the data edit time
  // const { serviceData } = location.state || {}
  const offerssData = offersData.find(
    (item) => String(item.id) === String(id)
  );

  const initialValues = {
    service_id: offerssData?.id || "",
    offertitle: offerssData?.offertitle || "",
    title: offerssData?.title || "",
    date: offerssData?.date || "",
  }


  const HandleValidation = Yup.object().shape({
    offertitle: Yup.string().required(SUBTITLE_VALIDATION),
    title: Yup.string().required(TITLE_VALIDATION),
    date: Yup.string().required(DATE_VALIDATION),
  })


  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)

    try {
      const finalValues = {
        service_id: values.service_id,
        title: values.title,

        sortOrder: values.sortOrder,
        serviceDetails: values.serviceDetails,
      }

      const response = await dispatch(saveService(finalValues))
      if (response?.IsSuccess) {
        toast.success(response.Message)
        navigate("../offeres")
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
                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Offeres</h6>
                <div className='flex items-center space-x-3'>
                  <Link to="../offeres" className='btn_secondary w-auto '>Back</Link>
                  <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                </div>
              </div>

              <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Offer Title/Price <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="offertitle" placeholder="Enter Offer Title" />
                  <ErrorMessage name="offertitle" component="span" className="error" />
                </div>


                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Title <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="title" placeholder="Enter Client Title" />
                  <ErrorMessage name="title" component="span" className="error" />
                </div>



                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Offer Date <span className='text-red '>*</span></label>
                  <Calendar
                    id="pickup_date"
                    name="date"
                    value={values.date}
                    onChange={(e) => setFieldValue("date", e.value)}
                    minDate={new Date()}
                    dateFormat="dd/mm/yy"
                    placeholder="Select Date"
                    showIcon
                    iconPos="input"
                    // showButtonBar
                    className="w-full"
                    inputClassName="input w-full"
                  />
                  <ErrorMessage name="date" component="span" className="error" />
                </div>

              </div>

            </Form>
          }
        </Formik>
      </div>
    </>
  )
}

export default AddEditOfferes