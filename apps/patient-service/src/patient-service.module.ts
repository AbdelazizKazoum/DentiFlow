import { Module } from '@nestjs/common';
import { PatientServiceController } from './patient-service.controller';
import { PatientServiceService } from './patient-service.service';

@Module({
  imports: [],
  controllers: [PatientServiceController],
  providers: [PatientServiceService],
})
export class PatientServiceModule {}
