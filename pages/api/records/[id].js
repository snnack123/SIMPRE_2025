import { ObjectId } from "mongodb";
import { getCollection } from "@/utils/functions";
import { sendMethodNotAllowed, sendOk } from "@/utils/apiMethods";

const COLLECTION_NAME = "records";

const getRecord = async (id) => {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const updateRecord = async (id, data) => {
  const collection = await getCollection(COLLECTION_NAME);
  delete data._id;
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
};

const deleteRecord = async (id) => {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.deleteOne({ _id: new ObjectId(id) });
};

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let result;

    switch (method) {
      case "GET":
        result = await getRecord(id);
        break;

      case "PUT":
        result = await updateRecord(id, body);
        break;

      case "DELETE":
        result = await deleteRecord(id);
        break;

      default:
        return sendMethodNotAllowed(res, "Method Not Allowed");
    }

    return sendOk(res, result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
