import React from 'react';
import { Text, View, ActivityIndicator, Button } from 'react-native';
import styled from 'styled-components/native'

interface H1Props {
    title : string,
    pressButton : any,
    loading : boolean,
}

const ButtonStyled = styled.TouchableOpacity`
`;
    
const ViewStyled = styled.View`
    background-color: #8A2BE2;
    height: 44px;
    border-radius: 15px;
    justify-content: center;
`;

const ButtonText = styled.Text`
    font-size: 24px;
    color: white;
    text-align: center;
`;

export const ButtonStyle: React.FC<H1Props> = (props) => {

    return(
        <ViewStyled>
            {props.loading ?
                <ActivityIndicator size="small" color="#0000ff" /> :
                <ButtonStyled
                    onPress={props.pressButton}
                >
                    <ButtonText>{props.title}</ButtonText>
                </ButtonStyled>
            }
        </ViewStyled>
    );

}