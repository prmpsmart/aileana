import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class InitiateCallDto {
  @ApiProperty({ example: 'callee-user-id' })
  @IsString()
  calleeId: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(1)
  ratePerMinute: number;
}
