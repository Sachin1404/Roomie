export const searchRooms = async (req, res) => {
  try {
    const { city, minRent, maxRent, profession } = req.query;

    const filters = {
      hasRoom: true
    };

    if (city) filters.city = { $regex: city, $options: "i" };

    if (profession) filters.profession = profession;

    if (minRent || maxRent) {
      filters.rent = {};
      if (minRent) filters.rent.$gte = Number(minRent);
      if (maxRent) filters.rent.$lte = Number(maxRent);
    }

    const rooms = await User.find(filters).select("-password");

    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rooms found matching your criteria",
      });
    }

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while searching rooms",
      error: error.message
    });
  }
};
