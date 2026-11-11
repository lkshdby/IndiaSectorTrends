# Structural membership audit — 62 IndiaSectorTrends thematic baskets

**Snapshot date:** 2026-11-11. **This is a complete code-level inventory, NOT independent verification of every company’s business-segment revenue or a confirmation that all 62 baskets are investable indices.** It covers all current basket positions from `src/data/prebuiltIndices.ts` and the membership rules in `src/data/sectorUniverse.ts`.

## Aggregate findings

- **62 themes**, **466 company positions**, **453 distinct theme NSE symbols** after code-level Tata Motors CV resolution.
- **41 themes** have no explicit member rules; **314 of 422 core positions** are accepted by the existing provisional default rather than an explicit rule.
- **9 core baskets** contain fewer than five core stocks. They should be concentrated research watchlists, not automatically expanded with unrelated stocks.
- Reviewed editorial core status **does not prove material segment revenue**, and an NSE Basic Industry classification **does not prove an investment-theme exposure**.
- PR #19 deliberately bars these provisional baskets from qualified early-turn signals; the new Stock Leaders view keeps them available for comparison and exposes their status.

## Every theme, membership at a glance

| Theme | Core | Adjacent | Proxy | Excluded | Membership status |
| --- | ---: | ---: | ---: | ---: | --- |
| Quick Commerce, Food Delivery & Consumer Tech | 2 | 3 | 2 | 0 | Editorial rule · concentrated |
| Fintech, Digital Payments & Insurtech | 4 | 2 | 1 | 0 | Editorial rule · concentrated |
| Online Travel, Marketplaces & B2B Platforms | 4 | 3 | 0 | 0 | Editorial rule · concentrated |
| Data Centers, AI Compute & Cloud Infra | 4 | 3 | 0 | 0 | Editorial rule · concentrated |
| Dairy & Value-Added Milk Products | 5 | 2 | 0 | 0 | Editorial rule |
| Jewellery, Gold Retail & Luxury Watches | 7 | 0 | 0 | 0 | Provisional |
| Alcoholic Beverages, Spirits & Breweries | 7 | 0 | 0 | 0 | Provisional |
| Retail - Apparel, Department & Fashion | 6 | 2 | 0 | 0 | Editorial rule |
| Retail - QSR & Restaurant Chains | 5 | 1 | 0 | 0 | Editorial rule |
| FMCG - Packaged Food, Staples & Edibles | 8 | 0 | 0 | 0 | Provisional |
| FMCG - Personal Care, Home & Hygiene | 8 | 0 | 0 | 0 | Provisional |
| Footwear, Sportswear & Accessories | 6 | 0 | 0 | 0 | Provisional |
| Hotels, Resorts & Hospitality | 7 | 0 | 0 | 0 | Provisional |
| Aviation, Airlines & Airport Infrastructure | 4 | 2 | 0 | 0 | Editorial rule · concentrated |
| Air Conditioning, Cooling & HVAC Systems | 7 | 0 | 0 | 0 | Provisional |
| Consumer Durables, Appliances & FMEG | 6 | 0 | 0 | 0 | Provisional |
| Solar, Wind & Renewable Energy Equipment | 6 | 2 | 1 | 0 | Editorial rule |
| Water Treatment, Waste & Circular Economy | 6 | 1 | 0 | 0 | Editorial rule |
| Power Generation, Thermal & Hydro Utilities | 8 | 0 | 0 | 0 | Provisional |
| Power Transmission, Transformers & Grid EPC | 8 | 0 | 0 | 0 | Provisional |
| Cables, Wires & Piping Infrastructure | 8 | 0 | 0 | 0 | Provisional |
| Aerospace, Defence & Naval Shipbuilding | 10 | 0 | 0 | 0 | Provisional |
| Railways, Rolling Stock & Signaling Infra | 8 | 1 | 0 | 0 | Editorial rule |
| Heavy Engineering, Industrial Capital Goods & Automation | 9 | 0 | 0 | 0 | Provisional |
| Real Estate, Commercial & Residential Developers | 8 | 0 | 0 | 0 | Provisional |
| Logistics, Ports & Multimodal Supply Chain | 8 | 0 | 0 | 0 | Provisional |
| Shipping, Offshore Vessels & Dredging | 5 | 1 | 0 | 0 | Editorial rule |
| Telecom Operators, Towers & Network Equipment | 8 | 0 | 0 | 0 | Provisional |
| Wealth Management, Ratings & Market Infra | 7 | 0 | 0 | 0 | Provisional |
| Stock Brokers, Exchanges & Depositories | 8 | 0 | 0 | 0 | Provisional |
| Asset Management Companies (AMCs) | 4 | 2 | 0 | 0 | Editorial rule · concentrated |
| Insurance - Life, General & Health | 8 | 0 | 0 | 0 | Provisional |
| NBFCs - Consumer, Vehicle & Housing Finance | 8 | 0 | 0 | 0 | Provisional |
| Gold Loan & Specialized NBFCs | 4 | 2 | 0 | 0 | Editorial rule · concentrated |
| Private Sector Banking | 9 | 0 | 0 | 0 | Provisional |
| PSU Banking Index | 8 | 0 | 0 | 0 | Provisional |
| EMS, Semiconductors & Electronics Manufacturing | 9 | 0 | 0 | 0 | Provisional |
| Geospatial, Drones & Smart Metering Tech | 3 | 4 | 0 | 0 | Editorial rule · concentrated |
| IT Services - Tier-1 Large Caps | 6 | 0 | 0 | 0 | Provisional |
| IT Services - High-Growth Mid & Small Caps | 10 | 0 | 0 | 0 | Provisional |
| EV Pure-Plays, Batteries & New-Age Mobility | 4 | 3 | 0 | 0 | Editorial rule · concentrated |
| Passenger Vehicles & SUV Leaders | 5 | 1 | 0 | 0 | Editorial rule |
| 2/3 Wheelers & Premium Motorcycles | 6 | 0 | 0 | 0 | Provisional |
| Commercial Vehicles, Trucks & Buses | 6 | 0 | 0 | 0 | Editorial rule |
| Auto Components, Forgings & Ancillaries | 10 | 0 | 0 | 0 | Provisional |
| Tyres, Rubber & Carbon Black | 6 | 0 | 0 | 0 | Provisional |
| Hospitals & Multi-Specialty Healthcare Chains | 12 | 1 | 0 | 0 | Editorial rule |
| Pharma - Formulations & Domestic Leaders | 10 | 0 | 0 | 0 | Provisional |
| Pharma API, CRAMS & CDMO | 6 | 3 | 0 | 0 | Editorial rule |
| Diagnostics, Pathlabs & Imaging Chains | 5 | 0 | 0 | 1 | Editorial rule |
| Speciality Chemicals & Fluorochemicals | 10 | 0 | 0 | 0 | Provisional |
| Agro Chemicals & Crop Protection | 7 | 0 | 0 | 0 | Provisional |
| Fertilisers & Soil Nutrients | 8 | 0 | 0 | 0 | Provisional |
| Sugar, Biofuels & Ethanol | 7 | 0 | 0 | 0 | Provisional |
| Cement & Clinker Manufacturers | 8 | 0 | 0 | 0 | Provisional |
| Steel, Tubes & Structural Pipes | 9 | 0 | 0 | 0 | Provisional |
| Non-Ferrous Metals (Aluminium, Zinc, Copper) | 6 | 0 | 0 | 0 | Provisional |
| Mining, Iron Ore & Coal | 6 | 0 | 0 | 0 | Provisional |
| Ceramics, Sanitaryware, Woodpanel & Tiles | 6 | 0 | 0 | 0 | Provisional |
| Paints, Surface Coatings & Adhesives | 6 | 0 | 0 | 0 | Provisional |
| Packaging - Flexible, Paper, Plastic & Glass | 7 | 0 | 0 | 0 | Provisional |
| Paper, Pulp & Forest Products | 6 | 0 | 0 | 0 | Provisional |

## How to use the audit

Use the **Stock Leaders & Theme Membership** screen to download a company-by-company CSV with the explicit tier, current editorial rationale, and static market-cap snapshot. The downloadable report is generated from the running app and will reflect future changes to curated memberships. No Screener proprietary bulk data is included in either the report or this repository.

**Next company-level evidence work:** For each provisional position, review company investor materials, annual report/quarterly segment revenue, NSE symbol/ISIN, liquidity, and changes to revenue mix. Set a dated `core`, `adjacent`, `proxy`, or `excluded` classification only with a documented reason. Never select a constituent based on its subsequent share-price performance.

**Known category-mixing risk:** `Geospatial, Drones & Smart Metering Tech` is an umbrella technology basket, not a homogeneous geospatial subsector. Genus Power's own description focuses on electricity meters, AMI and power infrastructure: https://genuspower.com/about-us/company-overview/. A fundamental review should consider splitting smart-metering into a separate theme rather than assuming all these companies have similar economic drivers.

**Public-source methodology:** https://www.niftyindices.com/resources/index-methodology describes exchange index frameworks and https://www.niftyindices.com/resources/investible-weight-factors explains free float. Our static curated basket market-cap data is **not** a live free-float index weight or a liquidity screen.

## Provenance boundary

The user's separate premium Screener CSV is an **input to private browser-only industry-peer discovery**. Industry-peers are proposed candidates, not mapped theme members or ranked daily-price leaders. The exported original company list and its 3,246 NSE-symbol industry memberships are not republished here.

**Audit control:** `npx tsx --test src/utils/stockDiscovery.test.ts` verifies the structural inventory and leadership separation. `docs/THEME_MEMBERSHIP_POSITION_AUDIT_20261111.csv` retains the complete current public-basket position snapshot.
