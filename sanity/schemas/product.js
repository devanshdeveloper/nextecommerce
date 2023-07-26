export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: "productImage",
      type: "image",
      title: "Product Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "description",
      type: "array",
      title: "Description",
      of: [{ type: "block" }],
    },
    {
      name: "reviews",
      type: "array",
      title: "Reviews",
      of: [{ type: "reference", to: [{ type: "review" }] }],
    },
  ],
};
