import { MbsIncentiveCalculationDto } from "./incentive-calculation-dto.class";
import { MbsIncentiveRegulationValueDto } from "./incentive-regulation-value-dto.class";

export class MbsIncentiveCalculationValueDto {
	id?: number;

	value: any;

	calculationId?: number | null;
	calculation: MbsIncentiveCalculationDto;
	regulationValueId?: number | null;
	regulationValue: MbsIncentiveRegulationValueDto;

}