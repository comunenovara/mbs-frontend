import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsStageDto {
	id?: number;

	description: string;

	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}