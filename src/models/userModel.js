const users = [];

module.exports = {
  findByUsername: async (username) =>
    users.find((user) => user.username === username),
  create: async (user) => {
    users.push(user);
    return user;
  },
};
