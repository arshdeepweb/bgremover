import {Webhook} from 'svix'
import { USER } from '../models/user.model.js'

// API Controller Function to Manage Clerk User with Database
// http://localhost:3000/api/user/webhooks

export const clerkWebhooks = async (req, res) =>{
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    await whook.verify(JSON.stringify(req.body),{
      "svix-id":req.headers["svix-id"],
      "svix-signature":req.headers["svix-signature"],
      "svix-timestamp" : req.headers["svix-signature"]
    })

    const {data, type} = req.body

    switch (type) {
      case "user.created" :{
        const userData = {
          clerkId: data.id,
          email:data.email.addresses[0].email,
          firstName:data.first_name,
          LastName:data.last_name,
          photo:data.profile_image_url
        }

        await USER.create(userData)
        res.json({success:true,message:"User Created"})

        break
      }
      case "user.updated" :{

        const userData = {
          email:data.email.addresses[0].email,
          firstName:data.first_name,
          LastName:data.last_name,
          photo:data.profile_image_url
        }

        await USER.findOneAndUpdate({clerkId:data.id}, userData)
        res.json({})

        break
      }
      case "user.deleted" :{

        await USER.findOneAndDelete({clerkId:data.id})
        res.json({})

        break
      }
      default:
        break;
    }

  } catch (error) {
    console.log(error.message);
    res.json({success:false, message:error.message})
  }
}