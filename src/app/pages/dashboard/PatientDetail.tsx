import React from 'react'
import { useGetPatient } from '../../modules/patient/_hooks'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import CardValue from '../../../_cloner/helpers/components/CardValue'
import moment from 'moment-jalaali'


const columns = [
    {id: 8, title: "شماره پرونده"},
    {id: 1, title: "نوع پرونده"},
]
const columnsReferrals = [
    {id: 8, title: "علت مراجعه"},
    {id: 1, title: "تاریخ مراجعه"},
    {id: 2, title: "توضیحات"},
]


const PatientDetail = () => {
    const {id}: any = useParams()
    const patient = useGetPatient(id)

console.log(patient?.data)

if(patient?.isLoading) {
    return <span>درحال بارگزاری اطلاعات ...</span>
}

  return (
    <>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <CardValue title={"شماره بیمار"} value={patient?.data?.patientCode} />
            <CardValue title={"نام و نام خانوادگی"} value={patient?.data?.firstName + " " + patient?.data?.lastName} />
            <CardValue title={"کد ملی"} value={patient?.data?.nationalCode} />
            <CardValue title={"شماره همراه"} value={patient?.data?.mobile} />
            <CardValue title={"شماره همراه ضروری"} value={patient?.data?.mobile2} />
            <CardValue title={"تلفن منزل"} value={patient?.data?.tel} />
            <CardValue title={"جنسیت"} value={patient?.data?.gender === 1 ? "مرد" : "زن"} />
            <div className='lg:col-span-2'>
                <CardValue title={"آدرس"} value={patient?.data?.address} />
            </div>
        </div>
        <Card className='p-4 my-4 '>
        <span className='font-bold text-lg'>پرونده های ثبت شده</span>
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
                {patient?.data?.documents?.map((item: any) => (
                  <tr>
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {item?.PatientDocument?.documentCode}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {item?.title}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* end::Table body */}
            </table>

        </Card>
        <Card className='p-4 my-4 '>
        <span className='font-bold text-lg'>مراجعات بیمار</span>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  {columnsReferrals.map((item: { title: string }) => {
                    return <th className='min-w-150px'>{item.title}</th>
                  })}

                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {patient?.data?.referrals?.map((item: any) => (
                  <tr>
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {item?.referralReason}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {moment(item?.referralDate).format('jYYYY/jMM/jDD')}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {item?.description}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* end::Table body */}
            </table>

        </Card>
    </>
  )
}

export default PatientDetail