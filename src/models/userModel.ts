type User = {
  username: string;
  password: string;
};

const users: User[] = [];

export const findByUsername = async (username: string) => {
  return users.find((user: User) => user.username === username);
};

export const create = async (user: User) => {
  users.push(user);
  return user;
};
