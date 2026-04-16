

import { clerkClient } from "@clerk/express";

const FREE_LIMIT = 3;

export const checkAndUpdateUsage = async (req, res) => {
  try {
    const userId = req.userId;

    // ✅ Premium users → unlimited
    if (req.plan === "premium") {
      return true;
    }

    const currentUsage = req.free_usage || 0;

    // ❌ Limit reached
    if (currentUsage >= FREE_LIMIT) {
      res.status(403).json({
        success: false,
        message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
      });
      return false;
    }

    // ✅ Increment usage
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: currentUsage + 1,
      },
    });

    return true;

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    return false;
  }
};