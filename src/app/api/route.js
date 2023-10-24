import Ably from 'ably/promises';

export async function GET(request) {
  const client = new Ably.Realtime(process.env.API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: `anonymous-${Math.random().toString(36).substring(8)}`,
  });
  return Response.json(tokenRequestData);
}
