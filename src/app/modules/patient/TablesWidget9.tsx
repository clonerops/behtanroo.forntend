/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import {  toAbsoluteUrl } from '../../../_cloner/helpers'
import { useDownloadExportExcel, useGetPatients } from './_hooks'
import { IPatient } from './_models'
import { Link } from 'react-router-dom'
import FuzzySearch from '../../../_cloner/helpers/Fuse'
import SubmitDocument from '../../pages/dashboard/SubmitDocument'
import { downloadExcelPatiets } from './_requests'
import { DownloadExeclFile } from '../../../_cloner/helpers/DownloadFiles'

type Props = {
  className: string
  title: string
  columns: any[]
}



const TablesWidget9: React.FC<Props> = ({ className, title, columns }) => {
  const patients = useGetPatients()
  const downloadExcel = useDownloadExportExcel()
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

  const handleDownloadExcel = async () => {
    downloadExcel.mutate()
  }

  if (patients.isLoading) {
    return <div>درحال بارگزاری ...</div>
  }

  return (
    <div className={`card ${className}`}>

      {/* begin::Header */}
      <div className='flex justify-between items-center m-8'>
      <div className='w-[50%] '>
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
          />
        </div>
        <div>
          <button onClick={handleDownloadExcel} className='bg-green-500 px-8 py-4 text-white rounded-md'>
            {downloadExcel.isLoading ? "درحال بارگزاری ..." : "خروجی اکسل"}
          </button>
        </div>

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
                        <img className="!bg-white" src={toAbsoluteUrl('/media/logos/print-icon.png')} width={42} height={42} />
                      </Link>
                      <button onClick={() => handleOpenModal(item)} className='!w-full bg-violet-500 px-4 py-2 rounded-md text-white'>
                        <span className='!w-full'>ایجاد پرونده</span>
                      </button>
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
      <SubmitDocument item={items} isOpen={open} setIsOpen={setIsOpen} />
      {/* begin::Body */}
    </div>
  )
}

export { TablesWidget9 }
