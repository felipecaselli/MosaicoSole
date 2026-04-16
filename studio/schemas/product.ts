import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'stock',
      title: 'Stock disponible',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Imagen del Producto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'store',
      title: 'Tienda Perteneciente',
      type: 'reference',
      to: [{ type: 'store' }],
      readOnly: true,
      validation: (Rule) => Rule.required().custom(async (storeRef: any, context) => {
        if (!storeRef || !storeRef._ref) return true;
        const currentUser = context.currentUser;
        const isAdmin = currentUser?.roles?.some((r: any) => r.name === 'administrator');
        if (isAdmin) return true; 

        // Cross-check ownership using the client api
        const client = context.getClient({apiVersion: '2023-05-03'});
        const store = await client.fetch('*[_id == $id][0]', { id: storeRef._ref });
        
        if (store?.ownerEmail !== currentUser?.email) {
          return 'Violación de seguridad: No tienes permisos para asignar productos a esta tienda.';
        }
        return true;
      }),
    }),
  ],
})
