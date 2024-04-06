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
import MultiDatepicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";

const initialValues = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    mobile2: "",
    tel: "",
    address: "",
    gender: "2",
    birthDate: "",
    job: "",
    education: "",
    representative: "",
    maritalStatus: "2",
    description: "",
};

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    item: IPatient;
    refetch: any;
};

const PatientEdit = (props: Props) => {
    const detailTools = useGetPatient(props?.item?.id || 0);
    const postPatient = usePutPatient();

    const onSubmit = async (values: any) => {
        const formData = {
            ...values,
            birthDate: new Date(values.birthDate)
        }
        console.log(formData)
        postPatient.mutate(formData, {
            onSuccess: (response) => {
                if (response.status === 400) {
                    toast.error(response.data.message);
                } else {
                    toast.success("اطلاعات بیمار با موفقیت ویرایش گردید");
                    props.refetch();
                    props.setIsOpen(false);
                }
            },
        });
    };

    if (detailTools?.isLoading) {
        return <span>درحال بارگزاری</span>;
    }
    return (
        <>
            {postPatient.isLoading && (
                <Backdrop loading={postPatient.isLoading} />
            )}
            <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
                <Formik
                    initialValues={{
                        ...initialValues,
                        ...detailTools?.data,
                    }}
                    onSubmit={onSubmit}
                >
                    {({
                        handleSubmit,
                        getFieldProps,
                        touched,
                        errors,
                        values,
                        setFieldValue,
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
                                <div className="flex flex-col mb-8">
                                    <label className="form-label fs-6 fw-bolder text-dark">
                                        تاریخ تولد
                                    </label>
                                    <MultiDatepicker
                                        {...getFieldProps("birthDate")}
                                        id="birthDate"
                                        name="birthDate"
                                        locale={persian_fa}
                                        calendar={persian}
                                        value={values.birthDate}
                                        onChange={(
                                            date:
                                                | DateObject
                                                | DateObject[]
                                                | null
                                        ) => setFieldValue("birthDate", date)}
                                        render={
                                            <input className="form-control bg-transparent" />
                                        }
                                    />
                                </div>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.job}
                                    errors={errors.job}
                                    name={"job"}
                                    title="شغل"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.education}
                                    errors={errors.education}
                                    name={"education"}
                                    title="تحصیلات"
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.representative}
                                    errors={errors.representative}
                                    name={"representative"}
                                    title="معرف"
                                ></Inputs>
                                <Select
                                    type="text"
                                    login={true}
                                    options={[
                                        { title: "مرد", id: "1" },
                                        { title: "زن", id: "2" },
                                    ]}
                                    getFieldProps={getFieldProps}
                                    touched={touched.gender}
                                    errors={errors.gender}
                                    name={"gender"}
                                    title="جنسیت"
                                ></Select>
                                <Select
                                    type="text"
                                    login={true}
                                    options={[
                                        { title: "مجرد", id: "1" },
                                        { title: "متاهل", id: "2" },
                                    ]}
                                    getFieldProps={getFieldProps}
                                    touched={touched.maritalStatus}
                                    errors={errors.maritalStatus}
                                    name={"maritalStatus"}
                                    title="وضعیت تاهل"
                                ></Select>
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
                                <div className="col-span-2">
                                    {" "}
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
