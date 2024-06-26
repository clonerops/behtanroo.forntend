/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useGetDocuments } from '../patient/_hooks'
import { IPatient } from '../patient/_models'
import { Form, Formik } from 'formik'
import Select from '../auth/components/Select'
import { useDownloadExportExcelPatientReportByReferral, useGetPatientReportByReferral } from './_hooks'
import Inputs from '../auth/components/Inputs'
import Backdrop from '../../../_cloner/helpers/components/Backdrop'
import moment from 'moment-jalaali'
import MultiDatepicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toAbsoluteUrl } from '../../../_cloner/helpers'
import FuzzySearch from '../../../_cloner/helpers/Fuse'

const columns = [
  { id: 8, title: "شماره بیمار" },
  { id: 11, title: "شماره پرونده" },
  { id: 12, title: "نوع پرونده" },
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
  documentId: "0",
  fromCount: "1",
  toCount: "10",
  fromDate: moment(new Date(Date.now())).subtract(10, 'days').format('jYYYY/jMM/jDD'),
  toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD')

}

const PatientReportByReferral = () => {
  const patients = useGetPatientReportByReferral()
  const documents = useGetDocuments()
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setResults(patients?.data?.data)
  }, [patients?.data?.data])
  


  const downloadExcel = useDownloadExportExcelPatientReportByReferral()


  useEffect(() => {
    const formData = {
      documentId: "0",
      fromCount: "1",
      toCount: "10",
      fromDate: moment(new Date(Date.now())).subtract(10, 'days').format('jYYYY/jMM/jDD'),
      toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD')

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
      {patients.isLoading && <Backdrop loading={patients.isLoading} />}
      <div className={`card p-4`}>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-4'>
          <div className='lg:col-span-3'>
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
                    isAll
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
                  <div className='flex flex-col'>
                    <label className="form-label fs-6 fw-bolder text-dark">
                      از تاریخ
                    </label>
                    <MultiDatepicker
                      {...getFieldProps("fromDate")}
                      id="fromDate"
                      name='fromDate'
                      locale={persian_fa}
                      calendar={persian}
                      value={values.fromDate}
                      onChange={(date: DateObject | DateObject[] | null) => setFieldValue('fromDate', date)}
                      render={
                        <input className='form-control bg-transparent' />
                      }
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className="form-label fs-6 fw-bolder text-dark">
                      از تاریخ
                    </label>
                    <MultiDatepicker
                      {...getFieldProps("toDate")}
                      id="toDate"
                      name='toDate'
                      locale={persian_fa}
                      calendar={persian}
                      value={values.toDate}
                      onChange={(date: DateObject | DateObject[] | null) => setFieldValue('toDate', date)}
                      render={
                        <input className='form-control bg-transparent' />
                      }
                    />
                  </div>

                </div>
                <div className='flex justify-between items-center mt-8'>
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
          <div className='my-8 w-[50%] '>
              <FuzzySearch
                keys={[
                  // "documentCode",
                  // "patient.patientCode",
                  // "patient.firstName",
                  // "patient.lastName",
                  "document.title",
                  "patientCode",
                  "documentCode",
                  "firstName",
                  "lastName",
                  "nationalCode",
                  "mobile",
                  "mobile2",
                  "tel",
                  "address",
                ]}
                data={patients?.data?.data}
                setResults={setResults}
              />
            </div>

            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold bg-[#AFD2FA] text-black text-center'>
                    {columns.map((item: { title: string }) => {
                      return <th className='min-w-150px'>{item.title}</th>
                    })}

                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {results?.map((item: any) => (
                  <tr className='odd:bg-[#ECF5FF] p-0 text-center'>
                    <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.patient.patientCode}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.documentCode}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.document.title}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.patient.firstName}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.patient.lastName}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.patient.gender === 1 ? " مرد " : "زن"}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.patient.nationalCode}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.patient.mobile}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.patient.mobile2}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.patient.tel}
                        </a>
                      </td>
                       <td className="p-2">
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.patient.address}
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
          <div>
              <img 
                src={toAbsoluteUrl('/media/logos/doc13.png')}
                width={400}
                className='rounded-lg'
              />
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientReportByReferral 
