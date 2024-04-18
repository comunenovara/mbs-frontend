import { MbsIncentiveStageDto } from "./incentive-stage-dto.class";
import { MbsIncentiveRoleDto } from "./incentive-role-dto.class";

export class MbsIncentiveRegulationValueDto {
	id?: number;

	minval: any;
	maxval: any;
	defaultval: any;

	stageId?: number | null;
	stage: MbsIncentiveStageDto;
	roleId?: number | null;
	role: MbsIncentiveRoleDto;

}