import mongoose, { Model } from "mongoose";
import { Document } from "mongoose";
const { Schema } = mongoose;

export interface Genres {
  genre: string[];
}
export interface IExplore extends Genres, Document {}
const exploreSchema = new Schema<IExplore>({
  genre: [
    {
      type: Schema.Types.String,
    },
  ],
});

exploreSchema.index({ genres: "text" });

const ExploreModel: Model<IExplore> = mongoose.models.Explore || mongoose.model<IExplore>("Explore", exploreSchema);
export { ExploreModel as Explore };
