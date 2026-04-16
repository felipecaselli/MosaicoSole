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
      title: 'Precio (Opcional)',
      type: 'number',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes extra',
      description: 'Puedes añadir fotos adicionales de la misma obra aquí',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
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
      name: 'category',
      title: 'Categoría',
      description: 'Selecciona la categoría a la que pertenece esta obra',
      type: 'string',
      options: {
        list: [
          { title: 'Cuadros', value: 'cuadros' },
          { title: 'Espejos', value: 'espejos' },
          { title: 'Exterior', value: 'exterior' },
          { title: 'Fanales', value: 'fanales' },
          { title: 'Logos', value: 'logos' },
          { title: 'Macetas', value: 'macetas' },
          { title: 'Mandalas', value: 'mandalas' },
          { title: 'Mesas', value: 'mesas' },
          { title: 'Murales', value: 'murales' },
          { title: 'Nuevos', value: 'nuevos' },
          { title: 'Populares', value: 'populares' },
          { title: 'Portallaves', value: 'portallaves' },
          { title: 'Portarretratos', value: 'portarretratos' },
        ],
        layout: 'dropdown'
      }
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
      validation: (Rule) => Rule.required(),
    }),
  ],
})
