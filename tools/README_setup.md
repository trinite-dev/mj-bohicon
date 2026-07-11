Setup automatisé (roles, webhooks, tokens)

1) Variables d'environnement requises pour certains scripts

- ADMIN_EMAIL and ADMIN_PASSWORD: un compte admin existant pour utiliser l'API admin si vous voulez automatiser permissions/webhooks via l'API.
- CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET: pour activer Cloudinary.

2) Rôles créés automatiquement

Au démarrage Strapi, le `bootstrap` créé automatiquement les rôles :
- Secrétaire Général
- Chargé de Communication

Ces rôles sont créés si inexistants. Les permissions fines (publish, create, etc.)
ne sont pas appliquées automatiquement par sécurité — vous pouvez les régler
manuellement via l'admin ou utiliser l'API admin (exemples à ajouter).

3) Exemple webhook

Voir `scripts/webhook_example_serverless.md` pour un exemple de fonction qui
reçoit la notification. Créez un webhook dans Strapi pointant sur l'URL publique
et sélectionnez l'événement `Entry > Create` pour la collection `adhesion`.

4) Activer Cloudinary

Dans votre `.env` ajoutez :

CLOUDINARY_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...

Puis redémarrez Strapi.

5) Exécuter les scripts

La partie automatisée minimale est dans le `bootstrap` et s'exécute au démarrage
du serveur. Pour actions supplémentaires (permissions fines, webhooks via API),
il faudra exécuter des scripts qui utilisent l'API admin avec un token d'admin.
