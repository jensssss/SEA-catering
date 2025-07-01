import { NextResponse } from 'next/server';
import Tokens from 'csrf';

const tokens = new Tokens();

export async function GET() {
  const secret = crypto.randomUUID();
  const token = tokens.create(secret);

  return NextResponse.json({ csrfToken: token });
}
