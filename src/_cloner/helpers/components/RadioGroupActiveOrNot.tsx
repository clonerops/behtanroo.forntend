import { FC } from "react"

interface IProps {
    onChange: any
    id: string
    key: string
}

const RadioGroupActiveOrNot:FC<IProps> = ({onChange, id, key}) => {
  return (
    <div key={key} id={id} onChange={onChange} className='nav-group nav-group-fluid'>
      <label>
        <input type='radio' className='btn-check' name={id} value={0}  />
        <span className='btn btn-sm btn-color-muted btn-active btn-active-primary'>فعال</span>
      </label>

      <label>
        <input type='radio' className='btn-check' name={id} value={1} />
        <span className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'>غیرفعال</span>
      </label>

      <label>
        <input type='radio' className='btn-check' name={id} value={2} defaultChecked />
        <span className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'>همه</span>
      </label>
    </div>
  )
}

export default RadioGroupActiveOrNot
