// import { clerkClient } from "@clerk/express";

// const FREE_LIMIT = 10;

// export const checkAndUpdateUsage = async (req, res) => {
//   try {
//     if (req.plan === "premium") return true;

//     if (req.free_usage >= FREE_LIMIT) {
//       res.status(403).json({
//         success: false,
//         message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
//       });
//       return false;
//     }

//     // increment usage
//     await clerkClient.users.updateUserMetadata(req.auth.userId, {
//       privateMetadata: {
//         free_usage: req.free_usage + 1
//       }
//     });

//     return true;
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//     return false;
//   }
// };


import { clerkClient } from "@clerk/express";

const FREE_LIMIT = 10;

// export const checkAndUpdateUsage = async (req, res) => {


//   try {
//     const { userId } = req.auth;

//     // ✅ Premium users → unlimited
//     if (req.plan === "premium") return true;

//     // ✅ Limit check
//     if (req.free_usage >= FREE_LIMIT) {
//       return res.status(403).json({
//         success: false,
//         message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
//       });
//     }

//     // ✅ Safe metadata update (merge, not overwrite)
//     await clerkClient.users.updateUserMetadata(userId, {
//       privateMetadata: {
//         ...req.user?.privateMetadata, // optional safe merge
//         free_usage: req.free_usage + 1
//       }
//     });

//     return true;

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


export const checkAndUpdateUsage = async (req, res) => {
  try {
    const userId = req.userId; // ✅ use stored value

    if (req.plan === "premium") return true;

    if (req.free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
      });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: req.free_usage + 1
      }
    });

    return true;

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};