import { Alert } from "react-native";

const reEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;
const reDate: RegExp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const rePhone: RegExp = /^\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{3,4}[- ]*[0-9]{4}$/;
const reId: RegExp = /\d$/;

export class validateRegex {


    Email(email : string) : boolean{

        return reEmail.test(String(email).toLowerCase());

    }

    Password(password : string) : boolean {

        return rePassword.test(password);

    }

    dateBirth(dateBirth : string) : boolean {

        if(reDate.test(dateBirth)){
            const dateBirthSplit = dateBirth.split('/');

            const Actual : Date = new Date();
            const birth : Date = new Date(+dateBirthSplit[2], parseInt(dateBirthSplit[1]) -1 , +dateBirthSplit[0]);

            return birth.getTime() < Actual.getTime() ;
        }
        return false;
    }

    Name(nome : string) : boolean{
        return nome.length != 0
    }

    Phone(phoneNumber : string) : boolean{
        return rePhone.test(phoneNumber);
    }

    Id(Id : string) : boolean{
        return reId.test(Id);
    }

}

