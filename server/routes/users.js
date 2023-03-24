import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,

} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router= express.Router();


/*Read*/
router.get("/:id", verifyToken, getUser);   //:id means that if frontne dis sending some id then the "id" will be replaced by the id name sent by the frontend
router.get("/:id/friends", verifyToken, getUserFriends );

/*Update*/
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
