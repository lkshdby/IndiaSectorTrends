/**
 * Candidate basic-industry labels supplied by the user; NOT a claim that this
 * array is a current complete NSE classification export. NSE's published
 * taxonomy has 197 basic industries. Codes and parent levels are only supplied
 * where manually checked against its July 2023 structure document.
 *
 * Source: https://www.nseindia.com/static/products-services/industry-classification
 * Code reference: https://nsearchives.nseindia.com/web/sites/default/files/inline-files/nse-indices_industry-classification-structure-2023-07.pdf
 *
 * Do not invent codes or sector parentage for rows awaiting verification.
 */
export const CANDIDATE_BASIC_INDUSTRY_NAMES = `
2/3 Wheelers
Abrasives & Bearings
Advertising & Media Agencies
Aerospace & Defense
Airline
Airport & Airport services
Aluminium
Aluminium, Copper & Zinc Products
Amusement Parks/ Other Recreation
Animal Feed
Asset Management Company
Auto Components & Equipments
Auto Dealer
Biotechnology
Breweries & Distilleries
Business Process Outsourcing (BPO)/ Knowledge Process Outsourcing (KPO)
Cables - Electricals
Carbon Black
Castings & Forgings
Cement & Cement Products
Ceramics
Cigarettes & Tobacco Products
Civil Construction
Coal
Commercial Vehicles
Commodity Chemicals
Compressors, Pumps & Diesel Engines
Computers - Software & Consulting
Computers Hardware & Equipments
Construction Vehicles
Consulting Services
Consumer Electronics
Copper
Dairy Products
Data Processing Services
Dealers-Commercial Vehicles, Tractors, Construction Vehicles
Depositories, Clearing Houses and Other Intermediaries
Digital Entertainment
Distributors
Diversified
Diversified Commercial Services
Diversified consumer products
Diversified FMCG
Diversified Metals
Diversified Retail
Dredging
Dyes And Pigments
E-Learning
E-Retail/ E-Commerce
Edible Oil
Education
Electrodes & Refractories
Electronic Media
Exchange and Data Platform
Explosives
Ferro & Silica Manganese
Fertilizers
Film Production, Distribution & Exhibition
Financial Institution
Financial Products Distributor
Financial Technology (Fintech)
Footwear
Forest Products
Furniture, Home Furnishing
Garments & Apparels
Gas Transmission/Marketing
Gems, Jewellery And Watches
General Insurance
Glass - Consumer
Glass - Industrial
Granites & Marbles
Healthcare Research, Analytics & Technology
Healthcare Service Provider
Heavy Electrical Equipment
Holding Company
Hospital
Hotels & Resorts
Household Appliances
Household Products
Houseware
Housing Finance Company
Industrial Gases
Industrial Machinery
Industrial Minerals
Industrial Products
Insurance Distributors
Integrated Power Utilities
Internet & Catalogue Retail
Investment Company
Iron & Steel
Iron & Steel Products
IT Enabled Services
Jute & Jute Products
Leather And Leather Products
Leisure Products
Life Insurance
Logistics Solution Provider
LPG/CNG/PNG/LNG Supplier
Lubricants
Meat Products including Poultry
Media & Entertainment
Medical Equipment & Supplies
Microfinance Institutions
Multi Utilities
Non Banking Financial Company (NBFC)
Offshore Support Solution Drilling
Oil Equipment & Services
Oil Exploration & Production
Oil Storage & Transportation
Other Agricultural Products
Other Bank
Other Beverages
Other Capital Market related Services
Other Construction Materials
Other Consumer Services
Other Electrical Equipment
Other Financial Services
Other Food Products
Other Industrial Products
Other Telecom Services
Other Textile Products
Packaged Foods
Packaging
Paints
Paper & Paper Products
Passenger Cars & Utility Vehicles
Personal Care
Pesticides & Agrochemicals
Petrochemicals
Pharmaceuticals
Pharmacy Retail
Pig Iron
Plastic Products - Consumer
Plastic Products - Industrial
Plywood Boards/ Laminates
Port & Port services
Power - Transmission
Power Distribution
Power Generation
Power Trading
Precious Metals
Print Media
Printing & Publication
Printing Inks
Private Sector Bank
Public Sector Bank
Railway Wagons
Ratings
Real Estate Investment Trusts (REITs)
Real Estate related services
Refineries & Marketing
Residential, Commercial Projects
Restaurants
Road AssetsToll, Annuity, Hybrid-Annuity
Road Transport
Rubber
Sanitary Ware
Seafood
Ship Building & Allied Services
Shipping
Software Products
Speciality Retail
Specialty Chemicals
Sponge Iron
Stationary
Stockbroking & Allied
Sugar
Tea & Coffee
Telecom - Cellular & Fixed line services
Telecom - Equipment & Accessories
Telecom - Infrastructure
Tour, Travel Related Services
Tractors
Trading - Auto components
Trading - Chemicals
Trading - Gas
Trading - Metals
Trading - Minerals
Trading - Textile Products
Trading & Distributors
Transport Related Services
TV Broadcasting & Software Production
Tyres & Rubber Products
Waste Management
Water Supply & Management
Web based media and service
Wellness
Zinc
`.trim().split('\n');

export interface BasicIndustry {
  name: string;
  code: string | null;
  macro: string | null;
  sector: string | null;
  industry: string | null;
  verification: 'nse-structure-2023' | 'candidate-label';
}

interface ParentGroup { code: string; macro: string; sector: string; industry: string }

/** Exact codes and parent hierarchy checked against the July 2023 NSE PDF. */
const OFFICIALLY_CHECKED: Record<string, ParentGroup> = {
  'Commodity Chemicals': { code: 'IN010101001', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Specialty Chemicals': { code: 'IN010101002', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Carbon Black': { code: 'IN010101003', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Dyes And Pigments': { code: 'IN010101004', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Explosives': { code: 'IN010101005', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Petrochemicals': { code: 'IN010101006', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Printing Inks': { code: 'IN010101007', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Trading - Chemicals': { code: 'IN010101008', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Industrial Gases': { code: 'IN010101009', macro: 'Commodities', sector: 'Chemicals', industry: 'Chemicals & Petrochemicals' },
  'Fertilizers': { code: 'IN010102001', macro: 'Commodities', sector: 'Chemicals', industry: 'Fertilizers & Agrochemicals' },
  'Pesticides & Agrochemicals': { code: 'IN010102002', macro: 'Commodities', sector: 'Chemicals', industry: 'Fertilizers & Agrochemicals' },
  'Cement & Cement Products': { code: 'IN010203001', macro: 'Commodities', sector: 'Construction Materials', industry: 'Cement & Cement Products' },
  'Other Construction Materials': { code: 'IN010204001', macro: 'Commodities', sector: 'Construction Materials', industry: 'Other Construction Materials' },
  'Aluminium': { code: 'IN010302001', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Non - Ferrous Metals' },
  'Copper': { code: 'IN010302002', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Non - Ferrous Metals' },
  'Zinc': { code: 'IN010302003', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Non - Ferrous Metals' },
  'Precious Metals': { code: 'IN010302004', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Non - Ferrous Metals' },
  'Passenger Cars & Utility Vehicles': { code: 'IN020101001', macro: 'Consumer Discretionary', sector: 'Automobile and Auto Components', industry: 'Automobiles' },
  '2/3 Wheelers': { code: 'IN020101002', macro: 'Consumer Discretionary', sector: 'Automobile and Auto Components', industry: 'Automobiles' },
  'Private Sector Bank': { code: 'IN050102002', macro: 'Financial Services', sector: 'Financial Services', industry: 'Banks' },
  'Public Sector Bank': { code: 'IN050102001', macro: 'Financial Services', sector: 'Financial Services', industry: 'Banks' },
  'Other Bank': { code: 'IN050102003', macro: 'Financial Services', sector: 'Financial Services', industry: 'Banks' },
  'Asset Management Company': { code: 'IN050103001', macro: 'Financial Services', sector: 'Financial Services', industry: 'Capital Markets' },
  'Depositories, Clearing Houses and Other Intermediaries': { code: 'IN050103002', macro: 'Financial Services', sector: 'Financial Services', industry: 'Capital Markets' },
  'Financial Products Distributor': { code: 'IN050103003', macro: 'Financial Services', sector: 'Financial Services', industry: 'Capital Markets' },
  'Ratings': { code: 'IN050103004', macro: 'Financial Services', sector: 'Financial Services', industry: 'Capital Markets' },
  'Exchange and Data Platform': { code: 'IN050103005', macro: 'Financial Services', sector: 'Financial Services', industry: 'Capital Markets' },
  'Financial Technology (Fintech)': { code: 'IN050105001', macro: 'Financial Services', sector: 'Financial Services', industry: 'Financial Technology (Fintech)' },
  'Pharmaceuticals': { code: 'IN060101001', macro: 'Healthcare', sector: 'Healthcare', industry: 'Pharmaceuticals & Biotechnology' },
  'Biotechnology': { code: 'IN060101002', macro: 'Healthcare', sector: 'Healthcare', industry: 'Pharmaceuticals & Biotechnology' },
  'Medical Equipment & Supplies': { code: 'IN060102001', macro: 'Healthcare', sector: 'Healthcare', industry: 'Healthcare Equipment & Supplies' },
  'Hospital': { code: 'IN060103001', macro: 'Healthcare', sector: 'Healthcare', industry: 'Healthcare Services' },
  'Healthcare Service Provider': { code: 'IN060103002', macro: 'Healthcare', sector: 'Healthcare', industry: 'Healthcare Services' },
  'Healthcare Research, Analytics & Technology': { code: 'IN060103003', macro: 'Healthcare', sector: 'Healthcare', industry: 'Healthcare Services' },
  'Computers - Software & Consulting': { code: 'IN080101001', macro: 'Information Technology', sector: 'Information Technology', industry: 'IT - Software' },
  'Software Products': { code: 'IN080101002', macro: 'Information Technology', sector: 'Information Technology', industry: 'IT - Software' },
  'IT Enabled Services': { code: 'IN080102001', macro: 'Information Technology', sector: 'Information Technology', industry: 'IT - Services' },
  'Computers Hardware & Equipments': { code: 'IN080103001', macro: 'Information Technology', sector: 'Information Technology', industry: 'IT - Hardware' },
  'Dredging': { code: 'IN090101001', macro: 'Services', sector: 'Services', industry: 'Engineering Services' },
  'Airline': { code: 'IN090102001', macro: 'Services', sector: 'Services', industry: 'Transport Services' },
  'Logistics Solution Provider': { code: 'IN090102002', macro: 'Services', sector: 'Services', industry: 'Transport Services' },
  'Road Transport': { code: 'IN090102004', macro: 'Services', sector: 'Services', industry: 'Transport Services' },
  'Shipping': { code: 'IN090102005', macro: 'Services', sector: 'Services', industry: 'Transport Services' },
  'Transport Related Services': { code: 'IN090102006', macro: 'Services', sector: 'Services', industry: 'Transport Services' },
  'Airport & Airport services': { code: 'IN090103001', macro: 'Services', sector: 'Services', industry: 'Transport Infrastructure' },
  'Port & Port services': { code: 'IN090103002', macro: 'Services', sector: 'Services', industry: 'Transport Infrastructure' },
};

/** Read-only reference catalog: never infer an NSE code from a thematic basket. */
export const BASIC_INDUSTRIES: BasicIndustry[] = CANDIDATE_BASIC_INDUSTRY_NAMES.map(name => {
  const confirmed = OFFICIALLY_CHECKED[name];
  return confirmed
    ? { name, ...confirmed, verification: 'nse-structure-2023' as const }
    : { name, code: null, macro: null, sector: null, industry: null, verification: 'candidate-label' as const };
});

export const BASIC_INDUSTRY_BY_NAME = new Map(BASIC_INDUSTRIES.map(row => [row.name, row]));
export const BASIC_INDUSTRY_BY_CODE = new Map(BASIC_INDUSTRIES.filter(row => row.code).map(row => [row.code!, row]));
export const NSE_PUBLISHED_BASIC_INDUSTRY_COUNT = 197;
