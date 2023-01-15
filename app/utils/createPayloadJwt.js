const createPayloadJwt = (user) => {
  return {
    id: user?.id,
    name: user?.name,
    username: user?.username,
  };
};

module.exports = createPayloadJwt;
