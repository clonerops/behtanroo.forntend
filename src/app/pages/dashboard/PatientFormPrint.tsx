import React, { useRef } from 'react'
import { Card } from 'react-bootstrap'
import { toAbsoluteUrl } from '../../../_cloner/helpers'
import { useReactToPrint } from 'react-to-print';
import { useGetPatient, useGetPatientDocumentById } from '../../modules/patient/_hooks';
import { useParams } from 'react-router-dom';

const PatientFormPrint = (props: any) => {
    const {id}: any = useParams()
    const patient: any = useGetPatient(id)
    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printComponentRef.current,
    });

    if(patient.isLoading) {
        return <span>درحال بارگزاری ....</span>
    }
    

    return (
        <>
            <button onClick={handlePrint}>پرینت</button>
            <div ref={printComponentRef} style={{ direction: "rtl" }}>
                <Card>
                    <div className='py-4 text-center'>
                        <p className='font-bold text-2xl'>کلینیک زیبایی به تن رو</p>
                        <p className='font-bold'>برگه خلاصه پرونده</p>
                    </div>
                    <header className='flex justify-between items-center'>
                        <div className='px-4'>
                            <p className='font-bold text-2xl'>شماره پرونده: </p>
                            <p className='font-bold text-4xl'>{100}</p>
                        </div>
                        <div className='px-4'>
                            <p className='font-bold text-2xl'>{patient?.data?.firstName} {patient?.data?.lastName}</p>
                        </div>
                        <div>
                            <img
                                alt='Logo'
                                src={toAbsoluteUrl('/media/logos/640-logo.png')}
                                className='w-[80px]'
                            />

                        </div>
                    </header>

                    <main className='px-2'>
                        <table className='table border-collapse border border-slate-400 '>
                            <thead>
                                <tr>
                                    <th className='!font-bold border !border-slate-300 text-center'>شماره بیمار</th>
                                    <th className='!font-bold border !border-slate-300 text-center'>کدملی</th>
                                    <th className='!font-bold border !border-slate-300 text-center'>جنسیت</th>
                                    <th className='!font-bold border !border-slate-300 text-center'>شماره همراه</th>
                                    <th className='!font-bold border !border-slate-300 text-center'>آدرس</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border !border-slate-300 text-center'>{patient?.data?.patientCode}</td>
                                    <td className='border !border-slate-300 text-center'>{patient?.data?.nationalCode}</td>
                                    <td className='border !border-slate-300 text-center'>{patient?.data?.gender === 1 ? "مرد" : "زن"}</td>
                                    <td className='border !border-slate-300 text-center'>{patient?.data?.mobile}</td>
                                    <td className='border !border-slate-300 text-center'>{patient?.data?.address}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className='px-2'>
                            <div>
                                <h1 className='font-bold text-lg py-8'>اقدامات درمانی </h1>
                                <h1 className='text-slate-300'>
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                </h1>
                            </div>
                        </div>
                    </main>

                    <footer className='bg-yellow-500 w-full mt-[20px]'>
                        <div className='py-4 px-2 flex justify-between items-center'>
                            <p className='font-bold text-2xl'>برگه خلاصه پرونده</p>
                            <p className='font-bold text-2xl'>کلینیک زیبایی به تن رو</p>
                        </div>
                    </footer>

                </Card>
            </div>
        </>
    )
}

export default PatientFormPrint