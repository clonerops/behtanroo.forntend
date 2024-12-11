import Modal from "../../../_cloner/helpers/components/Modal";
import Inputs from "../../modules/auth/components/Inputs";
import Textarea from "../../modules/auth/components/Textarea";
import { IDoctor, IPatient } from "../../modules/patient/_models";
import { Form, Formik } from "formik";
import {
    useGetDoctor,
    useGetDocuments,
    useGetPatient,
    usePostPatient,
    usePostPatientDocument,
    usePutDoctor,
    usePutPatient,
} from "../../modules/patient/_hooks";
import Select from "../../modules/auth/components/Select";
import { toast } from "react-toastify";
import Backdrop from "../../../_cloner/helpers/components/Backdrop";
import MultiDatepicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import { useEffect } from "react";

const initialValues = {
    firstName: "",
    lastName: "",
    mobile: "",
    description: "",
};

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    item: IDoctor;
    refetch: any;
};

const DoctorEdit = (props: Props) => {
    // const detailTools = useGetDoctor(props?.item?.id || 0);
    const detailTools = useGetDoctor();
    const postDoctor = usePutDoctor();

    useEffect(() => {
        if(props.isOpen) {
            detailTools.mutate(props?.item?.id || 0)
        } else {
            return;
        }
    }, [props.isOpen])


    const onSubmit = async (values: any) => {
        const formData = {
            ...values,
        };
        postDoctor.mutate(formData, {
            onSuccess: (response) => {
                if (response.status === 400) {
                    toast.error(response.data.message);
                } else {
                    toast.success("اطلاعات پزشک با موفقیت ویرایش گردید");
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
            {postDoctor.isLoading && (
                <Backdrop loading={postDoctor.isLoading} />
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
                                    title="نام پزشک"
                                    isRequired
                                ></Inputs>
                                <Inputs
                                    type="text"
                                    login={true}
                                    getFieldProps={getFieldProps}
                                    touched={touched.lastName}
                                    errors={errors.lastName}
                                    name={"lastName"}
                                    title="نام خانوادگی پزشک"
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
                                    title="موبایل"
                                    isRequired
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
                                        className="btn bg-yellow-500"
                                    >
                                        {postDoctor.isLoading
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

export default DoctorEdit;
