import * as Yup from "yup";

const createPatientValidations = Yup.object().shape({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    nationalCode: Yup.string()
        .matches(/^\d{10}$/, "کدملی باید 10 رقم باشد")
        .required("کدملی الزامی است"),
    mobile: Yup.string()
        .matches(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد")
        .required("موبایل الزامی است"),
    tel: Yup.string().required("تلفن منزل الزامی است"),
});

export { createPatientValidations };
