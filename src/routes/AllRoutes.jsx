import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Login from '../auth/Login';
import Layout from '../components/Layout';
import Dashboard from "../pages/Dashboard/Dashboard"
import RequireAuth from "../routes/RequireAuth"
import OurServices from '../pages/OurServices/OurServices';
import Gallery from '../pages/Gallery/Gallery';
import AddEditOurServices from '../pages/OurServices/AddEditOurServices';
import Testimonials from '../pages/Testimonials/Testimonials';
import AddEditTestimonials from '../pages/Testimonials/AddEditTestimonials';
import AllContacts from "../pages/Contact/AllContacts"
import Offeres from '../pages/Offeres/Offeres';
import AddEditOfferes from '../pages/Offeres/AddEditOfferes';
import Packages from '../pages/Packages/Packages';
import AddEditPackages from '../pages/Packages/AddEditPackages';
import OurExperts from '../pages/OurExperts/OurExperts';
import AddEditOurExperts from '../pages/OurExperts/AddEditOurExperts';
import Category from '../pages/Category/Category';
import AddEditCategory from '../pages/Category/AddEditCategory';
import Blog from "../pages/Blog/Blog";
import AddEditBlog from '../pages/Blog/AddEditBlog';
import Membership from '../pages/Membership/Membership';
import AddEditMembership from '../pages/Membership/AddEditMembership';
import Booking from '../pages/Booking/Booking';

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<RequireAuth />}>
                    <Route element={<Layout />}>

                        {/* Dashboard */}
                        <Route path='/dashboard' element={<Dashboard />} />

                        {/* Our Services */}
                        <Route path='/our-services' element={<OurServices />} />
                        <Route path='/our-services/create' element={<AddEditOurServices />} />
                        <Route path='/our-services/edit/:id' element={<AddEditOurServices />} />


                        {/* Category */}
                        <Route path='/category' element={<Category />} />
                        <Route path='/category/create' element={<AddEditCategory />} />
                        <Route path='/category/edit/:id' element={<AddEditCategory />} />


                        {/* Gallery */}
                        <Route path='/gallery' element={<Gallery />} />


                        {/* Our Exports */}
                        <Route path='/our-experts' element={<OurExperts />} />
                        <Route path='/our-experts/create' element={<AddEditOurExperts />} />
                        <Route path='/our-experts/edit/:id' element={<AddEditOurExperts />} />


                        {/* Reviews */}
                        <Route path='/testimonials' element={<Testimonials />} />
                        <Route path='/testimonials/create' element={<AddEditTestimonials />} />
                        <Route path='/testimonials/edit/:id' element={<AddEditTestimonials />} />

                        {/* Contact */}
                        <Route path='/contact' element={<AllContacts />} />


                        {/* Offeres */}
                        <Route path='/offeres' element={<Offeres />} />
                        <Route path='/offeres/create' element={<AddEditOfferes />} />
                        <Route path='/offeres/edit/:id' element={<AddEditOfferes />} />


                        {/* Packages */}
                        <Route path='/packages' element={<Packages />} />
                        <Route path='/packages/create' element={<AddEditPackages />} />
                        <Route path='/packages/edit/:id' element={<AddEditPackages />} />


                        {/* Blogs */}
                        <Route path='/blogs' element={<Blog />} />
                        <Route path='/blogs/create' element={<AddEditBlog />} />
                        <Route path='/blogs/edit/:id' element={<AddEditBlog />} />


                        {/* Membership */}
                        <Route path='/membership' element={<Membership />} />
                        <Route path='/membership/create' element={<AddEditMembership />} />
                        <Route path='/membership/edit/:id' element={<AddEditMembership />} />

                        {/* Booking */}
                        <Route path='/booking' element={<Booking />} />

                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default AllRoutes