import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsRoleDto {
	id?: number;

	description: string;

	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}