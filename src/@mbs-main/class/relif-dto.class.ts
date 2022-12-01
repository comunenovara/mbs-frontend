import { MbsAssetDto } from "./asset-dto.class";

export class MbsRelifDto {
	id?: number;

	date: Date;
	reason: string;

	asset: MbsAssetDto;

}