import { MbsIncentiveCalculationMethodDto } from "./incentive-calculation-method-dto.class";

export class MbsIncentiveCalculationFactorDto {
	id?: number;

	minval: any;
	maxval: any;
	defaultval: any;

	incentiveCalculationMethodId?: number | null;
	incentiveCalculationMethod: MbsIncentiveCalculationMethodDto;

}