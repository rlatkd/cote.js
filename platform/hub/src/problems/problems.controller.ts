import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import type { Problem } from "@cotejs/contracts";
import { ProblemsService } from "./problems.service";

@Controller("problems")
export class ProblemsController {
  constructor(private readonly problems: ProblemsService) {}

  @Get()
  findAll(): Promise<Problem[]> {
    return this.problems.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Problem> {
    return this.problems.findOne(id);
  }
}
