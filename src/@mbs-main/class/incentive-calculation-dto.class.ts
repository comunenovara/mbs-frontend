import { MbsGovernativeProcurementLotDto } from "./governative-procurement-lot-dto.class";
import { MbsIncentiveRegulationDto } from "./incentive-regulation-dto.class";

export class MbsIncentiveCalculationDto {
	id?: number;

	description: string;
	confirmed: boolean;
	preAmount: any;
	amount: any;

	governativeProcurementLotId?: number | null;
	governativeProcurementLot: MbsGovernativeProcurementLotDto;
	regulationId?: number | null;
	regulation: MbsIncentiveRegulationDto;

}