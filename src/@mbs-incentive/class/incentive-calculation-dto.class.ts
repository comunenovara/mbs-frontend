import { MbsGovernativeProcurementLotDto } from "./governative-procurement-lot-dto.class";
import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsIncentiveCalculationDto {
	id?: number;

	description: string;

	procurementId?: number | null;
	procurement: MbsGovernativeProcurementLotDto;
	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}