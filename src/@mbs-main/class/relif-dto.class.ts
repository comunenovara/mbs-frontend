import { MbsAssetDTO } from "./asset-dto.class";

export class MbsRelifDTO {
	id?: number;

	date: Date;
	creationDate: Date;
	reason: string;

	asset: MbsAssetDTO;

}