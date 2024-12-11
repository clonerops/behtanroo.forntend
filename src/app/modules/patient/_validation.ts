import * as Yup from "yup";

const createPatientValidations = Yup.object().shape({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    // nationalCode: Yup.string()
    //     .matches(/^\d{10}$/, "کدملی باید 10 رقم باشد")
    //     .required("کدملی الزامی است"),
    mobile: Yup.string()
        .matches(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد")
        .required("موبایل الزامی است"),
    // tel: Yup.string().required("تلفن منزل الزامی است"),
    address: Yup.string().required("آدرس الزامی است"),
    gender: Yup.string().required("جنسیت الزامی است"),
    birthDate: Yup.string().required("تاریخ تولد الزامی است"),
    job: Yup.string().required("شغل الزامی است"),
    education: Yup.string().required("تحصیلات الزامی است"),
    representative: Yup.string().required("معرف الزامی است"),
    maritalStatus: Yup.string().required("وضعیت تاهل الزامی است"),
});

export { createPatientValidations };
