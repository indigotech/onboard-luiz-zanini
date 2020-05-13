import { Alert } from "react-native";

const reEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;
const reDate: RegExp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const rePhone: RegExp = /^\d$/;

export class ValidateRegex {


    email(email : string) : boolean{

        return reEmail.test(String(email).toLowerCase());

    }

    password(password : string) : boolean {

        return rePassword.test(password);

    }

    dateBirth(dateBirth : string) : boolean {

        if(reDate.test(dateBirth)){
            const dateBirthSplit = dateBirth.split('/');

            const actual : Date = new Date();
            const birth : Date = new Date(+dateBirthSplit[2], +dateBirthSplit[1] -1 , +dateBirthSplit[0]);

            return birth.getTime() < actual.getTime() ;
        }
        return false;
    }

    name(nome : string) : boolean{
        return nome.length != 0
    }

    phone(phoneNumber : string) : boolean{
        return rePhone.test(phoneNumber);
    }

    id(Id : string) : boolean{
        return reId.test(Id);
    }

    userRole(role : string) : boolean{

        return role.toLowerCase() == 'admin' || role.toLowerCase() == 'user';

    }

}

