import React from 'react'

type Props = {
    value: any
    title: string
}

const BoxInfo = (props: Props) => {
  return (
    <div className='bg-white py-8 px-16 shadow-md flex flex-col gap-4'>
        <h4 className='font-bold text-xl'>{props.title}</h4>
        <span className='text-lg'>{props.value}</span>
    </div>

  )
}

export default BoxInfo