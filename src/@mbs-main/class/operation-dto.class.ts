import { MbsOperationTypeDto } from "./operation-type-dto.class";
import { MbsAssetDto } from "./asset-dto.class";

export class MbsOperationDto {
	id?: number;

	description: string;
	value: any;
	startDate: Date;
	endDate: Date;

	typeId?: number;
	type: MbsOperationTypeDto;
	assetId?: number;
	asset: MbsAssetDto;

}