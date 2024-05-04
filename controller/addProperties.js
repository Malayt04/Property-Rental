const Property = require('../models/Property.js');
const User = require('../models/User.js');

const addPropertyPage =async (req,res)=>{
   try {
     res.render('addproperty');
   } catch (error) {
    console.log(error);
   }
}

const getProperties = async(req,res)=>{
    try {
        const propertiesArray = await Property.find();
        res.render('index',{
            properties: propertiesArray
        })
    } catch (error) {
        console.log(error);
    }
}

const postPropertyPage = async (req, res) => {
    try {
        const { ownerName, ownerNumber, description, address, price } = req.body;
        const loggedInUserId = req.cookies.userToken;

        const property = await Property.create({ ownerName, ownerNumber, description, address, price, userId: loggedInUserId });
        console.log(property);

        const user = await User.findOne({ name: ownerName });
        console.log(user);

        user.publishedProperties.push(property._id);
        await user.save();
        console.log(user);

        res.json({ property, redirectUrl: 'localhost:3000' });
    } catch (error) {
        console.log("There is an error", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getMyListings = async (req, res) => {
    try {
        const loggedInUserId = req.cookies.userToken;
        const user = await User.findById(loggedInUserId);
        console.log(user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const propertiesOfUser = await Property.find({ userId: loggedInUserId });
        console.log(propertiesOfUser);

        res.render('mylistings', { user, propertiesUser: propertiesOfUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteListing = async (req, res) => {
    try {
        const loggedInUserId = req.cookies.userToken;
        const listingId = req.params.id; // Access listing ID directly

        const user = await User.findById(loggedInUserId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.publishedProperties.includes(listingId)) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        user.publishedProperties = user.publishedProperties.filter(id => id.toString() !== listingId); // Ensure listingId is converted to string for comparison
        await user.save();

        await Property.findByIdAndDelete(listingId);

        res.redirect(req.get('localhost:3000/mylistings'));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = {addPropertyPage, getProperties, postPropertyPage,getMyListings,deleteListing}