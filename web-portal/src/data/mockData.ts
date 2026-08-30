import { LegacyFile, BusinessRule } from '../types';

export const legacyFiles: LegacyFile[] = [
    { id: '1', name: 'MENU.PRG', type: 'PRG', size: '45 KB', role: 'Main Entry Point', referencedBy: [], status: 'Analyzed' },
    { id: '2', name: 'RESERVA.PRG', type: 'PRG', size: '120 KB', role: 'Reservation Workflow', referencedBy: ['MENU.PRG'], status: 'Analyzed' },
    { id: '3', name: 'COBRA.PRG', type: 'PRG', size: '90 KB', role: 'Billing Workflow', referencedBy: ['MENU.PRG'], status: 'Analyzed' },
    { id: '4', name: 'CTACTE.DBF', type: 'DBF', size: '10 MB', role: 'Current Accounts', referencedBy: ['COBRA.PRG'], status: 'Analyzed' },
    { id: '5', name: 'reserva.dbf', type: 'DBF', size: '5 MB', role: 'Reservations Table', referencedBy: ['RESERVA.PRG'], status: 'Analyzed' },
];

export const businessRules: BusinessRule[] = [
    { id: 'BR-060', legacySource: 'RESERVA.PRG', rule: 'The parcel must exist.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-061', legacySource: 'RESERVA.PRG', rule: 'Parcel, level, and sublevel must not already exist.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-062', legacySource: 'RESERVA.PRG', rule: 'Every earlier sublevel for the same parcel and level must exist.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-063', legacySource: 'RESERVA.PRG', rule: 'Service type must be S or T.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-064', legacySource: 'RESERVA.PRG', rule: 'Level must be 1-3 and sublevel must be 1-6.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
];

export const modernRules = [
    { id: 'BR-001', legacySource: 'RESERVA.PRG', rule: 'Expensa = 10', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-002', legacySource: 'RESERVA.PRG', rule: 'Ult_Mes = 2', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-003', legacySource: 'RESERVA.PRG', rule: 'ult_ano = 1999', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
];
