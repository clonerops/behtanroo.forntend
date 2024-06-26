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
import AttachDocument from '../../pages/dashboard/AttachDocument'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Modal from '../../../_cloner/helpers/components/Modal'

type Props = {
  className: string
  title: string
  columns: any[]
}

const tooltip1 = (
  <Tooltip id="tooltip">
    <strong>پرینت پرونده</strong>
  </Tooltip>
);
const tooltip2 = (
  <Tooltip id="tooltip">
    <strong>ثبت مراجعات</strong>
  </Tooltip>
);
const tooltip3 = (
  <Tooltip id="tooltip">
    <strong>مراجعات بیمار</strong>
  </Tooltip>
);
const tooltip4 = (
  <Tooltip id="tooltip">
    <strong>حذف</strong>
  </Tooltip>
);
const tooltip5 = (
  <Tooltip id="tooltip">
    <strong>افزودن ضمیمه</strong>
  </Tooltip>
);



const TablesWidget11: React.FC<Props> = ({ className, title, columns }) => {
  const patientDocuments = useGetPatientDocuments()
  const deletePatientDocument = useDeletePatientDocument()
  const [open, setIsOpen] = useState<boolean>(false)
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const [openAttach, setIsOpenAttach] = useState<boolean>(false)
  const [items, setItems] = useState<any>()
  const [results, setResults] = useState<any[]>([]);
  console.log("results", results)

  useEffect(() => {
    setResults(patientDocuments?.data?.data)
  }, [patientDocuments?.data?.data])
  
  const handleOpenModal = (item: IPatientDocument) => {
    setItems(item)
    setIsOpen(true)
  }
  const handleOpenAttachModal = (item: IPatientDocument) => {
    setItems(item)
    setIsOpenAttach(true)
  }
  const handleOpenDeleteModal = (item: IPatientDocument) => {
    setItems(item)
    setIsOpenDelete(true)
  }

  const handleDeletePatientDocument = (patientId: any, documentId: any) => {
    const formData = {
      patientId, 
      documentId
    }
    deletePatientDocument.mutate(formData, {
      onSuccess: (response) => {
        if(response.success) {
          toast.success(response.message);
          patientDocuments.refetch()
          setIsOpenDelete(false)
        }
      }
    })
  }

  if (patientDocuments.isLoading) {
    return <div>درحال بارگزاری ...</div>
  }


  return (
    <>
      {deletePatientDocument.isLoading && <Backdrop loading={deletePatientDocument.isLoading} />}

      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1 !text-green-500'>{title}</span>
          </h3>
          <img src={toAbsoluteUrl('/media/logos/2926635.jpg')} width={100} height={100} />

        </div>

        {/* begin::Header */}
        <div className='m-8 w-[50%] '>
          <FuzzySearch
            keys={[
              "documentCode",
              "patient.patientCode",
              "patient.firstName",
              "patient.lastName",
              "doctor.firstName",
              "doctor.lastName",
              "document.title",
            ]}
            data={patientDocuments?.data?.data}
            setResults={setResults}
          />
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
                <tr className='!w-full fw-bold bg-[#AFD2FA] text-black text-center'>
                  {columns.map((item: { title: string }) => {
                    return <th className='min-w-150px'>{item.title}</th>
                  })}

                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {results?.map((item: IPatientDocument) => (
                  <tr className='text-center'>
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
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                        {item.doctor?.firstName} {item.doctor?.lastName}
                      </a>
                    </td>
                    <td className='!w-full'>
                      <div className='d-flex gap-x-4 flex-shrink-0 items-center '>
                        <OverlayTrigger placement="top" overlay={tooltip1}>
                          <Link to={`/dashboard/${item?.document?.id === 1 ? "midWirfyFormPrint" : item?.document?.id === 2 ? "skinFormPrint" : item?.document?.id === 2 ? "facialFormPrint" : "lazerFormPrint"}/${item.patient?.id}/${item?.document?.id}`} className=''>
                            <button className='bg-indigo-500 px-4 py-2 rounded-md text-white w-max'>
                              <img src={toAbsoluteUrl('/media/logos/print-icon.png')} width={24} height={24} />
                            </button>                        
                          </Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltip2}>
                          <button onClick={() => handleOpenModal(item)} className='bg-violet-500 px-4 py-2 rounded-md text-white w-max'>
                          <img src={toAbsoluteUrl('/media/icons/duotune/art/art005.svg')} width={20} height={20} />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltip3}>
                          <Link to={`/dashboard/patient/${item.patient?.id}/document/${item.document?.id}`}>
                            <button className='bg-green-500 px-4 py-2 rounded-md w-max'>
                            <img src={toAbsoluteUrl('/media/icons/duotune/art/art008.svg')} width={20} height={20} />
                            </button>
                          </Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltip4}>
                          <button onClick={() => handleOpenDeleteModal(item)} className='bg-red-500 px-4 py-2 rounded-md text-white w-max'>
                            <img src={toAbsoluteUrl('/media/icons/duotune/art/art003.svg')} width={20} height={20} />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltip5}>
                          <button onClick={() => handleOpenAttachModal(item)} className='bg-blue-500 px-4 py-2 rounded-md text-white w-max'>
                            <img src={toAbsoluteUrl('/media/icons/duotune/art/art004.svg')} width={20} height={20} />
                          </button>
                        </OverlayTrigger>

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
        <AttachDocument item={items} isOpen={openAttach} setIsOpen={setIsOpenAttach} />
        <Modal reqular isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
              <div className='flex flex-col justify-center items-center py-16'>
                <p className='font-bold text-red-500 text-lg py-8'>آیا از حذف مطمئن هستید؟</p>
                <div className='flex justify-end items-end gap-4'>
                  <button onClick={() => handleDeletePatientDocument(items.patient?.id, items.document?.id)} className='bg-red-500 px-4 py-2 rounded-md text-white w-max'>
                      بله! حذف کن
                  </button>  
                  <button onClick={() => setIsOpenDelete(false)} className='bg-yellow-500 px-4 py-2 rounded-md text-white w-max'>
                      انصراف
                  </button>  
                </div>  
              </div>    
        </Modal>
        {/* begin::Body */}
      </div>
    </>
  )
}

export { TablesWidget11 }
