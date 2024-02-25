export interface IPatient {
    id?: number
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

export interface IDocument {
    id: number
    title: string
}

export interface IPatientDocument {
    id?: number
    patientId?: number
    documentId?: number
    documentCode?: number
    description: string
    patient?: IPatient
    document?: IDocument
}