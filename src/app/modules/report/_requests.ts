import { DownloadExeclFile } from "../../../_cloner/helpers/DownloadFiles";
import { http, httpFormData } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IPatientReport, IPatientReportByReferral } from "./_models";

export const getPatientReport = async (formDate: IPatientReport) => {
    const {data} = await http.get(`${generateURLQueryParam('/report/patient', formDate)}`)
    return data
}

export const downloadExcelPatietReport = async (formDate: IPatientReport) => {
    const {data} = await httpFormData.get(`${generateURLQueryParam('/report/excelPatient', formDate)}`)
    DownloadExeclFile(data, "patientReport.xlsx")
    return data
}


export const getPatientReportByReferral = async (formDate: IPatientReportByReferral) => {
    const {data} = await http.get(`${generateURLQueryParam('/report/referralCount', formDate)}`)
    return data
}

export const downloadExcelPatietReportByReferral = async (formDate: IPatientReportByReferral) => {
    const {data} = await httpFormData.get(`${generateURLQueryParam('/report/excelReferralCount', formDate)}`)
    DownloadExeclFile(data, "patientReportReferral.xlsx")
    return data
}
