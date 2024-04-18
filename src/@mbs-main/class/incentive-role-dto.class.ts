import { MbsProcurementTypeDto } from "./procurement-type-dto.class";
import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsIncentiveRoleDto {
	id?: number;

	description: string;

	procurementTypeId?: number | null;
	procurementType: MbsProcurementTypeDto;
	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}