import { getDB } from "../../config/mongodb.js";
import ApplicationError  from "../../middlewares/applicationError.middleware.js";

class UserRepository {
  constructor() {
    this.collectionName = "users";
  }

  async signUp(user) {
    const db = getDB();
    const collection = db.collection(this.collectionName);

    const result = await collection.insertOne({ ...user });

    return {
      ...user,
      _id: result.insertedId,
    };
  }

  async signIn(email) {
    const db = getDB();
    const collection = db.collection(this.collectionName);

    const findUser = await collection.findOne({ email:email });

    if (!findUser) {
      throw new ApplicationError("Incorrect Credentials", 401);
    }

    return findUser;
  }

   async getUserById(id) {
    const db = getDB();
    return await db.collection(this.collectionName).findOne({_id:id});
  }
}

export default UserRepository;
