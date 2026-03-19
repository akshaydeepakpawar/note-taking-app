import mongoose from "mongoose"

const MONGODB_URI=process.env.MONGODB_URI

let isConnected=false;

export default async function dbConnect() {

    if(isConnected){
        console.log("Datebase already connected");
        return ;
    }

    try {
        const db=await mongoose.connect(MONGODB_URI)
        isConnected=db.connections[0].readyState===1;
        console.log("Datebase connected");
    } catch (error) {
        console.log("failed to connect Database");
        throw error;
    }
}
