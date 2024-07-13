import { FC } from "react"
import { useGetDocuments } from "../../../app/modules/patient/_hooks"

interface IProps {
    onChange: any
    id: string
    key: string
}

const RadioGroupPatirntDocument:FC<IProps> = ({onChange, id, key}) => {

  const documents = useGetDocuments()

  return (
    <div key={key} id={id} onChange={onChange} className='nav-group nav-group-fluid'>
      {documents?.data?.data.map((item: any) => {
        return  <label>
        <input type='radio' className='btn-check' name={id} value={item.id}  />
        <span className='btn btn-sm btn-color-muted btn-active btn-active-primary'>{item.title}</span>
      </label>

      })}

      <label>
        <input type='radio' className='btn-check' name={id} value={-1} defaultChecked />
        <span className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'>همه</span>
      </label>
    </div>
  )
}

export default RadioGroupPatirntDocument
