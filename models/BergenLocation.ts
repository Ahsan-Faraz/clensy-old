import mongoose, { Document, Schema } from 'mongoose';

interface IOperatingHours {
  day: string;
  hours: string;
}

interface IContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface IBergenLocation extends Document {
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaButton1: string;
    ctaButton2: string;
  };
  contactSection: {
    title: string;
    phone: string;
    email: string;
    address: string;
    hours: IOperatingHours[];
  };
  serviceAreas: string[];
  aboutSection: {
    title: string;
    description: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  updatedAt: Date;
}

const operatingHoursSchema = new Schema<IOperatingHours>({
  day: { type: String, required: true },
  hours: { type: String, required: true }
});

const bergenLocationSchema = new Schema<IBergenLocation>(
  {
    heroSection: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      backgroundImage: { type: String, required: true },
      ctaButton1: { type: String, required: true },
      ctaButton2: { type: String, required: true }
    },
    contactSection: {
      title: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      hours: [operatingHoursSchema]
    },
    serviceAreas: [{ type: String }],
    aboutSection: {
      title: { type: String, required: true },
      description: { type: String, required: true }
    },
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      keywords: [{ type: String }]
    }
  },
  { timestamps: true }
);

export default mongoose.models.BergenLocation || 
  mongoose.model<IBergenLocation>('BergenLocation', bergenLocationSchema, 'bergen_locations');
