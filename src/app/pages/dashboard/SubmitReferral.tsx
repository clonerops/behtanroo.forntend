import moment from "moment-jalaali";
import Modal from "../../../_cloner/helpers/components/Modal";
import Inputs from "../../modules/auth/components/Inputs";
import Textarea from "../../modules/auth/components/Textarea";
import { IPatient, IPatientDocument } from "../../modules/patient/_models";
import { Form, Formik } from "formik";
import { usePostReferral } from "../../modules/patient/_hooks";
import { toast } from "react-toastify";
import Backdrop from "../../../_cloner/helpers/components/Backdrop";

const initialValues = {
    referralDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    referralReason: "",
    description: "",
};

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    item: IPatientDocument;
};

const SubmitReferral = (props: Props) => {

    const postReferral = usePostReferral()

    const onSubmit = async (values: any) => {
        const formData = {
            ...values,
            patientId: props.item.patient?.id,
            documentId: props.item.document?.id,
            referralDate: new Date(Date.now())
        }
        try {
            postReferral.mutate(formData, {
                onSuccess: (response) => {
                    if(response.status === 400) {
                        toast.error(response.data.message)
                    } else {
                        toast.success("ثبت اطلاعات موفقیت امیز بود")
                        props.setIsOpen(false)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    console.log("props?.item?.patient", props?.item?.patient)

    return (
        <>
            {postReferral.isLoading && <Backdrop loading={postReferral.isLoading} />}
            <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full overflow-hidden">
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">شماره بیمار: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.patientCode}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">نام و نام خانوادگی: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.firstName} {props?.item?.patient?.lastName}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">کدملی: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.nationalCode}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">نوع پرونده: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.document?.title}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">شماره پرونده: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.documentCode}</div>
                    </div>
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ getFieldProps, touched, errors }) => {
                        return (
                            <Form className="grid grid-cols-2 gap-x-8 mx-16 my-8">
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.referralReason}
                                    errors={errors.referralReason}
                                    name={"referralReason"}
                                    title="علت مراجعه"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.referralDate}
                                    errors={errors.referralDate}
                                    name={"referralDate"}
                                    disabled
                                    title="تاریخ مراجعه"
                                ></Inputs>
                                <div className="col-span-2">
                                    <Textarea
                                        type="text"
                                        login={true}
                                        getFieldProps={getFieldProps}
                                        touched={touched.description}
                                        errors={errors.description}
                                        name={"description"}
                                        title="خدمات ارائه شده"
                                    ></Textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        id="kt_sign_in_submit"
                                        className="btn btn-primary"
                                    >
                                        {postReferral.isLoading ? "درحال پردازش" : "ثبت اطلاعات"}
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
};

export default SubmitReferral;
