# NSE primary-source company classification audit — batch 3

**Reviewed:** 10 November 2026. **33** current NSE company quote pages inspected: **28** with codes already checked in our July 2023 taxonomy, **5** with NSE classification confirmed but local code still pending. This batch is an evidence capture, not a licensed NSE bulk master or live NSE API pull.

## Acceptance conditions

1. Company ticker on NSE quote page matches the exact ticker in the theme/snapshot; the quote page displays a Basic Industry field.
2. Canonical label and code already exist in `OFFICIALLY_CHECKED` in `src/data/basicIndustryCatalog.ts`; punctuation normalized to the canonical taxonomy only where the NSE page omits it, for example `Gems Jewellery And Watches` to `Gems, Jewellery And Watches`.
3. A label without a checked code stays out of `VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS`, rankings, returns and breadth, even when the underlying company-page label is known.
4. Editorial suggestions remain editorial; we did not change any ranking code, stock price feeds, basket membership or market scheduling.

## Accepted: source page + checked industry code

| NSE ticker | Canonical NSE Basic Industry | Checked code | NSE source |
| --- | --- | --- | --- |
| HATSUN | Dairy Products | `IN040104002` | [NSE company quote](https://www.nseindia.com/get-quote/equity/HATSUN/Hatsun-Agro-Product-Limited) |
| PARAGMILK | Dairy Products | `IN040104002` | [NSE company quote](https://www.nseindia.com/get-quote/equity/PARAGMILK/Paragmilk-Ns) |
| KALYANKJIL | Gems, Jewellery And Watches | `IN020201005` | [NSE company quote](https://www.nseindia.com/get-quote/equity/KALYANKJIL/Kalyan-Jewellers-India-Limited) |
| SKYGOLD | Gems, Jewellery And Watches | `IN020201005` | [NSE company quote](https://www.nseindia.com/get-quote/equity/SKYGOLD/SKY-GOLD-AND-DIAMONDS-LIMITED) |
| SENCO | Gems, Jewellery And Watches | `IN020201005` | [NSE company quote](https://www.nseindia.com/get-quote/equity/SENCO/Senco-Gold-Limited) |
| UNITDSPR | Breweries & Distilleries | `IN040102001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/UNITDSPR/United-Spirits-Ltd) |
| UBL | Breweries & Distilleries | `IN040102001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/UBL/United-Breweries-Limited) |
| INDIGO | Airline | `IN090102001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/INDIGO/InterGlobe-Aviation-Limited) |
| TATAPOWER | Integrated Power Utilities | `IN110101005` | [NSE company quote](https://www.nseindia.com/get-quote/equity/TATAPOWER/Tata-Power-Company-Limited) |
| JSWENERGY | Power Generation | `IN110101004` | [NSE company quote](https://www.nseindia.com/get-quote/equity/JSWENERGY/JSW-Energy-Limited) |
| NHPC | Power Generation | `IN110101004` | [NSE company quote](https://www.nseindia.com/get-quote/equity/NHPC/NHPC-Limited) |
| SJVN | Power Generation | `IN110101004` | [NSE company quote](https://www.nseindia.com/get-quote/equity/SJVN/SJVN-Limited) |
| POLYCAB | Cables - Electricals | `IN070205003` | [NSE company quote](https://www.nseindia.com/get-quote/equity/POLYCAB/Polycab-Ns) |
| RRKABEL | Cables - Electricals | `IN070205003` | [NSE company quote](https://www.nseindia.com/get-quotes/equity?symbol=RRKABEL) |
| FINCABLES | Cables - Electricals | `IN070205003` | [NSE company quote](https://www.nseindia.com/get-quote/equity/FINCABLES/Finolex-Cables-Limited) |
| GRSE | Aerospace & Defense | `IN070201001` | [NSE company quote](https://www.nseindia.com/get-quotes/equity?symbol=GRSE) |
| TITAGARH | Railway Wagons | `IN070204005` | [NSE company quote](https://www.nseindia.com/get-quote/equity/TITAGARH/TITAGARH-RAIL-SYSTEMS-LIMITED) |
| NESTLEIND | Packaged Foods | `IN040104004` | [NSE company quote](https://www.nseindia.com/get-quote/equity/NESTLEIND/Nestle-India-Limited) |
| DABUR | Personal Care | `IN040105001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/DABUR/Dabur-India-Limited) |
| GODREJCP | Personal Care | `IN040105001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/GODREJCP/Godrej-Consumer-Products-Limited) |
| DRREDDY | Pharmaceuticals | `IN060101001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/DRREDDY/Dr-Reddy%27s-Laboratories-Limited) |
| HDFCLIFE | Life Insurance | `IN050104002` | [NSE company quote](https://www.nseindia.com/get-quote/equity/HDFCLIFE/HDFC-Life-Insurance-Company-Limited) |
| ICICIGI | General Insurance | `IN050104001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/ICICIGI/ICICI-Lombard-General-Insurance-Company-Limited) |
| BATAINDIA | Footwear | `IN020201017` | [NSE company quote](https://www.nseindia.com/get-quote/equity/BATAINDIA/Bata-India-Limited) |
| METROBRAND | Footwear | `IN020201017` | [NSE company quote](https://www.nseindia.com/get-quote/equity/METROBRAND/Metro-Brands-Limited) |
| RBLBANK | Private Sector Bank | `IN050102002` | [NSE company quote](https://www.nseindia.com/get-quote/equity/RBLBANK/RBL-Bank-Limited) |
| MCX | Exchange and Data Platform | `IN050103005` | [NSE company quote](https://www.nseindia.com/get-quote/equity/MCX/Multi-Commodity-Exchange-of-India-Limited) |
| UNIONBANK | Public Sector Bank | `IN050102001` | [NSE company quote](https://www.nseindia.com/get-quote/equity/UNIONBANK/Union-Bank-of-India) |

## Evidence captured, classification **not yet promoted** (local industry code pending)

| NSE ticker | NSE Basic Industry from quote | Direct NSE source | Review status |
| --- | --- | --- | --- |
| DLF | Residential, Commercial Projects | [NSE company quote](https://www.nseindia.com/get-quote/equity/DLF/DLF-Limited) | **Code not checked — excluded** |
| GODREJPROP | Residential, Commercial Projects | [NSE company quote](https://www.nseindia.com/get-quote/equity/GODREJPROP/Godrej-Properties-Limited) | **Code not checked — excluded** |
| ASTRAL | Plastic Products - Industrial | [NSE company quote](https://www.nseindia.com/get-quote/equity/ASTRAL/Astral-Limited) | **Code not checked — excluded** |
| COCHINSHIP | Ship Building & Allied Services | [NSE company quote](https://www.nseindia.com/get-quote/equity/COCHINSHIP/Cochin-Shipyard-Limited) | **Code not checked — excluded** |
| IRFC | Financial Institution | [NSE company quote](https://www.nseindia.com/get-quote/equity/IRFC/Indian-Railway-Finance-Corporation-Limited) | **Code not checked — excluded** |

### Important symbol/identity issue

Jupiter Wagons' currently indexed NSE quote uses **`JWL`** while the bundled thematic universe retains **`JUPITERWAG`**. We did **not** assign a verified mapping or adjust its historical price series under the stale symbol. A separate exchange-symbol/ISIN/corporate-action audit is necessary. Source: https://www.nseindia.com/get-quote/equity/JWL/Jupiter-Wagons-Limited

## Additional caveats

- Some NSE HTML pages render `Residential Commercial Projects` without punctuation. Both DLF and GODREJPROP remain pending until code-level checking is completed; we have not invented a code.
- Official company classifications can be revised over time. These are page observations from publicly indexed NSE pages on the review date, **not** direct serialized quote API responses and not permanent classifications.
- The 457-stock combined live-snapshot universe and source-verified coverage must be recalculated by CI/audit rather than assumed from static thematic counts.
- The NSE taxonomy is source documented at https://www.nseindia.com/static/products-services/industry-classification .

## Verification

CI: `npm run lint`; `npx tsx --test src/utils/industryEvidence.test.ts`; `npx tsx --test src/utils/basicIndustryAnalytics.test.ts`; `npx tsx scripts/review-basic-industry-import.ts --coverage`; `npm run build`. Validate the PR Actions and Vercel statuses before merge.
