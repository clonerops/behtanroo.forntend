/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_cloner/helpers'
import { useGetPatients } from './_hooks'
import { IPatient } from './_models'
import SubmitReferral from '../../pages/dashboard/SubmitReferral'
import { Link } from 'react-router-dom'
import FuzzySearch from '../../../_cloner/helpers/Fuse'
import SubmitDocument from '../../pages/dashboard/SubmitDocument'
import { useReactToPrint } from 'react-to-print'
import PatientFormPrint from '../../pages/dashboard/PatientFormPrint'

type Props = {
  className: string
  title: string
  columns: any[]
}



const TablesWidget9: React.FC<Props> = ({ className, title, columns }) => {
  const patients = useGetPatients()
  const [open, setIsOpen] = useState<boolean>(false)
  const [items, setItems] = useState<any>()
  const [results, setResults] = useState<any[]>([]);


  useEffect(() => {
    setResults(patients?.data)
  }, [patients?.data])

  const handleOpenModal = (item: IPatient) => {
    setItems(item)
    setIsOpen(true)
  }

  if (patients.isLoading) {
    return <div>درحال بارگزاری ...</div>
  }

  return (
    <div className={`card ${className}`}>

      {/* begin::Header */}
        <div className='m-8 w-[50%] '>
          <FuzzySearch
            keys={[
              "patientCode",
              "firstName",
              "lastName",
              "nationalCode",
              "mobile",
              "mobile2",
              "tel",
              "address",
            ]}
            data={patients.data}
            setResults={setResults}
            threshold={0.5}
          />
        </div>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1 !text-green-500'>{title}</span>
        </h3>
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
              {results?.map((item: IPatient) => (
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
                  <td className='!w-full'>
                    <div className='flex justify-center items-center gap-x-4 flex-shrink-0 '>
                      <Link to={`/dashboard/patientFormPrint/${item.id}`} className=''>
                      <img className="!bg-white" src={toAbsoluteUrl('/media/icons/duotune/general/gen008.svg')} />
                      </Link>
                      <button onClick={() => handleOpenModal(item)} className='!w-full bg-violet-500 px-4 py-2 rounded-md text-white'>
                        <span className='!w-full'>ایجاد پرونده</span>
                      </button>
                    </div>
                  </td>
                  {/* <td className='!w-full'>
                    <div className='d-flex gap-x-4 flex-shrink-0 '>
                      <button onClick={() => handleOpenModal(item)} className='!w-full bg-violet-500 px-4 py-2 rounded-md text-white'>
                        <span className='!w-full'>ثبت خدمات ارائه شده</span>
                      </button>
                      <Link to={`/dashboard/patient/${item.id}/referrals`}>
                        <button className='bg-green-500 px-4 py-2 rounded-md !w-full'>
                          مراجعات بیمار
                        </button>
                      </Link>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      <SubmitDocument item={items} isOpen={open} setIsOpen={setIsOpen} />
      {/* begin::Body */}
      <div style={{display: "none"}}>
        <PatientFormPrint />
      </div>
    </div>
  )
}

export { TablesWidget9 }
