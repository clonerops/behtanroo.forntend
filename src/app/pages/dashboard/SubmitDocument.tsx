import moment from "moment-jalaali";
import Modal from "../../../_cloner/helpers/components/Modal";
import Inputs from "../../modules/auth/components/Inputs";
import Textarea from "../../modules/auth/components/Textarea";
import { IPatient } from "../../modules/patient/_models";
import { Form, Formik } from "formik";
import {
    useGetDoctors,
    useGetDocuments,
    usePostPatientDocument,
} from "../../modules/patient/_hooks";
import Select from "../../modules/auth/components/Select";
import { toast } from "react-toastify";
import Backdrop from "../../../_cloner/helpers/components/Backdrop";
import SelectDoctor from "../../modules/auth/components/SelectDoctor";

const initialValues = {
    createdAt: moment(new Date(Date.now())).format("jYYYY/jMM/jDD"),
    documentId: "1",
    doctorId:"1",
    description: "",
};

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    item: IPatient;
};

const SubmitDocument = (props: Props) => {
    const documents = useGetDocuments();
    const doctors = useGetDoctors();
    const patientDocument = usePostPatientDocument();
    const onSubmit = async (values: any) => {
        const formData = {
            patientId: props.item.id ? +props.item.id : 0,
            documentId: +values.documentId,
            doctorId: +values.doctorId,
            description: values.description,
        };
        patientDocument.mutate(formData, {
            onSuccess: (response) => {
                console.log(response)
                if (response.status === 400) {
                    toast.error(response.data.message);
                } else if(response.status === 500) {
                    toast.error("پرونده قبلا ایجاد شده است");
                } else {
                    toast.success("پرونده جدید با موفقیت ثبت گردید");
                }
            },
        });
    };
    return (
        <>
            {patientDocument.isLoading && <Backdrop loading={patientDocument.isLoading} />}
            <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full overflow-hidden">
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                        <div className="font-bold text-xl text-gray-500">
                            شماره بیمار:{" "}
                        </div>
                        <div className="px-8 font-bold text-2xl">
                            {props?.item?.patientCode}
                        </div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                        <div className="font-bold text-xl text-gray-500">
                            نام و نام خانوادگی:{" "}
                        </div>
                        <div className="px-8 font-bold text-2xl">
                            {props?.item?.firstName} {props?.item?.lastName}
                        </div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                        <div className="font-bold text-xl text-gray-500">
                            کدملی:{" "}
                        </div>
                        <div className="px-8 font-bold text-2xl">
                            {props?.item?.nationalCode}
                        </div>
                    </div>
                    {patientDocument?.data?.success &&
                        <div className="flex flex-row lg:mx-16 lg:mt-2 lg:mb-2">
                            <div className="font-bold text-xl text-gray-500">
                                شماره پرونده ثبت شده:{" "}
                            </div>
                            <div className="px-8 font-bold text-2xl">
                                {patientDocument?.data?.data?.documentCode}
                            </div>
                        </div>
                    }
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ getFieldProps, touched, errors }) => {
                        return (
                            <Form className="grid grid-cols-3 gap-x-8 mx-16 my-8">
                                <Select
                                    type="text"
                                    login={true}
                                    options={documents?.data?.data}
                                    getFieldProps={getFieldProps}
                                    touched={touched.documentId}
                                    errors={errors.documentId}
                                    name={"documentId"}
                                    title="نوع پرونده"
                                ></Select>
                                <SelectDoctor
                                    type="text"
                                    login={true}
                                    options={doctors?.data}
                                    getFieldProps={getFieldProps}
                                    touched={touched.doctorId}
                                    errors={errors.doctorId}
                                    name={"doctorId"}
                                    title="پزشک معالج"
                                ></SelectDoctor>

                                <Inputs
                                    type="text"
                                    login={true}
                                    name={"createdAt"}
                                    getFieldProps={getFieldProps}
                                    disabled
                                    title="تاریخ ایجاد پرونده"
                                ></Inputs>
                                <div className="col-span-3">
                                    <Textarea
                                        type="text"
                                        login={true}
                                        getFieldProps={getFieldProps}
                                        touched={touched.description}
                                        errors={errors.description}
                                        name={"description"}
                                        title="توضیحات"
                                    ></Textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        id="kt_sign_in_submit"
                                        className="btn btn-primary"
                                    >
                                        ثبت اطلاعات
                                        {/* {postReferral.isLoading ? "درحال پردازش" : "ثبت اطلاعات"} */}
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

export default SubmitDocument;
