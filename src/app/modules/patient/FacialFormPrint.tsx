import { useParams } from "react-router-dom";
import { useGetPatientDocumentById } from "./_hooks";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import moment from "moment-jalaali";

const FacialFormPrint = () => {
    const {patientId, documentId}: any = useParams()
    const patientDocument: any = useGetPatientDocumentById(patientId, documentId)
    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printComponentRef.current,
    });

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
            <div className="grid border-b-[1px] border-black last:border-0 grid-cols-8">
                <div className="col-span-6 px-4 py-1">
                    <h3 className="font-bold">{props.title}</h3>
                </div>
                <div className="border-r-[1px] px-4 py-1 flex flex-row gap-x-2 border-black">
                    <h3 className="font-bold">بله</h3>
                    <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
                <div className="border-r-[1px] px-4 py-1 flex flex-row gap-x-2 border-black">
                    <h3 className="font-bold">خیر</h3>
                    <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
            </div>
 )
    }
    const RenderTakingMedication = (props: {title: string}) => {
        return (
                <div className="flex border-r-[1px] border-b-[1px] border-black px-4 py-1">
                    <h3 className="font-bold">{props.title}</h3>
                    <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
 )
    }


    const skinTips = [
        {id: 1, title: "چرب"},
        {id: 2, title: "خشک"},
        {id: 3, title: "نرمال"},
        {id: 4, title: "مختلط"},
        {id: 5, title: "حساس"},
        {id: 6, title: "مستعد یا دارای آکنه"},
    ]
    const usedProducts = [
        {id: 1, title: "ژل شستشوی صورت"},
        {id: 2, title: "صابون"},
        {id: 3, title: "ضدآفتاب"},
        {id: 4, title: "آبرسان"},
        {id: 5, title: "کرم دورچشم"},
        {id: 6, title: "ضدجوش"},
        {id: 7, title: "ضدلک"},
        {id: 8, title: "لایه بردار"},
        {id: 9, title: "اسکراب"},
        {id: 10, title: "ماسک"},
        {id: 11, title: "ماسک خانگی"},
        {id: 12, title: "انواع روغن"},
    ]

    const skinState = [
        {id: 1, title: "خشکی و کشیدگی پوست صورت پس از شستشو"},
        {id: 2, title: "نیاز شدید به کرم مرطوب کننده در طول روز"},
        {id: 3, title: "پوسته پوسته شدن یا خارش پوست مخصوصا در فصل سرد"},
        {id: 4, title: "حساس بودن پوست به هر عامل خارجی"},
        {id: 5, title: "خارش، سوزش یا قرمز شدن پوست پس از استفاده از لوازم آرایش"},
        {id: 6, title: "چرب شدن سریع پوست و برق زدن ناحیه پیشانی"},
        {id: 7, title: "احساس همیشگی چربی روی پوست"},
        {id: 8, title: "منافذ باز پوست و جوش های پوستی، سرسیاه، آکنه و .."},
        {id: 9, title: "احساس خشکی گونه ها و چربی بر روی پیشانی، اطراف بینی و چانه"},
    ]
    const aboutWorriedPatients = [
        {id: 1, title: "خشکی پوست صورت و نیاز به آبرسانی"},
        {id: 2, title: "چروک، تیرگی یا گودی زیر چشم"},
        {id: 3, title: "نیاز به پاکسازی پوست صورت"},
        {id: 4, title: "لکه های پوستی"},
        {id: 5, title: "جوش یا آکنه"},
        {id: 6, title: "منافذباز"},
    ]

    const surveyQuestion = [
        {id: 1, title: "شکستگی عمیق استخوانی یا پالتین"},
        {id: 2, title: "دیابت"},
        {id: 3, title: "انواع پروتز و گوتزهای دندانی و ایمپلنت"},
        {id: 4, title: "سندرم تخمدان پلی کیستیک"},
        {id: 5, title: "اگزما یا پسوریازیس"},
        {id: 14, title: "بارداری و شیردهی"},
        {id: 7, title: "کلوئید(گوشت اضافه)"},
        {id: 6, title: "آلرژی به دارو یا ماده غذایی خاص"},
        {id: 9, title: "بیماری های مغز و اعصاب مانند(صرع، میگرن، ام اس)"},
        {id: 10, title: "شیمی درمانی و رادیوتراپی"},
        {id: 11, title: "مشکلات قلبی و عروقی"},
        {id: 8, title: "سوزش یا التهاب، پس از اصلاح"},
        {id: 12, title: "سابقه تبخال"},
        {id: 13, title: "IUD"},
    ]

    const TakingMedicationList = [
        {id: 1, title: "فشارخون"},
        {id: 2, title: "هورمونی"},
        {id: 3, title: "کورتون"},
        {id: 4, title: "رقیق کننده خون"},
        {id: 5, title: "قلب/آسپرین"},
        {id: 6, title: "راکوتان"},
        {id: 7, title: "اعصاب"},
        {id: 8, title: "هیچکدام"},
    ]
    const ServicesList = [
        {id: 1, title: "هایفوتراپی"},
        {id: 2, title: "پلاژن تراپی"},
        {id: 3, title: "مزوتراپی"},
        {id: 4, title: "میکرونیدلینگ"},
        {id: 5, title: "تزریق بوتاکس"},
        {id: 6, title: "تزریق ژل"},
        {id: 7, title: "لیفت با نخ"},
        {id: 8, title: "برداشتن خال و زگیل"},
    ]

    if(patientDocument.isLoading) {
        return <span>درحال بارگزاری ....</span>
    }


  return (
    <>
        <button className="bg-green-500 text-black px-16 py-2" onClick={handlePrint}>پرینت</button>
        <div ref={printComponentRef} style={{direction: "rtl"}}>
            <h2 className="text-center font-bold text-2xl">فرم رضایت انجام خدمات </h2>
            <span className="font-bold text-lg">تاریخ : .........</span>

            <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="grid grid-cols-4">
                    <RendertextValue title="نام" value={`${patientDocument?.data?.data?.patient?.firstName} `} />
                    <RendertextValue title="نام خانوادگی" value={patientDocument?.data?.data?.patient?.lastName} />
                    <RendertextValue title="تاریخ تولد" value={moment(patientDocument?.data?.data?.patient?.birthDate).format('jYYYY/jMM/jDD')} />
                    <RendertextValue title="شماره پرونده" value={patientDocument?.data?.data?.documentCode} />
                </div>
            </div>
            <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="grid grid-cols-4">
                    <RendertextValue title="شغل" value={patientDocument?.data?.data?.patient?.job} />
                    <RendertextValue title="تحصیلات" value={patientDocument?.data?.data?.patient?.education} />
                    <RendertextValue title="وضعیت تاهل" value={patientDocument?.data?.data?.patient?.maritalStatus == 2 ? " متاهل " : "مجرد"} />
                    <RendertextValue title="معرف" value={patientDocument?.data?.data?.patient?.representative} />
                </div>
            </div>
            <div className="border-[1px] border-b-0 border-black">
                <div className="grid grid-cols-4 ">
                    <div className="col-span-3 border-l-[1px] border-black px-4 py-1">
                        <RendertextValue title="نشانی" value={patientDocument?.data?.data?.patient?.address} />
                    </div>
                    <div className="flex gap-y-2 flex-col px-4 py-1">
                        <RendertextValue title="تلفن همراه" value={patientDocument?.data?.data?.patient?.mobile} />
                        <RendertextValue title="تلفن منزل" value={patientDocument?.data?.data?.patient?.tel} />
                        <RendertextValue title="شماره واتساپ" value={patientDocument?.data?.data?.patient?.mobile2} />
                    </div>
                </div>
            </div>

            <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="grid grid-cols-1">
                    <span className="font-bold">لطفا تیپ پوستی خود را مشخص نمائید.</span>
                </div>
            </div>
            <div className="border-t-[1px] border-l-[1px] border-black grid grid-cols-3">
                {skinTips.map((item) => 
                    <RenderTakingMedication title={item.title} />
                )}
            </div>
            <div className="border-[1px] border-b-0 border-t-0 px-4 py-1 border-black">
                <div className="grid grid-cols-1">
                    <span className="font-bold">کدام یک از محصولات زیر را به صورت مرتب مصرف می کنید؟</span>
                </div>
            </div>
            <div className="border-t-[1px] border-l-[1px] border-black grid grid-cols-4">
                {usedProducts.map((item) => 
                    <RenderTakingMedication title={item.title} />
                )}
            </div>
            <div className="border-[1px] border-b-0 border-t-0 px-4 py-1 border-black">
                <div className="grid grid-cols-1">
                    <span className="font-bold">کدام یک از حاالت زیر را روی پوست صورت خود تجربه کرده اید؟</span>
                </div>
            </div>
            <div className="border-t-[1px] border-l-[1px] border-black">
                {skinState.map((item) => 
                    <RenderTakingMedication title={item.title} />
                )}
            </div>
            <div className="border-[1px] border-b-0 border-t-0 px-4 py-1 border-black">
                <div className="grid grid-cols-1">
                    <span className="font-bold">کدام یک از موارد زیر نگرانی اصلی شما در مورد پوست صورتتان است؟</span>
                </div>
            </div>
            <div className="border-t-[1px] border-l-[1px] border-black grid grid-cols-2">
                {aboutWorriedPatients.map((item) => 
                    <RenderTakingMedication title={item.title} />
                )}
            </div>
            <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="grid grid-cols-1">
                    <span className="font-bold">در صورت مبتلا بودن به هریک از بیماری های زیر مشخص کنید</span>
                </div>
            </div>
            <div className="border-[1px] border-black">
                {surveyQuestion.map((item) => 
                    <RenderSurvey title={item.title} />
                )}
            </div>
            <div className="px-4 py-1">
                <div className="grid grid-cols-1">
                    <span className="font-bold">کدام یک از داروهای زیر را مصرف می کنید؟</span>
                </div>
            </div>
            <div className="border-t-[1px] border-l-[1px] border-black grid grid-cols-4">
                {TakingMedicationList.map((item) => 
                    <RenderTakingMedication title={item.title} />
                )}
            </div>
            <div className="px-4 py-1">
                <div className="grid grid-cols-1">
                    <span className="font-bold">متقاضی کدام یک از موارد زیر هستید؟</span>
                </div>
            </div>
            <div className="border-t-[1px] border-l-[1px] border-black grid grid-cols-4">
                {ServicesList.map((item) => 
                    <RenderTakingMedication title={item.title} />
                )}
            </div>
            <div className="grid grid-cols-1 mt-4">
                <p>اینجانب صحت اطالعات درج شده را تایید نموده و همچنین تایید میکنم که در خصوص موارد منع استفاده ، روند درمان ،
                    عواقب احتمالی ،پیگیریهای آینده درمان ، مزایا و معایب و روشهای موجود کامال مطلع شده و نحوه انجام نیز مورد تایید
                    اینحانب میباشد. بدین وسیله عوارض احتمالی در زمان طول درمان را نیز پذیرفته و از ایشان اعالم برائت میکنم. اطالعات
                    این فرم محرمانه تلقی گردیده و اینجانب موافقت خود را با نگهداری این اطالعات جهت درج در سوابق این مرکز و
                    پیگیریهای بعدی ، اعالم مینمایم.
                </p>
            </div>
            <div className="flex justify-around items-center mt-4">
                <div>
                    <span className="font-bold">نام و نام خانوادگی</span>
                </div>
                <div>
                    <span className="font-bold">تاریخ</span>
                </div>
                <div>
                    <span className="font-bold">امضا متقاضی</span>
                </div>
            </div>
            {/* <br />
            <div className="mt-16">
                <table className="!w-full !border-[1px] !border-black">
                    <thead>
                        <tr>
                            <th className="!border-[1px] !border-black text-center !font-bold py-4">تاریخ</th>
                            <th className="!border-[1px] !border-black text-center !font-bold py-4">وضعیت پوست</th>
                            <th className="!border-[1px] !border-black text-center !font-bold py-4">اقدامات انجام شده</th>
                            <th className="!border-[1px] !border-black text-center !font-bold py-4">اتوصیه های لازم</th>
                            <th className="!border-[1px] !border-black text-center !font-bold py-4">تاریخ مراجعه بعدی</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr className="!border-[1px] !border-black">
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td></td>
                    </tr> 
                    <tr className="!border-[1px] !border-black">
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td></td>
                    </tr> 
                    <tr className="!border-[1px] !border-black">
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td></td>
                    </tr> 
                    <tr className="!border-[1px] !border-black">
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td></td>
                    </tr> 
                    <tr className="!border-[1px] !border-black">
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td></td>
                    </tr> 
                    <tr className="!border-[1px] !border-black">
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td className="border-l-[1px] border-black py-12"></td>
                        <td></td>
                    </tr> 
                    </tbody>
                </table>
            </div> */}
        </div>
    </>
  )
}

export default FacialFormPrint