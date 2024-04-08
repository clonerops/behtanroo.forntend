import moment from "moment-jalaali";
import Modal from "../../../_cloner/helpers/components/Modal";
import { IPatientDocument } from "../../modules/patient/_models";
import { Form, Formik } from "formik";
import { usePostReferral, useUploadPatientDocumentFile } from "../../modules/patient/_hooks";
import { toast } from "react-toastify";
import Backdrop from "../../../_cloner/helpers/components/Backdrop";
import FileUpload from "../../../_cloner/helpers/components/FileUpload";
import { useState } from "react";
import Zoom from 'react-medium-image-zoom'

const initialValues = {
    referralDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    referralReason: "",
    description: "",
};

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    item: IPatientDocument;
};

const AttachDocument = (props: Props) => {

    const uploadFile = useUploadPatientDocumentFile()
    const [files, setFiles] = useState<File[]>([]);


    const onSubmit = async (values: any) => {
        const formData: any = new FormData();
        formData.append("patientId", props?.item?.patient?.id);
        formData.append("documentId", props?.item?.document?.id);
        // formData.append("attachment", files[0]);
        files.forEach((file) => {
            formData.append('attachment', file);
        });


        try {
            uploadFile.mutate(formData, {
                onSuccess: (response) => {
                    if(response.status === 400) {
                        toast.error(response.data.message)
                    } else {
                        toast.success("ثبت اطلاعات موفقیت امیز بود")
                        props.setIsOpen(false)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {uploadFile.isLoading && <Backdrop loading={uploadFile.isLoading} />}
            <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
                <div className="flex flex-row justify-around">
                    <div className="flex flex-row m-16">
                            <div className="font-bold text-xl text-gray-500">شماره بیمار: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.patientCode}</div>
                    </div>
                    <div className="flex flex-row m-16">
                            <div className="font-bold text-xl text-gray-500">نام و نام خانوادگی: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.firstName} {props?.item?.patient?.lastName}</div>
                    </div>
                    <div className="flex flex-row m-16">
                            <div className="font-bold text-xl text-gray-500">کدملی: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.nationalCode}</div>
                    </div>
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({  }) => {
                        return (
                            <Form className="grid grid-cols-2 gap-x-8 mx-16 my-8">
                                <FileUpload files={files} setFiles={setFiles} />
                                <div>
                                    <button
                                        type="submit"
                                        id="kt_sign_in_submit"
                                        className="btn btn-primary"
                                    >
                                        {uploadFile.isLoading ? "درحال پردازش" : "ثبت ضمیمه"}
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
                <div>
                <Zoom>
                    <img
                        alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                        src={`${window.location.origin}/${props?.item?.image}`}
                        width="500"
                    />
                </Zoom>

                </div>
            </Modal>
        </>
    );
};

export default AttachDocument;
