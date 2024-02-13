import { MbsCalculationMethodDto } from "./calculation-method-dto.class";

export class MbsCalculationFactorDto {
	id?: number;

	min: any;
	maax: any;
	value: any;

	methodId?: number | null;
	method: MbsCalculationMethodDto;

}