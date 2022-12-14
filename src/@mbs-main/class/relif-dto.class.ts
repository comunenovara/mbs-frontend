import { MbsAssetDto } from "./asset-dto.class";

export class MbsRelifDto {
	id?: number;

	description: string;
	startDate: Date;
	endDate: Date;

	assetId?: number;
	asset: MbsAssetDto;

}