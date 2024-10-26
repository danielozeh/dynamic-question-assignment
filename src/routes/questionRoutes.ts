import { Router } from 'express';
import { getQuestionForRegion, createQuestion } from '../controllers/questionController';

const router = Router();

router.get('/question/:region', getQuestionForRegion);
router.post('/questions', createQuestion);

export default router;
