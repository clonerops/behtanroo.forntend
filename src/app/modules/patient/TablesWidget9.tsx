/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDeletePatient, useDownloadExportExcel, useGetPatients, useGetPatientsByMutation } from './_hooks'
import { IPatient } from './_models'
import FuzzySearch from '../../../_cloner/helpers/Fuse'
import SubmitDocument from '../../pages/dashboard/SubmitDocument'
import Backdrop from '../../../_cloner/helpers/components/Backdrop'
import PatientEdit from '../../pages/dashboard/PatientEdit'
import { toAbsoluteUrl } from '../../../_cloner/helpers'
import moment from 'moment-jalaali'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Modal from '../../../_cloner/helpers/components/Modal'
import RadioGroupActiveOrNot from '../../../_cloner/helpers/components/RadioGroupActiveOrNot'

type Props = {
  className: string
  title: string
  columns: any[]
}

const tooltip1 = (
  <Tooltip id="tooltip">
    <strong>ثبت پرونده</strong>
  </Tooltip>
);
const tooltip2 = (
  <Tooltip id="tooltip">
    <strong>ویرایش</strong>
  </Tooltip>
);
const tooltip3 = (
  <Tooltip id="tooltip">
    <strong>حذف</strong>
  </Tooltip>
);


const TablesWidget9: React.FC<Props> = ({ className, title, columns }) => {
  const patients = useGetPatientsByMutation()
  const downloadExcel = useDownloadExportExcel()
  const deletePatient = useDeletePatient()
  const [open, setIsOpen] = useState<boolean>(false)
  const [editOpen, setIsEditOpen] = useState<boolean>(false)
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const [radioSelect, setRadioSelect] = useState<number>(2)
  const [items, setItems] = useState<any>()
  const [editItems, setEditItems] = useState<any>()
  const [results, setResults] = useState<any[]>([]);


  useEffect(() => {
    patients.mutate(2, {
      onSuccess: (response) => {
        console.log(response)
        setResults(response)
      }
    })
  }, [])

  const handleOpenModal = (item: IPatient) => {
    setItems(item)
    setIsOpen(true)
  }
  const handleEditOpenModal = (item: IPatient) => {
    setEditItems(item)
    setIsEditOpen(true)
  }
  const handleOpenDeleteModal = (item: IPatient) => {
    setItems(item)
    setIsOpenDelete(true)
  }


  const handleDownloadExcel = async () => {
    downloadExcel.mutate()
  }

  const handleDelete = (id: number) => {
    deletePatient.mutate(id, {
      onSuccess: (res) => {
        if(res.success) {
          setIsOpenDelete(false)
        }
      }
    })
  }

  const onChangeRadioSelect = (event: any) => {
    setRadioSelect(event.target.value);

    patients.mutate(event.target.value, {
      onSuccess: (response) => {
        setResults(response)
      }
    })
};

console.log(radioSelect)



  // if (patients.isLoading) {
  //   return <div>درحال بارگزاری ...</div>
  // }

  return (
    <>
      {downloadExcel.isLoading && <Backdrop loading={downloadExcel.isLoading} />}
      {deletePatient.isLoading && <Backdrop loading={deletePatient.isLoading} />}
      {patients.isLoading && <Backdrop loading={patients.isLoading} />}
      <div className={`card ${className}`}>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-4'>
        {/* <div>
              <img 
                src={toAbsoluteUrl('/media/logos/doc14.png')}
                width={400}
                className='rounded-lg'
              />
          </div>
 */}
          <div className='lg:col-span-4'>
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
            <div className="my-4 w-[50%]">
              <RadioGroupActiveOrNot
                  onChange={onChangeRadioSelect}
                  id="patientList"
                  key="patientList"
              />
            </div>

              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bold bg-[#AFD2FA] text-black'>
                      {columns.map((item: { title: string }) => {
                        return <th className='min-w-150px text-center'>{item.title}</th>
                      })}

                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {results?.map((item: IPatient) => (
                      <tr className='odd:bg-[#ECF5FF] text-center p-0'>
                        <td className='!w-[20px] py-0 px-2'>
                          <div className='flex justify-center items-center gap-x-4 flex-shrink-0 '>
                            <OverlayTrigger placement="top" overlay={tooltip1}>
                            <button onClick={() => handleOpenModal(item)} className='bg-violet-500 px-4 py-2 rounded-md text-white'>
                              <img src={toAbsoluteUrl('/media/icons/duotune/art/art001.svg')} width={20} height={20} />
                            </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={tooltip2}>
                              <button onClick={() => handleEditOpenModal(item)} className='bg-yellow-500 px-4 py-2 rounded-md text-white'>
                                <img src={toAbsoluteUrl('/media/icons/duotune/art/art002.svg')} width={20} height={20} />
                              </button>
                              </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={tooltip3}>
                              <button onClick={() => handleOpenDeleteModal(item)} className='bg-red-500 px-4 py-2 rounded-md text-white'>
                                <img src={toAbsoluteUrl('/media/icons/duotune/art/art003.svg')} width={20} height={20} />
                              </button>
                              </OverlayTrigger>
                          </div>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                            {item.patientCode}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                            {item.firstName}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.lastName}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.isDeleted === false ?<span className='text-green-600'>فعال</span> : <span className='text-red-600'>غیرفعال</span>}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.gender === 1 ? " مرد " : "زن"}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.nationalCode}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.mobile}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.mobile2}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.tel}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {moment(item.birthDate).format('jYYYY/jMM/jDD')}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.job}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.education}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.representative}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.maritalStatus == 2 ? " متاهل " : "مجرد"}
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
            <SubmitDocument item={items} isOpen={open} setIsOpen={setIsOpen} />
            <PatientEdit item={editItems} isOpen={editOpen} setIsOpen={setIsEditOpen} />
            <Modal reqular isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
              <div className='flex flex-col justify-center items-center py-16'>
                <p className='font-bold text-red-500 text-lg py-8'>آیا از حذف مطمئن هستید؟</p>
                <div className='flex justify-end items-end gap-4'>
                  <button onClick={() => handleDelete(items.id ? items.id : 0)} className='bg-red-500 px-4 py-2 rounded-md text-white w-max'>
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
      </div>
      </div>
    </>
  )
}

export { TablesWidget9 }
