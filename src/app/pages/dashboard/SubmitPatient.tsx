import React from 'react'
import { Card5 } from '../../../_cloner/partials/content/cards/Card5'
import { Card6 } from '../../../_cloner/partials/content/cards/Card6'
import { Form, Formik } from 'formik'
import Inputs from '../../modules/auth/components/Inputs'
import Textarea from '../../modules/auth/components/Textarea'
import { usePostPatient } from '../../modules/patient/_hooks'

const initialValues = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    mobile2: "",
    tel: "",
    address: "",
}

const SubmitPatient = () => {
    const postPatient = usePostPatient()
    const onSubmit = async (values: any) => {
        try {
            postPatient.mutate(values, {
                onSuccess: (response) => {
                    console.log(response)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>
        <Card6 image='' title='ثبت اطلاعات بیمار'>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({handleSubmit, getFieldProps, touched, errors}) => {
                    return <Form className='grid grid-cols-2 gap-x-8'>
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
                        <div className='col-span-2'>
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

                        <div>
                        <button
                            type="submit"
                            id="kt_sign_in_submit"
                            className="btn btn-primary"
                        >
                            {postPatient.isLoading ? "درحال پردازش" : "ثبت اطلاعات"}
                        </button>
                        </div>
                    </Form>
                }}
            </Formik>
        </Card6>
    </div>
  )
}

export default SubmitPatient