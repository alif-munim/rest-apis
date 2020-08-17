const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
    res.json({ 
        posts: {
            title: "1st Post",
            description: "Private data! Do not share!"
        }
    });
})

module.exports = router;