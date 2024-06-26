import FuzzySearch from "../../../_cloner/helpers/Fuse"
import { TablesWidget11 } from "../../modules/patient/TablesWidget11"
import { TablesWidget9 } from "../../modules/patient/TablesWidget9"

const columns = [
    {id: 1, title: "شماره پرونده"},
    {id: 2, title: "شماره بیمار"},
    {id: 3, title: "نام بیمار"},
    {id: 4, title: "نام خانوادگی بیمار"},
    {id: 5, title: "نوع پرونده"},
    {id: 5, title: "پزشک معالج"},
    {id: 5, title: ""},
]

const DocumentList = () => {
  return (
    <div>

        <TablesWidget11 className="" title="لیست پرونده ها" columns={columns} />
    </div>
  )
}

export default DocumentList