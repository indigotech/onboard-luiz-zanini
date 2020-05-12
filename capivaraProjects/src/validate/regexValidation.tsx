import { Alert } from "react-native";

const reEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;
const reDate: RegExp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const rePhone: RegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const reId: RegExp = /^[0-9]*$/;
export class validateRegex {


    Email(email : string) : boolean{

        return reEmail.test(String(email).toLowerCase());

    }

    Password(password : string) : boolean {

        return rePassword.test(password);

    }

    dateBirth(dateBirth : string) : boolean {

        if(reDate.test(dateBirth)){
            const birth : Date = new Date(dateBirth);
            const Actual : Date = new Date();
            console.log(birth);
            console.log(Actual);
            return birth.getTime < Actual.getTime ;
        }
        return false;
    }

    Phone(phoneNumber : string) : boolean{
        return rePhone.test(phoneNumber);
    }

    Id(Id : string) : boolean{
        return reId.test(Id);
    }

}

