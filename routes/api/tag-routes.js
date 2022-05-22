const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");


// Returns all tags
router.get("/", async (req, res) => {

  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns a tag buy its 'id'
router.get("/:id", async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "ERROR: No tag found with that id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new tag
router.post("/", (req, res) => {

  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Updates a tag by its 'id'
router.put("/:id", (req, res) => {

Tag.update(
  {
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    },
  }
)
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));

});

// Deletes a tag by its 'id'
router.delete("/:id", async (req, res) => {

  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "ERROR: No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
