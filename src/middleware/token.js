module.exports = (token) => {
    return {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  };