import { MbsBeneficiaryDto } from "./beneficiary-dto.class";
import { MbsRoleDto } from "./role-dto.class";
import { MbsIncentiveAssignationStageDto } from "./incentive-assignation-stage-dto.class";

export class MbsIncentiveAssignationRoleDto {
	id?: number;


	beneficiaryId?: number | null;
	beneficiary: MbsBeneficiaryDto;
	assignationRoleId?: number | null;
	assignationRole: MbsRoleDto;
	assignationStageId?: number | null;
	assignationStage: MbsIncentiveAssignationStageDto;

}