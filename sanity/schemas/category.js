export default {
  name: "category",
  type: "document",
  title: "Categories",
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
      name: "description",
      type: "array",
      title: "Description",
      of: [{ type: "block" }],
    },
    {
      name: "products",
      type: "array",
      title: "Products",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    },
  ],
};
