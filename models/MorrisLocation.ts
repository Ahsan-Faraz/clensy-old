import mongoose, { Document, Schema } from 'mongoose';

// Define types for better type safety
export interface IHeroSection {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButton1: string;
  ctaButton2: string;
}

export interface IBusinessHour {
  day: string;
  hours: string;
}

export interface IContactSection {
  title: string;
  phone: string;
  email: string;
  address: string;
  hours: IBusinessHour[];
}

export interface IAboutSection {
  title: string;
  description: string;
  content: string[];
}

export interface ISeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface ILocation extends Document {
  heroSection: IHeroSection;
  contactSection: IContactSection;
  serviceAreas: string[];
  aboutSection: IAboutSection;
  seo: ISeo;
  updatedAt: Date;
  createdAt: Date;
}

const businessHourSchema = new Schema<IBusinessHour>({
  day: { type: String, required: true },
  hours: { type: String, required: true }
});

const heroSectionSchema = new Schema<IHeroSection>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  ctaButton1: { type: String, required: true },
  ctaButton2: { type: String, required: true }
});

const contactSectionSchema = new Schema<IContactSection>({
  title: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  hours: [businessHourSchema]
});

const aboutSectionSchema = new Schema<IAboutSection>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: [{ type: String, required: true }]
});

const seoSchema = new Schema<ISeo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: [{ type: String, required: true }]
});

const locationSchema = new Schema<ILocation>({
  heroSection: { type: heroSectionSchema, required: true },
  contactSection: { type: contactSectionSchema, required: true },
  serviceAreas: [{ type: String, required: true }],
  aboutSection: { type: aboutSectionSchema, required: true },
  seo: { type: seoSchema, required: true }
}, { timestamps: true });

// Create the model or use existing one if already defined
export const MorrisLocation = 
  mongoose.models.MorrisLocation as mongoose.Model<ILocation> || 
  mongoose.model<ILocation>('MorrisLocation', locationSchema);

export default MorrisLocation;
