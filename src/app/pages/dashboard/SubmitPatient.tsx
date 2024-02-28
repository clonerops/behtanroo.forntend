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

const SubmitPatient = () => {
    const postPatient = usePostPatient();
    const onSubmit = async (values: any) => {
        try {
            postPatient.mutate(values, {
                onSuccess: (response) => {
                    console.log(response);
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
            {postPatient.isLoading && <Backdrop loading={postPatient.isLoading} />}
            <Card6 image="" title="ثبت اطلاعات بیمار">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                    <div className="col-span-2">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={createPatientValidations}
                        >
                            {({
                                handleSubmit,
                                getFieldProps,
                                touched,
                                errors,
                            }) => {
                                return (
                                    <Form className="grid grid-cols-2 gap-x-8">
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
                                        <Select
                                            type="text"
                                            login={true}
                                            options={[{title: "مرد", id: "1"}, {title: "زن", id: "2"}]}
                                            getFieldProps={getFieldProps}
                                            touched={touched.gender}
                                            errors={errors.gender}
                                            name={"gender"}
                                            title="جنسیت"
                                        ></Select>
                                            <Textarea
                                                type="text"
                                                login={true}
                                                getFieldProps={getFieldProps}
                                                touched={touched.address}
                                                errors={errors.address}
                                                name={"address"}
                                                title="آدرس"
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

                                        <div>
                                            <button
                                                type="submit"
                                                id="kt_sign_in_submit"
                                                className="btn btn-primary"
                                            >
                                                {postPatient.isLoading
                                                    ? "درحال پردازش"
                                                    : "ثبت اطلاعات"}
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
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
        </div>
    );
};

export default SubmitPatient;
