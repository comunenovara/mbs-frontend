import { MbsIncentiveBeneficiaryDto } from "./incentive-beneficiary-dto.class";
import { MbsIncentiveCalculationDto } from "./incentive-calculation-dto.class";
import { MbsIncentiveRoleDto } from "./incentive-role-dto.class";

export class MbsIncentiveRoleAssignationDto {
	id?: number;


	beneficiaryId?: number | null;
	beneficiary: MbsIncentiveBeneficiaryDto;
	calculationId?: number | null;
	calculation: MbsIncentiveCalculationDto;
	roleId?: number | null;
	role: MbsIncentiveRoleDto;

}