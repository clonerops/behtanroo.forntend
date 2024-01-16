export interface IPatient {
    id?: string
    patientCode?: number,
    firstName: string
    lastName: string
    nationalCode: string
    mobile: string
    mobile2: string
    tel: string
    address: string
}

export interface IReferral {
    id: string,
    referralDate: string
    referralReason: string
    description: string
    patient: string
}