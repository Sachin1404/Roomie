import User from "../models/User.js";

export const findMatches = async (req, res) => {
  const { city, budget } = req.body;

  const matches = await User.find({
    city,
    budget: { $lte: budget + 2000 } // soft match
  });

  res.json(matches);
};
