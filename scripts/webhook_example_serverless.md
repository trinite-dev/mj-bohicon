Exemple: fonction serverless pour recevoir le webhook "Alerte Nouvelle Adhésion"

Voici un exemple Node.js (Express) minimal que vous pouvez adapter en fonction
de votre hébergeur (Vercel, Netlify, AWS Lambda, etc.).

```js
// webhook-handler.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook/adhesion', (req, res) => {
  const payload = req.body;
  console.log('Nouvelle adhésion reçue via webhook:', payload);
  // Exemple: envoyer email ou notification via un service externe
  res.status(200).send({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Webhook server listening on ${port}`));
```

Pour déployer sur Vercel/Netlify, adaptez en tant que fonction serverless. Utilisez
l'URL publique dans la création du webhook dans Strapi (Settings > Webhooks).
