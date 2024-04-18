import { MbsProcurementTypeDto } from "./procurement-type-dto.class";
import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsIncentiveCalculationMethodDto {
	id?: number;

	description: string;
	code: string;

	procurementTypeId?: number | null;
	procurementType: MbsProcurementTypeDto;
	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}