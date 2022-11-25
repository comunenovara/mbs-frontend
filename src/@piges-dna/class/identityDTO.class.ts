
import { PigesFipDTO } from "./fipDTO.class";
import { PigesAccountDTO } from "./accountDTO.class";
export class PigesIdentityDTO {

    id?: number;

    identityCode: String;
    email: String;
    firstName: String;
    lastName: String;

    fip: PigesFipDTO;
    account: PigesAccountDTO;
}