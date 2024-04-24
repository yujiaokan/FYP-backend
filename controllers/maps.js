import { Maps } from "../models/maps.js";

export const postchargerdetail = async (req, res, next) => {
    const {
        id,
        name,
        email,
        phone,
        address,
        city,
        country,
        eircode,
        coordinate,
        chargertypes,
        availbleTime,
        description,
        rating,
        reviewer,
        image,
        useruid
    } = req.body;



const user=await Maps.create({
    id,
    name,
    email,
    phone,
    address,
    city,
    country,
    eircode,
    coordinate,
    chargertypes,
    availbleTime,
    description,
    rating,
    reviewer,
    image,
    useruid
});
    res.status(201).json({
        success:true,
        user,
    });
  };




  export const chargerDetails = async (req, res, next) => {
    try {
        const Chargers = await Maps.find(); // Fetch all documents from the Maps collection
        res.json(Chargers);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  };

  export const updateCharger = async (req, res, next) => {
    const userId = req.params.useruid;
    const user = await Maps.findOne({useruid:userId});
    const { email,phone,address,city,eircode,availbleTime,description,coordinate} = req.body;
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
  
     // Update fields if they are provided in the request body
     
     if (email) user.email = email;
     if (phone) user.phone = phone;
     if (address) user.address = address;
     if (city) user.city = city;
     if (eircode) user.eircode = eircode;
     if (coordinate) user.coordinate = coordinate; //oordinate is provided as an object with latitude and longitude
     if (availbleTime) user.availbleTime = availbleTime;
     if (description) user.description = description;
   
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  };

  export const updaterating = async (req, res, next) => {
    const Id = req.params.id;
    const user = await Maps.findOne({id:Id});
    const { rating,reviewer,} = req.body;
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
  
     // Update fields if they are provided in the request body
     
     if (rating) user.rating = rating;
     if (reviewer) user.reviewer = reviewer;
   
   
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  };
  
  export const deleteCharger = async (req, res, next) => {
    const usercharge = await Maps.findOneAndDelete(req.params.useruid);
    if (!usercharge) return next(new ErrorHandler("usercharge not found", 404));
    
 
    res.status(200).json({
      success: true,
    message: "Product Deleted Successfully",
    });
  };

  
  export const mapDetailsByid = async (req, res, next) => {
    try {
        const chargerID = req.params.id;
        const  Chargerdetail= await Maps.findOne({ id: chargerID }); // Fetch specific documents from the Maps collection
        res.json(Chargerdetail);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  };

  export const usrByuid =async (req, res) => {
    try {
      const userUid = req.params.useruid;
      const userDetails = await Maps.findOne({ useruid: userUid });
      res.json(userDetails);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
