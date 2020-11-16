const express = require("express");
const uuid    = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Get all members
router.get('/',(req,res)=> res.json(members));

//Get single member 
router.get('/:id',(req,res)=> {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.send(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg:`No member found id of ${req.params.id}`});
    }
});

// Create Member
router.post('/', (req, res) => {
    let request = req.body;
    const newMember = {
        id : uuid.v4(),
        name : request.name,
        email : request.email,
        stauts : 'active'
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg : 'Name and Email should be include.' });
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});

//Update member 
router.put('/:id',(req,res)=> {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id == parseInt(req.params.id)){
                member.name = updateMember.name?updateMember.name:member.name;

                member.email = updateMember.email?updateMember.email:member.email;

                res.json({ msg: "Member Updated", member});
            }
        });
    } else {
        res.status(400).json({msg:`No member found id of ${req.params.id}`});
    }
});

//Delete member 
router.delete('/:id',(req,res)=> {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        let allMember = members.filter(member => member.id !== parseInt(req.params.id));
        res.send({ msg : 'Delete Member', members: allMember});
    } else {
        res.status(400).json({msg:`No member found id of ${req.params.id}`});
    }
});

module.exports = router;