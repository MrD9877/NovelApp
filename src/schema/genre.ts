import mongoose from "mongoose";
const { Schema } = mongoose;

const exploreSchema = new Schema({
  genre: [
    {
      type: Schema.Types.String,
    },
  ],
});

exploreSchema.index({ genres: "text" });

const ExploreModel = mongoose.models.Explore || mongoose.model("Explore", exploreSchema);
export { ExploreModel as Explore };
