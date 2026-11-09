import { SectorIndexData } from '../types/indexTracker';

// 62 Institutional Sector Rotation Clusters mapped across NSE 500, BSE 500 & New-Age IPOs
export const PREBUILT_SECTOR_INDICES: SectorIndexData[] = [
  {
    "id": "quick-commerce-consumer-tech",
    "name": "Quick Commerce, Food Delivery & Consumer Tech",
    "category": "New-Age & Tech",
    "companiesCount": 7,
    "change1D": 0.38,
    "change1W": 3.27,
    "change1M": -8,
    "change1Y": -19.2,
    "currentReturn": 3.27,
    "breadthPositivePct": 57,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "ETERNAL",
        "name": "Eternal Ltd (Zomato & Blinkit)",
        "price": 360.45,
        "change1D": -0.74,
        "change1W": 4.78,
        "marketCapCr": 248000,
        "pe": 118,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "ET"
      },
      {
        "ticker": "SWIGGY",
        "name": "Swiggy Limited (Instamart)",
        "price": 188.8,
        "change1D": -1.24,
        "change1W": 6.23,
        "marketCapCr": 98500,
        "pe": 85,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "SW"
      },
      {
        "ticker": "NYKAA",
        "name": "FSN E-Commerce Ventures (Nykaa)",
        "price": 352.65,
        "change1D": -0.1,
        "change1W": -0.28,
        "marketCapCr": 51200,
        "pe": 145,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "NY"
      },
      {
        "ticker": "FIRSTCRY",
        "name": "Brainbees Solutions (FirstCry)",
        "price": 160.83,
        "change1D": 0.76,
        "change1W": -0.03,
        "marketCapCr": 31400,
        "pe": 95,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "FI"
      },
      {
        "ticker": "NAUKRI",
        "name": "Info Edge (India) Ltd",
        "price": 1188.1,
        "change1D": -0.32,
        "change1W": -0.35,
        "marketCapCr": 102000,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "NA"
      },
      {
        "ticker": "HONASA",
        "name": "Honasa Consumer (Mamaearth)",
        "price": 484.95,
        "change1D": 3.98,
        "change1W": 7.11,
        "marketCapCr": 11800,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "HO"
      },
      {
        "ticker": "ZAGGLE",
        "name": "Zaggle Prepaid Ocean Services",
        "price": 165.78,
        "change1D": 0.33,
        "change1W": 5.46,
        "marketCapCr": 6400,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "ZA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 101.13,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.68,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.52,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 101.33,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.11,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.39,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.98,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.66,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.98,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.33,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.43,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.97,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 99.86,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.24,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 99.17,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 98.24,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 97.09,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 97.38,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.24,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 96.9,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 97.07,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.58,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 96.93,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 96.82,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 95.26,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 94.73,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 95.23,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 96.06,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 96.94,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 98.08,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 98.76,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 96.28,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 96.3,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 95.34,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 94.18,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 92.38,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 90.93,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 92.09,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 94.69,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 94.32,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 91.54,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 92.78,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 92.21,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 92.88,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 92.68,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 92.69,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 93.71,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 91.23,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 90,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 88.05,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 85.35,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 87.3,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 89.57,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.73,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.54,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 88.17,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.2,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 89.42,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 90.31,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 92.38,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 91.62,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 92,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "fintech-payments-insurtech",
    "name": "Fintech, Digital Payments & Insurtech",
    "category": "New-Age & Tech",
    "companiesCount": 7,
    "change1D": 0.2,
    "change1W": 4.97,
    "change1M": -10.21,
    "change1Y": -24.5,
    "currentReturn": 4.97,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "PAYTM",
        "name": "One 97 Communications (Paytm)",
        "price": 1776,
        "change1D": -1.03,
        "change1W": 7.64,
        "marketCapCr": 58400,
        "pe": 75,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "PA"
      },
      {
        "ticker": "POLICYBZR",
        "name": "PB Fintech (Policybazaar)",
        "price": 951.6,
        "change1D": -1.59,
        "change1W": 2.21,
        "marketCapCr": 82600,
        "pe": 132,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "PO"
      },
      {
        "ticker": "JIOFIN",
        "name": "Jio Financial Services Ltd",
        "price": 229.33,
        "change1D": -0.81,
        "change1W": 7.54,
        "marketCapCr": 208000,
        "pe": 115,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "JI"
      },
      {
        "ticker": "MOBIKWIK",
        "name": "One MobiKwik Systems Ltd",
        "price": 226.48,
        "change1D": 0.74,
        "change1W": 0.28,
        "marketCapCr": 4200,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "MO"
      },
      {
        "ticker": "CMSINFO",
        "name": "CMS Info Systems Ltd",
        "price": 215.41,
        "change1D": -0.27,
        "change1W": 2.31,
        "marketCapCr": 9400,
        "pe": 24.5,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "CM"
      },
      {
        "ticker": "FINOPB",
        "name": "Fino Payments Bank Ltd",
        "price": 123.48,
        "change1D": 0.72,
        "change1W": 6.14,
        "marketCapCr": 3100,
        "pe": 29,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "FI"
      },
      {
        "ticker": "AFFLE",
        "name": "Affle (India) Limited",
        "price": 1637.1,
        "change1D": 3.61,
        "change1W": 8.67,
        "marketCapCr": 22800,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "AF"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 101.81,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101.08,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.77,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.81,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.06,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.68,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.18,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.85,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 99.04,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.11,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.59,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.52,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.91,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 97.22,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.02,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.07,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.05,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.53,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.37,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 96.68,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.8,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.59,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 96.48,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 97.67,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 95.04,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.48,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 96.03,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.03,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 97.89,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 97.93,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 97.82,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 90.93,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 89.64,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 88.07,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 87.24,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 86.62,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 84.93,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 85.4,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 89.23,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 90.31,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 89.01,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.94,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.12,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 90.47,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 90.06,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 89.2,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 88.8,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 87.56,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 85.71,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 85.64,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 82.94,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 83.25,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 83.59,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 84.24,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 85.13,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 82.9,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 85.46,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 86.39,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 88.05,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 89.32,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 89.52,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 89.79,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "online-travel-marketplaces",
    "name": "Online Travel, Marketplaces & B2B Platforms",
    "category": "New-Age & Tech",
    "companiesCount": 7,
    "change1D": -0.85,
    "change1W": 2.87,
    "change1M": -9.03,
    "change1Y": -21.67,
    "currentReturn": 2.87,
    "breadthPositivePct": 57,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "IXIGO",
        "name": "Le Travenues Technology (ixigo)",
        "price": 163.63,
        "change1D": -1.36,
        "change1W": 14.43,
        "marketCapCr": 6400,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "IX"
      },
      {
        "ticker": "TBOTEK",
        "name": "TBO Tek Limited",
        "price": 1546.7,
        "change1D": -1.15,
        "change1W": -2.94,
        "marketCapCr": 18900,
        "pe": 74,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "TB"
      },
      {
        "ticker": "EASEMYTRIP",
        "name": "Easy Trip Planners Ltd",
        "price": 6,
        "change1D": -0.33,
        "change1W": -2.44,
        "marketCapCr": 6200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "EA"
      },
      {
        "ticker": "CARTRADE",
        "name": "CarTrade Tech Limited",
        "price": 2707.7,
        "change1D": 0.29,
        "change1W": 19.45,
        "marketCapCr": 6800,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "CA"
      },
      {
        "ticker": "INDIAMART",
        "name": "IndiaMART InterMESH Ltd",
        "price": 1551.7,
        "change1D": 0.3,
        "change1W": 3.32,
        "marketCapCr": 16400,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "IN"
      },
      {
        "ticker": "JUSTDIAL",
        "name": "Just Dial Limited",
        "price": 679.5,
        "change1D": 0.27,
        "change1W": 1.68,
        "marketCapCr": 9200,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "JU"
      },
      {
        "ticker": "RATEGAIN",
        "name": "RateGain Travel Technologies",
        "price": 697.5,
        "change1D": -3.97,
        "change1W": -13.42,
        "marketCapCr": 8900,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "RA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.34,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.27,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 97.62,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.59,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.41,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.82,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.67,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.44,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.16,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.47,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.33,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.88,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.6,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.8,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.33,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 97.56,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 98.36,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 98.03,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.22,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 98.98,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 97.56,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 96.24,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 96.99,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.14,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 95.54,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 95.67,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 96.53,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 95.72,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 96.24,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 97.1,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 95.45,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 95.69,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 94.36,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 94.75,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 95.54,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 94.13,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 94.48,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 94.93,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 95.1,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 92.93,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 93.94,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 94.41,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 94.93,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.03,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 93.11,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 94.33,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 94.82,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 93.71,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 92.31,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 90.81,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 90.54,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 91.71,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 89.61,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 88.96,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 86.39,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 88.84,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 90.14,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 90.12,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 92.78,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 91.68,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 90.97,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "data-centers-ai-cloud",
    "name": "Data Centers, AI Compute & Cloud Infra",
    "category": "New-Age & Tech",
    "companiesCount": 7,
    "change1D": 1.02,
    "change1W": 2.31,
    "change1M": -12.25,
    "change1Y": -29.4,
    "currentReturn": 2.31,
    "breadthPositivePct": 71,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "NETWEB",
        "name": "Netweb Technologies India Ltd",
        "price": 3845.1,
        "change1D": 1.95,
        "change1W": -5.97,
        "marketCapCr": 14800,
        "pe": 112,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "NE"
      },
      {
        "ticker": "ANANTRAJ",
        "name": "Anant Raj Limited (Data Centers)",
        "price": 449.5,
        "change1D": 0.91,
        "change1W": 0.38,
        "marketCapCr": 26400,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "AN"
      },
      {
        "ticker": "E2E",
        "name": "E2E Networks Limited (Cloud GPU)",
        "price": 494.35,
        "change1D": 1.5,
        "change1W": -0.42,
        "marketCapCr": 6100,
        "pe": 125,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "E2"
      },
      {
        "ticker": "BBOX",
        "name": "Black Box Limited",
        "price": 826.75,
        "change1D": 1.95,
        "change1W": 4.74,
        "marketCapCr": 9800,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "BB"
      },
      {
        "ticker": "TECHNOE",
        "name": "Techno Electric & Engg Co",
        "price": 941.35,
        "change1D": 1.38,
        "change1W": 11.72,
        "marketCapCr": 18200,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "TE"
      },
      {
        "ticker": "AURIONPRO",
        "name": "Aurionpro Solutions Ltd",
        "price": 579.9,
        "change1D": 0.2,
        "change1W": 5.56,
        "marketCapCr": 9400,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "AU"
      },
      {
        "ticker": "TANLA",
        "name": "Tanla Platforms Limited",
        "price": 646.55,
        "change1D": -0.76,
        "change1W": 0.17,
        "marketCapCr": 11600,
        "pe": 21,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "TA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.77,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.87,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.46,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 100.83,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.88,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 101.29,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.84,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.46,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.23,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.32,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.94,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.56,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.14,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.45,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 97.22,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.15,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.44,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.01,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 96.05,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.43,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.51,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 95.27,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.07,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 96.12,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.64,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 93.23,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 94.45,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 95.76,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 95.75,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 95.91,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 97.47,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 96.42,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 96.19,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 94.29,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 95.54,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 94.86,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.54,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 94.54,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 96.96,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 98.41,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 96.09,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 96.65,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 98.91,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 99.58,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 100.87,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 96.98,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 97.29,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 94.63,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 92.34,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 91.32,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 86.55,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 86.91,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 87.27,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 87.34,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.03,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 85.99,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 85.82,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 86.74,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 88.33,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 90.09,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 86.89,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 87.75,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "dairy-value-added-food",
    "name": "Dairy & Value-Added Milk Products",
    "category": "Consumer & Retail",
    "companiesCount": 7,
    "change1D": -0.48,
    "change1W": 5.11,
    "change1M": 6.47,
    "change1Y": 15.53,
    "currentReturn": 5.11,
    "breadthPositivePct": 57,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "MILKYMIST",
        "name": "Milky Mist Dairy Food Ltd",
        "price": 297.75,
        "change1D": 0.19,
        "change1W": -1.91,
        "marketCapCr": 9800,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "MI"
      },
      {
        "ticker": "DODLA",
        "name": "Dodla Dairy Limited",
        "price": 975.2,
        "change1D": -0.55,
        "change1W": -4.68,
        "marketCapCr": 7800,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "DO"
      },
      {
        "ticker": "HATSUN",
        "name": "Hatsun Agro Product Ltd",
        "price": 1048.35,
        "change1D": -1.85,
        "change1W": 5.22,
        "marketCapCr": 24600,
        "pe": 78,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "HA"
      },
      {
        "ticker": "HERITGFOOD",
        "name": "Heritage Foods Limited",
        "price": 374.3,
        "change1D": 0.43,
        "change1W": 3.34,
        "marketCapCr": 5400,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "HE"
      },
      {
        "ticker": "PARAGMILK",
        "name": "Parag Milk Foods Ltd (Gowardhan)",
        "price": 324.89,
        "change1D": -0.92,
        "change1W": 34.04,
        "marketCapCr": 2650,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "PA"
      },
      {
        "ticker": "VADILALIND",
        "name": "Vadilal Industries Ltd",
        "price": 7083.5,
        "change1D": -0.34,
        "change1W": -4.68,
        "marketCapCr": 3200,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "VA"
      },
      {
        "ticker": "BECTORFOOD",
        "name": "Mrs. Bectors Food Specialities",
        "price": 209.31,
        "change1D": -0.35,
        "change1W": 4.43,
        "marketCapCr": 10400,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "BE"
      }
    ],
    "history": [
      {
        "date": "18 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "19 Aug",
        "value": 101.57,
        "volume": 4510000
      },
      {
        "date": "20 Aug",
        "value": 99.98,
        "volume": 4820000
      },
      {
        "date": "21 Aug",
        "value": 102.61,
        "volume": 5130000
      },
      {
        "date": "24 Aug",
        "value": 102.81,
        "volume": 5440000
      },
      {
        "date": "25 Aug",
        "value": 103.16,
        "volume": 5750000
      },
      {
        "date": "26 Aug",
        "value": 105.4,
        "volume": 6060000
      },
      {
        "date": "27 Aug",
        "value": 104.27,
        "volume": 6370000
      },
      {
        "date": "28 Aug",
        "value": 105.37,
        "volume": 6680000
      },
      {
        "date": "31 Aug",
        "value": 106.49,
        "volume": 6990000
      },
      {
        "date": "1 Sep",
        "value": 110.6,
        "volume": 7300000
      },
      {
        "date": "2 Sep",
        "value": 111.77,
        "volume": 7610000
      },
      {
        "date": "3 Sep",
        "value": 111.36,
        "volume": 7920000
      },
      {
        "date": "4 Sep",
        "value": 111.55,
        "volume": 4430000
      },
      {
        "date": "7 Sep",
        "value": 113.83,
        "volume": 4740000
      },
      {
        "date": "8 Sep",
        "value": 113.79,
        "volume": 5050000
      },
      {
        "date": "9 Sep",
        "value": 112.82,
        "volume": 5360000
      },
      {
        "date": "10 Sep",
        "value": 114.44,
        "volume": 5670000
      },
      {
        "date": "11 Sep",
        "value": 114.96,
        "volume": 5980000
      },
      {
        "date": "15 Sep",
        "value": 113.88,
        "volume": 6290000
      },
      {
        "date": "16 Sep",
        "value": 113.38,
        "volume": 6600000
      },
      {
        "date": "17 Sep",
        "value": 114.59,
        "volume": 6910000
      },
      {
        "date": "18 Sep",
        "value": 115.2,
        "volume": 7220000
      },
      {
        "date": "21 Sep",
        "value": 117.37,
        "volume": 7530000
      },
      {
        "date": "22 Sep",
        "value": 119.21,
        "volume": 7840000
      },
      {
        "date": "23 Sep",
        "value": 117.99,
        "volume": 4350000
      },
      {
        "date": "24 Sep",
        "value": 117.94,
        "volume": 4660000
      },
      {
        "date": "25 Sep",
        "value": 117.57,
        "volume": 4970000
      },
      {
        "date": "28 Sep",
        "value": 118.37,
        "volume": 5280000
      },
      {
        "date": "29 Sep",
        "value": 118.96,
        "volume": 5590000
      },
      {
        "date": "30 Sep",
        "value": 119.22,
        "volume": 5900000
      },
      {
        "date": "1 Oct",
        "value": 117.99,
        "volume": 6210000
      },
      {
        "date": "5 Oct",
        "value": 115.84,
        "volume": 6520000
      },
      {
        "date": "6 Oct",
        "value": 118.06,
        "volume": 6830000
      },
      {
        "date": "7 Oct",
        "value": 117.88,
        "volume": 7140000
      },
      {
        "date": "8 Oct",
        "value": 116.22,
        "volume": 7450000
      },
      {
        "date": "9 Oct",
        "value": 115.76,
        "volume": 7760000
      },
      {
        "date": "12 Oct",
        "value": 115.04,
        "volume": 4270000
      },
      {
        "date": "13 Oct",
        "value": 116.1,
        "volume": 4580000
      },
      {
        "date": "14 Oct",
        "value": 118.02,
        "volume": 4890000
      },
      {
        "date": "15 Oct",
        "value": 118.42,
        "volume": 5200000
      },
      {
        "date": "16 Oct",
        "value": 115.59,
        "volume": 5510000
      },
      {
        "date": "19 Oct",
        "value": 115.1,
        "volume": 5820000
      },
      {
        "date": "21 Oct",
        "value": 114.02,
        "volume": 6130000
      },
      {
        "date": "22 Oct",
        "value": 114.06,
        "volume": 6440000
      },
      {
        "date": "23 Oct",
        "value": 114.91,
        "volume": 6750000
      },
      {
        "date": "26 Oct",
        "value": 114.71,
        "volume": 7060000
      },
      {
        "date": "27 Oct",
        "value": 115.29,
        "volume": 7370000
      },
      {
        "date": "28 Oct",
        "value": 113.57,
        "volume": 7680000
      },
      {
        "date": "29 Oct",
        "value": 111.96,
        "volume": 7990000
      },
      {
        "date": "30 Oct",
        "value": 109.98,
        "volume": 4500000
      },
      {
        "date": "2 Nov",
        "value": 106.72,
        "volume": 4810000
      },
      {
        "date": "3 Nov",
        "value": 105.64,
        "volume": 5120000
      },
      {
        "date": "4 Nov",
        "value": 106.93,
        "volume": 5430000
      },
      {
        "date": "5 Nov",
        "value": 106.35,
        "volume": 5740000
      },
      {
        "date": "6 Nov",
        "value": 107.56,
        "volume": 6050000
      },
      {
        "date": "9 Nov",
        "value": 106.47,
        "volume": 6360000
      }
    ]
  },
  {
    "id": "jewellery-luxury-watches",
    "name": "Jewellery, Gold Retail & Luxury Watches",
    "category": "Consumer & Retail",
    "companiesCount": 7,
    "change1D": 1.42,
    "change1W": 7.73,
    "change1M": -3.86,
    "change1Y": -9.26,
    "currentReturn": 7.73,
    "breadthPositivePct": 86,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "TITAN",
        "name": "Titan Company Limited (Tanishq)",
        "price": 4990.2,
        "change1D": -0.2,
        "change1W": 11.48,
        "marketCapCr": 305000,
        "pe": 84,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "TI"
      },
      {
        "ticker": "KALYANKJIL",
        "name": "Kalyan Jewellers India Ltd",
        "price": 608,
        "change1D": 2.92,
        "change1W": 20.29,
        "marketCapCr": 72400,
        "pe": 92,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "KA"
      },
      {
        "ticker": "SENCO",
        "name": "Senco Gold Limited",
        "price": 321.2,
        "change1D": 0.2,
        "change1W": 7.48,
        "marketCapCr": 9800,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "SE"
      },
      {
        "ticker": "PNGJL",
        "name": "P N Gadgil Jewellers Ltd",
        "price": 603.5,
        "change1D": 2.36,
        "change1W": 4.83,
        "marketCapCr": 10200,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "PN"
      },
      {
        "ticker": "THANGAMAYL",
        "name": "Thangamayil Jewellery Ltd",
        "price": 4160,
        "change1D": 0.28,
        "change1W": -7.9,
        "marketCapCr": 6100,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "TH"
      },
      {
        "ticker": "ETHOSLTD",
        "name": "Ethos Limited (Luxury Watches)",
        "price": 2819.8,
        "change1D": 5.16,
        "change1W": 9.47,
        "marketCapCr": 7400,
        "pe": 76,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "ET"
      },
      {
        "ticker": "SKYGOLD",
        "name": "Sky Gold Limited",
        "price": 944.7,
        "change1D": -0.76,
        "change1W": 8.49,
        "marketCapCr": 5200,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "SK"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.93,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.28,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 97.91,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.11,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.19,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.96,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.39,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.41,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.22,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.66,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.18,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 100.08,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.43,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.17,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.05,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.55,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.14,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 95.61,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.47,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.94,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 98.88,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 97.71,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 97.29,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 96.65,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 94.32,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 93.99,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 93.91,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94.58,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 94.06,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 94.75,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 95.58,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 93.59,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 93.9,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 92.15,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 93.02,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 91.92,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 90.26,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.24,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 92.06,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 92.87,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 92.79,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 93.85,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 94.95,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 95.62,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 94.78,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 94.64,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 97.57,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 96.27,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 95.04,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 93.37,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 92.03,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 89.39,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 90.34,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.7,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.74,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 88.01,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.2,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 89.99,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 92.36,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 94.63,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 94.83,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 96.14,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "alcoholic-beverages-breweries",
    "name": "Alcoholic Beverages, Spirits & Breweries",
    "category": "Consumer & Retail",
    "companiesCount": 7,
    "change1D": 1.03,
    "change1W": 5.44,
    "change1M": -5.41,
    "change1Y": -12.98,
    "currentReturn": 5.44,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "UNITDSPR",
        "name": "United Spirits Ltd (Diageo)",
        "price": 1422.5,
        "change1D": 0.32,
        "change1W": 5.67,
        "marketCapCr": 108000,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "UN"
      },
      {
        "ticker": "RADICO",
        "name": "Radico Khaitan Limited",
        "price": 4512.1,
        "change1D": -0.07,
        "change1W": 10.05,
        "marketCapCr": 31200,
        "pe": 94,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "RA"
      },
      {
        "ticker": "UBL",
        "name": "United Breweries Limited",
        "price": 1224.9,
        "change1D": 2.96,
        "change1W": 3.97,
        "marketCapCr": 52800,
        "pe": 98,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "UB"
      },
      {
        "ticker": "ABDL",
        "name": "Allied Blenders and Distillers",
        "price": 711.25,
        "change1D": 0.46,
        "change1W": 0.42,
        "marketCapCr": 10400,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "AB"
      },
      {
        "ticker": "SULA",
        "name": "Sula Vineyards Limited",
        "price": 140.69,
        "change1D": 2.1,
        "change1W": 9.87,
        "marketCapCr": 3800,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SU"
      },
      {
        "ticker": "TI",
        "name": "Tilaknagar Industries Ltd",
        "price": 485.8,
        "change1D": 0.06,
        "change1W": 3.02,
        "marketCapCr": 6400,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "TI"
      },
      {
        "ticker": "GLOBUSSPR",
        "name": "Globus Spirits Limited",
        "price": 703,
        "change1D": 1.41,
        "change1W": 5.07,
        "marketCapCr": 3400,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "GL"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.35,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.15,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.32,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 101.01,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 101.83,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 101.78,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 101.06,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 101.24,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.04,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 101.39,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 102.19,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 101.32,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.69,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 100.89,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.06,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.48,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.98,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.42,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 98.81,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.7,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.92,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 95.61,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.61,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.21,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 93.96,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 95.66,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 95.71,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 96.65,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 97.16,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 96.55,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 99.01,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 99.56,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 99.39,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 97.97,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 96.19,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 95.18,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.86,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 94.79,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 96.32,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 95.7,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 94.37,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 95.51,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 95.46,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 96.45,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 97.99,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 98.04,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 98.04,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 97.25,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 92.55,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 91.77,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 89.2,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 88.86,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 90.52,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 90.91,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 91.83,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 89.74,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.9,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 90.4,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 92.24,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 93.51,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 93.68,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 94.59,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "retail-apparel",
    "name": "Retail - Apparel, Department & Fashion",
    "category": "Consumer & Retail",
    "companiesCount": 8,
    "change1D": -0.1,
    "change1W": -0.13,
    "change1M": -3.33,
    "change1Y": -7.99,
    "currentReturn": -0.13,
    "breadthPositivePct": 50,
    "rotationStatus": "Weakening",
    "stocks": [
      {
        "ticker": "TRENT",
        "name": "Trent Ltd (Westside & Zudio)",
        "price": 3036.6,
        "change1D": -1.38,
        "change1W": -0.32,
        "marketCapCr": 243000,
        "pe": 145,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "TR"
      },
      {
        "ticker": "DMART",
        "name": "Avenue Supermarts Ltd (DMart)",
        "price": 3429.1,
        "change1D": 0.12,
        "change1W": 6.16,
        "marketCapCr": 268000,
        "pe": 96,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "DM"
      },
      {
        "ticker": "ABFRL",
        "name": "Aditya Birla Fashion & Retail",
        "price": 38.76,
        "change1D": -0.67,
        "change1W": -1.27,
        "marketCapCr": 31400,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AB"
      },
      {
        "ticker": "MANYAVAR",
        "name": "Vedant Fashions Ltd (Manyavar)",
        "price": 473.35,
        "change1D": 0.12,
        "change1W": -4.35,
        "marketCapCr": 28600,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "MA"
      },
      {
        "ticker": "PAGEIND",
        "name": "Page Industries Ltd (Jockey)",
        "price": 36365,
        "change1D": 1.21,
        "change1W": 2.44,
        "marketCapCr": 48200,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "PA"
      },
      {
        "ticker": "RAYMOND",
        "name": "Raymond Limited",
        "price": 1053.5,
        "change1D": -2.63,
        "change1W": -6.36,
        "marketCapCr": 12400,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "RA"
      },
      {
        "ticker": "KKCL",
        "name": "Kewal Kiran Clothing (Killer)",
        "price": 425.55,
        "change1D": 2,
        "change1W": 2.3,
        "marketCapCr": 4100,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "KK"
      },
      {
        "ticker": "ARVIND",
        "name": "Arvind Limited",
        "price": 496.75,
        "change1D": 0.4,
        "change1W": 0.36,
        "marketCapCr": 9800,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "AR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.99,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.19,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.81,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.82,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.86,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.13,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.73,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.09,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 97.2,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.74,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 96.79,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 96.51,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 95.86,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 96.32,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 96.56,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.27,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.97,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 98.86,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 99.92,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.93,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 101.56,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 100.47,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 100.83,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 103.61,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 101.76,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 101.4,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 101.78,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 102.03,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 103.58,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 104.1,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 104.29,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 105.49,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 105.43,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 104.39,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 103.74,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 104.13,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 103.26,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 104.62,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 106.15,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 103.93,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 101.52,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 102.05,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 100.76,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 101.75,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 102.83,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 101.26,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 101.16,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 99.38,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 96.92,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 95.25,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 93.85,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 93.78,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 95.29,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 95.29,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 96.45,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 96.26,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 97.58,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 99.39,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 99.66,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 99.7,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 97.05,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 96.67,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "retail-qsr",
    "name": "Retail - QSR & Restaurant Chains",
    "category": "Consumer & Retail",
    "companiesCount": 6,
    "change1D": -0.62,
    "change1W": 5.77,
    "change1M": -5.53,
    "change1Y": -13.27,
    "currentReturn": 5.77,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "JUBLFOOD",
        "name": "Jubilant FoodWorks (Domino's)",
        "price": 429.5,
        "change1D": -6.06,
        "change1W": 0.87,
        "marketCapCr": 40200,
        "pe": 92,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "JU"
      },
      {
        "ticker": "DEVYANI",
        "name": "Devyani International (KFC/PizzaHut)",
        "price": 126.83,
        "change1D": -1.41,
        "change1W": 8.7,
        "marketCapCr": 20700,
        "pe": 110,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "DE"
      },
      {
        "ticker": "WESTLIFE",
        "name": "Westlife Foodworld (McDonald's)",
        "price": 670.5,
        "change1D": 2.28,
        "change1W": 9.68,
        "marketCapCr": 12300,
        "pe": 125,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "WE"
      },
      {
        "ticker": "SAPPHIRE",
        "name": "Sapphire Foods India (KFC/TacoBell)",
        "price": 208.79,
        "change1D": -0.6,
        "change1W": 8.62,
        "marketCapCr": 10800,
        "pe": 98,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "SA"
      },
      {
        "ticker": "RBA",
        "name": "Restaurant Brands Asia (Burger King)",
        "price": 87.92,
        "change1D": -0.79,
        "change1W": 1.19,
        "marketCapCr": 5400,
        "pe": 82,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "RB"
      },
      {
        "ticker": "BIKAJI",
        "name": "Bikaji Foods International",
        "price": 490,
        "change1D": 2.87,
        "change1W": 5.59,
        "marketCapCr": 21400,
        "pe": 76,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "BI"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 102.37,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101.86,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 102.86,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 103.92,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 104.16,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 104.74,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 103.55,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 106.32,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 105.56,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 106.95,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 106.98,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 105.69,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 104.28,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 102.46,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 102.82,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 101.2,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 100.25,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.92,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 99.54,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.05,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 99.07,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 100.15,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 98.85,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 99.07,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 97.37,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 97.6,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 99.22,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 100.9,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 100.85,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 100.91,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 101.59,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 98.64,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 98.93,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 97.17,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 96,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 95.3,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.87,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 94.48,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 94.9,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 95.2,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 91.32,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 91.26,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 90.67,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 90.58,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 91.59,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 89.91,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 90.38,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.38,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 86.53,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 86.98,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.84,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 90.1,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 91.8,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 91.36,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 91.23,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 89.43,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.26,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 89.71,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 91.2,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 96.26,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 95.06,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 94.47,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "fmcg-food",
    "name": "FMCG - Packaged Food, Staples & Edibles",
    "category": "Consumer & Retail",
    "companiesCount": 8,
    "change1D": 0.04,
    "change1W": 5.35,
    "change1M": -5.31,
    "change1Y": -12.74,
    "currentReturn": 5.35,
    "breadthPositivePct": 88,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "NESTLEIND",
        "name": "Nestle India Ltd",
        "price": 1266.5,
        "change1D": -1.22,
        "change1W": 5.98,
        "marketCapCr": 225000,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "NE"
      },
      {
        "ticker": "BRITANNIA",
        "name": "Britannia Industries Ltd",
        "price": 4776.9,
        "change1D": -0.17,
        "change1W": 3.06,
        "marketCapCr": 130000,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BR"
      },
      {
        "ticker": "TATACONSUM",
        "name": "Tata Consumer Products Ltd",
        "price": 1091.3,
        "change1D": 0.46,
        "change1W": 6.06,
        "marketCapCr": 97000,
        "pe": 74,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "TA"
      },
      {
        "ticker": "VBL",
        "name": "Varun Beverages Ltd (PepsiCo)",
        "price": 434.55,
        "change1D": -0.79,
        "change1W": 9.42,
        "marketCapCr": 198000,
        "pe": 82,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "VB"
      },
      {
        "ticker": "PATANJALI",
        "name": "Patanjali Foods Limited",
        "price": 421.3,
        "change1D": 2.38,
        "change1W": 14.17,
        "marketCapCr": 64000,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "PA"
      },
      {
        "ticker": "AWL",
        "name": "Adani Wilmar Limited",
        "price": 166.86,
        "change1D": -0.08,
        "change1W": 0.66,
        "marketCapCr": 42800,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "AW"
      },
      {
        "ticker": "LTFOODS",
        "name": "LT Foods Limited (Daawat)",
        "price": 418.95,
        "change1D": -0.32,
        "change1W": 6.43,
        "marketCapCr": 13400,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "LT"
      },
      {
        "ticker": "ZYDUSWELL",
        "name": "Zydus Wellness Limited",
        "price": 468.95,
        "change1D": 0.07,
        "change1W": -2.97,
        "marketCapCr": 12800,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "ZY"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.44,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.91,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.79,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.4,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.03,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.6,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.28,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.77,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.67,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.45,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.36,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.59,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.03,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 97.57,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 97.31,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.59,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.53,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.25,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.72,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 96.2,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.5,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.2,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.82,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.32,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 94.11,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 95.39,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 95.28,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 95.4,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 96.93,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 96.21,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 97.61,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 96.32,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 96.47,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 94.87,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 93.36,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 92.64,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 91.47,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.77,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 94.02,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 94.03,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 92.34,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 93.02,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 92.99,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 93.88,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.69,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 94.21,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 93.69,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 92.13,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 90.43,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 88.85,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.45,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 87.81,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 89.24,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.53,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.89,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 88.16,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.72,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 92.48,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 92.96,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 94.61,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 94.57,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 94.69,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "fmcg-personal-care",
    "name": "FMCG - Personal Care, Home & Hygiene",
    "category": "Consumer & Retail",
    "companiesCount": 8,
    "change1D": 0.48,
    "change1W": 6.44,
    "change1M": -5.99,
    "change1Y": -14.38,
    "currentReturn": 6.44,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "HINDUNILVR",
        "name": "Hindustan Unilever Ltd",
        "price": 1994.5,
        "change1D": -0.2,
        "change1W": 5.07,
        "marketCapCr": 582000,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "HI"
      },
      {
        "ticker": "ITC",
        "name": "ITC Limited",
        "price": 280.55,
        "change1D": -0.92,
        "change1W": 5.31,
        "marketCapCr": 597000,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "IT"
      },
      {
        "ticker": "GODREJCP",
        "name": "Godrej Consumer Products Ltd",
        "price": 848.15,
        "change1D": -0.33,
        "change1W": 3.24,
        "marketCapCr": 128000,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "GO"
      },
      {
        "ticker": "DABUR",
        "name": "Dabur India Ltd",
        "price": 376.55,
        "change1D": -1,
        "change1W": 0.71,
        "marketCapCr": 92100,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "DA"
      },
      {
        "ticker": "MARICO",
        "name": "Marico Limited",
        "price": 898.2,
        "change1D": 0.05,
        "change1W": 12.48,
        "marketCapCr": 83400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "MA"
      },
      {
        "ticker": "COLPAL",
        "name": "Colgate-Palmolive (India) Ltd",
        "price": 1693.2,
        "change1D": 0.85,
        "change1W": 7.5,
        "marketCapCr": 86400,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "CO"
      },
      {
        "ticker": "EMAMILTD",
        "name": "Emami Limited",
        "price": 405.15,
        "change1D": 4.64,
        "change1W": 8.85,
        "marketCapCr": 29800,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "EM"
      },
      {
        "ticker": "JYOTHYLAB",
        "name": "Jyothy Labs Limited",
        "price": 200.23,
        "change1D": 0.78,
        "change1W": 8.33,
        "marketCapCr": 18400,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "JY"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.06,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 97.09,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 97.87,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.51,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.74,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 96.56,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.05,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.06,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.1,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.54,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 96.41,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 95.77,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 94.82,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 94.04,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 92.59,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 93.88,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 93.05,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 92.39,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 92.18,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 91.14,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 91.43,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 90.91,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 91.03,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 90.56,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 90.83,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.8,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 92.06,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 92.37,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 92.75,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 92.91,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.45,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 92.73,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 92.67,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 91.83,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 90,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 89.85,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 88.32,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 89.42,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 91.01,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 90.35,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 88.7,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 90.31,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 88.72,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.97,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 91.02,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 90.62,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 90.34,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 89.3,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 89.14,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 87.87,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 86.68,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 86.32,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 86.18,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 86.22,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 87.83,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 86.75,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 88.29,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 91.36,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 92.67,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 93.53,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 93.56,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 94.01,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "footwear-leather",
    "name": "Footwear, Sportswear & Accessories",
    "category": "Consumer & Retail",
    "companiesCount": 6,
    "change1D": 0.58,
    "change1W": 1.24,
    "change1M": -17.31,
    "change1Y": -41.54,
    "currentReturn": 1.24,
    "breadthPositivePct": 50,
    "rotationStatus": "Weakening",
    "stocks": [
      {
        "ticker": "METROBRAND",
        "name": "Metro Brands Ltd",
        "price": 828.5,
        "change1D": 0.48,
        "change1W": -0.08,
        "marketCapCr": 33700,
        "pe": 85,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "ME"
      },
      {
        "ticker": "BATAINDIA",
        "name": "Bata India Ltd",
        "price": 637.35,
        "change1D": -0.11,
        "change1W": -0.06,
        "marketCapCr": 17700,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BA"
      },
      {
        "ticker": "RELAXO",
        "name": "Relaxo Footwears Ltd",
        "price": 294.2,
        "change1D": 0.72,
        "change1W": 2.19,
        "marketCapCr": 19600,
        "pe": 94,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "RE"
      },
      {
        "ticker": "CAMPUS",
        "name": "Campus Activewear Limited",
        "price": 196.86,
        "change1D": -0.57,
        "change1W": 1.13,
        "marketCapCr": 9200,
        "pe": 76,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "CA"
      },
      {
        "ticker": "REDTAPE",
        "name": "Redtape Limited",
        "price": 107.2,
        "change1D": 0.59,
        "change1W": -0.15,
        "marketCapCr": 10400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "RE"
      },
      {
        "ticker": "MIRZAINT",
        "name": "Mirza International Ltd",
        "price": 27.83,
        "change1D": 2.35,
        "change1W": 4.43,
        "marketCapCr": 1200,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "MI"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 97.87,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 97.35,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 97.7,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 96.88,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 96.47,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 96.1,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 95.3,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 94.7,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 94.89,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 94.48,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 94.45,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 94.8,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 93.85,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 94.56,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 94.02,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 93.34,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 91.52,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 91.97,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 92.42,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 91.66,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 90.91,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 90.98,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 90.2,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 89.9,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 89.33,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 88.22,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 88.95,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 87.59,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 87.4,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 87.25,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 87.82,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 86.75,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 86.79,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 86.13,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 85.31,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 84.61,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 83.45,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 82.69,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 83.74,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 83.53,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 82.32,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 82.85,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 82.48,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 83.68,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 84.51,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 83.93,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 85.5,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 84.1,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 82.24,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 81.98,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 80.08,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 79.48,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 81.18,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 81.15,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 81.11,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 79.65,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 81.73,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 81.94,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 82.62,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 83.07,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 82.24,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 82.69,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "hotels-hospitality",
    "name": "Hotels, Resorts & Hospitality",
    "category": "Consumer & Retail",
    "companiesCount": 7,
    "change1D": -0.79,
    "change1W": 3.99,
    "change1M": 3.01,
    "change1Y": 7.22,
    "currentReturn": 3.99,
    "breadthPositivePct": 86,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "INDHOTEL",
        "name": "Indian Hotels Co Ltd (Taj)",
        "price": 892.5,
        "change1D": 0.51,
        "change1W": 8.51,
        "marketCapCr": 105000,
        "pe": 74,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "IN"
      },
      {
        "ticker": "EIHOTEL",
        "name": "EIH Ltd (Oberoi Hotels)",
        "price": 309.25,
        "change1D": -1.21,
        "change1W": 5.13,
        "marketCapCr": 26200,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "EI"
      },
      {
        "ticker": "CHALET",
        "name": "Chalet Hotels Ltd",
        "price": 808,
        "change1D": -0.33,
        "change1W": -1.64,
        "marketCapCr": 18100,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "CH"
      },
      {
        "ticker": "LEMONTREE",
        "name": "Lemon Tree Hotels Ltd",
        "price": 116.95,
        "change1D": -0.37,
        "change1W": 3.61,
        "marketCapCr": 10700,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "LE"
      },
      {
        "ticker": "JUNIPER",
        "name": "Juniper Hotels Limited (Hyatt)",
        "price": 207.71,
        "change1D": -0.16,
        "change1W": 5.53,
        "marketCapCr": 8400,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "JU"
      },
      {
        "ticker": "SAMHI",
        "name": "Samhi Hotels Limited",
        "price": 161.32,
        "change1D": -4.18,
        "change1W": 3.46,
        "marketCapCr": 4600,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SA"
      },
      {
        "ticker": "ITDC",
        "name": "India Tourism Development Corp",
        "price": 631.8,
        "change1D": 0.18,
        "change1W": 3.35,
        "marketCapCr": 5200,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "IT"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.84,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.9,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.16,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.87,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.72,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.81,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.83,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.96,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.4,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.26,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 101.06,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 101.28,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.55,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.98,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 99.17,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.03,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.85,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.04,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 99.05,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.6,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 99.28,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 98.34,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 100.08,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 99.93,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 97.31,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 98.4,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 99.01,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 101.7,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 100.98,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 102.01,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 102.18,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 101.04,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 100.33,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 98.29,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 98.01,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 99.29,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 98.84,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 98.94,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 99.5,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 99.6,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 97.7,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 97.47,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 97.61,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 98.12,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 98.3,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 99.35,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 100.9,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 99.62,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 97.24,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 98.09,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 96.15,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 97.39,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 97.11,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 97.02,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 98.26,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 96.74,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 98.95,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 99.27,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 100.85,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 103.21,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 103.8,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 103.01,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "aviation-airports-tourism",
    "name": "Aviation, Airlines & Airport Infrastructure",
    "category": "Consumer & Retail",
    "companiesCount": 6,
    "change1D": 0.16,
    "change1W": 6.98,
    "change1M": -11.6,
    "change1Y": -27.84,
    "currentReturn": 6.98,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "INDIGO",
        "name": "InterGlobe Aviation (IndiGo)",
        "price": 5422.8,
        "change1D": -0.97,
        "change1W": 10.22,
        "marketCapCr": 168000,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "IN"
      },
      {
        "ticker": "GMRAIRPORT",
        "name": "GMR Airports Infrastructure",
        "price": 97.48,
        "change1D": -1.29,
        "change1W": 9.96,
        "marketCapCr": 94500,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "GM"
      },
      {
        "ticker": "IRCTC",
        "name": "Indian Railway Catering & Tourism",
        "price": 460,
        "change1D": 0.66,
        "change1W": 2.78,
        "marketCapCr": 66400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "IR"
      },
      {
        "ticker": "THOMASCOOK",
        "name": "Thomas Cook (India) Limited",
        "price": 101.3,
        "change1D": 1.02,
        "change1W": 12.44,
        "marketCapCr": 9800,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TH"
      },
      {
        "ticker": "SPICEJET",
        "name": "SpiceJet Limited",
        "price": 7.69,
        "change1D": 1.99,
        "change1W": 1.18,
        "marketCapCr": 6200,
        "pe": 45,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SP"
      },
      {
        "ticker": "TAJGVK",
        "name": "TAJGVK Hotels & Resorts Ltd",
        "price": 324.6,
        "change1D": -0.48,
        "change1W": 5.3,
        "marketCapCr": 2400,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "TA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.97,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.97,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.35,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 96.61,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 95.76,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 95.23,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 94.27,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 94.28,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 95.97,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 95.71,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 95.42,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 95.29,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 94.92,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 94.3,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 92.95,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 91.36,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 91.11,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 91.24,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 92.24,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 91.82,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 91.67,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 91.34,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 90.71,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 89.95,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 86.45,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 86.12,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 87.52,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 89.94,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 90.58,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 90.39,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 91.72,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 89.95,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 90.13,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 88.31,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 88.48,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 89.15,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 87.59,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 87.08,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 88.02,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 87.46,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 85.71,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 86.44,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 86.42,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 86.49,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 86.63,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 86.58,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 86.17,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 85.16,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 83.63,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 82.84,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 80.48,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 81.12,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 82.06,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 82.11,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 81.25,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 80.49,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 82.39,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 82.68,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 84.48,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 87.72,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 88.39,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 88.4,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "ac-cooling-hvac",
    "name": "Air Conditioning, Cooling & HVAC Systems",
    "category": "Consumer & Retail",
    "companiesCount": 7,
    "change1D": -0.9,
    "change1W": 1.14,
    "change1M": -12.48,
    "change1Y": -29.95,
    "currentReturn": 1.14,
    "breadthPositivePct": 57,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "VOLTAS",
        "name": "Voltas Ltd (Tata Cooling)",
        "price": 1022,
        "change1D": -7.01,
        "change1W": -1.43,
        "marketCapCr": 56900,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "VO"
      },
      {
        "ticker": "BLUESTARCO",
        "name": "Blue Star Limited",
        "price": 1552.6,
        "change1D": -1.42,
        "change1W": -2.6,
        "marketCapCr": 38800,
        "pe": 82,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BL"
      },
      {
        "ticker": "AMBER",
        "name": "Amber Enterprises India Ltd",
        "price": 6194.5,
        "change1D": -3.26,
        "change1W": -0.46,
        "marketCapCr": 21400,
        "pe": 112,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AM"
      },
      {
        "ticker": "PGEL",
        "name": "PG Electroplast Limited",
        "price": 548.35,
        "change1D": 0.4,
        "change1W": 2.87,
        "marketCapCr": 16200,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "PG"
      },
      {
        "ticker": "EPACK",
        "name": "EPACK Durable Limited",
        "price": 156.73,
        "change1D": 1.07,
        "change1W": 3.04,
        "marketCapCr": 3800,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "EP"
      },
      {
        "ticker": "SYMPHONY",
        "name": "Symphony Limited",
        "price": 524.45,
        "change1D": 2.38,
        "change1W": 4.34,
        "marketCapCr": 10600,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SY"
      },
      {
        "ticker": "WHIRLPOOL",
        "name": "Whirlpool of India Limited",
        "price": 839.7,
        "change1D": 1.57,
        "change1W": 2.25,
        "marketCapCr": 24800,
        "pe": 74,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "WH"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.39,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 97.97,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.92,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.43,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.86,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.03,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 95.81,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 96.5,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.59,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.16,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 96.15,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 95.67,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.48,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 95.86,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 94.86,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 94.47,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 92.99,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 93.66,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 94.26,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 93.86,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 93.64,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 93.12,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 93.72,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 93.11,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 89.91,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 89.61,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 90.9,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 90.6,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 91.52,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 90.01,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.37,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 91.8,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 93.87,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.73,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 91.04,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 90.77,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 88.42,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 89,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 91.37,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 90.35,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 87.72,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.32,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.05,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.41,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 90.46,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 90.42,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.87,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.8,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 86.67,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 85.45,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 82.33,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 83.04,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 84.98,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 87.91,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.2,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 85.9,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 86.69,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 86.85,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 87.74,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 89.14,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 88.37,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 87.52,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "consumer-durables",
    "name": "Consumer Durables, Appliances & FMEG",
    "category": "Consumer & Retail",
    "companiesCount": 6,
    "change1D": 1.64,
    "change1W": 8.71,
    "change1M": -10.93,
    "change1Y": -26.23,
    "currentReturn": 8.71,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "HAVELLS",
        "name": "Havells India Ltd",
        "price": 1152.2,
        "change1D": 2.15,
        "change1W": 12.02,
        "marketCapCr": 115000,
        "pe": 78,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "HA"
      },
      {
        "ticker": "CROMPTON",
        "name": "Crompton Greaves Consumer",
        "price": 220.82,
        "change1D": 2.39,
        "change1W": 13.24,
        "marketCapCr": 27100,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "CR"
      },
      {
        "ticker": "VGUARD",
        "name": "V-Guard Industries Limited",
        "price": 300.9,
        "change1D": 2.96,
        "change1W": 7.66,
        "marketCapCr": 19400,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "VG"
      },
      {
        "ticker": "BAJAJELEC",
        "name": "Bajaj Electricals Limited",
        "price": 277.7,
        "change1D": 0.63,
        "change1W": 3.75,
        "marketCapCr": 10200,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "BA"
      },
      {
        "ticker": "ORIENTELEC",
        "name": "Orient Electric Limited",
        "price": 201.61,
        "change1D": 1,
        "change1W": 10.49,
        "marketCapCr": 5400,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "OR"
      },
      {
        "ticker": "IFBIND",
        "name": "IFB Industries Limited",
        "price": 1110,
        "change1D": 0.73,
        "change1W": 5.09,
        "marketCapCr": 7800,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "IF"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.51,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.81,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.93,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 100.03,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.63,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.96,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 99.22,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.29,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 99.59,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.67,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.7,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 96.5,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 95.82,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 96.51,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 95.24,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 94.51,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 94.99,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 94.47,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94.52,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 93.94,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 93.21,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 93.02,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 92.84,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 91.07,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 90.5,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 90.68,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 90.94,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 90.56,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 89.59,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 90.52,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 88.63,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 88.18,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 87.67,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 85.94,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 84.69,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 83.6,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 84.8,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 86.17,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 85.98,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 83.9,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 84.21,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 85.24,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 86.51,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 87.9,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 89.47,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.75,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 86.98,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 84.81,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 83.95,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 81.86,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 81.18,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 81.8,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 82.99,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 83.08,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 80.98,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 81.83,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 82.84,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 84.91,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 85.15,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 87.61,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 89.07,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "solar-renewable",
    "name": "Solar, Wind & Renewable Energy Equipment",
    "category": "Energy & Infra",
    "companiesCount": 9,
    "change1D": 3.64,
    "change1W": 8.23,
    "change1M": -11.09,
    "change1Y": -26.62,
    "currentReturn": 8.23,
    "breadthPositivePct": 78,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "WAAREEENER",
        "name": "Waaree Energies Ltd",
        "price": 2433.5,
        "change1D": -0.18,
        "change1W": 4.71,
        "marketCapCr": 69800,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "WA"
      },
      {
        "ticker": "PREMIERENE",
        "name": "Premier Energies Ltd",
        "price": 881.7,
        "change1D": -0.93,
        "change1W": -0.15,
        "marketCapCr": 50400,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "PR"
      },
      {
        "ticker": "SUZLON",
        "name": "Suzlon Energy Ltd",
        "price": 38.5,
        "change1D": -0.77,
        "change1W": 9.22,
        "marketCapCr": 53500,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "SU"
      },
      {
        "ticker": "INOXWIND",
        "name": "Inox Wind Ltd",
        "price": 65.47,
        "change1D": 1.03,
        "change1W": 9.52,
        "marketCapCr": 28000,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "IN"
      },
      {
        "ticker": "ACMESOLAR",
        "name": "ACME Solar Holdings Limited",
        "price": 408.1,
        "change1D": 3.33,
        "change1W": -2.54,
        "marketCapCr": 16400,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "AC"
      },
      {
        "ticker": "KPIGREEN",
        "name": "KPI Green Energy Limited",
        "price": 346.7,
        "change1D": 17.76,
        "change1W": 21.08,
        "marketCapCr": 10800,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "KP"
      },
      {
        "ticker": "SWSOLAR",
        "name": "Sterling and Wilson Renewable",
        "price": 151.96,
        "change1D": 1.9,
        "change1W": 7.25,
        "marketCapCr": 14200,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "SW"
      },
      {
        "ticker": "IREDA",
        "name": "Indian Renewable Energy Dev Agency",
        "price": 119.29,
        "change1D": 7.02,
        "change1W": 16.68,
        "marketCapCr": 54200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "IR"
      },
      {
        "ticker": "BORORENEW",
        "name": "Borosil Renewables Ltd",
        "price": 417.7,
        "change1D": 3.6,
        "change1W": 8.27,
        "marketCapCr": 6650,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "BO"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.85,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.18,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.37,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.43,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.88,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.97,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.89,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.13,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.19,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 98.39,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.87,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 96.74,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 96.52,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 96.15,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 95.19,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 94.49,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 95.4,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 96.07,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 95.89,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 95.12,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 94.71,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 93.95,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 93.95,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 91.88,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 90.75,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 90.53,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 93.1,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 94.82,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 95.66,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 95.35,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 93.11,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 93.65,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.05,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 92.34,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 91.86,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 90.37,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 89.15,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 91.11,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 89.96,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 86.45,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 87.66,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 88.67,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 90.11,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 91.05,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 90.23,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 90.04,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.47,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 85.56,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 83.68,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 81.18,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 80.97,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 82.25,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 82.14,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 82.85,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 80.17,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 82.58,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 82.33,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 85.5,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 86.48,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 85.84,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 88.91,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "water-recycling-circular",
    "name": "Water Treatment, Waste & Circular Economy",
    "category": "Energy & Infra",
    "companiesCount": 7,
    "change1D": 1.16,
    "change1W": 0.6,
    "change1M": -16.57,
    "change1Y": -39.77,
    "currentReturn": 0.6,
    "breadthPositivePct": 57,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "WABAG",
        "name": "VA Tech Wabag Limited",
        "price": 2003.3,
        "change1D": 0.76,
        "change1W": 9.64,
        "marketCapCr": 10400,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "WA"
      },
      {
        "ticker": "GRAVITA",
        "name": "Gravita India Limited (Recycling)",
        "price": 1498,
        "change1D": 0.27,
        "change1W": 5.43,
        "marketCapCr": 15800,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "GR"
      },
      {
        "ticker": "EMSLIMITED",
        "name": "EMS Limited (Sewerage & Water)",
        "price": 307.8,
        "change1D": 1.52,
        "change1W": 5.97,
        "marketCapCr": 4800,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "EM"
      },
      {
        "ticker": "IONEXCHANG",
        "name": "Ion Exchange (India) Limited",
        "price": 320.35,
        "change1D": 5.52,
        "change1W": -6.94,
        "marketCapCr": 9600,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "IO"
      },
      {
        "ticker": "AWHCL",
        "name": "Antony Waste Handling Cell",
        "price": 308.2,
        "change1D": 1.23,
        "change1W": 5.21,
        "marketCapCr": 2200,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "AW"
      },
      {
        "ticker": "GANECOS",
        "name": "Ganesha Ecosphere (PET Recycling)",
        "price": 875.05,
        "change1D": 0.03,
        "change1W": -9.89,
        "marketCapCr": 4900,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "GA"
      },
      {
        "ticker": "EPIGRAL",
        "name": "Epigral Limited",
        "price": 902.15,
        "change1D": -1.21,
        "change1W": -5.19,
        "marketCapCr": 8400,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "EP"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.44,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.07,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.05,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 96.86,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.7,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.86,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.1,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.92,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 99.19,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.44,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.6,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 100.94,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.43,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.94,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.09,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 98.55,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.61,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 98.46,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 98.63,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.31,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 99.49,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 100.72,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 101.56,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 100.92,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 97.59,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 95.98,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.3,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.06,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 97.36,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 96.71,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 97.81,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 95.83,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 95.35,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.84,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 93.33,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 92.92,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 90.82,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 90.7,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 92.61,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 91.89,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 89.61,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 89.07,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.4,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 90.02,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 90.4,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.9,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.19,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 87.19,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 84.02,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 82.17,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 80.25,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 80.03,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 82.44,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 82.43,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 83.59,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 81.15,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 83.22,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 81.19,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 82.62,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 82.84,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 82.51,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 83.43,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "power-generation",
    "name": "Power Generation, Thermal & Hydro Utilities",
    "category": "Energy & Infra",
    "companiesCount": 8,
    "change1D": -0.13,
    "change1W": 1.36,
    "change1M": -9.82,
    "change1Y": -23.57,
    "currentReturn": 1.36,
    "breadthPositivePct": 88,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "NTPC",
        "name": "NTPC Limited",
        "price": 325.65,
        "change1D": 0.68,
        "change1W": 0.82,
        "marketCapCr": 383000,
        "pe": 17.5,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "NT"
      },
      {
        "ticker": "TATAPOWER",
        "name": "Tata Power Company Ltd",
        "price": 353.75,
        "change1D": 0.35,
        "change1W": -0.6,
        "marketCapCr": 139000,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "TA"
      },
      {
        "ticker": "JSWENERGY",
        "name": "JSW Energy Ltd",
        "price": 521.55,
        "change1D": -0.65,
        "change1W": 3.18,
        "marketCapCr": 120000,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "JS"
      },
      {
        "ticker": "TORNTPOWER",
        "name": "Torrent Power Ltd",
        "price": 1243.4,
        "change1D": -2.18,
        "change1W": 2.03,
        "marketCapCr": 80700,
        "pe": 39,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TO"
      },
      {
        "ticker": "NHPC",
        "name": "NHPC Limited",
        "price": 79.66,
        "change1D": -2.95,
        "change1W": 1.12,
        "marketCapCr": 82400,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "NH"
      },
      {
        "ticker": "SJVN",
        "name": "SJVN Limited",
        "price": 57.7,
        "change1D": 0.96,
        "change1W": 2.12,
        "marketCapCr": 44200,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SJ"
      },
      {
        "ticker": "CESC",
        "name": "CESC Limited",
        "price": 127.89,
        "change1D": 1.3,
        "change1W": 1.12,
        "marketCapCr": 24600,
        "pe": 16.5,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "CE"
      },
      {
        "ticker": "NLCINDIA",
        "name": "NLC India Limited",
        "price": 241.12,
        "change1D": 1.48,
        "change1W": 1.1,
        "marketCapCr": 36800,
        "pe": 18.2,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "NL"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.02,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.5,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.96,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.92,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.84,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.97,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.46,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 96.32,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.22,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.35,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 96.16,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 95.66,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 94.58,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 93.71,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 93.09,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 93.39,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 94.53,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 95.41,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.46,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94.71,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 94.75,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.1,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.63,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 94.81,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 93.41,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 92.72,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 93.47,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 93.44,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 93.3,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.63,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 92.46,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 92.45,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 90.75,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 90.08,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 90.23,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 88.45,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 88.84,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 89.26,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 87.98,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 85.7,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 86.49,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 86.66,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 87.06,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 89.44,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.18,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 87.91,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 86.25,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 85.17,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 84.62,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 82.44,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 82.56,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 83.98,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 84.16,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 86.96,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 86.51,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 88.99,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 88.52,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 89.97,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 90.77,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 90.4,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 90.18,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "power-transmission",
    "name": "Power Transmission, Transformers & Grid EPC",
    "category": "Energy & Infra",
    "companiesCount": 8,
    "change1D": 0.8,
    "change1W": -2.16,
    "change1M": -10.27,
    "change1Y": -24.65,
    "currentReturn": -2.16,
    "breadthPositivePct": 38,
    "rotationStatus": "Lagging",
    "stocks": [
      {
        "ticker": "POWERGRID",
        "name": "Power Grid Corp of India",
        "price": 258.5,
        "change1D": -0.54,
        "change1W": -3.44,
        "marketCapCr": 305000,
        "pe": 18.9,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "PO"
      },
      {
        "ticker": "CGPOWER",
        "name": "CG Power and Industrial Solutions",
        "price": 792,
        "change1D": 2.46,
        "change1W": -3.43,
        "marketCapCr": 112000,
        "pe": 96,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "CG"
      },
      {
        "ticker": "POWERINDIA",
        "name": "Hitachi Energy India Limited",
        "price": 28260,
        "change1D": 1.65,
        "change1W": 0.64,
        "marketCapCr": 58400,
        "pe": 145,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "PO"
      },
      {
        "ticker": "APARINDS",
        "name": "Apar Industries Ltd",
        "price": 14103,
        "change1D": -0.02,
        "change1W": -10.25,
        "marketCapCr": 39400,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "AP"
      },
      {
        "ticker": "TRIL",
        "name": "Transformers & Rectifiers India",
        "price": 309.95,
        "change1D": 1.11,
        "change1W": 0.5,
        "marketCapCr": 13400,
        "pe": 78,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "TR"
      },
      {
        "ticker": "KEC",
        "name": "KEC International Limited",
        "price": 333.55,
        "change1D": 0.06,
        "change1W": -4.43,
        "marketCapCr": 28400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "KE"
      },
      {
        "ticker": "VOLTAMP",
        "name": "Voltamp Transformers Limited",
        "price": 9875,
        "change1D": 1.48,
        "change1W": -2.51,
        "marketCapCr": 11800,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "VO"
      },
      {
        "ticker": "SKIPPER",
        "name": "Skipper Limited",
        "price": 518.95,
        "change1D": 0.22,
        "change1W": 5.62,
        "marketCapCr": 6200,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "SK"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.67,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.97,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.28,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.79,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.5,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.13,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.29,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.81,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 99.84,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.74,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.89,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.31,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 101,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 100.24,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.49,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 98.98,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 97.79,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.32,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 100.36,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 100.36,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 100.63,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 99.93,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 99.62,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 98.99,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 95.43,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 94.88,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 96.81,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 99.78,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 99.3,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 98.15,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 98.81,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 97.15,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 97.42,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 95.03,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 95.55,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 94.55,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 95.53,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 96.36,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 97.08,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 96.37,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 93.72,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 94.9,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 95.66,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 95.17,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 97.64,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 94.25,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 94.22,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 93.29,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 90.61,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 89.38,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.26,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 88.3,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 91.08,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 91.64,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 92.28,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 90.4,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 91.71,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 90.17,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 92.98,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 91.61,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 89.01,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 89.73,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "cables-wires",
    "name": "Cables, Wires & Piping Infrastructure",
    "category": "Energy & Infra",
    "companiesCount": 8,
    "change1D": 3.51,
    "change1W": 3.72,
    "change1M": -8.44,
    "change1Y": -20.26,
    "currentReturn": 3.72,
    "breadthPositivePct": 75,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "POLYCAB",
        "name": "Polycab India Ltd",
        "price": 7887,
        "change1D": 0.2,
        "change1W": -0.42,
        "marketCapCr": 102400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "PO"
      },
      {
        "ticker": "KEI",
        "name": "KEI Industries Ltd",
        "price": 4018,
        "change1D": 0.75,
        "change1W": 4.22,
        "marketCapCr": 39200,
        "pe": 61,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "KE"
      },
      {
        "ticker": "RRKABEL",
        "name": "R R Kabel Ltd",
        "price": 2014.5,
        "change1D": 4.87,
        "change1W": 3.02,
        "marketCapCr": 18900,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "RR"
      },
      {
        "ticker": "FINCABLES",
        "name": "Finolex Cables Ltd",
        "price": 1232,
        "change1D": 12.92,
        "change1W": 8.32,
        "marketCapCr": 18900,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "FI"
      },
      {
        "ticker": "ASTRAL",
        "name": "Astral Limited",
        "price": 1285.4,
        "change1D": 2.54,
        "change1W": -5.18,
        "marketCapCr": 51200,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "AS"
      },
      {
        "ticker": "SUPREMEIND",
        "name": "Supreme Industries Limited",
        "price": 3277.5,
        "change1D": 3.82,
        "change1W": 1.84,
        "marketCapCr": 56400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SU"
      },
      {
        "ticker": "FINPIPE",
        "name": "Finolex Industries Limited",
        "price": 144.11,
        "change1D": 1.52,
        "change1W": 2.32,
        "marketCapCr": 18400,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "FI"
      },
      {
        "ticker": "PRINCEPIPE",
        "name": "Prince Pipes and Fittings",
        "price": 311,
        "change1D": 1.47,
        "change1W": 15.63,
        "marketCapCr": 6200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "PR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 101.53,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 103,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 104.77,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 104.06,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 105.3,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 105.14,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 105.14,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 104.89,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 104.19,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 104.69,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 104.24,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 104.54,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 104.7,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 105.32,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 105.13,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 103.01,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 100.17,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 101.71,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 98.16,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.97,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 99.27,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 98.99,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 99.6,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 97.49,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 94.98,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 95.22,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 96.45,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.98,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 97.63,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 98.35,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 99.17,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 98.74,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 99.22,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 96.83,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 96.93,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 96.96,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 96.15,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 97.42,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 99.67,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 100.24,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 97.59,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 97.77,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 99.9,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 99.56,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 100.26,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 99.62,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 98.12,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 96.44,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 93.29,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 90.7,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.34,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 88.47,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 88.96,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.7,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 88.58,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 86.95,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 88.07,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 88.93,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 91.96,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 92.24,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 88.3,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 91.56,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "defence",
    "name": "Aerospace, Defence & Naval Shipbuilding",
    "category": "Energy & Infra",
    "companiesCount": 10,
    "change1D": 1.87,
    "change1W": 3.55,
    "change1M": -11.72,
    "change1Y": -28.13,
    "currentReturn": 3.55,
    "breadthPositivePct": 90,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "HAL",
        "name": "Hindustan Aeronautics Ltd",
        "price": 4989.9,
        "change1D": 0.2,
        "change1W": 2.78,
        "marketCapCr": 295000,
        "pe": 38.4,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "HA"
      },
      {
        "ticker": "BEL",
        "name": "Bharat Electronics Ltd",
        "price": 396.3,
        "change1D": 0.08,
        "change1W": 5.26,
        "marketCapCr": 215000,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BE"
      },
      {
        "ticker": "MAZDOCK",
        "name": "Mazagon Dock Shipbuilders Ltd",
        "price": 1849.6,
        "change1D": 0.52,
        "change1W": 6.51,
        "marketCapCr": 85700,
        "pe": 39.5,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "MA"
      },
      {
        "ticker": "BDL",
        "name": "Bharat Dynamics Ltd",
        "price": 1063.3,
        "change1D": 0.31,
        "change1W": 6.76,
        "marketCapCr": 41800,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "BD"
      },
      {
        "ticker": "COCHINSHIP",
        "name": "Cochin Shipyard Ltd",
        "price": 1244.2,
        "change1D": 1.98,
        "change1W": 6.62,
        "marketCapCr": 40500,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "CO"
      },
      {
        "ticker": "GRSE",
        "name": "Garden Reach Shipbuilders Ltd",
        "price": 2193,
        "change1D": 2.68,
        "change1W": 7.14,
        "marketCapCr": 19200,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "GR"
      },
      {
        "ticker": "DATAPATTNS",
        "name": "Data Patterns (India) Limited",
        "price": 4017.3,
        "change1D": 6.62,
        "change1W": 4.62,
        "marketCapCr": 14200,
        "pe": 74,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "DA"
      },
      {
        "ticker": "PARAS",
        "name": "Paras Defence and Space Tech",
        "price": 1257,
        "change1D": 1.1,
        "change1W": 3.52,
        "marketCapCr": 4600,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "PA"
      },
      {
        "ticker": "ASTRAMICRO",
        "name": "Astra Microwave Products Ltd",
        "price": 1643.1,
        "change1D": 5.48,
        "change1W": 8.76,
        "marketCapCr": 8200,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "AS"
      },
      {
        "ticker": "MTARTECH",
        "name": "MTAR Technologies Limited",
        "price": 5434.5,
        "change1D": -0.26,
        "change1W": -16.5,
        "marketCapCr": 5800,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#15803d",
        "logoText": "MT"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.61,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.39,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.92,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 102.27,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 101.92,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 104.66,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 103,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 102.75,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 103.03,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 102.59,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 102.35,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 103.57,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 102.88,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 101.98,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.59,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.54,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.95,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.5,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 100.64,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 101.39,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 103.73,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 102.11,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 100.53,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 99.15,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 93.89,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 93.44,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 95.02,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 96.89,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 96.62,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 96.21,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 96,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 94.82,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 94.54,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 92.88,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 93,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 93.64,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 92.13,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 92.22,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 93.82,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 92.61,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 89.8,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 90.63,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 91.59,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 93.11,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 93.15,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 91.54,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 91.56,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 90.69,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 87.95,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 86.72,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 84.03,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 85.11,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 86.6,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 86.36,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 87.71,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 85.01,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 85.53,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 86.76,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 88.98,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 87.98,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 86.66,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 88.28,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "railways",
    "name": "Railways, Rolling Stock & Signaling Infra",
    "category": "Energy & Infra",
    "companiesCount": 9,
    "change1D": 0.64,
    "change1W": 3.05,
    "change1M": -12.39,
    "change1Y": -29.74,
    "currentReturn": 3.05,
    "breadthPositivePct": 89,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "IRFC",
        "name": "Indian Railway Finance Corp",
        "price": 80.59,
        "change1D": 0.2,
        "change1W": 6.53,
        "marketCapCr": 201000,
        "pe": 31,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "IR"
      },
      {
        "ticker": "RVNL",
        "name": "Rail Vikas Nigam Ltd",
        "price": 193.39,
        "change1D": 0.03,
        "change1W": 3.91,
        "marketCapCr": 90600,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "RV"
      },
      {
        "ticker": "IRCON",
        "name": "Ircon International Ltd",
        "price": 108.51,
        "change1D": 0.31,
        "change1W": 7.13,
        "marketCapCr": 20500,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "IR"
      },
      {
        "ticker": "TITAGARH",
        "name": "Titagarh Rail Systems Ltd",
        "price": 695.95,
        "change1D": 2.67,
        "change1W": 0.04,
        "marketCapCr": 16700,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TI"
      },
      {
        "ticker": "JUPITERWAG",
        "name": "Jupiter Wagons Ltd",
        "price": 199.75,
        "change1D": 0.91,
        "change1W": 6.09,
        "marketCapCr": 20400,
        "pe": 51,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "JU"
      },
      {
        "ticker": "RAILTEL",
        "name": "RailTel Corporation of India",
        "price": 240.15,
        "change1D": -0.37,
        "change1W": 3.23,
        "marketCapCr": 12400,
        "pe": 45,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "RA"
      },
      {
        "ticker": "TEXRAIL",
        "name": "Texmaco Rail & Engineering",
        "price": 106.21,
        "change1D": 1.19,
        "change1W": 1.94,
        "marketCapCr": 8400,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "TE"
      },
      {
        "ticker": "RITES",
        "name": "RITES Limited",
        "price": 194.61,
        "change1D": -0.06,
        "change1W": 1.62,
        "marketCapCr": 14800,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "RI"
      },
      {
        "ticker": "BEML",
        "name": "BEML Limited",
        "price": 1970,
        "change1D": 0.86,
        "change1W": -3,
        "marketCapCr": 15900,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "BE"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.69,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.1,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.18,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.92,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.94,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.61,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.22,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.24,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 97.8,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.17,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.1,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.45,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 96.78,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 96.99,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.65,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.33,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.9,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.75,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.73,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 98.38,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 97.4,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.47,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.98,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.25,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 91.98,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.74,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 93.08,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 95.43,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 94.31,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 94.95,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 96.26,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 94.54,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 94.2,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 92.53,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 92.39,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 96.08,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.43,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.79,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 92.57,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 91.36,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 87.99,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.66,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.1,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 90.43,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 90.88,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 90.1,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 90.68,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.45,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 85.72,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 84.84,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 81.58,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 81.31,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 83.19,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 83.96,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 84.74,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 82.01,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 85.24,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 85.06,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 87.58,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 87.27,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 87.05,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 87.61,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "heavy-engineering",
    "name": "Heavy Engineering, Industrial Capital Goods & Automation",
    "category": "Energy & Infra",
    "companiesCount": 9,
    "change1D": 1.11,
    "change1W": -2.4,
    "change1M": -14.41,
    "change1Y": -34.58,
    "currentReturn": -2.4,
    "breadthPositivePct": 44,
    "rotationStatus": "Lagging",
    "stocks": [
      {
        "ticker": "LT",
        "name": "Larsen & Toubro Ltd",
        "price": 4125.1,
        "change1D": 0.18,
        "change1W": 4.7,
        "marketCapCr": 492000,
        "pe": 36.5,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "LT"
      },
      {
        "ticker": "SIEMENS",
        "name": "Siemens Limited",
        "price": 3622.1,
        "change1D": 1.74,
        "change1W": 6.38,
        "marketCapCr": 248000,
        "pe": 92,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "SI"
      },
      {
        "ticker": "ABB",
        "name": "ABB India Limited",
        "price": 6830.5,
        "change1D": 0.83,
        "change1W": 3.49,
        "marketCapCr": 172000,
        "pe": 96,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AB"
      },
      {
        "ticker": "BHEL",
        "name": "Bharat Heavy Electricals Ltd",
        "price": 424.15,
        "change1D": 1.28,
        "change1W": 7.39,
        "marketCapCr": 82800,
        "pe": 85,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "BH"
      },
      {
        "ticker": "CUMMINSIND",
        "name": "Cummins India Limited",
        "price": 4107.2,
        "change1D": 1.44,
        "change1W": -9.39,
        "marketCapCr": 102000,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "CU"
      },
      {
        "ticker": "THERMAX",
        "name": "Thermax Ltd",
        "price": 2813.1,
        "change1D": 2.43,
        "change1W": -10.27,
        "marketCapCr": 58200,
        "pe": 94,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "TH"
      },
      {
        "ticker": "AIAENG",
        "name": "AIA Engineering Limited",
        "price": 3145.1,
        "change1D": 1.01,
        "change1W": -12.81,
        "marketCapCr": 38400,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "AI"
      },
      {
        "ticker": "ELECON",
        "name": "Elecon Engineering Company Ltd",
        "price": 425.6,
        "change1D": 1.59,
        "change1W": -2.89,
        "marketCapCr": 13600,
        "pe": 39,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "EL"
      },
      {
        "ticker": "PRAJIND",
        "name": "Praj Industries Ltd",
        "price": 248.82,
        "change1D": -0.52,
        "change1W": -8.23,
        "marketCapCr": 13600,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "PR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.75,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.8,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.27,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.65,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.38,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.65,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.56,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.63,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.8,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.41,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.4,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.8,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 99.29,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.05,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.68,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 97.6,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.91,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 97.93,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.01,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 96.52,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.45,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.35,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 96.12,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.79,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.6,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.87,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 93.69,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94.97,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 94.37,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 93.58,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 95.2,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 94.08,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 94.16,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.2,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 91.99,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 92.02,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 91.76,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.7,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 93.8,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 92.34,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 89.07,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 89.63,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.95,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 91.31,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 92.97,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 91.24,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 90.93,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 89.8,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 86.27,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 85.56,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 83.32,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 84.48,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 85.39,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 86.35,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 86.54,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 84.57,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 87.24,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 86.31,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 87.93,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 86.35,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 84.66,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 85.59,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "real-estate",
    "name": "Real Estate, Commercial & Residential Developers",
    "category": "Energy & Infra",
    "companiesCount": 8,
    "change1D": -0.3,
    "change1W": 9.09,
    "change1M": -2.48,
    "change1Y": -5.95,
    "currentReturn": 9.09,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "DLF",
        "name": "DLF Ltd",
        "price": 752.55,
        "change1D": -0.05,
        "change1W": 7.35,
        "marketCapCr": 203000,
        "pe": 65,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "DL"
      },
      {
        "ticker": "LODHA",
        "name": "Macrotech Developers (Lodha)",
        "price": 1176.9,
        "change1D": -0.18,
        "change1W": 17.36,
        "marketCapCr": 124000,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "LO"
      },
      {
        "ticker": "GODREJPROP",
        "name": "Godrej Properties Ltd",
        "price": 1793.8,
        "change1D": -0.86,
        "change1W": 9.95,
        "marketCapCr": 81700,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "GO"
      },
      {
        "ticker": "OBEROIRLTY",
        "name": "Oberoi Realty Ltd",
        "price": 1747.1,
        "change1D": 0.47,
        "change1W": 6.73,
        "marketCapCr": 72000,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "OB"
      },
      {
        "ticker": "PRESTIGE",
        "name": "Prestige Estates Projects",
        "price": 1606,
        "change1D": -1.41,
        "change1W": 8.55,
        "marketCapCr": 67300,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "PR"
      },
      {
        "ticker": "BRIGADE",
        "name": "Brigade Enterprises Limited",
        "price": 553.25,
        "change1D": -0.88,
        "change1W": 5.09,
        "marketCapCr": 28400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "BR"
      },
      {
        "ticker": "SOBHA",
        "name": "Sobha Limited",
        "price": 1276.9,
        "change1D": 0.12,
        "change1W": 12.47,
        "marketCapCr": 18200,
        "pe": 82,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "SO"
      },
      {
        "ticker": "SUNTECK",
        "name": "Sunteck Realty Limited",
        "price": 299.4,
        "change1D": 0.35,
        "change1W": 5.22,
        "marketCapCr": 8400,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "SU"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.1,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.75,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.94,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.54,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.73,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.08,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.77,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.53,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.18,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 102.23,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 102.7,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 102.04,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 101.87,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 101.3,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 101,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.72,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 99.22,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 102.19,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 101.33,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.38,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 99.75,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 97.28,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 97.06,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 94.42,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 90.5,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.54,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 92.42,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94.06,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 94.44,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 95.14,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 95.8,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 94.63,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 95.06,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.14,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 91.44,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 92.8,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 91.85,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.93,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 92.01,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 90.66,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 88.38,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.71,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.42,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 91.2,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 90.85,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 91.28,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 91.11,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 89.85,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 89.3,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 89.11,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 86.85,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 86.94,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 89.09,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 87.68,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.43,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 88.94,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.54,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 91.47,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 94.25,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 98.03,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 97.81,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 97.52,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "logistics-ports",
    "name": "Logistics, Ports & Multimodal Supply Chain",
    "category": "Energy & Infra",
    "companiesCount": 8,
    "change1D": -0.14,
    "change1W": 5.9,
    "change1M": -0.44,
    "change1Y": -1.06,
    "currentReturn": 5.9,
    "breadthPositivePct": 88,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "ADANIPORTS",
        "name": "Adani Ports & SEZ Ltd",
        "price": 1930.3,
        "change1D": -0.33,
        "change1W": 4.12,
        "marketCapCr": 298000,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "AD"
      },
      {
        "ticker": "JSWINFRA",
        "name": "JSW Infrastructure Limited",
        "price": 340.6,
        "change1D": 0.68,
        "change1W": 7.63,
        "marketCapCr": 68400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "JS"
      },
      {
        "ticker": "CONCOR",
        "name": "Container Corp of India",
        "price": 443.55,
        "change1D": 0.85,
        "change1W": 6.15,
        "marketCapCr": 56000,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "CO"
      },
      {
        "ticker": "DELHIVERY",
        "name": "Delhivery Limited",
        "price": 427,
        "change1D": -0.23,
        "change1W": 4.46,
        "marketCapCr": 29200,
        "pe": 85,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "DE"
      },
      {
        "ticker": "BLUEDART",
        "name": "Blue Dart Express Ltd",
        "price": 4478.3,
        "change1D": -1.39,
        "change1W": 2.83,
        "marketCapCr": 19200,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "BL"
      },
      {
        "ticker": "GPPL",
        "name": "Gujarat Pipavav Port Limited",
        "price": 171.01,
        "change1D": 2.71,
        "change1W": 5.25,
        "marketCapCr": 10200,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "GP"
      },
      {
        "ticker": "TCIEXP",
        "name": "TCI Express Limited",
        "price": 486.9,
        "change1D": -0.27,
        "change1W": -1.09,
        "marketCapCr": 4200,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "TC"
      },
      {
        "ticker": "VRLLOG",
        "name": "VRL Logistics Limited",
        "price": 328.55,
        "change1D": -3.1,
        "change1W": 17.84,
        "marketCapCr": 4800,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "VR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.41,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.58,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.19,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 101.56,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 101.38,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 100.58,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 100.53,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.71,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.63,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.25,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.39,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 101.08,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 101.34,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 102.12,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.56,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 101.23,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 100.53,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 101.02,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 100.65,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.91,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 100.08,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 100.23,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 100.09,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 99.04,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.5,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.82,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.12,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.97,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 98.72,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 98.79,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 99.24,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 98.4,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 98.25,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 96.01,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 97.22,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 97.8,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 96.12,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 96.4,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 97.23,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 96.56,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 94.3,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 95.03,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 95.87,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 96.52,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 96.42,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 95.03,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 94.97,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 94.28,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 92.84,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 91.71,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 89.21,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 90.42,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 91.25,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 91.61,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 93.08,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 91.38,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 93.93,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 95.44,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 98.74,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 98.5,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 99.73,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 99.56,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "shipping-dredging",
    "name": "Shipping, Offshore Vessels & Dredging",
    "category": "Energy & Infra",
    "companiesCount": 6,
    "change1D": 1.17,
    "change1W": -2.09,
    "change1M": -6.53,
    "change1Y": -15.67,
    "currentReturn": -2.09,
    "breadthPositivePct": 50,
    "rotationStatus": "Weakening",
    "stocks": [
      {
        "ticker": "GE-SHIPPING",
        "name": "Great Eastern Shipping Co",
        "price": 1431.9,
        "change1D": 0.22,
        "change1W": -10.53,
        "marketCapCr": 18800,
        "pe": 7.4,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "GE"
      },
      {
        "ticker": "SCI",
        "name": "Shipping Corp of India Ltd",
        "price": 260.29,
        "change1D": -0.3,
        "change1W": 0.38,
        "marketCapCr": 11400,
        "pe": 16,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "SC"
      },
      {
        "ticker": "SEAMECLTD",
        "name": "SEAMEC Limited (Offshore)",
        "price": 1521.5,
        "change1D": 3.22,
        "change1W": -6.4,
        "marketCapCr": 3800,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "SE"
      },
      {
        "ticker": "DREDGECORP",
        "name": "Dredging Corp of India Ltd",
        "price": 868,
        "change1D": 1.05,
        "change1W": 3.16,
        "marketCapCr": 2490,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "DR"
      },
      {
        "ticker": "ESSARSHPNG",
        "name": "Essar Shipping Limited",
        "price": 16.56,
        "change1D": 2.6,
        "change1W": -0.72,
        "marketCapCr": 1800,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "ES"
      },
      {
        "ticker": "ALLCARGO",
        "name": "Allcargo Logistics Limited",
        "price": 9.87,
        "change1D": 0.2,
        "change1W": 1.54,
        "marketCapCr": 6400,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "AL"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.18,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.21,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.77,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.33,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.85,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.7,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 100.05,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.95,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 103.5,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 105.21,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 103.1,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 105.62,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 103.67,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 104.3,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 102.41,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 102.39,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 103.07,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 105.35,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 105.92,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 105.06,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 105.12,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 104.44,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 103.47,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 103.67,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 100.06,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 98.56,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 99.81,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 100.41,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 100.76,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 100.36,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 102.47,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 100.85,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 100,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 99.18,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 99.42,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 100.17,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 97.26,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 98.63,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 98.9,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 99.34,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 96.78,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 97.38,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 98.56,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 98.69,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 100.71,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 98.35,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 98.07,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 95.97,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 93.84,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 92.88,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 89.44,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 91.95,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 91.44,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 91.58,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 95.01,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 94.72,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 96.09,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 95.5,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 96.4,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 94.54,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 92.44,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 93.47,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "telecom-network-equip",
    "name": "Telecom Operators, Towers & Network Equipment",
    "category": "Energy & Infra",
    "companiesCount": 8,
    "change1D": -0.67,
    "change1W": -0.99,
    "change1M": -2.5,
    "change1Y": -6,
    "currentReturn": -0.99,
    "breadthPositivePct": 38,
    "rotationStatus": "Lagging",
    "stocks": [
      {
        "ticker": "BHARTIARTL",
        "name": "Bharti Airtel Limited",
        "price": 2052.3,
        "change1D": -2.61,
        "change1W": 3.14,
        "marketCapCr": 890000,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "BH"
      },
      {
        "ticker": "INDUSTOWER",
        "name": "Indus Towers Limited",
        "price": 379,
        "change1D": -1.07,
        "change1W": -1.04,
        "marketCapCr": 104000,
        "pe": 16.5,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "IN"
      },
      {
        "ticker": "BHARTIHEXA",
        "name": "Bharti Hexacom Limited",
        "price": 1679.2,
        "change1D": 0.89,
        "change1W": -0.09,
        "marketCapCr": 68400,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "BH"
      },
      {
        "ticker": "TATACOMM",
        "name": "Tata Communications Limited",
        "price": 1706.1,
        "change1D": 0.08,
        "change1W": -2.81,
        "marketCapCr": 54200,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TA"
      },
      {
        "ticker": "IDEA",
        "name": "Vodafone Idea Limited",
        "price": 12.59,
        "change1D": -1.33,
        "change1W": 2.78,
        "marketCapCr": 58000,
        "pe": 45,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "ID"
      },
      {
        "ticker": "TEJASNET",
        "name": "Tejas Networks Limited",
        "price": 421.4,
        "change1D": 1.01,
        "change1W": 0.45,
        "marketCapCr": 22400,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "TE"
      },
      {
        "ticker": "HFCL",
        "name": "HFCL Limited",
        "price": 205.67,
        "change1D": -2.37,
        "change1W": -6.4,
        "marketCapCr": 18600,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "HF"
      },
      {
        "ticker": "ITI",
        "name": "ITI Limited",
        "price": 248.84,
        "change1D": 0,
        "change1W": -3.97,
        "marketCapCr": 26800,
        "pe": 65,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "IT"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.3,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101.43,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 102.78,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 103.41,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 102.29,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 102.38,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 101.54,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 101.61,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.69,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 102.62,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 104.02,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 102.72,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 103.19,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 104.24,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 103.81,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 102.03,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 102.04,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 101.72,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 104.41,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 105.3,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 105.57,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 104.84,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 102.72,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 103.37,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 100.37,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 99.56,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 99.7,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 100.27,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 99.19,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 99.78,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 100.29,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 98.21,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 97.81,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 94.98,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 95.66,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 95.98,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 95.43,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 96.53,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 98.89,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 99.7,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 97.51,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 98.24,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 98.11,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 98.93,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 98.41,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 99.51,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 100.48,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 99.87,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 97.92,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 96.79,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 94.81,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 96.26,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 97.74,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 96.36,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 97.46,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 95.28,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 98.5,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 99.29,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 100.18,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 99.24,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 98.21,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 97.5,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "wealth-ratings-market-infra",
    "name": "Wealth Management, Ratings & Market Infra",
    "category": "Financials",
    "companiesCount": 7,
    "change1D": 0.29,
    "change1W": 4.8,
    "change1M": -0.99,
    "change1Y": -2.38,
    "currentReturn": 4.8,
    "breadthPositivePct": 86,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "360ONE",
        "name": "360 ONE WAM Limited (IIFL Wealth)",
        "price": 1142.2,
        "change1D": -0.24,
        "change1W": 12.98,
        "marketCapCr": 38400,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "36"
      },
      {
        "ticker": "ANANDRATHI",
        "name": "Anand Rathi Wealth Limited",
        "price": 2361.5,
        "change1D": -0.51,
        "change1W": 3.72,
        "marketCapCr": 16800,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "AN"
      },
      {
        "ticker": "NUVAMA",
        "name": "Nuvama Wealth Management",
        "price": 1867.1,
        "change1D": 1.03,
        "change1W": 3.43,
        "marketCapCr": 24200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "NU"
      },
      {
        "ticker": "CAMS",
        "name": "Computer Age Management Services",
        "price": 720.45,
        "change1D": 1.19,
        "change1W": 8.29,
        "marketCapCr": 22800,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "CA"
      },
      {
        "ticker": "KFINTECH",
        "name": "KFin Technologies Limited",
        "price": 910.8,
        "change1D": -0.55,
        "change1W": 6.86,
        "marketCapCr": 18400,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "KF"
      },
      {
        "ticker": "CRISIL",
        "name": "CRISIL Limited (S&P Global)",
        "price": 4389.5,
        "change1D": -0.13,
        "change1W": -3.49,
        "marketCapCr": 36400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "CR"
      },
      {
        "ticker": "PRUDENT",
        "name": "Prudent Corporate Advisory",
        "price": 2938.7,
        "change1D": 1.26,
        "change1W": 1.83,
        "marketCapCr": 11200,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "PR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.39,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.96,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 100.1,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.32,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.92,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 100.5,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 100.61,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.63,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.25,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.71,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.88,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 101.27,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 102.15,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 102.63,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 103.83,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 101.57,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 101.06,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 101.42,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 101.32,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 101.23,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 100.41,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 98.71,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 98.72,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 98.75,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.5,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.99,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.26,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.98,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 97.8,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 97.28,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 98.25,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 96.63,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 95.48,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 95.27,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 92.82,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 93.17,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.58,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 95.7,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 96.74,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 96.41,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 94.19,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 94.33,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 96.08,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 96.6,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.59,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 95.66,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 95.67,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 94.77,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 94.05,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 94.16,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 92.14,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 92.48,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 94.02,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 94.8,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 95.45,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 92.95,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 94.68,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 96.1,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 96.83,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 99.51,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 98.75,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 99.01,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "brokers-depositories",
    "name": "Stock Brokers, Exchanges & Depositories",
    "category": "Financials",
    "companiesCount": 8,
    "change1D": 1.57,
    "change1W": 9.53,
    "change1M": 8.59,
    "change1Y": 20.62,
    "currentReturn": 9.53,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "BSE",
        "name": "BSE Limited",
        "price": 3816,
        "change1D": 0.42,
        "change1W": 9.34,
        "marketCapCr": 63400,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "BS"
      },
      {
        "ticker": "CDSL",
        "name": "Central Depository Services",
        "price": 1349.7,
        "change1D": 1.37,
        "change1W": 7.8,
        "marketCapCr": 38000,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "CD"
      },
      {
        "ticker": "MCX",
        "name": "Multi Commodity Exchange",
        "price": 3565.5,
        "change1D": 1.06,
        "change1W": 9.74,
        "marketCapCr": 32900,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "MC"
      },
      {
        "ticker": "ANGELONE",
        "name": "Angel One Ltd",
        "price": 339.55,
        "change1D": 2.58,
        "change1W": 17.09,
        "marketCapCr": 26500,
        "pe": 21,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "AN"
      },
      {
        "ticker": "MOTILALOFS",
        "name": "Motilal Oswal Financial Services",
        "price": 1136.55,
        "change1D": 3.14,
        "change1W": 17.85,
        "marketCapCr": 52400,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "MO"
      },
      {
        "ticker": "IIFLCAPS",
        "name": "IIFL Capital Services Limited",
        "price": 350.5,
        "change1D": 0.2,
        "change1W": 0.72,
        "marketCapCr": 10800,
        "pe": 18.5,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "II"
      },
      {
        "ticker": "GEOJITFSL",
        "name": "Geojit Financial Services",
        "price": 71.5,
        "change1D": 0.61,
        "change1W": 4.49,
        "marketCapCr": 3200,
        "pe": 19,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "GE"
      },
      {
        "ticker": "5PAISA",
        "name": "5paisa Capital Limited",
        "price": 349.85,
        "change1D": 3.17,
        "change1W": 9.23,
        "marketCapCr": 1800,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "5P"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.39,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101.02,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.53,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 100.74,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 101.25,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 101.59,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 101.79,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 102.48,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 103.01,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 103.51,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 104.41,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 105.45,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 104.78,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 105.31,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 104.53,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 102.96,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 101.9,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 102.53,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 104.4,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 105.29,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 104.34,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 103.08,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 102.38,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 102.8,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 100.06,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 99.53,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 101.07,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 102.73,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 101.25,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 101.6,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 103.58,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 101.57,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 101.46,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 99.21,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 98.5,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 98.47,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 97.93,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 100.6,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 103.12,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 103.65,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 100.97,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 101.27,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 102.79,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 103.58,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 102.65,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 103.4,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 102.45,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 101.16,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 98.41,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 98.25,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 95.58,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 96.06,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 98.17,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 98.97,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 99.88,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 97.74,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 99.02,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 103.14,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 102.5,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 106.02,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 106.9,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 108.59,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "amc-mutual-funds",
    "name": "Asset Management Companies (AMCs)",
    "category": "Financials",
    "companiesCount": 6,
    "change1D": 0.24,
    "change1W": 8.21,
    "change1M": -6.18,
    "change1Y": -14.83,
    "currentReturn": 8.21,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "HDFCAMC",
        "name": "HDFC Asset Management Co",
        "price": 2636.8,
        "change1D": -0.49,
        "change1W": 10.81,
        "marketCapCr": 94500,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "HD"
      },
      {
        "ticker": "NAM-INDIA",
        "name": "Nippon Life India Asset Mgmt",
        "price": 1073.3,
        "change1D": 0.76,
        "change1W": 12.06,
        "marketCapCr": 43200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "NA"
      },
      {
        "ticker": "ABSLAMC",
        "name": "Aditya Birla Sun Life AMC",
        "price": 880.55,
        "change1D": 0.18,
        "change1W": 7.97,
        "marketCapCr": 21400,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AB"
      },
      {
        "ticker": "UTIAMC",
        "name": "UTI Asset Management Co Ltd",
        "price": 836,
        "change1D": 0.35,
        "change1W": 3.24,
        "marketCapCr": 15800,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "UT"
      },
      {
        "ticker": "CAMS",
        "name": "CAMS Mutual Fund Registrar",
        "price": 720.45,
        "change1D": 1.19,
        "change1W": 8.29,
        "marketCapCr": 22800,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "CA"
      },
      {
        "ticker": "KFINTECH",
        "name": "KFin Tech Asset Services",
        "price": 910.8,
        "change1D": -0.55,
        "change1W": 6.86,
        "marketCapCr": 18400,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "KF"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.85,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.9,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.56,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.05,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.79,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.45,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 99.74,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.5,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.24,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.77,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.96,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 101.5,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.27,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 100.38,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.94,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.11,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.35,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 98.69,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 98.62,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 98.4,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 98.44,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 97.92,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 98.68,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 98.69,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.9,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.13,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.07,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 97.72,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 97.14,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 97.06,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 97.75,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 96.41,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 96.06,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.67,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 90.6,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 91.88,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 91.67,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 93.63,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 93.65,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 93.11,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 91.06,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 91.54,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 92.16,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 93.63,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 92.48,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 94.33,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 93.42,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 91.93,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 90.46,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 88.45,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 85.46,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 85.94,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 87.4,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 87.1,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 87.4,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 85.1,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 86.73,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 87.91,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 90.43,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 94.14,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 93.62,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 93.82,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "insurance-life-general",
    "name": "Insurance - Life, General & Health",
    "category": "Financials",
    "companiesCount": 8,
    "change1D": 0.24,
    "change1W": 4.52,
    "change1M": -3.87,
    "change1Y": -9.29,
    "currentReturn": 4.52,
    "breadthPositivePct": 88,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "LICI",
        "name": "Life Insurance Corp of India",
        "price": 398.15,
        "change1D": 1.05,
        "change1W": 2.35,
        "marketCapCr": 584000,
        "pe": 14.5,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "LI"
      },
      {
        "ticker": "SBILIFE",
        "name": "SBI Life Insurance Company",
        "price": 1736.8,
        "change1D": -2.65,
        "change1W": 4.6,
        "marketCapCr": 168000,
        "pe": 78,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "SB"
      },
      {
        "ticker": "HDFCLIFE",
        "name": "HDFC Life Insurance Company",
        "price": 564.7,
        "change1D": -0.11,
        "change1W": 8.13,
        "marketCapCr": 152000,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "HD"
      },
      {
        "ticker": "ICICIPRULI",
        "name": "ICICI Prudential Life Insurance",
        "price": 431,
        "change1D": 0.78,
        "change1W": 5.12,
        "marketCapCr": 104000,
        "pe": 96,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "IC"
      },
      {
        "ticker": "ICICIGI",
        "name": "ICICI Lombard General Insurance",
        "price": 1656.4,
        "change1D": 0.45,
        "change1W": 6.29,
        "marketCapCr": 98400,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "IC"
      },
      {
        "ticker": "GODIGIT",
        "name": "Go Digit General Insurance",
        "price": 259.45,
        "change1D": 4.15,
        "change1W": -1.37,
        "marketCapCr": 31800,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "GO"
      },
      {
        "ticker": "STARHEALTH",
        "name": "Star Health and Allied Insurance",
        "price": 556.4,
        "change1D": -1.48,
        "change1W": 8.67,
        "marketCapCr": 32400,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "ST"
      },
      {
        "ticker": "NIVABUPA",
        "name": "Niva Bupa Health Insurance",
        "price": 75.86,
        "change1D": -0.29,
        "change1W": 2.38,
        "marketCapCr": 14800,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "NI"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.14,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.17,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.8,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.53,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.23,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.98,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.85,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.22,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.27,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.68,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.74,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.56,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 99.28,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.5,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 97.84,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 97.01,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.94,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.38,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 96.12,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.01,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 94.7,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.13,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.06,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 93.08,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 94.03,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 96.67,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 95.29,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 95.97,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 95.84,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 96.27,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 95.15,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 95.52,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 95.07,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 92.91,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 93.78,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.67,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 94.22,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 95.49,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 95.62,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 95.05,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 97.06,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 97.88,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 97.41,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 97,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 96.68,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 96.75,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 95.92,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 94.96,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 93.61,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 92.43,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 91.92,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 91.68,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 91.92,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 92.35,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 91.94,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 91.75,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 92.18,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 94.18,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 95.26,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 96.01,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 96.13,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "nbfc-housing-lending",
    "name": "NBFCs - Consumer, Vehicle & Housing Finance",
    "category": "Financials",
    "companiesCount": 8,
    "change1D": 0.31,
    "change1W": 4.87,
    "change1M": -14.19,
    "change1Y": -34.06,
    "currentReturn": 4.87,
    "breadthPositivePct": 88,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "BAJFINANCE",
        "name": "Bajaj Finance Limited",
        "price": 1068.75,
        "change1D": -1.75,
        "change1W": 11.4,
        "marketCapCr": 432000,
        "pe": 28.5,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "BA"
      },
      {
        "ticker": "CHOLAFIN",
        "name": "Cholamandalam Investment & Fin",
        "price": 1777.1,
        "change1D": -0.44,
        "change1W": 9.4,
        "marketCapCr": 112000,
        "pe": 29,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "CH"
      },
      {
        "ticker": "SHRIRAMFIN",
        "name": "Shriram Finance Limited",
        "price": 960.85,
        "change1D": -0.03,
        "change1W": 11.29,
        "marketCapCr": 118000,
        "pe": 15.4,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "SH"
      },
      {
        "ticker": "PNBHOUSING",
        "name": "PNB Housing Finance Limited",
        "price": 1111.7,
        "change1D": 1.05,
        "change1W": 4.85,
        "marketCapCr": 26400,
        "pe": 16.8,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "PN"
      },
      {
        "ticker": "AAVAS",
        "name": "Aavas Financiers Limited",
        "price": 1144.8,
        "change1D": 0.62,
        "change1W": 4.59,
        "marketCapCr": 14200,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "AA"
      },
      {
        "ticker": "APTUS",
        "name": "Aptus Value Housing Finance",
        "price": 177.91,
        "change1D": 1.73,
        "change1W": -10.97,
        "marketCapCr": 16800,
        "pe": 24.5,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "AP"
      },
      {
        "ticker": "HOMEFIRST",
        "name": "Home First Finance Company",
        "price": 1087.4,
        "change1D": -0.32,
        "change1W": 2.42,
        "marketCapCr": 10200,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "HO"
      },
      {
        "ticker": "CREDITACC",
        "name": "CreditAccess Grameen Limited",
        "price": 1100.7,
        "change1D": 1.62,
        "change1W": 6.01,
        "marketCapCr": 15400,
        "pe": 14.2,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "CR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.82,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.06,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 100.34,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.41,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.48,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.16,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 99.02,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.64,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 99.32,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.05,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 98.3,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.13,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.7,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 97.08,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.74,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 95.44,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.65,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.57,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.09,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.32,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.69,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 95.78,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 96.31,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.68,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 93.67,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 93.26,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 92.85,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94.57,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 94.75,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 93.75,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 94.5,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 90.93,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 90.81,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 89.3,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 88.4,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 88.75,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 87.11,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 87.87,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 87.97,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 87.26,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 86.44,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 87.16,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 87.89,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.78,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 88.34,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.29,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 87.74,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 85.73,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 83.94,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 82.93,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 80.02,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 79.37,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 79.79,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 80.63,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 81.91,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 80.15,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 81.79,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 82.87,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 84.23,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 85.79,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 85.63,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 85.81,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "gold-loan",
    "name": "Gold Loan & Specialized NBFCs",
    "category": "Financials",
    "companiesCount": 6,
    "change1D": 0.74,
    "change1W": 8,
    "change1M": -11.81,
    "change1Y": -28.34,
    "currentReturn": 8,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "MUTHOOTFIN",
        "name": "Muthoot Finance Ltd",
        "price": 2915.4,
        "change1D": 1.62,
        "change1W": 15.93,
        "marketCapCr": 81200,
        "pe": 17.2,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "MU"
      },
      {
        "ticker": "MANAPPURAM",
        "name": "Manappuram Finance Ltd",
        "price": 324.3,
        "change1D": -0.34,
        "change1W": 8.57,
        "marketCapCr": 16800,
        "pe": 8.5,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "MA"
      },
      {
        "ticker": "IIFL",
        "name": "IIFL Finance Ltd",
        "price": 626.4,
        "change1D": 0.1,
        "change1W": 13.28,
        "marketCapCr": 17800,
        "pe": 10.8,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "II"
      },
      {
        "ticker": "MUTHOOTCAP",
        "name": "Muthoot Capital Services Ltd",
        "price": 195.8,
        "change1D": 0.39,
        "change1W": 3.62,
        "marketCapCr": 570,
        "pe": 11.4,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "MU"
      },
      {
        "ticker": "SURYODAY",
        "name": "Suryoday Small Finance Bank",
        "price": 145.36,
        "change1D": -0.27,
        "change1W": 4.76,
        "marketCapCr": 1950,
        "pe": 9.8,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SU"
      },
      {
        "ticker": "SPANDANA",
        "name": "Spandana Sphoorty Financial",
        "price": 187.86,
        "change1D": 2.93,
        "change1W": 1.87,
        "marketCapCr": 3200,
        "pe": 10.2,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SP"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.69,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.76,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.66,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.4,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.14,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 96.9,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.27,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.22,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.29,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 101.72,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.21,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 100.69,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.12,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.73,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 97.44,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.05,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.04,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.64,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 96.64,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 95.67,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 95.08,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 93.2,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 93.45,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 92.44,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 89.91,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 90.88,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 91.44,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 92.19,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 91.94,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 92.17,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.26,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 92.24,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 92.76,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 90.31,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 90.18,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 89.75,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 88.24,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 89.14,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 89.55,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 89.19,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 86.53,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.01,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 88.37,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.03,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 88.75,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.8,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.08,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 87.93,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 84.69,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 82.55,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 77.96,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 78.06,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 78.84,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 79.62,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 82.06,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 79.56,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 81.42,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 81.74,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 85.24,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 87.94,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 87.59,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 88.19,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "private-banks",
    "name": "Private Sector Banking",
    "category": "Financials",
    "companiesCount": 9,
    "change1D": -0.53,
    "change1W": 7.15,
    "change1M": 2.67,
    "change1Y": 6.41,
    "currentReturn": 7.15,
    "breadthPositivePct": 89,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "HDFCBANK",
        "name": "HDFC Bank Ltd",
        "price": 792.05,
        "change1D": 0.48,
        "change1W": 13.15,
        "marketCapCr": 1320000,
        "pe": 19.4,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "HD"
      },
      {
        "ticker": "ICICIBANK",
        "name": "ICICI Bank Ltd",
        "price": 1582,
        "change1D": 0.69,
        "change1W": 14.03,
        "marketCapCr": 885000,
        "pe": 18.2,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "IC"
      },
      {
        "ticker": "AXISBANK",
        "name": "Axis Bank Ltd",
        "price": 1299.5,
        "change1D": -1.77,
        "change1W": 7.49,
        "marketCapCr": 364000,
        "pe": 13.8,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AX"
      },
      {
        "ticker": "KOTAKBANK",
        "name": "Kotak Mahindra Bank",
        "price": 478.5,
        "change1D": -0.31,
        "change1W": 4.4,
        "marketCapCr": 354000,
        "pe": 21,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "KO"
      },
      {
        "ticker": "INDUSINDBK",
        "name": "IndusInd Bank Limited",
        "price": 893.4,
        "change1D": -1.85,
        "change1W": 6.55,
        "marketCapCr": 82000,
        "pe": 11.4,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "IN"
      },
      {
        "ticker": "FEDERALBNK",
        "name": "Federal Bank Ltd",
        "price": 336.55,
        "change1D": -1.04,
        "change1W": -0.28,
        "marketCapCr": 48500,
        "pe": 12,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "FE"
      },
      {
        "ticker": "IDFCFIRSTB",
        "name": "IDFC First Bank Limited",
        "price": 77.29,
        "change1D": -0.05,
        "change1W": 4.97,
        "marketCapCr": 51200,
        "pe": 18.5,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "ID"
      },
      {
        "ticker": "KARURVYSYA",
        "name": "Karur Vysya Bank Limited",
        "price": 368.75,
        "change1D": -0.35,
        "change1W": 7.04,
        "marketCapCr": 18400,
        "pe": 10.8,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "KA"
      },
      {
        "ticker": "RBLBANK",
        "name": "RBL Bank Limited",
        "price": 376.8,
        "change1D": -0.58,
        "change1W": 6.98,
        "marketCapCr": 11200,
        "pe": 10.4,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "RB"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.42,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.89,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.49,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.13,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.15,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.19,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 99.08,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.83,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.35,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.1,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.79,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 100.44,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.22,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.96,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 101.23,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 100.31,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 100.19,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 101.33,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 101.54,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 101.02,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 100.57,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 99.98,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 99.88,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 99.84,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 98.24,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 98.93,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 98.66,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 99.3,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 98.74,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 98.73,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 99.52,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 97.17,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 97.36,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 95.91,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 95.17,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 96.31,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 96.35,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 96.89,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 97.61,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 97.37,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 96.34,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 98.15,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 97.92,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 97.82,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 97.12,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 98.47,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 98.88,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 98.25,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 96.55,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 96.5,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 94.5,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 95.07,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 94.92,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 95.62,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 96.92,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 96.17,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 95.83,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 96.58,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 97.61,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 100.97,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 103.18,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 102.67,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "psu-banks",
    "name": "PSU Banking Index",
    "category": "Financials",
    "companiesCount": 8,
    "change1D": 1.4,
    "change1W": 5.09,
    "change1M": 3.48,
    "change1Y": 8.35,
    "currentReturn": 5.09,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "SBIN",
        "name": "State Bank of India",
        "price": 1040.1,
        "change1D": 2.12,
        "change1W": 5.38,
        "marketCapCr": 731000,
        "pe": 10.8,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "SB"
      },
      {
        "ticker": "BANKBARODA",
        "name": "Bank of Baroda",
        "price": 253.09,
        "change1D": 1.11,
        "change1W": 3.23,
        "marketCapCr": 130000,
        "pe": 7.2,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BA"
      },
      {
        "ticker": "PNB",
        "name": "Punjab National Bank",
        "price": 128.17,
        "change1D": 1.28,
        "change1W": 4.15,
        "marketCapCr": 119000,
        "pe": 10.4,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "PN"
      },
      {
        "ticker": "CANBK",
        "name": "Canara Bank",
        "price": 125.46,
        "change1D": 2.06,
        "change1W": 5.3,
        "marketCapCr": 94000,
        "pe": 6.2,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "CA"
      },
      {
        "ticker": "UNIONBANK",
        "name": "Union Bank of India",
        "price": 190.45,
        "change1D": 1.84,
        "change1W": 2.39,
        "marketCapCr": 92400,
        "pe": 6.8,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "UN"
      },
      {
        "ticker": "INDIANB",
        "name": "Indian Bank",
        "price": 909.75,
        "change1D": 0.86,
        "change1W": 5.14,
        "marketCapCr": 74200,
        "pe": 8.4,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "IN"
      },
      {
        "ticker": "BANKINDIA",
        "name": "Bank of India",
        "price": 141.46,
        "change1D": 2.09,
        "change1W": 5.25,
        "marketCapCr": 48600,
        "pe": 7.5,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "BA"
      },
      {
        "ticker": "MAHABANK",
        "name": "Bank of Maharashtra",
        "price": 86.79,
        "change1D": -0.14,
        "change1W": 9.87,
        "marketCapCr": 38400,
        "pe": 8.9,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "MA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.2,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 102.64,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 102.2,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 101.75,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 101.53,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 100.46,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 100.5,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.56,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.56,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.76,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.66,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 101.92,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.93,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 100.93,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.56,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.88,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 100.27,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 101.22,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 100.79,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.63,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 99.28,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 98.95,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 99.06,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 98.61,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.24,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 97.33,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.32,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.09,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 97.89,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 97.51,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 98.82,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 97.72,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 98.17,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 94.33,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 93.41,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 94.17,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.33,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 94.48,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 94.31,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 95.97,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 94.83,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 96.33,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 95.41,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 96.66,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 96.95,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 94.71,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 95.43,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 98.17,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 97.86,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 97.68,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 95.08,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 95.04,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 96.62,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 96.48,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 98.72,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 97.92,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 98.48,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 97.54,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 98,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 101.53,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 102.08,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 103.48,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "ems",
    "name": "EMS, Semiconductors & Electronics Manufacturing",
    "category": "New-Age & Tech",
    "companiesCount": 9,
    "change1D": 0.33,
    "change1W": 0.57,
    "change1M": -5.91,
    "change1Y": -14.18,
    "currentReturn": 0.57,
    "breadthPositivePct": 67,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "DIXON",
        "name": "Dixon Technologies Ltd",
        "price": 12516,
        "change1D": -0.86,
        "change1W": 1.6,
        "marketCapCr": 92100,
        "pe": 112,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "DI"
      },
      {
        "ticker": "KAYNES",
        "name": "Kaynes Technology India Ltd",
        "price": 3282,
        "change1D": 1.52,
        "change1W": 2.24,
        "marketCapCr": 34800,
        "pe": 135,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "KA"
      },
      {
        "ticker": "AMBER",
        "name": "Amber Enterprises India Ltd",
        "price": 6194.5,
        "change1D": -3.26,
        "change1W": -0.46,
        "marketCapCr": 21400,
        "pe": 112,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AM"
      },
      {
        "ticker": "PGEL",
        "name": "PG Electroplast Ltd",
        "price": 548.35,
        "change1D": 0.4,
        "change1W": 2.87,
        "marketCapCr": 16200,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "PG"
      },
      {
        "ticker": "SYRMA",
        "name": "Syrma SGS Technology Ltd",
        "price": 1463,
        "change1D": 0.25,
        "change1W": -3.24,
        "marketCapCr": 8560,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SY"
      },
      {
        "ticker": "CYIENTDLM",
        "name": "Cyient DLM Ltd",
        "price": 791,
        "change1D": 2.42,
        "change1W": 6.32,
        "marketCapCr": 5350,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "CY"
      },
      {
        "ticker": "AVALON",
        "name": "Avalon Technologies Limited",
        "price": 1861.5,
        "change1D": -1.7,
        "change1W": -9.29,
        "marketCapCr": 4800,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "AV"
      },
      {
        "ticker": "DCXINDIA",
        "name": "DCX Systems Limited",
        "price": 140.79,
        "change1D": 1.32,
        "change1W": 4.04,
        "marketCapCr": 3900,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "DC"
      },
      {
        "ticker": "CENTUM",
        "name": "Centum Electronics Limited",
        "price": 4188,
        "change1D": 2.92,
        "change1W": 1.07,
        "marketCapCr": 2400,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "CE"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.77,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.29,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.57,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.31,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.17,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 100.65,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 100.82,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 101.17,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.04,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.45,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 101.22,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 102.78,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 103.83,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 103.54,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 103.4,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 102.42,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 101.62,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 101.7,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 102.12,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 106.38,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 107.24,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 105.83,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 104.05,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 103.74,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 99.97,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 100.75,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 103.21,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 106.34,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 107.33,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 106.72,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 107.37,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 105.41,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 106.54,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 105.55,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 104.55,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 104.82,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 102.4,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 102.79,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 104.61,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 105.45,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 101.79,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 101.26,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 102.39,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 102.76,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 103.64,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 101.22,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 97.93,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 94.16,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 92.29,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 91.86,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 88.69,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 90.63,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 93.26,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 93.06,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 94.81,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 92.16,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 93.73,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 93.7,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 95.31,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 96.84,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 93.71,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 94.09,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "geospatial",
    "name": "Geospatial, Drones & Smart Metering Tech",
    "category": "New-Age & Tech",
    "companiesCount": 7,
    "change1D": 135.68,
    "change1W": 142.29,
    "change1M": -7.85,
    "change1Y": -18.84,
    "currentReturn": 142.29,
    "breadthPositivePct": 43,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "MAPMYINDIA",
        "name": "C.E. Info Systems (MapmyIndia)",
        "price": 843.65,
        "change1D": 0.53,
        "change1W": -0.37,
        "marketCapCr": 11800,
        "pe": 85,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "MA"
      },
      {
        "ticker": "GENUSPOWER",
        "name": "Genus Power Infrastructures Ltd",
        "price": 285.1,
        "change1D": -0.58,
        "change1W": 4.59,
        "marketCapCr": 12400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "GE"
      },
      {
        "ticker": "ZEN",
        "name": "Zen Technologies Ltd",
        "price": 1715.2,
        "change1D": -0.33,
        "change1W": -0.31,
        "marketCapCr": 15400,
        "pe": 78,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "ZE"
      },
      {
        "ticker": "IDEAFORGE",
        "name": "ideaForge Technology Ltd",
        "price": 669.2,
        "change1D": -0.1,
        "change1W": 4.69,
        "marketCapCr": 2980,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "ID"
      },
      {
        "ticker": "HBLENGINE",
        "name": "HBL Engineering (Kavach & Tech)",
        "price": 801.5,
        "change1D": -4.5,
        "change1W": -2.03,
        "marketCapCr": 16800,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "HB"
      },
      {
        "ticker": "DRONE",
        "name": "DroneAcharya Aerial Innovations",
        "price": 347,
        "change1D": 954.71,
        "change1W": 989.48,
        "marketCapCr": 350,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "DR"
      },
      {
        "ticker": "RRP",
        "name": "RRP Semiconductor Ltd",
        "price": 8044.35,
        "change1D": 0,
        "change1W": 0,
        "marketCapCr": 1950,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "RR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.53,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.07,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.91,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.47,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.04,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 101.16,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 100.2,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 101.58,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.89,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.22,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.06,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 100.13,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.17,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.95,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 97.81,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 97.06,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 97.57,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 97.34,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.68,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.49,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 98.27,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.86,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 96.18,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.52,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.27,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 92.12,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 93.63,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94.5,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 95.06,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 94.92,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 94.37,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 94.07,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 94.96,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.22,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 93.17,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 93.1,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 91.75,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.17,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 93.52,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 92.44,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 89.62,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 89.96,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 92.39,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 92.74,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 92.66,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 92.4,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 94.57,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 93.13,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 91.79,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 90.39,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.51,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 88.32,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 90.06,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 90.26,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 91.01,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 88.81,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 91.23,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 91.2,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 94.17,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 94.43,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 92.99,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 92.15,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "it-largecap",
    "name": "IT Services - Tier-1 Large Caps",
    "category": "New-Age & Tech",
    "companiesCount": 6,
    "change1D": -1.41,
    "change1W": -0.4,
    "change1M": 6.21,
    "change1Y": 14.9,
    "currentReturn": -0.4,
    "breadthPositivePct": 17,
    "rotationStatus": "Lagging",
    "stocks": [
      {
        "ticker": "TCS",
        "name": "Tata Consultancy Services",
        "price": 2472.8,
        "change1D": -1.03,
        "change1W": -1.16,
        "marketCapCr": 1510000,
        "pe": 29.5,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "TC"
      },
      {
        "ticker": "INFY",
        "name": "Infosys Limited",
        "price": 1147.6,
        "change1D": -2.86,
        "change1W": -1.15,
        "marketCapCr": 772000,
        "pe": 27.8,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "IN"
      },
      {
        "ticker": "HCLTECH",
        "name": "HCL Technologies Ltd",
        "price": 1414.3,
        "change1D": -1.78,
        "change1W": -1.37,
        "marketCapCr": 498000,
        "pe": 28.4,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "HC"
      },
      {
        "ticker": "WIPRO",
        "name": "Wipro Limited",
        "price": 196.38,
        "change1D": -0.82,
        "change1W": -0.01,
        "marketCapCr": 292000,
        "pe": 23,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "WI"
      },
      {
        "ticker": "TECHM",
        "name": "Tech Mahindra Ltd",
        "price": 1817.9,
        "change1D": -0.72,
        "change1W": 1.73,
        "marketCapCr": 164000,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "TE"
      },
      {
        "ticker": "LTIM",
        "name": "LTIMindtree & LTTS Group",
        "price": 4206.3,
        "change1D": -1.25,
        "change1W": -0.46,
        "marketCapCr": 175000,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "LT"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.62,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.17,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.57,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.69,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.34,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 95.81,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.53,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 96.99,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.71,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.91,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.09,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 95.7,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 95.25,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 97.9,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.48,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 98.82,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 97.25,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.38,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.96,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 93.97,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 93.44,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 90.83,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 90.73,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 90.78,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.73,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.77,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 91.69,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 90.8,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 90.99,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 90.57,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 89.83,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 89.21,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 89.23,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 88.87,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 87.05,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 87.94,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 89.2,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 88.81,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 88.43,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 87.44,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 86.97,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 89.38,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 88.86,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 93.66,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.63,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 98.04,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 102.28,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 101.02,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 105.55,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 105.02,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 104.54,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 105.26,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 105.61,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 103.57,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 104.94,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 107.35,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 106.61,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 106.64,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 104.71,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 107.16,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 107.7,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 106.21,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "it-midcaps",
    "name": "IT Services - High-Growth Mid & Small Caps",
    "category": "New-Age & Tech",
    "companiesCount": 10,
    "change1D": 0.15,
    "change1W": 1.54,
    "change1M": -9.82,
    "change1Y": -23.57,
    "currentReturn": 1.54,
    "breadthPositivePct": 60,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "PERSISTENT",
        "name": "Persistent Systems Ltd",
        "price": 5983,
        "change1D": -1.16,
        "change1W": -1.12,
        "marketCapCr": 86500,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "PE"
      },
      {
        "ticker": "COFORGE",
        "name": "Coforge Limited",
        "price": 2042.2,
        "change1D": -1.63,
        "change1W": -2.71,
        "marketCapCr": 52400,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "CO"
      },
      {
        "ticker": "KPITTECH",
        "name": "KPIT Technologies Ltd",
        "price": 540.45,
        "change1D": 0,
        "change1W": 1.6,
        "marketCapCr": 47600,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "KP"
      },
      {
        "ticker": "ZENSARTECH",
        "name": "Zensar Technologies Limited",
        "price": 559.6,
        "change1D": -1.62,
        "change1W": 2.95,
        "marketCapCr": 17800,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "ZE"
      },
      {
        "ticker": "SONATSOFTW",
        "name": "Sonata Software Limited",
        "price": 259.66,
        "change1D": 8.37,
        "change1W": 14.86,
        "marketCapCr": 18400,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SO"
      },
      {
        "ticker": "BSOFT",
        "name": "Birlasoft Ltd",
        "price": 334.85,
        "change1D": -0.74,
        "change1W": 1.89,
        "marketCapCr": 17200,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "BS"
      },
      {
        "ticker": "NEWGEN",
        "name": "Newgen Software Technologies",
        "price": 438.05,
        "change1D": -0.6,
        "change1W": -1.85,
        "marketCapCr": 16800,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "NE"
      },
      {
        "ticker": "INTELLECT",
        "name": "Intellect Design Arena Ltd",
        "price": 514.85,
        "change1D": -0.02,
        "change1W": -3.05,
        "marketCapCr": 13200,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "IN"
      },
      {
        "ticker": "LATENTVIEW",
        "name": "Latent View Analytics Ltd",
        "price": 203.12,
        "change1D": -0.89,
        "change1W": 0.29,
        "marketCapCr": 10400,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "LA"
      },
      {
        "ticker": "HAPPSTMNDS",
        "name": "Happiest Minds Technologies",
        "price": 313.55,
        "change1D": -0.16,
        "change1W": 2.5,
        "marketCapCr": 11800,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#15803d",
        "logoText": "HA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.22,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.16,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.82,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.76,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.11,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.35,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.78,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.13,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.64,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.37,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.11,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 95.92,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.95,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.97,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 95.98,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 94.66,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 94.22,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 94.19,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 92.59,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 92.26,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 90.46,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 89.65,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 89.84,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 89.99,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 89.49,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 89.78,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 88.99,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 89.15,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 88.52,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 88.67,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 87.08,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 87.27,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 86.36,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 84.87,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 84.74,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 84.83,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 85.69,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 85.52,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 84.54,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 83.32,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 85.36,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 85.06,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.22,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 90.35,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 90.98,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 92.24,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 90.59,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 90.55,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 89.33,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.18,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 89.19,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 89.2,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.34,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 90.35,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 87.96,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.07,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 88.09,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 88,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 90.47,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 90.26,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 90.18,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "ev-new-age-mobility",
    "name": "EV Pure-Plays, Batteries & New-Age Mobility",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 7,
    "change1D": 1.84,
    "change1W": 3.89,
    "change1M": -10.32,
    "change1Y": -24.77,
    "currentReturn": 3.89,
    "breadthPositivePct": 57,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "OLAELEC",
        "name": "Ola Electric Mobility Limited",
        "price": 33.95,
        "change1D": -0.76,
        "change1W": -3.03,
        "marketCapCr": 38400,
        "pe": 85,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "OL"
      },
      {
        "ticker": "OLECTRA",
        "name": "Olectra Greentech (EV Buses)",
        "price": 1084.05,
        "change1D": 5.62,
        "change1W": 9.32,
        "marketCapCr": 13200,
        "pe": 92,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "OL"
      },
      {
        "ticker": "JBMA",
        "name": "JBM Auto Limited (EV Buses)",
        "price": 501.4,
        "change1D": 1.17,
        "change1W": 3.64,
        "marketCapCr": 19800,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "JB"
      },
      {
        "ticker": "EXIDEIND",
        "name": "Exide Industries Limited",
        "price": 381.8,
        "change1D": 6.84,
        "change1W": 12.89,
        "marketCapCr": 39400,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "EX"
      },
      {
        "ticker": "ARE&M",
        "name": "Amara Raja Energy & Mobility",
        "price": 756.45,
        "change1D": 3.87,
        "change1W": 6.78,
        "marketCapCr": 24800,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "AR"
      },
      {
        "ticker": "HBLENGINE",
        "name": "HBL Engineering (EV & Batteries)",
        "price": 801.5,
        "change1D": -4.5,
        "change1W": -2.03,
        "marketCapCr": 16800,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "HB"
      },
      {
        "ticker": "GREAVESCOT",
        "name": "Greaves Cotton (Ampere EV)",
        "price": 205.57,
        "change1D": 0.61,
        "change1W": -0.33,
        "marketCapCr": 4400,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "GR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 101.78,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101.23,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.28,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.13,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.62,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.41,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.28,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 99.25,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.25,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.34,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.37,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.03,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.05,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 97.39,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.53,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.18,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 94.77,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.57,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94.78,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 94.92,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 94.32,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 94.76,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 94.53,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.91,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.79,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 93.6,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94.71,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 94.66,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 95.36,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 98.27,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 99.1,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 98.54,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 96.26,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 96.06,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 95.05,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.62,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 92.13,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 92.56,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 91.24,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 88.5,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.31,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.3,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.4,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 89.39,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.03,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 90.74,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.93,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 86.18,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 84.76,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 81.72,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 81.72,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 84.5,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 86.18,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 85.68,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 84.29,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 87.05,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 86.51,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 89.62,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 90.02,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 88.56,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 89.68,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "passenger-cars-ev",
    "name": "Passenger Vehicles & SUV Leaders",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 6,
    "change1D": -0.4,
    "change1W": 8.08,
    "change1M": -3.15,
    "change1Y": -7.56,
    "currentReturn": 8.08,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "MARUTI",
        "name": "Maruti Suzuki India Ltd",
        "price": 12824,
        "change1D": 0.58,
        "change1W": 9.87,
        "marketCapCr": 352000,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "MA"
      },
      {
        "ticker": "M&M",
        "name": "Mahindra & Mahindra Ltd",
        "price": 3269,
        "change1D": -0.55,
        "change1W": 13.95,
        "marketCapCr": 370000,
        "pe": 31,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "MM"
      },
      {
        "ticker": "TATAMOTORS",
        "name": "Tata Motors Passenger & EV",
        "price": 294,
        "change1D": 0.68,
        "change1W": 7.93,
        "marketCapCr": 290000,
        "pe": 11.2,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "TA"
      },
      {
        "ticker": "HYUNDAI",
        "name": "Hyundai Motor India Ltd",
        "price": 2110,
        "change1D": -0.94,
        "change1W": 6.3,
        "marketCapCr": 148000,
        "pe": 24.5,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "HY"
      },
      {
        "ticker": "FORCE",
        "name": "Force Motors Ltd",
        "price": 19051,
        "change1D": 0.44,
        "change1W": 7.82,
        "marketCapCr": 9020,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "FO"
      },
      {
        "ticker": "BOSCHLTD",
        "name": "Bosch Limited",
        "price": 49370,
        "change1D": -2.62,
        "change1W": 2.64,
        "marketCapCr": 101700,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "BO"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.13,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101.15,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 101.03,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.92,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.55,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.53,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.91,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.59,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.76,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.38,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 98.84,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.62,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.25,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.4,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.05,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.72,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.61,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 95.19,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.39,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 96.01,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.02,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 95.37,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.89,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 94.8,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 93.18,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 93.59,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 94.83,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 93.85,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 93.55,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 93.23,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.15,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 91.83,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 92.77,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 90.88,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 90.15,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 90.54,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 88.33,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 88.42,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 88.73,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 87.43,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 85.52,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 86.81,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 87.49,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 88.17,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 87.79,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 89.02,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.67,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.66,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 87.17,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 86.11,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 85.23,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 85.76,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 86.87,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 87.76,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 87.96,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 87.89,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.88,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 91.54,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 93.1,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 96.63,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 97.34,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 96.85,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "two-wheelers",
    "name": "2/3 Wheelers & Premium Motorcycles",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 6,
    "change1D": -0.76,
    "change1W": 3.48,
    "change1M": -9.12,
    "change1Y": -21.89,
    "currentReturn": 3.48,
    "breadthPositivePct": 83,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "BAJAJ-AUTO",
        "name": "Bajaj Auto Ltd",
        "price": 10857,
        "change1D": -0.39,
        "change1W": 5.01,
        "marketCapCr": 258000,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "BA"
      },
      {
        "ticker": "EICHERMOT",
        "name": "Eicher Motors Ltd (Royal Enfield)",
        "price": 7608,
        "change1D": -0.8,
        "change1W": 5.48,
        "marketCapCr": 134000,
        "pe": 31,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "EI"
      },
      {
        "ticker": "TVSMOTOR",
        "name": "TVS Motor Company Ltd",
        "price": 4429.5,
        "change1D": -1.38,
        "change1W": 5.14,
        "marketCapCr": 115000,
        "pe": 49,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "TV"
      },
      {
        "ticker": "HEROMOTOCO",
        "name": "Hero MotoCorp Ltd",
        "price": 5430,
        "change1D": -1.51,
        "change1W": 4.56,
        "marketCapCr": 94400,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "HE"
      },
      {
        "ticker": "OLAELEC",
        "name": "Ola Electric 2-Wheelers",
        "price": 33.95,
        "change1D": -0.76,
        "change1W": -3.03,
        "marketCapCr": 38400,
        "pe": 85,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "OL"
      },
      {
        "ticker": "ATULAUTO",
        "name": "Atul Auto Limited",
        "price": 400.5,
        "change1D": 0.28,
        "change1W": 3.72,
        "marketCapCr": 1650,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "AT"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.54,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.02,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.61,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.72,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.11,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.45,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.65,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.34,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 97.95,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.84,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.61,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.17,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.61,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.18,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 99,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 98.55,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.98,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 94.85,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 94.88,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94.41,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 94.72,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 94.08,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 94.6,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 93.58,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.17,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 92.24,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 92.58,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 92.65,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 93.36,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 93.11,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 95.39,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 94.35,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 93.23,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 91.9,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 90.74,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 91.02,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 88.13,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 87.67,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 87.29,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 86.62,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 83.9,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 85.31,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 86.42,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 87.45,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 87.76,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.46,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 88.9,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.31,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 86.12,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 85.37,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 83.74,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 84.42,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 87.97,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 90.22,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.09,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 87.58,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 87.81,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 89.05,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 89.81,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 91.77,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 91.61,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 90.88,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "commercial-vehicles",
    "name": "Commercial Vehicles, Trucks & Buses",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 6,
    "change1D": 1.41,
    "change1W": 8.52,
    "change1M": -9.66,
    "change1Y": -23.18,
    "currentReturn": 8.52,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "ASHOKLEY",
        "name": "Ashok Leyland Ltd",
        "price": 175.63,
        "change1D": 2.06,
        "change1W": 17.71,
        "marketCapCr": 64000,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "AS"
      },
      {
        "ticker": "TATAMOTORS",
        "name": "Tata Motors Ltd",
        "price": 294,
        "change1D": 0.68,
        "change1W": 7.93,
        "marketCapCr": 290000,
        "pe": 11.2,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "TA"
      },
      {
        "ticker": "EICHERMOT",
        "name": "VE Commercial Vehicles (Eicher)",
        "price": 7608,
        "change1D": -0.8,
        "change1W": 5.48,
        "marketCapCr": 134000,
        "pe": 31,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "EI"
      },
      {
        "ticker": "FORCEMOT",
        "name": "Force Motors Limited",
        "price": 18914,
        "change1D": -0.28,
        "change1W": 7.05,
        "marketCapCr": 9020,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "FO"
      },
      {
        "ticker": "OLECTRA",
        "name": "Olectra Greentech Limited",
        "price": 1084.05,
        "change1D": 5.62,
        "change1W": 9.32,
        "marketCapCr": 13200,
        "pe": 92,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "OL"
      },
      {
        "ticker": "JBMA",
        "name": "JBM Auto Limited",
        "price": 501.4,
        "change1D": 1.17,
        "change1W": 3.64,
        "marketCapCr": 19800,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "JB"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.58,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.97,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 100.94,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.36,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.86,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.01,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.98,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.1,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.39,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.59,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.15,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.06,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.89,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 97.54,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 96.06,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 95.42,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 94.54,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 94.77,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 94.31,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 93.97,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 93.22,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 93.43,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 92.91,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 90.97,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 90.51,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 91.95,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 92.05,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 91.72,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 91.35,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 92.67,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 90.79,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 90.4,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 88.23,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 87.12,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 87.18,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 85.14,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 85.64,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 86.68,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 85.33,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 82.77,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 83.97,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 84.6,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 85.52,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 85.15,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 85.9,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 86.42,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 85.37,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 83.24,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 82.31,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 80.63,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 80.55,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 81.48,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 82.13,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 81.75,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 81.28,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 83.23,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 84.66,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 86.02,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 89.18,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 89.23,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 90.34,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "auto-components",
    "name": "Auto Components, Forgings & Ancillaries",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 10,
    "change1D": 1.28,
    "change1W": 4.23,
    "change1M": 0.87,
    "change1Y": 2.09,
    "currentReturn": 4.23,
    "breadthPositivePct": 80,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "MOTHERSON",
        "name": "Samvardhana Motherson Int",
        "price": 163.12,
        "change1D": 2.88,
        "change1W": 2.59,
        "marketCapCr": 117000,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "MO"
      },
      {
        "ticker": "BOSCHLTD",
        "name": "Bosch Limited",
        "price": 49370,
        "change1D": -2.62,
        "change1W": 2.64,
        "marketCapCr": 101700,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BO"
      },
      {
        "ticker": "UNOMINDA",
        "name": "Uno Minda Ltd",
        "price": 1342.8,
        "change1D": 1.27,
        "change1W": 20.03,
        "marketCapCr": 58600,
        "pe": 59,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "UN"
      },
      {
        "ticker": "SONACOMS",
        "name": "Sona BLW Precision Forgings",
        "price": 919.25,
        "change1D": 2.14,
        "change1W": 1.47,
        "marketCapCr": 40200,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "SO"
      },
      {
        "ticker": "ENDURANCE",
        "name": "Endurance Technologies Ltd",
        "price": 2497.8,
        "change1D": -0.16,
        "change1W": 6.31,
        "marketCapCr": 34800,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "EN"
      },
      {
        "ticker": "SCHAEFFLER",
        "name": "Schaeffler India Limited",
        "price": 3555,
        "change1D": 1,
        "change1W": 0.58,
        "marketCapCr": 58400,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SC"
      },
      {
        "ticker": "CRAFTSMAN",
        "name": "Craftsman Automation Ltd",
        "price": 10570,
        "change1D": 1,
        "change1W": 0.57,
        "marketCapCr": 11400,
        "pe": 39,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "CR"
      },
      {
        "ticker": "SANSERA",
        "name": "Sansera Engineering Limited",
        "price": 4641,
        "change1D": 7.36,
        "change1W": 11.63,
        "marketCapCr": 8400,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "SA"
      },
      {
        "ticker": "SUPRAJIT",
        "name": "Suprajit Engineering Limited",
        "price": 464.2,
        "change1D": -3.67,
        "change1W": -2.16,
        "marketCapCr": 6800,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "SU"
      },
      {
        "ticker": "GABRIEL",
        "name": "Gabriel India Limited",
        "price": 1423.7,
        "change1D": 3.56,
        "change1W": -1.39,
        "marketCapCr": 7200,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#15803d",
        "logoText": "GA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.42,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.9,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 100.1,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 100.04,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.86,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 102.61,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 101.72,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 101.34,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 100.87,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.03,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.4,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.5,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.44,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 100.56,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 101.84,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 100.75,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.44,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 98.41,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 98.13,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 98.6,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 99.53,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 100.14,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 100.03,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 99.31,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.27,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.65,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.49,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 100.4,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 99.21,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 100.74,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 101.21,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 100.28,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 100.66,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 98.6,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 97.42,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 98.63,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 95.9,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 94.79,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 95.8,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 95.1,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 93.18,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 93.13,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 94.99,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 95.22,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.44,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 95.29,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 95.7,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 95.56,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 93.35,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 92.58,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 91.2,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 92.92,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 96.33,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 97.23,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 96.48,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 95.41,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 96.88,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 97.26,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 99.21,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 101.7,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 99.53,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 100.87,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "tyres-rubber-carbon",
    "name": "Tyres, Rubber & Carbon Black",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 6,
    "change1D": -0.8,
    "change1W": 6.94,
    "change1M": -8.18,
    "change1Y": -19.63,
    "currentReturn": 6.94,
    "breadthPositivePct": 83,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "MRF",
        "name": "MRF Limited",
        "price": 125225,
        "change1D": -0.06,
        "change1W": 7.1,
        "marketCapCr": 54200,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "MR"
      },
      {
        "ticker": "BALKRISIND",
        "name": "Balkrishna Industries (BKT)",
        "price": 2340.5,
        "change1D": -2.88,
        "change1W": 10.41,
        "marketCapCr": 56400,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BA"
      },
      {
        "ticker": "APOLLOTYRE",
        "name": "Apollo Tyres Limited",
        "price": 417.05,
        "change1D": 0.26,
        "change1W": 6.96,
        "marketCapCr": 31800,
        "pe": 19.5,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AP"
      },
      {
        "ticker": "CEATLTD",
        "name": "CEAT Limited",
        "price": 3480.4,
        "change1D": -1.84,
        "change1W": 7.64,
        "marketCapCr": 12400,
        "pe": 21,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "CE"
      },
      {
        "ticker": "JKTYRE",
        "name": "JK Tyre & Industries Ltd",
        "price": 357,
        "change1D": -0.63,
        "change1W": 10.37,
        "marketCapCr": 10200,
        "pe": 14.5,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "JK"
      },
      {
        "ticker": "PCBL",
        "name": "PCBL Chemical Limited",
        "price": 280.2,
        "change1D": 0.34,
        "change1W": -0.85,
        "marketCapCr": 16800,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "PC"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.38,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.8,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 97.84,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.62,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.42,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.86,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.83,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 96.84,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.71,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.75,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.14,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.69,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.2,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 96.96,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.87,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 95.91,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 94.58,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 94.2,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 93.84,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 93.52,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 93.49,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 93.35,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 92.66,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 90.45,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 90.72,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 92.39,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 93.61,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 93.15,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 93.08,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.46,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 91.84,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 92.03,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 90.3,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 90.32,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 91.13,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 90.03,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 89.61,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 90.41,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 89.59,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 88.37,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.29,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 88.48,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 88.62,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 88.83,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.94,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.19,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.86,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 87.21,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 86.77,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 83.96,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 83.91,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 84.98,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 85.04,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 85.05,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 83.31,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 85.9,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 86.86,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 88.3,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 92.71,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 92.58,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 91.82,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "hospitals",
    "name": "Hospitals & Multi-Specialty Healthcare Chains",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 13,
    "change1D": 0.98,
    "change1W": 5.03,
    "change1M": -6.79,
    "change1Y": -16.3,
    "currentReturn": 5.03,
    "breadthPositivePct": 92,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "APOLLOHOSP",
        "name": "Apollo Hospitals Enterprise Ltd",
        "price": 8548,
        "change1D": 1.21,
        "change1W": 1.05,
        "marketCapCr": 99800,
        "pe": 72.4,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "AP"
      },
      {
        "ticker": "FORTIS",
        "name": "Fortis Healthcare Ltd",
        "price": 771.9,
        "change1D": 0.65,
        "change1W": 1.37,
        "marketCapCr": 46800,
        "pe": 64.3,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "FO"
      },
      {
        "ticker": "MANIPALHOS",
        "name": "Manipal Health Enterprises",
        "price": 662.85,
        "change1D": 2.45,
        "change1W": 1.63,
        "marketCapCr": 34200,
        "pe": 49,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "MA"
      },
      {
        "ticker": "ASTERDM",
        "name": "Aster DM Healthcare Ltd",
        "price": 738.85,
        "change1D": 3.6,
        "change1W": 9.65,
        "marketCapCr": 22100,
        "pe": 38.6,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "AS"
      },
      {
        "ticker": "KIMS",
        "name": "Krishna Institute of Med Sciences",
        "price": 724.65,
        "change1D": 0.23,
        "change1W": 0.52,
        "marketCapCr": 20100,
        "pe": 58.7,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "KI"
      },
      {
        "ticker": "JLHL",
        "name": "Jupiter Life Line Hospitals",
        "price": 294.8,
        "change1D": 2.5,
        "change1W": 11.84,
        "marketCapCr": 9710,
        "pe": 51.2,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "JL"
      },
      {
        "ticker": "HCG",
        "name": "HealthCare Global Enterprises",
        "price": 592.4,
        "change1D": -1.31,
        "change1W": 0.95,
        "marketCapCr": 5520,
        "pe": 88,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "HC"
      },
      {
        "ticker": "KMCSHIL",
        "name": "Kovai Medical Center & Hospital",
        "price": 163.3,
        "change1D": -0.25,
        "change1W": 12.82,
        "marketCapCr": 5100,
        "pe": 33.2,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "KM"
      },
      {
        "ticker": "INDRAMEDCO",
        "name": "Indraprastha Medical Corp",
        "price": 333.2,
        "change1D": 0.91,
        "change1W": 7.26,
        "marketCapCr": 3560,
        "pe": 24.1,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "IN"
      },
      {
        "ticker": "ARTEMISMED",
        "name": "Artemis Medicare Services Ltd",
        "price": 310.8,
        "change1D": 1.54,
        "change1W": 9.59,
        "marketCapCr": 2950,
        "pe": 42.1,
        "volume": 850000,
        "logoBg": "#15803d",
        "logoText": "AR"
      },
      {
        "ticker": "KOVAI",
        "name": "KMC Speciality Hospitals",
        "price": 6008.5,
        "change1D": 1.01,
        "change1W": 2.3,
        "marketCapCr": 2040,
        "pe": 29.8,
        "volume": 850000,
        "logoBg": "#b45309",
        "logoText": "KO"
      },
      {
        "ticker": "GPTHEALTH",
        "name": "GPT Healthcare Ltd (ILS)",
        "price": 144.24,
        "change1D": 0.22,
        "change1W": 7,
        "marketCapCr": 1460,
        "pe": 28.5,
        "volume": 850000,
        "logoBg": "#be123c",
        "logoText": "GP"
      },
      {
        "ticker": "DRAGARWQ",
        "name": "Dr. Agarwals Eye Hospital Ltd",
        "price": 5380.5,
        "change1D": 0.01,
        "change1W": -0.57,
        "marketCapCr": 1340,
        "pe": 31.8,
        "volume": 850000,
        "logoBg": "#0f766e",
        "logoText": "DR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.21,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 97.85,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.3,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.85,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.5,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.32,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.55,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.1,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 97.35,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.23,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 97.87,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.98,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.04,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 97.45,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 97.41,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.89,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.92,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.94,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 96.48,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.93,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 98.39,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 99.14,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 99.23,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 98.13,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.89,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.81,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.95,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 99.6,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 99.07,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 99.37,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 100.17,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 99.08,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 98.74,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 98.7,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 98.17,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 94.52,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 93.86,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.53,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 92.03,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 91.4,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 89.87,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 90.61,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 89.43,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.07,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 88.01,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.29,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 88.35,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 87.21,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 86.52,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 86.08,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 85.11,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 86.21,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 88.19,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 89.33,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 89.84,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 89.67,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.77,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 90.64,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 93.02,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 92.88,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 92.31,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 93.21,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "pharma-formulations",
    "name": "Pharma - Formulations & Domestic Leaders",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 10,
    "change1D": 2.21,
    "change1W": 5.24,
    "change1M": 4.62,
    "change1Y": 11.09,
    "currentReturn": 5.24,
    "breadthPositivePct": 90,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "SUNPHARMA",
        "name": "Sun Pharmaceutical Ind Ltd",
        "price": 1932.2,
        "change1D": 3.88,
        "change1W": 9.16,
        "marketCapCr": 436000,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "SU"
      },
      {
        "ticker": "CIPLA",
        "name": "Cipla Limited",
        "price": 1417.8,
        "change1D": 0.48,
        "change1W": 2.22,
        "marketCapCr": 124000,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "CI"
      },
      {
        "ticker": "DRREDDY",
        "name": "Dr Reddys Laboratories Ltd",
        "price": 1388.4,
        "change1D": 1.12,
        "change1W": 3.46,
        "marketCapCr": 109000,
        "pe": 18.5,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "DR"
      },
      {
        "ticker": "TORNTPHARM",
        "name": "Torrent Pharmaceuticals Ltd",
        "price": 4815.6,
        "change1D": 1.38,
        "change1W": 4.8,
        "marketCapCr": 109000,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TO"
      },
      {
        "ticker": "MANKIND",
        "name": "Mankind Pharma Ltd",
        "price": 2677,
        "change1D": 5.39,
        "change1W": 7.89,
        "marketCapCr": 106000,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "MA"
      },
      {
        "ticker": "ZYDUSLIFE",
        "name": "Zydus Lifesciences Limited",
        "price": 1205.2,
        "change1D": 0.61,
        "change1W": -2.85,
        "marketCapCr": 98400,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "ZY"
      },
      {
        "ticker": "LUPIN",
        "name": "Lupin Limited",
        "price": 2009.9,
        "change1D": 1.1,
        "change1W": 0.67,
        "marketCapCr": 96200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "LU"
      },
      {
        "ticker": "AUROPHARMA",
        "name": "Aurobindo Pharma Limited",
        "price": 1845.7,
        "change1D": 2.54,
        "change1W": 9.62,
        "marketCapCr": 84500,
        "pe": 24.5,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "AU"
      },
      {
        "ticker": "ALKEM",
        "name": "Alkem Laboratories Limited",
        "price": 5394,
        "change1D": 1.83,
        "change1W": 4.64,
        "marketCapCr": 68400,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "AL"
      },
      {
        "ticker": "GLENMARK",
        "name": "Glenmark Pharmaceuticals Ltd",
        "price": 2687.2,
        "change1D": 3.75,
        "change1W": 12.81,
        "marketCapCr": 46200,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#15803d",
        "logoText": "GL"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.82,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 100.47,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.51,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.19,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.1,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.55,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.96,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.76,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.86,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.16,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.2,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.11,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 100.57,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.83,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.92,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 99.45,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 98.62,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.86,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 98.43,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 98.51,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 97.57,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 97.04,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 97.4,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 96.35,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.32,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 98.26,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 99.02,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 99.96,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 100.01,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 100.42,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 100.07,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 99.94,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 98.99,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 100.35,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 98.12,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 97.83,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 97.05,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 97.95,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 97.38,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 94.73,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 95.8,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 96.29,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 96.3,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.21,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 95.7,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 94.9,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 94.19,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 94.1,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 94.5,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 93.46,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 95.63,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 97.15,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 97.67,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 98.12,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 99.22,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 99.41,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 100.21,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 100.7,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 101.08,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 102.33,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 104.62,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "pharma-api-cdmo",
    "name": "Pharma API, CRAMS & CDMO",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 9,
    "change1D": 4.35,
    "change1W": 5.61,
    "change1M": 6.83,
    "change1Y": 16.39,
    "currentReturn": 5.61,
    "breadthPositivePct": 89,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "DIVISLAB",
        "name": "Divis Laboratories Ltd",
        "price": 11719,
        "change1D": 13.55,
        "change1W": 17.83,
        "marketCapCr": 154000,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "DI"
      },
      {
        "ticker": "SYNGENE",
        "name": "Syngene International Ltd",
        "price": 438.55,
        "change1D": 5.09,
        "change1W": 6.2,
        "marketCapCr": 35800,
        "pe": 64,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "SY"
      },
      {
        "ticker": "SUVENPHAR",
        "name": "Suven Pharmaceuticals / Cohance",
        "price": 285.25,
        "change1D": 7.7,
        "change1W": 4.97,
        "marketCapCr": 30000,
        "pe": 74,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "SU"
      },
      {
        "ticker": "LAURUSLABS",
        "name": "Laurus Labs Ltd",
        "price": 2455.6,
        "change1D": 4.94,
        "change1W": 4.58,
        "marketCapCr": 25400,
        "pe": 82,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "LA"
      },
      {
        "ticker": "PPLPHARMA",
        "name": "Piramal Pharma Limited",
        "price": 245.98,
        "change1D": 2.78,
        "change1W": 2.53,
        "marketCapCr": 31200,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "PP"
      },
      {
        "ticker": "NEULANDLAB",
        "name": "Neuland Laboratories Limited",
        "price": 20684,
        "change1D": 4.99,
        "change1W": 5.67,
        "marketCapCr": 18400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "NE"
      },
      {
        "ticker": "GRANULES",
        "name": "Granules India Limited",
        "price": 790,
        "change1D": -1.21,
        "change1W": -3.74,
        "marketCapCr": 14200,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "GR"
      },
      {
        "ticker": "JUBLPHARMA",
        "name": "Jubilant Pharmova Limited",
        "price": 966.45,
        "change1D": 2.86,
        "change1W": 2.08,
        "marketCapCr": 16800,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "JU"
      },
      {
        "ticker": "BLUEJET",
        "name": "Blue Jet Healthcare Limited",
        "price": 545.3,
        "change1D": -1.53,
        "change1W": 10.35,
        "marketCapCr": 9800,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "BL"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 101.27,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.64,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.7,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.1,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.26,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.96,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.93,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 101.02,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.28,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 100.54,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.81,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 102.01,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 102.28,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 102.19,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 102.77,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 102.23,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 101.66,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 102.32,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 101.62,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 102.84,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 105.39,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 103.92,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 104.21,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 103.8,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 100.69,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 100.28,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 101.97,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 102.57,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 103.44,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 102.98,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 103.62,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 102.59,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 102.8,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 101.18,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 100.71,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 99.47,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 97.97,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 97.22,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 99.19,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 99.07,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 95.51,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 95.43,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 96.51,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 96.28,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.94,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 96.04,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 96.84,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 95.75,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 94.01,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 93.64,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 92.1,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 93.41,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 95.56,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 99.79,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 99.11,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 100.59,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 100.99,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 99.72,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 101.42,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 102.66,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 102.13,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 106.83,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "diagnostics",
    "name": "Diagnostics, Pathlabs & Imaging Chains",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 6,
    "change1D": 1.83,
    "change1W": 3.56,
    "change1M": -5.04,
    "change1Y": -12.1,
    "currentReturn": 3.56,
    "breadthPositivePct": 83,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "LALPATHLAB",
        "name": "Dr. Lal PathLabs Ltd",
        "price": 2068,
        "change1D": 4.97,
        "change1W": 9.58,
        "marketCapCr": 26100,
        "pe": 65,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "LA"
      },
      {
        "ticker": "METROPOLIS",
        "name": "Metropolis Healthcare Ltd",
        "price": 586.55,
        "change1D": 3.13,
        "change1W": 4.76,
        "marketCapCr": 11200,
        "pe": 72,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "ME"
      },
      {
        "ticker": "VIJAYA",
        "name": "Vijaya Diagnostic Centre Ltd",
        "price": 1488.7,
        "change1D": 1.37,
        "change1W": 2.15,
        "marketCapCr": 10100,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "VI"
      },
      {
        "ticker": "THYROCARE",
        "name": "Thyrocare Technologies Ltd",
        "price": 485.75,
        "change1D": -1.49,
        "change1W": 1.73,
        "marketCapCr": 4800,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TH"
      },
      {
        "ticker": "KRSNAA",
        "name": "Krsnaa Diagnostics Limited",
        "price": 490.6,
        "change1D": 3.28,
        "change1W": -1.62,
        "marketCapCr": 2900,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "KR"
      },
      {
        "ticker": "SURYODAY",
        "name": "Suryoday Healthcare & Fin",
        "price": 145.36,
        "change1D": -0.27,
        "change1W": 4.76,
        "marketCapCr": 1950,
        "pe": 18,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SU"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 101.39,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 101.51,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.58,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.19,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.96,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.05,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.1,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.09,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.42,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.62,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 98.73,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.94,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.97,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.13,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 100.06,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.39,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.21,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 98.61,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 98.6,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 98.54,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 99.34,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 98.75,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 97.47,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 95.65,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 95.38,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.51,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.15,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 99.05,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 98.65,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 99.49,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 98.35,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 98.42,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 96.54,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 96.51,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 95.67,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 95.27,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 96.07,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 96.46,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 95.76,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 93.07,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 93.48,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 94.44,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 92.85,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 92.61,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 91.89,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 91.78,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 90.36,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 89.55,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 89.86,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 88.26,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 88.66,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 90.84,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 91.35,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 92.14,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 90.38,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 91.61,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 91.77,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 93.95,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 93.23,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 93.15,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 94.96,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "chemicals-speciality",
    "name": "Speciality Chemicals & Fluorochemicals",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 10,
    "change1D": 1.41,
    "change1W": 1.83,
    "change1M": -11.49,
    "change1Y": -27.58,
    "currentReturn": 1.83,
    "breadthPositivePct": 80,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "PIIND",
        "name": "PI Industries Ltd",
        "price": 1716.2,
        "change1D": -1.08,
        "change1W": -20.77,
        "marketCapCr": 67100,
        "pe": 41,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "PI"
      },
      {
        "ticker": "SRF",
        "name": "SRF Limited",
        "price": 2443.3,
        "change1D": -0.7,
        "change1W": 1.42,
        "marketCapCr": 68400,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "SR"
      },
      {
        "ticker": "DEEPAKNTR",
        "name": "Deepak Nitrite Ltd",
        "price": 1548.8,
        "change1D": 0.99,
        "change1W": 1.15,
        "marketCapCr": 38700,
        "pe": 45,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "DE"
      },
      {
        "ticker": "TATACHEM",
        "name": "Tata Chemicals Ltd",
        "price": 601.6,
        "change1D": -0.96,
        "change1W": -1.38,
        "marketCapCr": 26500,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TA"
      },
      {
        "ticker": "ATUL",
        "name": "Atul Limited",
        "price": 5290.5,
        "change1D": 1.11,
        "change1W": 4.55,
        "marketCapCr": 22400,
        "pe": 58,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "AT"
      },
      {
        "ticker": "VINATIORGA",
        "name": "Vinati Organics Limited",
        "price": 1070,
        "change1D": 2.61,
        "change1W": 12.2,
        "marketCapCr": 19800,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "VI"
      },
      {
        "ticker": "NAVINFLUOR",
        "name": "Navin Fluorine International",
        "price": 9045,
        "change1D": 0.39,
        "change1W": 7.6,
        "marketCapCr": 16900,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "NA"
      },
      {
        "ticker": "CLEAN",
        "name": "Clean Science and Technology",
        "price": 699.35,
        "change1D": 4.54,
        "change1W": 5.55,
        "marketCapCr": 15800,
        "pe": 62,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "CL"
      },
      {
        "ticker": "FINEORG",
        "name": "Fine Organic Industries Ltd",
        "price": 5301.5,
        "change1D": 4.45,
        "change1W": 1.56,
        "marketCapCr": 14600,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "FI"
      },
      {
        "ticker": "AARTIIND",
        "name": "Aarti Industries Limited",
        "price": 456.25,
        "change1D": 2.75,
        "change1W": 6.4,
        "marketCapCr": 18200,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#15803d",
        "logoText": "AA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.06,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.05,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 100.46,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.86,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.98,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.85,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 99.13,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 98.7,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.75,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 99.06,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.07,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.88,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.02,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 99.98,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 99.06,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 99.27,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.77,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.04,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.84,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 97.02,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 97.51,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 96.91,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 97.33,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 95.73,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 95.64,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 95.87,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.38,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 97.09,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 96.57,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 96.57,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 96.51,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 95.47,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 95.39,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 93.87,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 92.28,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 92.72,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 92.24,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 92.39,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 94.59,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 94.19,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 92.48,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 92.41,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 93.91,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 93.92,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 95.13,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 94.25,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 94.14,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 92.47,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 89.55,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 88.67,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 86.12,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 86.15,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 87.91,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.09,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 87.76,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 87.11,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 86.88,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 87.03,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 88.37,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 87.52,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 87.24,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 88.51,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "agro-chemicals",
    "name": "Agro Chemicals & Crop Protection",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 7,
    "change1D": 1.04,
    "change1W": 1.94,
    "change1M": -18.38,
    "change1Y": -44.11,
    "currentReturn": 1.94,
    "breadthPositivePct": 86,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "UPL",
        "name": "UPL Limited",
        "price": 531.5,
        "change1D": -0.64,
        "change1W": 2.98,
        "marketCapCr": 42000,
        "pe": 18,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "UP"
      },
      {
        "ticker": "BAYERCROP",
        "name": "Bayer CropScience Ltd",
        "price": 3414.3,
        "change1D": 2.96,
        "change1W": 4.1,
        "marketCapCr": 27600,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BA"
      },
      {
        "ticker": "SUMICHEM",
        "name": "Sumitomo Chemical India Ltd",
        "price": 341.55,
        "change1D": 3.83,
        "change1W": 6.4,
        "marketCapCr": 26700,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "SU"
      },
      {
        "ticker": "DHANUKA",
        "name": "Dhanuka Agritech Ltd",
        "price": 920.25,
        "change1D": 1.17,
        "change1W": -4.45,
        "marketCapCr": 7500,
        "pe": 31,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "DH"
      },
      {
        "ticker": "RALLIS",
        "name": "Rallis India Limited (Tata)",
        "price": 188.43,
        "change1D": -0.54,
        "change1W": 1.82,
        "marketCapCr": 6800,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "RA"
      },
      {
        "ticker": "SHARDACROP",
        "name": "Sharda Cropchem Limited",
        "price": 687.1,
        "change1D": 0.22,
        "change1W": 0.34,
        "marketCapCr": 5400,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SH"
      },
      {
        "ticker": "BHARATRAS",
        "name": "Bharat Rasayan Limited",
        "price": 972.9,
        "change1D": 0.26,
        "change1W": 2.39,
        "marketCapCr": 4800,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "BH"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 100.08,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99.13,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.89,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 98.32,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.33,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.74,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.45,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.72,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.82,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.87,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 96.94,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.92,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 97.08,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 96.13,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.09,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 95.61,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.38,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 95.25,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 94.87,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94.37,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 94.44,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 93.68,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 93.71,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 93.07,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 91.11,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.25,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 91.62,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 91.93,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 90.6,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 90.73,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 91.24,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 89.81,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 89.6,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 88.02,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 86.57,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 86.72,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 85.28,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 84.16,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 85.29,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 84.48,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 82.74,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 83.08,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 84.04,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 84.7,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 85.01,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 85.02,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 85.38,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 84.11,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 82.29,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 81.73,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 79.54,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 78.49,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 79.02,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 80.32,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 80.3,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 79.68,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 80.34,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 79.97,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 80.82,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 81.06,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 80.91,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 81.62,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "fertilisers",
    "name": "Fertilisers & Soil Nutrients",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 8,
    "change1D": 0.89,
    "change1W": 2.83,
    "change1M": -14.15,
    "change1Y": -33.96,
    "currentReturn": 2.83,
    "breadthPositivePct": 88,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "COROMANDEL",
        "name": "Coromandel International Ltd",
        "price": 1832.3,
        "change1D": 0.46,
        "change1W": 5.3,
        "marketCapCr": 50600,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "CO"
      },
      {
        "ticker": "FACT",
        "name": "Fertilisers and Chemicals Travancore",
        "price": 747.9,
        "change1D": -0.31,
        "change1W": 6.27,
        "marketCapCr": 62400,
        "pe": 98,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "FA"
      },
      {
        "ticker": "CHAMBLFERT",
        "name": "Chambal Fertilisers & Chem",
        "price": 388.7,
        "change1D": 1.04,
        "change1W": 5.55,
        "marketCapCr": 19800,
        "pe": 14.5,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "CH"
      },
      {
        "ticker": "DEEPAKFERT",
        "name": "Deepak Fertilisers & Petrochem",
        "price": 1177.3,
        "change1D": 1.9,
        "change1W": 2.73,
        "marketCapCr": 15400,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "DE"
      },
      {
        "ticker": "RCF",
        "name": "Rashtriya Chemicals & Fertilisers",
        "price": 102.4,
        "change1D": 1.27,
        "change1W": 4.5,
        "marketCapCr": 10200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "RC"
      },
      {
        "ticker": "GNFC",
        "name": "Gujarat Narmada Valley Fert",
        "price": 464.4,
        "change1D": 2.79,
        "change1W": -9.12,
        "marketCapCr": 9630,
        "pe": 18,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "GN"
      },
      {
        "ticker": "PARADEEP",
        "name": "Paradeep Phosphates Limited",
        "price": 139.36,
        "change1D": -2.08,
        "change1W": 3.24,
        "marketCapCr": 8400,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "PA"
      },
      {
        "ticker": "GSFC",
        "name": "Gujarat State Fertilizers & Chem",
        "price": 142.29,
        "change1D": 2.07,
        "change1W": 4.16,
        "marketCapCr": 8800,
        "pe": 16,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "GS"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.44,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.32,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.29,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.04,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 99.31,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.89,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.67,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.56,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 97.01,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.34,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 99.64,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 99.99,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.67,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.42,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 96.42,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 96.64,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.26,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.21,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 96.97,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 96.83,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 96.53,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 95.88,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.67,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 94.48,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.14,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 91.7,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 93.98,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 94.79,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 95.16,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 95.03,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 96.49,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 95.83,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 96.3,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 95.3,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 93.41,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 93.41,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 91.19,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 91.45,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 94.65,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 93.43,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 90.38,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 90.31,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 90.24,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.9,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 90.42,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 90,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 90.22,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.35,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 85.85,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 84.47,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 81.92,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 82.92,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 83.45,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 83.1,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 83.99,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 80.79,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 83.65,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 83.23,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 85.69,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 86.07,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 85.16,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 85.85,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "sugar-biofuels",
    "name": "Sugar, Biofuels & Ethanol",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 7,
    "change1D": -0.12,
    "change1W": 4.37,
    "change1M": -6.7,
    "change1Y": -16.08,
    "currentReturn": 4.37,
    "breadthPositivePct": 86,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "EIDPARRY",
        "name": "E.I.D. Parry (India) Ltd",
        "price": 652.25,
        "change1D": 1.27,
        "change1W": 5.08,
        "marketCapCr": 14400,
        "pe": 16,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "EI"
      },
      {
        "ticker": "BALRAMCHIN",
        "name": "Balrampur Chini Mills Ltd",
        "price": 664.1,
        "change1D": -0.92,
        "change1W": 10.7,
        "marketCapCr": 11800,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BA"
      },
      {
        "ticker": "TRIVENI",
        "name": "Triveni Engineering & Ind",
        "price": 240.4,
        "change1D": 0.16,
        "change1W": 2.28,
        "marketCapCr": 9200,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "TR"
      },
      {
        "ticker": "RENUKA",
        "name": "Shree Renuka Sugars Limited",
        "price": 18.38,
        "change1D": 1.04,
        "change1W": 3.78,
        "marketCapCr": 9400,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "RE"
      },
      {
        "ticker": "PRAJIND",
        "name": "Praj Industries (Ethanol Tech)",
        "price": 248.82,
        "change1D": -0.52,
        "change1W": -8.23,
        "marketCapCr": 13600,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "PR"
      },
      {
        "ticker": "DALMIASUG",
        "name": "Dalmia Bharat Sugar and Ind",
        "price": 464.45,
        "change1D": -2.73,
        "change1W": 13.91,
        "marketCapCr": 3600,
        "pe": 14,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "DA"
      },
      {
        "ticker": "DWARKESH",
        "name": "Dwarikesh Sugar Industries",
        "price": 42.98,
        "change1D": 0.87,
        "change1W": 3.04,
        "marketCapCr": 1400,
        "pe": 16,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "DW"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.45,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 97.54,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.43,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 100.78,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 105.1,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 104.61,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 108.21,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 117.29,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 113.77,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 114.05,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 111.54,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 110.95,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 108.96,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 109.87,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 112,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 108.09,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 107.54,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 108.63,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 106.24,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 107.75,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 107.7,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 105.02,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 104.38,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 102.33,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 98.43,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 97.26,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 96.45,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 97.03,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 96.32,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 96.74,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 98.33,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 96.71,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 100.67,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 98.83,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 97.76,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 96.32,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 94.41,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 97.75,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 101.35,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 101.12,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 97.14,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 97.28,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 101.91,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 103.27,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 102.79,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 101.94,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 101.68,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 97.81,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 95.99,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 93.66,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 90.37,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 88.81,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 89.24,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.53,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 90.55,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 85.86,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 89.19,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 90.68,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 94.96,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 94.85,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 93.52,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 93.3,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "cement-products",
    "name": "Cement & Clinker Manufacturers",
    "category": "Energy & Infra",
    "companiesCount": 8,
    "change1D": -0.67,
    "change1W": 5.92,
    "change1M": -7.37,
    "change1Y": -17.69,
    "currentReturn": 5.92,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "ULTRACEMCO",
        "name": "UltraTech Cement Ltd",
        "price": 12346,
        "change1D": -0.84,
        "change1W": 8.42,
        "marketCapCr": 323000,
        "pe": 42,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "UL"
      },
      {
        "ticker": "AMBUJACEM",
        "name": "Ambuja Cements Ltd",
        "price": 389.75,
        "change1D": -0.22,
        "change1W": 8.2,
        "marketCapCr": 143000,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "AM"
      },
      {
        "ticker": "SHREECEM",
        "name": "Shree Cement Ltd",
        "price": 24810,
        "change1D": -1.16,
        "change1W": 5.17,
        "marketCapCr": 88400,
        "pe": 39,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "SH"
      },
      {
        "ticker": "JKCEMENT",
        "name": "JK Cement Limited",
        "price": 5089.1,
        "change1D": -2.88,
        "change1W": 3.95,
        "marketCapCr": 34200,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "JK"
      },
      {
        "ticker": "DALBHARAT",
        "name": "Dalmia Bharat Ltd",
        "price": 1464,
        "change1D": -0.43,
        "change1W": 6.11,
        "marketCapCr": 34500,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "DA"
      },
      {
        "ticker": "RAMCOCEM",
        "name": "The Ramco Cements Limited",
        "price": 832.25,
        "change1D": 1.82,
        "change1W": 12.8,
        "marketCapCr": 21400,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "RA"
      },
      {
        "ticker": "NUVOCO",
        "name": "Nuvoco Vistas Corp Limited",
        "price": 339.85,
        "change1D": -0.92,
        "change1W": 0.31,
        "marketCapCr": 12400,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "NU"
      },
      {
        "ticker": "BIRLACORPN",
        "name": "Birla Corporation Limited",
        "price": 819.8,
        "change1D": -0.71,
        "change1W": 2.39,
        "marketCapCr": 9800,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "BI"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.63,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.78,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 98.19,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.6,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.71,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.14,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.25,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 96.85,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.67,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.06,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 96.15,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.15,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 96.66,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 96.01,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 94.61,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 94.44,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 93.97,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 94.9,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.65,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 93.96,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 93.07,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 92.55,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 92.33,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 91.74,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 89.19,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 89.31,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 90.31,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 92.24,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 92.74,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 92.42,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.42,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 92.55,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 92.24,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 90.56,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 89.75,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 91.39,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 89.36,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 89.68,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 89.58,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 89.11,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 87.08,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 87.69,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 87.36,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 88.14,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 87.84,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 88.21,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.76,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 88.52,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 88.31,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 88.28,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.57,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 89.39,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 87.81,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 87.09,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 86.71,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 84.76,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 87.63,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 88.89,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 89.98,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 93.09,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 93.3,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 92.63,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "steel-iron",
    "name": "Steel, Tubes & Structural Pipes",
    "category": "Energy & Infra",
    "companiesCount": 9,
    "change1D": -0.49,
    "change1W": 1.9,
    "change1M": 2.4,
    "change1Y": 5.76,
    "currentReturn": 1.9,
    "breadthPositivePct": 78,
    "rotationStatus": "Improving",
    "stocks": [
      {
        "ticker": "JSWSTEEL",
        "name": "JSW Steel Ltd",
        "price": 1344.6,
        "change1D": -0.92,
        "change1W": 2.65,
        "marketCapCr": 239000,
        "pe": 26,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "JS"
      },
      {
        "ticker": "TATASTEEL",
        "name": "Tata Steel Ltd",
        "price": 187.52,
        "change1D": 0.65,
        "change1W": 5.72,
        "marketCapCr": 184000,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "TA"
      },
      {
        "ticker": "JINDALSTEL",
        "name": "Jindal Steel & Power Ltd",
        "price": 1156.2,
        "change1D": -0.76,
        "change1W": 4.92,
        "marketCapCr": 97900,
        "pe": 16,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "JI"
      },
      {
        "ticker": "JSL",
        "name": "Jindal Stainless Limited",
        "price": 688.45,
        "change1D": -1.48,
        "change1W": 1.59,
        "marketCapCr": 62400,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "JS"
      },
      {
        "ticker": "SAIL",
        "name": "Steel Authority of India Ltd",
        "price": 171.01,
        "change1D": -0.34,
        "change1W": 3.45,
        "marketCapCr": 51200,
        "pe": 18,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SA"
      },
      {
        "ticker": "APLAPOLLO",
        "name": "APL Apollo Tubes Limited",
        "price": 2182.1,
        "change1D": -0.15,
        "change1W": 0.85,
        "marketCapCr": 42800,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "AP"
      },
      {
        "ticker": "JINDALSAW",
        "name": "Jindal Saw Limited",
        "price": 251.85,
        "change1D": 0.34,
        "change1W": 3.47,
        "marketCapCr": 21400,
        "pe": 12.5,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "JI"
      },
      {
        "ticker": "RATNAMANI",
        "name": "Ratnamani Metals & Tubes",
        "price": 2421.8,
        "change1D": -1.39,
        "change1W": -0.43,
        "marketCapCr": 24600,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#ea580c",
        "logoText": "RA"
      },
      {
        "ticker": "WELCORP",
        "name": "Welspun Corp Limited",
        "price": 2197,
        "change1D": -0.36,
        "change1W": -5.1,
        "marketCapCr": 19800,
        "pe": 16.8,
        "volume": 850000,
        "logoBg": "#4f46e5",
        "logoText": "WE"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.95,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 99,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.02,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.32,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.31,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 100.05,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 100.37,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 100.8,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 103.48,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 106.7,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 106.48,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 108.12,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 108.86,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 109.31,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 108.83,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 109.71,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 109.67,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 110.33,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 111.17,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 109.71,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 109.86,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 111.43,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 111.89,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 109.67,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 105,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 105.13,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 106.48,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 109.59,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 109.39,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 108.89,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 111.53,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 109.64,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 110.83,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 109.11,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 109.96,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 108.48,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 105.03,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 104.51,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 106.59,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 105.15,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 101.61,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 102.56,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 104.13,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 104.53,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 104.31,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 103.87,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 104.8,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 104.5,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 102.04,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 99.96,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 97.07,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 98.49,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 101.24,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 99.84,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 99.76,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 97.92,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 100.77,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 100.82,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 103.35,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 103.8,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 102.92,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 102.4,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "non-ferrous-metals",
    "name": "Non-Ferrous Metals (Aluminium, Zinc, Copper)",
    "category": "Energy & Infra",
    "companiesCount": 6,
    "change1D": 0.44,
    "change1W": 5.16,
    "change1M": -11.7,
    "change1Y": -28.08,
    "currentReturn": 5.16,
    "breadthPositivePct": 83,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "HINDZINC",
        "name": "Hindustan Zinc Ltd",
        "price": 575.6,
        "change1D": 1.32,
        "change1W": 11.12,
        "marketCapCr": 215000,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "HI"
      },
      {
        "ticker": "VEDL",
        "name": "Vedanta Limited",
        "price": 261.8,
        "change1D": 0.02,
        "change1W": 6.42,
        "marketCapCr": 183000,
        "pe": 12,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "VE"
      },
      {
        "ticker": "HINDALCO",
        "name": "Hindalco Industries Ltd",
        "price": 944.7,
        "change1D": -1.43,
        "change1W": 3.65,
        "marketCapCr": 153000,
        "pe": 14.2,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "HI"
      },
      {
        "ticker": "NATIONALUM",
        "name": "National Aluminium Co (NALCO)",
        "price": 327.35,
        "change1D": 0.49,
        "change1W": -0.2,
        "marketCapCr": 42800,
        "pe": 16.4,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "NA"
      },
      {
        "ticker": "HINDCOPPER",
        "name": "Hindustan Copper Limited",
        "price": 429.45,
        "change1D": 1.97,
        "change1W": 4.51,
        "marketCapCr": 29400,
        "pe": 82,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "HI"
      },
      {
        "ticker": "GRAVITA",
        "name": "Gravita India (Lead & Aluminium)",
        "price": 1498,
        "change1D": 0.27,
        "change1W": 5.43,
        "marketCapCr": 15800,
        "pe": 56,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "GR"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.64,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 102.23,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 100.36,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.63,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.38,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 99.39,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 98.62,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 99.39,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 101.74,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 102.57,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 100.39,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 103.22,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 100.78,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 101.9,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 99.16,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 98.39,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 97.31,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 96.78,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 97.15,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 95.88,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 97.37,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 98.36,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 97.3,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 94.76,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 92.13,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 92.23,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 92.58,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 93.97,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 93.47,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 93.43,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 95.13,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 93.16,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 92.86,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 90.55,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 89.8,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 89.3,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 87.67,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 88.8,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 90.18,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 88.36,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 86.13,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 87.28,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 87.27,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 87.55,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 86.61,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 85.5,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 86.4,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 84.95,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 82.65,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 81.64,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 79.28,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 80.03,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 79.99,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 81.62,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 82.62,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 81.5,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 83.95,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 83.33,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 86.72,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 88.23,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 87.93,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 88.3,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "mining-coal",
    "name": "Mining, Iron Ore & Coal",
    "category": "Energy & Infra",
    "companiesCount": 6,
    "change1D": 0.77,
    "change1W": 1.05,
    "change1M": -13.62,
    "change1Y": -32.69,
    "currentReturn": 1.05,
    "breadthPositivePct": 50,
    "rotationStatus": "Weakening",
    "stocks": [
      {
        "ticker": "COALINDIA",
        "name": "Coal India Ltd",
        "price": 401.5,
        "change1D": 0.38,
        "change1W": -1.59,
        "marketCapCr": 268000,
        "pe": 7.8,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "CO"
      },
      {
        "ticker": "NMDC",
        "name": "NMDC Limited",
        "price": 71.13,
        "change1D": 1.04,
        "change1W": 3.96,
        "marketCapCr": 66800,
        "pe": 10.4,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "NM"
      },
      {
        "ticker": "KIOCL",
        "name": "KIOCL Limited",
        "price": 334.55,
        "change1D": -0.06,
        "change1W": 0.57,
        "marketCapCr": 24200,
        "pe": 68,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "KI"
      },
      {
        "ticker": "LLOYDSME",
        "name": "Lloyds Metals and Energy",
        "price": 1809.4,
        "change1D": 1.34,
        "change1W": -0.86,
        "marketCapCr": 48400,
        "pe": 36,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "LL"
      },
      {
        "ticker": "MOIL",
        "name": "MOIL Limited",
        "price": 220.17,
        "change1D": 2.07,
        "change1W": -0.86,
        "marketCapCr": 8380,
        "pe": 18,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "MO"
      },
      {
        "ticker": "SANDUMA",
        "name": "Sandur Manganese & Iron Ores",
        "price": 177.43,
        "change1D": -0.17,
        "change1W": 5.08,
        "marketCapCr": 7400,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SA"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.13,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.46,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 97.79,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 97.26,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 97.81,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 96.31,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 94.89,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 95.25,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 95.56,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 96.27,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 95.84,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 97.85,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 95.92,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 96.14,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.23,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 94.81,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 95.27,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 95.41,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.27,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94.33,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 94.91,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 95.87,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 95.03,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 92.93,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 90.4,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 89.98,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 90.75,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 90.73,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 90.72,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 91.78,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 93.27,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 91.41,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 91.46,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 90.15,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 91.13,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 90.32,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 87.87,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 88.24,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 89.85,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 89.41,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 87.88,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 88.89,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 88.88,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.38,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 89.57,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 89.05,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.49,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 87.64,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 85.76,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 84.68,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 82.52,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 83.12,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 83.73,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 84.43,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 84.57,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 83.19,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 85.58,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 83.7,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 86.37,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 86.18,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 85.76,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 86.38,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "ceramics-sanitaryware",
    "name": "Ceramics, Sanitaryware, Woodpanel & Tiles",
    "category": "Consumer & Retail",
    "companiesCount": 6,
    "change1D": 1.6,
    "change1W": 5.47,
    "change1M": -8.62,
    "change1Y": -20.69,
    "currentReturn": 5.47,
    "breadthPositivePct": 83,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "KAJARIACER",
        "name": "Kajaria Ceramics Ltd",
        "price": 1211.4,
        "change1D": 2.6,
        "change1W": 6.83,
        "marketCapCr": 19700,
        "pe": 46,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "KA"
      },
      {
        "ticker": "CENTURYPLY",
        "name": "Century Plyboards (India) Ltd",
        "price": 661.6,
        "change1D": 3.5,
        "change1W": 2.38,
        "marketCapCr": 18400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "CE"
      },
      {
        "ticker": "CERA",
        "name": "Cera Sanitaryware Ltd",
        "price": 4845,
        "change1D": 0.96,
        "change1W": 7.74,
        "marketCapCr": 10600,
        "pe": 44,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "CE"
      },
      {
        "ticker": "GREENPANEL",
        "name": "Greenpanel Industries Limited",
        "price": 142.55,
        "change1D": 0.12,
        "change1W": 14.5,
        "marketCapCr": 4600,
        "pe": 32,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "GR"
      },
      {
        "ticker": "GREENPLY",
        "name": "Greenply Industries Limited",
        "price": 270.9,
        "change1D": 1.73,
        "change1W": 2.34,
        "marketCapCr": 4200,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "GR"
      },
      {
        "ticker": "SOMANYCERA",
        "name": "Somany Ceramics Ltd",
        "price": 549.65,
        "change1D": 0.67,
        "change1W": -0.98,
        "marketCapCr": 2890,
        "pe": 29,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SO"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.94,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.96,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.59,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.33,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 98.7,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 97.86,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 96.51,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.91,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 98.27,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 98.36,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 98.02,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 98.4,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 98.36,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 98.67,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 98.96,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 98.93,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 98.98,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 99.55,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 99.87,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 99.58,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 100.01,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 98.83,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 98.89,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 97.45,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 95.82,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 96.58,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 97.99,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 98.17,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 98.46,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 98.97,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 99.89,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 99.24,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 98.7,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 96.75,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 96.07,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 98.36,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 97.86,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 98.11,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 99.22,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 98.78,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 96.39,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 96.45,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 97.59,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 97.23,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 97.27,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 95.58,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 95.69,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 94.42,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 91.94,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 90.56,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 88.03,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 89,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 89.57,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.98,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 90.09,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 87.75,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 87.23,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 88.28,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 89.81,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 90.18,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 89.93,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 91.38,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "paints-coatings",
    "name": "Paints, Surface Coatings & Adhesives",
    "category": "Consumer & Retail",
    "companiesCount": 6,
    "change1D": 0.28,
    "change1W": 4.03,
    "change1M": -10.5,
    "change1Y": -25.2,
    "currentReturn": 4.03,
    "breadthPositivePct": 100,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "ASIANPAINT",
        "name": "Asian Paints Ltd",
        "price": 2518.1,
        "change1D": -1.1,
        "change1W": 7.41,
        "marketCapCr": 266000,
        "pe": 52,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "AS"
      },
      {
        "ticker": "BERGEPAINT",
        "name": "Berger Paints India Ltd",
        "price": 471.15,
        "change1D": -1.51,
        "change1W": 0.54,
        "marketCapCr": 59400,
        "pe": 54,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "BE"
      },
      {
        "ticker": "KANSAINER",
        "name": "Kansai Nerolac Paints Ltd",
        "price": 198.73,
        "change1D": 1.39,
        "change1W": 10.49,
        "marketCapCr": 23800,
        "pe": 34,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "KA"
      },
      {
        "ticker": "INDIGOPNTS",
        "name": "Indigo Paints Limited",
        "price": 916.7,
        "change1D": 0.26,
        "change1W": 5.37,
        "marketCapCr": 7200,
        "pe": 48,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "IN"
      },
      {
        "ticker": "SIRCA",
        "name": "Sirca Paints India Limited",
        "price": 408,
        "change1D": 0.42,
        "change1W": 0.13,
        "marketCapCr": 2100,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SI"
      },
      {
        "ticker": "SHALPAINTS",
        "name": "Shalimar Paints Limited",
        "price": 80.98,
        "change1D": 2.21,
        "change1W": 0.26,
        "marketCapCr": 1250,
        "pe": 45,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "SH"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 98.7,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 98.7,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 99.3,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 99.45,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 100.27,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 98.36,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 97.33,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 97.14,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 97.43,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 97.03,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 95.94,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 96.43,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 95.66,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 94.54,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.09,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 94.41,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 93.68,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 95.18,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 95.6,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 94.91,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 93.97,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 92.97,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 92.66,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 92.2,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 89.5,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 89.52,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 89.84,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 90.16,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 89.95,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 89.64,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 90.63,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 88.75,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 89.62,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 88.17,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 88.62,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 89.26,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 87.67,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 86.92,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 89.25,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 89.43,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 87.33,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 87.52,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 87.77,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 89.12,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 89.83,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 89.53,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 89.93,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 89.91,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 89.44,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 88.8,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 87.48,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 88.11,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 88.49,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 88.07,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 88.18,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 87.16,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 86.16,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 87.55,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 87.72,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 90.42,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 89.23,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 89.5,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "packaging-materials",
    "name": "Packaging - Flexible, Paper, Plastic & Glass",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 7,
    "change1D": 2.91,
    "change1W": 5.6,
    "change1M": 0.72,
    "change1Y": 1.73,
    "currentReturn": 5.6,
    "breadthPositivePct": 86,
    "rotationStatus": "Leading",
    "stocks": [
      {
        "ticker": "EPL",
        "name": "EPL Limited (Essel Propack)",
        "price": 222.27,
        "change1D": 0.43,
        "change1W": 1.84,
        "marketCapCr": 7800,
        "pe": 29,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "EP"
      },
      {
        "ticker": "AGI",
        "name": "AGI Greenpac Limited",
        "price": 682,
        "change1D": 5.65,
        "change1W": 8.56,
        "marketCapCr": 5800,
        "pe": 24,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "AG"
      },
      {
        "ticker": "UFLEX",
        "name": "UFLEX Limited",
        "price": 605,
        "change1D": 5.16,
        "change1W": 6.87,
        "marketCapCr": 4400,
        "pe": 18,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "UF"
      },
      {
        "ticker": "POLYPLEX",
        "name": "Polyplex Corporation Ltd",
        "price": 912,
        "change1D": 4.32,
        "change1W": -0.08,
        "marketCapCr": 3700,
        "pe": 28,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "PO"
      },
      {
        "ticker": "HUHTAMAKI",
        "name": "Huhtamaki India Ltd",
        "price": 220.14,
        "change1D": 3.73,
        "change1W": 0.6,
        "marketCapCr": 2900,
        "pe": 31,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "HU"
      },
      {
        "ticker": "MOLDTKPAC",
        "name": "Mold-Tek Packaging Limited",
        "price": 340.2,
        "change1D": 0.01,
        "change1W": 16.31,
        "marketCapCr": 2650,
        "pe": 38,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "MO"
      },
      {
        "ticker": "TCPLPACK",
        "name": "TCPL Packaging Limited",
        "price": 4478,
        "change1D": 1.06,
        "change1W": 5.07,
        "marketCapCr": 2950,
        "pe": 22,
        "volume": 850000,
        "logoBg": "#0891b2",
        "logoText": "TC"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 103.06,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 105.4,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 104.95,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 103.89,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 106.81,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 107.96,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 107.11,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 108.75,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 110.2,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 109.25,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 107.72,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 109.03,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 107.1,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 108.1,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 109.91,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 108.03,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 109.41,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 109.38,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 109.38,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 108.09,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 108.89,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 109.2,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 108.12,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 106.49,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 102.87,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 103.44,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 103.93,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 104.69,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 106.25,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 105.99,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 108.67,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 107.51,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 107.28,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 104.79,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 105.08,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 106.16,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 104.01,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 103.92,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 104.84,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 104.54,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 102.32,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 103.48,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 104.48,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 104.61,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 104.98,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 103.46,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 103.49,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 101.25,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 98.34,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 96.83,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 93.87,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 96.17,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 95.41,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 97.28,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 97.43,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 94.47,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 95.28,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 95.68,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 99.35,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 100.66,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 98.01,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 100.72,
        "volume": 4420000
      }
    ]
  },
  {
    "id": "paper-forest",
    "name": "Paper, Pulp & Forest Products",
    "category": "Manufacturing & Healthcare",
    "companiesCount": 6,
    "change1D": 0.99,
    "change1W": -0.65,
    "change1M": -0.63,
    "change1Y": -1.51,
    "currentReturn": -0.65,
    "breadthPositivePct": 50,
    "rotationStatus": "Weakening",
    "stocks": [
      {
        "ticker": "JKPAPER",
        "name": "JK Paper Ltd",
        "price": 364.35,
        "change1D": -0.99,
        "change1W": -3.9,
        "marketCapCr": 7880,
        "pe": 11.2,
        "volume": 850000,
        "logoBg": "#1e3a8a",
        "logoText": "JK"
      },
      {
        "ticker": "WSTCSTPAPR",
        "name": "West Coast Paper Mills Ltd",
        "price": 729.4,
        "change1D": -1.19,
        "change1W": -10.08,
        "marketCapCr": 4490,
        "pe": 9.8,
        "volume": 850000,
        "logoBg": "#0284c7",
        "logoText": "WS"
      },
      {
        "ticker": "ANDHRAPAP",
        "name": "Andhra Paper Ltd",
        "price": 62.58,
        "change1D": 1.72,
        "change1W": -3.1,
        "marketCapCr": 2150,
        "pe": 8.5,
        "volume": 850000,
        "logoBg": "#059669",
        "logoText": "AN"
      },
      {
        "ticker": "TNPL",
        "name": "Tamil Nadu Newsprint & Papers",
        "price": 143.03,
        "change1D": 4.97,
        "change1W": 8.13,
        "marketCapCr": 1650,
        "pe": 10.4,
        "volume": 850000,
        "logoBg": "#d97706",
        "logoText": "TN"
      },
      {
        "ticker": "SATIA",
        "name": "Satia Industries Limited",
        "price": 66.05,
        "change1D": -0.17,
        "change1W": 1.57,
        "marketCapCr": 1250,
        "pe": 9.2,
        "volume": 850000,
        "logoBg": "#dc2626",
        "logoText": "SA"
      },
      {
        "ticker": "KUANTUM",
        "name": "Kuantum Papers Limited",
        "price": 66.85,
        "change1D": 1.63,
        "change1W": 3.48,
        "marketCapCr": 1350,
        "pe": 8.8,
        "volume": 850000,
        "logoBg": "#7c3aed",
        "logoText": "KU"
      }
    ],
    "history": [
      {
        "date": "10 Aug",
        "value": 100,
        "volume": 4200000
      },
      {
        "date": "11 Aug",
        "value": 99.61,
        "volume": 4510000
      },
      {
        "date": "12 Aug",
        "value": 100.12,
        "volume": 4820000
      },
      {
        "date": "13 Aug",
        "value": 97.52,
        "volume": 5130000
      },
      {
        "date": "14 Aug",
        "value": 96.7,
        "volume": 5440000
      },
      {
        "date": "17 Aug",
        "value": 96.38,
        "volume": 5750000
      },
      {
        "date": "18 Aug",
        "value": 96.92,
        "volume": 6060000
      },
      {
        "date": "19 Aug",
        "value": 95.92,
        "volume": 6370000
      },
      {
        "date": "20 Aug",
        "value": 96.18,
        "volume": 6680000
      },
      {
        "date": "21 Aug",
        "value": 96.44,
        "volume": 6990000
      },
      {
        "date": "24 Aug",
        "value": 95.73,
        "volume": 7300000
      },
      {
        "date": "25 Aug",
        "value": 94.72,
        "volume": 7610000
      },
      {
        "date": "26 Aug",
        "value": 95.54,
        "volume": 7920000
      },
      {
        "date": "27 Aug",
        "value": 94.88,
        "volume": 4430000
      },
      {
        "date": "28 Aug",
        "value": 95.47,
        "volume": 4740000
      },
      {
        "date": "31 Aug",
        "value": 95.2,
        "volume": 5050000
      },
      {
        "date": "1 Sep",
        "value": 97.42,
        "volume": 5360000
      },
      {
        "date": "2 Sep",
        "value": 96.17,
        "volume": 5670000
      },
      {
        "date": "3 Sep",
        "value": 100.76,
        "volume": 5980000
      },
      {
        "date": "4 Sep",
        "value": 101.47,
        "volume": 6290000
      },
      {
        "date": "7 Sep",
        "value": 107.43,
        "volume": 6600000
      },
      {
        "date": "8 Sep",
        "value": 107.37,
        "volume": 6910000
      },
      {
        "date": "9 Sep",
        "value": 104.15,
        "volume": 7220000
      },
      {
        "date": "10 Sep",
        "value": 107.25,
        "volume": 7530000
      },
      {
        "date": "11 Sep",
        "value": 107.47,
        "volume": 7840000
      },
      {
        "date": "15 Sep",
        "value": 105.89,
        "volume": 4350000
      },
      {
        "date": "16 Sep",
        "value": 107.28,
        "volume": 4660000
      },
      {
        "date": "17 Sep",
        "value": 106.2,
        "volume": 4970000
      },
      {
        "date": "18 Sep",
        "value": 110.1,
        "volume": 5280000
      },
      {
        "date": "21 Sep",
        "value": 108.88,
        "volume": 5590000
      },
      {
        "date": "22 Sep",
        "value": 108.39,
        "volume": 5900000
      },
      {
        "date": "23 Sep",
        "value": 107.95,
        "volume": 6210000
      },
      {
        "date": "24 Sep",
        "value": 108.27,
        "volume": 6520000
      },
      {
        "date": "25 Sep",
        "value": 108.09,
        "volume": 6830000
      },
      {
        "date": "28 Sep",
        "value": 106.3,
        "volume": 7140000
      },
      {
        "date": "29 Sep",
        "value": 105.95,
        "volume": 7450000
      },
      {
        "date": "30 Sep",
        "value": 107.21,
        "volume": 7760000
      },
      {
        "date": "1 Oct",
        "value": 105.51,
        "volume": 4270000
      },
      {
        "date": "5 Oct",
        "value": 104.84,
        "volume": 4580000
      },
      {
        "date": "6 Oct",
        "value": 106.24,
        "volume": 4890000
      },
      {
        "date": "7 Oct",
        "value": 105.08,
        "volume": 5200000
      },
      {
        "date": "8 Oct",
        "value": 101.64,
        "volume": 5510000
      },
      {
        "date": "9 Oct",
        "value": 102.74,
        "volume": 5820000
      },
      {
        "date": "12 Oct",
        "value": 109.16,
        "volume": 6130000
      },
      {
        "date": "13 Oct",
        "value": 107.4,
        "volume": 6440000
      },
      {
        "date": "14 Oct",
        "value": 111.49,
        "volume": 6750000
      },
      {
        "date": "15 Oct",
        "value": 105.68,
        "volume": 7060000
      },
      {
        "date": "16 Oct",
        "value": 106.63,
        "volume": 7370000
      },
      {
        "date": "19 Oct",
        "value": 104.15,
        "volume": 7680000
      },
      {
        "date": "21 Oct",
        "value": 100.84,
        "volume": 7990000
      },
      {
        "date": "22 Oct",
        "value": 100.93,
        "volume": 4500000
      },
      {
        "date": "23 Oct",
        "value": 97.66,
        "volume": 4810000
      },
      {
        "date": "26 Oct",
        "value": 100.2,
        "volume": 5120000
      },
      {
        "date": "27 Oct",
        "value": 102.1,
        "volume": 5430000
      },
      {
        "date": "28 Oct",
        "value": 102.04,
        "volume": 5740000
      },
      {
        "date": "29 Oct",
        "value": 102.67,
        "volume": 6050000
      },
      {
        "date": "30 Oct",
        "value": 100.66,
        "volume": 6360000
      },
      {
        "date": "2 Nov",
        "value": 101,
        "volume": 6670000
      },
      {
        "date": "3 Nov",
        "value": 100,
        "volume": 6980000
      },
      {
        "date": "4 Nov",
        "value": 102.21,
        "volume": 7290000
      },
      {
        "date": "5 Nov",
        "value": 102.31,
        "volume": 7600000
      },
      {
        "date": "6 Nov",
        "value": 98.58,
        "volume": 7910000
      },
      {
        "date": "9 Nov",
        "value": 99.37,
        "volume": 4420000
      }
    ]
  }
];
