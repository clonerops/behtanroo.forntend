import { DownloadExeclFile } from "../../../_cloner/helpers/DownloadFiles";
import { http, httpFormData } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IPatientReport } from "./_models";

export const getPatientReport = async (formDate: IPatientReport) => {
    const {data} = await http.get(`${generateURLQueryParam('/report/patient', formDate)}`)
    return data
}

export const downloadExcelPatietReport = async (formDate: IPatientReport) => {
    const {data} = await httpFormData.get(`${generateURLQueryParam('/report/excelPatient', formDate)}`)
    DownloadExeclFile(data, "patientReport.xlsx")
    return data
}
