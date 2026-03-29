// import { clerkClient } from "@clerk/express";

// // Middleware to check userId and hasPremiumPlan



// export const auth = async (req, res, next)=>{
//     try {
//         const {userId, has} = await req.auth();
//         const hasPremiumPlan = await has({plan: 'premium'})

//         const user = await clerkClient.users.getUser(userId);

//         if(!hasPremiumPlan && user.privateMetadata.free_usage){
//             req.free_usage = user.privateMetadata.free_usage
//         } else{
//             await clerkClient.users.updateUserMetadata(userId, {
//                 privateMetadata: {
//                     free_usage: 0
//                 }
//             })
//             req.free_usage = 0;
//         }

//         req.plan = hasPremiumPlan ? 'premium' : 'free';
//         next()
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// import { clerkClient } from "@clerk/express";

// export const auth = async (req, res, next) => {
//   try {
//     // ✅ NEW WAY
//     const { userId } = await req.auth();

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const user = await clerkClient.users.getUser(userId);

//     req.plan = user.privateMetadata?.plan || "free";
//     req.free_usage = user.privateMetadata?.free_usage || 0;
//     req.userId = userId; // store for reuse

//     next();
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    // ✅ NEW WAY
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    req.plan = user.privateMetadata?.plan || "free";
    req.free_usage = user.privateMetadata?.free_usage || 0;
    req.userId = userId; // store for reuse

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};