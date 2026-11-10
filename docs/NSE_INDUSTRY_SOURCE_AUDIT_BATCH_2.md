# NSE basic-industry source audit — second batch

Reviewed: **2026-11-10**. **34** individually checked NSE quote page labels, including **33** constituents of the bundled thematic universe.

## Verification policy

Every included ticker has a corresponding NSE equity quote result on which the symbol and **Basic Industry** field were displayed. Exact labels and source links are recorded below. No company is classified based on theme membership, sector expectation, peers, or name alone. All industry names already have checked classification codes in `basicIndustryCatalog.ts`. This batch did not query the NSE private/protected API or use automated scraping. Quote-page cache dates are not the same as this review date.

Do not add these classifications to index breadth or rankings except through the existing `VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS` mechanism. `getEditorialHints()` remains strictly excluded from returns and rankings. The newly checked source records do not imply that the 457-company saved union, every NSE listing, or historical data are fully covered. Calculated counts should be taken from CI/audit on the current snapshot.

## Reviewed company-specific NSE quote pages

| Ticker | NSE Basic Industry | Evidence |
| --- | --- | --- |
| HDFCAMC | Asset Management Company | [NSE company page](https://www.nseindia.com/get-quote/equity/HDFCAMC/HDFC-Asset-Management-Company-Limited) |
| ABSLAMC | Asset Management Company | [NSE company page](https://www.nseindia.com/get-quotes/equity?symbol=ABSLAMC) |
| UTIAMC | Asset Management Company | [NSE company page](https://www.nseindia.com/get-quote/equity/UTIAMC/UTI-Asset-Management-Company-Limited) |
| NAM-INDIA | Asset Management Company | [NSE company page](https://www.nseindia.com/get-quote/equity/NAM-INDIA/Nippon-Life-India-Asset-Management-Limited) |
| DEVYANI | Restaurants | [NSE company page](https://www.nseindia.com/get-quote/equity/DEVYANI/Devyani-International-Limited?series=EQ) |
| INDHOTEL | Hotels & Resorts | [NSE company page](https://www.nseindia.com/get-quote/equity/INDHOTEL/The-Indian-Hotels-Company-Limited) |
| CHALET | Hotels & Resorts | [NSE company page](https://www.nseindia.com/get-quote/equity/CHALET/Chalet-Hotels-Limited) |
| LEMONTREE | Hotels & Resorts | [NSE company page](https://www.nseindia.com/get-quote/equity/LEMONTREE/Lemon-Tree-Hotels-Limited) |
| CIPLA | Pharmaceuticals | [NSE company page](https://www.nseindia.com/get-quote/equity/CIPLA/Cipla-Limited) |
| LUPIN | Pharmaceuticals | [NSE company page](https://www.nseindia.com/get-quote/equity/LUPIN/Lupin-Limited) |
| AUROPHARMA | Pharmaceuticals | [NSE company page](https://www.nseindia.com/get-quote/equity/AUROPHARMA/Aurobindo-Pharma-Limited) |
| INDIANB | Public Sector Bank | [NSE company page](https://www.nseindia.com/get-quote/equity/INDIANB/Indian-Bank) |
| KARURVYSYA | Private Sector Bank | [NSE company page](https://www.nseindia.com/get-quote/equity/KARURVYSYA/Karur-Vysya-Bank-Limited) |
| BANKINDIA | Public Sector Bank | [NSE company page](https://www.nseindia.com/get-quote/equity/BANKINDIA/Bank-of-India) |
| INDUSINDBK | Private Sector Bank | [NSE company page](https://www.nseindia.com/get-quote/equity/INDUSINDBK/Indusind-Bank) |
| MAHABANK | Public Sector Bank | [NSE company page](https://www.nseindia.com/get-quote/equity/MAHABANK/Bank-of-Maharashtra) |
| KPITTECH | Computers - Software & Consulting | [NSE company page](https://www.nseindia.com/get-quote/equity/KPITTECH/KPIT-Technologies-Limited) |
| BSOFT | Computers - Software & Consulting | [NSE company page](https://www.nseindia.com/get-quote/equity/BSOFT/Birlasoft-Ltd) |
| HAPPSTMNDS | Computers - Software & Consulting | [NSE company page](https://www.nseindia.com/get-quote/equity/HAPPSTMNDS/Happiest-Minds-Technologies-Limited) |
| CYIENTDLM | Aerospace & Defense | [NSE company page](https://www.nseindia.com/get-quote/equity/CYIENTDLM/Cyient-DLM-Limited) |
| MPHASIS | Computers - Software & Consulting | [NSE company page](https://www.nseindia.com/get-quote/equity/MPHASIS/Mphasis-Ns) |
| AMBUJACEM | Cement & Cement Products | [NSE company page](https://www.nseindia.com/get-quote/equity/AMBUJACEM/Ambuja-Cements-Limited) |
| JKCEMENT | Cement & Cement Products | [NSE company page](https://www.nseindia.com/get-quote/equity/JKCEMENT/JK-Cement-Limited) |
| 360ONE | Stockbroking & Allied | [NSE company page](https://www.nseindia.com/get-quote/equity/360ONE/360-ONE-WAM-LIMITED) |
| CRISIL | Other Financial Services | [NSE company page](https://www.nseindia.com/get-quote/equity/CRISIL/CRISIL-Ltd) |
| 5PAISA | Stockbroking & Allied | [NSE company page](https://www.nseindia.com/get-quote/equity/5PAISA/5Paisa-Capital-Limited) |
| ANANDRATHI | Financial Products Distributor | [NSE company page](https://www.nseindia.com/get-quote/equity/ANANDRATHI/Anand-Rathi-Wealth-Limited) |
| ANGELONE | Stockbroking & Allied | [NSE company page](https://www.nseindia.com/get-quote/equity/ANGELONE/Angel-One-Ltd) |
| BSE | Exchange and Data Platform | [NSE company page](https://www.nseindia.com/get-quote/equity/BSE/BSE-Limited) |
| ABB | Heavy Electrical Equipment | [NSE company page](https://www.nseindia.com/get-quote/equity/ABB/ABB-India-Limited) |
| HAVELLS | Consumer Electronics | [NSE company page](https://www.nseindia.com/get-quote/equity/HAVELLS/Havells-India-Limited) |
| APOLLOTYRE | Tyres & Rubber Products | [NSE company page](https://www.nseindia.com/get-quote/equity/APOLLOTYRE/Apollo-Tyres-Limited) |
| BHEL | Heavy Electrical Equipment | [NSE company page](https://www.nseindia.com/get-quote/equity/BHEL/Bharat-Heavy-Electricals-Limited) |
| CGPOWER | Heavy Electrical Equipment | [NSE company page](https://www.nseindia.com/get-quote/equity/CGPOWER/CG-Power-and-Industrial-Solutions-Limited) |

## Methodology notes

- `CRISIL` appears as **Other Financial Services**, rather than the intuitive `Ratings` category. `360ONE` appears as **Stockbroking & Allied**; `HAVELLS` as **Consumer Electronics**; and `CYIENTDLM` as **Aerospace & Defense**. We retain NSE labels rather than override them with guesses.
- These sources are publicly indexed NSE page observations, not direct timestamped quote-API payloads. Corporate actions and material business changes require future reviews, particularly when a listing is renamed, demerged, or suspended.
- This PR adds a deterministic regression test for all added tickers and checks that mapped names have codes and that editorial guesses remain excluded.

## Reproducible validation

Run `npm run lint`, `npx tsx --test src/utils/industryEvidence.test.ts`, `npx tsx scripts/review-basic-industry-import.ts --coverage`, and `npm run build`. The standard PR workflow additionally runs price-quality, rotation-index, sector-membership, market-schedule, client-fallback, personal-tracking and taxonomy tests.
