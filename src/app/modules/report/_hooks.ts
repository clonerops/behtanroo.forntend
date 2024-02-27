import { useMutation } from "@tanstack/react-query"
import * as api from './_requests'
import { IPatientReport } from "./_models"

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
