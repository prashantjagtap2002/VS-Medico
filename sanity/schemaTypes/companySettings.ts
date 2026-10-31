import { defineField, defineType } from 'sanity';

const text = (name: string, title: string) => defineField({ name, title, type: 'string' });

export default defineType({
  name: 'companySettings', title: 'Company Settings', type: 'document',
  preview: { prepare: () => ({ title: 'Company Settings' }) },
  fields: [
    defineField({ name: 'contact', title: 'Contact', type: 'object', fields: [text('phoneSales', 'Sales Phone'), text('phoneOffice', 'Office Landline'), text('whatsapp', 'WhatsApp Number'), text('emailSales', 'Sales Email'), text('emailInfo', 'General Email'), text('workingHours', 'Working Hours'), text('sundayStatus', 'Sunday Note')] }),
    defineField({ name: 'address', title: 'Address', type: 'object', fields: [text('building', 'Building / Street'), text('locality', 'Locality'), text('city', 'City'), text('state', 'State'), text('pincode', 'PIN Code'), text('landmark', 'Landmark'), defineField({ name: 'latitude', title: 'Latitude', type: 'number' }), defineField({ name: 'longitude', title: 'Longitude', type: 'number' })] }),
    defineField({ name: 'licenses', title: 'Licences & Registrations', type: 'object', fields: [text('drugLicense20B', 'Drug Licence (Form 20B)'), text('drugLicense21B', 'Drug Licence (Form 21B)'), text('issuingAuthority', 'Issuing Authority'), text('gstin', 'GSTIN'), text('pan', 'PAN'), text('fssaiNo', 'FSSAI Licence No.')] }),
  ],
});
