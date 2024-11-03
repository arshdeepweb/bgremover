import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import { USER } from '../models/user.model.js'

//COnstroller function to remove Background
const removeBG = async (req, res) => {
  try {
    const { clerkId } = req.body;
    console.log(clerkId);

    // Step 1: Find User
    const user = await USER.findOne({ clerkId });
    if (!user) {
      return res.json({ success: false, message: "Please Login" });
    }
    if (user.creditBalance === 0) {
      return res.json({ success: false, message: "No more Credits", creditBalance: user.creditBalance });
    }

    // Step 2: Read Image File
    const imagePath = req.file?.path;
    if (!imagePath) {
      return res.json({ success: false, message: "Image file not provided" });
    }
    const imageFile = fs.createReadStream(imagePath);

    // Step 3: Prepare Form Data
    const formData = new FormData();
    formData.append('image_file', imageFile);

    // Step 4: Send Request to Clipdrop API
    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_APIKEY,
        ...formData.getHeaders(), // Necessary to include headers set by FormData
      },
      responseType: 'arraybuffer', // Place outside of `headers` object
    });

    // Step 5: Convert Response to Base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // Step 6: Update User's Credit Balance
    await USER.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    // Step 7: Clean up temporary file (optional, if needed)
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    // Step 8: Return Success Response
    res.json({ success: true, resultImage, creditBalance: user.creditBalance - 1, message: 'Background Removed' });
    
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



export {removeBG}