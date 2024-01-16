/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'

type Props = {
  image: string
  title: string
  children?: React.ReactNode
}

const Card7: FC<Props> = ({title, children}) => {
  return (
    <div className='card h-100'>
      <div className='card-body d-flex flex-column px-9 pt-6 pb-8'>
        {/* <div className='d-flex align-items-center flex-wrap mb-5 mt-auto fs-6'> */}
        <div className=''>
          {children}
        </div>
      </div>
    </div>
  )
}

export {Card7}
