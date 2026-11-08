import { SectorIndexData, StockConstituent, HistoricalPricePoint } from '../types/indexTracker';

// Helper to generate realistic daily index points matching the screenshot
function generateIndexHistory(
  baseLevel: number,
  days: number,
  trendBias: number,
  volatility: number,
  dipBottomDay: number
): HistoricalPricePoint[] {
  const points: HistoricalPricePoint[] = [];
  const startDate = new Date(2026, 7, 10); // Aug 10, 2026
  let currentVal = baseLevel;

  for (let i = 0; i < days; i++) {
    const curDate = new Date(startDate);
    curDate.setDate(startDate.getDate() + i);

    // Skip weekends
    if (curDate.getDay() === 0 || curDate.getDay() === 6) continue;

    // Simulate swing matching the screenshot's V-shape or wave
    let dailyDelta = (Math.random() - 0.48) * volatility;
    if (i < dipBottomDay) {
      if (i > dipBottomDay * 0.4) {
        dailyDelta -= Math.abs(trendBias) * 0.7; // downward slide
      } else {
        dailyDelta += Math.random() * 0.3;
      }
    } else {
      dailyDelta += Math.abs(trendBias) * 0.9; // recovery bounce
    }

    currentVal = Math.max(85, Math.min(160, currentVal + dailyDelta));

    const isSpike = i === 12 || i === 34 || i === 38;
    const volume = Math.round(
      isSpike ? 250000 + Math.random() * 150000 : 40000 + Math.random() * 60000
    );

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateFormatted = `${curDate.getDate()} ${monthNames[curDate.getMonth()]}`;

    points.push({
      date: dateFormatted,
      value: parseFloat(currentVal.toFixed(2)),
      volume,
    });
  }

  return points;
}

// 1. Hospitals (Exact match to the screenshot)
const hospitalStocks: StockConstituent[] = [
  { ticker: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd', price: 6940.5, change1D: 0.90, change1W: -0.02, marketCapCr: 99800, pe: 72.4, volume: 480200, logoBg: '#0284c7', logoText: 'AH' },
  { ticker: 'ARTEMISMED', name: 'Artemis Medicare Services Ltd', price: 215.3, change1D: 1.63, change1W: 4.40, marketCapCr: 2950, pe: 42.1, volume: 195000, logoBg: '#d97706', logoText: 'AM' },
  { ticker: 'ASTERDM', name: 'Aster DM Healthcare Ltd', price: 442.1, change1D: -0.89, change1W: 4.70, marketCapCr: 22100, pe: 38.6, volume: 810000, logoBg: '#059669', logoText: 'AD' },
  { ticker: 'DRAGARWQ', name: 'Dr. Agarwals Eye Hospital Ltd', price: 2840.0, change1D: 0.29, change1W: 2.13, marketCapCr: 1340, pe: 31.8, volume: 45000, logoBg: '#2563eb', logoText: 'DA' },
  { ticker: 'FORTIS', name: 'Fortis Healthcare Ltd', price: 618.7, change1D: -6.45, change1W: -0.16, marketCapCr: 46800, pe: 64.3, volume: 1420000, logoBg: '#10b981', logoText: 'FH' },
  { ticker: 'GPTHEALTH', name: 'GPT Healthcare Ltd', price: 178.4, change1D: -0.01, change1W: 8.48, marketCapCr: 1460, pe: 28.5, volume: 320000, logoBg: '#475569', logoText: 'GH' },
  { ticker: 'HCG', name: 'HealthCare Global Enterprises', price: 395.0, change1D: -1.74, change1W: 2.51, marketCapCr: 5520, pe: 88.0, volume: 290000, logoBg: '#ec4899', logoText: 'HG' },
  { ticker: 'INDRAMEDCO', name: 'Indraprastha Medical Corp', price: 388.5, change1D: -1.06, change1W: 8.03, marketCapCr: 3560, pe: 24.1, volume: 410000, logoBg: '#0891b2', logoText: 'IM' },
  { ticker: 'JLHL', name: 'Jupiter Life Line Hospitals', price: 1482.0, change1D: 0.37, change1W: 11.84, marketCapCr: 9710, pe: 51.2, volume: 650000, logoBg: '#eab308', logoText: 'JL' },
  { ticker: 'KIMS', name: 'Krishna Institute of Med Sciences', price: 2510.0, change1D: -1.10, change1W: 3.02, marketCapCr: 20100, pe: 58.7, volume: 380000, logoBg: '#dc2626', logoText: 'KI' },
  { ticker: 'KMCSHIL', name: 'Kovai Medical Center & Hospital', price: 4650.0, change1D: 2.03, change1W: 10.00, marketCapCr: 5100, pe: 33.2, volume: 82000, logoBg: '#f97316', logoText: 'KM' },
  { ticker: 'KOVAI', name: 'KMC Speciality Hospitals', price: 124.8, change1D: 1.12, change1W: 2.28, marketCapCr: 2040, pe: 29.8, volume: 110000, logoBg: '#3b82f6', logoText: 'KV' },
  { ticker: 'MANIPALHOS', name: 'Manipal Health Enterprises', price: 540.0, change1D: -1.61, change1W: -3.36, marketCapCr: 34200, pe: 49.0, volume: 560000, logoBg: '#ea580c', logoText: 'MH' },
];

// Array of all 46 Pre-Built Indices
export const PREBUILT_SECTOR_INDICES: SectorIndexData[] = [
  // 1. Geospatial
  {
    id: 'geospatial',
    name: 'Geospatial',
    category: 'Technology',
    companiesCount: 6,
    change1D: -0.95,
    change1W: 7.48,
    change1M: 14.20,
    change1Y: 52.40,
    currentReturn: 18.25,
    breadthPositivePct: 83,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'MAPMYINDIA', name: 'C.E. Info Systems Ltd', price: 2180.0, change1D: -0.80, change1W: 8.90, marketCapCr: 11800, pe: 85.0, volume: 380000, logoBg: '#0284c7', logoText: 'MI' },
      { ticker: 'GENUSPOWER', name: 'Genus Power Infrastructures Ltd', price: 412.0, change1D: 1.20, change1W: 14.50, marketCapCr: 12400, pe: 54.0, volume: 1200000, logoBg: '#10b981', logoText: 'GP' },
      { ticker: 'RRP', name: 'RRP Semiconductor Ltd', price: 890.0, change1D: -2.10, change1W: 4.80, marketCapCr: 1950, pe: 42.0, volume: 150000, logoBg: '#8b5cf6', logoText: 'RR' },
      { ticker: 'DRONE', name: 'Droneacharya Aerial Innovations', price: 145.0, change1D: -1.40, change1W: 6.20, marketCapCr: 350, pe: 28.0, volume: 450000, logoBg: '#f59e0b', logoText: 'DA' },
      { ticker: 'IDEAFORGE', name: 'Ideaforge Technology Ltd', price: 680.0, change1D: -0.50, change1W: 5.10, marketCapCr: 2980, pe: 62.0, volume: 220000, logoBg: '#ef4444', logoText: 'IF' },
      { ticker: 'ZEN', name: 'Zen Technologies Ltd', price: 1740.0, change1D: -1.20, change1W: 9.40, marketCapCr: 15400, pe: 78.0, volume: 890000, logoBg: '#06b6d4', logoText: 'ZT' },
    ],
    history: generateIndexHistory(100, 45, 0.45, 1.4, 15),
  },

  // 2. Gold Loan Finance
  {
    id: 'gold-loan',
    name: 'Gold Loan Finance',
    category: 'NBFC & Finance',
    companiesCount: 4,
    change1D: 0.29,
    change1W: 11.89,
    change1M: 16.80,
    change1Y: 48.90,
    currentReturn: 24.30,
    breadthPositivePct: 75,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'MUTHOOTFIN', name: 'Muthoot Finance Ltd', price: 2020.0, change1D: 0.45, change1W: 12.80, marketCapCr: 81200, pe: 17.2, volume: 920000, logoBg: '#e11d48', logoText: 'MF' },
      { ticker: 'MANAPPURAM', name: 'Manappuram Finance Ltd', price: 198.5, change1D: 0.15, change1W: 10.40, marketCapCr: 16800, pe: 8.5, volume: 3400000, logoBg: '#f97316', logoText: 'MP' },
      { ticker: 'MUTHOOTCAP', name: 'Muthoot Capital Services Ltd', price: 345.0, change1D: 0.80, change1W: 11.20, marketCapCr: 570, pe: 11.4, volume: 80000, logoBg: '#b91c1c', logoText: 'MC' },
      { ticker: 'IIFL', name: 'IIFL Finance Ltd', price: 420.0, change1D: -0.20, change1W: 13.10, marketCapCr: 17800, pe: 10.8, volume: 1450000, logoBg: '#2563eb', logoText: 'II' },
    ],
    history: generateIndexHistory(98, 45, 0.6, 1.2, 10),
  },

  // 3. Heavy Engineering Equipment
  {
    id: 'heavy-engineering',
    name: 'Heavy Engineering Equipment',
    category: 'Capital Goods',
    companiesCount: 6,
    change1D: -4.69,
    change1W: -2.90,
    change1M: -7.50,
    change1Y: 38.20,
    currentReturn: -6.40,
    breadthPositivePct: 25,
    rotationStatus: 'Weakening',
    stocks: [
      { ticker: 'LT', name: 'Larsen & Toubro Ltd', price: 3580.0, change1D: -2.40, change1W: -1.80, marketCapCr: 492000, pe: 36.5, volume: 1800000, logoBg: '#1e3a8a', logoText: 'LT' },
      { ticker: 'BHEL', name: 'Bharat Heavy Electricals Ltd', price: 238.0, change1D: -5.80, change1W: -4.20, marketCapCr: 82800, pe: 85.0, volume: 14000000, logoBg: '#047857', logoText: 'BH' },
      { ticker: 'THERMAX', name: 'Thermax Ltd', price: 4890.0, change1D: -3.10, change1W: -2.10, marketCapCr: 58200, pe: 94.0, volume: 220000, logoBg: '#b45309', logoText: 'TM' },
      { ticker: 'ELECON', name: 'Elecon Engineering Company Ltd', price: 610.0, change1D: -6.20, change1W: -5.40, marketCapCr: 13600, pe: 39.0, volume: 640000, logoBg: '#4f46e5', logoText: 'EE' },
      { ticker: 'PRAJIND', name: 'Praj Industries Ltd', price: 740.0, change1D: -3.80, change1W: -1.50, marketCapCr: 13600, pe: 46.0, volume: 480000, logoBg: '#059669', logoText: 'PI' },
      { ticker: 'BEML', name: 'BEML Ltd', price: 3820.0, change1D: -6.40, change1W: -4.90, marketCapCr: 15900, pe: 56.0, volume: 390000, logoBg: '#dc2626', logoText: 'BM' },
    ],
    history: generateIndexHistory(135, 45, -0.4, 1.5, 30),
  },

  // 4. Hospitals (The active index in screenshot)
  {
    id: 'hospitals',
    name: 'Hospitals',
    category: 'Healthcare',
    companiesCount: hospitalStocks.length,
    change1D: -0.74,
    change1W: 4.91,
    change1M: -3.20,
    change1Y: 34.80,
    currentReturn: -5.76, // 3M return matching screenshot
    stocks: hospitalStocks,
    breadthPositivePct: 62,
    rotationStatus: 'Improving',
    history: [
      { date: '10 Aug', value: 125.2, volume: 45000 },
      { date: '12 Aug', value: 126.8, volume: 52000 },
      { date: '14 Aug', value: 124.5, volume: 49000 },
      { date: '17 Aug', value: 124.9, volume: 48000 },
      { date: '19 Aug', value: 124.8, volume: 154000 },
      { date: '21 Aug', value: 124.2, volume: 62000 },
      { date: '24 Aug', value: 124.4, volume: 55000 },
      { date: '26 Aug', value: 125.1, volume: 51000 },
      { date: '28 Aug', value: 124.9, volume: 58000 },
      { date: '31 Aug', value: 125.3, volume: 53000 },
      { date: '2 Sep', value: 124.0, volume: 57000 },
      { date: '4 Sep', value: 126.2, volume: 59000 },
      { date: '7 Sep', value: 126.3, volume: 61000 },
      { date: '9 Sep', value: 127.8, volume: 63000 },
      { date: '11 Sep', value: 127.1, volume: 58000 },
      { date: '15 Sep', value: 125.0, volume: 64000 },
      { date: '17 Sep', value: 126.1, volume: 67000 },
      { date: '19 Sep', value: 129.2, volume: 72000 },
      { date: '21 Sep', value: 129.0, volume: 69000 },
      { date: '23 Sep', value: 130.4, volume: 78000 },
      { date: '25 Sep', value: 128.5, volume: 74000 },
      { date: '28 Sep', value: 126.2, volume: 88000 },
      { date: '30 Sep', value: 125.9, volume: 82000 },
      { date: '2 Oct', value: 122.4, volume: 92000 },
      { date: '5 Oct', value: 120.1, volume: 104000 },
      { date: '7 Oct', value: 120.3, volume: 75000 },
      { date: '9 Oct', value: 117.8, volume: 73000 },
      { date: '12 Oct', value: 119.2, volume: 79000 },
      { date: '14 Oct', value: 116.5, volume: 71000 },
      { date: '16 Oct', value: 115.8, volume: 68000 },
      { date: '19 Oct', value: 116.2, volume: 67000 },
      { date: '21 Oct', value: 114.9, volume: 69000 },
      { date: '23 Oct', value: 110.8, volume: 72000 },
      { date: '26 Oct', value: 107.5, volume: 74000 },
      { date: '28 Oct', value: 112.4, volume: 76000 },
      { date: '30 Oct', value: 115.1, volume: 78000 },
      { date: '2 Nov', value: 115.0, volume: 81000 },
      { date: '4 Nov', value: 117.2, volume: 84000 },
      { date: '6 Nov', value: 120.8, volume: 86000 },
      { date: '7 Nov', value: 119.5, volume: 79000 },
    ],
  },

  // 5. Aerospace & Defence
  {
    id: 'defence',
    name: 'Aerospace & Defence',
    category: 'Capital Goods',
    companiesCount: 6,
    change1D: 1.15,
    change1W: 8.65,
    change1M: 12.40,
    change1Y: 96.50,
    currentReturn: 19.80,
    breadthPositivePct: 86,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'HAL', name: 'Hindustan Aeronautics Ltd', price: 4420.0, change1D: 1.45, change1W: 9.20, marketCapCr: 295000, pe: 38.4, volume: 2400000, logoBg: '#0284c7', logoText: 'HL' },
      { ticker: 'BEL', name: 'Bharat Electronics Ltd', price: 294.0, change1D: 1.20, change1W: 8.10, marketCapCr: 215000, pe: 48.0, volume: 9800000, logoBg: '#16a34a', logoText: 'BE' },
      { ticker: 'BDL', name: 'Bharat Dynamics Ltd', price: 1140.0, change1D: 0.90, change1W: 7.80, marketCapCr: 41800, pe: 52.0, volume: 1100000, logoBg: '#9333ea', logoText: 'BD' },
      { ticker: 'MAZDOCK', name: 'Mazagon Dock Shipbuilders Ltd', price: 4250.0, change1D: 2.10, change1W: 11.40, marketCapCr: 85700, pe: 39.5, volume: 1850000, logoBg: '#0891b2', logoText: 'MD' },
      { ticker: 'COCHINSHIP', name: 'Cochin Shipyard Ltd', price: 1540.0, change1D: 1.60, change1W: 9.80, marketCapCr: 40500, pe: 46.0, volume: 2200000, logoBg: '#ea580c', logoText: 'CS' },
      { ticker: 'GRSE', name: 'Garden Reach Shipbuilders Ltd', price: 1680.0, change1D: 0.40, change1W: 6.90, marketCapCr: 19200, pe: 44.0, volume: 850000, logoBg: '#475569', logoText: 'GR' },
    ],
    history: generateIndexHistory(102, 45, 0.7, 1.6, 12),
  },

  // 6. Solar & Renewable Energy
  {
    id: 'solar-renewable',
    name: 'Solar & Renewable Energy',
    category: 'Energy & Power',
    companiesCount: 5,
    change1D: 2.30,
    change1W: 14.50,
    change1M: 22.80,
    change1Y: 142.00,
    currentReturn: 31.40,
    breadthPositivePct: 83,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'WAAREEENER', name: 'Waaree Energies Ltd', price: 2438.0, change1D: -1.45, change1W: -5.82, marketCapCr: 69800, pe: 42.0, volume: 3400000, logoBg: '#f59e0b', logoText: 'WE' },
      { ticker: 'PREMIERENE', name: 'Premier Energies Ltd', price: 1120.0, change1D: 2.80, change1W: 18.20, marketCapCr: 50400, pe: 64.0, volume: 2800000, logoBg: '#10b981', logoText: 'PE' },
      { ticker: 'SUZLON', name: 'Suzlon Energy Ltd', price: 38.8, change1D: 0.80, change1W: 1.40, marketCapCr: 53500, pe: 68.0, volume: 45000000, logoBg: '#0284c7', logoText: 'SE' },
      { ticker: 'INOXWIND', name: 'Inox Wind Ltd', price: 215.0, change1D: 2.10, change1W: 12.40, marketCapCr: 28000, pe: 52.0, volume: 6200000, logoBg: '#6366f1', logoText: 'IW' },
      { ticker: 'BORORENEW', name: 'Borosil Renewables Ltd', price: 510.0, change1D: -0.40, change1W: 4.80, marketCapCr: 6650, pe: 48.0, volume: 750000, logoBg: '#059669', logoText: 'BR' },
    ],
    history: generateIndexHistory(95, 45, 0.85, 1.8, 8),
  },

  // 7. Railways & Infrastructure
  {
    id: 'railways',
    name: 'Railways & Infrastructure',
    category: 'Capital Goods',
    companiesCount: 6,
    change1D: -0.85,
    change1W: 3.40,
    change1M: -2.10,
    change1Y: 64.00,
    currentReturn: 4.20,
    breadthPositivePct: 57,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'IRFC', name: 'Indian Railway Finance Corp', price: 154.0, change1D: -0.60, change1W: 2.80, marketCapCr: 201000, pe: 31.0, volume: 18000000, logoBg: '#1e3a8a', logoText: 'IF' },
      { ticker: 'RVNL', name: 'Rail Vikas Nigam Ltd', price: 435.0, change1D: -1.20, change1W: 4.20, marketCapCr: 90600, pe: 58.0, volume: 12000000, logoBg: '#dc2626', logoText: 'RV' },
      { ticker: 'IRCON', name: 'Ircon International Ltd', price: 218.0, change1D: -0.40, change1W: 3.10, marketCapCr: 20500, pe: 24.0, volume: 4500000, logoBg: '#0284c7', logoText: 'II' },
      { ticker: 'TITAGARH', name: 'Titagarh Rail Systems Ltd', price: 1240.0, change1D: 0.80, change1W: 5.60, marketCapCr: 16700, pe: 54.0, volume: 1100000, logoBg: '#eab308', logoText: 'TR' },
      { ticker: 'JUPITERWAG', name: 'Jupiter Wagons Ltd', price: 495.0, change1D: -1.50, change1W: 1.90, marketCapCr: 20400, pe: 51.0, volume: 920000, logoBg: '#10b981', logoText: 'JW' },
      { ticker: 'RAILTEL', name: 'RailTel Corporation of India', price: 388.0, change1D: -0.80, change1W: 4.50, marketCapCr: 12400, pe: 45.0, volume: 1400000, logoBg: '#8b5cf6', logoText: 'RT' },
    ],
    history: generateIndexHistory(115, 45, 0.15, 1.5, 24),
  },

  // 8. EMS & Electronics Manufacturing
  {
    id: 'ems',
    name: 'EMS & Electronic Manufacturing',
    category: 'Electronics',
    companiesCount: 5,
    change1D: 1.80,
    change1W: 10.40,
    change1M: 18.50,
    change1Y: 115.00,
    currentReturn: 26.80,
    breadthPositivePct: 100,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'DIXON', name: 'Dixon Technologies Ltd', price: 15400.0, change1D: 2.10, change1W: 11.20, marketCapCr: 92100, pe: 112.0, volume: 380000, logoBg: '#0284c7', logoText: 'DX' },
      { ticker: 'KAYNES', name: 'Kaynes Technology India Ltd', price: 5450.0, change1D: 1.80, change1W: 12.80, marketCapCr: 34800, pe: 135.0, volume: 540000, logoBg: '#059669', logoText: 'KT' },
      { ticker: 'SYRMA', name: 'Syrma SGS Technology Ltd', price: 485.0, change1D: 1.20, change1W: 8.40, marketCapCr: 8560, pe: 64.0, volume: 920000, logoBg: '#d97706', logoText: 'SS' },
      { ticker: 'PGEL', name: 'PG Electroplast Ltd', price: 620.0, change1D: 2.50, change1W: 14.20, marketCapCr: 16200, pe: 88.0, volume: 780000, logoBg: '#7c3aed', logoText: 'PG' },
      { ticker: 'CYIENTDLM', name: 'Cyient DLM Ltd', price: 675.0, change1D: 1.40, change1W: 7.90, marketCapCr: 5350, pe: 68.0, volume: 410000, logoBg: '#0891b2', logoText: 'CD' },
    ],
    history: generateIndexHistory(92, 45, 0.75, 1.7, 10),
  },

  // 9. Cables & Wires
  {
    id: 'cables-wires',
    name: 'Cables & Wires - Electricals',
    category: 'Capital Goods',
    companiesCount: 4,
    change1D: 0.45,
    change1W: 6.80,
    change1M: 9.40,
    change1Y: 58.00,
    currentReturn: 12.40,
    breadthPositivePct: 80,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'POLYCAB', name: 'Polycab India Ltd', price: 6820.0, change1D: 0.60, change1W: 7.20, marketCapCr: 102400, pe: 54.0, volume: 620000, logoBg: '#dc2626', logoText: 'PC' },
      { ticker: 'KEI', name: 'KEI Industries Ltd', price: 4350.0, change1D: 0.90, change1W: 8.50, marketCapCr: 39200, pe: 61.0, volume: 290000, logoBg: '#1e3a8a', logoText: 'KI' },
      { ticker: 'RRKABEL', name: 'R R Kabel Ltd', price: 1680.0, change1D: -0.20, change1W: 4.80, marketCapCr: 18900, pe: 58.0, volume: 310000, logoBg: '#059669', logoText: 'RR' },
      { ticker: 'FINCABLES', name: 'Finolex Cables Ltd', price: 1240.0, change1D: 0.40, change1W: 6.20, marketCapCr: 18900, pe: 32.0, volume: 450000, logoBg: '#d97706', logoText: 'FC' },
    ],
    history: generateIndexHistory(108, 45, 0.35, 1.3, 18),
  },

  // 10. Private Banking
  {
    id: 'private-banks',
    name: 'Private Sector Banking',
    category: 'Banking',
    companiesCount: 5,
    change1D: -0.35,
    change1W: 1.80,
    change1M: 3.20,
    change1Y: 16.50,
    currentReturn: 2.10,
    breadthPositivePct: 50,
    rotationStatus: 'Weakening',
    stocks: [
      { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1740.0, change1D: -0.40, change1W: 1.50, marketCapCr: 1320000, pe: 19.4, volume: 14500000, logoBg: '#1e3a8a', logoText: 'HD' },
      { ticker: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1260.0, change1D: -0.20, change1W: 2.40, marketCapCr: 885000, pe: 18.2, volume: 11000000, logoBg: '#ea580c', logoText: 'IC' },
      { ticker: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1780.0, change1D: -0.80, change1W: 0.90, marketCapCr: 354000, pe: 21.0, volume: 3400000, logoBg: '#dc2626', logoText: 'KM' },
      { ticker: 'AXISBANK', name: 'Axis Bank Ltd', price: 1180.0, change1D: -0.10, change1W: 2.20, marketCapCr: 364000, pe: 13.8, volume: 6200000, logoBg: '#991b1b', logoText: 'AX' },
      { ticker: 'FEDERALBNK', name: 'Federal Bank Ltd', price: 198.0, change1D: 0.50, change1W: 3.10, marketCapCr: 48500, pe: 12.0, volume: 9200000, logoBg: '#0284c7', logoText: 'FB' },
    ],
    history: generateIndexHistory(120, 45, 0.05, 0.8, 20),
  },

  // 11. PSU Banking
  {
    id: 'psu-banks',
    name: 'PSU Banking Index',
    category: 'Banking',
    companiesCount: 4,
    change1D: 0.85,
    change1W: 5.40,
    change1M: -1.20,
    change1Y: 42.00,
    currentReturn: 3.80,
    breadthPositivePct: 83,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'SBIN', name: 'State Bank of India', price: 820.0, change1D: 0.90, change1W: 5.20, marketCapCr: 731000, pe: 10.8, volume: 16000000, logoBg: '#0284c7', logoText: 'SB' },
      { ticker: 'BANKBARODA', name: 'Bank of Baroda', price: 252.0, change1D: 1.10, change1W: 6.10, marketCapCr: 130000, pe: 7.2, volume: 14000000, logoBg: '#ea580c', logoText: 'BO' },
      { ticker: 'PNB', name: 'Punjab National Bank', price: 108.0, change1D: 0.60, change1W: 4.80, marketCapCr: 119000, pe: 10.4, volume: 24000000, logoBg: '#991b1b', logoText: 'PN' },
      { ticker: 'CANBK', name: 'Canara Bank', price: 104.0, change1D: 0.80, change1W: 5.80, marketCapCr: 94000, pe: 6.2, volume: 18000000, logoBg: '#0891b2', logoText: 'CB' },
    ],
    history: generateIndexHistory(112, 45, 0.2, 1.2, 22),
  },

  // 12. Hotels & Hospitality
  {
    id: 'hotels-hospitality',
    name: 'Hotels & Hospitality',
    category: 'Consumer Services',
    companiesCount: 4,
    change1D: 1.20,
    change1W: 8.90,
    change1M: 14.50,
    change1Y: 54.00,
    currentReturn: 16.20,
    breadthPositivePct: 100,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'INDHOTEL', name: 'Indian Hotels Co Ltd (Taj)', price: 740.0, change1D: 1.40, change1W: 9.80, marketCapCr: 105000, pe: 74.0, volume: 3200000, logoBg: '#1e3a8a', logoText: 'IH' },
      { ticker: 'EIHOTEL', name: 'EIH Ltd (Oberoi Hotels)', price: 420.0, change1D: 1.10, change1W: 8.20, marketCapCr: 26200, pe: 42.0, volume: 950000, logoBg: '#059669', logoText: 'EI' },
      { ticker: 'CHALET', name: 'Chalet Hotels Ltd', price: 880.0, change1D: 0.90, change1W: 7.40, marketCapCr: 18100, pe: 62.0, volume: 420000, logoBg: '#d97706', logoText: 'CH' },
      { ticker: 'LEMONTREE', name: 'Lemon Tree Hotels Ltd', price: 135.0, change1D: 1.50, change1W: 10.20, marketCapCr: 10700, pe: 68.0, volume: 4800000, logoBg: '#eab308', logoText: 'LT' },
    ],
    history: generateIndexHistory(98, 45, 0.65, 1.4, 12),
  },

  // 13. Real Estate
  {
    id: 'real-estate',
    name: 'Real Estate & Developers',
    category: 'Realty',
    companiesCount: 4,
    change1D: -1.20,
    change1W: 2.10,
    change1M: -4.80,
    change1Y: 62.00,
    currentReturn: -1.40,
    breadthPositivePct: 33,
    rotationStatus: 'Lagging',
    stocks: [
      { ticker: 'DLF', name: 'DLF Ltd', price: 820.0, change1D: -1.40, change1W: 1.80, marketCapCr: 203000, pe: 65.0, volume: 3800000, logoBg: '#1e3a8a', logoText: 'DL' },
      { ticker: 'GODREJPROP', name: 'Godrej Properties Ltd', price: 2940.0, change1D: -1.10, change1W: 2.50, marketCapCr: 81700, pe: 88.0, volume: 1100000, logoBg: '#059669', logoText: 'GP' },
      { ticker: 'OBEROIRLTY', name: 'Oberoi Realty Ltd', price: 1980.0, change1D: -0.90, change1W: 1.40, marketCapCr: 72000, pe: 34.0, volume: 680000, logoBg: '#dc2626', logoText: 'OR' },
      { ticker: 'PRESTIGE', name: 'Prestige Estates Projects', price: 1680.0, change1D: -1.80, change1W: 2.80, marketCapCr: 67300, pe: 58.0, volume: 850000, logoBg: '#d97706', logoText: 'PE' },
    ],
    history: generateIndexHistory(128, 45, -0.3, 1.5, 28),
  },

  // 14. Speciality Chemicals
  {
    id: 'chemicals-speciality',
    name: 'Speciality Chemicals',
    category: 'Chemicals',
    companiesCount: 4,
    change1D: 0.10,
    change1W: 3.80,
    change1M: 6.20,
    change1Y: -4.50,
    currentReturn: 4.80,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'DEEPAKNTR', name: 'Deepak Nitrite Ltd', price: 2840.0, change1D: 0.50, change1W: 4.80, marketCapCr: 38700, pe: 45.0, volume: 620000, logoBg: '#dc2626', logoText: 'DN' },
      { ticker: 'TATACHEM', name: 'Tata Chemicals Ltd', price: 1040.0, change1D: -0.40, change1W: 2.90, marketCapCr: 26500, pe: 28.0, volume: 1400000, logoBg: '#0284c7', logoText: 'TC' },
      { ticker: 'PIIND', name: 'PI Industries Ltd', price: 4420.0, change1D: 0.80, change1W: 5.10, marketCapCr: 67100, pe: 41.0, volume: 380000, logoBg: '#10b981', logoText: 'PI' },
      { ticker: 'NAVINFLUOR', name: 'Navin Fluorine International', price: 3420.0, change1D: -0.20, change1W: 3.40, marketCapCr: 16900, pe: 68.0, volume: 450000, logoBg: '#7c3aed', logoText: 'NF' },
    ],
    history: generateIndexHistory(102, 45, 0.25, 1.2, 16),
  },

  // 15. Agro Chemicals & Pesticides
  {
    id: 'agro-chemicals',
    name: 'Agro Chemicals & Pesticides',
    category: 'Chemicals',
    companiesCount: 4,
    change1D: 0.40,
    change1W: 4.20,
    change1M: 5.80,
    change1Y: 8.40,
    currentReturn: 3.90,
    breadthPositivePct: 75,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'UPL', name: 'UPL Limited', price: 560.0, change1D: 0.80, change1W: 4.90, marketCapCr: 42000, pe: 18.0, volume: 3100000, logoBg: '#047857', logoText: 'UP' },
      { ticker: 'SUMICHEM', name: 'Sumitomo Chemical India Ltd', price: 535.0, change1D: 0.30, change1W: 3.80, marketCapCr: 26700, pe: 48.0, volume: 550000, logoBg: '#b45309', logoText: 'SC' },
      { ticker: 'BAYERCROP', name: 'Bayer CropScience Ltd', price: 6150.0, change1D: 0.10, change1W: 3.40, marketCapCr: 27600, pe: 36.0, volume: 80000, logoBg: '#0284c7', logoText: 'BC' },
      { ticker: 'DHANUKA', name: 'Dhanuka Agritech Ltd', price: 1640.0, change1D: 0.60, change1W: 4.80, marketCapCr: 7500, pe: 31.0, volume: 180000, logoBg: '#15803d', logoText: 'DA' },
    ],
    history: generateIndexHistory(105, 45, 0.2, 1.1, 18),
  },

  // 16. Auto Components & Ancillaries
  {
    id: 'auto-components',
    name: 'Auto Components & Ancillaries',
    category: 'Automobile',
    companiesCount: 5,
    change1D: 0.90,
    change1W: 6.40,
    change1M: 8.90,
    change1Y: 48.00,
    currentReturn: 11.20,
    breadthPositivePct: 80,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'MOTHERSON', name: 'Samvardhana Motherson Int', price: 172.0, change1D: 1.20, change1W: 7.40, marketCapCr: 117000, pe: 38.0, volume: 18000000, logoBg: '#dc2626', logoText: 'SM' },
      { ticker: 'SONACOMS', name: 'Sona BLW Precision Forgings', price: 685.0, change1D: 0.70, change1W: 5.80, marketCapCr: 40200, pe: 64.0, volume: 1200000, logoBg: '#2563eb', logoText: 'SB' },
      { ticker: 'BOSCHLTD', name: 'Bosch Limited', price: 34500.0, change1D: 0.40, change1W: 4.90, marketCapCr: 101700, pe: 44.0, volume: 60000, logoBg: '#dc2626', logoText: 'BL' },
      { ticker: 'UNOMINDA', name: 'Uno Minda Ltd', price: 1020.0, change1D: 1.50, change1W: 8.60, marketCapCr: 58600, pe: 59.0, volume: 920000, logoBg: '#059669', logoText: 'UM' },
      { ticker: 'CRAFTSMAN', name: 'Craftsman Automation Ltd', price: 5400.0, change1D: 0.80, change1W: 5.20, marketCapCr: 11400, pe: 39.0, volume: 90000, logoBg: '#7c3aed', logoText: 'CA' },
    ],
    history: generateIndexHistory(104, 45, 0.4, 1.3, 14),
  },

  // 17. Commercial Vehicles
  {
    id: 'commercial-vehicles',
    name: 'Commercial Vehicles',
    category: 'Automobile',
    companiesCount: 3,
    change1D: -0.60,
    change1W: 1.90,
    change1M: -3.40,
    change1Y: 34.00,
    currentReturn: -1.20,
    breadthPositivePct: 33,
    rotationStatus: 'Lagging',
    stocks: [
      { ticker: 'ASHOKLEY', name: 'Ashok Leyland Ltd', price: 218.0, change1D: -0.80, change1W: 1.50, marketCapCr: 64000, pe: 24.0, volume: 11000000, logoBg: '#1e3a8a', logoText: 'AL' },
      { ticker: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 790.0, change1D: -0.40, change1W: 2.10, marketCapCr: 290000, pe: 11.2, volume: 14000000, logoBg: '#0284c7', logoText: 'TM' },
      { ticker: 'FORCE', name: 'Force Motors Ltd', price: 6850.0, change1D: -0.70, change1W: 2.20, marketCapCr: 9020, pe: 22.0, volume: 120000, logoBg: '#ea580c', logoText: 'FM' },
    ],
    history: generateIndexHistory(124, 45, -0.2, 1.4, 25),
  },

  // 18. 2/3 Wheelers
  {
    id: 'two-wheelers',
    name: '2/3 Wheelers',
    category: 'Automobile',
    companiesCount: 4,
    change1D: 1.10,
    change1W: 5.60,
    change1M: 7.80,
    change1Y: 62.00,
    currentReturn: 9.40,
    breadthPositivePct: 75,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd', price: 9240.0, change1D: 1.40, change1W: 6.20, marketCapCr: 258000, pe: 32.0, volume: 620000, logoBg: '#1e3a8a', logoText: 'BA' },
      { ticker: 'TVSMOTOR', name: 'TVS Motor Company Ltd', price: 2420.0, change1D: 1.60, change1W: 7.10, marketCapCr: 115000, pe: 49.0, volume: 1100000, logoBg: '#dc2626', logoText: 'TM' },
      { ticker: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', price: 4720.0, change1D: 0.60, change1W: 4.20, marketCapCr: 94400, pe: 24.0, volume: 850000, logoBg: '#ea580c', logoText: 'HM' },
      { ticker: 'EICHERMOT', name: 'Eicher Motors Ltd (Royal Enfield)', price: 4890.0, change1D: 0.80, change1W: 4.80, marketCapCr: 134000, pe: 31.0, volume: 740000, logoBg: '#15803d', logoText: 'EM' },
    ],
    history: generateIndexHistory(106, 45, 0.45, 1.3, 14),
  },

  // 19. Passenger Cars & EVs
  {
    id: 'passenger-cars-ev',
    name: 'Passenger Cars & EVs',
    category: 'Automobile',
    companiesCount: 3,
    change1D: 0.50,
    change1W: 3.20,
    change1M: 1.40,
    change1Y: 28.00,
    currentReturn: 4.10,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'MARUTI', name: 'Maruti Suzuki India Ltd', price: 11200.0, change1D: 0.60, change1W: 3.40, marketCapCr: 352000, pe: 26.0, volume: 680000, logoBg: '#1e3a8a', logoText: 'MS' },
      { ticker: 'M&M', name: 'Mahindra & Mahindra Ltd', price: 2980.0, change1D: 0.80, change1W: 4.50, marketCapCr: 370000, pe: 31.0, volume: 2200000, logoBg: '#dc2626', logoText: 'MM' },
      { ticker: 'HYUNDAI', name: 'Hyundai Motor India Ltd', price: 1820.0, change1D: 0.10, change1W: 1.80, marketCapCr: 148000, pe: 24.5, volume: 1800000, logoBg: '#0284c7', logoText: 'HM' },
    ],
    history: generateIndexHistory(109, 45, 0.2, 1.1, 19),
  },

  // 20. IT Services - Large Caps
  {
    id: 'it-largecap',
    name: 'IT Services - Large Caps',
    category: 'Information Tech',
    companiesCount: 5,
    change1D: 0.40,
    change1W: 2.10,
    change1M: 4.80,
    change1Y: 24.00,
    currentReturn: 5.20,
    breadthPositivePct: 60,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'TCS', name: 'Tata Consultancy Services', price: 4180.0, change1D: 0.50, change1W: 2.40, marketCapCr: 1510000, pe: 29.5, volume: 1900000, logoBg: '#1e3a8a', logoText: 'TC' },
      { ticker: 'INFY', name: 'Infosys Limited', price: 1860.0, change1D: 0.60, change1W: 2.80, marketCapCr: 772000, pe: 27.8, volume: 6500000, logoBg: '#0284c7', logoText: 'IN' },
      { ticker: 'HCLTECH', name: 'HCL Technologies Ltd', price: 1840.0, change1D: 0.40, change1W: 1.90, marketCapCr: 498000, pe: 28.4, volume: 2200000, logoBg: '#0891b2', logoText: 'HC' },
      { ticker: 'WIPRO', name: 'Wipro Limited', price: 560.0, change1D: 0.10, change1W: 0.90, marketCapCr: 292000, pe: 23.0, volume: 4800000, logoBg: '#7c3aed', logoText: 'WP' },
      { ticker: 'TECHM', name: 'Tech Mahindra Ltd', price: 1680.0, change1D: 0.30, change1W: 2.50, marketCapCr: 164000, pe: 42.0, volume: 1500000, logoBg: '#dc2626', logoText: 'TM' },
    ],
    history: generateIndexHistory(101, 45, 0.25, 0.9, 15),
  },

  // 21. IT Services - Mid & Small Caps
  {
    id: 'it-midcaps',
    name: 'IT Services - Mid & Small Caps',
    category: 'Information Tech',
    companiesCount: 5,
    change1D: 1.20,
    change1W: 6.90,
    change1M: 11.40,
    change1Y: 48.00,
    currentReturn: 14.50,
    breadthPositivePct: 80,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'PERSISTENT', name: 'Persistent Systems Ltd', price: 5620.0, change1D: 1.50, change1W: 8.20, marketCapCr: 86500, pe: 64.0, volume: 640000, logoBg: '#f97316', logoText: 'PS' },
      { ticker: 'COFORGE', name: 'Coforge Limited', price: 7850.0, change1D: 1.80, change1W: 9.10, marketCapCr: 52400, pe: 52.0, volume: 520000, logoBg: '#059669', logoText: 'CF' },
      { ticker: 'KPITTECH', name: 'KPIT Technologies Ltd', price: 1740.0, change1D: 0.90, change1W: 6.40, marketCapCr: 47600, pe: 68.0, volume: 1100000, logoBg: '#2563eb', logoText: 'KP' },
      { ticker: 'LTIM', name: 'LTIMindtree Ltd', price: 5920.0, change1D: 0.60, change1W: 4.50, marketCapCr: 175000, pe: 36.0, volume: 480000, logoBg: '#1e3a8a', logoText: 'LT' },
      { ticker: 'BSOFT', name: 'Birlasoft Ltd', price: 610.0, change1D: 1.10, change1W: 6.20, marketCapCr: 17200, pe: 26.0, volume: 1400000, logoBg: '#b45309', logoText: 'BS' },
    ],
    history: generateIndexHistory(98, 45, 0.6, 1.4, 11),
  },

  // 22. Pharma Formulations
  {
    id: 'pharma-formulations',
    name: 'Pharma - Formulations & Generic',
    category: 'Healthcare',
    companiesCount: 5,
    change1D: 0.20,
    change1W: 3.10,
    change1M: 6.80,
    change1Y: 42.00,
    currentReturn: 7.80,
    breadthPositivePct: 60,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'SUNPHARMA', name: 'Sun Pharmaceutical Ind Ltd', price: 1820.0, change1D: 0.30, change1W: 3.50, marketCapCr: 436000, pe: 38.0, volume: 2200000, logoBg: '#ea580c', logoText: 'SP' },
      { ticker: 'CIPLA', name: 'Cipla Limited', price: 1540.0, change1D: 0.40, change1W: 3.80, marketCapCr: 124000, pe: 26.0, volume: 1800000, logoBg: '#dc2626', logoText: 'CP' },
      { ticker: 'DRREDDY', name: 'Dr Reddys Laboratories Ltd', price: 6540.0, change1D: 0.10, change1W: 2.40, marketCapCr: 109000, pe: 18.5, volume: 620000, logoBg: '#0284c7', logoText: 'DR' },
      { ticker: 'TORNTPHARM', name: 'Torrent Pharmaceuticals Ltd', price: 3240.0, change1D: 0.50, change1W: 4.10, marketCapCr: 109000, pe: 58.0, volume: 380000, logoBg: '#059669', logoText: 'TP' },
      { ticker: 'MANKIND', name: 'Mankind Pharma Ltd', price: 2640.0, change1D: -0.20, change1W: 1.80, marketCapCr: 106000, pe: 46.0, volume: 540000, logoBg: '#2563eb', logoText: 'MP' },
    ],
    history: generateIndexHistory(102, 45, 0.3, 1.0, 16),
  },

  // 23. Pharma API & CDMO
  {
    id: 'pharma-api-cdmo',
    name: 'Pharma API & CDMO',
    category: 'Healthcare',
    companiesCount: 4,
    change1D: 0.80,
    change1W: 5.40,
    change1M: 9.80,
    change1Y: 36.00,
    currentReturn: 11.50,
    breadthPositivePct: 75,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'DIVISLAB', name: 'Divis Laboratories Ltd', price: 5820.0, change1D: 1.10, change1W: 6.20, marketCapCr: 154000, pe: 72.0, volume: 550000, logoBg: '#1e3a8a', logoText: 'DL' },
      { ticker: 'LAURUSLABS', name: 'Laurus Labs Ltd', price: 470.0, change1D: 0.80, change1W: 5.40, marketCapCr: 25400, pe: 82.0, volume: 1800000, logoBg: '#059669', logoText: 'LL' },
      { ticker: 'SUVENPHAR', name: 'Suven Pharmaceuticals Ltd', price: 1180.0, change1D: 0.60, change1W: 4.90, marketCapCr: 30000, pe: 74.0, volume: 380000, logoBg: '#d97706', logoText: 'SP' },
      { ticker: 'SYNGENE', name: 'Syngene International Ltd', price: 890.0, change1D: 0.70, change1W: 5.10, marketCapCr: 35800, pe: 64.0, volume: 490000, logoBg: '#0284c7', logoText: 'SI' },
    ],
    history: generateIndexHistory(100, 45, 0.45, 1.2, 12),
  },

  // 24. Diagnostics & Pathlabs
  {
    id: 'diagnostics',
    name: 'Diagnostics & Pathlabs',
    category: 'Healthcare',
    companiesCount: 3,
    change1D: 0.30,
    change1W: 4.80,
    change1M: 7.20,
    change1Y: 22.00,
    currentReturn: 8.10,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'LALPATHLAB', name: 'Dr. Lal PathLabs Ltd', price: 3120.0, change1D: 0.40, change1W: 5.20, marketCapCr: 26100, pe: 65.0, volume: 240000, logoBg: '#dc2626', logoText: 'LP' },
      { ticker: 'METROPOLIS', name: 'Metropolis Healthcare Ltd', price: 2180.0, change1D: 0.20, change1W: 4.50, marketCapCr: 11200, pe: 72.0, volume: 290000, logoBg: '#2563eb', logoText: 'MH' },
      { ticker: 'VIJAYA', name: 'Vijaya Diagnostic Centre Ltd', price: 980.0, change1D: 0.50, change1W: 4.90, marketCapCr: 10100, pe: 62.0, volume: 380000, logoBg: '#059669', logoText: 'VD' },
    ],
    history: generateIndexHistory(104, 45, 0.35, 1.1, 16),
  },

  // 25. Cement & Cement Products
  {
    id: 'cement-products',
    name: 'Cement & Cement Products',
    category: 'Materials',
    companiesCount: 4,
    change1D: -0.40,
    change1W: 2.40,
    change1M: -1.80,
    change1Y: 18.00,
    currentReturn: 1.50,
    breadthPositivePct: 50,
    rotationStatus: 'Weakening',
    stocks: [
      { ticker: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', price: 11200.0, change1D: -0.20, change1W: 2.80, marketCapCr: 323000, pe: 42.0, volume: 410000, logoBg: '#eab308', logoText: 'UT' },
      { ticker: 'AMBUJACEM', name: 'Ambuja Cements Ltd', price: 580.0, change1D: -0.60, change1W: 2.10, marketCapCr: 143000, pe: 38.0, volume: 3200000, logoBg: '#0284c7', logoText: 'AC' },
      { ticker: 'SHREECEM', name: 'Shree Cement Ltd', price: 24500.0, change1D: -0.50, change1W: 1.90, marketCapCr: 88400, pe: 39.0, volume: 90000, logoBg: '#dc2626', logoText: 'SC' },
      { ticker: 'DALBHARAT', name: 'Dalmia Bharat Ltd', price: 1840.0, change1D: -0.30, change1W: 2.60, marketCapCr: 34500, pe: 36.0, volume: 280000, logoBg: '#047857', logoText: 'DB' },
    ],
    history: generateIndexHistory(116, 45, -0.05, 1.2, 22),
  },

  // 26. Steel & Iron Products
  {
    id: 'steel-iron',
    name: 'Steel & Iron Products',
    category: 'Metals & Mining',
    companiesCount: 4,
    change1D: -1.10,
    change1W: 1.40,
    change1M: -5.20,
    change1Y: 14.00,
    currentReturn: -3.80,
    breadthPositivePct: 25,
    rotationStatus: 'Lagging',
    stocks: [
      { ticker: 'TATASTEEL', name: 'Tata Steel Ltd', price: 148.0, change1D: -1.20, change1W: 1.20, marketCapCr: 184000, pe: 34.0, volume: 28000000, logoBg: '#1e3a8a', logoText: 'TS' },
      { ticker: 'JSWSTEEL', name: 'JSW Steel Ltd', price: 980.0, change1D: -0.90, change1W: 1.80, marketCapCr: 239000, pe: 26.0, volume: 2200000, logoBg: '#0284c7', logoText: 'JS' },
      { ticker: 'JINDALSTEL', name: 'Jindal Steel & Power Ltd', price: 960.0, change1D: -1.40, change1W: 1.10, marketCapCr: 97900, pe: 16.0, volume: 1900000, logoBg: '#dc2626', logoText: 'JS' },
      { ticker: 'SAIL', name: 'Steel Authority of India Ltd', price: 124.0, change1D: -1.00, change1W: 1.50, marketCapCr: 51200, pe: 18.0, volume: 12000000, logoBg: '#047857', logoText: 'SA' },
    ],
    history: generateIndexHistory(122, 45, -0.3, 1.4, 26),
  },

  // 27. Non-Ferrous Metals
  {
    id: 'non-ferrous-metals',
    name: 'Non-Ferrous Metals (Aluminium, Zinc, Copper)',
    category: 'Metals & Mining',
    companiesCount: 3,
    change1D: 0.60,
    change1W: 4.80,
    change1M: 7.20,
    change1Y: 48.00,
    currentReturn: 8.90,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'HINDALCO', name: 'Hindalco Industries Ltd', price: 685.0, change1D: 0.80, change1W: 5.40, marketCapCr: 153000, pe: 14.2, volume: 4900000, logoBg: '#0284c7', logoText: 'HI' },
      { ticker: 'VEDL', name: 'Vedanta Limited', price: 468.0, change1D: 0.50, change1W: 4.60, marketCapCr: 183000, pe: 12.0, volume: 16000000, logoBg: '#ea580c', logoText: 'VD' },
      { ticker: 'HINDZINC', name: 'Hindustan Zinc Ltd', price: 510.0, change1D: 0.40, change1W: 4.20, marketCapCr: 215000, pe: 24.0, volume: 3200000, logoBg: '#15803d', logoText: 'HZ' },
    ],
    history: generateIndexHistory(102, 45, 0.35, 1.3, 15),
  },

  // 28. Mining & Coal
  {
    id: 'mining-coal',
    name: 'Mining & Coal',
    category: 'Metals & Mining',
    companiesCount: 3,
    change1D: 0.20,
    change1W: 3.20,
    change1M: -1.40,
    change1Y: 32.00,
    currentReturn: 2.80,
    breadthPositivePct: 67,
    rotationStatus: 'Weakening',
    stocks: [
      { ticker: 'COALINDIA', name: 'Coal India Ltd', price: 435.0, change1D: 0.40, change1W: 3.50, marketCapCr: 268000, pe: 7.8, volume: 8500000, logoBg: '#0891b2', logoText: 'CI' },
      { ticker: 'NMDC', name: 'NMDC Limited', price: 228.0, change1D: 0.10, change1W: 2.80, marketCapCr: 66800, pe: 10.4, volume: 7200000, logoBg: '#ea580c', logoText: 'NM' },
      { ticker: 'MOIL', name: 'MOIL Limited', price: 412.0, change1D: 0.20, change1W: 3.40, marketCapCr: 8380, pe: 18.0, volume: 950000, logoBg: '#1e3a8a', logoText: 'ML' },
    ],
    history: generateIndexHistory(110, 45, 0.1, 1.1, 20),
  },

  // 29. Power Generation & Utilities
  {
    id: 'power-generation',
    name: 'Power Generation & Utilities',
    category: 'Energy & Power',
    companiesCount: 4,
    change1D: 0.70,
    change1W: 6.20,
    change1M: 8.40,
    change1Y: 68.00,
    currentReturn: 12.80,
    breadthPositivePct: 75,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'NTPC', name: 'NTPC Limited', price: 395.0, change1D: 0.80, change1W: 6.40, marketCapCr: 383000, pe: 17.5, volume: 9500000, logoBg: '#1e3a8a', logoText: 'NT' },
      { ticker: 'TATAPOWER', name: 'Tata Power Company Ltd', price: 435.0, change1D: 0.90, change1W: 6.90, marketCapCr: 139000, pe: 36.0, volume: 6400000, logoBg: '#0284c7', logoText: 'TP' },
      { ticker: 'JSWENERGY', name: 'JSW Energy Ltd', price: 690.0, change1D: 0.50, change1W: 5.80, marketCapCr: 120000, pe: 64.0, volume: 1800000, logoBg: '#ea580c', logoText: 'JE' },
      { ticker: 'TORNTPOWER', name: 'Torrent Power Ltd', price: 1680.0, change1D: 0.60, change1W: 5.90, marketCapCr: 80700, pe: 39.0, volume: 850000, logoBg: '#059669', logoText: 'TP' },
    ],
    history: generateIndexHistory(98, 45, 0.5, 1.4, 12),
  },

  // 30. Power Transmission & Grid Equipment
  {
    id: 'power-transmission',
    name: 'Power Transmission & Grid',
    category: 'Energy & Power',
    companiesCount: 3,
    change1D: 0.50,
    change1W: 5.80,
    change1M: 9.20,
    change1Y: 72.00,
    currentReturn: 14.10,
    breadthPositivePct: 100,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'POWERGRID', name: 'Power Grid Corp of India', price: 328.0, change1D: 0.60, change1W: 5.60, marketCapCr: 305000, pe: 18.9, volume: 12000000, logoBg: '#047857', logoText: 'PG' },
      { ticker: 'APARINDS', name: 'Apar Industries Ltd', price: 9800.0, change1D: 0.70, change1W: 6.40, marketCapCr: 39400, pe: 46.0, volume: 140000, logoBg: '#b45309', logoText: 'AI' },
      { ticker: 'TRIL', name: 'Transformers & Rectifiers India', price: 890.0, change1D: 0.40, change1W: 5.40, marketCapCr: 13400, pe: 78.0, volume: 550000, logoBg: '#7c3aed', logoText: 'TR' },
    ],
    history: generateIndexHistory(96, 45, 0.55, 1.3, 11),
  },

  // 31. FMCG - Food & Confectionery
  {
    id: 'fmcg-food',
    name: 'FMCG - Food & Confectionery',
    category: 'Consumer Goods',
    companiesCount: 4,
    change1D: -0.10,
    change1W: 1.40,
    change1M: 2.10,
    change1Y: 12.00,
    currentReturn: 1.80,
    breadthPositivePct: 50,
    rotationStatus: 'Weakening',
    stocks: [
      { ticker: 'NESTLEIND', name: 'Nestle India Ltd', price: 2340.0, change1D: 0.10, change1W: 1.80, marketCapCr: 225000, pe: 72.0, volume: 480000, logoBg: '#1e3a8a', logoText: 'NI' },
      { ticker: 'BRITANNIA', name: 'Britannia Industries Ltd', price: 5420.0, change1D: -0.20, change1W: 1.50, marketCapCr: 130000, pe: 58.0, volume: 390000, logoBg: '#dc2626', logoText: 'BI' },
      { ticker: 'TATACONSUM', name: 'Tata Consumer Products Ltd', price: 980.0, change1D: -0.10, change1W: 1.20, marketCapCr: 97000, pe: 74.0, volume: 1100000, logoBg: '#0284c7', logoText: 'TC' },
      { ticker: 'VBL', name: 'Varun Beverages Ltd (Pepsi)', price: 610.0, change1D: -0.30, change1W: 1.10, marketCapCr: 198000, pe: 82.0, volume: 2900000, logoBg: '#059669', logoText: 'VB' },
    ],
    history: generateIndexHistory(115, 45, 0.05, 0.8, 20),
  },

  // 32. FMCG - Personal Care
  {
    id: 'fmcg-personal-care',
    name: 'FMCG - Personal Care & Hygiene',
    category: 'Consumer Goods',
    companiesCount: 4,
    change1D: 0.10,
    change1W: 1.80,
    change1M: 1.20,
    change1Y: 9.50,
    currentReturn: 2.10,
    breadthPositivePct: 50,
    rotationStatus: 'Weakening',
    stocks: [
      { ticker: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', price: 2480.0, change1D: 0.20, change1W: 1.90, marketCapCr: 582000, pe: 56.0, volume: 1800000, logoBg: '#0284c7', logoText: 'HU' },
      { ticker: 'ITC', name: 'ITC Limited', price: 478.0, change1D: 0.10, change1W: 1.70, marketCapCr: 597000, pe: 28.0, volume: 9200000, logoBg: '#b45309', logoText: 'IT' },
      { ticker: 'DABUR', name: 'Dabur India Ltd', price: 520.0, change1D: -0.10, change1W: 1.60, marketCapCr: 92100, pe: 48.0, volume: 1400000, logoBg: '#15803d', logoText: 'DI' },
      { ticker: 'MARICO', name: 'Marico Limited', price: 645.0, change1D: 0.20, change1W: 2.10, marketCapCr: 83400, pe: 54.0, volume: 1200000, logoBg: '#047857', logoText: 'ML' },
    ],
    history: generateIndexHistory(112, 45, 0.08, 0.7, 21),
  },

  // 33. Retail - QSR & Restaurants
  {
    id: 'retail-qsr',
    name: 'Retail - QSR & Restaurant Chains',
    category: 'Consumer Services',
    companiesCount: 3,
    change1D: 0.40,
    change1W: 4.80,
    change1M: 6.20,
    change1Y: -2.50,
    currentReturn: 5.40,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'JUBLFOOD', name: 'Jubilant FoodWorks (Domino\'s)', price: 610.0, change1D: 0.60, change1W: 5.20, marketCapCr: 40200, pe: 92.0, volume: 1800000, logoBg: '#1e3a8a', logoText: 'JF' },
      { ticker: 'DEVYANI', name: 'Devyani International (KFC/PizzaHut)', price: 172.0, change1D: 0.30, change1W: 4.40, marketCapCr: 20700, pe: 110.0, volume: 2200000, logoBg: '#dc2626', logoText: 'DI' },
      { ticker: 'WESTLIFE', name: 'Westlife Foodworld (McDonald\'s)', price: 790.0, change1D: 0.20, change1W: 4.80, marketCapCr: 12300, pe: 125.0, volume: 450000, logoBg: '#eab308', logoText: 'WL' },
    ],
    history: generateIndexHistory(104, 45, 0.25, 1.2, 17),
  },

  // 34. Retail - Apparel & Fashion
  {
    id: 'retail-apparel',
    name: 'Retail - Apparel & Fashion',
    category: 'Consumer Services',
    companiesCount: 4,
    change1D: 1.10,
    change1W: 7.20,
    change1M: 12.80,
    change1Y: 65.00,
    currentReturn: 17.50,
    breadthPositivePct: 75,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'TRENT', name: 'Trent Ltd (Westside & Zudio)', price: 6850.0, change1D: 1.50, change1W: 8.40, marketCapCr: 243000, pe: 145.0, volume: 920000, logoBg: '#1e3a8a', logoText: 'TR' },
      { ticker: 'DMART', name: 'Avenue Supermarts Ltd', price: 4120.0, change1D: 0.80, change1W: 5.80, marketCapCr: 268000, pe: 96.0, volume: 620000, logoBg: '#15803d', logoText: 'DM' },
      { ticker: 'ABFRL', name: 'Aditya Birla Fashion & Retail', price: 310.0, change1D: 1.10, change1W: 6.90, marketCapCr: 31400, pe: 42.0, volume: 2100000, logoBg: '#dc2626', logoText: 'AB' },
      { ticker: 'VEDANTFASH', name: 'Vedant Fashions Ltd (Manyavar)', price: 1180.0, change1D: 0.90, change1W: 7.60, marketCapCr: 28600, pe: 68.0, volume: 380000, logoBg: '#ea580c', logoText: 'VF' },
    ],
    history: generateIndexHistory(95, 45, 0.65, 1.5, 9),
  },

  // 35. Footwear & Leather
  {
    id: 'footwear-leather',
    name: 'Footwear & Leather',
    category: 'Consumer Goods',
    companiesCount: 3,
    change1D: 0.20,
    change1W: 3.40,
    change1M: -1.20,
    change1Y: 8.50,
    currentReturn: 2.20,
    breadthPositivePct: 67,
    rotationStatus: 'Weakening',
    stocks: [
      { ticker: 'METROBRAND', name: 'Metro Brands Ltd', price: 1240.0, change1D: 0.40, change1W: 3.80, marketCapCr: 33700, pe: 85.0, volume: 310000, logoBg: '#dc2626', logoText: 'MB' },
      { ticker: 'BATAINDIA', name: 'Bata India Ltd', price: 1380.0, change1D: 0.10, change1W: 2.90, marketCapCr: 17700, pe: 64.0, volume: 240000, logoBg: '#b91c1c', logoText: 'BI' },
      { ticker: 'RELAXO', name: 'Relaxo Footwears Ltd', price: 790.0, change1D: 0.20, change1W: 3.50, marketCapCr: 19600, pe: 94.0, volume: 180000, logoBg: '#0284c7', logoText: 'RF' },
    ],
    history: generateIndexHistory(110, 45, 0.08, 0.9, 21),
  },

  // 36. Consumer Durables & Electronics
  {
    id: 'consumer-durables',
    name: 'Consumer Durables & Electronics',
    category: 'Consumer Goods',
    companiesCount: 4,
    change1D: 0.80,
    change1W: 5.60,
    change1M: 8.40,
    change1Y: 34.00,
    currentReturn: 9.80,
    breadthPositivePct: 75,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'HAVELLS', name: 'Havells India Ltd', price: 1840.0, change1D: 0.90, change1W: 5.80, marketCapCr: 115000, pe: 78.0, volume: 880000, logoBg: '#dc2626', logoText: 'HI' },
      { ticker: 'VOLTAS', name: 'Voltas Ltd (Tata AC)', price: 1720.0, change1D: 1.10, change1W: 6.80, marketCapCr: 56900, pe: 88.0, volume: 1100000, logoBg: '#1e3a8a', logoText: 'VL' },
      { ticker: 'BLUESTARCO', name: 'Blue Star Ltd', price: 1890.0, change1D: 0.70, change1W: 5.20, marketCapCr: 38800, pe: 82.0, volume: 420000, logoBg: '#0284c7', logoText: 'BS' },
      { ticker: 'CROMPTON', name: 'Crompton Greaves Consumer', price: 420.0, change1D: 0.50, change1W: 4.60, marketCapCr: 27100, pe: 56.0, volume: 1400000, logoBg: '#059669', logoText: 'CG' },
    ],
    history: generateIndexHistory(101, 45, 0.4, 1.2, 13),
  },

  // 37. Ceramics, Sanitaryware & Tiles
  {
    id: 'ceramics-sanitaryware',
    name: 'Ceramics, Sanitaryware & Tiles',
    category: 'Building Materials',
    companiesCount: 3,
    change1D: 0.10,
    change1W: 2.80,
    change1M: -3.40,
    change1Y: 12.00,
    currentReturn: 1.20,
    breadthPositivePct: 67,
    rotationStatus: 'Lagging',
    stocks: [
      { ticker: 'KAJARIACER', name: 'Kajaria Ceramics Ltd', price: 1240.0, change1D: 0.20, change1W: 3.10, marketCapCr: 19700, pe: 46.0, volume: 380000, logoBg: '#dc2626', logoText: 'KC' },
      { ticker: 'CERA', name: 'Cera Sanitaryware Ltd', price: 8150.0, change1D: 0.10, change1W: 2.50, marketCapCr: 10600, pe: 44.0, volume: 60000, logoBg: '#0284c7', logoText: 'CS' },
      { ticker: 'SOMANYCERA', name: 'Somany Ceramics Ltd', price: 680.0, change1D: -0.10, change1W: 2.70, marketCapCr: 2890, pe: 29.0, volume: 90000, logoBg: '#b45309', logoText: 'SC' },
    ],
    history: generateIndexHistory(115, 45, -0.15, 1.1, 25),
  },

  // 38. Paints & Coatings
  {
    id: 'paints-coatings',
    name: 'Paints & Coatings',
    category: 'Consumer Goods',
    companiesCount: 4,
    change1D: -0.80,
    change1W: -1.20,
    change1M: -6.40,
    change1Y: -8.00,
    currentReturn: -5.40,
    breadthPositivePct: 25,
    rotationStatus: 'Lagging',
    stocks: [
      { ticker: 'ASIANPAINT', name: 'Asian Paints Ltd', price: 2780.0, change1D: -0.90, change1W: -1.40, marketCapCr: 266000, pe: 52.0, volume: 1800000, logoBg: '#dc2626', logoText: 'AP' },
      { ticker: 'BERGEPAINT', name: 'Berger Paints India Ltd', price: 510.0, change1D: -0.70, change1W: -1.10, marketCapCr: 59400, pe: 54.0, volume: 1400000, logoBg: '#0284c7', logoText: 'BP' },
      { ticker: 'KANSAINER', name: 'Kansai Nerolac Paints Ltd', price: 295.0, change1D: -0.80, change1W: -0.90, marketCapCr: 23800, pe: 34.0, volume: 750000, logoBg: '#ea580c', logoText: 'KN' },
      { ticker: 'AKZOINDIA', name: 'Akzo Nobel India Ltd', price: 3450.0, change1D: -0.40, change1W: -1.30, marketCapCr: 15700, pe: 36.0, volume: 60000, logoBg: '#059669', logoText: 'AN' },
    ],
    history: generateIndexHistory(130, 45, -0.45, 1.2, 32),
  },

  // 39. Packaging
  {
    id: 'packaging-materials',
    name: 'Packaging - Plastic, Paper & Glass',
    category: 'Materials',
    companiesCount: 3,
    change1D: 0.30,
    change1W: 3.80,
    change1M: 4.50,
    change1Y: 26.00,
    currentReturn: 4.90,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'POLYPLEX', name: 'Polyplex Corporation Ltd', price: 1180.0, change1D: 0.40, change1W: 4.20, marketCapCr: 3700, pe: 28.0, volume: 180000, logoBg: '#1e3a8a', logoText: 'PP' },
      { ticker: 'EPL', name: 'EPL Limited (Essel Propack)', price: 245.0, change1D: 0.20, change1W: 3.40, marketCapCr: 7800, pe: 29.0, volume: 450000, logoBg: '#059669', logoText: 'EP' },
      { ticker: 'HUHTAMAKI', name: 'Huhtamaki India Ltd', price: 388.0, change1D: 0.30, change1W: 3.90, marketCapCr: 2900, pe: 31.0, volume: 80000, logoBg: '#0891b2', logoText: 'HI' },
    ],
    history: generateIndexHistory(103, 45, 0.2, 1.1, 18),
  },

  // 40. Paper & Forest Products
  {
    id: 'paper-forest',
    name: 'Paper & Forest Products',
    category: 'Materials',
    companiesCount: 3,
    change1D: 0.10,
    change1W: 2.10,
    change1M: -2.80,
    change1Y: 15.00,
    currentReturn: 0.80,
    breadthPositivePct: 33,
    rotationStatus: 'Lagging',
    stocks: [
      { ticker: 'JKPAPER', name: 'JK Paper Ltd', price: 465.0, change1D: 0.20, change1W: 2.40, marketCapCr: 7880, pe: 11.2, volume: 620000, logoBg: '#b45309', logoText: 'JK' },
      { ticker: 'WSTCSTPAPR', name: 'West Coast Paper Mills Ltd', price: 680.0, change1D: -0.10, change1W: 1.80, marketCapCr: 4490, pe: 9.8, volume: 240000, logoBg: '#047857', logoText: 'WC' },
      { ticker: 'ANDHRAPAP', name: 'Andhra Paper Ltd', price: 540.0, change1D: 0.20, change1W: 2.10, marketCapCr: 2150, pe: 8.5, volume: 150000, logoBg: '#0284c7', logoText: 'AP' },
    ],
    history: generateIndexHistory(112, 45, -0.1, 1.0, 24),
  },

  // 41. Logistics, Ports & Cold Chain
  {
    id: 'logistics-ports',
    name: 'Logistics, Ports & Supply Chain',
    category: 'Services',
    companiesCount: 4,
    change1D: 0.60,
    change1W: 5.20,
    change1M: 7.80,
    change1Y: 52.00,
    currentReturn: 10.40,
    breadthPositivePct: 75,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'ADANIPORTS', name: 'Adani Ports & SEZ Ltd', price: 1380.0, change1D: 0.80, change1W: 5.80, marketCapCr: 298000, pe: 32.0, volume: 4800000, logoBg: '#0284c7', logoText: 'AP' },
      { ticker: 'CONCOR', name: 'Container Corp of India', price: 920.0, change1D: 0.50, change1W: 4.80, marketCapCr: 56000, pe: 42.0, volume: 1400000, logoBg: '#1e3a8a', logoText: 'CC' },
      { ticker: 'DELHIVERY', name: 'Delhivery Limited', price: 395.0, change1D: 0.40, change1W: 4.90, marketCapCr: 29200, pe: 85.0, volume: 2800000, logoBg: '#dc2626', logoText: 'DL' },
      { ticker: 'BLUEDART', name: 'Blue Dart Express Ltd', price: 8120.0, change1D: 0.70, change1W: 5.40, marketCapCr: 19200, pe: 64.0, volume: 90000, logoBg: '#eab308', logoText: 'BD' },
    ],
    history: generateIndexHistory(100, 45, 0.4, 1.3, 14),
  },

  // 42. Shipping & Dredging
  {
    id: 'shipping-dredging',
    name: 'Shipping & Dredging',
    category: 'Services',
    companiesCount: 3,
    change1D: 0.90,
    change1W: 7.40,
    change1M: 11.20,
    change1Y: 84.00,
    currentReturn: 16.20,
    breadthPositivePct: 100,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'SCI', name: 'Shipping Corp of India Ltd', price: 245.0, change1D: 1.10, change1W: 8.20, marketCapCr: 11400, pe: 16.0, volume: 4200000, logoBg: '#1e3a8a', logoText: 'SC' },
      { ticker: 'GE-SHIPPING', name: 'Great Eastern Shipping Co', price: 1320.0, change1D: 0.80, change1W: 6.90, marketCapCr: 18800, pe: 7.4, volume: 620000, logoBg: '#059669', logoText: 'GE' },
      { ticker: 'DREDGECORP', name: 'Dredging Corp of India Ltd', price: 890.0, change1D: 0.80, change1W: 7.10, marketCapCr: 2490, pe: 48.0, volume: 380000, logoBg: '#0891b2', logoText: 'DC' },
    ],
    history: generateIndexHistory(96, 45, 0.55, 1.5, 11),
  },

  // 43. Asset Management Companies
  {
    id: 'amc-mutual-funds',
    name: 'Asset Management Companies (AMCs)',
    category: 'Financial Services',
    companiesCount: 3,
    change1D: 0.50,
    change1W: 4.80,
    change1M: 8.40,
    change1Y: 54.00,
    currentReturn: 11.20,
    breadthPositivePct: 67,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'HDFCAMC', name: 'HDFC Asset Management Co', price: 4420.0, change1D: 0.60, change1W: 5.20, marketCapCr: 94500, pe: 44.0, volume: 480000, logoBg: '#1e3a8a', logoText: 'HA' },
      { ticker: 'NAM-INDIA', name: 'Nippon Life India Asset Mgmt', price: 685.0, change1D: 0.50, change1W: 4.80, marketCapCr: 43200, pe: 38.0, volume: 950000, logoBg: '#dc2626', logoText: 'NL' },
      { ticker: 'UTIAMC', name: 'UTI Asset Management Co Ltd', price: 1240.0, change1D: 0.30, change1W: 4.40, marketCapCr: 15800, pe: 24.0, volume: 340000, logoBg: '#0284c7', logoText: 'UA' },
    ],
    history: generateIndexHistory(100, 45, 0.4, 1.2, 13),
  },

  // 44. Stock Brokers & Depositories
  {
    id: 'brokers-depositories',
    name: 'Stock Brokers & Depositories',
    category: 'Financial Services',
    companiesCount: 4,
    change1D: 0.80,
    change1W: 6.90,
    change1M: 14.50,
    change1Y: 88.00,
    currentReturn: 21.40,
    breadthPositivePct: 100,
    rotationStatus: 'Leading',
    stocks: [
      { ticker: 'BSE', name: 'BSE Limited', price: 4680.0, change1D: 1.20, change1W: 8.50, marketCapCr: 63400, pe: 68.0, volume: 2200000, logoBg: '#0284c7', logoText: 'BS' },
      { ticker: 'CDSL', name: 'Central Depository Services', price: 1820.0, change1D: 0.90, change1W: 7.40, marketCapCr: 38000, pe: 64.0, volume: 3800000, logoBg: '#1e3a8a', logoText: 'CD' },
      { ticker: 'ANGELONE', name: 'Angel One Ltd', price: 2950.0, change1D: 0.60, change1W: 5.90, marketCapCr: 26500, pe: 21.0, volume: 1100000, logoBg: '#dc2626', logoText: 'AO' },
      { ticker: 'MCX', name: 'Multi Commodity Exchange', price: 6450.0, change1D: 0.60, change1W: 5.80, marketCapCr: 32900, pe: 72.0, volume: 720000, logoBg: '#b45309', logoText: 'MC' },
    ],
    history: generateIndexHistory(94, 45, 0.7, 1.6, 9),
  },

  // 45. Sugar & Biofuels
  {
    id: 'sugar-biofuels',
    name: 'Sugar & Biofuel / Ethanol',
    category: 'Agriculture',
    companiesCount: 3,
    change1D: 0.40,
    change1W: 3.80,
    change1M: 2.40,
    change1Y: 18.00,
    currentReturn: 3.50,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'BALRAMCHIN', name: 'Balrampur Chini Mills Ltd', price: 585.0, change1D: 0.50, change1W: 4.20, marketCapCr: 11800, pe: 22.0, volume: 1400000, logoBg: '#047857', logoText: 'BC' },
      { ticker: 'EIDPARRY', name: 'E.I.D. Parry (India) Ltd', price: 810.0, change1D: 0.40, change1W: 3.90, marketCapCr: 14400, pe: 16.0, volume: 650000, logoBg: '#b45309', logoText: 'EP' },
      { ticker: 'TRIVENI', name: 'Triveni Engineering & Ind', price: 420.0, change1D: 0.20, change1W: 3.20, marketCapCr: 9200, pe: 24.0, volume: 820000, logoBg: '#0284c7', logoText: 'TE' },
    ],
    history: generateIndexHistory(104, 45, 0.2, 1.2, 18),
  },

  // 46. Fertilisers & Soil Nutrients
  {
    id: 'fertilisers',
    name: 'Fertilisers & Soil Nutrients',
    category: 'Agriculture',
    companiesCount: 3,
    change1D: 0.30,
    change1W: 3.40,
    change1M: -0.80,
    change1Y: 14.00,
    currentReturn: 2.10,
    breadthPositivePct: 67,
    rotationStatus: 'Improving',
    stocks: [
      { ticker: 'COROMANDEL', name: 'Coromandel International Ltd', price: 1720.0, change1D: 0.50, change1W: 3.80, marketCapCr: 50600, pe: 28.0, volume: 680000, logoBg: '#047857', logoText: 'CI' },
      { ticker: 'CHAMBLFERT', name: 'Chambal Fertilisers & Chem', price: 495.0, change1D: 0.20, change1W: 3.20, marketCapCr: 19800, pe: 14.5, volume: 1800000, logoBg: '#1e3a8a', logoText: 'CF' },
      { ticker: 'GNFC', name: 'Gujarat Narmada Valley Fert', price: 620.0, change1D: 0.10, change1W: 3.10, marketCapCr: 9630, pe: 18.0, volume: 750000, logoBg: '#0284c7', logoText: 'GN' },
    ],
    history: generateIndexHistory(106, 45, 0.15, 1.1, 19),
  },
];
