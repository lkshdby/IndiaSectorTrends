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
  // 22 additional exact Basic Industry codes and parents checked against NSE's July 2023 structure.
  'Investment Company': { code: 'IN050101003', macro: 'Financial Services', sector: 'Financial Services', industry: 'Finance' },
  'Diversified Commercial Services': { code: 'IN090104004', macro: 'Services', sector: 'Services', industry: 'Commercial Services & Supplies' },
  'Residential, Commercial Projects': { code: 'IN020501001', macro: 'Consumer Discretionary', sector: 'Realty', industry: 'Realty' },
  'Garments & Apparels': { code: 'IN020301001', macro: 'Consumer Discretionary', sector: 'Textiles', industry: 'Textiles & Apparels' },
  'Other Beverages': { code: 'IN040102002', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Beverages' },
  'Other Agricultural Products': { code: 'IN040101004', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Agricultural Food & other Products' },
  'Financial Institution': { code: 'IN050101001', macro: 'Financial Services', sector: 'Financial Services', industry: 'Finance' },
  'Glass - Industrial': { code: 'IN070205013', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Water Supply & Management': { code: 'IN110201001', macro: 'Utilities', sector: 'Utilities', industry: 'Other Utilities' },
  'Waste Management': { code: 'IN110201002', macro: 'Utilities', sector: 'Utilities', industry: 'Other Utilities' },
  'Plastic Products - Industrial': { code: 'IN070205009', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Ship Building & Allied Services': { code: 'IN070204006', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Manufacturing' },
  'Other Telecom Services': { code: 'IN100101003', macro: 'Telecommunication', sector: 'Telecommunication', industry: 'Telecom - Services' },
  'Construction Vehicles': { code: 'IN070202003', macro: 'Industrials', sector: 'Capital Goods', industry: 'Agricultural, Commercial & Construction Vehicles' },
  'Compressors, Pumps & Diesel Engines': { code: 'IN070205017', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Castings & Forgings': { code: 'IN070205004', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Housing Finance Company': { code: 'IN050101002', macro: 'Financial Services', sector: 'Financial Services', industry: 'Finance' },
  'Education': { code: 'IN020602001', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Other Consumer Services' },
  'Iron & Steel Products': { code: 'IN070205015', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Ceramics': { code: 'IN020201019', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Paper & Paper Products': { code: 'IN010401001', macro: 'Commodities', sector: 'Forest Materials', industry: 'Paper, Forest & Jute Products' },
  'Telecom - Equipment & Accessories': { code: 'IN100102001', macro: 'Telecommunication', sector: 'Telecommunication', industry: 'Telecom - Equipment & Accessories' },
  'Edible Oil': { code: 'IN040101001', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Agricultural Food & other Products' },
  'Power - Transmission': { code: 'IN110101003', macro: 'Utilities', sector: 'Power', industry: 'Power' },
  'Tour, Travel Related Services': { code: 'IN020601005', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Leisure Services' },
  'Hotels & Resorts': { code: 'IN020601001', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Leisure Services' },
  'Other Textile Products': { code: 'IN020301002', macro: 'Consumer Discretionary', sector: 'Textiles', industry: 'Textiles & Apparels' },
  'Cables - Electricals': { code: 'IN070205003', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Restaurants': { code: 'IN020601002', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Leisure Services' },
  // Explicit codes and hierarchical parents sourced from NSE Indices classification structure (July 2023).
  'Household Appliances': { code: 'IN020201007', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Consumer Electronics': { code: 'IN020201003', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Life Insurance': { code: 'IN050104002', macro: 'Financial Services', sector: 'Financial Services', industry: 'Insurance' },
  'Insurance Distributors': { code: 'IN050104004', macro: 'Financial Services', sector: 'Financial Services', industry: 'Insurance' },
  'Other Industrial Products': { code: 'IN070205012', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Industrial Products': { code: 'IN070204008', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Manufacturing' },
  'Telecom - Cellular & Fixed line services': { code: 'IN100101001', macro: 'Telecommunication', sector: 'Telecommunication', industry: 'Telecom - Services' },
  'Telecom - Infrastructure': { code: 'IN100101002', macro: 'Telecommunication', sector: 'Telecommunication', industry: 'Telecom - Services' },
  'Power Generation': { code: 'IN110101004', macro: 'Utilities', sector: 'Power', industry: 'Power' },
  'Integrated Power Utilities': { code: 'IN110101005', macro: 'Utilities', sector: 'Power', industry: 'Power' },
  'Power Trading': { code: 'IN110101002', macro: 'Utilities', sector: 'Power', industry: 'Power' },
  'Civil Construction': { code: 'IN070101001', macro: 'Industrials', sector: 'Construction', industry: 'Construction' },
  'Gems, Jewellery And Watches': { code: 'IN020201005', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Houseware': { code: 'IN020201008', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Leather And Leather Products': { code: 'IN020201009', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Plastic Products - Consumer': { code: 'IN020201011', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Plywood Boards/ Laminates': { code: 'IN020201012', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Sanitary Ware': { code: 'IN020201013', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Footwear': { code: 'IN020201017', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Stationary': { code: 'IN040106004', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Household Products' },
  'Household Products': { code: 'IN040106001', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Household Products' },
  'Sugar': { code: 'IN040101002', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Agricultural Food & other Products' },
  'E-Retail/ E-Commerce': { code: 'IN020603004', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Retailing' },
  'Internet & Catalogue Retail': { code: 'IN020603005', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Retailing' },
  'Packaging': { code: 'IN070205008', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Products' },
  'Railway Wagons': { code: 'IN070204005', macro: 'Industrials', sector: 'Capital Goods', industry: 'Industrial Manufacturing' },
  'Tractors': { code: 'IN070202001', macro: 'Industrials', sector: 'Capital Goods', industry: 'Agricultural, Commercial & Construction Vehicles' },
  'Commercial Vehicles': { code: 'IN070202002', macro: 'Industrials', sector: 'Capital Goods', industry: 'Agricultural, Commercial & Construction Vehicles' },
  'Heavy Electrical Equipment': { code: 'IN070203001', macro: 'Industrials', sector: 'Capital Goods', industry: 'Electrical Equipment' },
  'Other Electrical Equipment': { code: 'IN070203002', macro: 'Industrials', sector: 'Capital Goods', industry: 'Electrical Equipment' },
  'Advertising & Media Agencies': { code: 'IN020401001', macro: 'Consumer Discretionary', sector: 'Media, Entertainment & Publication', industry: 'Media' },
  'Media & Entertainment': { code: 'IN020402003', macro: 'Consumer Discretionary', sector: 'Media, Entertainment & Publication', industry: 'Entertainment' },
  'Cigarettes & Tobacco Products': { code: 'IN040103001', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Cigarettes & Tobacco Products' },
  'Animal Feed': { code: 'IN040104001', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Food Products' },
  'Other Food Products': { code: 'IN040104003', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Food Products' },
  'Seafood': { code: 'IN040104005', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Food Products' },
  'Meat Products including Poultry': { code: 'IN040104006', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Food Products' },
  'Aerospace & Defense': { code: 'IN070201001', macro: 'Industrials', sector: 'Capital Goods', industry: 'Aerospace & Defense' },
  'Other Consumer Services': { code: 'IN020602004', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Other Consumer Services' },
  'Speciality Retail': { code: 'IN020603001', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Retailing' },
  'Diversified Retail': { code: 'IN020603003', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Retailing' },
  'Pharmacy Retail': { code: 'IN020603002', macro: 'Consumer Discretionary', sector: 'Consumer Services', industry: 'Retailing' },
  'Data Processing Services': { code: 'IN090104003', macro: 'Services', sector: 'Services', industry: 'Commercial Services & Supplies' },
  // Codes and four-tier parentage independently checked in NSE's July 2023 structure PDF.
  'Iron & Steel': { code: 'IN010301004', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Ferrous Metals' },
  'Ferro & Silica Manganese': { code: 'IN010301001', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Ferrous Metals' },
  'Pig Iron': { code: 'IN010301002', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Ferrous Metals' },
  'Sponge Iron': { code: 'IN010301003', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Ferrous Metals' },
  'Diversified Metals': { code: 'IN010303001', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Diversified Metals' },
  'Industrial Minerals': { code: 'IN010304001', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Minerals & Mining' },
  'Trading - Metals': { code: 'IN010305001', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Metals & Minerals Trading' },
  'Trading - Minerals': { code: 'IN010305002', macro: 'Commodities', sector: 'Metals & Mining', industry: 'Metals & Minerals Trading' },
  'Paints': { code: 'IN020201015', macro: 'Consumer Discretionary', sector: 'Consumer Durables', industry: 'Consumer Durables' },
  'Auto Components & Equipments': { code: 'IN020102001', macro: 'Consumer Discretionary', sector: 'Automobile and Auto Components', industry: 'Auto Components' },
  'Tyres & Rubber Products': { code: 'IN020102006', macro: 'Consumer Discretionary', sector: 'Automobile and Auto Components', industry: 'Auto Components' },
  'Refineries & Marketing': { code: 'IN030103001', macro: 'Energy', sector: 'Oil, Gas & Consumable Fuels', industry: 'Petroleum Products' },
  'Coal': { code: 'IN030104001', macro: 'Energy', sector: 'Oil, Gas & Consumable Fuels', industry: 'Consumable Fuels' },
  'Breweries & Distilleries': { code: 'IN040102001', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Beverages' },
  'Packaged Foods': { code: 'IN040104004', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Food Products' },
  'Tea & Coffee': { code: 'IN040101003', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Agricultural Food & other Products' },
  'Dairy Products': { code: 'IN040104002', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Food Products' },
  'Personal Care': { code: 'IN040105001', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Personal Products' },
  'Diversified FMCG': { code: 'IN040107001', macro: 'Fast Moving Consumer Goods', sector: 'Fast Moving Consumer Goods', industry: 'Diversified FMCG' },
  'Non Banking Financial Company (NBFC)': { code: 'IN050101004', macro: 'Financial Services', sector: 'Financial Services', industry: 'Finance' },
  'Holding Company': { code: 'IN050101006', macro: 'Financial Services', sector: 'Financial Services', industry: 'Finance' },
  'Microfinance Institutions': { code: 'IN050101007', macro: 'Financial Services', sector: 'Financial Services', industry: 'Finance' },
  'Other Financial Services': { code: 'IN050101005', macro: 'Financial Services', sector: 'Financial Services', industry: 'Finance' },
  'Stockbroking & Allied': { code: 'IN050103006', macro: 'Financial Services', sector: 'Financial Services', industry: 'Capital Markets' },
  'Other Capital Market related Services': { code: 'IN050103007', macro: 'Financial Services', sector: 'Financial Services', industry: 'Capital Markets' },
  'General Insurance': { code: 'IN050104001', macro: 'Financial Services', sector: 'Financial Services', industry: 'Insurance' },
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
