import { MbsIncentiveRoleAssignationDto } from "./incentive-role-assignation-dto.class";
import { MbsIncentiveCalculationValueDto } from "./incentive-calculation-value-dto.class";

export class MbsIncentiveAssignationDto {
	id?: number;

	value: any;
	preAmount: any;
	amount: any;

	assignationId?: number | null;
	assignation: MbsIncentiveRoleAssignationDto;
	calculationValueId?: number | null;
	calculationValue: MbsIncentiveCalculationValueDto;

}