import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true, 'Email already exists'],
        require:[true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
      },
    
    image:{
        type:String,
    }


})
    
// "models" object is provided by the Mongoose library and stores all the registered models.
//If a model named "User" already exists in the "models" object, it assigns that existing model to the "User variable.
const User=models.User || model("User", UserSchema);

export default User;