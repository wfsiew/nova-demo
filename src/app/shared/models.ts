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
