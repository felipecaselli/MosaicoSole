import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'store',
  title: 'Tienda',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Tienda',
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
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      description: 'Incluir código de país sin el +. Ejemplo: 5491123456789',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'themeColor',
      title: 'Color Interfaz Principal',
      description: 'Permite personalizar la barra superior y los botones principales estéticamente en Astro.',
      type: 'color',
    }),
    defineField({
      name: 'ownerEmail',
      title: 'Email del Propietario (Login)',
      description: 'El email del usuario en Sanity que administra esta tienda.',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
