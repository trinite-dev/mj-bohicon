Déployer l'exemple serverless (Vercel / Netlify) et configurer le webhook Strapi

1) Vercel
- Placez le fichier `serverless/vercel/api/webhook.js` dans votre repo.
- Connectez le repo sur https://vercel.com et déployez (framework agnostic).
- L'URL publique de la fonction sera : `https://<your-project>.vercel.app/api/webhook`

2) Netlify
- Placez le fichier `serverless/netlify/functions/webhook.js` dans votre repo.
- Dans Netlify, créez un nouveau site depuis votre repo, ou activez Netlify Functions.
- L'URL publique de la fonction sera : `https://<your-site>.netlify.app/.netlify/functions/webhook`

3) Sécuriser le webhook
- Dans Strapi, lors de la création du Webhook (Settings > Webhooks) vous pouvez ajouter Headers.
- Ajoutez par exemple : `x-webhook-secret: <une_valeur_secrète>` et vérifiez-la côté serverless.

4) Créer le Webhook dans Strapi (UI)
- Admin → Settings → Webhooks → Create new webhook
  - Name: Alerte Nouvelle Adhésion
  - URL: (utilisez l'URL publique de la fonction)
  - Headers: `x-webhook-secret: <votre_secret>`
  - Events: Entry > Create → sélectionnez `adhesion` (collection)

5) Tester localement
- Test curl vers Vercel (ou Netlify) déployé :

```bash
curl -X POST https://<your-url>/api/webhook \
  -H 'Content-Type: application/json' \
  -H 'x-webhook-secret: monsecret' \
  -d '{"test":"payload","adhesion":{"nom":"Test"}}'
```

6) Option: Déclenchement depuis Strapi via API (automatisation)
- Vous pouvez créer le webhook via l'API Admin de Strapi si vous avez un admin token. Voir la doc Strapi Webhooks API.

Besoin d'aide pour :
- connecter le repo à Vercel/Netlify (je peux vous guider étape par étape),
- ajouter validation du secret dans les fonctions et stocker la valeur dans les environnements de Vercel/Netlify,
- ou créer le webhook automatiquement via l'API (nécessite un token admin).
