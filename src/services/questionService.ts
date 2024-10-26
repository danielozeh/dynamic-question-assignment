import CycleAssignment from '../models/CycleAssignment';
import Question from '../models/Question';

const CYCLE_DURATION_DAYS = 7; // This can be made configurable (e.g., from an environment variable)

// Calculates the current cycle number based on the cycle duration
const calculateCurrentCycleWeek = (): number => {
  const startOfEpoch = new Date('2024-10-20T13:00:00+08:00').getTime(); // Starting point, configurable
  const now = Date.now();
  const cycleDurationMs = CYCLE_DURATION_DAYS * 24 * 60 * 60 * 1000;
  return Math.floor((now - startOfEpoch) / cycleDurationMs);
};

// Assigns questions to each region's cycle
const assignQuestionsToCycle = async (): Promise<void> => {
  const regions = ['Singapore', 'US'];
  const questionsPerRegion = {
    Singapore: await Question.find({}), // Retrieve all questions for Singapore
    US: await Question.find({}) // Retrieve all questions for US
  };

  const currentCycle = calculateCurrentCycleWeek();

  await Promise.all(
    regions.map(async (region) => {
      const questionIndex = currentCycle % questionsPerRegion[region as keyof typeof questionsPerRegion].length;
      const question = questionsPerRegion[region as keyof typeof questionsPerRegion][questionIndex];

      await CycleAssignment.updateOne(
        { region, cycle: currentCycle },
        { region, questionId: question._id, cycle: currentCycle },
        { upsert: true }
      );
    })
  );

  console.log('Questions assigned for each region in the current cycle.');
};

// Retrieve the assigned question for a given region and cycle
const getAssignedQuestion = async (region: string): Promise<string | null> => {
  const currentCycle = calculateCurrentCycleWeek();
  console.log(`Current Cycle: ${currentCycle}, Region: ${region}`);

  const assignment = await CycleAssignment.findOne({ region, cycle: currentCycle }).populate('questionId');

  console.log('Assignment', assignment);

  if (assignment) {
    if (assignment.questionId) {
      return (assignment.questionId as any).content;
    } else {
      console.warn(`No question found for assignment in cycle ${currentCycle} and region ${region}`);
    }
  } else {
    console.warn(`No assignment found for cycle ${currentCycle} and region ${region}`);
  }
  
  return null;
};

const createQuestion = async (content: string): Promise<any> => {
  try {
    const newQuestion = new Question({ content });
    await newQuestion.save();
    return newQuestion;
  } catch (error) {
    console.error('Error creating question:', error);
    throw new Error('Internal server error');
  }
};


export default {
  assignQuestionsToCycle,
  getAssignedQuestion,
  calculateCurrentCycleWeek,
  createQuestion
};
