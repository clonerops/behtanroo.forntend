import { DownloadExeclFile } from "../../../_cloner/helpers/DownloadFiles";
import { http, httpFormData } from "../../../_cloner/helpers/axiosConfig";
import { IPatient, IPatientDocument, IReferral } from "./_models";

export const postPatient = async (formData: IPatient) => {
    try {
        const {data} = await http.post('/patient/create', JSON.stringify(formData))
        return data        
    } catch (error: any) {
            return error.response
    }
}
export const putPatient = async (formData: IPatient) => {
    try {
        const {data} = await http.put(`/patient/${formData.id}/edit`, JSON.stringify(formData))
        return data        
    } catch (error: any) {
            return error.response
    }
}

export const getPatients = async () => {
    const {data} = await http.get('/patient/lists');
    return data
}

export const getPatient = async (id: number) => {
    const {data} = await http.get(`/patient/${id}`);
    return data
}

export const downloadExcelPatiets = async () => {
    const {data} = await httpFormData.get(`/patient/exportExcel`);
    DownloadExeclFile(data, "patient.xlsx")
    return data
}


// Referral
export const postReferral = async (formData: IReferral) => {
    try {
        const {data} = await http.post('/referral/create', JSON.stringify(formData))
        return data        
    } catch (error) {
        if(error instanceof Error)
            return error
    }
}

export const getReferrals = async () => {
    const {data} = await http.get('/referral/lists');
    return data
}

export const getReferral = async (id: string) => {
    const {data} = await http.get(`/referral/${id}`);
    return data
}

export const getReferralByPatient = async (id: string) => {
    const {data} = await http.get(`/patient/${id}/referral`);
    return data
}

export const getReferralByPatientAndDocument = async (patientId: number, documentId: number) => {
    const {data} = await http.get(`/referral/patient/${patientId}/document/${documentId}`);
    return data
}


export const getDocuments = async () => {
    const {data} = await http.get(`/document`);
    return data
}
export const getDocument = async (id: string) => {
    const {data} = await http.get(`/document/${id}`);
    return data
}

export const postPatientDocument = async (formData: IPatientDocument ) => {
    try {
        const {data} = await http.post('/patientdocument', JSON.stringify(formData))
        return data        
    } catch (error: any) {
            return error.response
    }
}

export const getPatientDocuments = async () => {
    const {data} = await http.get(`/patientdocument`);
    return data
}

export const getPatientDocumentById = async (patientId: string, documentId: string) => {
    const {data} = await http.get(`/patientdocument/patient/${patientId}/document/${documentId}`);
    return data
}

export const deletePatientDocument = async (patientId: number, documentId: number) => {
    const {data} = await http.delete(`/patientdocument/patient/${patientId}/document/${documentId}`);
    return data
}