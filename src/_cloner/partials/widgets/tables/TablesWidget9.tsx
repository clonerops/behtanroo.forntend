/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

type Props = {
  className: string
  title: string
  columns: any[]
}

const TablesWidget9: React.FC<Props> = ({className, title, columns}) => {
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
              <tr>
                <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        5656256
                      </a>
                </td>
                <td>
                <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        Kevin Leonard
                      </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    RoadGee
                  </a>
                </td>
                <td>
                <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    6660089985
                  </a>
                </td>
                <td>
                <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    6660089985
                  </a>
                </td>
                <td>
                <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    6660089985
                  </a>
                </td>
                <td>
                <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    6660089985
                  </a>
                </td>
                <td>
                <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    6660089985
                  </a>
                </td>
                <td>
                  <div className='d-flex flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
                </td>
              </tr>
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

export {TablesWidget9}
