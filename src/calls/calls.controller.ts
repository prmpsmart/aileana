import { Controller, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { CallsService } from './calls.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InitiateCallDto } from './dto/initiate-call.dto';

@ApiTags('Calls')
@ApiBearerAuth('access-token')
@Controller('calls')
@UseGuards(JwtAuthGuard)
export class CallsController {
  constructor(private callsService: CallsService) {}

  @Post('initiate')
  initiate(@Req() req, @Body() dto: InitiateCallDto) {
    return this.callsService.initiate(
      req.user.userId,
      dto.calleeId,
      dto.ratePerMinute,
    );
  }

  @Post(':id/start')
  start(@Param('id') id: string) {
    return this.callsService.start(id);
  }

  @Post(':id/end')
  end(@Param('id') id: string) {
    return this.callsService.end(id);
  }
}
