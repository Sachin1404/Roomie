import Profile from "../models/Profile.js";

/**
 * CREATE PROFILE
 * POST /api/profile
 */
export const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      age,
      gender,
      role,
      city,
      budget,
      moveInDate,
      hasRoom,
      description,
      roomDetails,
      preferences
    } = req.body;

    // -------- CHECK IF PROFILE EXISTS --------
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ msg: "Profile already exists. Please update instead." });
    }

    // -------- BASIC VALIDATIONS --------
    if (!age || age < 0 || age > 125)
      return res.status(400).json({ msg: "Age must be between 0 and 125" });

    const validGenders = ["male", "female", "others"];
    if (!gender || !validGenders.includes(gender))
      return res.status(400).json({ msg: "Invalid gender" });

    const validRoles = ["student", "working"];
    if (!role || !validRoles.includes(role))
      return res.status(400).json({ msg: "Role must be student or working" });

    if (!description || description.trim().length < 5)
      return res
        .status(400)
        .json({ msg: "Description is required and must be meaningful" });

    if (!city) return res.status(400).json({ msg: "City is required" });

    if (!budget) return res.status(400).json({ msg: "Budget is required" });

    if (!moveInDate)
      return res.status(400).json({ msg: "Move-in date is required" });

    if (typeof hasRoom !== "boolean") {
      return res.status(400).json({ msg: "hasRoom must be true or false" });
    }

    // -------- ROOM VALIDATIONS --------
    if (hasRoom) {
      if (!roomDetails || !roomDetails.address || !roomDetails.details) {
        return res.status(400).json({
          msg: "Room address and room details are required since you already have a room"
        });
      }
    }

    // -------- CREATE PROFILE --------
    const profile = new Profile({
      userId,
      age,
      gender,
      role,
      city,
      budget,
      moveInDate,
      hasRoom,
      description,
      roomDetails: hasRoom ? roomDetails : null,
      preferences
    });

    await profile.save();

    return res.status(201).json({
      msg: "Profile created successfully",
      profile
    });

  } catch (err) {
    console.error("Create Profile Error:", err);
    res.status(500).json({ msg: err.message });
  }
};




/**
 * GET PROFILE (Self Profile)
 * GET /api/profile/me
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId })
      .populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(profile);

  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ msg: err.message });
  }
};



/**
 * UPDATE PROFILE
 * PUT /api/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    ).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    return res.json({
      msg: "Profile updated successfully",
      profile
    });

  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ msg: err.message });
  }
};


