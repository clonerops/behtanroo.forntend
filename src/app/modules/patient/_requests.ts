import { DownloadExeclFile } from "../../../_cloner/helpers/DownloadFiles";
import { http, httpFormData } from "../../../_cloner/helpers/axiosConfig";
import { IDoctor, IPatient, IPatientDocument, IReferral } from "./_models";

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
export const deletePatient = async (id: number) => {
    try {
        const {data} = await http.delete(`/patient/${id}`)
        return data        
    } catch (error: any) {
            return error.response
    }
}

export const getPatients = async () => {
    const {data} = await http.get('/patient/lists');
    return data
}


export const getPatientsByMutation = async (isActive: number) => {
    try {
        const {data} = await http.get('/patient/lists', {
        headers: {
            isActive: isActive
        }
        });
        return data
    
    } catch (error: any) {
        return error.resposne        
    }
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
export const getPatientDocumentsByMutation = async (documentId: number) => {
    const {data} = await http.get(`/patientdocument`, {
        headers: {
            documentId: documentId
        }
    });
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

export const uploadPatientDocumentFile = async (formData: IPatientDocument) => {
    try {
        const {data} = await httpFormData.put('/patientdocument/uploadFile', formData)
        return data        
    } catch (error) {
        if(error instanceof Error)
            return error
    }
}


//Doctors
export const postDoctor = async (formData: IDoctor) => {
    try {
        const {data} = await http.post('/doctor/create', JSON.stringify(formData))
        return data        
    } catch (error: any) {
            return error.response
    }
}

export const deleteDoctor = async (id: number) => {
    try {
        const {data} = await http.delete(`/doctor/${id}`)
        return data        
    } catch (error: any) {
            return error.response
    }
}

export const getDoctors = async () => {
    const {data} = await http.get('/doctor/lists');
    return data
}
export const getDoctor = async (id: number) => {
    const {data} = await http.get(`/doctor/${id}`);
    return data
}
export const putDoctor = async (formData: IDoctor) => {
    try {
        const {data} = await http.put(`/doctor/${formData.id}/edit`, JSON.stringify(formData))
        return data        
    } catch (error: any) {
            return error.response
    }
}
