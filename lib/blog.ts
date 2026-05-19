// lib/blog.ts
// Central data layer for all blog posts.
// Replace with a CMS (Contentful, Sanity, Notion) or MDX files when ready.

export interface BlogPost {
  slug:          string
  title:         string
  excerpt:       string
  category:      string
  date:          string          // ISO: YYYY-MM-DD
  readTime:      string
  author:        string
  authorRole:    string
  ogImage:       string
  content:       BlogSection[]
  relatedSlugs?: string[]
}

export interface BlogSection {
  type:    'paragraph' | 'h2' | 'h3' | 'list' | 'callout' | 'table'
  text?:   string
  items?:  string[]
  label?:  string               // callout label e.g. "Quick Tip"
  headers?: string[]            // table headers
  rows?:   string[][]           // table rows
}

export const posts: BlogPost[] = [
  // ─── 1 ───────────────────────────────────────────────────────
  {
    slug:       'what-is-dscr-loan',
    title:      'What Is a DSCR Loan and Is It Right for Your Rental Portfolio?',
    excerpt:    'Debt Service Coverage Ratio loans have become one of the most popular financing tools for buy-and-hold investors. Here\'s everything you need to know before applying.',
    category:   'DSCR Rental',
    date:       '2026-04-10',
    readTime:   '6 min read',
    author:     'Integrated Capital Solutions',
    authorRole: 'Lending Team',
    ogImage:    '/rental.JPG',
    relatedSlugs: ['how-to-scale-rental-portfolio','bridge-loan-vs-hard-money'],
    content: [
      { type:'paragraph', text:'If you\'ve been investing in rental properties for any length of time, you\'ve probably heard the acronym DSCR thrown around. But what exactly is a DSCR loan, how does it work, and is it the right tool for your portfolio? This guide breaks it down.' },
      { type:'h2', text:'What Does DSCR Mean?' },
      { type:'paragraph', text:'DSCR stands for Debt Service Coverage Ratio. It\'s a metric that measures whether a property generates enough rental income to cover its debt payments. The formula is straightforward:' },
      { type:'callout', label:'Formula', text:'DSCR = Monthly Rental Income ÷ Monthly Debt Payment (PITIA)' },
      { type:'paragraph', text:'A DSCR of 1.0 means the property\'s income exactly covers its debt. A DSCR of 1.25 means income is 25% higher than the debt payment - a comfortable buffer. A DSCR below 1.0 means the property doesn\'t fully cover its own payment from rental income alone.' },
      { type:'h2', text:'How Is a DSCR Loan Different from a Conventional Mortgage?' },
      { type:'paragraph', text:'A conventional mortgage qualifies you based on your personal income - W-2s, tax returns, employment verification. A DSCR loan qualifies you based entirely on the property\'s income. Your personal income is not verified.' },
      { type:'paragraph', text:'This makes DSCR loans especially valuable for investors who are self-employed, have complex tax returns with significant deductions, or already own multiple properties and want to keep growing without hitting conventional loan limits.' },
      { type:'h2', text:'What Are Integrated Capital Solutions\'s DSCR Loan Parameters?' },
      { type:'table',
        headers: ['Parameter','Integrated Capital Solutions Offering'],
        rows: [
          ['Loan Term','30 Years'],
          ['Loan Amount','$75,000 – $2,500,000'],
          ['Max LTV','Up to 80% (purchase), Up to 75% (cash-out)'],
          ['Minimum DSCR','As low as 0.75'],
          ['Property Types','SFR, Condo, 2–4 Plex, Multifamily up to 9 units'],
          ['Short-Term Rentals','Eligible (Airbnb/VRBO income accepted)'],
          ['Rate Lock','Free 30-day rate lock at application'],
        ]
      },
      { type:'h2', text:'Who Is a DSCR Loan Best For?' },
      { type:'list', items:[
        'Self-employed investors whose tax returns don\'t reflect their true cash flow',
        'Investors with 5+ properties who\'ve exceeded conventional loan limits',
        'Buyers of short-term rentals (Airbnb, VRBO) where rental income is projected',
        'Investors looking to cash-out refinance a stabilized rental without income docs',
        'Portfolio builders who want to scale without income documentation slowing them down',
      ]},
      { type:'h2', text:'What Minimum DSCR Does Integrated Capital Solutions Accept?' },
      { type:'paragraph', text:'Integrated Capital Solutions accepts a minimum DSCR as low as 0.75. This is more flexible than many lenders, who require a DSCR of 1.0 or higher. A DSCR below 1.0 doesn\'t necessarily mean a bad investment - it may simply mean you\'re buying in a high-appreciation market where long-term equity gains outweigh near-term cash flow gaps.' },
      { type:'h2', text:'Can I Use Short-Term Rental Income for DSCR Qualification?' },
      { type:'paragraph', text:'Yes. Integrated Capital Solutions allows projected short-term rental income (from platforms like Airbnb and VRBO) to be used for DSCR qualification. This opens the door for investors building STR portfolios in vacation markets, urban cores, and other high-demand locations.' },
      { type:'h2', text:'How Do I Get Started?' },
      { type:'paragraph', text:'Getting a DSCR loan with Integrated Capital Solutions starts with a quick loan inquiry. You\'ll receive a term sheet within 24 hours and can close in as few as 10 days. No personal income documentation, no W-2s - just the property\'s numbers.' },
      { type:'callout', label:'Ready to apply?', text:'Visit Integrated Capital Solutionscapital.com/app to submit your loan inquiry and receive a term sheet within 24 hours.' },
    ],
  },

  // ─── 2 ───────────────────────────────────────────────────────
  {
    slug:       'fix-flip-market-2026',
    title:      'Fix and Flip Market Outlook: What Investors Need to Know in 2026',
    excerpt:    'Rising inventory and shifting buyer demand are creating new opportunities for renovation investors. Here\'s how to position your strategy for the current market.',
    category:   'Fix & Flip',
    date:       '2026-03-28',
    readTime:   '8 min read',
    author:     'Integrated Capital Solutions',
    authorRole: 'Market Analysis Team',
    ogImage:    '/fix-worker.jpg',
    relatedSlugs: ['bridge-loan-vs-hard-money','ground-up-construction-checklist'],
    content: [
      { type:'paragraph', text:'The fix-and-flip market has always been sensitive to interest rates, housing inventory, and buyer demand. As we move through 2026, several macro trends are converging to create both new challenges and genuine opportunity for experienced renovation investors.' },
      { type:'h2', text:'More Inventory, More Deals' },
      { type:'paragraph', text:'One of the most significant shifts in the current market is the gradual return of housing inventory. After years of historically low supply, more sellers are coming to market - including distressed sellers, estate sales, and investors who bought during the low-rate era and now need to exit.' },
      { type:'paragraph', text:'For fix-and-flip investors, more inventory means more deal flow. The key is identifying properties where the gap between the current condition price and the post-renovation ARV (After-Repair Value) is large enough to generate a meaningful profit after carrying costs and financing.' },
      { type:'h2', text:'Buyer Demand Has Shifted - Adapt Your Target Product' },
      { type:'paragraph', text:'Today\'s buyers are more selective. Move-in-ready properties in the right price bands continue to sell quickly. Properties that are over-improved for their neighborhood, or renovated to a taste that doesn\'t match the local buyer pool, are sitting longer.' },
      { type:'paragraph', text:'The investors winning right now are those who understand exactly who their end buyer is before they buy the deal - and renovate precisely to meet that buyer\'s expectations, not to showcase personal taste.' },
      { type:'h2', text:'Key Metrics to Underwrite Every Deal in 2026' },
      { type:'table',
        headers: ['Metric','Target Range'],
        rows: [
          ['Purchase Price + Rehab vs ARV','70% rule or better (all-in ≤ 70% of ARV)'],
          ['Holding Period','Under 6 months wherever possible'],
          ['After-Repair Value Confidence','Verified comps sold within 90 days, 1-mile radius'],
          ['Contingency Reserve','10–15% of rehab budget'],
          ['Days on Market (local)','Under 30 days for confidence in exit'],
        ]
      },
      { type:'h2', text:'How Fast Financing Gives You a Competitive Edge' },
      { type:'paragraph', text:'In a market with more inventory, sellers still favor certainty and speed - especially distressed sellers. Investors who can close in 7 days have a significant advantage over those whose financing takes 30–45 days.' },
      { type:'paragraph', text:'Integrated Capital Solutions Fix & Flip loans close in as few as 7 days, with term sheets delivered within 24 hours. Up to 95% LTC and 100% of rehab costs covered means you can preserve capital across multiple deals simultaneously.' },
      { type:'h2', text:'Strategies That Are Working Right Now' },
      { type:'list', items:[
        'Targeting the $300K–$500K price range in suburban markets with strong job growth',
        'Buying properties that need cosmetic and light structural work - avoiding full gut renovations that compress margins',
        'Partnering with local agents who can identify pocket listings and pre-market opportunities',
        'Running tight scopes of work with contingency budgets built in from day one',
        'Using bridge loans to acquire and stabilize before refinancing into a long-term hold',
      ]},
      { type:'callout', label:'Tip', text:'Always verify your ARV with at least three comparable sales within the past 90 days and within a 1-mile radius. In a shifting market, comps from 6 months ago may not reflect today\'s buyer appetite.' },
    ],
  },

  // ─── 3 ───────────────────────────────────────────────────────
  {
    slug:       'ground-up-construction-checklist',
    title:      'Ground-Up Construction Loan Checklist: What to Prepare Before You Apply',
    excerpt:    'Get approved faster with the right documentation. Our construction lending team shares exactly what underwriters look for in a ground-up loan submission.',
    category:   'Ground Up',
    date:       '2026-03-14',
    readTime:   '5 min read',
    author:     'Integrated Capital Solutions',
    authorRole: 'Construction Lending Team',
    ogImage:    '/construct.JPG',
    relatedSlugs: ['construction-draw-process-explained','fix-flip-market-2026'],
    content: [
      { type:'paragraph', text:'Ground-up construction loans move fast when the file is complete. The single biggest reason applications stall isn\'t credit, experience, or deal quality - it\'s incomplete documentation. This checklist walks you through exactly what Integrated Capital Solutions\'s underwriting team needs to process your loan quickly.' },
      { type:'h2', text:'Borrower & Entity Documents' },
      { type:'list', items:[
        'Operating agreement or articles of organization for your LLC or entity',
        'Government-issued ID for all guarantors',
        'Track record: list of completed ground-up projects in the past 36 months (address, sq ft, cost, completion date)',
        'Credit authorization (Integrated Capital Solutions requires minimum 680 FICO)',
        'Background on your general contractor if using a third party',
      ]},
      { type:'h2', text:'Property Documents' },
      { type:'list', items:[
        'Purchase contract or proof of land ownership (if already owned)',
        'Preliminary title report',
        'Survey or plat map',
        'Current photos of the lot',
        'Zoning confirmation letter from the municipality (if applicable)',
        'Approved building permits (or permit application status)',
      ]},
      { type:'h2', text:'Construction Budget & Plans' },
      { type:'paragraph', text:'This is the most important part of your file. Underwriters need to validate that your budget is realistic, your plans are approved, and your timeline is achievable.' },
      { type:'list', items:[
        'Detailed hard cost budget broken down by trade (Integrated Capital Solutions provides a blank budget spreadsheet on the Construction Draw page)',
        'Soft cost budget (permits, architecture, engineering, utilities)',
        'Signed contractor proposal or executed construction contract',
        'Architectural plans - at minimum schematic/design development; permitted plans preferred',
        'Construction timeline with phase milestones',
        'Contractor license number and proof of liability insurance',
      ]},
      { type:'h2', text:'Financial & Exit Documents' },
      { type:'list', items:[
        'Evidence of equity contribution / proof of funds for down payment',
        'Comparable sales analysis supporting your projected completion value (ARV)',
        'Exit strategy: presale contract, or post-construction refinance plan',
        'Reserve documentation (Integrated Capital Solutions requires cash reserves post-close)',
      ]},
      { type:'h2', text:'What Happens After You Submit?' },
      { type:'paragraph', text:'Once Integrated Capital Solutions receives a complete submission, a term sheet is delivered within 24 hours. Underwriting typically runs in parallel with the appraisal order, allowing closings in 7–14 days from a complete file.' },
      { type:'callout', label:'Download', text:'Get Integrated Capital Solutions\'s blank construction budget spreadsheet and lien waiver forms at Integrated Capital Solutionscapital.com/construction-draw' },
      { type:'h2', text:'Common Mistakes That Delay Approvals' },
      { type:'list', items:[
        'Submitting a budget without line-item detail - lump sums get flagged every time',
        'Missing contractor license or insurance documentation',
        'Comps that are too far in distance or too old in time',
        'Entity documents that don\'t match the borrowing entity on the purchase contract',
        'No clear exit strategy documented in the file',
      ]},
    ],
  },

  // ─── 4 ───────────────────────────────────────────────────────
  {
    slug:       'bridge-loan-vs-hard-money',
    title:      'Bridge Loan vs. Hard Money: What\'s the Difference?',
    excerpt:    'Many investors use these terms interchangeably, but they\'re not the same. Understanding the difference can save you time and money on your next deal.',
    category:   'Bridge Loan',
    date:       '2026-02-20',
    readTime:   '4 min read',
    author:     'Integrated Capital Solutions',
    authorRole: 'Lending Team',
    ogImage:    '/financing.jpg',
    relatedSlugs: ['what-is-dscr-loan','fix-flip-market-2026'],
    content: [
      { type:'paragraph', text:'Real estate investors frequently use the terms "bridge loan" and "hard money loan" as if they mean the same thing. In practice, they overlap significantly - but there are important distinctions in terms, pricing, speed, and the type of lender behind the product.' },
      { type:'h2', text:'What Is a Hard Money Loan?' },
      { type:'paragraph', text:'Hard money is a colloquial term for short-term, asset-based lending where the primary underwriting criterion is the property\'s value - not the borrower\'s creditworthiness or income. The term "hard" refers to the hard asset (the property) securing the loan.' },
      { type:'paragraph', text:'Hard money lenders are often private individuals, small funds, or local lenders. They may offer faster closings but typically charge higher rates (12–18%+), higher points (2–5+), and shorter terms. Underwriting standards can vary widely.' },
      { type:'h2', text:'What Is a Bridge Loan?' },
      { type:'paragraph', text:'A bridge loan is a short-term financing solution designed to "bridge" a gap - between buying and selling, between acquisition and stabilization, or between construction completion and permanent financing.' },
      { type:'paragraph', text:'Bridge loans can be made by both institutional lenders and private lenders. When made by an institutional private lender like Integrated Capital Solutions, they feature more competitive pricing, clear underwriting standards, and a more defined product structure than traditional hard money.' },
      { type:'h2', text:'Side-by-Side Comparison' },
      { type:'table',
        headers: ['Factor','Hard Money (Traditional)','Bridge Loan (Institutional)'],
        rows: [
          ['Rates','12–18%+','More competitive, depends on LTV/risk'],
          ['Points','2–5+ origination points','Typically 1–3 points'],
          ['Term','3–12 months','6–24 months'],
          ['Underwriting','Asset-only, minimal standards','Asset + borrower experience'],
          ['Prepayment Penalty','Common','Often none (e.g., Integrated Capital Solutions Bridge)'],
          ['Speed','Very fast, can be days','7–14 days for institutional lenders'],
          ['Lender Type','Private individual / small fund','Institutional private lender'],
        ]
      },
      { type:'h2', text:'When Should You Use Each?' },
      { type:'paragraph', text:'If you need money in 48 hours and can\'t meet any standard documentation requirements, a traditional hard money lender might be your only option. If you have a week and can provide basic property and experience documentation, an institutional bridge lender like Integrated Capital Solutions will almost always give you better pricing, better terms, and a more reliable closing.' },
      { type:'h2', text:'Integrated Capital Solutions Bridge Loan Parameters' },
      { type:'list', items:[
        'Loan amounts: $150,000 to $5M+',
        'Terms: 6 to 15 months',
        'LTV: up to 80% on acquisition, up to 75% cash-out',
        'No prepayment penalties',
        'Closings as fast as 7 days',
        'Path to transition into a 30-year DSCR rental loan',
      ]},
      { type:'callout', label:'Bottom line', text:'Bridge loans and hard money are related products, but the lender matters enormously. An institutional bridge lender offers better pricing, more reliability, and a cleaner experience - often at the same or better speed.' },
    ],
  },

  // ─── 5 ───────────────────────────────────────────────────────
  {
    slug:       'how-to-scale-rental-portfolio',
    title:      'How to Scale a Rental Portfolio Using DSCR Loans',
    excerpt:    'No income verification. No limit on properties. Here\'s how experienced investors are using DSCR financing to build and scale portfolios faster than ever.',
    category:   'DSCR Rental',
    date:       '2026-02-05',
    readTime:   '7 min read',
    author:     'Integrated Capital Solutions',
    authorRole: 'Lending Team',
    ogImage:    '/house.jpg',
    relatedSlugs: ['what-is-dscr-loan','bridge-loan-vs-hard-money'],
    content: [
      { type:'paragraph', text:'The biggest obstacle most buy-and-hold investors hit isn\'t finding deals - it\'s financing them. Conventional loans cap out at 10 financed properties. Income documentation gets harder to satisfy as your portfolio grows and your tax returns get more complex. DSCR loans solve both problems.' },
      { type:'h2', text:'Why DSCR Is the Preferred Tool for Portfolio Builders' },
      { type:'list', items:[
        'No personal income verification - qualification is based entirely on property cash flow',
        'No limit on the number of properties you can finance this way',
        'Works for investors with complex tax returns who write off significant depreciation and expenses',
        'Available for short-term rentals where income is projected, not just historical',
        'Can be used to cash-out refinance existing rentals and redeploy equity into new acquisitions',
      ]},
      { type:'h2', text:'The DSCR Portfolio Building Strategy' },
      { type:'paragraph', text:'Sophisticated investors use DSCR loans as part of a repeatable acquisition loop: acquire with a bridge loan or cash, stabilize and lease up, then refinance into a 30-year DSCR loan to pull out equity and recycle capital into the next deal.' },
      { type:'h2', text:'A Simplified Acquisition Loop' },
      { type:'table',
        headers:['Step','Action','Tool'],
        rows:[
          ['1','Acquire off-market or distressed property','Bridge loan or cash'],
          ['2','Renovate and lease up to market rent','Rehab budget / bridge draws'],
          ['3','Property is stabilized with a tenant','-'],
          ['4','Refinance into 30-yr DSCR loan','DSCR rental loan (up to 75% cashout)'],
          ['5','Redeploy equity into next acquisition','Start loop again'],
        ]
      },
      { type:'h2', text:'What DSCR Do You Need for This to Work?' },
      { type:'paragraph', text:'The key variable is whether the stabilized rent covers the projected DSCR loan payment. Integrated Capital Solutions accepts DSCR as low as 0.75, which gives you flexibility in higher-priced markets or with properties in the early lease-up phase.' },
      { type:'paragraph', text:'To stress-test a deal, use the projected DSCR loan payment at the rate you expect to qualify at, and divide that by the stabilized monthly rent. If the result is 0.75 or higher, you\'re likely in range.' },
      { type:'h2', text:'Short-Term Rentals and DSCR' },
      { type:'paragraph', text:'Investors in vacation rental markets face a unique challenge: STR income is often higher than long-term rental income, but it\'s less consistent and harder to document. Integrated Capital Solutions accepts projected STR income for DSCR qualification, which opens this strategy to Airbnb and VRBO investors who are building in destination markets.' },
      { type:'callout', label:'Key insight', text:'DSCR loans don\'t count against your conventional loan limits and don\'t require income verification. They\'re one of the few truly scalable financing tools available to residential investors.' },
    ],
  },

  // ─── 6 ───────────────────────────────────────────────────────
  {
    slug:       'construction-draw-process-explained',
    title:      'The Construction Draw Process Explained: A Step-by-Step Guide',
    excerpt:    'Understanding how construction draws work - and how to submit them correctly - keeps your project funded and on schedule from groundbreaking to certificate of occupancy.',
    category:   'Ground Up',
    date:       '2026-01-22',
    readTime:   '6 min read',
    author:     'Integrated Capital Solutions',
    authorRole: 'Construction Lending Team',
    ogImage:    '/contruction-worker.JPG',
    relatedSlugs: ['ground-up-construction-checklist','bridge-loan-vs-hard-money'],
    content: [
      { type:'paragraph', text:'One of the most common points of friction on a ground-up construction loan isn\'t the approval - it\'s the draws. Builders who understand how the draw process works move faster, avoid cash flow gaps, and keep their projects on schedule. Here\'s exactly how it works at Integrated Capital Solutions.' },
      { type:'h2', text:'What Is a Construction Draw?' },
      { type:'paragraph', text:'When you close a ground-up construction loan, the full loan amount isn\'t disbursed upfront. Instead, funds are held in a controlled account and released in stages as construction milestones are completed. Each release of funds is called a "draw."' },
      { type:'paragraph', text:'This protects both the lender and the borrower - you only borrow what you\'ve actually spent, and you pay interest only on what has been drawn, not on the total loan commitment.' },
      { type:'h2', text:'The Integrated Capital Solutions Draw Process - Step by Step' },
      { type:'table',
        headers:['Step','What Happens','Timeline'],
        rows:[
          ['1. Submit Draw Request','Borrower submits a draw request through the Trustpoint portal with a budget breakdown of completed work','Day 1'],
          ['2. Inspection Ordered','Integrated Capital Solutions orders a third-party inspection to verify the work claimed in the draw request','Day 1–2'],
          ['3. Inspector Visits','Licensed inspector visits the site and verifies completed work against the draw request','Day 2–3'],
          ['4. Inspection Report Reviewed','Integrated Capital Solutions reviews the inspection report and approved draw amount','Day 3'],
          ['5. Funds Disbursed','Approved draw funds are wired to borrower\'s account','Within 24 hours of approval'],
        ]
      },
      { type:'h2', text:'What Do I Need to Submit a Draw?' },
      { type:'list', items:[
        'Completed draw request form via the Trustpoint portal',
        'Budget breakdown showing work completed by line item',
        'Lien waivers from all contractors and subcontractors who received payment',
        'Photos of completed work (required for all draw requests)',
        'Borrower Letter of Completion (for final draw)',
      ]},
      { type:'h2', text:'How Many Draws Can I Take?' },
      { type:'paragraph', text:'There is no fixed limit on the number of draws for most Integrated Capital Solutions construction loans. Borrowers typically take draws at natural project milestones - foundation, framing, rough MEP, drywall, finishes, and final completion. Draws can be as frequent as construction progress allows.' },
      { type:'h2', text:'What Are Lien Waivers and Why Do They Matter?' },
      { type:'paragraph', text:'A lien waiver is a document signed by a contractor or subcontractor confirming they have been paid for their work and waiving their right to file a mechanic\'s lien against the property for that amount. Integrated Capital Solutions requires lien waivers before releasing draw funds to protect the property\'s title.' },
      { type:'paragraph', text:'Integrated Capital Solutions provides downloadable lien waiver templates (conditional and unconditional, progress and final) on the Construction Draw resources page.' },
      { type:'h2', text:'What Is the Final Draw?' },
      { type:'paragraph', text:'The final draw releases the last portion of the construction budget upon project completion. To receive the final draw, you\'ll need a Certificate of Occupancy (CO) from the local municipality, a final inspection, all final lien waivers, and a Borrower Letter of Completion.' },
      { type:'callout', label:'Access the portal', text:'Submit draw requests, upload documents, and track disbursement status through the Trustpoint portal at Integrated Capital Solutionscapital.com/construction-draw' },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.relatedSlugs?.length) return []
  return post.relatedSlugs
    .map(s => getPostBySlug(s))
    .filter(Boolean) as BlogPost[]
}

export function getAllSlugs(): string[] {
  return posts.map(p => p.slug)
}

export const CATEGORY_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  'DSCR Rental': { bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe' },
  'Fix & Flip':  { bg:'#fff7ed', color:'#c2410c', border:'#fed7aa' },
  'Ground Up':   { bg:'#f0fdf4', color:'#15803d', border:'#bbf7d0' },
  'Bridge Loan': { bg:'#faf5ff', color:'#7c3aed', border:'#e9d5ff' },
}