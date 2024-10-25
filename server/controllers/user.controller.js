import {Webhook} from 'svix'
import { USER } from '../models/user.model.js'

// API Controller Function to Manage Clerk User with Database
// http://localhost:3000/api/user/webhooks

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log(req.headers);

    // Correct the svix-timestamp header
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"]
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url
        };

        await USER.create(userData);
        res.json({ success: true, message: "User Created" });
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email.addresses[0].email,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url
        };

        await USER.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await USER.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }
      default:
        res.status(400).json({ success: false, message: "Event type not supported" });
    }

  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

const userAvailableCredits = async (req, res) =>{

  try {
    const {clerkId} = req.body;
    const userData = await USER.findOne({clerkId})
    return res.json({success:true, credits:userData.creditBalance})
  } catch (error) {
    console.log(error.message);
    res.json({success:false, message:error.message})
  }

}

export {userAvailableCredits}