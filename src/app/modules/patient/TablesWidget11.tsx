/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../_cloner/helpers'
import { useGetPatientDocuments, useGetPatients } from './_hooks'
import { IPatient, IPatientDocument } from './_models'
import SubmitReferral from '../../pages/dashboard/SubmitReferral'
import { Link } from 'react-router-dom'
import FuzzySearch from '../../../_cloner/helpers/Fuse'
import SubmitDocument from '../../pages/dashboard/SubmitDocument'

type Props = {
  className: string
  title: string
  columns: any[]
}



const TablesWidget11: React.FC<Props> = ({ className, title, columns }) => {
  const patients = useGetPatientDocuments()
  const [open, setIsOpen] = useState<boolean>(false)
  const [items, setItems] = useState<any>()
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setResults(patients?.data?.data)
  }, [patients?.data?.data])

  const handleOpenModal = (item: IPatientDocument) => {
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
              "documentCode",
              "patient.patientCode",
              "patient.firstName",
              "patient.lastName",
              "document.title",
            ]}
            data={patients?.data?.data}
            setResults={setResults}
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
              {results?.map((item: IPatientDocument) => (
                <tr>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                      {item.documentCode}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                      {item.patient?.patientCode}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                      {item.patient?.firstName}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      {item.patient?.lastName}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      {item.document?.title}
                    </a>
                  </td>
                  <td className='!w-full'>
                    <div className='d-flex gap-x-4 flex-shrink-0 '>
                      <button onClick={() => handleOpenModal(item)} className='!w-full bg-violet-500 px-4 py-2 rounded-md text-white'>
                        <span className='!w-full'>ثبت خدمات ارائه شده</span>
                      </button>
                      <Link to={`/dashboard/patient/${item.patient?.id}/document/${item.document?.id}`}>
                        <button className='bg-green-500 px-4 py-2 rounded-md !w-full'>
                          مراجعات بیمار
                        </button>
                      </Link>
                    </div>
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
      <SubmitReferral item={items} isOpen={open} setIsOpen={setIsOpen} />
      {/* begin::Body */}
    </div>
  )
}

export { TablesWidget11 }
