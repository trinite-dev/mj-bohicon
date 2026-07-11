// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi } /*: { strapi: Core.Strapi } */) {
    // Create required admin roles if they don't exist
    const ensureRoles = async () => {
      try {
        const needed = [
          { name: 'Secrétaire Général', code: 'secretary_general', description: 'Accès lecture/écriture/publication sur toutes les collections' },
          { name: 'Chargé de Communication', code: 'communication_officer', description: 'Accès Articles & Opportunités (create/edit), pas de publication' },
        ];

        for (const r of needed) {
          const existing = await strapi.entityService.findMany('admin::role', {
            filters: { name: r.name },
            limit: 1,
            populate: []
          });

          if (!existing || existing.length === 0) {
            await strapi.entityService.create('admin::role', {
              data: {
                name: r.name,
                code: r.code,
                description: r.description,
              },
            });
            strapi.log.info(`Created admin role: ${r.name}`);
          } else {
            strapi.log.info(`Admin role already exists: ${r.name}`);
          }
        }
      } catch (err) {
        strapi.log.error('Error ensuring admin roles:', err);
      }
    };

    // run async but don't block startup too long
    ensureRoles();
  },
};
