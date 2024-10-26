import cron from 'node-cron';
import questionService from '../services/questionService';

// Run cron job every Monday at 7 PM (SGT, GMT+8)
cron.schedule('0 19 * * 1', async () => {
  console.log('Running question assignment cron job...');
  await questionService.assignQuestionsToCycle();
  console.log('Question assignment completed.');
});
