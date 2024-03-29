import { MbsIncentiveCalculationDto } from "./incentive-calculation-dto.class";
import { MbsRoleValueDto } from "./role-value-dto.class";

export class MbsIncentiveRoleValueDto {
	id?: number;

	value: any;

	incentiveCalculationId?: number | null;
	incentiveCalculation: MbsIncentiveCalculationDto;
	roleValueId?: number | null;
	roleValue: MbsRoleValueDto;

}