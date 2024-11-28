const indexService = require("../src/services/index");

const signupController = async (req, res) => {
  try {
    const response = await userService.signup(req);
    return res.status(response.status).json({
      message: response.message,
      user: response.user || null,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const response = await login(req);
    return res.status(response.status).json({
      message: response.message,
      user: response.user || null,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signupController,
  loginController,
};
