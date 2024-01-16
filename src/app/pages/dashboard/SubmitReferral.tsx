import moment from "moment-jalaali";
import Modal from "../../../_cloner/helpers/components/Modal";
import Inputs from "../../modules/auth/components/Inputs";
import Textarea from "../../modules/auth/components/Textarea";
import { IPatient } from "../../modules/patient/_models";
import { Form, Formik } from "formik";
import { usePostReferral } from "../../modules/patient/_hooks";

const initialValues = {
    referralDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    referralReason: "",
    description: "",
};

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    item: IPatient;
};

const SubmitReferral = (props: Props) => {

    const postReferral = usePostReferral()

    const onSubmit = async (values: any) => {
        const formData = {
            ...values,
            patient: props.item.id,
            referralDate: new Date(Date.now())
        }
        try {
            postReferral.mutate(formData, {
                onSuccess: (response) => {
                    props.setIsOpen(false)
                    console.log(response)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <div className="flex flex-row justify-around">
                <div className="flex flex-row m-16">
                        <div className="font-bold text-xl text-gray-500">شماره بیمار: </div>
                        <div className="px-8 font-bold text-2xl">{props?.item?.patientCode}</div>
                </div>
                <div className="flex flex-row m-16">
                        <div className="font-bold text-xl text-gray-500">نام و نام خانوادگی: </div>
                        <div className="px-8 font-bold text-2xl">{props?.item?.firstName} {props?.item?.lastName}</div>
                </div>
                <div className="flex flex-row m-16">
                        <div className="font-bold text-xl text-gray-500">کدملی: </div>
                        <div className="px-8 font-bold text-2xl">{props?.item?.nationalCode}</div>
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
    );
};

export default SubmitReferral;
