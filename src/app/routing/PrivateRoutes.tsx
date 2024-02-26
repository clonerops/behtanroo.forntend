import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_cloner/layout/MasterLayout'
import Dashboard from '../pages/dashboard/Dashboard'
import SubmitPatient from '../pages/dashboard/SubmitPatient'
import PatientLists from '../pages/dashboard/PatientLists'
import Referrals from '../pages/dashboard/Referrals'
import DocumentList from '../pages/dashboard/DocumentList'

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='dashboard/patient' element={<SubmitPatient />} />
        <Route path='dashboard/patientList' element={<PatientLists />} />
        <Route path='dashboard/patient/:patientId/document/:documentId' element={<Referrals />} />
        <Route path='dashboard/documents' element={<DocumentList />} />
        {/* Lazy Modules */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}


export {PrivateRoutes}
