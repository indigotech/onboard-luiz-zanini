const reEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;

export class validateRegex {


    Email(email : string) : boolean{

        return reEmail.test(String(email).toLowerCase());

    }

    Password(password : string) : boolean {

        return rePassword.test(password);

    }

}


