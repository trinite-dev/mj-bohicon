exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const secret = (event.headers && (event.headers['x-webhook-secret'] || event.headers['x-webhook-token'])) || null;

    // TODO: validate secret
    console.log('Netlify webhook received:', { secretProvided: !!secret, body });

    // Traitement: envoyer notification, persister, etc.

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('Webhook function error', err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};
