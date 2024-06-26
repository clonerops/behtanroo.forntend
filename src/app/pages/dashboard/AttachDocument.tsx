import moment from "moment-jalaali";
import Modal from "../../../_cloner/helpers/components/Modal";
import { IPatientDocument } from "../../modules/patient/_models";
import { Form, Formik } from "formik";
import { useGetPatientDocumentById, usePostReferral, useUploadPatientDocumentFile } from "../../modules/patient/_hooks";
import { toast } from "react-toastify";
import Backdrop from "../../../_cloner/helpers/components/Backdrop";
import FileUpload from "../../../_cloner/helpers/components/FileUpload";
import { useEffect, useState } from "react";
import Zoom from 'react-medium-image-zoom'
import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePNG } from "../../../_cloner/helpers/DownloadFiles";
import useBase64toFile from "../../../_cloner/helpers/convertBaseToFile";

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

    const detailTools = useGetPatientDocumentById(props?.item?.patient?.id, props?.item?.document?.id)
    const uploadFile = useUploadPatientDocumentFile()
    const [files, setFiles] = useState<File[]>([]);
    const convertBase64ToFile = useBase64toFile()


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
    var signatures: any = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        "/9j/": "image/jpg"
    };

    function detectMimeType(b64: any) {
        for (var s in signatures) {
            if (b64.indexOf(s) === 0) {
                return signatures[s];
            }
        }
    }
    const hadelDownload = () => {
        if (detailTools?.data?.data?.attachments?.length === 0) {
            alert("فایلی برای دانلود وجود ندارد")
        } else {
            detailTools?.data?.data?.attachments?.forEach((element: any) => {
                switch (detectMimeType(element.attachment)) {
                    case "image/png":
                        const outputFilenamePng = `filesattachments${Date.now()}.png`;
                        DownloadFilePNG(element.attachment, outputFilenamePng)
                        break;
                    case "image/jpg":
                        const outputFilenameJpg = `filesattachments${Date.now()}.jpg`;
                        DownloadFileJPG(element.attachment, outputFilenameJpg)
                        break;
                    case "image/jpeg":
                        const outputFilenameJpeg = `filesattachments${Date.now()}.jpeg`;
                        DownloadFileJPEG(element.attachment, outputFilenameJpeg)
                        break;

                    default:
                        break;
                }
            });
            props.setIsOpen(false)
        }
    };

    useEffect(() => {
        if (detailTools.isLoading) {
            setFiles([])
        } else {
            setFiles(detailTools?.data?.data?.attachments?.map((item: { attachment: string }) => convertBase64ToFile(item.attachment, "example.jpg")))
        }
        // eslint-disable-next-line
    }, [detailTools?.isLoading])


    return (
        <>
            {uploadFile.isLoading && <Backdrop loading={uploadFile.isLoading} />}
            <Modal isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full overflow-hidden">
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">شماره بیمار: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.patientCode}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">نام و نام خانوادگی: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.firstName} {props?.item?.patient?.lastName}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">کدملی: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.patient?.nationalCode}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">نوع پرونده: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.document?.title}</div>
                    </div>
                    <div className="flex flex-row w-full lg:mx-16 lg:my-8">
                            <div className="font-bold text-xl text-gray-500">شماره پرونده: </div>
                            <div className="px-8 font-bold text-2xl">{props?.item?.documentCode}</div>
                    </div>

                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({  }) => {
                        return (
                            <Form className="grid grid-cols-2 gap-x-8 mx-16 my-8">
                                <FileUpload files={files} setFiles={setFiles} />
                                <div>
                                    {/* {detailTools?.data?.data?.attachments.length > 0 ? null :  */}
                                        <button
                                            type="submit"
                                            id="kt_sign_in_submit"
                                            className="btn !bg-green-500 text-white"
                                        >
                                            {uploadFile.isLoading ? "درحال پردازش" : "ثبت ضمیمه"}
                                        </button>
                                    {/* } */}
                                </div>
                                <button onClick={hadelDownload} className='btn btn-primary mt-8' >
                                    <span>{"دانلود ضمیمه ها"}</span>
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
};

export default AttachDocument;
