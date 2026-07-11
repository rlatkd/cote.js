import { Body, Controller, Get, Post } from "@nestjs/common";
import {
  createSubmissionSchema,
  type CreateSubmissionInput,
  type Submission,
} from "@cotejs/contracts";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { SubmissionsService } from "./submissions.service";

@Controller("submissions")
export class SubmissionsController {
  constructor(private readonly submissions: SubmissionsService) {}

  @Get()
  findAll(): Promise<Submission[]> {
    return this.submissions.findAll();
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createSubmissionSchema))
    body: CreateSubmissionInput,
  ): Promise<Submission> {
    return this.submissions.create(body);
  }
}
