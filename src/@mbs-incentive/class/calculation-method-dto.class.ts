import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";
import { MbsProcurementTypeDto } from "./procurement-type-dto.class";

export class MbsCalculationMethodDto {
	id?: number;

	code: string;

	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;
	procurementTypeId?: number | null;
	procurementType: MbsProcurementTypeDto;

}