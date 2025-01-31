export const hashPassword = async (password: string) => {
  const hashedPassword = await Bun.password.hash(password);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValidPassword = await Bun.password.verify(password, hashedPassword);
  return isValidPassword;
};
