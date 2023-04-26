import { MbsProjectDto } from "./project-dto.class";
import { MbsRoleDto } from "./role-dto.class";
import { MbsWorkCategoryDto } from "./work-category-dto.class";
import { MbsEmployeeDto } from "./employee-dto.class";
import { MbsCompanyDto } from "./company-dto.class";

export class MbsAssignementDto {
	id?: number;

	external: boolean;

	projectId?: number | null;
	project: MbsProjectDto;
	roleId?: number | null;
	role: MbsRoleDto;
	workCategoryId?: number | null;
	workCategory: MbsWorkCategoryDto;
	employeeId?: number | null;
	employee: MbsEmployeeDto;
	companyId?: number | null;
	company: MbsCompanyDto;

}