import { ArgumentsHost } from '@nestjs/common';
import { InvalidTaskError } from '../../../../domain/repository';
import { InvalidTaskErrorFilter } from '../invalid-task-error.filter';

describe('infrastructure/rest/filters/InvalidTaskErrorFilter', () => {
  let invalidTaskErrorFilter: InvalidTaskErrorFilter;
  let mockArgumentsHost: ArgumentsHost;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockStatus = jest.fn();
    mockJson = jest.fn();

    mockStatus.mockImplementation(() => {
      return {
        json: mockJson,
      };
    });

    mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: mockStatus,
        }),
      }),
    } as ArgumentsHost;

    invalidTaskErrorFilter = new InvalidTaskErrorFilter();
  });

  describe('catch()', () => {
    it('should call response status method with http bad request status code', () => {
      // given
      const invalidTaskError: InvalidTaskError = {} as InvalidTaskError;
      const expected: number = 400;

      // when
      invalidTaskErrorFilter.catch(invalidTaskError, mockArgumentsHost);

      // then
      expect(mockStatus).toHaveBeenCalledWith(expected);
    });

    it('should call response status json method with body from invalid task error', () => {
      // given
      const fixedDate: Date = new Date('2017-06-13T04:41:20');
      // @ts-ignore
      jest.spyOn(global, 'Date').mockImplementationOnce(() => fixedDate);

      const invalidTaskError: InvalidTaskError = {
        name: 'InvalidTaskError',
        message: 'A task validation error',
      } as InvalidTaskError;

      const expected: object = {
        statusCode: 400,
        timestamp: fixedDate.toISOString(),
        name: 'InvalidTaskError',
        message: 'A task validation error',
      };

      // when
      invalidTaskErrorFilter.catch(invalidTaskError, mockArgumentsHost);

      // then
      expect(mockJson).toHaveBeenCalledWith(expected);
    });
  });
});
