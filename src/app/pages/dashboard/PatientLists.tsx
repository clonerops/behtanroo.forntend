import FuzzySearch from "../../../_cloner/helpers/Fuse"
import { TablesWidget9 } from "../../modules/patient/TablesWidget9"

const columns = [
    {id: 9, title: "عملیات"},
    {id: 8, title: "شماره بیمار"},
    {id: 1, title: "نام"},
    {id: 2, title: "نام خانوادگی"},
    {id: 2, title: "وضعیت"},
    {id: 10, title: "جنسیت"},
    {id: 3, title: "کدملی"},
    {id: 4, title: "شماره همراه"},
    {id: 5, title: "شماره واتساپ"},
    {id: 6, title: "تلفن منزل"},
    {id: 12, title: "تاریخ تولد"},
    {id: 13, title: "شغل"},
    {id: 14, title: "تحصیلات"},
    {id: 15, title: "معرف"},
    {id: 16, title: "وضعیت تاهل"},
    {id: 7, title: "آدرس"},
]

const PatientLists = () => {
  return (
    <div>
        <TablesWidget9 className="" title="لیست بیماران" columns={columns} />
    </div>
  )
}

export default PatientLists