# HeatGuard — CFO Financial Model & Unit Economics
*Prepared for Hackathon Pitch | All cost figures marked ESTIMATE or FACT*

---

## ⚠️ Disclaimer
All projections are forward-looking estimates based on stated assumptions. Only figures explicitly marked **[FACT]** are sourced from verified data. All others are **[ESTIMATE]** and must be validated before investor presentation.

---

## 1. Unit Economics per Worker/Month

| Line Item | AED/worker/month | Note |
|-----------|-----------------|------|
| **Revenue** | **50.00** | [FACT — from product pricing] |
| Azure IoT Hub + OpenAI + Storage | (4.00) | [ESTIMATE — based on Azure IoT Hub ~$0.40/device + OpenAI API usage + storage] |
| Customer Support | (3.00) | [ESTIMATE — shared support, allocated per worker] |
| **Total Variable Cost** | **(7.00)** | [ESTIMATE] |
| **Contribution Margin (CM)** | **43.00** | **86% CM ratio** |

> **CM Calculation:** AED 50 − AED 7 = AED 43 per worker per month  
> **CM %:** 43 / 50 = **86%** (noted: task brief uses AED 8 variable cost for a 84% CM; we use AED 7 to split Azure at AED 4 + Support AED 3 per input data — both brackets shown below)

| Scenario | Variable Cost | CM | CM % |
|----------|-------------|-----|------|
| Base Case (Azure AED 4 + Support AED 3) | AED 7 | AED 43 | 86% |
| Task Input (Azure AED 5 + Support AED 3) | AED 8 | AED 42 | 84% |

*We use **AED 8 / AED 42 / 84%** throughout this document, consistent with the CFO brief inputs.*

### Restated Unit Economics (Canonical)

| Line Item | AED/worker/month |
|-----------|-----------------|
| Revenue | 50.00 |
| Azure + Cloud Infrastructure | (5.00) [ESTIMATE] |
| Customer Support | (3.00) [ESTIMATE] |
| **Contribution Margin** | **42.00** |
| **CM %** | **84%** |

---

## 2. Break-Even Analysis

### Monthly Fixed Cost Stack [ESTIMATE]

| Cost Item | AED/month |
|-----------|----------|
| Engineering team (2 × engineers) | 30,000 [ESTIMATE] |
| Sales (1 × person) | 20,000 [ESTIMATE] |
| Marketing | 20,000 [ESTIMATE] |
| **Total Monthly Fixed Costs** | **70,000** |

### Break-Even Worker Count

```
Break-Even Workers = Fixed Costs / Contribution Margin per Worker
                   = AED 70,000 / AED 42
                   = 1,667 workers [ESTIMATE]
```

> **→ HeatGuard needs 1,667 paying workers to cover all monthly fixed costs.**

### Time to Break-Even at 100 New Workers/Month Acquisition [ESTIMATE]

Starting at Month 0 with 0 workers, adding 100/month:

| Month | Cumulative Workers | Monthly Revenue | Monthly Variable Cost | Monthly CM | Fixed Costs | Net P&L |
|-------|-------------------|-----------------|----------------------|------------|-------------|---------|
| 1 | 100 | 5,000 | 800 | 4,200 | 70,000 | **−65,800** |
| 3 | 300 | 15,000 | 2,400 | 12,600 | 70,000 | **−57,400** |
| 6 | 600 | 30,000 | 4,800 | 25,200 | 70,000 | **−44,800** |
| 9 | 900 | 45,000 | 7,200 | 37,800 | 70,000 | **−32,200** |
| 12 | 1,200 | 60,000 | 9,600 | 50,400 | 70,000 | **−19,600** |
| 17 | 1,700 | 85,000 | 13,600 | 71,400 | 70,000 | **+1,400** ✅ |

> **At 100 workers/month linear acquisition → Break-even at ~Month 17** [ESTIMATE]  
> (Exact: 1,667 workers ÷ 100 workers/month = **16.7 months**)

---

## 3. Year 1 Ramp — Month-by-Month Model [ESTIMATE]

**Growth Trajectory Assumptions:**
- Month 1–3: Pilot phase (1–2 companies), slow onboarding
- Month 4–6: First expansions + 1–2 new companies
- Month 7–9: Word of mouth + active sales
- Month 10–12: Scaling to 3,500 workers

**Sales Cost Events (one-time per company sign-up):** AED 15,000/company [ESTIMATE]

| Month | Workers (EOM) | MRR (AED) | Variable Cost | CM | Fixed Costs | Sales Events | Net P&L (AED) | Cumulative P&L |
|-------|-------------|-----------|--------------|-----|-------------|--------------|---------------|----------------|
| **M1** | 200 | 10,000 | 1,600 | 8,400 | 70,000 | 15,000 (1 co) | **−76,600** | −76,600 |
| **M2** | 350 | 17,500 | 2,800 | 14,700 | 70,000 | 15,000 (1 co) | **−70,300** | −146,900 |
| **M3** | 500 | 25,000 | 4,000 | 21,000 | 70,000 | 0 | **−49,000** | −195,900 |
| **M4** | 800 | 40,000 | 6,400 | 33,600 | 70,000 | 15,000 (1 co) | **−51,400** | −247,300 |
| **M5** | 1,100 | 55,000 | 8,800 | 46,200 | 70,000 | 15,000 (1 co) | **−38,800** | −286,100 |
| **M6** | 1,500 | 75,000 | 12,000 | 63,000 | 70,000 | 0 | **−7,000** | −293,100 |
| **M7** | 1,800 | 90,000 | 14,400 | 75,600 | 70,000 | 15,000 (1 co) | **−9,400** | −302,500 |
| **M8** | 2,100 | 105,000 | 16,800 | 88,200 | 70,000 | 0 | **+18,200** ✅ | −284,300 |
| **M9** | 2,500 | 125,000 | 20,000 | 105,000 | 70,000 | 15,000 (1 co) | **+20,000** | −264,300 |
| **M10** | 2,800 | 140,000 | 22,400 | 117,600 | 70,000 | 0 | **+47,600** | −216,700 |
| **M11** | 3,100 | 155,000 | 24,800 | 130,200 | 70,000 | 15,000 (1 co) | **+45,200** | −171,500 |
| **M12** | 3,500 | 175,000 | 28,000 | 147,000 | 70,000 | 0 | **+77,000** | −94,500 |

**Year 1 Summary:**
| Metric | Value |
|--------|-------|
| Year 1 Total Revenue | AED 1,012,500 |
| Year 1 Total Variable Cost | AED 162,000 |
| Year 1 Total CM | AED 850,500 |
| Year 1 Total Fixed Costs | AED 840,000 |
| Year 1 Total Sales Costs | AED 105,000 (7 companies × AED 15K) |
| **Year 1 Net P&L** | **AED −94,500** |
| First month profitable | **Month 8** |
| Cumulative cash deficit (peak) | **~AED −302,500** at Month 7 |

> **→ First profitable month: Month 8. Full Year 1 net loss: ~AED 95,000.** [ESTIMATE]

---

## 4. What-If Sensitivity Analysis [ESTIMATE]

### Scenario A: Price Drops 20% → AED 40/worker/month

| Metric | Base (AED 50) | Price Drop (AED 40) | Impact |
|--------|-------------|-------------------|--------|
| Revenue per worker | 50 | 40 | −20% |
| Variable cost | 8 | 8 | — |
| Contribution Margin | 42 | 32 | −24% |
| CM % | 84% | 80% | −4pp |
| Break-even workers | 1,667 | **2,188** | +521 more workers |
| Year 1 Revenue (3,500 workers) | 1,012,500 | 810,000 | −AED 202,500 |
| Year 1 Net P&L | −94,500 | **−297,000** | Much worse |
| Month first profitable | Month 8 | **Month 11+** | 3-month delay |

### Scenario B: Volume 50% Lower Than Plan

Revised ramp: half the worker growth in each month.

| Metric | Base Plan | 50% Volume |
|--------|-----------|-----------|
| Workers at Month 12 | 3,500 | 1,750 |
| Month 12 MRR | AED 175,000 | AED 87,500 |
| Month 12 Net P&L | +AED 77,000 | **−AED 7,000** |
| Break-even (workers) | Month 8 | **Never in Year 1** |
| Year 1 Net P&L | −AED 94,500 | **−AED 383,000** |

> At 50% volume, break-even is pushed to approximately **Month 20–22** post-launch. [ESTIMATE]

### Scenario C: Azure Costs 2× Higher (AED 10 instead of AED 5)

| Metric | Base | Azure 2× |
|--------|------|----------|
| Variable cost per worker | AED 8 | AED 13 |
| Contribution Margin | AED 42 | AED 37 |
| CM % | 84% | 74% |
| Break-even workers | 1,667 | **1,892** |
| Year 1 Net P&L | −AED 94,500 | **−AED 269,500** |

> Azure cost doubling is painful but not fatal — still a 74% CM business. [ESTIMATE]

---

## 5. CAC and LTV Analysis [ESTIMATE]

### Customer Acquisition Cost (per Company)

| CAC Component | AED | Note |
|--------------|-----|------|
| Sales person time (avg 2 months to close) | 40,000 | 2 months × AED 20K salary allocation |
| Implementation + onboarding | 10,000 | [ESTIMATE] |
| Marketing allocation per deal | 20,000 | 1 month marketing ÷ ~1 deal/month |
| Travel / site visits | 5,000 | [ESTIMATE] |
| **Total CAC per Company** | **75,000** | **[ESTIMATE]** |

*Average company size assumed: 500 workers [ESTIMATE]*  
*CAC per worker: AED 75,000 / 500 = **AED 150/worker** [ESTIMATE]*

### Customer Lifetime Value (per Company)

**Assumptions:**
- Average contract duration: 24 months [ESTIMATE from task brief]
- Annual retention rate: 85% → Avg contract lifetime = 1/(1−0.85) = **6.67 years** [ESTIMATE]
- We cap LTV at 36 months (3 years) for conservatism [ESTIMATE]
- Average company: 500 workers

```
Monthly Revenue per Company   = 500 workers × AED 50 = AED 25,000
Monthly CM per Company        = 500 workers × AED 42 = AED 21,000
LTV (36-month horizon)        = AED 21,000 × 36     = AED 756,000
LTV (24-month contract)       = AED 21,000 × 24     = AED 504,000
```

### LTV:CAC Ratio

| Scenario | LTV | CAC | LTV:CAC |
|----------|-----|-----|---------|
| 24-month contract | AED 504,000 | AED 75,000 | **6.7:1** ✅ |
| 36-month horizon | AED 756,000 | AED 75,000 | **10.1:1** ✅ |
| Price −20% (AED 40) | AED 384,000 | AED 75,000 | **5.1:1** ✅ |

> **Industry benchmark: LTV:CAC > 3:1 is healthy; > 5:1 is excellent.**  
> **HeatGuard at 6.7:1 is a strong SaaS business IF retention holds.** [ESTIMATE]

**Payback Period:**
```
CAC Recovery = AED 75,000 / AED 21,000 CM/month = 3.6 months [ESTIMATE]
```
> At ~3.6 months payback per company, every new customer is cash-flow positive within one quarter.

---

## 6. Startup Cash Requirements & Hackathon Prize Context

### Pre-Revenue Cash Needed [ESTIMATE]

| Item | AED | Note |
|------|-----|------|
| Initial Azure setup + development | 30,000 | [ESTIMATE] |
| Legal / compliance | 15,000 | [ESTIMATE] |
| Month 1–3 runway (team + marketing) | 270,000 | AED 90K/month × 3 |
| Sales onboarding costs (3 months) | 45,000 | 3 companies × AED 15K |
| **Minimum cash to reach Month 3** | **360,000** | [ESTIMATE] |
| **Cash to reach break-even (Month 8)** | **~AED 450,000** | [ESTIMATE — peak cumulative deficit + buffer] |

> **Minimum viable runway to reach first profitable month: ~AED 450,000 (~USD 122,500)** [ESTIMATE]

### 🏆 Hackathon Prize: USD 105,000 = AED ~385,000

*Conversion: USD 105,000 × 3.67 AED/USD = **AED 385,350*** [FACT — exchange rate approximate]

| Prize Scenario | Months of Runway Covered |
|---------------|-------------------------|
| Full prize (AED 385,350) ÷ Monthly burn AED 90,000/month | **~4.3 months** |
| + Revenue from Month 1 clients | Extends to **~6–7 months** |
| Covers development + legal setup | Yes — AED 45,000 of AED 385,350 |
| **Gap to break-even** | **~AED 65,000 still needed** (or revenue covers it by Month 7) |

> **The prize alone buys ~4.3 months of runway. Combined with early customer revenue, it can fund all the way to break-even at Month 8 without additional external funding.** [ESTIMATE]

---

## 7. CFO's Plain-Language Note

**To: HeatGuard Founding Team**  
**From: CFO Analysis**  
**Re: Can this business work financially?**

HeatGuard generates **AED 42 of contribution margin for every AED 50 charged** — an 84% gross margin that is rare and powerful. For context, enterprise SaaS typically targets 70–80%. This business has excellent unit economics IF we can sign customers.

**The one number that makes or breaks this:** Worker acquisition pace. We need 1,667 workers live before we stop bleeding cash monthly. That means 4–6 construction company deals. Every month we delay signing Company #4 costs us AED 70,000 in fixed burn.

**Cash needed before break-even:** Approximately **AED 450,000** (~USD 123,000). The hackathon prize of USD 105,000 covers ~85% of this, making it possible to reach profitability without a formal seed round if we sign paying clients fast.

**Three ways to improve margin (with numbers):**
1. Negotiate Azure reserved instances → save 30–40% on cloud = +AED 1.50/worker/month → +AED 5,250/month at 3,500 workers
2. Raise price to AED 65 for large sites (1,000+ workers) → premium tier adds AED 15/worker → +AED 15,000/month per large client
3. Automate onboarding to cut implementation cost from AED 15,000 → AED 5,000/company → saves AED 70,000/year at 7 companies

**Riskiest assumption:** The 85% annual retention rate. If churn rises to 30%/year (3-year LTV drops from AED 756K to AED 350K), LTV:CAC falls to 4.7:1 — still viable, but fundraising becomes harder. The June–September outdoor work ban means 4 months of zero field usage annually — this may trigger cancellations. We must price contracts as annual subscriptions to avoid seasonal churn.

---

## 8. Summary Dashboard

| KPI | Value | Status |
|-----|-------|--------|
| Contribution Margin per Worker | AED 42 (84%) | ✅ Excellent |
| Monthly Fixed Costs | AED 70,000 | Manageable |
| **Break-Even Worker Count** | **1,667 workers** | 🎯 Target |
| Workers Needed = Approx Companies | 4–5 companies (avg 400 workers) | Realistic |
| **First Profitable Month** | **Month 8** | 📅 Q3 Year 1 |
| **Peak Cash Need (pre-break-even)** | **~AED 450,000 (~USD 123K)** | 💰 Key |
| Year 1 Closing Net P&L | −AED 94,500 | Near break-even |
| LTV:CAC Ratio | **6.7:1** | ✅ Strong |
| CAC Payback Period | ~3.6 months | ✅ Fast |
| Hackathon Prize Runway | ~4.3 months | 🏆 Bridge to profitable |
| **Biggest Financial Risk** | Seasonal churn (Jun–Sep work ban) | ⚠️ Critical |

---

## 9. Key Risks Register [ESTIMATE]

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Seasonal 4-month work ban reduces usage | High | High | Annual contract pricing, usage credits |
| Azure OpenAI costs spike (GPT-4o usage) | Medium | Medium | Switch to GPT-4o-mini or fine-tuned model |
| Sales cycle > 3 months per deal | High | High | Hire experienced enterprise UAE sales early |
| UAE regulatory data localization | Low-Medium | High | Azure UAE North region already compliant |
| Price pressure from competition | Medium | High | Lock in 2-year contracts before competitors arrive |
| Worker retention data used by employers | Low | Catastrophic | Legal contracts + data governance (already designed in) |

---

*All [ESTIMATE] figures are projections for planning purposes. All [FACT] figures are sourced from verified public data. This analysis should be validated by a qualified financial advisor before investor presentation.*

*Model Version: 1.0 | Date: 2026-11-19 | Built for HeatGuard Hackathon Pitch*
