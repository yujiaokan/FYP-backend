import express from "express";
import { postchargerdetail, chargerDetails,updateCharger,deleteCharger,mapDetailsByid,usrByuid,updaterating} from "../controllers/maps.js";


const router = express.Router();

router.post("/charger",postchargerdetail);


router.put("/updateprofile/:useruid",updateCharger);
router.get("/details",chargerDetails);
router.get("/detailsbyid/:id",mapDetailsByid);
router.put("/updaterate/:id",updaterating);
router.delete("/elecharger/:useruid",deleteCharger);
router.get("/idtifyinguser/:useruid",usrByuid);

export default router;
