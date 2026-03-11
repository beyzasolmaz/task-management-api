const { json } = require("express");
const db= require("../config/db");

exports.createTask =(req,res)=>{
    const {title,description}= req.body;
    const userId = req.user.id;

    const sql ="INSERT INTO tasks (title,description,user_id) VALUES (?,?,?)";

    db.query(sql,[title,description,userId],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message: "database error"});
        }

        res.status(201).json({
            message: "Task created successfully",
            taskId: result.insertId
        });
    });

    
};
exports.getAllTasks = (req, res) => {
    const userId=req.user.id; 
    const sql = "SELECT * FROM tasks WHERE user_id =?";

    db.query(sql,[userId] ,(err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "database error" });
        }

        res.status(200).json(results);
    });
};
exports.getTaskById = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const sql = "SELECT * FROM tasks WHERE id = ? AND user_id = ?";

    db.query(sql, [id,userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(results[0]);
    });
};
exports.updateTask= (req,res)=> {
    const{id}= req.params;
    const {title,description,status}= req.body;
    const  userId= req.user.id;

    const sql = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id= ? AND user_id = ?";

    db.query(sql,[title, description,status,id,userId], (err,result)=>
    {
        if (err){
            console.error(err);
            return res.status(500).json({message: "database error"});
        }
        if(result.affectedRows===0){
            return res.status(404).json({message: "Task not found"});

        }
        res.status(200).json({message:"task update successfully"});
    });

};
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const userId= req.user.id;

    const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";

    db.query(sql, [id,userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    });
};