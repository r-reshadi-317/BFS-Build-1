/* ============================================================
   STUDY GUIDE ARCHITECTURE
   Each section: { id, title, category, status, html }
   status: "complete" | "stub"
   Future prompts: flesh out "stub" sections or add new ones.
   IMPORTANT: 'id' values MUST match studyGuideReference values
   used in questions.js so cross-linking works.
   ============================================================ */

const STUDY_GUIDE = [
  {
    id: "fed-monetary",
    title: "Federal Reserve & Monetary Policy",
    category: "Federal Reserve & Monetary Policy",
    status: "complete",
    html: `
      <h2>Federal Reserve & Monetary Policy</h2>
      <p>The <strong>Federal Reserve (the Fed)</strong> is the central bank of the United States, created by the <em>Federal Reserve Act of 1913</em>.</p>
      <h3>The Three Main Tools of Monetary Policy</h3>
      <ul>
        <li><strong>Open Market Operations (OMO)</strong> — the most-used tool. The FOMC buys/sells government securities.
          <ul><li><b>Buy</b> securities → adds reserves → <b>expansionary</b> (rates fall, money supply rises)</li>
          <li><b>Sell</b> securities → drains reserves → <b>contractionary</b></li></ul></li>
        <li><strong>Discount Rate</strong> — rate the Fed charges banks at the discount window (Fed acts as <em>lender of last resort</em>).</li>
        <li><strong>Reserve Requirements</strong> — the % of deposits banks must hold. Lowering it expands lending.</li>
      </ul>
      <h3>Modern Implementation: Interest on Reserve Balances (IORB)</h3>
      <p>In today's <em>ample-reserves</em> framework, the Fed primarily steers the <strong>federal funds rate</strong> by adjusting the interest it pays banks on reserves (IORB). This acts as a <b>floor</b>: a bank won't lend reserves to another bank for less than it can earn risk-free at the Fed.</p>
      <h3>Key Distinction: Monetary vs. Fiscal</h3>
      <p><strong>Monetary policy</strong> = the Fed (money supply & interest rates). <strong>Fiscal policy</strong> = Congress + President (taxing & spending). This is a top national-level trap.</p>
      <h3>The Federal Funds Rate vs. Discount Rate</h3>
      <p>Fed funds rate = banks lending to <em>each other</em> overnight. Discount rate = Fed lending to <em>banks</em>.</p>
      <div class="explanation"><b>Finalist Tip:</b> Memorize policy DIRECTION. When growth is weak/inflation low → expansionary (buy bonds, cut rates). When inflation is high → contractionary (sell bonds, raise rates).</div>
    `
  },
  {
    id: "fed-structure",
    title: "Federal Reserve Structure",
    category: "Federal Reserve & Monetary Policy",
    status: "complete",
    html: `
      <h2>Federal Reserve Structure</h2>
      <ul>
        <li><strong>Board of Governors</strong> — 7 members, 14-year terms, based in Washington, D.C. The Chair serves a 4-year (renewable) term.</li>
        <li><strong>12 Regional Federal Reserve Banks</strong> — located in cities such as New York, Chicago, San Francisco, and Atlanta. Each serves a district and supervises member banks.</li>
        <li><strong>Federal Open Market Committee (FOMC)</strong> — the policy-setting body with <b>12 voting members</b>: the 7 Governors + the New York Fed president (always votes) + 4 of the remaining 11 regional presidents (rotating annually).</li>
        <li><strong>Member Banks</strong> — each regional bank has a 9-member board of directors.</li>
      </ul>
      <h3>The Three Key Numbers (don't mix them up!)</h3>
      <table class="sg-table">
        <tr><th>Number</th><th>What it means</th></tr>
        <tr><td>7</td><td>Members of the Board of Governors</td></tr>
        <tr><td>12</td><td>Regional Reserve Banks AND FOMC voting members</td></tr>
        <tr><td>9</td><td>Directors on each regional bank's board</td></tr>
      </table>
      <h3>Core Functions of the Fed</h3>
      <ol>
        <li>Conduct monetary policy</li>
        <li>Supervise & regulate banks</li>
        <li>Maintain financial stability</li>
        <li>Provide payment services (Fedwire, FedNow, ACH)</li>
        <li>Serve as the government's bank</li>
      </ol>
      <div class="explanation"><b>Dual Mandate:</b> Congress directs the Fed to pursue (1) <b>maximum employment</b> and (2) <b>stable prices</b> (~2% inflation target).</div>
    `
  },
  {
    id: "money-multiplier",
    title: "Money Multiplier & Fractional Reserve Banking",
    category: "Federal Reserve & Monetary Policy",
    status: "complete",
    html: `
      <h2>Money Multiplier & Fractional Reserve Banking</h2>
      <p>Banks operate under <strong>fractional reserve banking</strong>: they hold only a fraction of deposits as reserves and lend the rest, expanding the money supply.</p>
      <h3>The Simple Money Multiplier</h3>
      <p class="formula">Money Multiplier = 1 / Reserve Requirement</p>
      <p>Maximum money-supply expansion = New Deposit × Money Multiplier.</p>
      <h3>Worked Example</h3>
      <p>Reserve requirement = 10%. New deposit = $1,000.</p>
      <ul>
        <li>Multiplier = 1 / 0.10 = <b>10</b></li>
        <li>Total potential money supply increase = $1,000 × 10 = <b>$10,000</b></li>
        <li>Additional <em>lending</em> = $9,000 (the original $1,000 stays as the first deposit)</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> The question may ask for total money-supply increase ($10,000) OR additional lending ($9,000). Read carefully.</div>
    `
  },
  {
    id: "interest-math",
    title: "Interest Rate Mathematics (APR, APY, Real vs. Nominal)",
    category: "Financial Statements & Ratios",
    status: "complete",
    html: `
      <h2>Interest Rate Mathematics</h2>
      <h3>APR vs. APY</h3>
      <p><strong>APR (Annual Percentage Rate)</strong> = the nominal/stated rate, ignoring compounding within the year.</p>
      <p><strong>APY (Annual Percentage Yield)</strong> = the effective rate that accounts for compounding.</p>
      <p class="formula">APY = (1 + r/n)<sup>n</sup> − 1</p>
      <p>where r = nominal rate, n = compounding periods per year.</p>
      <p><b>Example:</b> 6% compounded monthly → APY = (1 + 0.06/12)<sup>12</sup> − 1 ≈ <b>6.17%</b>. APY ≥ APR always (equal only with annual compounding).</p>
      <h3>Real vs. Nominal Interest Rates</h3>
      <p class="formula">Real Rate ≈ Nominal Rate − Inflation Rate</p>
      <p><b>Example:</b> 4% nominal − 6% inflation = <b>−2% real</b>. Negative real rate = losing purchasing power.</p>
      <h3>After-Tax vs. Tax-Equivalent Yield (don't confuse!)</h3>
      <p class="formula">After-Tax Yield = Taxable Yield × (1 − Tax Rate)</p>
      <p class="formula">Tax-Equivalent Yield = Tax-Free Yield / (1 − Tax Rate)</p>
      <div class="explanation"><b>Memory hook:</b> Going from taxable → after-tax, you <b>multiply</b> (number shrinks). Going from tax-free → equivalent, you <b>divide</b> (number grows).</div>
    `
  },
  {
    id: "amortization",
    title: "Loan Amortization",
    category: "Lending & Credit",
    status: "complete",
    html: `
      <h2>Loan Amortization</h2>
      <p>An <strong>amortizing loan</strong> is repaid with equal periodic payments split between interest and principal. Interest is charged on the <em>outstanding balance</em>, which declines over time.</p>
      <h3>The Key Insight: Interest Is Front-Loaded</h3>
      <p>Early payments are mostly <b>interest</b> (because the balance is highest). Later payments are mostly <b>principal</b>.</p>
      <p class="formula">Monthly Interest = Outstanding Balance × Monthly Rate</p>
      <p class="formula">Principal Portion = Total Payment − Interest Portion</p>
      <h3>Worked Example</h3>
      <p>$200,000 loan, 6% annual (0.5% monthly), payment = $1,199.10.</p>
      <ul>
        <li>Month 1 interest = $200,000 × 0.005 = <b>$1,000</b></li>
        <li>Month 1 principal = $1,199.10 − $1,000 = <b>$199.10</b></li>
        <li>New balance = $199,800.90 (next month's interest is slightly lower)</li>
      </ul>
      <div class="explanation"><b>Finalist Tip:</b> This is why paying extra principal early saves enormous interest over the life of a mortgage.</div>
    `
  },
  {
    id: "loan-pricing",
    title: "Loan Pricing & Risk-Based Spreads",
    category: "Lending & Credit",
    status: "complete",
    html: `
      <h2>Loan Pricing & Risk-Based Spreads</h2>
      <p>Banks price loans as a <strong>base rate + spread</strong>. The spread compensates for credit risk, term, and overhead.</p>
      <p class="formula">Loan Rate = Prime Rate + Risk Spread</p>
      <h3>Key Benchmark Rates</h3>
      <ul>
        <li><strong>Prime Rate</strong> — the rate banks charge their most creditworthy customers (typically Fed funds + ~3%).</li>
        <li><strong>SOFR</strong> (Secured Overnight Financing Rate) — replaced LIBOR as the leading benchmark for many floating-rate loans.</li>
      </ul>
      <h3>Risk-Based Pricing</h3>
      <p>Higher-risk borrowers receive larger spreads. Example: Prime (7.5%) + 2% = 9.5% for a strong borrower; Prime + 4% = 11.5% for a riskier one. Because they float with prime, both move when the Fed changes rates.</p>
      <div class="explanation"><b>Common Trap:</b> Prime-based loans are usually <b>floating</b>, not fixed.</div>
    `
  },
  {
    id: "credit-analysis",
    title: "Credit Analysis & The 5 C's",
    category: "Lending & Credit",
    status: "complete",
    html: `
      <h2>Credit Analysis & The 5 C's of Credit</h2>
      <table class="sg-table">
        <tr><th>C</th><th>Meaning</th></tr>
        <tr><td><b>Character</b></td><td>Credit history, reputation, reliability of repayment.</td></tr>
        <tr><td><b>Capacity</b></td><td>Ability to repay — income, cash flow, debt-to-income ratio.</td></tr>
        <tr><td><b>Capital</b></td><td>The borrower's own money invested (skin in the game).</td></tr>
        <tr><td><b>Collateral</b></td><td>Assets pledged to secure the loan.</td></tr>
        <tr><td><b>Conditions</b></td><td>External factors — economy, industry, loan purpose.</td></tr>
      </table>
      <p class="formula">Debt-to-Income = Total Monthly Debt / Gross Monthly Income</p>
      <div class="explanation"><b>Common Trap:</b> <b>Capacity</b> = ability to repay (cash flow). <b>Capital</b> = the borrower's own funds invested. Easy to confuse.</div>
    `
  },
  {
    id: "credit-scoring",
    title: "Credit Scoring (FICO)",
    category: "Consumer Banking & Deposit Products",
    status: "complete",
    html: `
      <h2>Credit Scoring (FICO)</h2>
      <p>FICO scores range from <b>300–850</b>. Five weighted factors:</p>
      <table class="sg-table">
        <tr><th>Factor</th><th>Weight</th></tr>
        <tr><td>Payment History</td><td><b>~35%</b> (largest)</td></tr>
        <tr><td>Amounts Owed / Utilization</td><td>~30%</td></tr>
        <tr><td>Length of Credit History</td><td>~15%</td></tr>
        <tr><td>New Credit / Inquiries</td><td>~10%</td></tr>
        <tr><td>Credit Mix</td><td>~10%</td></tr>
      </table>
      <div class="explanation"><b>Common Trap:</b> Utilization (30%) is the 2nd-largest factor, but <b>payment history (35%)</b> is #1.</div>
    `
  },
  {
    id: "commercial-lending",
    title: "Commercial Banking & Business Lending",
    category: "Commercial Banking",
    status: "complete",
    html: `
      <h2>Commercial Banking & Business Lending</h2>
      <h3>Common Business Credit Products</h3>
      <ul>
        <li><strong>Revolving Line of Credit</strong> — draw, repay, redraw; ideal for fluctuating/seasonal working capital.</li>
        <li><strong>Term Loan</strong> — fixed amount over a set period; for long-term assets.</li>
        <li><strong>Commercial Mortgage</strong> — real estate financing.</li>
        <li><strong>Equipment Financing</strong> — tied to specific machinery/assets as collateral.</li>
        <li><strong>SBA Loans</strong> — government-guaranteed loans for small businesses.</li>
      </ul>
      <p class="formula">Working Capital = Current Assets − Current Liabilities</p>
      <h3>Treasury Management Services</h3>
      <p>Cash management, payroll, lockbox, sweep accounts, and fraud protection for business clients.</p>
      <div class="explanation"><b>Common Trap:</b> Match the product to the NEED — revolving credit for cyclical inventory, term loans for fixed long-term needs.</div>
    `
  },
  {
    id: "deposit-products",
    title: "Deposit Products",
    category: "Consumer Banking & Deposit Products",
    status: "complete",
    html: `
      <h2>Deposit Products</h2>
      <table class="sg-table">
        <tr><th>Product</th><th>Liquidity</th><th>Yield</th><th>Notes</th></tr>
        <tr><td>Checking</td><td>High</td><td>None/low</td><td>Transactional</td></tr>
        <tr><td>Savings</td><td>High</td><td>Low</td><td>Limited transactions historically</td></tr>
        <tr><td>Money Market (MMDA)</td><td>Med–High</td><td>Moderate</td><td>Tiered rates, limited checks</td></tr>
        <tr><td>Certificate of Deposit (CD)</td><td>Low (locked)</td><td>Higher</td><td>Early-withdrawal penalty</td></tr>
      </table>
      <div class="explanation"><b>Common Trap:</b> CDs (locked term, penalty) vs. money market accounts (liquid). Choose CD when the customer can lock funds for higher yield.</div>
    `
  },
  {
    id: "consumer-regs",
    title: "Consumer Protection Regulations (The Reg Alphabet)",
    category: "Banking Regulations & Compliance",
    status: "complete",
    html: `
      <h2>Consumer Protection Regulations</h2>
      <p>The "Reg alphabet" is one of the most-tested national topics. Memorize the pairings:</p>
      <table class="sg-table">
        <tr><th>Regulation</th><th>Law</th><th>Covers</th></tr>
        <tr><td><b>Reg Z</b></td><td>Truth in Lending Act (TILA)</td><td>Credit disclosures — APR, credit cards</td></tr>
        <tr><td><b>Reg E</b></td><td>Electronic Fund Transfer Act</td><td>Debit cards, electronic transfers, fraud liability</td></tr>
        <tr><td><b>Reg DD</b></td><td>Truth in Savings Act</td><td>Deposit account disclosures — APY</td></tr>
        <tr><td><b>Reg CC</b></td><td>Expedited Funds Availability Act</td><td>Check holds & funds availability</td></tr>
        <tr><td><b>Reg B</b></td><td>Equal Credit Opportunity Act</td><td>Fair lending / anti-discrimination</td></tr>
      </table>
      <h3>Reg E Debit-Card Fraud Liability</h3>
      <ul>
        <li>Reported within <b>2 business days</b>: max liability <b>$50</b></li>
        <li>Within 60 days of statement: up to <b>$500</b></li>
        <li>After 60 days: potentially <b>unlimited</b></li>
      </ul>
      <div class="explanation"><b>#1 National Trap:</b> Reg Z = CREDIT (APR). Reg E = DEBIT/electronic. Reg DD = SAVINGS (APY). Reg CC = check HOLDS.</div>
    `
  },
  {
    id: "fdic-coverage",
    title: "FDIC Deposit Insurance",
    category: "Banking Regulations & Compliance",
    status: "complete",
    html: `
      <h2>FDIC Deposit Insurance</h2>
      <p>The FDIC insures deposits up to <strong>$250,000 per depositor, per insured bank, per ownership category.</strong></p>
      <h3>Ownership Categories (each gets separate coverage)</h3>
      <ul>
        <li>Single accounts</li>
        <li>Joint accounts (per co-owner share)</li>
        <li>Certain retirement accounts (e.g., IRAs)</li>
        <li>Revocable/irrevocable trusts</li>
        <li>Business accounts</li>
      </ul>
      <h3>Worked Example</h3>
      <p>$200,000 single + $75,000 share of a joint account at one bank = <b>$275,000 fully insured</b> (two separate categories).</p>
      <h3>What's NOT Insured</h3>
      <p>Stocks, bonds, mutual funds, life insurance, annuities, crypto — even if bought through the bank.</p>
      <div class="explanation"><b>Common Trap:</b> It is NOT a flat $250,000 per bank — coverage multiplies across ownership categories.</div>
    `
  },
  {
    id: "aml-bsa",
    title: "AML / BSA Compliance",
    category: "Banking Regulations & Compliance",
    status: "complete",
    html: `
      <h2>Anti-Money Laundering (AML) & Bank Secrecy Act (BSA)</h2>
      <table class="sg-table">
        <tr><th>Report</th><th>Trigger</th></tr>
        <tr><td><b>CTR</b> (Currency Transaction Report)</td><td>Cash transactions <b>over $10,000</b> (dollar threshold)</td></tr>
        <tr><td><b>SAR</b> (Suspicious Activity Report)</td><td>Any <b>suspicious</b> activity, regardless of amount</td></tr>
      </table>
      <h3>KYC & CIP</h3>
      <p><strong>Know Your Customer (KYC)</strong> and the <strong>Customer Identification Program (CIP)</strong> require banks to verify identity and monitor activity.</p>
      <h3>Structuring (Illegal!)</h3>
      <p>Deliberately breaking up deposits to stay under $10,000 and evade a CTR is a <b>federal crime</b>, even if each deposit is small. It may trigger a SAR.</p>
      <div class="explanation"><b>Common Trap:</b> CTR = dollar threshold; SAR = suspicion. They are different triggers.</div>
    `
  },
  {
    id: "banking-history",
    title: "Banking History & Landmark Legislation",
    category: "Banking Regulations & Compliance",
    status: "complete",
    html: `
      <h2>Banking History & Landmark Legislation</h2>
      <table class="sg-table">
        <tr><th>Year</th><th>Law</th><th>Significance</th></tr>
        <tr><td>1913</td><td>Federal Reserve Act</td><td>Created the Federal Reserve System</td></tr>
        <tr><td>1933</td><td>Glass-Steagall (Banking Act)</td><td>Created the FDIC; separated commercial & investment banking</td></tr>
        <tr><td>1999</td><td>Gramm-Leach-Bliley</td><td><b>Repealed</b> Glass-Steagall's separation</td></tr>
        <tr><td>2010</td><td>Dodd-Frank</td><td>Post-2008 reform; created the CFPB; Volcker Rule</td></tr>
      </table>
      <div class="explanation"><b>#1 History Trap:</b> Glass-Steagall (1933) SEPARATED banking & created the FDIC. Gramm-Leach-Bliley (1999) REUNITED it. Don't swap them.</div>
    `
  },
  {
    id: "post-crisis-reg",
    title: "Post-Crisis Regulation (Dodd-Frank & the CFPB)",
    category: "Banking Regulations & Compliance",
    status: "complete",
    html: `
      <h2>Post-Crisis Regulation</h2>
      <p>The <strong>Dodd-Frank Wall Street Reform and Consumer Protection Act (2010)</strong> responded to the 2008 financial crisis.</p>
      <h3>Key Provisions</h3>
      <ul>
        <li>Created the <strong>Consumer Financial Protection Bureau (CFPB)</strong>.</li>
        <li><strong>Volcker Rule</strong> — limits banks' proprietary trading.</li>
        <li>Created the <strong>Financial Stability Oversight Council (FSOC)</strong>.</li>
        <li>Enhanced capital/stress-testing requirements for large banks ("too big to fail").</li>
      </ul>
      <h3>Major Regulators (don't confuse their ages)</h3>
      <table class="sg-table">
        <tr><th>Agency</th><th>Created</th><th>Role</th></tr>
        <tr><td>OCC</td><td>1863</td><td>Charters & supervises national banks</td></tr>
        <tr><td>Federal Reserve</td><td>1913</td><td>Central bank, monetary policy</td></tr>
        <tr><td>FDIC</td><td>1933</td><td>Deposit insurance</td></tr>
        <tr><td>SEC</td><td>1934</td><td>Securities markets</td></tr>
        <tr><td>CFPB</td><td>2010</td><td>Consumer financial protection</td></tr>
      </table>
    `
  },
  {
    id: "fair-lending",
    title: "Fair Lending (ECOA, CRA, Fair Housing)",
    category: "Ethics & Financial Literacy",
    status: "complete",
    html: `
      <h2>Fair Lending</h2>
      <h3>Equal Credit Opportunity Act (ECOA / Reg B)</h3>
      <p>Prohibits credit discrimination based on: <b>race, color, religion, national origin, sex, marital status, age</b>, or receipt of public assistance.</p>
      <h3>Community Reinvestment Act (CRA)</h3>
      <p>Encourages banks to meet the credit needs of their entire community, including low- and moderate-income neighborhoods.</p>
      <h3>Fair Housing Act</h3>
      <p>Prohibits discrimination in residential real estate / mortgage lending.</p>
      <h3>Disparate Impact</h3>
      <p>A policy that is neutral on its face but disproportionately harms a protected group can still violate fair lending — even via <b>proxy variables</b> (e.g., ZIP code in an AI model).</p>
      <div class="explanation"><b>Common Trap:</b> ECOA = anti-discrimination. CRA = community lending obligations. Different purposes.</div>
    `
  },
  {
    id: "banking-ethics",
    title: "Banking Ethics & Suitability",
    category: "Ethics & Financial Literacy",
    status: "complete",
    html: `
      <h2>Banking Ethics</h2>
      <h3>Core Principles</h3>
      <ul>
        <li><strong>Suitability</strong> — recommend products that fit the customer's needs, goals, and risk tolerance.</li>
        <li><strong>Fiduciary duty</strong> — act in the client's best interest (esp. in advisory roles).</li>
        <li><strong>Conflict of interest</strong> — never let personal incentives (commissions) override the customer's interest.</li>
        <li><strong>Confidentiality & privacy</strong> — protect customer data (Gramm-Leach-Bliley privacy provisions).</li>
        <li><strong>Transparency</strong> — disclose fees and risks clearly.</li>
      </ul>
      <h3>Case Logic</h3>
      <p>For a retiree's emergency fund: recommend safe, liquid, insured options — NOT a high-fee complex product that benefits the banker.</p>
      <div class="explanation"><b>Finalist Tip:</b> When a question pits commission vs. customer needs, the ethical answer ALWAYS prioritizes the customer.</div>
    `
  },
  {
    id: "tax-ethics",
    title: "Tax Ethics: Avoidance vs. Evasion & Structuring",
    category: "Taxation in Banking",
    status: "complete",
    html: `
      <h2>Tax Ethics</h2>
      <h3>Avoidance vs. Evasion</h3>
      <ul>
        <li><strong>Tax Avoidance (LEGAL)</strong> — using the tax code to minimize liability (IRA contributions, legitimate deductions, municipal bonds).</li>
        <li><strong>Tax Evasion (ILLEGAL)</strong> — concealing income, falsifying returns, hiding assets.</li>
      </ul>
      <h3>Structuring (ILLEGAL)</h3>
      <p>Splitting cash transactions to avoid the $10,000 CTR threshold is a federal crime under the BSA. A banker must never assist and may need to file a SAR.</p>
      <div class="explanation"><b>Common Trap:</b> Not all tax minimization is illegal — lawful avoidance is built into the tax code.</div>
    `
  },
  {
    id: "tax-reporting",
    title: "Tax Information Reporting (1099s, W-9, Backup Withholding)",
    category: "Taxation in Banking",
    status: "complete",
    html: `
      <h2>Tax Information Reporting</h2>
      <table class="sg-table">
        <tr><th>Form</th><th>Reports</th><th>Threshold</th></tr>
        <tr><td>1099-INT</td><td>Interest income</td><td>$10+</td></tr>
        <tr><td>1099-DIV</td><td>Dividends/distributions</td><td>$10+</td></tr>
        <tr><td>1099-NEC</td><td>Nonemployee (contractor) compensation</td><td>$600+</td></tr>
        <tr><td>W-2</td><td>Employee wages</td><td>(employees)</td></tr>
        <tr><td>W-9</td><td>Request TIN from U.S. persons</td><td>—</td></tr>
        <tr><td>W-8BEN</td><td>Certify foreign status</td><td>—</td></tr>
      </table>
      <h3>Backup Withholding</h3>
      <p>If a payee fails to provide a correct TIN, the bank must withhold <b>24%</b> on reportable payments and remit it to the IRS.</p>
      <div class="explanation"><b>Common Traps:</b> Income under $10 is still TAXABLE (just no 1099-INT). W-9 = U.S. persons; W-8BEN = foreign persons.</div>
    `
  },
  {
    id: "tax-equivalent-yield",
    title: "Tax-Equivalent & After-Tax Yield",
    category: "Taxation in Banking",
    status: "complete",
    html: `
      <h2>Tax-Equivalent & After-Tax Yield</h2>
      <p class="formula">Tax-Equivalent Yield = Tax-Free Yield / (1 − Marginal Tax Rate)</p>
      <p class="formula">After-Tax Yield = Taxable Yield × (1 − Marginal Tax Rate)</p>
      <h3>Worked Examples (32% bracket)</h3>
      <ul>
        <li>4% muni → equivalent taxable yield = 0.04 / 0.68 = <b>5.88%</b></li>
        <li>5% taxable CD (24% bracket) → after-tax = 0.05 × 0.76 = <b>3.80%</b></li>
      </ul>
      <h3>Suitability</h3>
      <p>Tax-free municipal bonds benefit <b>high-bracket</b> investors most, because the tax savings rise with the tax rate.</p>
      <div class="explanation"><b>#1 Calculation Trap:</b> Tax-equivalent = DIVIDE by (1−rate). After-tax = MULTIPLY by (1−rate). Never divide by the tax rate itself.</div>
    `
  },
  {
    id: "tax-advantaged-accounts",
    title: "Tax-Advantaged Accounts (IRA, Roth, HSA, 529)",
    category: "Taxation in Banking",
    status: "complete",
    html: `
      <h2>Tax-Advantaged Accounts</h2>
      <table class="sg-table">
        <tr><th>Account</th><th>Contributions</th><th>Withdrawals</th></tr>
        <tr><td>Traditional IRA/401(k)</td><td>Pre-tax (deductible)</td><td>Taxed</td></tr>
        <tr><td>Roth IRA</td><td>After-tax</td><td>Tax-free (qualified)</td></tr>
        <tr><td>HSA</td><td>Pre-tax</td><td>Tax-free (qualified medical) — "triple advantage"</td></tr>
        <tr><td>529 Plan</td><td>After-tax</td><td>Tax-free (qualified education)</td></tr>
      </table>
      <h3>Roth vs. Traditional Decision Rule</h3>
      <p>Expect a <b>higher</b> tax bracket later → <b>Roth</b> (pay tax now at low rate). Expect a <b>lower</b> bracket later → <b>Traditional</b> (deduct now at high rate).</p>
      <h3>Tax Deferral Power</h3>
      <p>Deferring taxes keeps more dollars compounding each year, producing a larger balance than an equivalent taxable account. (Deferral ≠ tax-free.)</p>
    `
  },
  {
    id: "capital-gains",
    title: "Capital Gains, Wash Sales & Harvesting",
    category: "Taxation in Banking",
    status: "complete",
    html: `
      <h2>Capital Gains & Losses</h2>
      <h3>Holding Period</h3>
      <ul>
        <li><strong>Short-term</strong> (held ≤ 1 year): taxed at ordinary income rates.</li>
        <li><strong>Long-term</strong> (held > 1 year): taxed at favorable rates (0/15/20%).</li>
      </ul>
      <p class="formula">Capital Gain = Sale Price − Cost Basis</p>
      <h3>Tax-Loss Harvesting</h3>
      <p>Selling losers to offset gains reduces taxable income.</p>
      <h3>Wash Sale Rule</h3>
      <p>If you buy a <b>substantially identical</b> security within <b>30 days before or after</b> the sale, the loss deduction is <b>disallowed</b> and added to the new shares' basis.</p>
      <div class="explanation"><b>Common Trap:</b> The 30-day window applies on BOTH sides of the sale.</div>
    `
  },
  {
    id: "tax-deductions",
    title: "Deductibility & Itemizing",
    category: "Taxation in Banking",
    status: "complete",
    html: `
      <h2>Deductibility & Itemizing</h2>
      <p>Taxpayers choose the <strong>standard deduction</strong> OR <strong>itemize</strong> — whichever is larger.</p>
      <h3>Commonly Deductible (if itemizing)</h3>
      <ul>
        <li>Qualified <b>mortgage interest</b> (NOT principal)</li>
        <li>State & local taxes (capped)</li>
        <li>Charitable contributions</li>
      </ul>
      <h3>Generally NOT Deductible</h3>
      <ul>
        <li>Personal credit card interest</li>
        <li>Mortgage principal repayment</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> Mortgage interest only helps if total itemized deductions exceed the standard deduction.</div>
    `
  },
  {
    id: "estate-gift-tax",
    title: "Estate & Gift Tax Basics",
    category: "Taxation in Banking",
    status: "stub",
    html: `
      <h2>Estate & Gift Tax Basics</h2>
      <p><em>Section under development.</em> Key concepts to be expanded:</p>
      <ul>
        <li>Annual gift tax exclusion (per recipient, per year)</li>
        <li>Lifetime exemption</li>
        <li>Step-up in basis at death</li>
        <li>Gifts are generally NOT taxable income to the recipient</li>
        <li>Trusts as wealth-transfer tools</li>
      </ul>
      <div class="explanation"><b>Placeholder:</b> Detailed examples and figures to be added in a future expansion.</div>
    `
  },
  {
    id: "bank-taxation",
    title: "Bank Corporate Taxation",
    category: "Taxation in Banking",
    status: "stub",
    html: `
      <h2>Bank Corporate Taxation</h2>
      <p><em>Section under development.</em></p>
      <p class="formula">Effective Tax Rate = Income Tax Expense / Pre-Tax Income</p>
      <ul>
        <li>U.S. federal corporate statutory rate context (~21%)</li>
        <li>Deferred tax assets/liabilities</li>
        <li>Tax treatment of loan-loss provisions</li>
      </ul>
      <div class="explanation"><b>Placeholder:</b> Expand with worked examples and deferred-tax discussion.</div>
    `
  },
  {
    id: "foreign-tax-reporting",
    title: "Foreign Account Reporting (FBAR & FATCA)",
    category: "Taxation in Banking",
    status: "complete",
    html: `
      <h2>Foreign Account Reporting</h2>
      <table class="sg-table">
        <tr><th>Requirement</th><th>Trigger</th><th>Form</th></tr>
        <tr><td><b>FBAR</b></td><td>Foreign accounts aggregating > $10,000 anytime in the year</td><td>FinCEN Form 114</td></tr>
        <tr><td><b>FATCA</b></td><td>Specified foreign financial assets above thresholds</td><td>Form 8938</td></tr>
      </table>
      <div class="explanation"><b>Common Trap:</b> The FBAR $10,000 (foreign account) threshold is different from the CTR $10,000 (domestic cash transaction) threshold.</div>
    `
  },
  {
    id: "payments-tech",
    title: "Payment Systems (ACH, Wire, FedNow, RTP)",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Payment Systems</h2>
      <table class="sg-table">
        <tr><th>System</th><th>Speed</th><th>Cost</th><th>Use Case</th></tr>
        <tr><td>ACH</td><td>1–2 business days (batch)</td><td>Low</td><td>Payroll, recurring bills</td></tr>
        <tr><td>Wire (Fedwire)</td><td>Real-time (business hours)</td><td>High</td><td>Large, urgent transfers</td></tr>
        <tr><td>FedNow / RTP</td><td>Instant, 24/7/365</td><td>Low</td><td>Instant consumer/business payments</td></tr>
        <tr><td>Card networks</td><td>Authorization instant, settle later</td><td>Interchange fees</td><td>Purchases</td></tr>
      </table>
      <div class="explanation"><b>Common Trap:</b> Same-day ACH is faster but still <b>batches</b>. Only FedNow/RTP settle truly in real time, 24/7.</div>
    `
  },
  {
    id: "data-security",
    title: "Data Security: Encryption vs. Tokenization",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Data Security</h2>
      <h3>Encryption vs. Tokenization</h3>
      <table class="sg-table">
        <tr><th></th><th>Encryption</th><th>Tokenization</th></tr>
        <tr><td>Method</td><td>Scrambles data with a key</td><td>Replaces data with a random surrogate</td></tr>
        <tr><td>Reversible?</td><td>Yes (with key)</td><td>No mathematical relationship to original</td></tr>
        <tr><td>If stolen</td><td>Could be decrypted if key compromised</td><td>Token is useless outside the system</td></tr>
      </table>
      <h3>Other Controls</h3>
      <ul>
        <li><b>Firewalls</b> — control network traffic.</li>
        <li><b>Encryption at rest / in transit</b> — protects stored & moving data.</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> Tokenization ≠ encryption. Tokens have NO key-based relationship to the original value.</div>
    `
  },
  {
    id: "card-tech",
    title: "Card Technology (EMV, NFC, Contactless)",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Card Technology</h2>
      <ul>
        <li><strong>EMV chip</strong> — generates a unique, dynamic cryptogram per transaction, defeating counterfeit-card fraud (vs. static magnetic stripe data).</li>
        <li><strong>NFC / Contactless</strong> — tap-to-pay using near-field communication.</li>
        <li><strong>Tokenized mobile wallets</strong> — Apple Pay / Google Pay replace card numbers with tokens.</li>
      </ul>
      <div class="explanation"><b>Why chips reduce fraud:</b> Intercepted chip data can't be replayed because each transaction's cryptogram is one-time-use.</div>
    `
  },
  {
    id: "ai-banking",
    title: "AI & Machine Learning in Banking",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>AI & Machine Learning in Banking</h2>
      <h3>Applications</h3>
      <ul>
        <li><strong>Fraud detection</strong> — real-time anomaly detection (e.g., geographically impossible purchases).</li>
        <li><strong>Credit scoring</strong> — alternative-data underwriting.</li>
        <li><strong>Chatbots / virtual assistants</strong>.</li>
        <li><strong>Risk modeling & forecasting</strong>.</li>
      </ul>
      <h3>Compliance Risk: Algorithmic Bias</h3>
      <p>A model can create a <b>disparate impact</b> through proxy variables (like ZIP code) even without using protected characteristics directly — a fair-lending (ECOA) concern. Banks must test for bias and ensure <b>explainability</b>.</p>
      <div class="explanation"><b>Common Trap:</b> Real-time behavioral fraud scoring is an AI/ML function — not blockchain.</div>
    `
  },
  {
    id: "fintech-blockchain",
    title: "Blockchain, Smart Contracts & DLT",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Blockchain & Distributed Ledger Technology</h2>
      <ul>
        <li><strong>Blockchain</strong> — a distributed, tamper-resistant ledger replicated across many nodes; no central authority required.</li>
        <li><strong>Smart contracts</strong> — self-executing code that performs actions when conditions are met (e.g., release payment on delivery).</li>
        <li><strong>DLT in banking</strong> — settlement, trade finance, identity.</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> Blockchain ≠ Bitcoin. Bitcoin is one application; the underlying ledger concept is much broader.</div>
    `
  },
  {
    id: "digital-currency",
    title: "CBDCs & Stablecoins",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Digital Currency</h2>
      <table class="sg-table">
        <tr><th></th><th>CBDC</th><th>Stablecoin</th><th>Bitcoin</th></tr>
        <tr><td>Issuer</td><td>Central bank</td><td>Private company</td><td>Decentralized</td></tr>
        <tr><td>Backing</td><td>Sovereign (central-bank liability)</td><td>Reserves (peg)</td><td>None</td></tr>
        <tr><td>Centralized?</td><td>Yes</td><td>Usually</td><td>No</td></tr>
      </table>
      <h3>Stablecoin Risk</h3>
      <p>If reserves are inadequate, a confidence shock can cause a <b>run</b> and a broken peg ("de-pegging") — analogous to a bank run.</p>
      <div class="explanation"><b>Common Trap:</b> CBDCs are centralized & government-issued — the opposite of decentralized cryptocurrencies.</div>
    `
  },
  {
    id: "open-banking",
    title: "Open Banking, APIs & Banking-as-a-Service",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Open Banking & BaaS</h2>
      <ul>
        <li><strong>Open Banking</strong> — customers permission third parties to access their financial data via secure <b>APIs</b> (enables aggregation apps).</li>
        <li><strong>Banking-as-a-Service (BaaS)</strong> — non-banks embed regulated banking products; a chartered <b>sponsor bank</b> holds deposits and bears compliance responsibility.</li>
        <li><strong>Embedded finance</strong> — financial services built into non-financial platforms.</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> In BaaS, the retailer didn't "become a bank" — a chartered sponsor bank still holds deposits and owns the regulatory burden.</div>
    `
  },
  {
    id: "fintech-trends",
    title: "Fintech Trends & Disintermediation",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Fintech Trends</h2>
      <ul>
        <li><strong>Disintermediation</strong> — borrowers & lenders connect directly (e.g., P2P lending), bypassing the bank middleman.</li>
        <li><strong>Securitization</strong> (contrast) — bundling loans into tradable securities.</li>
        <li><strong>Neobanks</strong> — branchless digital banks with low overhead.</li>
        <li><strong>Embedded finance & BaaS</strong>.</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> Disintermediation (remove the middleman) ≠ securitization (package loans).</div>
    `
  },
  {
    id: "digital-banking-models",
    title: "Digital Banking Models (Neobanks)",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Digital Banking Models</h2>
      <p><strong>Neobanks</strong> operate without physical branches, lowering overhead and enabling higher savings rates and lower fees. Many partner with chartered banks for FDIC coverage.</p>
      <div class="explanation"><b>Common Trap:</b> Neobanks aren't exempt from regulation — their advantage is being branchless, not lawless. FDIC limits ($250k/category) still apply.</div>
    `
  },
  {
    id: "wealth-tech",
    title: "Robo-Advisors & WealthTech",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Robo-Advisors & WealthTech</h2>
      <p><strong>Robo-advisors</strong> use algorithms to build and rebalance diversified portfolios based on risk tolerance, offering low fees and low minimums — ideal for smaller investors.</p>
      <div class="explanation"><b>Common Trap:</b> Automated advice manages risk but does NOT guarantee returns.</div>
    `
  },
  {
    id: "authentication-tech",
    title: "Authentication & Identity (MFA, Biometrics)",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Authentication & Identity</h2>
      <h3>The Three Factor Categories</h3>
      <ul>
        <li><strong>Something you know</strong> — password, PIN.</li>
        <li><strong>Something you have</strong> — phone, token.</li>
        <li><strong>Something you are</strong> — fingerprint, face (biometric).</li>
      </ul>
      <p><strong>Multi-Factor Authentication (MFA)</strong> combines two or more <b>different</b> categories.</p>
      <div class="explanation"><b>Common Trap:</b> Two passwords ≠ MFA. True MFA requires factors from DIFFERENT categories.</div>
    `
  },
  {
    id: "cloud-banking",
    title: "Cloud Computing & Vendor Risk",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Cloud Computing in Banking</h2>
      <p>Cloud adoption improves scalability and cost but introduces <strong>third-party (vendor) risk</strong> and <strong>concentration risk</strong> — the bank now depends on the provider's resilience and security. Regulators expect strong vendor oversight and contingency planning.</p>
      <div class="explanation"><b>Common Trap:</b> Cloud isn't "just cheaper" — it shifts dependency to a critical outside vendor.</div>
    `
  },
  {
    id: "regtech",
    title: "RegTech (Regulatory Technology)",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>RegTech</h2>
      <p><strong>RegTech</strong> uses technology (often AI/automation) to streamline compliance: transaction monitoring, sanctions screening, KYC, and reporting — reducing cost and error.</p>
      <div class="explanation"><b>Don't confuse:</b> RegTech (compliance) vs. InsurTech (insurance), PropTech (real estate), AdTech (advertising).</div>
    `
  },
  {
    id: "card-tech-mobile",
    title: "Mobile & Remote Deposit (Check 21)",
    category: "Banking Technology & Fintech",
    status: "complete",
    html: `
      <h2>Mobile & Remote Deposit Capture</h2>
      <p>The <strong>Check Clearing for the 21st Century Act (Check 21, 2004)</strong> allows banks to create <b>substitute checks</b> from electronic images with the same legal standing as paper — the legal foundation for mobile/remote deposit.</p>
      <div class="explanation"><b>Common Trap:</b> Mobile deposit is enabled by Check 21 specifically, not generic "fintech."</div>
    `
  },
  {
    id: "risk-types",
    title: "Types of Banking Risk & ALM",
    category: "Risk Management",
    status: "complete",
    html: `
      <h2>Types of Banking Risk</h2>
      <table class="sg-table">
        <tr><th>Risk</th><th>Definition</th></tr>
        <tr><td><b>Credit Risk</b></td><td>Borrowers default.</td></tr>
        <tr><td><b>Liquidity Risk</b></td><td>Can't meet cash demands (e.g., maturity mismatch).</td></tr>
        <tr><td><b>Interest Rate / Market Risk</b></td><td>Rate moves change asset/liability values (bonds fall when rates rise).</td></tr>
        <tr><td><b>Operational Risk</b></td><td>Internal failures, fraud, system errors.</td></tr>
        <tr><td><b>Reputational Risk</b></td><td>Loss of public trust.</td></tr>
        <tr><td><b>Compliance Risk</b></td><td>Violating laws/regulations.</td></tr>
      </table>
      <h3>Asset-Liability Management (ALM)</h3>
      <p class="formula">Repricing Gap = Rate-Sensitive Assets − Rate-Sensitive Liabilities</p>
      <p>A <b>liability-sensitive (negative gap)</b> bank sees its NIM <b>compress</b> when rates rise (funding reprices faster than assets). This caused real stress in 2023 (long bonds funded by short deposits).</p>
      <div class="explanation"><b>Common Trap:</b> A bank crisis isn't always "credit risk" — maturity mismatches are <b>liquidity/interest-rate</b> risk.</div>
    `
  },
  {
    id: "bank-capital",
    title: "Bank Capital & Solvency",
    category: "Risk Management",
    status: "complete",
    html: `
      <h2>Bank Capital & Solvency</h2>
      <p>Capital is the cushion that absorbs losses. If losses exceed capital, the bank becomes <b>insolvent</b> (negative equity).</p>
      <p class="formula">Bank Capital (Equity) = Total Assets − Total Liabilities</p>
      <h3>Example</h3>
      <p>Assets $100M, liabilities $92M, capital $8M. A $10M loss exceeds the $8M cushion → insolvency.</p>
      <div class="explanation"><b>Common Trap:</b> The Fed provides <b>liquidity</b>; deposit insurance protects <b>depositors</b>. Neither absorbs a bank's <b>credit losses</b> to keep it solvent.</div>
    `
  },
  {
    id: "intl-basel",
    title: "Basel Accords & Capital Adequacy",
    category: "International Banking",
    status: "complete",
    html: `
      <h2>Basel Accords</h2>
      <p>The <strong>Basel Committee</strong> sets international standards for bank <b>capital adequacy</b> and risk management (Basel I, II, III).</p>
      <p class="formula">Capital Adequacy Ratio = (Tier 1 + Tier 2 Capital) / Risk-Weighted Assets</p>
      <ul>
        <li><strong>Tier 1</strong> — core capital (common equity, retained earnings).</li>
        <li><strong>Tier 2</strong> — supplementary capital.</li>
        <li><strong>Risk-Weighted Assets (RWA)</strong> — assets weighted by riskiness.</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> Basel governs <b>capital adequacy</b>, not exchange rates or deposit insurance.</div>
    `
  },
  {
    id: "intl-payments",
    title: "International Payments (SWIFT)",
    category: "International Banking",
    status: "complete",
    html: `
      <h2>International Payments</h2>
      <p><strong>SWIFT</strong> is the global messaging network banks use to securely transmit cross-border payment <b>instructions</b>. Crucially, SWIFT moves <b>messages, not money</b> — settlement happens through correspondent banking relationships.</p>
      <div class="explanation"><b>Common Trap:</b> SWIFT transmits secure instructions; it does not itself move funds.</div>
    `
  },
  {
    id: "intl-forex",
    title: "Foreign Exchange (Forex)",
    category: "International Banking",
    status: "complete",
    html: `
      <h2>Foreign Exchange</h2>
      <p class="formula">Cost in USD = Foreign Amount × Exchange Rate (USD per unit)</p>
      <h3>Currency Strength & Trade</h3>
      <ul>
        <li>A <b>stronger foreign currency</b> → that country's goods cost <b>more</b> for U.S. importers.</li>
        <li>A <b>stronger dollar</b> → imports cheaper, U.S. exports more expensive abroad.</li>
      </ul>
      <h3>Example</h3>
      <p>€50,000 at $1.10 = $55,000. If euro strengthens to $1.20 → $60,000 (more expensive).</p>
      <div class="explanation"><b>Common Trap:</b> Watch the DIRECTION — a stronger foreign currency raises the importer's cost.</div>
    `
  },
  {
    id: "bank-ratios",
    title: "Bank Profitability & Efficiency Ratios",
    category: "Financial Statements & Ratios",
    status: "complete",
    html: `
      <h2>Bank Profitability & Efficiency Ratios</h2>
      <table class="sg-table">
        <tr><th>Ratio</th><th>Formula</th><th>Benchmark</th></tr>
        <tr><td>ROA</td><td>Net Income / Total Assets</td><td>~1% is strong</td></tr>
        <tr><td>ROE</td><td>Net Income / Equity</td><td>~10%+ typical</td></tr>
        <tr><td>NIM</td><td>(Interest Income − Interest Expense) / Earning Assets</td><td>~3–4% common</td></tr>
        <tr><td>Efficiency Ratio</td><td>Noninterest Expense / Revenue</td><td><b>Lower is better</b> (~50% or below)</td></tr>
      </table>
      <div class="explanation"><b>Common Traps:</b> (1) Decimal placement (millions vs. billions). (2) NIM — subtract interest expense first. (3) Efficiency ratio — LOWER is better, unlike profitability ratios.</div>
    `
  },
  {
    id: "liquidity-ratios",
    title: "Liquidity Ratios",
    category: "Financial Statements & Ratios",
    status: "complete",
    html: `
      <h2>Liquidity Ratios</h2>
      <p class="formula">Current Ratio = Current Assets / Current Liabilities</p>
      <p class="formula">Quick Ratio = (Current Assets − Inventory) / Current Liabilities</p>
      <p class="formula">Working Capital = Current Assets − Current Liabilities</p>
      <h3>Interpretation</h3>
      <p>A current ratio of 2.0 means current assets are double current liabilities — healthy short-term liquidity.</p>
      <div class="explanation"><b>Common Trap:</b> Don't invert the formula (liabilities/assets). Assets go on top.</div>
    `
  },
  {
    id: "bond-valuation",
    title: "Bond Valuation & the Yield Curve",
    category: "Financial Statements & Ratios",
    status: "complete",
    html: `
      <h2>Bond Valuation & the Yield Curve</h2>
      <h3>Price–Yield Inverse Relationship</h3>
      <p>Bond prices move <b>inversely</b> to interest rates.</p>
      <p class="formula">Coupon < Market Rate → Discount &nbsp;|&nbsp; Coupon > Market Rate → Premium &nbsp;|&nbsp; Coupon = Market Rate → Par</p>
      <p><b>Example:</b> A 4% coupon bond when market rates rise to 6% trades at a <b>discount</b>.</p>
      <h3>The Yield Curve</h3>
      <ul>
        <li><strong>Normal (upward)</strong> — long-term yields > short-term; signals expected growth.</li>
        <li><strong>Inverted</strong> — short-term yields > long-term; a historically reliable <b>recession warning</b> (investors expect future rate cuts).</li>
      </ul>
      <div class="explanation"><b>Common Trap:</b> An inverted curve is bearish, not bullish.</div>
    `
  },
  {
    id: "yield-curve",
    title: "The Yield Curve & Recession Signals",
    category: "Federal Reserve & Monetary Policy",
    status: "complete",
    html: `
      <h2>The Yield Curve as an Economic Signal</h2>
      <p>The yield curve plots Treasury yields across maturities (the <em>term structure</em> of interest rates).</p>
      <ul>
        <li><strong>Normal</strong> — slopes up; investors demand more for longer maturities.</li>
        <li><strong>Flat</strong> — uncertainty/transition.</li>
        <li><strong>Inverted</strong> — short rates exceed long rates; investors expect future rate cuts and slower growth. One of the most-watched <b>recession indicators</b>.</li>
      </ul>
      <div class="explanation"><b>Finalist Tip:</b> Inversion reflects market <em>expectations</em>, not a failure of the Fed. It signals risk over months, not guaranteed events.</div>
    `
  }
];

/* ============================================================
   HELPERS
   ============================================================ */

/* Return a study-guide section by its id (used for cross-linking
   from questions via question.studyGuideReference). */
function getStudyGuideSection(id) {
  return STUDY_GUIDE.find(function (s) { return s.id === id; }) || null;
}

/* Group sections by category for sidebar rendering. */
function getStudyGuideByCategory() {
  const grouped = {};
  STUDY_GUIDE.forEach(function (s) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });
  return grouped;
}

/* Expose globally for non-module offline use */
if (typeof window !== "undefined") {
  window.STUDY_GUIDE = STUDY_GUIDE;
  window.getStudyGuideSection = getStudyGuideSection;
  window.getStudyGuideByCategory = getStudyGuideByCategory;
}