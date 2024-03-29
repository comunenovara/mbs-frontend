import { MbsBeneficiaryDto } from "./beneficiary-dto.class";
import { MbsGovernativeProcurementLotDto } from "./governative-procurement-lot-dto.class";
import { MbsRoleDto } from "./role-dto.class";

export class MbsIncentiveAssignationRoleDto {
	id?: number;


	beneficiaryId?: number | null;
	beneficiary: MbsBeneficiaryDto;
	procurementLotId?: number | null;
	procurementLot: MbsGovernativeProcurementLotDto;
	assignationRoleId?: number | null;
	assignationRole: MbsRoleDto;

}