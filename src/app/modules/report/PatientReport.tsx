/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useGetDocuments } from '../patient/_hooks'
import { IPatient } from '../patient/_models'
import { Form, Formik } from 'formik'
import Select from '../auth/components/Select'
import MultiDatepicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from 'moment-jalaali'
import { useDownloadExportExcelPatientReport, useGetPatientReport } from './_hooks'
import Backdrop from '../../../_cloner/helpers/components/Backdrop'
import { Link } from 'react-router-dom'
import FuzzySearch from '../../../_cloner/helpers/Fuse'
import { toAbsoluteUrl } from '../../../_cloner/helpers'

const columns = [
  { id: 8, title: "شماره بیمار" },
  { id: 7, title: "جزئیات" },
  { id: 12, title: "شماره پرونده" },
  { id: 11, title: "نوع پرونده" },
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
  fromDate: moment(new Date(Date.now())).subtract(10, 'days').format('jYYYY/jMM/jDD'),
  toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD')
}

const PatientReport = () => {
  const patients = useGetPatientReport()
  const documents = useGetDocuments()
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setResults(patients?.data?.data)
  }, [patients?.data?.data])
  


  const downloadExcel = useDownloadExportExcelPatientReport()


  useEffect(() => {
    const formData = {
      documentId: "0",
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
  console.log(patients?.data?.data)

  return (
    <>
      {patients.isLoading &&<Backdrop loading={patients.isLoading} /> }
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
                    ></Select>
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
                  <div className='flex justify-between items-center'>
                    <button className='btn btn-success' onClick={() => handleSubmit()}>جستجو</button>
                    <button className='btn btn-warning' onClick={() => handleDownloadExcel(values)}>خروجی اکسل</button>
                  </div>
                </Form>
              }}

            </Formik>

            {/* <div className='my-8 w-[50%] '>
            <FuzzySearch
              keys={[
                "patientCode",
                "firstName",
                "lastName",
                "nationalCode",
                "mobile",
              ]}
              data={patients?.data?.data}
              setResults={setResults}
            />
          </div> */}

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
                    {results?.map((item: IPatient) => (
                    <tr className='odd:bg-[#ECF5FF] p-0 text-center'>
                      <td className="p-2">
                          <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                            {item.patientCode}
                          </a>
                        </td>
                        <td className="p-2">
                          <Link to={`/dashboard/patient/${item.id}`} className='text-yellow-500 fw-bold text-hover-primary d-block fs-6'>
                            مشاهده جزئیات
                          </Link>
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
                            {item.firstName}
                          </a>
                        </td>
                        <td className="p-2">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.lastName}
                          </a>
                        </td>
                        <td className="p-2">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.gender === 1 ? " مرد " : "زن"}
                          </a>
                        </td>
                        <td className="p-2">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.nationalCode}
                          </a>
                        </td>
                        <td className="p-2">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.mobile}
                          </a>
                        </td>
                        <td className="p-2">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.mobile2}
                          </a>
                        </td>
                        <td className="p-2">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.tel}
                          </a>
                        </td>
                        <td className="p-2">
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
          <div>
              <img 
                src={toAbsoluteUrl('/media/logos/doctor12.webp')}
                width={400}
                className='rounded-lg'
              />
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientReport 
