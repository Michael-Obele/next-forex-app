import Ably from 'ably/promises';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const client = new Ably.Realtime(process.env.API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: `anonymous-${Math.random().toString(36).substring(8)}`,
  });
  return NextResponse.json(tokenRequestData, { revalidate: 0 });
}
