import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const db = await getDb();
    const col = db.collection('subscriptions');
    const now = new Date().toISOString();
    await col.insertOne({ email, timestamp: now });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}