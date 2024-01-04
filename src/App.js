import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"
import HomePage from "./view/default/pages/HomePage"
import DefaultLayout from "./view/default/DefaultLayout";
import Contact from "./view/default/pages/Contact";
import Guide from "./view/default/pages/Guide";
import Login from "./view/default/pages/Login";
import AdminHome from "./view/admin/pages/AdminHome";
import AdminLayout from "./view/admin/AdminLayout";
import CoordinatorLayout from "./view/coordinator/CoordinatorLayout";
import CoordinatorHome from "./view/coordinator/pages/CoordinatorHome";
import TesterLayout from "./view/tester/TesterLayout";
import TesterHome from "./view/tester/pages/TesterHome";
import StaffLayout from "./view/staff/StaffLayout";
import StaffHome from "./view/staff/pages/StaffHome";
import AdminMangeUser from "./view/admin/pages/AdminMangeUser";
import AdminManageRegistration from "./view/admin/pages/AdminManageRegistration";
import CoordinatorAssignment from "./view/coordinator/pages/CoordinatorAssignment";
import CoordinatorManagePatient from "./view/coordinator/pages/CoordinatorManagePatient";
import CoordinatorManageStaff from "./view/coordinator/pages/CoordinatorManageStaff";
import StaffAddNew from "./view/staff/pages/StaffAddNew";
import TestRegister from "./view/default/pages/TestRegister";
import Register from "./view/default/pages/Register";
import FormTestRegister from "./view/patient/FormTestRegister";
import Profile from "./view/patient/Profile";
import {useDispatch, useSelector} from "react-redux";
import Page404 from "./view/default/pages/Page404";
import axios from "./plugins/axios";
import {statusLoginActions} from "./store/statusLoginSlice";
import CoordinatorAssignmentDetail from "./view/coordinator/pages/CoordinatorAssignmentDetail";
import StaffRegisDetail from "./view/staff/pages/StaffRegisDetail";
import TesterDetail from "./view/tester/pages/TesterDetail";
import RegisDetail from "./view/patient/RegisDetail";
import AdminMangeUserDetail from "./view/admin/pages/AdminMangeUserDetail";
import AdminManageRegistrationDetail from "./view/admin/pages/AdminManageRegistrationDetail";
import jwt from "./plugins/jwt";
import AdminManageService from "./view/admin/pages/AdminManageService";
import AdminManageServiceDetail from "./view/admin/pages/AdminManageServiceDetail";

function App() {
  const dispatch = useDispatch();
  async function initialize() {
    axios.interceptors.request.use(
        (config) => {

          const token = jwt.getToken()
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
          }
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
    )
  }
  async function auth() {
    axios.get('/get-user').then((response) => {
      const data = JSON.parse(atob(response.data))
      dispatch(statusLoginActions.login(data.user))
    })
  }

  const role = useSelector(state => state.statusLogin.role);

  useEffect(() => {
    initialize()
    auth()
  }, [])

  return (
    <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<Contact/>}></Route>
          <Route path="guide" element={<Guide/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="test-register" element={<TestRegister/>}></Route>
          <Route path="register" element={<Register/>}></Route>
        </Route>

        <Route path="/patient" element={role === "PATIENT" ? <DefaultLayout /> : <Page404/>}>
          <Route index element={<HomePage />} />
          <Route path="form-test-register" element={<FormTestRegister/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path="regis-detail/:id" element={<RegisDetail/>}></Route>
        </Route>

        <Route path="/admin" element={role === "ADMIN" ?<AdminLayout/> : <Page404/>}>
          <Route index element={<AdminHome/>}></Route>
          <Route path="manage-user" element={<AdminMangeUser/>}></Route>
          <Route path="manage-user/:id" element={<AdminMangeUserDetail/>}></Route>
          <Route path="manage-registration" element={<AdminManageRegistration/>}></Route>
          <Route path="manage-registration/:id" element={<AdminManageRegistrationDetail/>}></Route>
          <Route path="manage-service" element={<AdminManageService/>}></Route>
          <Route path="manage-service/:id" element={<AdminManageServiceDetail/>}></Route>
        </Route>

        <Route path="/coordinator" element={role === "COORDINATOR" ? <CoordinatorLayout/> : <Page404/> }>
          <Route index element={<CoordinatorHome/>}></Route>
          <Route path="assignment" element={<CoordinatorAssignment/>}></Route>
          <Route path="manage-patient" element={<CoordinatorManagePatient/>}></Route>
          <Route path="manage-staff" element={<CoordinatorManageStaff/>}></Route>
          <Route path="assignment/:id" element={<CoordinatorAssignmentDetail />} />
        </Route>

        <Route path="/tester" element={role === "TESTER" ? <TesterLayout/> : <Page404/>}>
          <Route index element={<TesterHome/>}></Route>
          <Route path="detail/:id" element={<TesterDetail/>}></Route>
        </Route>

        <Route path="/staff" element={role === "STAFF" ? <StaffLayout/> : <Page404/>}>
          <Route index element={<StaffHome/>}></Route>
          <Route path="add-new" element={<StaffAddNew/>}></Route>
          <Route path="registration/:id" element={<StaffRegisDetail/>}></Route>
        </Route>
        <Route path="/*" element={<Page404/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
