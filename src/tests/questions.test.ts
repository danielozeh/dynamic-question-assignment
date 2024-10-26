import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Question from '../models/Question';
import CycleAssignment from '../models/CycleAssignment';
import questionService from '../services/questionService';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Question.deleteMany({});
  await CycleAssignment.deleteMany({});
});

describe('questionService', () => {
  describe('calculateCurrentCycleWeek', () => {
    it('should return a cycle number based on the date', () => {
      const cycleWeek = questionService.calculateCurrentCycleWeek();
      expect(typeof cycleWeek).toBe('number');
    });
  });

  describe('assignQuestionsToCycle', () => {
    beforeEach(async () => {
      // Prepare questions for each region
      await Question.insertMany([
        { content: 'Question 1 - Singapore' },
        { content: 'Question 2 - Singapore' },
        { content: 'Question 3 - Singapore' },
      ]);
      await Question.insertMany([
        { content: 'Question 1 - US' },
        { content: 'Question 2 - US' },
        { content: 'Question 3 - US' },
      ]);
    });

    it('should assign questions to cycles correctly', async () => {
      await questionService.assignQuestionsToCycle();

      const singaporeAssignments = await CycleAssignment.find({ region: 'Singapore' });
      const usAssignments = await CycleAssignment.find({ region: 'US' });

      expect(singaporeAssignments.length).toBe(1);
      expect(usAssignments.length).toBe(1);

      expect(singaporeAssignments[0].cycle).toBe(questionService.calculateCurrentCycleWeek());
      expect(usAssignments[0].cycle).toBe(questionService.calculateCurrentCycleWeek());
    });

    it('should upsert and replace previous assignments on re-run', async () => {
      await questionService.assignQuestionsToCycle();
    
      // Change the cycle week for testing upsert
      const mockCycle = jest.spyOn(questionService, 'calculateCurrentCycleWeek');
      mockCycle.mockReturnValueOnce(1);
    
      await questionService.assignQuestionsToCycle();
    
      const singaporeAssignments = await CycleAssignment.find({ region: 'Singapore' });
      const usAssignments = await CycleAssignment.find({ region: 'US' });
    
      expect(singaporeAssignments.length).toBe(1);
      expect(usAssignments.length).toBe(1);
      expect(singaporeAssignments[0].cycle).toBe(1);
      expect(usAssignments[0].cycle).toBe(1);
    
      // Restore the original implementation
      mockCycle.mockRestore();
    });    
  });

  describe('getAssignedQuestion', () => {
    it('should return assigned question for the current cycle and region', async () => {
      const currentCycle = questionService.calculateCurrentCycleWeek();
      const question = await Question.create({ content: 'Assigned Question - Singapore' });
      
      const cycleAssignment = await CycleAssignment.create({
        region: 'Singapore',
        questionId: question._id,
        cycle: currentCycle,
      });

      console.log('Cycle Assignment', cycleAssignment);

      const assignedQuestion = await questionService.getAssignedQuestion('Singapore');
      expect(assignedQuestion).toBe('Assigned Question - Singapore');
    });

    it('should return null if no question is assigned for the region in the current cycle', async () => {
      const assignedQuestion = await questionService.getAssignedQuestion('US');
      expect(assignedQuestion).toBeNull();
    });
  });
});
