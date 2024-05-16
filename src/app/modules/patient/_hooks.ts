import { useMutation, useQuery } from "@tanstack/react-query"
import { IPatient, IPatientDocument, IReferral } from "./_models"

import * as api from './_requests'

export const usePostPatient = () => {
    return useMutation((formData: IPatient) => {
        return api.postPatient(formData)
    })
}
export const usePutPatient = () => {
    return useMutation((formData: IPatient) => {
        return api.putPatient(formData)
    })
}

export const useGetPatients = () => {
    return useQuery(['patients'], () => api.getPatients(), {
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // refetchIntervalInBackground: false
    })
}
export const useGetPatient = (id: number) => {
    return useQuery(['patient', id], () => api.getPatient(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
export const useGetDocument = (id: string) => {
    return useQuery(['document', id], () => api.getDocument(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

export const useDeletePatient = () => {
    return useMutation((id: number) => {
        return api.deletePatient(id)
    })
}

export const useDownloadExportExcel = () => {
    return useMutation(() => {
        return api.downloadExcelPatiets()
    })
}

//Referrals
export const usePostReferral = () => {
    return useMutation((formData: IReferral) => {
        return api.postReferral(formData)
    })
}

export const useGetReferrals = () => {
    return useQuery(['referrals'], () => api.getReferrals(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
export const useGetReferral = (id: string) => {
    return useQuery(['referral', id], () => api.getReferral(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
export const useGetReferralByPatient = (id: string) => {
    return useQuery(['referralByPatient', id], () => api.getReferralByPatient(id))
}
export const useGetReferralByPatientAndDocument = (patientId: number, documentId: number) => {
    return useQuery(['referralByPatientAndDocument', patientId, documentId], () => api.getReferralByPatientAndDocument(patientId, documentId))
}
export const useGetDocuments = () => {
    return useQuery(['documents'], () => api.getDocuments(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

// Patient Document
export const usePostPatientDocument = () => {
    return useMutation((formData: IPatientDocument) => {
        return api.postPatientDocument(formData)
    })
}

export const useGetPatientDocuments = () => {
    return useQuery(['patientDocuments'], () => api.getPatientDocuments(), {
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // refetchIntervalInBackground: false
    })
}

export const useGetPatientDocumentById = (patientId: any, documentId: any) => {
    return useQuery(['patientDocument', patientId, documentId], () => api.getPatientDocumentById(patientId, documentId), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

export const useDeletePatientDocument = () => {
    return useMutation((formData: {patientId: number, documentId: number}) => {
        return api.deletePatientDocument(formData.patientId, formData.documentId)
    })
}

export const useUploadPatientDocumentFile = () => {
    return useMutation((formData: IPatientDocument) => {
        return api.uploadPatientDocumentFile(formData)
    })
}
