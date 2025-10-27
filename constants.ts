import { TabConfig, LookupKey } from './types';

export const LOOKUP_CONFIG: Record<LookupKey, TabConfig> = {
  mobile: { 
    label: 'Mobile Number Lookup',
    placeholder: 'Enter 10-digit number...',
    url: 'https://number-info.gauravyt342.workers.dev/?mobile=',
    minLength: 10,
    maxLength: 10,
    errorMsg: 'Mobile must be 10 digits.',
    inputType: 'number',
    info: 'Mobile: 10-digit number'
  },
  aadhaar: { 
    label: 'Aadhaar Lookup',
    placeholder: 'Enter 12-digit number...',
    url: 'https://aadhar.gauravyt342.workers.dev/?aadhar=',
    minLength: 12,
    maxLength: 12,
    errorMsg: 'Aadhaar must be 12 digits.',
    inputType: 'number',
    info: 'Aadhaar: 12-digit number'
  },
  family: {
    label: 'Family Info Lookup',
    placeholder: 'Enter Aadhaar to find family info...',
    url: 'https://family-info.gauravyt342.workers.dev/?aadhar=',
    minLength: 12,
    maxLength: 12,
    errorMsg: 'Aadhaar must be 12 digits.',
    inputType: 'number',
    info: 'Family (by Aadhaar): 12-digit number'
  },
  gst: { 
    label: 'GSTIN Lookup',
    placeholder: 'Enter 15-char GSTIN...',
    url: 'https://gst.gauravyt342.workers.dev/?gst=',
    minLength: 15,
    maxLength: 15,
    errorMsg: 'GSTIN must be 15 characters.',
    inputTransform: (v) => v.toUpperCase(),
    info: 'GST: 15-char alphanumeric'
  },
  telegram: { 
    label: 'Telegram Lookup',
    placeholder: 'Enter Telegram User ID...',
    url: 'https://telegram.gauravyt342.workers.dev/?user=',
    minLength: 1,
    maxLength: 50,
    errorMsg: 'Invalid Telegram User ID.',
    info: 'Telegram: User/ID'
  },
  ifsc: { 
    label: 'IFSC Lookup',
    placeholder: 'Enter 11-char IFSC Code...',
    url: 'https://ifsc.gauravyt342.workers.dev/?ifsc=',
    minLength: 11,
    maxLength: 11,
    errorMsg: 'IFSC must be 11 characters.',
    inputTransform: (v) => v.toUpperCase(),
    info: 'IFSC: 11-char alphanumeric'
  },
  vehicle: { 
    label: 'Vehicle RC Lookup',
    placeholder: 'Enter Vehicle RC Number...',
    url: 'https://vehicleinfo-v2.zerovault.workers.dev/?vehicle_number=',
    minLength: 4,
    maxLength: 15,
    errorMsg: 'Invalid Vehicle RC format.',
    inputTransform: (v) => v.toUpperCase(),
    info: 'Vehicle RC: 10-15 char alphanumeric'
  },
};
