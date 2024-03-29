/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_cloner/helpers'
import { useDeletePatientDocument, useGetPatientDocuments, useGetPatients } from './_hooks'
import { IPatient, IPatientDocument } from './_models'
import SubmitReferral from '../../pages/dashboard/SubmitReferral'
import { Link } from 'react-router-dom'
import FuzzySearch from '../../../_cloner/helpers/Fuse'
import SubmitDocument from '../../pages/dashboard/SubmitDocument'
import { toast } from 'react-toastify'
import Backdrop from '../../../_cloner/helpers/components/Backdrop'

type Props = {
  className: string
  title: string
  columns: any[]
}



const TablesWidget11: React.FC<Props> = ({ className, title, columns }) => {
  const patients = useGetPatientDocuments()
  const deletePatientDocument = useDeletePatientDocument()
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

  const handleDeletePatientDocument = (patientId: any, documentId: any) => {
    const formData = {
      patientId, 
      documentId
    }
    deletePatientDocument.mutate(formData, {
      onSuccess: (response) => {
        patients.refetch()
        toast.success(response.message);
      }
    })
  }

  if (patients.isLoading) {
    return <div>درحال بارگزاری ...</div>
  }


  return (
    <>
    {deletePatientDocument.isLoading && <div>درحال بارگزاری ...</div>}
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
                      <div className='d-flex gap-x-4 flex-shrink-0 items-center '>
                        <Link to={`/dashboard/patientFormPrint/${item.patient?.id}/${item?.document?.id}`} className=''>
                          <img className="!bg-white" src={toAbsoluteUrl('/media/logos/print-icon.png')} width={24} height={24} />
                        </Link>
                        <button onClick={() => handleOpenModal(item)} className='bg-violet-500 px-4 py-2 rounded-md text-white'>
                          <span>ثبت مراجعات</span>
                        </button>
                        <Link to={`/dashboard/patient/${item.patient?.id}/document/${item.document?.id}`}>
                          <button className='bg-green-500 px-4 py-2 rounded-md'>
                            مراجعات بیمار
                          </button>
                        </Link>
                        <button onClick={() => handleDeletePatientDocument(item.patient?.id, item.document?.id)} className='bg-red-500 px-4 py-2 rounded-md text-white'>
                          <span>حذف</span>
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
        <SubmitReferral item={items} isOpen={open} setIsOpen={setIsOpen} />
        {/* begin::Body */}
      </div>
    </>
  )
}

export { TablesWidget11 }
