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
  const superPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Mendoza#43'
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
    const hashed = await bcrypt.hash('Integrated-worker71', 12)
    await prisma.user.create({
      data: { email: adminEmail, name: 'Staff Member', password: hashed, role: 'ADMIN' },
    })
    console.log(`  ✓ Admin user created`)
    console.log(`    Email:    ${adminEmail}`)
    console.log(`    Password: Integrated-worker71`)
    console.log(`    Role:     ADMIN`)
  }

  // ── 7. Site content ──────────────────────────────────────────
  const defaultContent: [string, string][] = [
    ['contact_email', 'info@integratedcapitalsolutionsllc.com'],
    ['contact_phone', '(844) 922-2724'],
    ['contact_address', '18400 Von Karman Ave., Suite 500, Irvine, CA 92612'],
    ['contact_hours', 'Mon – Fri, 8:30 AM – 5:00 PM PT'],
    ['loan_servicing_address', '2175 Hunting Valley lane, Streetsboro, OH, 44241'],
    ['payoff_email', 'curtis@integratedcapitalsolutionsllc.com'],
    ['servicing_email', 'info@integratedcapitalsolutionsllc.com'],
  ]

  for (const [key, value] of defaultContent) {
    const existing = await prisma.siteContent.findUnique({ where: { key } })
    if (!existing) {
      await prisma.siteContent.create({ data: { key, value } })
    }
  }
  console.log('  ✓ Site content seeded')

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