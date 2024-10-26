import { Request, Response } from 'express';
import questionService from '../services/questionService';
import ResponseHandler from '../utils/response';

export const getQuestionForRegion = async (req: Request, res: Response): Promise<void> => {
  const { region } = req.params;
  try {
    const questionId = await questionService.getAssignedQuestion(region);
    if (questionId) {
      ResponseHandler.sendSuccess(res, {
        message: 'Question assigned successfully',
        data: questionId
      });
    } else {
      ResponseHandler.sendError(res, {
        message: 'No question assigned for this cycle.',
      });
    }
  } catch (error) {
    ResponseHandler.internalServerError(res, error as string);
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    // Validate the input
    if (!content) {
      ResponseHandler.sendError(res, {
        message: 'Content is required',
      });
      return;
    }

    // Create a new question
    const newQuestion = await questionService.createQuestion(content);

    ResponseHandler.sendSuccess(res, {
      message: 'Question created successfully',
      data: newQuestion,
      status_code: 201
    });
  } catch (error) {
    ResponseHandler.internalServerError(res, error as string);
  }
};
