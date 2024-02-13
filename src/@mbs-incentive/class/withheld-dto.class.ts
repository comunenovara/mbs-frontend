import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsWithheldDto {
	id?: number;

	description: string;
	amount: any;
	percentage: any;
	active: boolean;

	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}