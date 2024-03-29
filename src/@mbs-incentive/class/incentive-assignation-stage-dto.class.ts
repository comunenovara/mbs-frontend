import { MbsIncentiveAssignationRoleDto } from "./incentive-assignation-role-dto.class";
import { MbsIncentiveRoleValueDto } from "./incentive-role-value-dto.class";

export class MbsIncentiveAssignationStageDto {
	id?: number;

	value: any;

	assignationRoleId?: number | null;
	assignationRole: MbsIncentiveAssignationRoleDto;
	assignationRoleValueId?: number | null;
	assignationRoleValue: MbsIncentiveRoleValueDto;

}