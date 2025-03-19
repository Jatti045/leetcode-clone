import express from "express";

import { getSubmission, executeCode } from "../controller/actions-controller";

const router = express.Router();

router.post("/execute-code", executeCode);
router.post("/get-submission", getSubmission);

export default router;
