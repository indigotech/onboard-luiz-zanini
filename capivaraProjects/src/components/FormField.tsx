import React from 'react';
import styled from 'styled-components/native';

interface FormProps {
    title : string,
    validate ? : any,
    handleText : any,
    inputText : string,
    password ? : boolean,
}

interface MyTextInputProps{
    error : boolean,
}

const TextInputStyled = styled.TextInput`
    border: 1px;
    font-size: 12px;
    margin-top: 8px;
    border-color: ${(props : MyTextInputProps) => props.error ?  '#F08080' : '#777777'};
    /* Mudancas que eu fiz */
    height : 22px;
    border-radius : 5px;
`;

const TextStyled = styled.Text`
    font-size: 12px;
    color: #777777;
    margin-bottom: 12px;
`;

const ViewStyled = styled.View`
    height: 85px;
    padding: 7px;
`;


export const FormField : React.FC<FormProps> = (props) => {

    const [error , setError] = React.useState<boolean>(false);


    const handleCheckValidation = () => {

        setError( !props.validate(props.inputText) );
    
    }

    const handleInputText = (text : string) => {
        
        props.handleText(text);
        
        if(error){
            setError( !props.validate(text) );
        }

    }

    return(
      <ViewStyled>
            <TextStyled>{props.title}</TextStyled>
            <TextInputStyled
                error = {error}
                onBlur = {handleCheckValidation}
                onChangeText = {handleInputText}
                secureTextEntry = {props.password}
            />
      </ViewStyled>  
    );

}