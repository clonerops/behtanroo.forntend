import { useMutation, useQuery } from "@tanstack/react-query"
import { IPatient, IPatientDocument, IReferral } from "./_models"

import * as api from './_requests'

export const usePostPatient = () => {
    return useMutation((formData: IPatient) => {
        return api.postPatient(formData)
    })
}

export const useGetPatients = () => {
    return useQuery(['patients'], () => api.getPatients())
}
export const useGetPatient = (id: string) => {
    return useQuery(['patient', id], () => api.getPatient(id))
}

//Referrals
export const usePostReferral = () => {
    return useMutation((formData: IReferral) => {
        return api.postReferral(formData)
    })
}

export const useGetReferrals = () => {
    return useQuery(['referrals'], () => api.getReferrals())
}
export const useGetReferral = (id: string) => {
    return useQuery(['referral', id], () => api.getReferral(id))
}
export const useGetReferralByPatient = (id: string) => {
    return useQuery(['referralByPatient', id], () => api.getReferralByPatient(id))
}
export const useGetDocuments = () => {
    return useQuery(['documents'], () => api.getDocuments())
}

export const usePostPatientDocument = () => {
    return useMutation((formData: IPatientDocument) => {
        return api.postPatientDocument(formData)
    })
}
