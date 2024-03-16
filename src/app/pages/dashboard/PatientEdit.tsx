import moment from "moment-jalaali";
import Modal from "../../../_cloner/helpers/components/Modal";
import Inputs from "../../modules/auth/components/Inputs";
import Textarea from "../../modules/auth/components/Textarea";
import { IPatient } from "../../modules/patient/_models";
import { Form, Formik } from "formik";
import {
    useGetDocuments,
    useGetPatient,
    usePostPatient,
    usePostPatientDocument,
    usePutPatient,
} from "../../modules/patient/_hooks";
import Select from "../../modules/auth/components/Select";
import { toast } from "react-toastify";
import Backdrop from "../../../_cloner/helpers/components/Backdrop";

const initialValues = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    mobile2: "",
    tel: "",
    address: "",
    gender: "2",
    description: "",
};

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    item: IPatient;
    refetch: any
};

const PatientEdit = (props: Props) => {
    
    const detailTools = useGetPatient(props?.item?.id || 0)
    const postPatient = usePutPatient();

    const onSubmit = async (values: any) => {
        postPatient.mutate(values, {
            onSuccess: (response) => {
                if (response.status === 400) {
                    toast.error(response.data.message);
                } else {
                    toast.success("اطلاعات بیمار با موفقیت ویرایش گردید");
                    props.refetch()
                    props.setIsOpen(false)
                }
            },
        });
    };

    if(detailTools?.isLoading) {
       return <span>درحال بارگزاری</span>
    }
    return (
        <>
            {postPatient.isLoading && <Backdrop loading={postPatient.isLoading} />}
            <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
                <Formik
                    initialValues={
                        {
                            ...initialValues,
                            ...detailTools?.data
                        }
                    }
                    onSubmit={onSubmit}
                >
                    {({
                        handleSubmit,
                        getFieldProps,
                        touched,
                        errors,
                    }) => {
                        return (
                            <Form className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 p-8">
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.firstName}
                                    errors={errors.firstName}
                                    name={"firstName"}
                                    title="نام"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.lastName}
                                    errors={errors.lastName}
                                    name={"lastName"}
                                    title="نام خانوادگی"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.nationalCode}
                                    errors={errors.nationalCode}
                                    name={"nationalCode"}
                                    title="کدملی"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.mobile}
                                    errors={errors.mobile}
                                    name={"mobile"}
                                    title="تلفن همراه"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.mobile2}
                                    errors={errors.mobile2}
                                    name={"mobile2"}
                                    title="تلفن همراه ضروری"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.tel}
                                    errors={errors.tel}
                                    name={"tel"}
                                    title="تلفن منزل"
                                ></Inputs>
                                <div className="col-span-2">
                                    <Select
                                        type="text"
                                        login={true}
                                        options={[{ title: "مرد", id: "1" }, { title: "زن", id: "2" }]}
                                        getFieldProps={getFieldProps}
                                        touched={touched.gender}
                                        errors={errors.gender}
                                        name={"gender"}
                                        title="جنسیت"
                                    ></Select>
                                </div>
                                <div className="col-span-2">
                                    <Textarea
                                        type="text"
                                        login={true}
                                        getFieldProps={getFieldProps}
                                        touched={touched.address}
                                        errors={errors.address}
                                        name={"address"}
                                        title="آدرس"
                                    ></Textarea>
                                </div>
                                <div className="col-span-2">                                    <Textarea
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
                                        className="btn bg-yellow-500"
                                    >
                                        {postPatient.isLoading
                                            ? "درحال پردازش"
                                            : "ویرایش اطلاعات"}
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

export default PatientEdit;
