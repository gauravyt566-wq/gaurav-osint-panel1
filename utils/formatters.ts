import { ApiData, LookupKey } from '../types';

// Helper function to convert camelCase to Title Case with specific acronym handling
const camelCaseToTitleCase = (str: string): string => {
    if (str.toUpperCase() === 'RCID') return 'RC ID';
    if (str.toUpperCase() === 'UID') return 'UID Linked';
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

// Helper to create a divider line
const createDivider = (char: string, length: number): string => char.repeat(length);

// Helper to format a date and time
const getTimestamp = (): string => {
    return new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
};

const formatFamilyInfoReport = (data: Record<string, any>, query: string): string => {
    const {
        address,
        homeDistName,
        homeStateName,
        schemeName,
        schemeId,
        rcId,
        memberDetailsList,
    } = data;

    const members = memberDetailsList || data.members || data.family_members || [];

    let report = '';
    report += `${createDivider('=', 56)}\n`;
    report += `          FAMILY INFORMATION REPORT\n`;
    report += `                 FOR ${query}\n`;
    report += `${createDivider('=', 56)}\n\n`;

    report += `Address: ${address || 'N/A'}\n`;
    report += `District: ${homeDistName || 'N/A'}\n`;
    report += `State: ${homeStateName || 'N/A'}\n`;
    report += `Scheme: ${schemeName || 'N/A'}\n`;
    report += `Scheme ID: ${schemeId || 'N/A'}\n`;
    report += `RC ID: ${rcId || 'N/A'}\n`;
    report += `${createDivider('-', 56)}\n`;
    report += `Total Family Members: ${members.length}\n`;
    report += `${createDivider('-', 56)}\n\n`;

    members.forEach((member: any, index: number) => {
        report += `MEMBER ${index + 1}\n`;
        report += `Name: ${member.memberName || 'N/A'}\n`;
        report += `Relation: ${member.releationship_name || 'N/A'}\n`;
        report += `UID Linked: ${member.uid || 'N/A'}\n`;
        if (index < members.length - 1) {
            report += `${createDivider('-', 56)}\n`;
        }
    });

    if (members.length > 0) {
       report += `${createDivider('-', 56)}\n\n`;
    }

    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: Family Info API\n`;
    report += `${createDivider('-', 56)}\n\n`;
    report += `CONFIDENTIAL: Authorized Use Only\n`;

    return report;
};


const formatGenericReport = (data: ApiData, type: LookupKey, query: string): string => {
    const reportTitle = `${type.toUpperCase()} ANALYSIS REPORT`;
    const dataSource = `Secure OSINT Database`;

    let report = '';
    report += `${createDivider('=', 70)}\n`;
    report += `${reportTitle.padStart(35 + reportTitle.length / 2)}\n`;
    report += `FOR ${query}`.padStart(35 + `FOR ${query}`.length / 2) + '\n';
    report += `${createDivider('=', 70)}\n\n`;

    const records = Array.isArray(data) ? data : [data];
    
    records.forEach((record, index) => {
        if (!record || typeof record !== 'object') return;

        report += `${createDivider('-', 43)}\n`;
        const recordTitle = `RECORD ${index + 1}${records.length > 1 ? ` FOR ${query}` : ''}`;
        report += recordTitle.padStart(22 + recordTitle.length / 2) + `\n`;
        report += `${createDivider('-', 43)}\n`;

        const keys = Object.keys(record);
        if (keys.length === 0) return;

        const maxKeyLength = Math.max(...keys.map(key => camelCaseToTitleCase(key).length));

        for (const [key, value] of Object.entries(record)) {
            if (value === null || value === undefined || value === '') continue;
            const formattedKey = camelCaseToTitleCase(key);
            report += `${formattedKey.padEnd(maxKeyLength + 2)}: ${value}\n`;
        }
        report += '\n';
    });


    report += `${createDivider('-', 42)}\n`;
    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: ${dataSource}\n`;
    report += `${createDivider('-', 42)}\n\n`;

    return report;
};

const extractApiPayload = (data: ApiData): any => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return data; // Return as-is if not a non-array object
    }
    // Check for common wrapper keys
    if ('data' in data) return data.data;
    if ('result' in data) return data.result;
    if ('response' in data) return data.response;
    if ('details' in data) return data.details;
    if ('Data' in data && data.Success === true) return data.Data;
    if ('aadhaar' in data) return data.aadhaar;

    return data; // Fallback to the original object
};

export const formatApiData = (data: ApiData, type: LookupKey, query: string): string => {
    if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        return 'No details found.';
    }
    
    if (type === 'family' && typeof data === 'object' && !Array.isArray(data) && (data.memberDetailsList || data.members)) {
         return formatFamilyInfoReport(data, query);
    }
    
    const payload = extractApiPayload(data);

    if (!payload || (typeof payload === 'object' && Object.keys(payload).length === 0)) {
        return 'No details found in API response payload.';
    }

    return formatGenericReport(payload, type, query);
};
