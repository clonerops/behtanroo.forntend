import FuzzySearch from "../../../_cloner/helpers/Fuse"
import { TablesWidget9 } from "../../modules/patient/TablesWidget9"

const columns = [
    {id: 8, title: "شماره بیمار"},
    {id: 1, title: "نام"},
    {id: 2, title: "نام خانوادگی"},
    {id: 10, title: "جنسیت"},
    {id: 3, title: "کدملی"},
    {id: 4, title: "شماره همراه"},
    {id: 5, title: "شماره همراه ضروری"},
    {id: 6, title: "تلفن منزل"},
    {id: 7, title: "آدرس"},
    {id: 9, title: "عملیات"},
]

const PatientLists = () => {
  return (
    <div>
        <TablesWidget9 className="" title="لیست بیماران" columns={columns} />
    </div>
  )
}

export default PatientLists