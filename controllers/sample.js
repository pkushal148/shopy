import userModel from "../models/userModel.js";

const sampleRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    console.log(name);
    const alreadyUser = await userModel.findOne({ email });
    if (alreadyUser) {
      console.log(alreadyUser);
    }
    // return res.status(201).send({
    //   success: false,
    //   message: "error in registering",
    //   error,
    // });
  } catch (error) {
    console.error(error);
  }
};

export { sampleRegister };
