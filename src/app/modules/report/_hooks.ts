import { useMutation } from "@tanstack/react-query"
import * as api from './_requests'
import { IPatientReport, IPatientReportByReferral } from "./_models"

export const useGetPatientReport = () => {
    return useMutation((formData: IPatientReport) => {
        return api.getPatientReport(formData)
    })
}

export const useDownloadExportExcelPatientReport = () => {
    return useMutation((formData: IPatientReport) => {
        return api.downloadExcelPatietReport(formData)
    })
}

export const useGetPatientReportByReferral = () => {
    return useMutation((formData: IPatientReportByReferral) => {
        return api.getPatientReportByReferral(formData)
    })
}

export const useDownloadExportExcelPatientReportByReferral = () => {
    return useMutation((formData: IPatientReportByReferral) => {
        return api.downloadExcelPatietReportByReferral(formData)
    })
}
