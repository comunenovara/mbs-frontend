import { MbsProjectDto } from "./project-dto.class";
import { MbsRoleDto } from "./role-dto.class";
import { MbsWorkCategoryDto } from "./work-category-dto.class";
import { MbsEmployeeDto } from "./employee-dto.class";
import { MbsCompanyDto } from "./company-dto.class";

export class MbsAssignementDto {
	id?: number;

	external: boolean;

	projectId?: number;
	project: MbsProjectDto;
	roleId?: number;
	role: MbsRoleDto;
	workCategoryId?: number;
	workCategory: MbsWorkCategoryDto;
	employeeId?: number;
	employee: MbsEmployeeDto;
	companyId?: number;
	company: MbsCompanyDto;

}