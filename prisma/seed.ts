/**
 * prisma/seed.ts
 *
 * Seeds the database with:
 *   1. One SUPER_ADMIN user   (login credentials printed to console)
 *   2. One ADMIN user         (for testing multi-user scenarios)
 *   3. Sample loan inquiries  (one per loan type, mixed statuses)
 *   4. Sample broker registrations
 *   5. Sample contact submissions
 *   6. Sample job applications
 *
 * Usage:
 *   npx prisma db seed
 *
 * Or directly:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
 *
 * Environment overrides (optional — set in .env.local):
 *   SEED_ADMIN_EMAIL     defaults to admin@integratedcapitalsolutionsllc.com
 *   SEED_ADMIN_PASSWORD  defaults to ChangeMe123!
 *   SEED_ADMIN_NAME      defaults to Super Admin
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ─── Helpers ──────────────────────────────────────────────────

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

// ─── Main ─────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱  Starting seed...\n')

  // ── 1. Admin users ──────────────────────────────────────────
  const superEmail    = process.env.SEED_ADMIN_EMAIL    ?? 'admin@integratedcapitalsolutionsllc.com'
  const superPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!'
  const superName     = process.env.SEED_ADMIN_NAME     ?? 'Super Admin'

  const superExists = await prisma.user.findUnique({ where: { email: superEmail } })

  if (superExists) {
    console.log(`  ⚠  Super admin already exists: ${superEmail} — skipping`)
  } else {
    const hashed = await bcrypt.hash(superPassword, 12)
    await prisma.user.create({
      data: { email: superEmail, name: superName, password: hashed, role: 'SUPER_ADMIN' },
    })
    console.log(`  ✓ Super admin created`)
    console.log(`    Email:    ${superEmail}`)
    console.log(`    Password: ${superPassword}`)
    console.log(`    Role:     SUPER_ADMIN`)
  }

  const adminEmail = 'staff@integratedcapitalsolutionsllc.com'
  const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } })

  if (adminExists) {
    console.log(`  ⚠  Admin user already exists: ${adminEmail} — skipping`)
  } else {
    const hashed = await bcrypt.hash('StaffPass123!', 12)
    await prisma.user.create({
      data: { email: adminEmail, name: 'Staff Member', password: hashed, role: 'ADMIN' },
    })
    console.log(`  ✓ Admin user created`)
    console.log(`    Email:    ${adminEmail}`)
    console.log(`    Password: StaffPass123!`)
    console.log(`    Role:     ADMIN`)
  }

  // ── 2. Loan Inquiries ────────────────────────────────────────
  console.log('\n  📋  Seeding loan inquiries...')

  const loanInquiries = [
    {
      firstName: 'Marcus',
      lastName: 'Thompson',
      email: 'marcus.thompson@realestateinv.com',
      phone: '(310) 555-0142',
      loanType: 'FIX_AND_FLIP' as const,
      propertyAddress: '1847 Maple Ave, Los Angeles, CA 90026',
      loanAmount: '$875,000',
      experience: '6-10',
      notes: 'Looking to close quickly — have a competing offer. Property needs full kitchen and bath renovation.',
      status: 'NEW' as const,
      createdAt: daysAgo(1),
    },
    {
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@sharmaproperties.com',
      phone: '(415) 555-0287',
      loanType: 'GROUND_UP' as const,
      propertyAddress: '2204 Oak Street, San Francisco, CA 94117',
      loanAmount: '$2,100,000',
      experience: '10+',
      notes: 'Shovel-ready project. Permits approved. Breaking ground in 3 weeks.',
      status: 'IN_REVIEW' as const,
      assignedTo: 'Jennifer Lightbody',
      createdAt: daysAgo(3),
    },
    {
      firstName: 'Derek',
      lastName: 'Williams',
      email: 'dwilliams@dwinvest.com',
      phone: '(713) 555-0394',
      loanType: 'DSCR_RENTAL' as const,
      propertyAddress: '504 Bayou Bend Dr, Houston, TX 77019',
      loanAmount: '$425,000',
      experience: '3-5',
      notes: 'Currently tenant-occupied at $3,200/mo. Looking to cash-out and buy another property.',
      status: 'CONTACTED' as const,
      assignedTo: 'Justin Lee',
      internalNotes: 'Spoke to borrower 11/14. Sending term sheet today. DSCR ~1.15.',
      createdAt: daysAgo(5),
    },
    {
      firstName: 'Alicia',
      lastName: 'Fernandez',
      email: 'alicia@fernandez-group.com',
      phone: '(305) 555-0561',
      loanType: 'BRIDGE_LOAN' as const,
      propertyAddress: '1120 Collins Ave, Miami Beach, FL 33139',
      loanAmount: '$1,350,000',
      experience: '10+',
      notes: 'Need bridge while STR property stabilizes. Airbnb revenue averaging $14K/mo.',
      status: 'QUALIFIED' as const,
      assignedTo: 'Jennifer Tran',
      internalNotes: 'Strong file. Borrower has 12 completed projects. Moving to closing.',
      createdAt: daysAgo(8),
    },
    {
      firstName: 'Kevin',
      lastName: 'Nakamura',
      email: 'kevin@nakamura-dev.com',
      phone: '(206) 555-0739',
      loanType: 'GROUND_UP' as const,
      propertyAddress: '3312 Capitol Hill Ave, Seattle, WA 98102',
      loanAmount: '$1,750,000',
      experience: '10+',
      notes: 'Infill lot. 4-plex construction. Presold 2 of 4 units.',
      status: 'CLOSED' as const,
      assignedTo: 'Danny Park',
      internalNotes: 'Funded 11/02. Smooth close. Good borrower for future deals.',
      createdAt: daysAgo(20),
    },
    {
      firstName: 'Robert',
      lastName: 'Nguyen',
      email: 'r.nguyen@quickflips.net',
      phone: '(512) 555-0814',
      loanType: 'FIX_AND_FLIP' as const,
      propertyAddress: '789 Congress Ave, Austin, TX 78701',
      loanAmount: '$290,000',
      experience: '1-2',
      notes: 'First flip. Buying from wholesaler. 60-day renovation plan.',
      status: 'SPAM' as const,
      internalNotes: 'Submitted same inquiry 4 times. No valid property address. Marked spam.',
      createdAt: daysAgo(15),
    },
  ]

  for (const inquiry of loanInquiries) {
    const exists = await prisma.loanInquiry.findFirst({
      where: { email: inquiry.email, loanType: inquiry.loanType },
    })
    if (!exists) {
      await prisma.loanInquiry.create({ data: inquiry })
      console.log(`    ✓ ${inquiry.firstName} ${inquiry.lastName} (${inquiry.loanType}) — ${inquiry.status}`)
    } else {
      console.log(`    ⚠  ${inquiry.firstName} ${inquiry.lastName} already exists — skipping`)
    }
  }

  // ── 3. Broker Registrations ──────────────────────────────────
  console.log('\n  🤝  Seeding broker registrations...')

  const brokers = [
    {
      firstName: 'Dawna',
      lastName: 'Torres',
      email: 'dawna@torresfinancial.com',
      phone: '(619) 555-0122',
      company: 'Torres Financial Group',
      nmlsId: '1847392',
      states: 'California, Arizona, Nevada',
      monthlyVolume: '4-10',
      products: ['Fix & Flip', 'DSCR Rental', 'Bridge Loan'],
      notes: 'Primarily working with experienced investors in SoCal market. Looking for a reliable direct lender.',
      status: 'NEW' as const,
      createdAt: daysAgo(2),
    },
    {
      firstName: 'Jason',
      lastName: 'Sutherland',
      email: 'jason@sutherland-mortgage.com',
      phone: '(404) 555-0376',
      company: 'Sutherland Mortgage Partners',
      nmlsId: '2093847',
      states: 'Georgia, Florida, Tennessee, North Carolina',
      monthlyVolume: '11-25',
      products: ['Ground Up Construction', 'Fix & Flip', 'Bridge Loan'],
      notes: 'High-volume shop in Southeast. Want to add Integrated Capital Solutions as our primary private lender.',
      status: 'IN_REVIEW' as const,
      assignedTo: 'Jennifer Lightbody',
      internalNotes: 'Strong volume. Call scheduled for 11/18. Sent broker agreement.',
      createdAt: daysAgo(6),
    },
    {
      firstName: 'Maria',
      lastName: 'Castellanos',
      email: 'maria@castellanosmortgage.com',
      phone: '(972) 555-0594',
      company: 'Castellanos Mortgage Solutions',
      nmlsId: '1659204',
      states: 'Texas, Oklahoma, New Mexico',
      monthlyVolume: '4-10',
      products: ['DSCR Rental', 'Bridge Loan'],
      notes: 'Specializing in rental portfolio financing for Texas investors. Great book of business.',
      status: 'CONTACTED' as const,
      assignedTo: 'Justin Lee',
      internalNotes: 'Onboarded 10/30. First file submitted last week — in underwriting.',
      createdAt: daysAgo(14),
    },
  ]

  for (const broker of brokers) {
    const exists = await prisma.brokerRegistration.findFirst({
      where: { email: broker.email },
    })
    if (!exists) {
      await prisma.brokerRegistration.create({ data: broker })
      console.log(`    ✓ ${broker.firstName} ${broker.lastName} — ${broker.company} (${broker.status})`)
    } else {
      console.log(`    ⚠  ${broker.firstName} ${broker.lastName} already exists — skipping`)
    }
  }

  // ── 4. Contact Submissions ───────────────────────────────────
  console.log('\n  📩  Seeding contact submissions...')

  const contacts = [
    {
      firstName: 'Samuel',
      lastName: 'Okafor',
      email: 's.okafor@realtycapital.com',
      phone: '(212) 555-0183',
      company: 'Realty Capital LLC',
      message: 'I have a 12-unit multifamily in Brooklyn I\'m looking to refinance. Can you confirm if you lend on properties with 10+ units or if this falls outside your guidelines?',
      status: 'NEW' as const,
      createdAt: daysAgo(1),
    },
    {
      firstName: 'Brittany',
      lastName: 'Cole',
      email: 'brittany.cole@gmail.com',
      phone: '(602) 555-0297',
      company: undefined,
      message: 'I\'m a first-time investor looking at a fix and flip in Scottsdale. Do I need prior experience to qualify? I have strong credit (740) and capital for the down payment.',
      status: 'CONTACTED' as const,
      internalNotes: 'Replied 11/15. Explained experience requirements. Referred to FAQ page.',
      createdAt: daysAgo(4),
    },
    {
      firstName: 'Terrence',
      lastName: 'Jackson',
      email: 'tjackson@jacksonholdings.net',
      phone: '(615) 555-0451',
      company: 'Jackson Holdings Group',
      message: 'We\'re a family office managing a portfolio of 40+ SFRs across Tennessee and Georgia. Looking for a lender that can handle bulk DSCR financing. Can we set up a call to discuss your portfolio loan programs?',
      status: 'IN_REVIEW' as const,
      assignedTo: 'Jennifer Tran',
      internalNotes: 'High-value prospect. Escalated to senior team. Call set for 11/19 at 2pm.',
      createdAt: daysAgo(7),
    },
  ]

  for (const contact of contacts) {
    const exists = await prisma.contactSubmission.findFirst({
      where: { email: contact.email },
    })
    if (!exists) {
      await prisma.contactSubmission.create({ data: contact })
      console.log(`    ✓ ${contact.firstName} ${contact.lastName} — ${contact.status}`)
    } else {
      console.log(`    ⚠  ${contact.firstName} ${contact.lastName} already exists — skipping`)
    }
  }

  // ── 5. Job Applications ──────────────────────────────────────
  console.log('\n  💼  Seeding job applications...')

  const applications = [
    {
      firstName: 'Ashley',
      lastName: 'Morgan',
      email: 'ashley.morgan@email.com',
      phone: '(949) 555-0264',
      position: 'Account Executive',
      aboutText: '7 years in mortgage sales, most recently as a senior AE at a non-QM lender in Irvine. Closed $42M in volume last year. Looking to bring my book of business to a growing private lender with great products.',
      status: 'NEW' as const,
      createdAt: daysAgo(2),
    },
    {
      firstName: 'Carlos',
      lastName: 'Reyes',
      email: 'carlos.reyes@email.com',
      phone: '(714) 555-0387',
      position: 'Loan Underwriter',
      aboutText: '5 years underwriting non-QM and business purpose loans at a regional private lender. Experienced with fix-and-flip, DSCR, and ground-up construction underwriting. Based in Orange County.',
      status: 'PHONE_SCREEN' as const,
      internalNotes: 'Strong resume. Phone screen with HR on 11/16. Good candidate for senior UW role.',
      createdAt: daysAgo(9),
    },
    {
      firstName: 'Nina',
      lastName: 'Patel',
      email: 'nina.patel@email.com',
      phone: '(562) 555-0519',
      position: 'Loan Closing Associate',
      aboutText: '3 years in mortgage closing at a title company and 2 years at a hard money lender. Familiar with construction loan closings and draw management. Detail-oriented and process-driven.',
      status: 'INTERVIEW' as const,
      internalNotes: 'Great phone screen. In-person interview scheduled 11/20 with COO.',
      createdAt: daysAgo(12),
    },
    {
      firstName: 'James',
      lastName: 'Wu',
      email: 'james.wu@email.com',
      phone: '(323) 555-0631',
      position: 'Loan Processor',
      aboutText: 'New to the industry but eager to learn. Currently working in banking operations. Looking to transition into mortgage processing.',
      status: 'REJECTED' as const,
      internalNotes: 'No relevant experience. Politely declined on 11/10. Suggested entry-level roles.',
      createdAt: daysAgo(18),
    },
  ]

  for (const application of applications) {
    const exists = await prisma.jobApplication.findFirst({
      where: { email: application.email },
    })
    if (!exists) {
      await prisma.jobApplication.create({ data: application })
      console.log(`    ✓ ${application.firstName} ${application.lastName} — ${application.position} (${application.status})`)
    } else {
      console.log(`    ⚠  ${application.firstName} ${application.lastName} already exists — skipping`)
    }
  }

  // ── Summary ──────────────────────────────────────────────────
  console.log('\n✅  Seed complete!\n')
  console.log('─────────────────────────────────────────')
  console.log('  Admin login details:')
  console.log(`  URL:      http://localhost:3000/admin/login`)
  console.log(`  Email:    ${superEmail}`)
  console.log(`  Password: ${superPassword}`)
  console.log('─────────────────────────────────────────')
  console.log('  ⚠  Change the password after first login!')
  console.log('─────────────────────────────────────────\n')
}

main()
  .catch(e => {
    console.error('❌  Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())