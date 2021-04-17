import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes the properties that are needed to create
// a new user
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// User definition
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // notice the capital 'S'. This refers to anactual constructor, not a type
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Create a new jsonified version of user document (for sending to the client)
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id; // format the id property
        delete ret._id;
        delete ret.password; // remove the password from the return json object
        // delete ret.__v; // delete this __v property (version key)
      },
      versionKey: false, // deletes __v as well
    },
  }
);

// add a middleware function. Before any document is saved, run the callback function
// We use the 'function' keyword; in a middleware callback, 'this' gives access to the Document object when
// 'function' keyword is used
userSchema.pre("save", async function (done) {
  // Check if an existing password is modified (only hash new passwords)
  // Imagine functionality where you are saving, but only the email has been modified
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// Add build() to the userSchema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
