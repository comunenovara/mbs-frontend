import { MbsStageDto } from "./stage-dto.class";
import { MbsRoleDto } from "./role-dto.class";

export class MbsRoleValueDto {
	id?: number;

	min: any;
	maax: any;
	defaul: any;

	stageId?: number | null;
	stage: MbsStageDto;
	roleId?: number | null;
	role: MbsRoleDto;

}