export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const payload = req.body;
    const secret = req.headers['x-webhook-secret'] || req.headers['x-webhook-token'];

    // TODO: validate `secret` against YOUR expected value
    console.log('Vercel webhook received:', { secretProvided: !!secret, payload });

    // Placez ici le traitement : envoi d'email, push vers API interne, etc.

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
