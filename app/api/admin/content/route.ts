import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contents = await prisma.siteContent.findMany()
  const map: Record<string, string> = {}
  for (const c of contents) map[c.key] = c.value
  return NextResponse.json(map)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { key, value } = body as { key: string; value: string }

  if (!key || value === undefined) {
    return NextResponse.json({ error: 'key and value are required' }, { status: 400 })
  }

  const content = await prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })

  return NextResponse.json(content)
}
