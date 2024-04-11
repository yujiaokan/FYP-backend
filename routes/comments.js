import express from "express";
import { postchargercomment, commentDetails} from "../controllers/comments.js";

const router = express.Router();

router.post("/postcomments/:chargerId",postchargercomment);

router.get("/getcomments/:chargerId",commentDetails);

export default router;

