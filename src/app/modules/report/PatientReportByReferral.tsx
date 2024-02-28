/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import {  useGetDocuments } from '../patient/_hooks'
import { IPatient } from '../patient/_models'
import { Form, Formik } from 'formik'
import Select from '../auth/components/Select'
import { useDownloadExportExcelPatientReportByReferral, useGetPatientReportByReferral } from './_hooks'
import Inputs from '../auth/components/Inputs'
import Backdrop from '../../../_cloner/helpers/components/Backdrop'

const columns = [
  { id: 8, title: "شماره بیمار" },
  { id: 1, title: "نام" },
  { id: 2, title: "نام خانوادگی" },
  { id: 10, title: "جنسیت" },
  { id: 3, title: "کدملی" },
  { id: 4, title: "شماره همراه" },
  { id: 5, title: "شماره همراه ضروری" },
  { id: 6, title: "تلفن منزل" },
  { id: 7, title: "آدرس" },
]

const initialValues = {
  documentId: "1",
  fromCount: "1",
  toCount: "10"
}

const PatientReportByReferral = () => {
  const patients = useGetPatientReportByReferral()
  const documents = useGetDocuments()
  

  const downloadExcel = useDownloadExportExcelPatientReportByReferral()


  useEffect(() => {
    const formData = {
      documentId: "1",
      fromCount: "1",
      toCount: "10"
    }
    patients.mutate(formData)
  }, [])


  const handleDownloadExcel = async (values: any) => {
    downloadExcel.mutate(values)
  }

  const onSubmit = (values: any) => {
    patients.mutate(values)
  }

  return (
    <>
      {patients.isLoading &&<Backdrop loading={patients.isLoading} /> }
      <div className={`card`}>
        <div className='container'>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ getFieldProps, touched, errors, handleSubmit, values, setFieldValue }) => {
              return <Form>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                  <Select
                    type="text"
                    login={true}
                    options={documents?.data?.data || []}
                    getFieldProps={getFieldProps}
                    touched={touched.documentId}
                    errors={errors.documentId}
                    name={"documentId"}
                    title="نوع پرونده"
                  ></Select>
                  <div className='flex flex-col'>
                    <Inputs
                      type="text"
                      login={true}
                      getFieldProps={getFieldProps}
                      touched={touched.fromCount}
                      errors={errors.fromCount}
                      name={"fromCount"}
                      title="تعداد مراجعه از"
                    ></Inputs>
                  </div>
                  <div className='flex flex-col'>
                    <Inputs
                        type="text"
                        login={true}
                        getFieldProps={getFieldProps}
                        touched={touched.toCount}
                        errors={errors.toCount}
                        name={"toCount"}
                        title="تا"
                      ></Inputs>
                  </div>

                </div>
                <div className='flex justify-between items-center'>
                  <button className='btn btn-success' onClick={() => handleSubmit()}>جستجو</button>
                  <button className='btn btn-warning' onClick={() => handleDownloadExcel(values)}>خروجی اکسل</button>
                </div>
              </Form>
            }}

          </Formik>
          {/* begin::Header */}
          <div className='flex justify-between items-center m-8'>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted'>
                    {columns.map((item: { title: string }) => {
                      return <th className='min-w-150px'>{item.title}</th>
                    })}

                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {patients?.data?.data?.map((item: IPatient) => (
                    <tr>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.patientCode}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.firstName}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.lastName}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.gender === 1 ? " مرد " : "زن"}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.nationalCode}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.mobile}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.mobile2}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.tel}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.address}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientReportByReferral 