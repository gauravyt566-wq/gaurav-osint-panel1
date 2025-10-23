
import React from 'react';

export type LookupKey = 'mobile' | 'aadhaar' | 'family' | 'gst' | 'telegram' | 'ifsc' | 'vehicle';

export interface TabConfig {
  label: string;
  placeholder: string;
  url: string;
  minLength: number;
  maxLength: number;
  errorMsg: string;
  inputType?: 'text' | 'number';
  inputTransform?: (value: string) => string;
  info: string;
}

export type ApiData = Record<string, any> | null;

export interface RecentSearch {
    query: string;
    type: LookupKey;
    status: 'Found' | 'Not Found';
    timestamp: Date;
}

export interface Stats {
    total: number;
    successRate: number;
    avgResponse: number;
}
