
import { PigesOrganizationDTO } from "./organizationDTO.class";
import { PigesIdentityDTO } from "./identityDTO.class";
export class PigesAccountDTO {

    id?: number;

    accountCode: String;
    completeName: String;

    organization: PigesOrganizationDTO;
    identity: PigesIdentityDTO;
}