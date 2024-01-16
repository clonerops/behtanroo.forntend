/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTSVG } from '../../../_cloner/helpers'
import { useGetPatients, useGetReferralByPatient } from './_hooks'
import { IPatient, IReferral } from './_models'
import SubmitReferral from '../../pages/dashboard/SubmitReferral'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment-jalaali'

type Props = {
  className: string
  title: string
  columns: any[]
}

const TablesWidget10: React.FC<Props> = ({className, title, columns}) => {
  const {id}: any = useParams()
  const patientsReferrals = useGetReferralByPatient(id)


  if(patientsReferrals.isLoading) {
    return <div>درحال بارگزاری ...</div>
  }

  console.log("patientsReferrals", patientsReferrals?.data)

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>{title}</span>
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
                {columns.map((item: {title: string}) => {
                  return <th className='min-w-150px'>{item.title}</th>
                })}
                
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {patientsReferrals?.data?.referral?.map((item: IReferral) => (
                <tr>
                  <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.referralReason}
                        </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                      {moment(item.referralDate).format('jYYYY/jMM/jDD')}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      {item.description}
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
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget10}
