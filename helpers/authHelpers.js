import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
