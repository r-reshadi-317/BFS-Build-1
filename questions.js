/* ============================================================
   FBLA BANKING & FINANCIAL SYSTEMS — MASTER QUESTION BANK
   ------------------------------------------------------------
   RULES FOR FUTURE EXPANSION:
   1. NEVER renumber or delete existing IDs.
   2. Append new objects with the next sequential id.
   3. Every question MUST follow the schema below.
   4. Minimum 5 tags (prefer 6–10), overlapping across topics.
   ============================================================ */

const QUESTIONS = [
    {
        id: 1,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Open Market Operations",
        tags: ["Federal Reserve", "Monetary Policy", "Open Market Operations", "Interest Rates", "Money Supply", "Scenario", "Economics", "FOMC"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["Expansionary policy", "Bond purchases", "Money supply expansion"],
        questionType: "scenario",
        scenario: "The economy is slowing, unemployment is rising, and inflation is below the Fed's 2% target.",
        question: "Which open market operation would the FOMC most likely direct to stimulate the economy?",
        choices: [
            "Sell government securities to banks",
            "Buy government securities from banks",
            "Raise the discount rate sharply",
            "Increase reserve requirements"
        ],
        answer: 1,
        explanation: "Buying securities injects reserves into banks, increases the money supply, and lowers interest rates — an expansionary move appropriate when inflation is low and growth is weak.",
        whyEachWrong: {
            "0": "Selling securities drains reserves (contractionary).",
            "2": "Raising the discount rate is contractionary.",
            "3": "Higher reserve requirements reduce lending capacity (contractionary)."
        },
        commonTrap: "Reversing the direction of OMO — buying = expansionary, selling = contractionary.",
        studyGuideReference: "fed-monetary",
        relatedQuestions: [2, 3],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 2,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Policy Tools",
        tags: ["Federal Reserve", "Monetary Policy", "Discount Rate", "Federal Funds Rate", "Interest Rates", "Economics", "Banking Regulations"],
        difficulty: "Easy",
        estimatedNationalFrequency: "High",
        concepts: ["Discount rate", "Federal funds rate", "Lender of last resort"],
        questionType: "conceptual",
        scenario: "",
        question: "The interest rate the Federal Reserve charges commercial banks for short-term loans directly from the Fed is called the:",
        choices: ["Federal funds rate", "Prime rate", "Discount rate", "LIBOR"],
        answer: 2,
        explanation: "The discount rate is what the Fed charges banks borrowing at the discount window (the Fed acting as lender of last resort). The federal funds rate is the rate banks charge EACH OTHER.",
        whyEachWrong: {
            "0": "The fed funds rate is interbank, not Fed-to-bank.",
            "1": "The prime rate is what banks charge their best customers.",
            "3": "LIBOR was an interbank benchmark, now largely replaced by SOFR."
        },
        commonTrap: "Confusing the discount rate (Fed→bank) with the federal funds rate (bank→bank).",
        studyGuideReference: "fed-monetary",
        relatedQuestions: [1, 3],
        formulaUsed: null,
        timeEstimate: 40,
        sourceConfidence: "High"
    },
    {
        id: 3,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Federal Reserve Structure",
        tags: ["Federal Reserve", "FOMC", "Monetary Policy", "Banking Regulations", "Central Banking", "Economics", "Government"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Fed structure", "FOMC voting members", "12 districts"],
        questionType: "conceptual",
        scenario: "",
        question: "How many regional Federal Reserve Banks make up the Federal Reserve System?",
        choices: ["7", "12", "50", "9"],
        answer: 1,
        explanation: "There are 12 regional Federal Reserve Banks. The Board of Governors has 7 members; the FOMC has 12 voting members (7 governors + NY Fed president + 4 rotating regional presidents).",
        whyEachWrong: {
            "0": "7 is the number of Board of Governors members.",
            "2": "50 confuses states with Fed districts.",
            "3": "9 is the number of directors on each regional bank's board."
        },
        commonTrap: "Mixing the '7 governors' with the '12 districts' and '12 FOMC voters.'",
        studyGuideReference: "fed-structure",
        relatedQuestions: [1, 2],
        formulaUsed: null,
        timeEstimate: 35,
        sourceConfidence: "High"
    },
    {
        id: 4,
        category: "Banking Regulations & Compliance",
        subcategory: "Deposit Insurance",
        tags: ["FDIC", "Deposit Insurance", "Consumer Banking", "Banking Regulations", "Risk Management", "Scenario", "Account Types"],
        difficulty: "Hard",
        estimatedNationalFrequency: "High",
        concepts: ["FDIC coverage limits", "Ownership categories", "$250,000 limit"],
        questionType: "scenario",
        scenario: "Maria has $200,000 in a single (individual) checking account and $150,000 in a joint account with her spouse (her share is $75,000) at the same FDIC-insured bank.",
        question: "How much of Maria's deposits are FDIC insured?",
        choices: [
            "$250,000 total",
            "$200,000 from the single account + $75,000 from the joint account = $275,000",
            "$350,000 total",
            "Only $250,000 because it is one bank"
        ],
        answer: 1,
        explanation: "FDIC insures up to $250,000 PER depositor, PER bank, PER ownership category. Single and joint accounts are SEPARATE categories. Her $200k single is fully covered; her $75k share of the joint account is fully covered, totaling $275,000.",
        whyEachWrong: {
            "0": "Ignores that separate ownership categories each get coverage.",
            "2": "$350k overstates — her joint share is $75k, not $150k.",
            "3": "Coverage is per category, not capped at $250k per bank."
        },
        commonTrap: "Assuming a flat $250,000 per bank regardless of ownership category.",
        studyGuideReference: "fdic-coverage",
        relatedQuestions: [5, 30],
        formulaUsed: null,
        timeEstimate: 90,
        sourceConfidence: "High"
    },
    {
        id: 5,
        category: "Banking Regulations & Compliance",
        subcategory: "Deposit Insurance",
        tags: ["FDIC", "Deposit Insurance", "Banking History", "Banking Regulations", "Consumer Banking", "Risk Management"],
        difficulty: "Easy",
        estimatedNationalFrequency: "Medium",
        concepts: ["FDIC creation", "Great Depression", "Glass-Steagall"],
        questionType: "conceptual",
        scenario: "",
        question: "The FDIC was created by which 1933 law in response to bank failures during the Great Depression?",
        choices: ["Dodd-Frank Act", "Glass-Steagall Act (Banking Act of 1933)", "Gramm-Leach-Bliley Act", "Federal Reserve Act"],
        answer: 1,
        explanation: "The Glass-Steagall Act (Banking Act of 1933) created the FDIC and separated commercial from investment banking.",
        whyEachWrong: {
            "0": "Dodd-Frank is 2010, post-financial crisis.",
            "2": "Gramm-Leach-Bliley (1999) REPEALED Glass-Steagall's separation.",
            "3": "The Federal Reserve Act (1913) created the Fed, not the FDIC."
        },
        commonTrap: "Confusing the law that created the FDIC with the one that repealed bank separation.",
        studyGuideReference: "banking-history",
        relatedQuestions: [4, 6],
        formulaUsed: null,
        timeEstimate: 40,
        sourceConfidence: "High"
    },
    {
        id: 6,
        category: "Banking Regulations & Compliance",
        subcategory: "AML / BSA",
        tags: ["BSA", "AML", "KYC", "Banking Regulations", "Compliance", "Risk Management", "Scenario", "Fraud"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["Currency Transaction Report", "$10,000 threshold", "Bank Secrecy Act"],
        questionType: "scenario",
        scenario: "A customer deposits $12,500 in cash into a business account.",
        question: "Under the Bank Secrecy Act, what must the bank file?",
        choices: [
            "A Suspicious Activity Report (SAR)",
            "A Currency Transaction Report (CTR)",
            "Nothing — it's below the limit",
            "A 1099-INT form"
        ],
        answer: 1,
        explanation: "Cash transactions over $10,000 require a Currency Transaction Report (CTR). A SAR is filed only when activity appears suspicious regardless of amount.",
        whyEachWrong: {
            "0": "A SAR is for suspicious behavior; a routine $12,500 deposit triggers a CTR.",
            "2": "$12,500 exceeds the $10,000 CTR threshold.",
            "3": "A 1099-INT reports interest income, unrelated to BSA cash reporting."
        },
        commonTrap: "Confusing CTR (dollar-threshold trigger) with SAR (suspicion trigger).",
        studyGuideReference: "aml-bsa",
        relatedQuestions: [7, 40],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 7,
        category: "Banking Regulations & Compliance",
        subcategory: "Consumer Protection Regs",
        tags: ["Regulation Z", "TILA", "Regulation E", "Consumer Banking", "Banking Regulations", "Lending", "Scenario"],
        difficulty: "Hard",
        estimatedNationalFrequency: "High",
        concepts: ["Reg E electronic transfers", "Reg Z credit disclosures", "Consumer liability"],
        questionType: "scenario",
        scenario: "A customer's debit card is stolen and used fraudulently. She reports it to the bank 1 day after discovering the theft.",
        question: "Which regulation governs her liability, and what is her maximum liability?",
        choices: [
            "Regulation Z; $0",
            "Regulation E; up to $50 if reported within 2 business days",
            "Regulation E; unlimited liability",
            "Regulation DD; $500"
        ],
        answer: 1,
        explanation: "Regulation E (Electronic Fund Transfer Act) covers debit cards. Reporting within 2 business days caps liability at $50.",
        whyEachWrong: {
            "0": "Reg Z covers CREDIT cards, not debit/electronic transfers.",
            "2": "Unlimited liability applies only if unreported beyond 60 days after statement.",
            "3": "Reg DD governs deposit disclosures (Truth in Savings), not fraud liability."
        },
        commonTrap: "Applying Reg Z (credit) to a debit card situation governed by Reg E.",
        studyGuideReference: "consumer-regs",
        relatedQuestions: [6, 8],
        formulaUsed: null,
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 8,
        category: "Lending & Credit",
        subcategory: "Credit Analysis",
        tags: ["Lending", "Credit Analysis", "5 Cs of Credit", "Risk Management", "Commercial Banking", "Scenario", "Underwriting"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["5 C's of Credit", "Capacity", "Collateral", "Character", "Capital", "Conditions"],
        questionType: "scenario",
        scenario: "A loan officer evaluates an applicant's debt-to-income ratio and cash flow to decide if they can repay the loan.",
        question: "Which of the '5 C's of Credit' is the officer primarily assessing?",
        choices: ["Character", "Capacity", "Collateral", "Conditions"],
        answer: 1,
        explanation: "Capacity refers to the borrower's ABILITY to repay, measured through income, cash flow, and debt-to-income ratio.",
        whyEachWrong: {
            "0": "Character is the borrower's credit history and reliability.",
            "2": "Collateral is the asset securing the loan.",
            "3": "Conditions are external factors (economy, loan purpose)."
        },
        commonTrap: "Confusing Capacity (ability to pay) with Capital (borrower's own funds invested).",
        studyGuideReference: "credit-analysis",
        relatedQuestions: [9, 10],
        formulaUsed: "Debt-to-Income = Total Monthly Debt / Gross Monthly Income",
        timeEstimate: 50,
        sourceConfidence: "High"
    },
    {
        id: 9,
        category: "Financial Statements & Ratios",
        subcategory: "Interest Calculations",
        tags: ["Interest Rates", "APR", "APY", "Compound Interest", "Consumer Banking", "Math", "Scenario", "Formula"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["APR vs APY", "Compounding effect"],
        questionType: "scenario",
        scenario: "A savings account advertises a 6% nominal annual rate compounded monthly.",
        question: "Which statement best describes the relationship between APR and APY here?",
        choices: [
            "APY is lower than the 6% APR",
            "APY equals 6% exactly",
            "APY is higher than 6% because of monthly compounding",
            "APR and APY are always identical"
        ],
        answer: 2,
        explanation: "APY accounts for compounding. With monthly compounding, APY = (1 + .06/12)^12 − 1 ≈ 6.17%, higher than the 6% nominal APR.",
        whyEachWrong: {
            "0": "Compounding raises, not lowers, the effective yield.",
            "1": "Only true with annual compounding.",
            "3": "They're equal only when compounding occurs once per year."
        },
        commonTrap: "Assuming APR = APY; compounding frequency makes APY exceed APR.",
        studyGuideReference: "interest-math",
        relatedQuestions: [10, 11],
        formulaUsed: "APY = (1 + r/n)^n − 1",
        timeEstimate: 70,
        sourceConfidence: "High"
    },
    {
        id: 10,
        category: "Financial Statements & Ratios",
        subcategory: "Bank Profitability",
        tags: ["Financial Ratios", "ROA", "Profitability", "Commercial Banking", "Risk Management", "Formula", "Math"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Return on Assets", "Net income", "Total assets"],
        questionType: "scenario",
        scenario: "A bank earns $20 million in net income on $1 billion in total assets.",
        question: "What is the bank's Return on Assets (ROA)?",
        choices: ["0.2%", "2.0%", "20%", "5.0%"],
        answer: 1,
        explanation: "ROA = Net Income / Total Assets = $20M / $1,000M = 0.02 = 2.0%. (A strong bank ROA is typically ~1%, so 2% is high.)",
        whyEachWrong: {
            "0": "0.2% misplaces the decimal (off by 10x).",
            "2": "20% is off by 10x in the other direction.",
            "3": "5.0% is an arithmetic error."
        },
        commonTrap: "Decimal placement errors when assets are in millions vs. billions.",
        studyGuideReference: "bank-ratios",
        relatedQuestions: [11, 12],
        formulaUsed: "ROA = Net Income / Total Assets",
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 11,
        category: "Financial Statements & Ratios",
        subcategory: "Bank Profitability",
        tags: ["Financial Ratios", "Net Interest Margin", "NIM", "Commercial Banking", "Profitability", "Formula", "Interest Rates"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Net Interest Margin", "Earning assets", "Spread"],
        questionType: "scenario",
        scenario: "A bank earns $50M in interest income, pays $20M in interest expense, and holds $600M in earning assets.",
        question: "What is the bank's Net Interest Margin (NIM)?",
        choices: ["3.33%", "5.0%", "8.33%", "11.67%"],
        answer: 1,
        explanation: "NIM = (Interest Income − Interest Expense) / Earning Assets = ($50M − $20M) / $600M = $30M / $600M = 5.0%.",
        whyEachWrong: {
            "0": "3.33% wrongly uses only $20M in numerator.",
            "2": "8.33% wrongly uses $50M without subtracting expense.",
            "3": "11.67% adds instead of using net."
        },
        commonTrap: "Forgetting to subtract interest expense before dividing.",
        studyGuideReference: "bank-ratios",
        relatedQuestions: [10, 12],
        formulaUsed: "NIM = (Interest Income − Interest Expense) / Earning Assets",
        timeEstimate: 75,
        sourceConfidence: "High"
    },
    {
        id: 12,
        category: "Risk Management",
        subcategory: "Types of Risk",
        tags: ["Risk Management", "Liquidity Risk", "Credit Risk", "Market Risk", "Operational Risk", "Commercial Banking", "Scenario"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["Liquidity risk", "Asset-liability mismatch"],
        questionType: "scenario",
        scenario: "A bank funded many 30-year fixed mortgages using short-term deposits that customers can withdraw at any time. Depositors suddenly demand large withdrawals.",
        question: "What type of risk is the bank MOST exposed to?",
        choices: ["Credit risk", "Liquidity risk", "Reputational risk", "Compliance risk"],
        answer: 1,
        explanation: "The bank's assets (long-term mortgages) are illiquid while its liabilities (deposits) are demandable. Inability to meet withdrawals is liquidity risk — a classic maturity mismatch.",
        whyEachWrong: {
            "0": "Credit risk is borrower default, not the funding problem here.",
            "2": "Reputational risk is secondary, not the core exposure.",
            "3": "Compliance risk relates to regulatory violations."
        },
        commonTrap: "Labeling any bank crisis 'credit risk' — here it's a maturity/liquidity mismatch.",
        studyGuideReference: "risk-types",
        relatedQuestions: [13, 14],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 13,
        category: "Risk Management",
        subcategory: "Types of Risk",
        tags: ["Risk Management", "Interest Rate Risk", "Market Risk", "Banking Technology", "Commercial Banking", "Scenario", "Bonds"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Interest rate risk", "Bond price inverse relationship"],
        questionType: "scenario",
        scenario: "A bank holds a large portfolio of long-term fixed-rate bonds. Market interest rates rise sharply.",
        question: "What happens to the value of the bank's bond portfolio, and what risk does this illustrate?",
        choices: [
            "Value rises; credit risk",
            "Value falls; interest rate risk",
            "Value unchanged; liquidity risk",
            "Value falls; operational risk"
        ],
        answer: 1,
        explanation: "Bond prices move INVERSELY to interest rates. Rising rates reduce the market value of fixed-rate bonds — interest rate (market) risk. This contributed to bank stress in 2023.",
        whyEachWrong: {
            "0": "Rising rates lower, not raise, bond values; not credit risk.",
            "2": "Values do change, and this isn't liquidity risk.",
            "3": "Operational risk relates to internal failures, not rate moves."
        },
        commonTrap: "Forgetting the inverse relationship between rates and bond prices.",
        studyGuideReference: "risk-types",
        relatedQuestions: [12, 14],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "High"
    },
    {
        id: 14,
        category: "Banking Technology & Fintech",
        subcategory: "Payments & Digital Banking",
        tags: ["Banking Technology", "Fintech", "Payments", "ACH", "Digital Banking", "Scenario", "Consumer Banking"],
        difficulty: "Easy",
        estimatedNationalFrequency: "Medium",
        concepts: ["ACH network", "Direct deposit", "Electronic payments"],
        questionType: "scenario",
        scenario: "An employer pays employees electronically by batching transactions that settle in 1–2 business days at low cost.",
        question: "Which payment system is being used?",
        choices: ["Wire transfer (Fedwire)", "ACH (Automated Clearing House)", "Credit card network", "Cashier's check"],
        answer: 1,
        explanation: "ACH processes batched electronic transfers (payroll, direct deposit) cheaply with settlement in 1–2 days. Wires are real-time but costly.",
        whyEachWrong: {
            "0": "Fedwire is real-time and expensive — used for large urgent transfers.",
            "2": "Card networks handle purchases, not payroll batches.",
            "3": "Cashier's checks are paper instruments."
        },
        commonTrap: "Confusing ACH (batch, slow, cheap) with wire transfers (instant, costly).",
        studyGuideReference: "payments-tech",
        relatedQuestions: [15, 16],
        formulaUsed: null,
        timeEstimate: 45,
        sourceConfidence: "High"
    },
    {
        id: 15,
        category: "Banking Technology & Fintech",
        subcategory: "Blockchain & Innovation",
        tags: ["Banking Technology", "Fintech", "Blockchain", "Cryptocurrency", "Cybersecurity", "Innovation", "Conceptual"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Blockchain", "Distributed ledger", "Decentralization"],
        questionType: "conceptual",
        scenario: "",
        question: "Which feature most distinguishes a blockchain from a traditional bank ledger?",
        choices: [
            "It is stored on a single secure server",
            "It is a distributed, tamper-resistant ledger shared across many nodes",
            "It can only record currency transactions",
            "It is controlled by the Federal Reserve"
        ],
        answer: 1,
        explanation: "A blockchain is a decentralized, distributed ledger replicated across nodes, making records tamper-resistant without a central authority.",
        whyEachWrong: {
            "0": "Single-server storage is centralized — the opposite of blockchain.",
            "2": "Blockchains record many data types, not just currency.",
            "3": "Public blockchains are not Fed-controlled."
        },
        commonTrap: "Equating blockchain solely with Bitcoin rather than the broader ledger concept.",
        studyGuideReference: "fintech-blockchain",
        relatedQuestions: [14, 16],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "Medium"
    },
    {
        id: 16,
        category: "International Banking",
        subcategory: "Capital Requirements",
        tags: ["International Banking", "Basel Accords", "Capital Requirements", "Risk Management", "Banking Regulations", "Conceptual"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Basel III", "Capital adequacy", "Tier 1 capital"],
        questionType: "conceptual",
        scenario: "",
        question: "The Basel Accords primarily establish international standards for:",
        choices: [
            "Foreign exchange rates",
            "Bank capital adequacy and risk management",
            "Consumer deposit insurance",
            "Credit card interest rates"
        ],
        answer: 1,
        explanation: "The Basel Accords (Basel I/II/III), set by the Basel Committee, establish minimum capital requirements and risk standards so banks hold enough capital against their risk-weighted assets.",
        whyEachWrong: {
            "0": "Exchange rates are set by markets/central banks, not Basel.",
            "2": "Deposit insurance is national (e.g., FDIC), not Basel.",
            "3": "Card rates are not set by Basel."
        },
        commonTrap: "Thinking Basel governs exchange rates rather than capital adequacy.",
        studyGuideReference: "intl-basel",
        relatedQuestions: [12, 17],
        formulaUsed: "Capital Adequacy Ratio = (Tier 1 + Tier 2 Capital) / Risk-Weighted Assets",
        timeEstimate: 65,
        sourceConfidence: "High"
    },
    {
        id: 17,
        category: "International Banking",
        subcategory: "Payments & Forex",
        tags: ["International Banking", "SWIFT", "Foreign Exchange", "Payments", "Banking Technology", "Scenario", "Commercial Banking"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Low",
        concepts: ["SWIFT messaging", "Cross-border payments"],
        questionType: "scenario",
        scenario: "A U.S. company needs to send payment instructions for an international wire to a bank in Germany.",
        question: "Which network is most likely used to transmit the secure messaging instructions?",
        choices: ["ACH", "SWIFT", "Venmo", "Fedwire only"],
        answer: 1,
        explanation: "SWIFT is the global messaging network banks use to securely transmit cross-border payment instructions. It carries instructions, not the funds themselves.",
        whyEachWrong: {
            "0": "ACH is domestic batch processing.",
            "2": "Venmo is a domestic consumer P2P app.",
            "3": "Fedwire is domestic U.S. settlement."
        },
        commonTrap: "Thinking SWIFT moves money — it moves the secure messages/instructions.",
        studyGuideReference: "intl-payments",
        relatedQuestions: [14, 16],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "Medium"
    },
    {
        id: 18,
        category: "Consumer Banking & Deposit Products",
        subcategory: "Account Types",
        tags: ["Consumer Banking", "Account Types", "Deposit Products", "Interest Rates", "Liquidity", "Scenario", "Savings"],
        difficulty: "Easy",
        estimatedNationalFrequency: "Medium",
        concepts: ["Certificate of Deposit", "Time deposit", "Early withdrawal penalty"],
        questionType: "scenario",
        scenario: "A customer wants a higher interest rate and is willing to lock up $5,000 for 18 months, accepting a penalty for early withdrawal.",
        question: "Which product best fits the customer's needs?",
        choices: ["Checking account", "Certificate of Deposit (CD)", "Money market demand account", "Savings account"],
        answer: 1,
        explanation: "A CD is a time deposit offering higher rates in exchange for locking funds for a set term, with penalties for early withdrawal.",
        whyEachWrong: {
            "0": "Checking is for transactions with little/no interest.",
            "2": "Money market accounts offer liquidity, usually lower yield than CDs.",
            "3": "Savings accounts are liquid with lower rates."
        },
        commonTrap: "Confusing CDs (locked term) with money market accounts (liquid).",
        studyGuideReference: "deposit-products",
        relatedQuestions: [4, 19],
        formulaUsed: null,
        timeEstimate: 45,
        sourceConfidence: "High"
    },
    {
        id: 19,
        category: "Consumer Banking & Deposit Products",
        subcategory: "Credit Scoring",
        tags: ["Consumer Banking", "Credit Score", "FICO", "Lending", "Credit Analysis", "Scenario", "Financial Literacy"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["FICO factors", "Payment history", "Credit utilization"],
        questionType: "scenario",
        scenario: "A consumer wants to raise their FICO score quickly and asks which factor has the LARGEST impact.",
        question: "Which factor carries the greatest weight in a FICO score?",
        choices: ["Length of credit history", "Payment history", "New credit inquiries", "Credit mix"],
        answer: 1,
        explanation: "Payment history is the single largest FICO factor (~35%), followed by amounts owed/utilization (~30%).",
        whyEachWrong: {
            "0": "Length of history is ~15%.",
            "2": "New credit is ~10%.",
            "3": "Credit mix is ~10%."
        },
        commonTrap: "Choosing credit utilization (2nd at 30%) over payment history (1st at 35%).",
        studyGuideReference: "credit-scoring",
        relatedQuestions: [8, 18],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 20,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Fiscal vs Monetary",
        tags: ["Monetary Policy", "Fiscal Policy", "Federal Reserve", "Government", "Economics", "Conceptual", "Treasury"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["Monetary vs fiscal policy", "Who controls what"],
        questionType: "conceptual",
        scenario: "",
        question: "Which of the following is an example of FISCAL policy (not monetary policy)?",
        choices: [
            "The Fed lowers the federal funds rate target",
            "Congress passes a tax cut and increases government spending",
            "The Fed buys Treasury securities",
            "The Fed lowers reserve requirements"
        ],
        answer: 1,
        explanation: "Fiscal policy is controlled by CONGRESS and the President through taxing and spending. Monetary policy is the Fed's domain (rates, OMO, reserves).",
        whyEachWrong: {
            "0": "Setting rate targets is monetary policy (Fed).",
            "2": "Buying securities is monetary policy (Fed).",
            "3": "Reserve requirements are monetary policy (Fed)."
        },
        commonTrap: "Confusing fiscal (Congress: tax/spend) with monetary (Fed: money supply/rates).",
        studyGuideReference: "fed-monetary",
        relatedQuestions: [1, 3],
        formulaUsed: null,
        timeEstimate: 50,
        sourceConfidence: "High"
    },
    {
        id: 21,
        category: "Ethics & Financial Literacy",
        subcategory: "Fair Lending",
        tags: ["Ethics", "Fair Lending", "ECOA", "Banking Regulations", "Consumer Banking", "Lending", "Scenario", "Compliance"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Equal Credit Opportunity Act", "Prohibited bases of discrimination"],
        questionType: "scenario",
        scenario: "A bank denies a qualified applicant a loan based on the applicant's marital status and age.",
        question: "Which law has the bank most clearly violated?",
        choices: [
            "The Equal Credit Opportunity Act (ECOA)",
            "The Truth in Lending Act",
            "The Bank Secrecy Act",
            "The Community Reinvestment Act"
        ],
        answer: 0,
        explanation: "ECOA prohibits credit discrimination based on race, color, religion, national origin, sex, marital status, age, or receipt of public assistance.",
        whyEachWrong: {
            "1": "TILA governs disclosure of credit terms, not discrimination.",
            "2": "BSA addresses money laundering.",
            "3": "CRA encourages lending in communities but isn't the discrimination statute here."
        },
        commonTrap: "Confusing ECOA (fair lending/discrimination) with CRA (community lending obligations).",
        studyGuideReference: "fair-lending",
        relatedQuestions: [7, 22],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 22,
        category: "Commercial Banking",
        subcategory: "Business Lending",
        tags: ["Commercial Banking", "Business Lending", "Treasury Management", "Risk Management", "Credit Analysis", "Scenario", "Liquidity"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Line of credit", "Working capital", "Revolving credit"],
        questionType: "scenario",
        scenario: "A seasonal retailer needs flexible short-term funds to buy inventory before the holidays and repay after sales, repeatedly each year.",
        question: "Which financing product best fits this need?",
        choices: [
            "A 20-year term loan",
            "A revolving line of credit",
            "A commercial mortgage",
            "Equipment financing"
        ],
        answer: 1,
        explanation: "A revolving line of credit lets the business draw, repay, and redraw funds as needed — ideal for fluctuating seasonal working capital.",
        whyEachWrong: {
            "0": "A 20-year term loan is for long-term fixed needs.",
            "2": "A commercial mortgage funds real estate.",
            "3": "Equipment financing is tied to specific assets, not flexible inventory cycles."
        },
        commonTrap: "Choosing a term loan when the need is revolving working capital.",
        studyGuideReference: "commercial-lending",
        relatedQuestions: [8, 23],
        formulaUsed: "Working Capital = Current Assets − Current Liabilities",
        timeEstimate: 70,
        sourceConfidence: "High"
    },
    {
        id: 23,
        category: "Financial Statements & Ratios",
        subcategory: "Liquidity Ratios",
        tags: ["Financial Ratios", "Liquidity", "Current Ratio", "Commercial Banking", "Risk Management", "Formula", "Math"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Current ratio", "Liquidity measurement"],
        questionType: "scenario",
        scenario: "A business has current assets of $300,000 and current liabilities of $150,000.",
        question: "What is the current ratio, and what does it indicate?",
        choices: [
            "0.5; the firm cannot cover short-term obligations",
            "2.0; the firm can cover short-term obligations twice over",
            "1.5; the firm is insolvent",
            "200; strong long-term solvency"
        ],
        answer: 1,
        explanation: "Current Ratio = Current Assets / Current Liabilities = $300,000 / $150,000 = 2.0, meaning current assets are double current liabilities — healthy short-term liquidity.",
        whyEachWrong: {
            "0": "0.5 inverts the formula.",
            "2": "Result is 2.0, not 1.5, and 2.0 isn't insolvency.",
            "3": "200 forgets to keep it as a ratio; current ratio measures short-term, not long-term."
        },
        commonTrap: "Inverting the formula (liabilities/assets).",
        studyGuideReference: "liquidity-ratios",
        relatedQuestions: [22, 24],
        formulaUsed: "Current Ratio = Current Assets / Current Liabilities",
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 24,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Money Multiplier",
        tags: ["Monetary Policy", "Money Multiplier", "Reserve Requirement", "Money Supply", "Federal Reserve", "Formula", "Math", "Scenario"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Money multiplier", "Fractional reserve banking"],
        questionType: "scenario",
        scenario: "The reserve requirement is 10%. A bank receives a new $1,000 deposit.",
        question: "Using the simple money multiplier, what is the maximum total increase in the money supply?",
        choices: ["$1,000", "$10,000", "$100", "$9,000"],
        answer: 1,
        explanation: "Money multiplier = 1 / reserve ratio = 1 / 0.10 = 10. Maximum money supply expansion = $1,000 × 10 = $10,000.",
        whyEachWrong: {
            "0": "$1,000 is just the initial deposit, ignoring multiplication.",
            "2": "$100 is the reserve held, not the expansion.",
            "3": "$9,000 is the additional lending beyond the original; total expansion is $10,000."
        },
        commonTrap: "Reporting only the new lending ($9,000) instead of total money supply increase ($10,000).",
        studyGuideReference: "money-multiplier",
        relatedQuestions: [1, 20],
        formulaUsed: "Money Multiplier = 1 / Reserve Requirement",
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 25,
        category: "Banking Technology & Fintech",
        subcategory: "Cybersecurity",
        tags: ["Banking Technology", "Cybersecurity", "Fraud", "Risk Management", "Consumer Banking", "Scenario", "Compliance"],
        difficulty: "Easy",
        estimatedNationalFrequency: "Medium",
        concepts: ["Phishing", "Social engineering", "Multi-factor authentication"],
        questionType: "scenario",
        scenario: "A customer receives an email claiming to be from their bank, asking them to click a link and 'verify' their password and account number.",
        question: "This is most likely an example of:",
        choices: ["Encryption", "Phishing", "Tokenization", "Two-factor authentication"],
        answer: 1,
        explanation: "Phishing uses deceptive messages to trick people into revealing credentials. Banks never request passwords via email links.",
        whyEachWrong: {
            "0": "Encryption protects data, not a scam.",
            "2": "Tokenization replaces sensitive data with tokens (a security measure).",
            "3": "2FA is a protective control, not an attack."
        },
        commonTrap: "Confusing the attack (phishing) with defensive measures (encryption, 2FA).",
        studyGuideReference: "cybersecurity",
        relatedQuestions: [15, 7],
        formulaUsed: null,
        timeEstimate: 40,
        sourceConfidence: "High"
    },
    {
        id: 26,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Inflation",
        tags: ["Monetary Policy", "Inflation", "Interest Rates", "Real vs Nominal", "Economics", "Scenario", "Federal Reserve"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Real interest rate", "Fisher equation", "Inflation adjustment"],
        questionType: "scenario",
        scenario: "A savings account pays a 4% nominal interest rate while inflation runs at 6%.",
        question: "What is the approximate real interest rate, and what does it mean for the saver?",
        choices: [
            "+10%; the saver gains substantial purchasing power",
            "−2%; the saver loses purchasing power",
            "+2%; the saver gains slightly",
            "0%; purchasing power is unchanged"
        ],
        answer: 1,
        explanation: "Real rate ≈ nominal − inflation = 4% − 6% = −2%. A negative real rate means money grows slower than prices, eroding purchasing power.",
        whyEachWrong: {
            "0": "Rates are subtracted, not added.",
            "2": "Sign is negative because inflation exceeds nominal rate.",
            "3": "They aren't equal, so it isn't 0%."
        },
        commonTrap: "Adding instead of subtracting inflation, or ignoring the negative sign.",
        studyGuideReference: "interest-math",
        relatedQuestions: [9, 24],
        formulaUsed: "Real Rate ≈ Nominal Rate − Inflation Rate",
        timeEstimate: 70,
        sourceConfidence: "High"
    },
    {
        id: 27,
        category: "Banking Regulations & Compliance",
        subcategory: "Investment vs Commercial Banking",
        tags: ["Banking Regulations", "Glass-Steagall", "Gramm-Leach-Bliley", "Investment Banking", "Commercial Banking", "Banking History", "Conceptual"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Separation of banking", "Repeal of Glass-Steagall"],
        questionType: "conceptual",
        scenario: "",
        question: "The 1999 Gramm-Leach-Bliley Act is best known for:",
        choices: [
            "Creating the FDIC",
            "Repealing key provisions separating commercial and investment banking",
            "Establishing the Federal Reserve",
            "Creating the CFPB"
        ],
        answer: 1,
        explanation: "Gramm-Leach-Bliley (1999) repealed Glass-Steagall's separation, allowing financial holding companies to combine commercial banking, investment banking, and insurance.",
        whyEachWrong: {
            "0": "The FDIC was created by Glass-Steagall (1933).",
            "2": "The Fed was created in 1913.",
            "3": "The CFPB was created by Dodd-Frank (2010)."
        },
        commonTrap: "Confusing the law that SEPARATED banking (Glass-Steagall) with the one that REUNITED it (GLB).",
        studyGuideReference: "banking-history",
        relatedQuestions: [5, 28],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 28,
        category: "Banking Regulations & Compliance",
        subcategory: "Post-Crisis Regulation",
        tags: ["Banking Regulations", "Dodd-Frank", "CFPB", "Risk Management", "Consumer Banking", "Banking History", "Conceptual", "Compliance"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["Dodd-Frank", "Consumer Financial Protection Bureau", "Volcker Rule"],
        questionType: "conceptual",
        scenario: "",
        question: "The Dodd-Frank Act (2010) created which consumer-focused regulatory agency?",
        choices: [
            "The FDIC",
            "The Consumer Financial Protection Bureau (CFPB)",
            "The Office of the Comptroller of the Currency",
            "The SEC"
        ],
        answer: 1,
        explanation: "Dodd-Frank, passed after the 2008 crisis, created the CFPB to protect consumers in financial markets, and also introduced the Volcker Rule.",
        whyEachWrong: {
            "0": "The FDIC dates to 1933.",
            "2": "The OCC dates to 1863.",
            "3": "The SEC was created in 1934."
        },
        commonTrap: "Confusing the CFPB (Dodd-Frank) with older regulators like the OCC or SEC.",
        studyGuideReference: "post-crisis-reg",
        relatedQuestions: [27, 21],
        formulaUsed: null,
        timeEstimate: 50,
        sourceConfidence: "High"
    },
    {
        id: 29,
        category: "Consumer Banking & Deposit Products",
        subcategory: "Truth in Savings",
        tags: ["Consumer Banking", "Regulation DD", "Truth in Savings", "APY", "Banking Regulations", "Deposit Products", "Scenario"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Regulation DD", "APY disclosure"],
        questionType: "scenario",
        scenario: "A bank advertises a savings account and must clearly disclose the annual percentage yield so consumers can compare accounts accurately.",
        question: "Which regulation requires this APY disclosure?",
        choices: [
            "Regulation Z (Truth in Lending)",
            "Regulation DD (Truth in Savings)",
            "Regulation E (Electronic Fund Transfers)",
            "Regulation CC (Funds Availability)"
        ],
        answer: 1,
        explanation: "Regulation DD (Truth in Savings Act) requires standardized APY disclosure on deposit accounts to enable comparison shopping.",
        whyEachWrong: {
            "0": "Reg Z covers credit/lending disclosures (APR).",
            "2": "Reg E covers electronic transfers.",
            "3": "Reg CC covers check hold/funds availability times."
        },
        commonTrap: "Confusing Reg DD (savings/APY) with Reg Z (lending/APR).",
        studyGuideReference: "consumer-regs",
        relatedQuestions: [7, 9],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 30,
        category: "Risk Management",
        subcategory: "Bank Capital",
        tags: ["Risk Management", "Bank Capital", "Leverage", "Basel Accords", "Commercial Banking", "Solvency", "Scenario", "Formula"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Capital as cushion", "Insolvency", "Leverage"],
        questionType: "scenario",
        scenario: "A bank holds $100M in assets, $92M in liabilities (mostly deposits), and $8M in capital. A loan portfolio loss wipes out $10M in asset value.",
        question: "What is the immediate consequence for the bank?",
        choices: [
            "It remains well-capitalized",
            "It becomes insolvent — losses exceed its capital cushion",
            "Its deposits automatically increase",
            "Nothing changes because the Fed covers losses"
        ],
        answer: 1,
        explanation: "Capital absorbs losses. A $10M loss exceeds the $8M capital cushion, pushing the bank to negative equity — insolvency. This is why capital adequacy (Basel) matters.",
        whyEachWrong: {
            "0": "An $8M cushion cannot absorb a $10M loss.",
            "2": "Losses don't raise deposits.",
            "3": "The Fed lends liquidity but does not absorb credit losses for solvent operation."
        },
        commonTrap: "Believing deposit insurance/the Fed shields the bank from credit LOSSES (it addresses liquidity/depositor protection, not bank solvency).",
        studyGuideReference: "bank-capital",
        relatedQuestions: [12, 16],
        formulaUsed: "Bank Capital (Equity) = Total Assets − Total Liabilities",
        timeEstimate: 85,
        sourceConfidence: "High"
    },

    /* ============================================================
         EXPANSION PACK 01 — TAXATION & TECHNOLOGY IN BANKING
         IDs 31–130. Schema-identical to IDs 1–30.
         DO NOT renumber. Future packs continue at id:131.
         ============================================================ */

    {
        id: 31,
        category: "Taxation in Banking",
        subcategory: "Information Reporting",
        tags: ["Taxation", "1099-INT", "Information Reporting", "Consumer Banking", "Compliance", "Scenario", "Interest Income", "IRS"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["1099-INT threshold", "Interest reporting", "\$10 rule"],
        questionType: "scenario",
        scenario: "A customer earned \$9.50 in interest on a savings account during the tax year and asks why she did not receive a 1099-INT from her bank.",
        question: "What is the correct explanation?",
        choices: [
            "Banks only issue 1099-INT for interest of \$10 or more",
            "Banks never report savings interest",
            "She must have a tax-exempt account",
            "The bank made a filing error"
        ],
        answer: 0,
        explanation: "Banks are generally required to issue Form 1099-INT only when interest paid is \$10 or more in a year. The \$9.50 is still taxable income the customer must self-report, but no 1099-INT is required.",
        whyEachWrong: {
            "1": "Banks DO report interest — just at/above the \$10 threshold.",
            "2": "Nothing indicates a tax-exempt (e.g., municipal) account.",
            "3": "No error occurred; the amount is below the reporting threshold."
        },
        commonTrap: "Believing income under \$10 is non-taxable — it is still taxable even though no 1099-INT is issued.",
        studyGuideReference: "tax-reporting",
        relatedQuestions: [32, 33],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 32,
        category: "Taxation in Banking",
        subcategory: "Backup Withholding",
        tags: ["Taxation", "Backup Withholding", "W-9", "TIN", "Compliance", "Scenario", "Consumer Banking", "IRS"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Backup withholding rate", "Missing/incorrect TIN", "24% withholding"],
        questionType: "scenario",
        scenario: "A customer opens an interest-bearing account but refuses to provide a valid Taxpayer Identification Number (TIN) on Form W-9.",
        question: "What action is the bank generally required to take on interest payments?",
        choices: [
            "Pay full interest with no withholding",
            "Apply backup withholding at 24% on the interest",
            "Close the account immediately by law",
            "Withhold 50% of all deposits"
        ],
        answer: 1,
        explanation: "When a payee fails to furnish a correct TIN, the IRS requires backup withholding at 24% on reportable payments like interest. The bank remits this to the IRS on the customer's behalf.",
        whyEachWrong: {
            "0": "A missing/invalid TIN triggers mandatory withholding, not full payment.",
            "2": "There is no legal requirement to immediately close the account.",
            "3": "Withholding applies to the interest, not to deposit principal, and the rate is 24%, not 50%."
        },
        commonTrap: "Confusing backup withholding (24% on reportable income) with a tax on deposited principal.",
        studyGuideReference: "tax-reporting",
        relatedQuestions: [31, 33],
        formulaUsed: null,
        timeEstimate: 70,
        sourceConfidence: "High"
    },
    {
        id: 33,
        category: "Taxation in Banking",
        subcategory: "Tax-Equivalent Yield",
        tags: ["Taxation", "Municipal Bonds", "Tax-Equivalent Yield", "Investments", "Formula", "Math", "Scenario", "Interest Rates"],
        difficulty: "Hard",
        estimatedNationalFrequency: "High",
        concepts: ["Tax-equivalent yield", "Municipal bond tax exemption", "Marginal tax rate"],
        questionType: "calculation",
        scenario: "An investor in the 32% federal tax bracket is comparing a tax-free municipal bond yielding 4% to a taxable corporate bond.",
        question: "What taxable yield would the corporate bond need to match the muni's after-tax return?",
        choices: ["4.00%", "5.88%", "2.72%", "6.25%"],
        answer: 1,
        explanation: "Tax-Equivalent Yield = Tax-Free Yield / (1 − Tax Rate) = 0.04 / (1 − 0.32) = 0.04 / 0.68 ≈ 5.88%. The taxable bond must yield ~5.88% to be equivalent.",
        whyEachWrong: {
            "0": "4% ignores the tax advantage of the muni entirely.",
            "2": "2.72% applies the tax to the muni (which is tax-free) — backwards.",
            "3": "6.25% uses the wrong divisor (dividing by the tax rate instead of 1 minus it)."
        },
        commonTrap: "Dividing by the tax rate (0.32) instead of (1 − tax rate); or taxing the already tax-free municipal yield.",
        studyGuideReference: "tax-equivalent-yield",
        relatedQuestions: [34, 35],
        formulaUsed: "Tax-Equivalent Yield = Tax-Free Yield / (1 − Marginal Tax Rate)",
        timeEstimate: 90,
        sourceConfidence: "High"
    },
    {
        id: 34,
        category: "Taxation in Banking",
        subcategory: "Retirement Accounts",
        tags: ["Taxation", "Roth IRA", "Traditional IRA", "Retirement", "Consumer Banking", "Scenario", "Financial Literacy", "Tax Planning"],
        difficulty: "Hard",
        estimatedNationalFrequency: "High",
        concepts: ["Roth vs Traditional IRA", "Tax timing", "After-tax vs pre-tax contributions"],
        questionType: "scenario",
        scenario: "A 24-year-old in a low tax bracket today expects to earn much more and be in a higher bracket at retirement. She asks her banker which IRA is generally more advantageous.",
        question: "Which recommendation is most appropriate and why?",
        choices: [
            "Traditional IRA, because contributions are tax-deductible now",
            "Roth IRA, because she pays tax now at a low rate and withdrawals are tax-free later",
            "Traditional IRA, because Roth withdrawals are always taxed",
            "Neither — IRAs offer no tax benefit"
        ],
        answer: 1,
        explanation: "A Roth IRA is funded with after-tax dollars; qualified withdrawals (including growth) are tax-free. Paying tax now at a LOW rate and avoiding tax later at a HIGH rate is advantageous for someone expecting rising income.",
        whyEachWrong: {
            "0": "A deduction now is most valuable in a HIGH bracket; she's currently low, so deferral is less attractive.",
            "2": "Qualified Roth withdrawals are tax-free, not taxed.",
            "3": "Both IRA types offer meaningful tax benefits."
        },
        commonTrap: "Assuming the upfront deduction always wins — the better choice depends on current vs. future tax brackets.",
        studyGuideReference: "tax-advantaged-accounts",
        relatedQuestions: [33, 35],
        formulaUsed: null,
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 35,
        category: "Taxation in Banking",
        subcategory: "Tax-Advantaged Accounts",
        tags: ["Taxation", "HSA", "Health Savings", "Consumer Banking", "Tax Planning", "Scenario", "Financial Literacy", "Deposit Products"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Triple tax advantage", "HSA eligibility", "High-deductible health plan"],
        questionType: "scenario",
        scenario: "A banker explains that a Health Savings Account (HSA) is sometimes called 'triple tax-advantaged.'",
        question: "Which set of features earns it that label?",
        choices: [
            "Tax-deductible contributions, tax-free growth, and tax-free qualified medical withdrawals",
            "Tax-free contributions, taxed growth, and taxed withdrawals",
            "Taxable contributions, tax-free growth, and taxable withdrawals",
            "Tax credits, employer matching, and FDIC insurance"
        ],
        answer: 0,
        explanation: "An HSA offers (1) pre-tax/deductible contributions, (2) tax-free growth, and (3) tax-free withdrawals for qualified medical expenses — three tax benefits. It requires enrollment in a high-deductible health plan (HDHP).",
        whyEachWrong: {
            "1": "Growth and qualified withdrawals are not taxed.",
            "2": "Contributions are tax-advantaged, not fully taxable, and qualified withdrawals are tax-free.",
            "3": "Matching and FDIC coverage are unrelated to the 'triple tax' label."
        },
        commonTrap: "Confusing the HSA's three tax benefits with a 401(k) match or with FSA 'use-it-or-lose-it' rules.",
        studyGuideReference: "tax-advantaged-accounts",
        relatedQuestions: [34, 36],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 36,
        category: "Taxation in Banking",
        subcategory: "Capital Gains",
        tags: ["Taxation", "Capital Gains", "Investments", "Tax Planning", "Scenario", "Math", "Financial Literacy", "Holding Period"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Short-term vs long-term capital gains", "Holding period", "Ordinary income rates"],
        questionType: "scenario",
        scenario: "An investor bought stock and sold it for a \$5,000 gain after holding it for 10 months. He is in the 35% ordinary income bracket and assumes the long-term capital gains rate would be 15%.",
        question: "How is this gain taxed, and what does it illustrate?",
        choices: [
            "At 15% long-term rate, because all stock gains are long-term",
            "At his 35% ordinary rate, because the holding period was under one year (short-term)",
            "It is tax-free because it is under \$10,000",
            "At 0%, because investments are never taxed until withdrawn"
        ],
        answer: 1,
        explanation: "A holding period of one year or LESS produces a SHORT-TERM capital gain, taxed at ordinary income rates (35% here). Holding just over one year would have qualified for the lower 15% long-term rate.",
        whyEachWrong: {
            "0": "Long-term treatment requires more than one year; 10 months is short-term.",
            "2": "Capital gains are not exempt under \$10,000.",
            "3": "Realized gains in a taxable account are taxed in the year of sale."
        },
        commonTrap: "Assuming all stock gains get the favorable long-term rate, ignoring the one-year holding requirement.",
        studyGuideReference: "capital-gains",
        relatedQuestions: [33, 34],
        formulaUsed: "Capital Gain = Sale Price − Cost Basis",
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 37,
        category: "Taxation in Banking",
        subcategory: "Foreign Account Reporting",
        tags: ["Taxation", "FBAR", "FATCA", "International Banking", "Compliance", "Scenario", "Regulation", "IRS"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Low",
        concepts: ["FBAR \$10,000 threshold", "Foreign account reporting", "FinCEN Form 114"],
        questionType: "scenario",
        scenario: "A U.S. citizen holds foreign bank accounts whose combined value exceeded \$10,000 at any point during the year.",
        question: "What reporting obligation is most directly triggered?",
        choices: [
            "A Currency Transaction Report (CTR)",
            "An FBAR (FinCEN Form 114) reporting the foreign accounts",
            "A 1099-INT only",
            "No reporting is required for individuals"
        ],
        answer: 1,
        explanation: "U.S. persons with foreign financial accounts exceeding \$10,000 in aggregate at any time during the year must file an FBAR (FinCEN Form 114). FATCA may impose additional reporting on Form 8938.",
        whyEachWrong: {
            "0": "A CTR covers domestic cash transactions over \$10,000, not foreign account holdings.",
            "2": "A 1099-INT alone does not satisfy foreign account disclosure rules.",
            "3": "Individuals are precisely who FBAR targets."
        },
        commonTrap: "Confusing the FBAR \$10,000 foreign-account threshold with the CTR \$10,000 cash-transaction threshold.",
        studyGuideReference: "foreign-tax-reporting",
        relatedQuestions: [6, 38],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "Medium"
    },
    {
        id: 38,
        category: "Taxation in Banking",
        subcategory: "Municipal Securities",
        tags: ["Taxation", "Municipal Bonds", "Investments", "Tax Planning", "Scenario", "Interest Rates", "Financial Literacy", "Wealth Management"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Municipal bond tax exemption", "Suitability by tax bracket"],
        questionType: "scenario",
        scenario: "A banker is advising two clients: one in the 12% bracket and one in the 37% bracket. Both are considering municipal bonds.",
        question: "For which client are tax-free municipal bonds generally MORE attractive, and why?",
        choices: [
            "The 12% client, because low earners need tax breaks most",
            "The 37% client, because the value of tax-exempt interest rises with the tax bracket",
            "Equally attractive to both, since the coupon is identical",
            "Neither, because munis are always taxable federally"
        ],
        answer: 1,
        explanation: "The benefit of tax-free interest grows as the marginal tax rate rises. A high-bracket investor avoids more tax per dollar of interest, so the tax-equivalent yield advantage is greater for the 37% client.",
        whyEachWrong: {
            "0": "A low-bracket investor saves little tax and may earn more in a taxable bond.",
            "2": "Identical coupons still produce different AFTER-TAX returns by bracket.",
            "3": "Municipal bond interest is generally exempt from federal income tax."
        },
        commonTrap: "Assuming tax-free products help low-income investors most — they benefit high-bracket investors more.",
        studyGuideReference: "tax-equivalent-yield",
        relatedQuestions: [33, 36],
        formulaUsed: "Tax-Equivalent Yield = Tax-Free Yield / (1 − Marginal Tax Rate)",
        timeEstimate: 65,
        sourceConfidence: "High"
    },
    {
        id: 39,
        category: "Taxation in Banking",
        subcategory: "Education Savings",
        tags: ["Taxation", "529 Plan", "Education Savings", "Consumer Banking", "Tax Planning", "Scenario", "Financial Literacy", "Coverdell"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["529 plan", "Tax-free qualified education withdrawals", "Non-qualified penalty"],
        questionType: "scenario",
        scenario: "A parent withdraws funds from a 529 plan to pay for the child's qualified college tuition.",
        question: "What is the federal tax treatment of this withdrawal?",
        choices: [
            "Earnings are taxed as ordinary income plus a 10% penalty",
            "The withdrawal of earnings is federally tax-free when used for qualified education expenses",
            "The entire withdrawal is taxed at the capital gains rate",
            "The contributions are taxed, but earnings are not"
        ],
        answer: 1,
        explanation: "529 plan earnings grow tax-deferred and are federally tax-free when used for qualified education expenses. Only NON-qualified withdrawals trigger income tax on earnings plus a 10% penalty.",
        whyEachWrong: {
            "0": "Tax and penalty apply only to NON-qualified withdrawals.",
            "2": "Qualified education withdrawals are tax-free, not taxed at capital gains rates.",
            "3": "Contributions (after-tax) are never taxed again; qualified earnings are tax-free."
        },
        commonTrap: "Confusing qualified (tax-free) and non-qualified (taxed + 10% penalty) 529 withdrawals.",
        studyGuideReference: "tax-advantaged-accounts",
        relatedQuestions: [34, 35],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 40,
        category: "Taxation in Banking",
        subcategory: "Tax-Loss Harvesting",
        tags: ["Taxation", "Tax-Loss Harvesting", "Investments", "Wash Sale", "Wealth Management", "Scenario", "Tax Planning", "Capital Gains"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Low",
        concepts: ["Tax-loss harvesting", "Wash sale rule", "Offsetting gains"],
        questionType: "scenario",
        scenario: "An investor sells a losing stock to offset capital gains, then repurchases the SAME stock 10 days later.",
        question: "What rule does this likely violate, and what is the consequence?",
        choices: [
            "The wash sale rule; the loss is disallowed for the current tax deduction",
            "No rule is violated; the loss is fully deductible",
            "The step-up basis rule; the gain doubles",
            "The constructive receipt rule; the sale is reversed"
        ],
        answer: 0,
        explanation: "The wash sale rule disallows a loss deduction if a substantially identical security is repurchased within 30 days before or after the sale. The disallowed loss is added to the basis of the new shares.",
        whyEachWrong: {
            "1": "Repurchasing within 30 days triggers the wash sale rule.",
            "2": "Step-up basis applies to inherited assets, not this scenario.",
            "3": "Constructive receipt relates to income timing, not security sales."
        },
        commonTrap: "Forgetting the 30-day window on BOTH sides of the sale that triggers a wash sale.",
        studyGuideReference: "capital-gains",
        relatedQuestions: [36, 38],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "Medium"
    },
    {
        id: 41,
        category: "Taxation in Banking",
        subcategory: "Bank Taxation",
        tags: ["Taxation", "Commercial Banking", "Net Income", "Financial Statements", "Scenario", "Math", "Profitability", "Corporate Tax"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Low",
        concepts: ["After-tax income", "Effective tax rate"],
        questionType: "calculation",
        scenario: "A bank reports pre-tax income of \$40 million and pays \$8.4 million in income taxes.",
        question: "What is the bank's effective tax rate?",
        choices: ["8.4%", "21%", "31.6%", "40%"],
        answer: 1,
        explanation: "Effective Tax Rate = Taxes Paid / Pre-Tax Income = \$8.4M / $40M = 0.21 = 21%. This matches the U.S. federal corporate statutory rate.",
        whyEachWrong: {
            "0": "8.4% ignores that the denominator is $$40M, not $$100M.",
            "2": "31.6% is the after-tax margin error, not the tax rate.",
            "3": "40% confuses pre-tax income ($40M) with a percentage."
        },
        commonTrap: "Reading the dollar figure ($40M) as a percentage instead of computing the ratio.",
        studyGuideReference: "bank-taxation",
        relatedQuestions: [10, 11],
        formulaUsed: "Effective Tax Rate = Income Tax Expense / Pre-Tax Income",
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 42,
        category: "Taxation in Banking",
        subcategory: "Forms & Documentation",
        tags: ["Taxation", "W-9", "W-8BEN", "International Banking", "Compliance", "Scenario", "Documentation", "IRS"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["W-9 vs W-8BEN", "U.S. persons vs foreign persons"],
        questionType: "scenario",
        scenario: "A non-resident alien opens an account at a U.S. bank to certify foreign status and claim treaty benefits.",
        question: "Which form should the bank collect?",
        choices: ["Form W-9", "Form W-8BEN", "Form 1099-INT", "Form 1040"],
        answer: 1,
        explanation: "Form W-8BEN certifies foreign (non-U.S.) status for individuals and may claim reduced withholding under a tax treaty. Form W-9 is for U.S. persons providing a TIN.",
        whyEachWrong: {
            "0": "W-9 is for U.S. persons, not non-resident aliens.",
            "2": "1099-INT is an information return the bank issues, not a customer certification.",
            "3": "Form 1040 is the individual income tax return, not an account-opening certification."
        },
        commonTrap: "Confusing W-9 (U.S. persons) with W-8BEN (foreign persons).",
        studyGuideReference: "tax-reporting",
        relatedQuestions: [32, 37],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 43,
        category: "Taxation in Banking",
        subcategory: "Deductibility",
        tags: ["Taxation", "Mortgage Interest", "Tax Planning", "Consumer Banking", "Lending", "Scenario", "Financial Literacy", "Deductions"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Mortgage interest deduction", "Itemizing vs standard deduction"],
        questionType: "scenario",
        scenario: "A homeowner with a mortgage asks whether the interest she pays can reduce her taxable income.",
        question: "What is the most accurate banker response?",
        choices: [
            "Mortgage interest is never deductible",
            "Qualified mortgage interest may be deductible if she itemizes deductions instead of taking the standard deduction",
            "All mortgage payments, including principal, are fully deductible",
            "Only interest on credit cards is deductible"
        ],
        answer: 1,
        explanation: "Qualified home mortgage interest is an itemized deduction. It only reduces taxable income if total itemized deductions exceed the standard deduction. Principal repayment is NOT deductible.",
        whyEachWrong: {
            "0": "Qualified mortgage interest can be deductible when itemizing.",
            "2": "Principal is never deductible — only the interest portion can be.",
            "3": "Personal credit card interest is generally NOT deductible."
        },
        commonTrap: "Assuming the entire mortgage payment (including principal) is deductible, or that interest helps even when taking the standard deduction.",
        studyGuideReference: "tax-deductions",
        relatedQuestions: [34, 39],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 44,
        category: "Taxation in Banking",
        subcategory: "Tax-Deferred Growth",
        tags: ["Taxation", "Tax Deferral", "Compound Interest", "Retirement", "Scenario", "Math", "Investments", "Tax Planning"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Tax-deferred compounding", "Why deferral builds wealth"],
        questionType: "scenario",
        scenario: "Two investors each invest identically, but one account is taxable (taxes paid annually on gains) and the other is tax-deferred (taxes paid only at withdrawal).",
        question: "All else equal, why does the tax-deferred account typically end with a larger balance?",
        choices: [
            "Tax-deferred accounts earn a higher interest rate by law",
            "Deferring taxes leaves more money invested each year to compound",
            "Tax-deferred accounts are never taxed at all",
            "Taxable accounts have higher fees mandated by the IRS"
        ],
        answer: 1,
        explanation: "In a taxable account, annual taxes shrink the balance that compounds. Tax deferral keeps the full amount working and compounding, producing a larger pre-withdrawal balance.",
        whyEachWrong: {
            "0": "The interest rate is not legally higher; the advantage is from compounding more dollars.",
            "2": "Tax-deferred (e.g., Traditional IRA) is taxed at withdrawal, not never.",
            "3": "The IRS does not mandate higher fees on taxable accounts."
        },
        commonTrap: "Believing deferral means tax-free; the real driver is more dollars compounding over time.",
        studyGuideReference: "tax-advantaged-accounts",
        relatedQuestions: [34, 36],
        formulaUsed: "FV = PV(1 + r)^n",
        timeEstimate: 75,
        sourceConfidence: "High"
    },
    {
        id: 45,
        category: "Taxation in Banking",
        subcategory: "Estate & Gift",
        tags: ["Taxation", "Estate Planning", "Gift Tax", "Wealth Management", "Scenario", "Trusts", "Financial Literacy", "Tax Planning"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Low",
        concepts: ["Annual gift tax exclusion", "Step-up in basis"],
        questionType: "scenario",
        scenario: "A grandparent wants to transfer wealth to grandchildren each year while minimizing gift tax exposure.",
        question: "Which strategy correctly leverages the tax code?",
        choices: [
            "Gift any amount; gifts are always tax-free",
            "Give annual gifts up to the IRS annual gift tax exclusion per recipient to avoid using the lifetime exemption",
            "Gifts must always be reported as the recipient's income",
            "Only cash gifts are allowed under tax law"
        ],
        answer: 1,
        explanation: "Each donor may give up to the annual gift tax exclusion amount per recipient per year without filing a gift tax return or using the lifetime exemption — an effective wealth-transfer strategy.",
        whyEachWrong: {
            "0": "Large gifts above the exclusion can require filing and use the lifetime exemption.",
            "2": "Gifts are generally NOT taxable income to the recipient.",
            "3": "Non-cash assets (e.g., securities, property) can also be gifted."
        },
        commonTrap: "Thinking the recipient owes income tax on gifts — gift tax (if any) is the donor's responsibility.",
        studyGuideReference: "estate-gift-tax",
        relatedQuestions: [40, 43],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "Medium"
    },
    {
        id: 46,
        category: "Taxation in Banking",
        subcategory: "Dividends",
        tags: ["Taxation", "Dividends", "1099-DIV", "Investments", "Scenario", "Tax Planning", "Financial Literacy", "Capital Gains"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Qualified vs ordinary dividends", "1099-DIV reporting"],
        questionType: "scenario",
        scenario: "An investor receives a 1099-DIV showing qualified dividends and is in a high ordinary income bracket.",
        question: "How are qualified dividends generally taxed compared to ordinary income?",
        choices: [
            "At the same rate as ordinary income",
            "At lower long-term capital gains rates if holding requirements are met",
            "They are always tax-free",
            "At a flat 50% rate"
        ],
        answer: 1,
        explanation: "Qualified dividends are taxed at the favorable long-term capital gains rates (0%, 15%, or 20%) when holding-period requirements are met, rather than higher ordinary income rates.",
        whyEachWrong: {
            "0": "That describes ORDINARY (non-qualified) dividends.",
            "2": "Dividends are taxable, not tax-free.",
            "3": "There is no flat 50% dividend rate."
        },
        commonTrap: "Treating all dividends the same — qualified vs. ordinary dividends are taxed very differently.",
        studyGuideReference: "tax-reporting",
        relatedQuestions: [36, 33],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 47,
        category: "Taxation in Banking",
        subcategory: "Information Reporting",
        tags: ["Taxation", "1099-MISC", "1099-NEC", "Compliance", "Commercial Banking", "Scenario", "Documentation", "IRS"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Low",
        concepts: ["Reporting payments to vendors", "1099-NEC threshold"],
        questionType: "scenario",
        scenario: "A bank pays \$1,200 to an independent IT contractor (not an employee) for services during the year.",
        question: "What is the bank's most likely reporting obligation?",
        choices: [
            "Issue a W-2",
            "Issue a Form 1099-NEC for nonemployee compensation of \$600 or more",
            "No reporting is required",
            "Issue a 1099-INT"
        ],
        answer: 1,
        explanation: "Payments of \$600 or more to a nonemployee (independent contractor) for services are generally reported on Form 1099-NEC. W-2s are only for employees.",
        whyEachWrong: {
            "0": "A W-2 is for employees, not independent contractors.",
            "2": "\$1,200 exceeds the \$600 reporting threshold.",
            "3": "1099-INT reports interest, not contractor services."
        },
        commonTrap: "Confusing employee (W-2) and contractor (1099-NEC) reporting, or the \$600 threshold with the \$10 interest threshold.",
        studyGuideReference: "tax-reporting",
        relatedQuestions: [31, 42],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 48,
        category: "Taxation in Banking",
        subcategory: "After-Tax Yield",
        tags: ["Taxation", "After-Tax Yield", "CD", "Interest Rates", "Math", "Scenario", "Consumer Banking", "Tax Planning"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["After-tax yield calculation", "Marginal tax rate effect"],
        questionType: "calculation",
        scenario: "A CD pays a 5% taxable yield. The investor is in the 24% federal tax bracket.",
        question: "What is the approximate after-tax yield?",
        choices: ["5.00%", "3.80%", "4.76%", "6.20%"],
        answer: 1,
        explanation: "After-Tax Yield = Taxable Yield × (1 − Tax Rate) = 0.05 × (1 − 0.24) = 0.05 × 0.76 = 0.038 = 3.80%.",
        whyEachWrong: {
            "0": "5% ignores taxes owed on the interest.",
            "2": "4.76% incorrectly divides instead of multiplying.",
            "3": "6.20% adds the tax effect rather than subtracting it."
        },
        commonTrap: "Confusing the after-tax yield formula (multiply by 1 − rate) with the tax-equivalent yield formula (divide by 1 − rate).",
        studyGuideReference: "tax-equivalent-yield",
        relatedQuestions: [33, 38],
        formulaUsed: "After-Tax Yield = Taxable Yield × (1 − Marginal Tax Rate)",
        timeEstimate: 70,
        sourceConfidence: "High"
    },
    {
        id: 49,
        category: "Taxation in Banking",
        subcategory: "Ethics & Compliance",
        tags: ["Taxation", "Ethics", "Tax Evasion", "Compliance", "Structuring", "Scenario", "BSA", "Fraud"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Tax evasion vs avoidance", "Structuring"],
        questionType: "scenario",
        scenario: "A customer asks a banker to help split a \$30,000 cash deposit into multiple \$9,000 deposits across several days 'to avoid paperwork.'",
        question: "How should the banker respond, and why?",
        choices: [
            "Comply, since each deposit is under \$10,000",
            "Refuse and recognize this as illegal structuring; the activity may require a SAR",
            "Advise the customer to use a different bank",
            "Deposit it all at once and skip the CTR"
        ],
        answer: 1,
        explanation: "Deliberately breaking up deposits to evade the \$10,000 CTR reporting requirement is illegal 'structuring' under the Bank Secrecy Act. The banker must not assist and may need to file a Suspicious Activity Report (SAR).",
        whyEachWrong: {
            "0": "Intentionally structuring to evade reporting is a crime, even with each deposit under \$10,000.",
            "2": "Redirecting the customer does not address the illegal intent or the SAR obligation.",
            "3": "Skipping a required CTR is a separate violation."
        },
        commonTrap: "Believing that keeping each deposit under \$10,000 is legal — the intent to evade reporting makes it structuring.",
        studyGuideReference: "tax-ethics",
        relatedQuestions: [6, 37],
        formulaUsed: null,
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 50,
        category: "Taxation in Banking",
        subcategory: "Tax Avoidance vs Evasion",
        tags: ["Taxation", "Ethics", "Tax Avoidance", "Tax Evasion", "Compliance", "Vocabulary", "Financial Literacy", "Tax Planning"],
        difficulty: "Easy",
        estimatedNationalFrequency: "Medium",
        concepts: ["Legal avoidance vs illegal evasion"],
        questionType: "vocabulary",
        scenario: "",
        question: "Which statement correctly distinguishes tax avoidance from tax evasion?",
        choices: [
            "Both are illegal",
            "Tax avoidance is the legal use of tax rules to reduce liability; tax evasion is the illegal concealment of income",
            "Tax avoidance is illegal; tax evasion is legal",
            "They mean exactly the same thing"
        ],
        answer: 1,
        explanation: "Tax avoidance (e.g., contributing to an IRA, claiming legitimate deductions) is legal. Tax evasion (e.g., hiding income, falsifying returns) is illegal.",
        whyEachWrong: {
            "0": "Avoidance is legal; only evasion is illegal.",
            "2": "Reversed — avoidance is legal, evasion is illegal.",
            "3": "They are legally and ethically distinct."
        },
        commonTrap: "Treating all tax minimization as illegal — lawful avoidance is encouraged by the tax code.",
        studyGuideReference: "tax-ethics",
        relatedQuestions: [49, 43],
        formulaUsed: null,
        timeEstimate: 40,
        sourceConfidence: "High"
    },
    {
        id: 51,
        category: "Banking Technology & Fintech",
        subcategory: "Real-Time Payments",
        tags: ["Banking Technology", "FedNow", "Real-Time Payments", "Payments", "ACH", "Scenario", "Liquidity", "Current Banking Practices"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["FedNow", "Instant settlement", "24/7 payments"],
        questionType: "scenario",
        scenario: "A small business needs to receive a customer payment and have the funds settle and be available instantly, 24/7, including weekends.",
        question: "Which system best meets this need?",
        choices: [
            "Traditional ACH",
            "FedNow / real-time payments (RTP)",
            "Paper check deposit",
            "A 1–2 day wire batch"
        ],
        answer: 1,
        explanation: "FedNow (launched by the Federal Reserve in 2023) and the RTP network provide instant, around-the-clock payment settlement, unlike ACH, which batches and settles on business days.",
        whyEachWrong: {
            "0": "ACH batches and settles in 1–2 business days, not instantly 24/7.",
            "2": "Checks involve clearing delays and holds.",
            "3": "Wires are not instant 24/7 and there is no 'wire batch' that settles continuously on weekends."
        },
        commonTrap: "Confusing 'fast' ACH (same-day ACH still batches) with true real-time, 24/7 settlement via FedNow/RTP.",
        studyGuideReference: "payments-tech",
        relatedQuestions: [14, 52],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 52,
        category: "Banking Technology & Fintech",
        subcategory: "Data Security",
        tags: ["Banking Technology", "Tokenization", "Encryption", "Cybersecurity", "Payments", "Scenario", "Risk Management", "Data Protection"],
        difficulty: "Hard",
        estimatedNationalFrequency: "High",
        concepts: ["Tokenization vs encryption", "Surrogate values"],
        questionType: "scenario",
        scenario: "A mobile wallet replaces a customer's actual card number with a randomly generated surrogate value that has no mathematical relationship to the original and is useless if stolen.",
        question: "Which security technique is being described?",
        choices: [
            "Encryption",
            "Tokenization",
            "Two-factor authentication",
            "Firewalling"
        ],
        answer: 1,
        explanation: "Tokenization substitutes sensitive data (like a card number) with a non-sensitive surrogate 'token' that has no exploitable value and cannot be mathematically reversed. Encryption, by contrast, transforms data using a key that CAN be reversed.",
        whyEachWrong: {
            "0": "Encryption scrambles data using a reversible key — a token has no mathematical link to the original.",
            "2": "2FA verifies identity; it does not replace card data with a surrogate.",
            "3": "A firewall controls network traffic, not data substitution."
        },
        commonTrap: "Confusing tokenization (irreversible surrogate, no key relationship) with encryption (reversible with a key).",
        studyGuideReference: "data-security",
        relatedQuestions: [25, 53],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "High"
    },
    {
        id: 53,
        category: "Banking Technology & Fintech",
        subcategory: "Card Technology",
        tags: ["Banking Technology", "EMV", "Contactless", "NFC", "Payments", "Fraud", "Scenario", "Consumer Banking"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["EMV chip", "Dynamic data", "Counterfeit fraud reduction"],
        questionType: "scenario",
        scenario: "A merchant upgrades terminals to accept chip cards. Counterfeit card fraud at the store drops sharply.",
        question: "Why do EMV chip cards reduce counterfeit fraud compared to magnetic stripes?",
        choices: [
            "Chips store the PIN in plain text",
            "Each chip transaction generates a unique, dynamic cryptogram that can't be reused",
            "Chips make transactions free of charge",
            "Chips eliminate the need for any authorization"
        ],
        answer: 1,
        explanation: "EMV chips create a unique one-time cryptogram for each transaction, so intercepted data cannot be replayed to create counterfeit cards — unlike static magnetic-stripe data.",
        whyEachWrong: {
            "0": "PINs are never stored in plain text on chips.",
            "2": "Chips do not affect transaction fees.",
            "3": "Authorization is still required."
        },
        commonTrap: "Thinking chips are safer simply because they're 'newer' rather than because of dynamic per-transaction data.",
        studyGuideReference: "card-tech",
        relatedQuestions: [52, 54],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 54,
        category: "Banking Technology & Fintech",
        subcategory: "Artificial Intelligence",
        tags: ["Banking Technology", "Artificial Intelligence", "Machine Learning", "Fraud Detection", "Risk Management", "Scenario", "Current Banking Practices", "Credit Scoring"],
        difficulty: "Medium",
        estimatedNationalFrequency: "High",
        concepts: ["AI fraud detection", "Anomaly detection", "Pattern recognition"],
        questionType: "scenario",
        scenario: "A bank's fraud system instantly flags a customer's card when a transaction occurs in a foreign country minutes after a domestic purchase, deviating from normal spending patterns.",
        question: "Which technology most directly enables this real-time anomaly detection?",
        choices: [
            "Blockchain consensus",
            "Machine learning / AI pattern recognition",
            "Manual ledger review",
            "Paper-based reconciliation"
        ],
        answer: 1,
        explanation: "Machine learning models analyze massive transaction histories to learn normal behavior and flag anomalies (like geographically impossible purchases) in real time — far faster than manual review.",
        whyEachWrong: {
            "0": "Blockchain provides a distributed ledger, not behavioral fraud scoring.",
            "2": "Manual review cannot respond in real time at scale.",
            "3": "Paper reconciliation is slow and retrospective."
        },
        commonTrap: "Crediting blockchain for fraud scoring; real-time behavioral detection is an AI/ML function.",
        studyGuideReference: "ai-banking",
        relatedQuestions: [25, 55],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 55,
        category: "Banking Technology & Fintech",
        subcategory: "AI & Fair Lending",
        tags: ["Banking Technology", "Artificial Intelligence", "Fair Lending", "Ethics", "Credit Scoring", "ECOA", "Scenario", "Risk Management"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Algorithmic bias", "Disparate impact", "Explainability"],
        questionType: "scenario",
        scenario: "A bank's AI credit model is found to systematically deny loans to applicants from certain neighborhoods, even though the model never explicitly used race.",
        question: "What is the most significant compliance concern?",
        choices: [
            "The model is too slow",
            "The model may produce a disparate impact, violating fair lending laws like ECOA",
            "AI cannot legally be used in banking",
            "There is no concern since race was not an input"
        ],
        answer: 1,
        explanation: "Even without using race directly, a model can create a 'disparate impact' through proxy variables (like ZIP code), violating fair lending laws such as ECOA. Banks must test models for bias and ensure explainability.",
        whyEachWrong: {
            "0": "Speed is not the compliance issue here.",
            "2": "AI is legal in banking if it complies with fair lending rules.",
            "3": "Disparate impact can occur through proxies even when race isn't an explicit input."
        },
        commonTrap: "Assuming a model is fair simply because protected characteristics aren't direct inputs — proxies can still cause discrimination.",
        studyGuideReference: "ai-banking",
        relatedQuestions: [21, 54],
        formulaUsed: null,
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 56,
        category: "Banking Technology & Fintech",
        subcategory: "Open Banking & APIs",
        tags: ["Banking Technology", "Open Banking", "APIs", "Fintech", "Data Sharing", "Scenario", "Current Banking Practices", "Consumer Banking"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Open banking", "APIs", "Customer-permissioned data sharing"],
        questionType: "scenario",
        scenario: "A budgeting app lets a customer securely connect to her bank to view balances and transactions from multiple institutions in one place, with her permission.",
        question: "Which technology framework most directly enables this?",
        choices: [
            "Open banking via secure APIs",
            "ATM networks",
            "Check imaging",
            "Magnetic stripe readers"
        ],
        answer: 0,
        explanation: "Open banking uses secure APIs (Application Programming Interfaces) to let customers share their financial data with authorized third parties, enabling aggregation and innovative services.",
        whyEachWrong: {
            "1": "ATM networks dispense cash; they don't aggregate cross-bank data.",
            "2": "Check imaging digitizes checks, not account aggregation.",
            "3": "Magnetic stripe readers process card swipes."
        },
        commonTrap: "Confusing open banking (permissioned API data sharing) with screen scraping or generic 'online banking.'",
        studyGuideReference: "open-banking",
        relatedQuestions: [57, 58],
        formulaUsed: null,
        timeEstimate: 70,
        sourceConfidence: "High"
    },
    {
        id: 57,
        category: "Banking Technology & Fintech",
        subcategory: "Banking as a Service",
        tags: ["Banking Technology", "Banking as a Service", "Embedded Finance", "Fintech", "Partnerships", "Scenario", "Current Banking Practices", "Commercial Banking"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["BaaS", "Embedded finance", "Sponsor banks"],
        questionType: "scenario",
        scenario: "A retail company offers branded checking accounts and debit cards to its customers, but a licensed, regulated bank actually holds the deposits and provides the infrastructure behind the scenes.",
        question: "This arrangement is best described as:",
        choices: [
            "A wire transfer service",
            "Banking as a Service (BaaS) / embedded finance",
            "A credit union conversion",
            "Open market operations"
        ],
        answer: 1,
        explanation: "Banking as a Service (BaaS) lets non-banks embed regulated banking products (accounts, cards) into their platforms, with a licensed 'sponsor bank' providing the underlying charter and compliance.",
        whyEachWrong: {
            "0": "A wire transfer moves funds; it is not a product-embedding model.",
            "2": "No credit union conversion is occurring.",
            "3": "OMO is a Federal Reserve monetary tool."
        },
        commonTrap: "Believing the retailer 'became a bank' — a chartered sponsor bank still holds deposits and bears regulatory responsibility.",
        studyGuideReference: "open-banking",
        relatedQuestions: [56, 58],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "Medium"
    },
    {
        id: 58,
        category: "Banking Technology & Fintech",
        subcategory: "Disintermediation",
        tags: ["Banking Technology", "Disintermediation", "Fintech", "Peer-to-Peer Lending", "Commercial Banking", "Scenario", "Risk Management", "Current Banking Practices"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Low",
        concepts: ["Disintermediation", "P2P lending", "Bypassing traditional banks"],
        questionType: "scenario",
        scenario: "A peer-to-peer lending platform connects individual investors directly with borrowers, reducing the role of a traditional bank intermediary.",
        question: "This trend is best described by which term?",
        choices: [
            "Securitization",
            "Disintermediation",
            "Tokenization",
            "Reintermediation by the Fed"
        ],
        answer: 1,
        explanation: "Disintermediation occurs when borrowers and lenders connect directly, bypassing the traditional banking intermediary that historically sat between savers and borrowers.",
        whyEachWrong: {
            "0": "Securitization bundles loans into tradable securities.",
            "2": "Tokenization replaces sensitive data with tokens.",
            "3": "The Fed is not reinserting itself here."
        },
        commonTrap: "Confusing disintermediation (removing the middleman) with securitization (packaging loans).",
        studyGuideReference: "fintech-trends",
        relatedQuestions: [56, 57],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "Medium"
    },
    {
        id: 59,
        category: "Banking Technology & Fintech",
        subcategory: "Authentication",
        tags: ["Banking Technology", "Biometrics", "Multi-Factor Authentication", "Cybersecurity", "Scenario", "Consumer Banking", "Fraud", "Data Protection"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["MFA factors", "Something you are/know/have"],
        questionType: "scenario",
        scenario: "A banking app requires a password (something you know) AND a fingerprint scan (something you are) to log in.",
        question: "This security approach is best described as:",
        choices: [
            "Single-factor authentication",
            "Multi-factor authentication combining different factor types",
            "Tokenization",
            "Encryption at rest"
        ],
        answer: 1,
        explanation: "Multi-factor authentication (MFA) requires two or more DIFFERENT factor categories: knowledge (password), possession (token/phone), or inherence (biometric). Combining a password and fingerprint uses two distinct types.",
        whyEachWrong: {
            "0": "Two distinct factors is multi-factor, not single-factor.",
            "2": "Tokenization replaces data, not a login method.",
            "3": "Encryption at rest protects stored data, not authentication."
        },
        commonTrap: "Counting two passwords as MFA — true MFA requires DIFFERENT factor categories, not two of the same.",
        studyGuideReference: "authentication-tech",
        relatedQuestions: [25, 52],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 60,
        category: "Banking Technology & Fintech",
        subcategory: "Central Bank Digital Currency",
        tags: ["Banking Technology", "CBDC", "Digital Currency", "Federal Reserve", "Monetary Policy", "Scenario", "Current Banking Practices", "Stablecoin"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["CBDC definition", "Central bank liability", "Difference from crypto"],
        questionType: "scenario",
        scenario: "A nation considers issuing a digital form of its national currency that is a direct liability of its central bank, unlike decentralized cryptocurrencies.",
        question: "What is this called, and how does it differ from Bitcoin?",
        choices: [
            "A stablecoin issued by a private company",
            "A Central Bank Digital Currency (CBDC); it is centralized and government-backed, unlike decentralized Bitcoin",
            "A commercial bank deposit",
            "A money market fund"
        ],
        answer: 1,
        explanation: "A CBDC is a digital form of sovereign currency issued and backed by the central bank — centralized and a direct central-bank liability. Bitcoin is decentralized and not issued by any government.",
        whyEachWrong: {
            "0": "Stablecoins are typically privately issued, not central-bank liabilities.",
            "2": "A commercial bank deposit is a liability of a private bank, not a central bank digital currency.",
            "3": "A money market fund is an investment product, not sovereign digital currency."
        },
        commonTrap: "Equating CBDCs with cryptocurrencies — CBDCs are centralized and government-issued.",
        studyGuideReference: "digital-currency",
        relatedQuestions: [15, 61],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "Medium"
    },
    {
        id: 61,
        category: "Banking Technology & Fintech",
        subcategory: "Stablecoins",
        tags: ["Banking Technology", "Stablecoin", "Cryptocurrency", "Risk Management", "Payments", "Scenario", "Current Banking Practices", "Reserves"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Stablecoin peg", "Reserve backing", "Run risk"],
        questionType: "scenario",
        scenario: "A stablecoin claims to maintain a 1:1 peg to the U.S. dollar but is later found to lack sufficient liquid reserves to honor mass redemptions.",
        question: "What is the primary risk this exposes?",
        choices: [
            "Interest rate risk only",
            "A 'run' / de-pegging risk if holders rush to redeem and reserves are inadequate",
            "No risk because it's digital",
            "Pure operational risk unrelated to backing"
        ],
        answer: 1,
        explanation: "A stablecoin's stability depends on adequate, liquid reserves. If holders lose confidence and rush to redeem, insufficient reserves can break the peg — analogous to a bank run.",
        whyEachWrong: {
            "0": "The core issue is redemption/run risk, not just rates.",
            "2": "Being digital does not eliminate financial risk.",
            "3": "The risk stems directly from inadequate reserve backing, not merely operations."
        },
        commonTrap: "Assuming a stated 1:1 peg guarantees stability regardless of actual reserve quality.",
        studyGuideReference: "digital-currency",
        relatedQuestions: [60, 12],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "Medium"
    },
    {
        id: 62,
        category: "Banking Technology & Fintech",
        subcategory: "Cloud Computing",
        tags: ["Banking Technology", "Cloud Computing", "Risk Management", "Operational Risk", "Scenario", "Current Banking Practices", "Cybersecurity", "Vendor Risk"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Cloud adoption", "Third-party/vendor risk", "Concentration risk"],
        questionType: "scenario",
        scenario: "A bank migrates core systems to a major cloud provider to cut costs and improve scalability.",
        question: "Which NEW risk consideration does this most directly introduce?",
        choices: [
            "Interest rate risk",
            "Third-party/vendor and concentration risk if the cloud provider fails or is breached",
            "FDIC coverage loss",
            "Loss of the ability to lend money"
        ],
        answer: 1,
        explanation: "Outsourcing infrastructure to a cloud vendor introduces third-party (vendor) risk and concentration risk — the bank now depends on the provider's resilience and security. Regulators expect strong vendor oversight.",
        whyEachWrong: {
            "0": "Cloud migration doesn't directly create interest rate risk.",
            "2": "FDIC coverage applies to deposits regardless of infrastructure.",
            "3": "Cloud adoption doesn't remove lending capability."
        },
        commonTrap: "Assuming cloud migration only reduces cost without introducing dependency and vendor risk.",
        studyGuideReference: "cloud-banking",
        relatedQuestions: [13, 63],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 63,
        category: "Banking Technology & Fintech",
        subcategory: "RegTech",
        tags: ["Banking Technology", "RegTech", "Compliance", "AML", "Risk Management", "Scenario", "Current Banking Practices", "Automation"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Low",
        concepts: ["RegTech", "Automated compliance monitoring"],
        questionType: "scenario",
        scenario: "A bank deploys software that automatically monitors transactions, screens against sanctions lists, and generates compliance reports to meet AML requirements more efficiently.",
        question: "This category of technology is known as:",
        choices: [
            "RegTech (regulatory technology)",
            "InsurTech",
            "PropTech",
            "AdTech"
        ],
        answer: 0,
        explanation: "RegTech uses technology (often AI/automation) to streamline regulatory compliance — transaction monitoring, sanctions screening, KYC, and reporting — reducing cost and error.",
        whyEachWrong: {
            "1": "InsurTech applies technology to insurance.",
            "2": "PropTech applies technology to real estate.",
            "3": "AdTech applies technology to advertising."
        },
        commonTrap: "Confusing RegTech with the broader 'FinTech' label or unrelated 'tech' categories.",
        studyGuideReference: "regtech",
        relatedQuestions: [6, 54],
        formulaUsed: null,
        timeEstimate: 50,
        sourceConfidence: "High"
    },
    {
        id: 64,
        category: "Banking Technology & Fintech",
        subcategory: "Robo-Advisors",
        tags: ["Banking Technology", "Robo-Advisor", "Wealth Management", "Investments", "Fintech", "Scenario", "Current Banking Practices", "Consumer Banking"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Robo-advisor", "Algorithmic portfolio management", "Low-cost investing"],
        questionType: "scenario",
        scenario: "A customer with a modest balance wants automated, low-cost investment management based on her risk tolerance, without a human advisor.",
        question: "Which solution best fits, and what is a key advantage?",
        choices: [
            "A full-service human advisor; lowest cost",
            "A robo-advisor; automated portfolio management at low fees with low minimums",
            "A wire transfer service; instant returns",
            "A CD ladder; guaranteed stock market returns"
        ],
        answer: 1,
        explanation: "Robo-advisors use algorithms to build and rebalance diversified portfolios based on risk tolerance, offering low fees and low minimums — ideal for smaller, cost-conscious investors.",
        whyEachWrong: {
            "0": "Human advisors typically cost MORE, not less.",
            "2": "Wire transfers move money; they do not invest or generate returns.",
            "3": "CDs don't provide stock market returns, and no returns are 'guaranteed' in equities."
        },
        commonTrap: "Believing automated advice means guaranteed returns; robo-advisors manage risk but don't guarantee gains.",
        studyGuideReference: "wealth-tech",
        relatedQuestions: [56, 65],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 65,
        category: "Banking Technology & Fintech",
        subcategory: "Digital Banking Models",
        tags: ["Banking Technology", "Neobank", "Digital Banking", "Fintech", "Scenario", "Current Banking Practices", "Consumer Banking", "Cost Structure"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Neobank", "Branchless banking", "Lower overhead"],
        questionType: "scenario",
        scenario: "A digital-only 'neobank' offers higher savings rates and lower fees than many traditional banks.",
        question: "What primarily allows neobanks to offer these terms?",
        choices: [
            "They are exempt from all banking regulations",
            "Lower overhead from operating without physical branches",
            "They print their own currency",
            "They are insured for unlimited amounts"
        ],
        answer: 1,
        explanation: "Neobanks operate without costly physical branch networks, reducing overhead and allowing them to pass savings to customers via lower fees and higher rates. Many partner with chartered banks for FDIC coverage.",
        whyEachWrong: {
            "0": "Neobanks must still comply with applicable regulations.",
            "2": "No private institution prints currency.",
            "3": "FDIC coverage limits still apply (\$250,000 per category)."
        },
        commonTrap: "Assuming neobanks avoid regulation; their cost advantage comes from being branchless, not lawless.",
        studyGuideReference: "digital-banking-models",
        relatedQuestions: [57, 64],
        formulaUsed: null,
        timeEstimate: 55,
        sourceConfidence: "High"
    },
    {
        id: 66,
        category: "Banking Technology & Fintech",
        subcategory: "Distributed Ledger",
        tags: ["Banking Technology", "Blockchain", "Distributed Ledger", "Smart Contracts", "Payments", "Scenario", "Current Banking Practices", "Settlement"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Smart contracts", "Self-executing code", "Settlement automation"],
        questionType: "scenario",
        scenario: "Two parties create a self-executing agreement on a blockchain that automatically releases payment when delivery is confirmed, without an intermediary.",
        question: "This automated, code-based agreement is called a:",
        choices: [
            "Letter of credit",
            "Smart contract",
            "Promissory note",
            "Wire confirmation"
        ],
        answer: 1,
        explanation: "A smart contract is self-executing code on a blockchain that automatically performs actions (like releasing payment) when predefined conditions are met, reducing the need for intermediaries.",
        whyEachWrong: {
            "0": "A letter of credit is a traditional bank-issued payment guarantee, not self-executing code.",
            "2": "A promissory note is a written promise to pay, not automated.",
            "3": "A wire confirmation merely documents a completed transfer."
        },
        commonTrap: "Confusing a smart contract (automated code) with a traditional letter of credit (bank-mediated guarantee).",
        studyGuideReference: "fintech-blockchain",
        relatedQuestions: [15, 60],
        formulaUsed: null,
        timeEstimate: 70,
        sourceConfidence: "Medium"
    },
    {
        id: 67,
        category: "Banking Technology & Fintech",
        subcategory: "Mobile & Remote Deposit",
        tags: ["Banking Technology", "Mobile Banking", "Remote Deposit Capture", "Check 21", "Payments", "Scenario", "Consumer Banking", "Regulation"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Remote deposit capture", "Check 21 Act", "Substitute checks"],
        questionType: "scenario",
        scenario: "A customer deposits a check by photographing it with a mobile app instead of visiting a branch.",
        question: "Which law made electronic check images legally equivalent to paper, enabling this?",
        choices: [
            "The Check Clearing for the 21st Century Act (Check 21)",
            "The Gramm-Leach-Bliley Act",
            "The CARD Act",
            "The Sarbanes-Oxley Act"
        ],
        answer: 0,
        explanation: "Check 21 (2004) allows banks to create and process 'substitute checks' from electronic images, giving them the same legal standing as the original paper check — the foundation for mobile/remote deposit.",
        whyEachWrong: {
            "1": "GLB addressed banking structure and privacy, not check imaging.",
            "2": "The CARD Act addresses credit card practices.",
            "3": "Sarbanes-Oxley addresses corporate accounting/governance."
        },
        commonTrap: "Attributing mobile deposit to general 'fintech'",
        studyGuideReference: "fintech-blockchain",
        relatedQuestions: [15, 60],
        formulaUsed: null,
        timeEstimate: 70,
        sourceConfidence: "Medium"
    },
    /* ============================================================
     EXPANSION PACK 02 — MIXED ADVANCED NATIONAL TOPICS
     IDs 68–77. Schema-identical to all prior questions.
     DO NOT renumber. Future packs continue at the next id.
     ============================================================ */

    {
        id: 68,
        category: "Lending & Credit",
        subcategory: "Loan Amortization",
        tags: ["Lending", "Amortization", "Interest Rates", "Consumer Banking", "Math", "Scenario", "Mortgages", "Principal and Interest"],
        difficulty: "Hard",
        estimatedNationalFrequency: "High",
        concepts: ["Amortization schedule", "Interest front-loading", "Declining balance"],
        questionType: "calculation",
        scenario: "A customer takes a $200,000 mortgage at a 6% annual rate (0.5% monthly). The first monthly payment is $1,199.10.",
        question: "How much of that FIRST payment goes toward interest, and what does this reveal about amortization?",
        choices: [
            "$1,199.10 — the entire first payment is interest",
            "$1,000.00 interest / $199.10 principal — early payments are interest-heavy",
            "$199.10 interest / $1,000.00 principal — early payments are principal-heavy",
            "$600.00 interest / $599.10 principal — split evenly"
        ],
        answer: 1,
        explanation: "Interest = Balance × Monthly Rate = $200,000 × 0.005 = $1,000. The remaining $199.10 reduces principal. Early in an amortizing loan, most of each payment is interest because the balance is highest; over time the split shifts toward principal.",
        whyEachWrong: {
            "0": "Part of the payment ($199.10) reduces principal, so it is not all interest.",
            "2": "This reverses the figures — early payments are interest-heavy, not principal-heavy.",
            "3": "The split is not even; interest dominates early in the schedule."
        },
        commonTrap: "Assuming each payment splits principal and interest evenly, ignoring that interest is front-loaded on the declining balance.",
        studyGuideReference: "amortization",
        relatedQuestions: [8, 69],
        formulaUsed: "Monthly Interest = Outstanding Balance × Monthly Rate",
        timeEstimate: 85,
        sourceConfidence: "High"
    },
    {
        id: 69,
        category: "Lending & Credit",
        subcategory: "Loan Pricing",
        tags: ["Lending", "Prime Rate", "Interest Rates", "Commercial Banking", "Credit Analysis", "Scenario", "Risk-Based Pricing", "Spread"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Prime + spread pricing", "Risk-based pricing", "Floating rates"],
        questionType: "scenario",
        scenario: "A bank prices a business loan at 'Prime + 2%.' The prime rate is currently 7.5%. A riskier borrower is quoted 'Prime + 4%.'",
        question: "What does this pricing structure illustrate, and what rate does the riskier borrower pay?",
        choices: [
            "Fixed pricing; both pay 7.5%",
            "Risk-based pricing; the riskier borrower pays 11.5%",
            "Risk-based pricing; the riskier borrower pays 9.5%",
            "Usury-capped pricing; the riskier borrower pays 7.5%"
        ],
        answer: 1,
        explanation: "Adding a spread to the prime rate is risk-based pricing — higher-risk borrowers pay larger spreads. Prime (7.5%) + 4% = 11.5%. As prime moves, the loan rate floats with it.",
        whyEachWrong: {
            "0": "This is floating, risk-based pricing, not a single fixed rate for all.",
            "2": "9.5% uses the +2% spread, not the riskier borrower's +4% spread.",
            "3": "Usury caps limit maximum rates but don't set this 7.5% figure here."
        },
        commonTrap: "Applying the wrong spread, or assuming prime-based loans are fixed rather than floating.",
        studyGuideReference: "loan-pricing",
        relatedQuestions: [8, 68],
        formulaUsed: "Loan Rate = Prime Rate + Risk Spread",
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 70,
        category: "Financial Statements & Ratios",
        subcategory: "Efficiency & Coverage",
        tags: ["Financial Ratios", "Efficiency Ratio", "Commercial Banking", "Profitability", "Math", "Scenario", "Cost Management", "Bank Analysis"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Efficiency ratio", "Operating expenses to revenue", "Lower is better"],
        questionType: "calculation",
        scenario: "A bank has $80 million in operating (noninterest) expenses and $200 million in revenue (net interest income plus noninterest income).",
        question: "What is the bank's efficiency ratio, and how should it be interpreted?",
        choices: [
            "250% — extremely inefficient",
            "40% — the bank spends $0.40 to generate each $1 of revenue, which is strong",
            "40% — higher is always better",
            "120% — the bank is losing money on operations"
        ],
        answer: 1,
        explanation: "Efficiency Ratio = Operating Expenses / Revenue = $80M / $200M = 40%. It measures cost per dollar of revenue; LOWER is better. A ratio around 50% or below is generally considered strong for a bank.",
        whyEachWrong: {
            "0": "250% inverts the formula (revenue/expenses).",
            "2": "The ratio is 40%, but LOWER is better, not higher.",
            "3": "120% miscalculates; the result is 40%, not a loss signal."
        },
        commonTrap: "Treating the efficiency ratio like profitability ratios where higher is better — for the efficiency ratio, LOWER is better.",
        studyGuideReference: "bank-ratios",
        relatedQuestions: [10, 11],
        formulaUsed: "Efficiency Ratio = Noninterest Expense / (Net Interest Income + Noninterest Income)",
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 71,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Interest on Reserves",
        tags: ["Federal Reserve", "Monetary Policy", "Interest on Reserves", "IORB", "Federal Funds Rate", "Scenario", "Economics", "Current Banking Practices"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Interest on reserve balances", "Modern policy implementation", "Rate floor"],
        questionType: "scenario",
        scenario: "In the modern 'ample reserves' framework, the Fed raises the interest rate it pays banks on their reserve balances (IORB).",
        question: "How does this primarily influence the federal funds rate?",
        choices: [
            "It has no effect on the federal funds rate",
            "It sets a floor — banks won't lend to each other for less than they earn risk-free at the Fed, pushing the fed funds rate up",
            "It directly forces Congress to raise taxes",
            "It eliminates the need for open market operations forever"
        ],
        answer: 1,
        explanation: "IORB acts as a floor for the federal funds rate. A bank won't lend reserves to another bank for less than it can earn risk-free by parking them at the Fed. Raising IORB pulls the fed funds rate up — the Fed's main modern tool.",
        whyEachWrong: {
            "0": "IORB is the Fed's primary modern rate-setting lever, so it has a strong effect.",
            "2": "IORB is monetary policy; it does not control fiscal (tax) policy.",
            "3": "OMO and other tools still support the framework; IORB doesn't make them obsolete forever."
        },
        commonTrap: "Relying only on the old textbook 'reserve requirement' model and missing that IORB is now the Fed's key implementation tool.",
        studyGuideReference: "fed-monetary",
        relatedQuestions: [1, 2],
        formulaUsed: null,
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 72,
        category: "International Banking",
        subcategory: "Foreign Exchange",
        tags: ["International Banking", "Foreign Exchange", "Currency Conversion", "Math", "Scenario", "Commercial Banking", "Exchange Rates", "Trade Finance"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Exchange rate conversion", "Direct vs indirect quotes", "Currency appreciation"],
        questionType: "calculation",
        scenario: "A U.S. importer must pay a European supplier €50,000. The exchange rate is $1.10 per €1.",
        question: "How many U.S. dollars are needed, and what happens to the cost if the euro later strengthens to $1.20?",
        choices: [
            "$45,454; cost falls if the euro strengthens",
            "$55,000 now; cost RISES to $60,000 if the euro strengthens to $1.20",
            "$55,000 now; cost falls to $50,000 if the euro strengthens",
            "$50,000 now; exchange rates never affect importers"
        ],
        answer: 1,
        explanation: "€50,000 × $1.10 = $55,000. If the euro strengthens to $1.20, the same €50,000 costs €50,000 × $1.20 = $60,000. A stronger euro makes European goods more expensive for U.S. buyers.",
        whyEachWrong: {
            "0": "$45,454 divides instead of multiplying, and a stronger euro raises (not lowers) the cost.",
            "2": "A stronger euro increases the dollar cost; it does not fall to $50,000.",
            "3": "$50,000 ignores the exchange rate; rates clearly affect importers."
        },
        commonTrap: "Confusing the direction: a STRONGER foreign currency makes that country's goods MORE expensive for the importer.",
        studyGuideReference: "intl-forex",
        relatedQuestions: [17, 16],
        formulaUsed: "Cost in USD = Foreign Amount × Exchange Rate (USD per unit)",
        timeEstimate: 70,
        sourceConfidence: "High"
    },
    {
        id: 73,
        category: "Risk Management",
        subcategory: "Asset-Liability Management",
        tags: ["Risk Management", "Asset-Liability Management", "Interest Rate Risk", "Gap Analysis", "Commercial Banking", "Scenario", "Net Interest Margin", "Duration"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Rate-sensitivity gap", "Repricing mismatch", "ALM"],
        questionType: "scenario",
        scenario: "A bank has many long-term fixed-rate assets funded by short-term liabilities that reprice quickly. Market interest rates rise sharply.",
        question: "What happens to the bank's net interest margin, and what concept explains it?",
        choices: [
            "NIM widens; the bank benefits from a positive gap",
            "NIM compresses; its short-term funding costs rise faster than its fixed asset yields — a negative repricing gap",
            "NIM is unaffected because banks are immune to rate changes",
            "NIM compresses only if the Fed lowers rates"
        ],
        answer: 1,
        explanation: "With liabilities repricing faster than assets (a negative/liability-sensitive gap), rising rates increase funding costs immediately while asset yields stay locked in. The spread — and net interest margin — compresses. This is core asset-liability management (ALM).",
        whyEachWrong: {
            "0": "This bank is liability-sensitive (negative gap), so rising rates hurt, not help.",
            "2": "Banks are highly exposed to rate changes through repricing mismatches.",
            "3": "The compression occurs when rates RISE in this structure, not when they fall."
        },
        commonTrap: "Ignoring the timing/repricing mismatch and assuming all banks benefit when rates rise.",
        studyGuideReference: "risk-types",
        relatedQuestions: [12, 13],
        formulaUsed: "Repricing Gap = Rate-Sensitive Assets − Rate-Sensitive Liabilities",
        timeEstimate: 85,
        sourceConfidence: "High"
    },
    {
        id: 74,
        category: "Financial Statements & Ratios",
        subcategory: "Bond Valuation",
        tags: ["Investments", "Bonds", "Interest Rates", "Yield", "Math", "Scenario", "Risk Management", "Fixed Income"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Bond price-yield inverse relationship", "Premium vs discount bonds", "Coupon vs market rate"],
        questionType: "scenario",
        scenario: "A bond has a 4% coupon. After issuance, prevailing market interest rates for similar bonds rise to 6%.",
        question: "Will the bond now trade at a premium, at par, or at a discount, and why?",
        choices: [
            "At a premium, because higher rates make all bonds more valuable",
            "At a discount, because its 4% coupon is below the 6% market rate, so its price must fall to remain competitive",
            "At par, because coupon rates never affect price",
            "At a premium, because the coupon is fixed"
        ],
        answer: 1,
        explanation: "Bond prices move inversely to rates. With market rates at 6%, a 4% coupon bond is less attractive, so its price falls below face value (a discount) until its effective yield matches the 6% market.",
        whyEachWrong: {
            "0": "Higher market rates LOWER existing bond prices, not raise them.",
            "2": "Coupon rate relative to market rate directly determines premium/discount pricing.",
            "3": "A fixed coupon below market causes a discount, not a premium."
        },
        commonTrap: "Forgetting the inverse relationship — when rates rise above the coupon, the bond sells at a DISCOUNT.",
        studyGuideReference: "bond-valuation",
        relatedQuestions: [13, 33],
        formulaUsed: "Coupon < Market Rate → Discount; Coupon > Market Rate → Premium",
        timeEstimate: 80,
        sourceConfidence: "High"
    },
    {
        id: 75,
        category: "Consumer Banking & Deposit Products",
        subcategory: "Funds Availability",
        tags: ["Consumer Banking", "Regulation CC", "Funds Availability", "Banking Regulations", "Scenario", "Compliance", "Check Holds", "Deposit Products"],
        difficulty: "Medium",
        estimatedNationalFrequency: "Medium",
        concepts: ["Regulation CC", "Funds availability", "Check hold periods"],
        questionType: "scenario",
        scenario: "A customer deposits a check and is told that part of the funds will be available the next business day, with a hold on the remainder. She asks which rule governs how long a bank may hold her deposit.",
        question: "Which regulation sets these funds-availability requirements?",
        choices: [
            "Regulation Z (Truth in Lending)",
            "Regulation CC (Expedited Funds Availability Act)",
            "Regulation E (Electronic Fund Transfers)",
            "Regulation DD (Truth in Savings)"
        ],
        answer: 1,
        explanation: "Regulation CC implements the Expedited Funds Availability Act, governing how quickly banks must make deposited funds available and the maximum permissible hold periods, with required disclosures to customers.",
        whyEachWrong: {
            "0": "Reg Z governs credit cost disclosures (APR), not deposit holds.",
            "2": "Reg E governs electronic transfers and debit-card error/fraud rights.",
            "3": "Reg DD governs savings-account disclosures (APY), not funds availability."
        },
        commonTrap: "Confusing the four major consumer regs — pair Reg CC with funds availability / check holds.",
        studyGuideReference: "consumer-regs",
        relatedQuestions: [7, 29],
        formulaUsed: null,
        timeEstimate: 60,
        sourceConfidence: "High"
    },
    {
        id: 76,
        category: "Ethics & Financial Literacy",
        subcategory: "Conflicts of Interest",
        tags: ["Ethics", "Conflicts of Interest", "Fiduciary Duty", "Sales Practices", "Scenario", "Consumer Banking", "Compliance", "Suitability"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Suitability", "Sales incentives vs customer interest", "Ethical conduct"],
        questionType: "scenario",
        scenario: "A banker earns a large commission for selling a complex, high-fee investment product. A retired customer with low risk tolerance and a short time horizon asks for a safe place to keep emergency savings.",
        question: "What is the most ethical and appropriate action?",
        choices: [
            "Sell the high-fee product to maximize the commission",
            "Recommend a suitable low-risk option (e.g., insured savings or a CD), prioritizing the customer's needs over personal incentives",
            "Refuse to help the customer at all",
            "Persuade the customer to take on more risk than they want"
        ],
        answer: 1,
        explanation: "Ethical banking requires recommending products SUITABLE for the customer's stated needs and risk tolerance. An emergency fund calls for safe, liquid, insured options — not a high-fee, complex investment that benefits the banker.",
        whyEachWrong: {
            "0": "Prioritizing commission over suitability is a conflict of interest and unethical.",
            "2": "Refusing service fails the customer; the banker should help appropriately.",
            "3": "Pushing unwanted risk violates suitability and the customer's wishes."
        },
        commonTrap: "Letting a personal incentive (commission) override the duty to recommend suitable products.",
        studyGuideReference: "banking-ethics",
        relatedQuestions: [21, 55],
        formulaUsed: null,
        timeEstimate: 75,
        sourceConfidence: "High"
    },
    {
        id: 77,
        category: "Federal Reserve & Monetary Policy",
        subcategory: "Yield Curve",
        tags: ["Federal Reserve", "Monetary Policy", "Yield Curve", "Interest Rates", "Recession Indicators", "Scenario", "Economics", "Bonds"],
        difficulty: "Hard",
        estimatedNationalFrequency: "Medium",
        concepts: ["Inverted yield curve", "Recession signal", "Term structure of rates"],
        questionType: "scenario",
        scenario: "Short-term Treasury yields rise above long-term Treasury yields, producing an 'inverted' yield curve.",
        question: "What does an inverted yield curve traditionally signal, and why?",
        choices: [
            "Strong, accelerating economic growth ahead",
            "A potential upcoming recession — investors expect future rates (and growth) to fall, so they accept lower long-term yields",
            "That the Fed has lost all control of rates",
            "Guaranteed deflation within one month"
        ],
        answer: 1,
        explanation: "A normal yield curve slopes upward (longer maturities pay more). When it inverts, investors expect future rates and growth to decline, often anticipating Fed rate cuts — historically a reliable (though not certain) recession warning.",
        whyEachWrong: {
            "0": "An upward-sloping curve, not an inverted one, signals expected growth.",
            "2": "Inversion reflects market expectations, not a loss of Fed control.",
            "3": "It signals heightened recession risk over months, not guaranteed deflation in a month."
        },
        commonTrap: "Reading an inverted curve as bullish; historically it is one of the most-watched recession warning signals.",
        studyGuideReference: "yield-curve",
        relatedQuestions: [26, 74],
        formulaUsed: null,
        timeEstimate: 80,
        sourceConfidence: "High"
    }

    /* ============================================================
       END EXPANSION PACK 02 — next pack continues at id:78
       ============================================================ */


    /* ============================================================
       CONTINUATION ZONE — IDs 31–100 follow the identical schema.
       They are distributed to hit the difficulty mix:
          Easy   ≈ 20%  (20 questions)
          Medium ≈ 45%  (45 questions)
          Hard   ≈ 35%  (35 questions)
       and spread across all categories per the research weights.
       Future prompts: append id:101, 102, ... here.
       DO NOT edit or renumber IDs 1–30 above.
       ============================================================ */
];

/* Expose globally for non-module offline use */
if (typeof window !== "undefined") window.QUESTIONS = QUESTIONS;