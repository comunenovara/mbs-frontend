import { MbsIncentiveRoleValueDto } from "./incentive-role-value-dto.class";

export class MbsIncentiveAssignationStageDto {
	id?: number;

	value: any;

	assignationRoleValueId?: number | null;
	assignationRoleValue: MbsIncentiveRoleValueDto;

}