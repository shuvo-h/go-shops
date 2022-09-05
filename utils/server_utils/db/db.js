import mongoose from "mongoose";

const connection = {};

async function connect() {
    if (connection.isConnected) {
        console.log('already connected to DB: ',mongoose.connection.base.connections.length);
        return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Using previous connection!");
            return;
        }

        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_CONNECT_URI,{
        dbName: 'GoShops',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true 
    })

    console.log("New Connection count : ", mongoose.connection.base.connections.length);
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
            console.log("Disconnected, connection count: ",mongoose.connection.base.connections.length);
        }else{
            console.log("Not connected to DB cout: ",mongoose.connection.base.connections.length);
        }
    }
}

function convertMongooseDocToObjForLean(doc) {
    doc.id = doc._id ? doc._id?.toString() : null;
    doc.createdAt = doc.createdAt ? doc.createdAt?.toString() : null;
    doc.updatedAt = doc.updatedAt ? doc.updatedAt?.toString() : null;
    return doc;
}

const db = {connect,disconnect,convertMongooseDocToObjForLean};

export default db;