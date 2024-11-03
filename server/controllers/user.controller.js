import { Webhook } from 'svix'
import { USER } from '../models/user.model.js'
import razorpay from 'razorpay'
import { TRANSACTION } from '../models/transaction.model.js';

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

const userAvailableCredits = async (req, res) => {

  try {
    const { clerkId } = req.body;
    const userData = await USER.findOne({ clerkId })
    return res.json({ success: true, credits: userData.creditBalance })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }

}

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})


const paymentRazorpay = async (req, res) => {
  console.log("run");
  try {
    const { clerkId, planId } = req.body;

    // Check if user data and planId exist
    const userData = await USER.findOne({ clerkId });
    if (!userData || !planId) {
      return res.json({ success: false, message: 'Invalid Credential' });
    }

    // Initialize transaction details based on planId
    let planDetails = {
      Basic: { plan: 'Basic', credits: 100, amount: 10 },
      Advanced: { plan: 'Advanced', credits: 500, amount: 50 },
      Business: { plan: 'Business', credits: 1000, amount: 100 },
    };

    const selectedPlan = planDetails[planId];
    if (!selectedPlan) {
      return res.json({ success: false, message: 'Invalid Plan ID' });
    }

    const { plan, credits, amount } = selectedPlan;
    const date = Date.now();

    // Create transaction data for logging
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await TRANSACTION.create(transactionData);

    // Prepare Razorpay options
    const options = {
      amount: amount * 100, // convert to smallest currency unit
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    // Create order on Razorpay
    const order = await new Promise((resolve, reject) => {
      razorpayInstance.orders.create(options, (error, order) => {
        if (error) return reject(error);
        resolve(order);
      });
    });

    // Send successful response
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



const verifyRazorpay = async(req, res) =>{
  try {
    
    const { razorpay_order_id } = req.body

    const orderInfo = await razorpayInstance.orders.fetch( razorpay_order_id )

    if(orderInfo.status === "paid"){
      const transactionData = await TRANSACTION.findById(orderInfo.receipt)
      if(transactionData.payment){
        return res.json({success:false, message:'payment Failed'})
      }

      // ADDING CREDITS

      const userData = await USER.findOne({clerkId: transactionData.clerkId})
      const creditBalance = userData.creditBalance + transactionData.credits

      await USER.findByIdAndUpdate(userData._id,{creditBalance})

      await TRANSACTION.findByIdAndUpdate(transactionData._id,{payment:true})

      res.json({success:true, message: "credits Added"})


    }

  } catch (error) {
    
  }
}

export { userAvailableCredits, paymentRazorpay, verifyRazorpay }