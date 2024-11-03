import jwt from 'jsonwebtoken';

const authUserMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not authorized. Login Again" });
  }

  try {
    const { clerkId } = jwt.decode(token);
    if (!clerkId) {
      return res.json({ success: false, message: "Invalid token" });
    }

    req.body.clerkId = clerkId;
    console.log(`Clerk ID: ${clerkId}`);

    console.log("Middleware passed, proceeding to paymentRazorpay");
    
    next()
    console.log("Middleware passed, proceeding to paymentRazorpay");
  } catch (error) {
    console.error("Token decoding error:", error.message);
    res.json({ success: false, message: "Authentication error. Please try again." });
  }
};

export default authUserMiddleware;
