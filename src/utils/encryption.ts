import { compare, hash } from "bcryptjs";

const hashPassword = async (password: string) => {
  return hash(password, 10).then((hash) => {
    return hash;
  });
};

const comparePassword = async (password: string, passwordHashed: string) => {
  return compare(password, passwordHashed).then((match) => {
    return match;
  });
};

export { hashPassword, comparePassword };
