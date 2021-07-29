export interface Document {
  code: string;
  description: string;
  value: string;
  expireDate: string;
}

export interface Address {
  address1: string;
  address2: string;
  address3: string;
  cityState: string;
  postalCode: string;
}

export interface Name {
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
}

export interface ContactNumber {
  home: string;
  email: string;
}

export interface Nationality {
  code: string;
  description: string;
}

export interface Sex {
  code: string;
  description: string;
}

export interface Patient {
  contactNumber?: ContactNumber;
  dob: string;
  homeAddress?: Address;
  name?: Name;
  nationality?: Nationality;
  prn: string;
  resident: string;
  sex?: Sex;
  documents?: Document[];
}

export interface NovaDoctorSpokenLanguage {
  spokenLanguageId: number;
  doctorId: number;
  displaySequence: number;
  spokenLanguage: string;
}

export interface NovaDoctorQualifications {
  qualificationId: number;
  doctorId: number;
  displaySequence: number;
  qualification: string;
}

export interface NovaDoctorSpecialities {
  specialitiesId: number;
  doctorId: number;
  displaySequence: number;
  specialities: string;
}

export interface NovaDoctorClinicLocation {
  clinicLocationId: number;
  doctorId: number;
  location: string;
}

export interface NovaDoctorClinicHours {
  clinicHourId: number;
  doctorId: number;
  displaySequence: number;
  dayOfTheWeek: string;
  dayStartTime: string;
  dayEndTime: string;
  byAppointmentOnly: boolean;
}

export interface NovaDoctorContact {
  contactId: number;
  doctorId: number;
  displaySequence: number;
  contactType: string;
  contactValue: string;
}

export interface NovaSpecialty {
  specialtyId: number;
  specialtyCode: string;
  specialtyDesc: string;
}

export interface NovaDoctorSpecialty {
  doctorSpecialtyId: number;
  doctorId: number;
  specialty: NovaSpecialty;
  specialtyId: number;
  primarySpecialty: boolean;
}

export interface NovaDoctor {
  doctor_id: number;
  mcr: string;
  name: string;
  gender: string;
  nationality: string;
  image: string;
  doctorSpokenLanguage: NovaDoctorSpokenLanguage[];
  doctorQualifications: NovaDoctorQualifications[];
  doctorSpecialities: NovaDoctorSpecialities[];
  doctorClinicLocation: NovaDoctorClinicLocation[];
  doctorClinicHours: NovaDoctorClinicHours[];
  doctorContacts: NovaDoctorContact[];
  doctorSpecialty: NovaDoctorSpecialty[];
}
