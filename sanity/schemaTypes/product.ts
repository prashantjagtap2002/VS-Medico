import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Medicine / Product',
  type: 'document',
  fields: [
    defineField({ name: 'sku', title: 'SKU / Product Code', type: 'string', validation: (Rule) => Rule.required().regex(/^[A-Za-z0-9-]+$/).custom(async (sku, context) => {
      // Duplicate SKUs would fail the website build, so block them here.
      if (!sku) return true;
      const id = context.document?._id.replace(/^drafts\./, '');
      const taken = await context.getClient({ apiVersion: '2026-10-30' }).fetch(
        'count(*[_type == "product" && lower(sku) == lower($sku) && !(_id in [$id, $draft])])',
        { sku, id, draft: `drafts.${id}` },
      );
      return taken === 0 || 'Another product already uses this SKU';
    }) }),
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'brand', title: 'Brand / Manufacturer', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [
      { title: 'Branded Formulations', value: 'formulations' }, { title: 'Generic Medicines', value: 'generics' },
      { title: 'Critical Care & Injectables', value: 'critical-care' }, { title: 'Cold Chain & Biologics', value: 'cold-chain' },
      { title: 'OTC & Health Supplements', value: 'otc' }, { title: 'Surgical & Diagnostics', value: 'surgical' },
      { title: 'Ayurvedic & Herbal', value: 'ayurvedic' },
    ] }, initialValue: 'formulations' }),
    defineField({ name: 'image', title: 'Product Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'composition', title: 'Composition / Active Ingredients', type: 'string' }),
    defineField({ name: 'packSize', title: 'Pack Size', type: 'string' }),
    defineField({ name: 'mrp', title: 'MRP', type: 'string' }),
    defineField({ name: 'ptrEstimate', title: 'Pricing Note', type: 'string', initialValue: 'Wholesale rate on request' }),
    defineField({ name: 'hsnCode', title: 'HSN Code', type: 'string' }),
    defineField({ name: 'stockStatus', title: 'Stock Status', type: 'string', options: { list: ['In Stock', 'Low Stock', 'On Order', 'Out of Stock'] }, initialValue: 'In Stock' }),
    defineField({ name: 'coldChain', title: 'Cold Chain Product', type: 'boolean', initialValue: false }),
    defineField({ name: 'storageTemp', title: 'Storage Instructions', type: 'string' }),
    defineField({ name: 'rxRequired', title: 'Prescription Required (Rx)', type: 'boolean', initialValue: true }),
    defineField({ name: 'featured', title: 'Featured on Home Page', type: 'boolean', initialValue: false }),
    defineField({ name: 'sortOrder', title: 'Display Order', type: 'number', initialValue: 100 }),
    defineField({ name: 'description', title: 'Short Description', type: 'text' }),
  ],
  preview: { select: { title: 'name', subtitle: 'brand', sku: 'sku' }, prepare: ({ title, subtitle, sku }) => ({ title, subtitle: `${subtitle || 'No brand'} · ${sku || 'No SKU'}` }) },
});
