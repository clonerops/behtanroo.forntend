export interface IPatient {
    id?: number
    patientCode?: number,
    documentCode?: number,
    isDeleted?: boolean,
    firstName: string
    lastName: string
    nationalCode: string
    gender: number
    mobile: string
    mobile2: string
    tel: string
    address: string
    birthDate: string
    job: string
    education: string
    representative: string
    maritalStatus: number
    document?: any
}
export interface IDoctor {
    id?: number
    firstName: string
    lastName: string
    mobile: string
    description?: any
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
    image?: any
    patient?: IPatient
    document?: IDocument
    doctor?: IDoctor
}