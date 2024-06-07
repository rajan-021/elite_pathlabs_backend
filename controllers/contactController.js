import Contact from "../models/ContactSchema.js";

export const contactMessage = async (req, res) => {
  try {
    const contact = new Contact({ userId: req.body.userId, ...req.body });
    const result = await contact.save();
    res.status(200).json({
      message: "Query submitted successfully",
      data: result,
    });
  } catch (e) {
    res.status(404).json(e);
  }
};
