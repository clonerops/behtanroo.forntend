import { Card } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_cloner/helpers";
import { FC } from "react";

interface IProps {
    icon: React.ReactNode
    title: string
    value: any,
    iconClassName: string
}

const RenderCard: FC<IProps> = ({ title, iconClassName, value, icon }) => {
    return (
        <Card className="px-4 py-4 !shadow-md !rounded-xl bg-gradient-to-r from-gray-200">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="text-xl">{title}</h3>
                    <h1 className="text-3xl font-bold py-2">{value}</h1>
                </div>
                <div
                    className={`flex justify-center items-center ${iconClassName} w-[50px] h-[50px] rounded-lg`}
                >
                    {icon}
                </div>
            </div>
        </Card>

    )
}

const Dashboard = () => {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <RenderCard
                    icon={<img className="!bg-white" src={toAbsoluteUrl('/media/icons/duotune/general/gen009.svg')} />}
                    title="تعداد بیماران ثبت شده"
                    value="35"
                    iconClassName="bg-[#3322D8]"
                />
                <RenderCard
                    icon={<img className="!bg-white" src={toAbsoluteUrl('/media/icons/duotune/general/gen008.svg')} />}
                    title="تعداد پرونده ثبت شده"
                    value="35"
                    iconClassName="bg-[#369BFD]"
                />
                <RenderCard
                    icon={<img className="!bg-white" src={toAbsoluteUrl('/media/icons/duotune/general/gen007.svg')} />}
                    title="تعداد کاربران ثبت شده"
                    value="35"
                    iconClassName="bg-[#F8B30E]"
                />

            </div>
        </>
    );
};

export default Dashboard;
