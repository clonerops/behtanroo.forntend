import { Card7 } from "../../../_cloner/partials/content/cards/Card7";
import { TablesWidget10 } from "../../modules/patient/TablesWidget10";

const columns = [
    {id: 7, title: "علت مراجعه"},
    {id: 8, title: "تاریخ مراجعه"},
    {id: 9, title: "توضیحات"},
]


const Referrals = () => {
    return (
        <>
            <Card7 image="" title="">
                <TablesWidget10 className="" title="مراجعات بیمار" columns={columns} />
            </Card7>
            {/* <Card7 image="" title="">
                <div className="grid grid-cols-3">
                    <div className="flex flex-row m-2">
                            <div className="font-bold text-xl text-gray-500">تاریخ مراجعه: </div>
                            <div className="px-8 font-bold text-2xl">{"547867"}</div>
                    </div>
                    <div className="flex flex-row m-2">
                            <div className="font-bold text-xl text-gray-500">علت مراجعه: </div>
                            <div className="px-8 font-bold text-2xl">{"547867"}</div>
                    </div>
                </div>
                <div className="flex flex-row m-2">
                        <div className="font-bold text-xl text-gray-500">خدمات ارائه شده: </div>
                        <div className="px-8 font-bold text-2xl">{"5dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd47867"}</div>
                </div>
            </Card7>
            <Card7 image="" title="">
                <div className="grid grid-cols-3">
                    <div className="flex flex-row m-2">
                            <div className="font-bold text-xl text-gray-500">تاریخ مراجعه: </div>
                            <div className="px-8 font-bold text-2xl">{"547867"}</div>
                    </div>
                    <div className="flex flex-row m-2">
                            <div className="font-bold text-xl text-gray-500">علت مراجعه: </div>
                            <div className="px-8 font-bold text-2xl">{"547867"}</div>
                    </div>
                </div>
                <div className="flex flex-row m-2">
                        <div className="font-bold text-xl text-gray-500">خدمات ارائه شده: </div>
                        <div className="px-8 font-bold text-2xl">{"5dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd47867"}</div>
                </div>
            </Card7>
            <Card7 image="" title="">
                <div className="grid grid-cols-3">
                    <div className="flex flex-row m-2">
                            <div className="font-bold text-xl text-gray-500">تاریخ مراجعه: </div>
                            <div className="px-8 font-bold text-2xl">{"547867"}</div>
                    </div>
                    <div className="flex flex-row m-2">
                            <div className="font-bold text-xl text-gray-500">علت مراجعه: </div>
                            <div className="px-8 font-bold text-2xl">{"547867"}</div>
                    </div>
                </div>
                <div className="flex flex-row m-2">
                        <div className="font-bold text-xl text-gray-500">خدمات ارائه شده: </div>
                        <div className="px-8 font-bold text-2xl">{"5dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd47867"}</div>
                </div>
            </Card7> */}
        </>
    );
};

export default Referrals;
