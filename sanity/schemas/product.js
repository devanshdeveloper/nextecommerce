export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'productImage',
      type: 'image',
      title: 'Product Image',
    },
    {
      name: 'decription',
      type: 'array',
      title: 'Decription',
      of: [{type: 'block'}],
    },
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      of: [{type: 'reference', to: [{type: 'review'}]}],
    },
  ],
}
