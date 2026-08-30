export interface LegacyFile {
    id: string;
    name: string;
    type: string;
    size: string;
    role: string;
    referencedBy: string[];
    status: 'Analyzed' | 'Pending' | 'Unknown';
}

export interface BusinessRule {
    id: string;
    legacySource: string;
    rule: string;
    modernizedEquivalent: string;
    status: 'Validated' | 'Pending' | 'Rejected';
}
