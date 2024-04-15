import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_cloner/layout/MasterLayout'
import Dashboard from '../pages/dashboard/Dashboard'
import SubmitPatient from '../pages/dashboard/SubmitPatient'
import PatientLists from '../pages/dashboard/PatientLists'
import Referrals from '../pages/dashboard/Referrals'
import DocumentList from '../pages/dashboard/DocumentList'
import PatientFormPrint from '../pages/dashboard/PatientFormPrint'
import PatientReport from '../modules/report/PatientReport'
import PatientReportByReferral from '../modules/report/PatientReportByReferral'
import PatientDetail from '../pages/dashboard/PatientDetail'
import SkinForm from '../modules/patient/SkinFormPrint'
import LazerFormPrint from '../modules/patient/LazerFormPrint'
import MidWirfyFormPrint from '../modules/patient/MidWirfyFormPrint'
import FacialFormPrint from '../modules/patient/FacialFormPrint'

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='dashboard/patient' element={<SubmitPatient />} />
        <Route path='dashboard/patient/:id' element={<PatientDetail />} />
        <Route path='dashboard/patientList' element={<PatientLists />} />
        <Route path='dashboard/patient/:patientId/document/:documentId' element={<Referrals />} />
        <Route path='dashboard/documents' element={<DocumentList />} />
        <Route path='dashboard/patientFormPrint/:patientId/:documentId' element={<PatientFormPrint />} />
        <Route path='dashboard/patientReport' element={<PatientReport />} />
        <Route path='dashboard/patientReportByReferral' element={<PatientReportByReferral />} />
        {/* <Route path='dashboard/skinFormPrint' element={<SkinForm />} /> */}
        <Route path='dashboard/skinFormPrint/:patientId/:documentId' element={<SkinForm />} />

        {/* <Route path='dashboard/lazerFormPrint' element={<LazerFormPrint />} /> */}
        <Route path='dashboard/lazerFormPrint/:patientId/:documentId' element={<LazerFormPrint />} />
        <Route path='dashboard/midWirfyFormPrint/:patientId/:documentId' element={<MidWirfyFormPrint />} />
        <Route path='dashboard/facialFormPrint/:patientId/:documentId' element={<FacialFormPrint />} />
        {/* Lazy Modules */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}


export {PrivateRoutes}
