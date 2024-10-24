import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class PomodoroSessionDto {
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean
}

export class PomodoroRoundDto {
  @IsNumber()
  totalSeconds: number // сколько секунд прошло

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean // выполнено или нет
}
