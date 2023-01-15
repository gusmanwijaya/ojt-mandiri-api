module.exports = {
  createTokenUser: (user) => ({
    id: user?.id,
    name: user?.name,
    username: user?.username,
  }),
};
