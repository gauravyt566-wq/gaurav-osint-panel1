import { ApiData, LookupKey } from '../types';

// ======================
// 🔹 Helper Functions
// ======================

// Convert camelCase to Title Case with acronym handling
const camelCaseToTitleCase = (str: string): string => {
    if (str.toUpperCase() === 'RCID') return 'RC ID';
    if (str.toUpperCase() === 'UID') return 'UID Linked';
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

// Create divider lines
const createDivider = (char: string, length: number): string => char.repeat(length);

// Timestamp for footer
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

// ======================
// 🔹 Family Info Report
// ======================
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

    if (members.length > 0) report += `${createDivider('-', 56)}\n\n`;

    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: Family Info API\n`;
    report += `${createDivider('-', 56)}\n\n`;
    report += `CONFIDENTIAL: Authorized Use Only\n`;

    return report;
};

// ======================
// 🔹 Fampay Lookup Report
// ======================
const formatFampayReport = (data: any, query: string): string => {
    const user = data.user || {};
    const contact = user.contact || {};
    const vpa = user.fvpas?.[0]?.vpa?.address || 'N/A';

    let report = '';
    report += `${createDivider('=', 70)}\n`;
    report += `FAMPAY ANALYSIS REPORT\n`;
    report += `FOR ${query}\n`;
    report += `${createDivider('=', 70)}\n\n`;

    report += `First Name: ${user.first_name || 'N/A'}\n`;
    report += `Last Name: ${user.last_name || 'N/A'}\n`;
    report += `Display Username: ${user.display_username || 'N/A'}\n`;
    report += `Username: ${user.username || 'N/A'}\n`;
    report += `Phone: ${contact.code ? '+' + contact.code : ''} ${contact.phone_number || 'N/A'}\n`;
    report += `VPA: ${vpa}\n`;
    report += `Image: ${user.image || 'N/A'}\n`;
    report += `${createDivider('-', 70)}\n`;
    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: Fampay Lookup API\n`;
    report += `${createDivider('-', 70)}\n\n`;

    return report;
};

// ======================
// 🔹 Pakistan Number Lookup
// ======================
const formatPakistanNumReport = (data: any, query: string): string => {
    const records = data.data || [];

    let report = '';
    report += `${createDivider('=', 70)}\n`;
    report += `PAKISTAN NUMBER ANALYSIS REPORT\n`;
    report += `FOR ${query}\n`;
    report += `${createDivider('=', 70)}\n\n`;

    records.forEach((rec: any, i: number) => {
        report += `RECORD ${i + 1} FOR ${query}\n`;
        report += `Number : ${rec.number || 'N/A'}\n`;
        report += `Name   : ${rec.name || 'N/A'}\n`;
        report += `CNIC   : ${rec.cnic || 'N/A'}\n`;
        report += `Address: ${rec.address || 'N/A'}\n`;
        report += `${createDivider('-', 70)}\n`;
    });

    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: Pakistan Number API\n`;
    report += `${createDivider('-', 70)}\n\n`;

    return report;
};

// ======================
// 🔹 Vehicle Lookup Report
// ======================
const formatVehicleReport = (data: any, query: string): string => {
    let report = '';
    report += `${createDivider('=', 70)}\n`;
    report += `VEHICLE ANALYSIS REPORT\n`;
    report += `FOR ${query}\n`;
    report += `${createDivider('=', 70)}\n\n`;

    for (const [key, value] of Object.entries(data)) {
        if (value === null || value === undefined || value === '') continue;
        const formattedKey = camelCaseToTitleCase(key);
        report += `${formattedKey}: ${value}\n`;
    }

    report += `${createDivider('-', 70)}\n`;
    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: Vehicle Lookup API\n`;
    report += `${createDivider('-', 70)}\n\n`;

    return report;
};

// ======================
// 🔹 UPI Lookup Report
// ======================
const formatUpiReport = (data: any, query: string): string => {
    const verify = data.data?.verify_chumt || {};
    const bank = data.data?.bank_details_raw || {};

    let report = '';
    report += `${createDivider('=', 70)}\n`;
    report += `UPI ANALYSIS REPORT\n`;
    report += `FOR ${query}\n`;
    report += `${createDivider('=', 70)}\n\n`;

    report += `Name: ${verify.name || 'N/A'}\n`;
    report += `VPA: ${verify.vpa || 'N/A'}\n`;
    report += `IFSC: ${verify.ifsc || 'N/A'}\n`;
    report += `Is Fampay User: ${verify.is_fampay_user ? 'Yes' : 'No'}\n`;
    report += `Is Merchant: ${verify.is_merchant ? 'Yes' : 'No'}\n`;
    report += `${createDivider('-', 70)}\n`;
    report += `Bank: ${bank.BANK || 'N/A'}\n`;
    report += `Branch: ${bank.BRANCH || 'N/A'}\n`;
    report += `Address: ${bank.ADDRESS || 'N/A'}\n`;
    report += `City: ${bank.CITY || 'N/A'}\n`;
    report += `State: ${bank.STATE || 'N/A'}\n`;
    report += `IFSC: ${bank.IFSC || 'N/A'}\n`;
    report += `${createDivider('-', 70)}\n`;
    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: UPI Verification API\n`;
    report += `${createDivider('-', 70)}\n\n`;

    return report;
};

// ======================
// 🔹 Generic Formatter (fallback)
// ======================
const formatGenericReport = (data: ApiData, type: LookupKey, query: string): string => {
    const reportTitle = `${type.toUpperCase()} ANALYSIS REPORT`;
    const dataSource = `Secure OSINT Database`;

    let report = '';
    report += `${createDivider('=', 70)}\n`;
    report += `${reportTitle}\n`;
    report += `FOR ${query}\n`;
    report += `${createDivider('=', 70)}\n\n`;

    const records = Array.isArray(data) ? data : [data];
    records.forEach((record, index) => {
        if (!record || typeof record !== 'object') return;

        report += `RECORD ${index + 1} FOR ${query}\n`;
        for (const [key, value] of Object.entries(record)) {
            if (value === null || value === undefined || value === '') continue;
            const formattedKey = camelCaseToTitleCase(key);
            report += `${formattedKey}: ${value}\n`;
        }
        report += `${createDivider('-', 70)}\n`;
    });

    report += `Report generated: ${getTimestamp()}\n`;
    report += `Data Source: ${dataSource}\n`;
    report += `${createDivider('-', 70)}\n\n`;

    return report;
};

// ======================
// 🔹 API Payload Extractor
// ======================
const extractApiPayload = (data: ApiData): any => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return data;
    if ('data' in data) return data.data;
    if ('result' in data) return data.result;
    if ('response' in data) return data.response;
    if ('details' in data) return data.details;
    if ('Data' in data && data.Success === true) return data.Data;
    if ('aadhaar' in data) return data.aadhaar;
    return data;
};

// ======================
// 🔹 Main Export
// ======================
export const formatApiData = (data: ApiData, type: LookupKey, query: string): string => {
    if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        return 'No details found.';
    }

    // Specific formatters
    if (type === 'family') return formatFamilyInfoReport(data, query);
    if (type === 'fampay') return formatFampayReport(data, query);
    if (type === 'paknum') return formatPakistanNumReport(data, query);
    if (type === 'vehicle') return formatVehicleReport(data, query);
    if (type === 'upi') return formatUpiReport(data, query);

    // Fallback generic
    const payload = extractApiPayload(data);
    if (!payload || (typeof payload === 'object' && Object.keys(payload).length === 0)) {
        return 'No details found in API response payload.';
    }
    return formatGenericReport(payload, type, query);
};            if (value === null || value === undefined || value === '') continue;
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
