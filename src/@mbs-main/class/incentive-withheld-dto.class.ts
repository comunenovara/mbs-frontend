import { MbsProcurementTypeDto } from "./procurement-type-dto.class";
import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsIncentiveWithheldDto {
	id?: number;

	description: string;
	active: boolean;
	amount: any;
	percentage: any;

	procurementTypeId?: number | null;
	procurementType: MbsProcurementTypeDto;
	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}