import { Comment } from "../models/comments.js";

export const postchargercomment = async (req, res, next) => {
    const {
        userName,
        commentText,
        createdAt,
        useruuid,
        
    } = req.body;
    const chargerId = req.params.chargerId;


const comments=await Comment.create({
    chargerId,
    userName,
    commentText,
    createdAt,
    useruuid,
});
    res.status(201).json({
        success:true,
        comments,
    });
  };



  export const commentDetails = async (req, res, next) => {
    try {
        const chargerID = req.params.chargerId;
        const commentsCharger = await Comment.find({ chargerId: chargerID }).sort({createdAt:-1}); // Fetch specific documents from the Maps collection
        res.json(commentsCharger);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  };

 