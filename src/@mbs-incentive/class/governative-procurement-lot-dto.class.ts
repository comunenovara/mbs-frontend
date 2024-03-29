import { MbsProcurementTypeDto } from "./procurement-type-dto.class";

export class MbsGovernativeProcurementLotDto {
	id?: number;

	code: string;
	description: string;
	amount: any;

	typeId?: number | null;
	type: MbsProcurementTypeDto;

}