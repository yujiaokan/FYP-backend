import mongoose from "mongoose";
import validator from "validator";

const counterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});
const Counter = mongoose.model('Counter', counterSchema);


const schema = new mongoose.Schema({
    id:{
      type:Number,
    },

    name: {
        type: String,
        required: [true, "Please Enter Name"],
      },
    
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: [true, "Email Already Exist"],
        validate: validator.isEmail,
      },

    phone:{
      type: String, 
      required: [true, "Please Enter Phone"],
      validate: {
        validator: function(phone) {
          return validator.isMobilePhone(phone, 'any'); // I can specify a locale instead of 'any'
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    address: {
        type: String,
        required: true,
      },
    city: {
        type: String,
        required: true,
      },
    country: {
        type: String,
      },
    eircode: {
        type: String,
        required: true,
      },
    coordinate: {
        latitude: {
          type: Number,
          default:null
          
        },
        longitude: {
          type: Number,
          default:null
        },
      },
    chargertypes:  {
        type: String,
        required: true,
      },
    availbleTime: {
        type: String,
        required: true,
      },
    description: {
      type: String,
    },

    rating: {
      type: Number,
      default: 0.0, // Set a default value for the rating
    },
    reviewer: {
      type: Number,
      default: 0, // Set a default value for the reviewer count
    },
    image:{
      type: String,
      default: 'https://madeelectric.ca/wp-content/uploads/2021/02/pexels-ed-harvey-5391509-scaled.jpg',
    },
    useruid:{
      type: String,
      default: '',
    }
    

});

schema.pre('save', async function(next) {

  if (this.isNew) {
  try {
    
    const counterDoc = await Counter.findByIdAndUpdate(
      { _id: 'mapsId' }, 
      { $inc: { seq: 1 } }, 
      { new: true, upsert: true }
    );
    this.id = counterDoc.seq;
    next();
  } catch (error) {
    next(error);
  }
}else{
  next();
}
});

export const Maps = mongoose.model("Maps", schema);