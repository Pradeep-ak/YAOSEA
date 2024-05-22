const express = require('express');
const Department = require('../../models/department');
const department = require('../../config/menu.json')
const router = express.Router();

router.get('/test',(req, res)=>res.json({msg:'Hello Test Api Working..!!!!'}))

//Handler Menu
router.get('/menu',async (req, res)=>{
    try{
        //const department = await Department.find({type: "department"})
        console.log(department.menu[0])
        res.status(200).json(
            {
                activeLabel: department.menu[0].name,
                navLeaf: department.menu.map(function(dept, i){
                    return {index:i, label:camelize(dept.name), link:'/c/'+dept.seoname}
                })
            }
        )
        
    } catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Error : '+ err.message})
    }
    
})

router.get('/home',(req, res) => res.json(
    {
        slots:[
            {
                id:1,
                htmlContent:'<div style="width:200px"></div>'
            }, {
                id:2,
                htmlContent:'<div style="width:200px"></div>'
            }
        ]
    }));

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}    
module.exports=router;

