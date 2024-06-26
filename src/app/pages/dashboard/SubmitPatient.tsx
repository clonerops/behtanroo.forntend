import { Card6 } from "../../../_cloner/partials/content/cards/Card6";
import { Form, Formik } from "formik";
import Inputs from "../../modules/auth/components/Inputs";
import Textarea from "../../modules/auth/components/Textarea";
import { usePostPatient } from "../../modules/patient/_hooks";
import { toAbsoluteUrl } from "../../../_cloner/helpers";
import { toast } from "react-toastify";
import Select from "../../modules/auth/components/Select";
import { createPatientValidations } from "../../modules/patient/_validation";
import Backdrop from "../../../_cloner/helpers/components/Backdrop";
import MultiDatepicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import clsx from "clsx";
import { Spinner } from "react-bootstrap";
import SubmitDocument from "./SubmitDocument";
import { useState } from "react";

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

const SubmitPatient = () => {
    const postPatient = usePostPatient();
    const [open, setIsOpen] = useState<boolean>(false)

    const onSubmit = async (values: any) => {
        const formData = {
            ...values,
            birthDate: new Date(values.birthDate),
        };
        try {
            postPatient.mutate(formData, {
                onSuccess: (response) => {
                    if (response.status === 400) {
                        toast.error(response.data.message);
                    } else {
                        toast.success("بیمار جدید با موفقیت ثبت گردید");
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Card6 image="" title="ثبت اطلاعات بیمار">
                {postPatient?.data?.succeseded &&
                    <div className="pb-8 flex flex-row gap-x-4">
                        <span className="text-2xl font-bold text-gray-500">شماره بیمار: </span>
                        <span className="text-4xl font-bold">{postPatient?.data?.data?.patientCode}</span>
                    </div>
                }
                <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                    <div className="col-span-2">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={createPatientValidations}
                        >
                            {({
                                getFieldProps,
                                touched,
                                errors,
                                values,
                                setFieldValue,
                            }) => {
                                return (
                                    <Form className="grid grid-cols-3 gap-x-8">
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.firstName}
                                            errors={errors.firstName}
                                            name={"firstName"}
                                            title="نام"
                                            isRequired
                                        ></Inputs>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.lastName}
                                            errors={errors.lastName}
                                            name={"lastName"}
                                            title="نام خانوادگی"
                                            isRequired
                                        ></Inputs>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.nationalCode}
                                            errors={errors.nationalCode}
                                            maxLength={10}
                                            name={"nationalCode"}
                                            title="کدملی"
                                            isRequired
                                        ></Inputs>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.mobile}
                                            errors={errors.mobile}
                                            maxLength={11}
                                            name={"mobile"}
                                            title="تلفن همراه"
                                            isRequired
                                        ></Inputs>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.mobile2}
                                            errors={errors.mobile2}
                                            maxLength={11}
                                            name={"mobile2"}
                                            title="تلفن واتساپ"
                                        ></Inputs>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.tel}
                                            errors={errors.tel}
                                            name={"tel"}
                                            maxLength={16}
                                            title="تلفن منزل"
                                            isRequired
                                        ></Inputs>
                                        <div className="flex flex-col mb-8">
                                            <label className="form-label fs-6 fw-bolder text-dark">
                                                تاریخ تولد
                                                <i className="text-red-500">*</i>
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
                                                ) =>
                                                    setFieldValue(
                                                        "birthDate",
                                                        date
                                                    )
                                                }
                                                render={
                                                    <input
                                                        className={clsx(
                                                            "form-control bg-transparent",
                                                            {
                                                                "is-invalid":
                                                                    touched.birthDate &&
                                                                    errors.birthDate,
                                                            },
                                                            {
                                                                "is-valid":
                                                                    touched.birthDate &&
                                                                    !errors.birthDate,
                                                            }
                                                        )}
                                                    />
                                                }
                                            />
                                            {touched.birthDate &&
                                                errors.birthDate && (
                                                    <div className="fv-plugins-message-container">
                                                        <span role="alert">
                                                            {errors.birthDate}
                                                        </span>
                                                    </div>
                                                )}
                                        </div>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.job}
                                            errors={errors.job}
                                            name={"job"}
                                            title="شغل"
                                            isRequired
                                        ></Inputs>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.education}
                                            errors={errors.education}
                                            name={"education"}
                                            title="تحصیلات"
                                            isRequired
                                        ></Inputs>
                                        <Inputs
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.representative}
                                            errors={errors.representative}
                                            name={"representative"}
                                            title="معرف"
                                            isRequired
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
                                        <Textarea
                                            type="text"
                                            login={true}
                                            getFieldProps={getFieldProps}
                                            touched={touched.address}
                                            errors={errors.address}
                                            name={"address"}
                                            title="آدرس"
                                            isRequired
                                        ></Textarea>
                                        <div className="col-span-2">
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

                                        <div className="flex flex-row gap-x-4">
                                            <button
                                                type="submit"
                                                id="kt_sign_in_submit"
                                                className="btn btn-primary"
                                                disabled={postPatient?.data?.succeseded}
                                            >
                                                {postPatient.isLoading ? (
                                                    <span
                                                        className="indicator-progress"
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    >
                                                        درحال پردازش...
                                                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                                    </span>
                                                ) : (
                                                    <span>ثبت اطلاعات</span>
                                                )}
                                            </button>


                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                        {postPatient?.data?.succeseded && 
                                            <button
                                            className="btn btn-warning mt-4"
                                            onClick={() => setIsOpen(true)}
                                            disabled={postPatient.isLoading}
                                        >
                                                <span
                                                    style={{
                                                        display: "block",
                                                    }}
                                                >
                                                    ثبت پرونده
                                                </span>
                                        </button>

}

                    </div>
                    <div>
                        <div className="flex justify-center items-center">
                            <img
                                src={`${toAbsoluteUrl(
                                    "/media/logos/doctor1.webp"
                                )}`}
                                alt="background"
                            />
                        </div>
                    </div>
                </div>
            </Card6>
            <SubmitDocument item={postPatient.data?.data} isOpen={open} setIsOpen={setIsOpen} />

        </div>
    );
};

export default SubmitPatient;
