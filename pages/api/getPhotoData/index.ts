import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ServerApiVersion } from "mongodb";
import axios from "axios";

const URI =
  "mongodb+srv://admin:wanrltw32866auda@cluster0.cdf90.mongodb.net/?retryWrites=true&w=majority";

type Data = {
  name: string;
};

export default async function retrievePhotoData(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = new MongoClient(URI);
  console.log("req", req.query);
  const { skip, limit } = req.query;

  try {
    await client.connect();
    const db = client.db("DictionaryDB");
    // const collectionName = "Word";
    const collectionName = "mockPhotos";

    // let res = await axios.get("https://jsonplaceholder.typicode.com/photos");

    // console.log("res.data",res.data);
    // await db.collection('mockPhotos').insertMany(res.data)
    let result = await db
      .collection(collectionName)
      .find({})
      .sort({ id: 1 })
      .skip(Number(skip))
      .limit(Number(limit))
      .toArray();
    // console.log("result",result);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }

  //   return res.status(200).json({ name: "John Doe" });
}
