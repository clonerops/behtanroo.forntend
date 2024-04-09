const SkinForm = () => {

    const RendertextValue = (props: {title: string, value: any}) => {
        return (
            <div className="flex items-center gap-x-2">
                <h4 className="font-bold">{props.title}: </h4>
                <span>{props.value}</span>
            </div>
        )
    }
    const RenderSurvey = (props: {title: string}) => {
        return (
            <div className="grid grid-cols-8">
                <div className="col-span-6 p-4">
                    <h3 className="font-bold">{props.title}</h3>
                </div>
                <div className="border-r-[1px] p-4 flex flex-row gap-x-2 border-black">
                    <h3 className="font-bold">بله</h3>
                    <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
                <div className="border-r-[1px] p-4 flex flex-row gap-x-2 border-black">
                    <h3 className="font-bold">خیر</h3>
                    <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
            </div>
 )
    }


    const surveyQuestion = [
        {id: 1, title: ""}
    ]

  return (
    <>
        <div>
            <h2 className="text-center font-bold text-2xl">فرم رضایت انجام خدمات </h2>
            <span className="font-bold text-lg">تاریخ : .........</span>

            <div className="border-[1px] border-b-0 p-4 border-black">
                <div className="grid grid-cols-4">
                    <RendertextValue title="نام" value={"ابوالفضل"} />
                    <RendertextValue title="نام خانوادگی" value={"معصومی"} />
                    <RendertextValue title="تاریخ تولد" value={"1374/18/09"} />
                    <RendertextValue title="شماره پرونده" value={"1002"} />
                </div>
            </div>
            <div className="border-[1px] border-b-0 p-4 border-black">
                <div className="grid grid-cols-4">
                    <RendertextValue title="شغل" value={"کارمند"} />
                    <RendertextValue title="تحصیلات" value={"لیسانس"} />
                    <RendertextValue title="وضعیت تاهل" value={"مجرد"} />
                    <RendertextValue title="معرف" value={"ندارد"} />
                </div>
            </div>
            <div className="border-[1px] border-b-0 border-black">
                <div className="grid grid-cols-4 ">
                    <div className="col-span-3 border-l-[1px] border-black p-4">
                        <RendertextValue title="شغل" value={"کارمند"} />
                    </div>
                    <div className="flex gap-y-2 flex-col p-4">
                        <RendertextValue title="تلفن همراه" value={"09217767345"} />
                        <RendertextValue title="تلفن منزل" value={"02156766117"} />
                        <RendertextValue title="شماره واتساپ" value={"09217767345"} />
                    </div>
                </div>
            </div>

            <div className="border-[1px] border-b-0 p-4 border-black">
                <div className="grid grid-cols-1">
                    <span className="font-bold">در صورت مبتلا بودن به هریک از بیماری های زیر مشخص کنید</span>
                </div>
            </div>
            <div className="border-[1px] border-black">
                <RenderSurvey title="هموفیلی" />
            </div>

        </div>
    </>
  )
}

export default SkinForm