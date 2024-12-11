import { Form, Formik } from "formik";
import Inputs from "../../modules/auth/components/Inputs";
import Textarea from "../../modules/auth/components/Textarea";
import { useDeleteDoctor, useGetDoctors, usePostDoctor } from "../../modules/patient/_hooks";
import { toast } from "react-toastify";
import { IDoctor } from "../../modules/patient/_models";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_cloner/helpers";
import { useState } from "react";
import Modal from "../../../_cloner/helpers/components/Modal";
import DoctorEdit from "./DoctorEdit";
const initialValues = {
    firstName: "",
    lastName: "",
    mobile: "",
    description: "",
};

const columns = [
    {id: 9, title: "عملیات"},
    {id: 1, title: "نام"},
    {id: 2, title: "نام خانوادگی"},
    {id: 4, title: "شماره همراه"},
    {id: 3, title: "توضیحات"},
]

const tooltip2 = (
    <Tooltip id="tooltip">
      <strong>ویرایش</strong>
    </Tooltip>
  );
  

const DoctorManagment = () => {
    const postDoctor = usePostDoctor()
    const doctorsTools = useGetDoctors()
    const deleteDoctor = useDeleteDoctor()

    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
    const [items, setItems] = useState<any>()
    const [editOpen, setIsEditOpen] = useState<boolean>(false)
    const [editItems, setEditItems] = useState<any>()

    const handleEditOpenModal = (item: IDoctor) => {
      setEditItems(item)
      setIsEditOpen(true)
    }
  

      const handleDelete = (id: number) => {
        deleteDoctor.mutate(id, {
          onSuccess: (res) => {
            if(res.success) {
            doctorsTools.refetch()
              setIsOpenDelete(false)
            }
          }
        })
      }
    

    const onSubmit = async (values: any) => {
        try {
            postDoctor.mutate(values, {
                onSuccess: (response) => {
                    if (response.status === 400) {
                        toast.error(response.data.message);
                    } else {
                        toast.success("پزشک جدید با موفقیت ثبت گردید");
                        doctorsTools.refetch()
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({
                    getFieldProps,
                    touched,
                    errors,
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

                            <div className="flex flex-row gap-x-4">
                                <button
                                    type="submit"
                                    id="kt_sign_in_submit"
                                    className="btn btn-primary"
                                    disabled={postDoctor?.data?.succeseded}
                                >
                                    {postDoctor.isLoading ? (
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

            <div className='card-body py-3'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bold bg-[#AFD2FA] text-black'>
                      {columns.map((item: { title: string }) => {
                        return <th className='min-w-150px text-center'>{item.title}</th>
                      })}

                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {doctorsTools?.data?.map((item: IDoctor) => (
                      <tr className='odd:bg-[#ECF5FF] text-center p-0'>
                        <td className='!w-[20px] py-0 px-2'>
                          <div className='flex justify-center items-center gap-x-4 flex-shrink-0 '>
                              <OverlayTrigger placement="top" overlay={tooltip2}>
                              <button onClick={() => handleEditOpenModal(item)} className='bg-yellow-500 px-4 py-2 rounded-md text-white'>
                                <img src={toAbsoluteUrl('/media/icons/duotune/art/art002.svg')} width={20} height={20} />
                              </button>
                              </OverlayTrigger>
                          </div>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                            {item.firstName}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.lastName}
                          </a>
                        </td>
                        <td className="p-0">
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.mobile}
                          </a>
                        </td>
                        <td>
                          <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {item.description}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>
              {/* end::Table container */}
            </div>
            <Modal reqular isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
              <div className='flex flex-col justify-center items-center py-16'>
                <p className='font-bold text-red-500 text-lg py-8'>آیا از حذف مطمئن هستید؟</p>
                <div className='flex justify-end items-end gap-4'>
                  <button onClick={() => handleDelete(items.id ? items.id : 0)} className='bg-red-500 px-4 py-2 rounded-md text-white w-max'>
                      بله! حذف کن
                  </button>  
                  <button onClick={() => setIsOpenDelete(false)} className='bg-yellow-500 px-4 py-2 rounded-md text-white w-max'>
                      انصراف
                  </button>  
                </div>  
              </div>    
            </Modal>
            <DoctorEdit item={editItems} isOpen={editOpen} setIsOpen={setIsEditOpen} refetch={doctorsTools.refetch} />

        </div>
    );
};

export default DoctorManagment;
