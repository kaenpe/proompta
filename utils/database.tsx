import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	isConnected && console.log("mongodb is connected");

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "shared_prompts",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log("mongodb connected");
	} catch (error) {
		console.log(error);
	}
};
