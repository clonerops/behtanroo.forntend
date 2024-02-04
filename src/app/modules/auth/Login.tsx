import { useFormik } from "formik";
import { toAbsoluteUrl } from "../../../_cloner/helpers";
import Inputs from "./components/Inputs";
import * as Yup from "yup";
import { useState } from "react";
import { loginUser } from "./core/_requests";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";

const Login = () => {
    const loginSchema = Yup.object().shape({
        userName: Yup.string()
            .min(3, "تعداد کاراکتر کمتر از 3 مجاز نمی باشد")
            .max(50, "تعداد کاراکتر بیشتر از 50 مجاز نمی باشد")
            .required("نام کاربری الزامی است"),
        password: Yup.string()
            .min(3, "تعداد کاراکتر کمتر از 3 مجاز نمی باشد")
            .max(50, "تعداد کاراکتر بیشتر از 50 مجاز نمی باشد")
            .required("رمز عبور الزامی است"),
    });

    const initialValues = {
        userName: "",
        password: "",
    };

    const [loading, setLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            const userData = {
                userName: values.userName,
                password: values.password,
            }
            try {
                const auth = await loginUser(userData);
                if(auth.status === 400) {
                    toast.error(auth.data.message)
                    setLoading(false)
                } else {
                    localStorage.setItem("auth", JSON.stringify(auth))
                    Cookies.set("token", `${auth?.token}`);
                    setLoading(false)
                    window.location.reload();
                }
            } catch (error) {
                setStatus("اطلاعات ورود نادرست می باشد");
                setSubmitting(false);
                setLoading(false)
            }
        },
    });

    return (
        <>
            <div className="grid grid-cols-2 h-screen">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex justify-center items-center flex-col"
                >
                        <div className="flex justify-center items-center">
                            <img
                                src={`${toAbsoluteUrl(
                                    "/media/logos/640-logo.png"
                                )}`}
                                alt="background"
                                width={120}
                                height={120}
                            />
                        </div>
                    <div>
                        <label className="text-black text-3xl font-yekan_bold">
                            ورود
                        </label>
                    </div>
                    <div className="w-50">
                        <Inputs
                            type="text"
                            login={true}
                            getFieldProps={formik.getFieldProps}
                            touched={formik.touched.userName}
                            errors={formik.errors.userName}
                            name={"userName"}
                            title="نام کاربری"
                        ></Inputs>
                    </div>
                    <div className="w-50">
                        <Inputs
                            type="password"
                            login={true}
                            getFieldProps={formik.getFieldProps}
                            touched={formik.touched.password}
                            errors={formik.errors.password}
                            name={"password"}
                            title="کلمه عبور"
                        ></Inputs>
                    </div>
                    <div className="d-grid mb-10 w-50">
                        <button
                            type="submit"
                            id="kt_sign_in_submit"
                            className="btn btn-primary"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {!loading && (
                                <span className="indicator-label">ادامه</span>
                            )}
                            {loading && (
                                <span
                                    className="indicator-progress"
                                    style={{ display: "block" }}
                                >
                                    درحال پردازش...
                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
                <div>
                    <div
                        className="h-full w-full bg-cover"
                        style={{
                            backgroundImage: `url(${toAbsoluteUrl(
                                "/media/logos/auth-bg.png"
                            )})`,
                        }}
                    >

                        <div className="flex justify-center items-center">
                            <img
                                src={`${toAbsoluteUrl(
                                    "/media/logos/640-logowhite.png"
                                )}`}
                                alt="background"
                                width={120}
                                height={120}
                            />
                        </div>

                        <div className="flex justify-center items-center">
                            <label className="text-white font-yekan_bold text-2xl my-8">
                                سامانه مدیریت بیماران کلینیک به تن رو      
                            </label>
                        </div>
                        <div className="flex justify-center items-center">
                            <img
                                src={`${toAbsoluteUrl(
                                    "/media/logos/doctor.png"
                                )}`}
                                alt="background"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
