const router = require("express").Router();

router.post("/create", (req, res) => {
  try {
    res.status(200).send({
      statusCode: 200,
      message: "user created successfuly",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/update/:id", (req, res) => {
  try {
    res.status(200).send({
      statusCode: 200,
      message: "user updated successfuly",
      data: req.params.id,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/get/:id", (req, res) => {
  try {
    res.status(200).send({
      statusCode: 200,
      message: "user get successfuly",
      data: {
        username: "User-1",
        id: req.params.id,
      },
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    res.status(200).send({
      statusCode: 200,
      message: "user deleted successfuly",
      data: req.params.id,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
