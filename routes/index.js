var express = require('express');
var router = express.Router();
router.get('/profile', function(req, res) {
   
if (req.user){
       res.json(req.user);
}
res.json({failed:'not logged in'});
});
router.get('/',function(req,res){
    
})


module.exports = router;
