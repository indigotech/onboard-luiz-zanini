import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native'

interface H1Props {
    title : string
}

const H1Style = styled.Text`
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #000000;
    font-weight: bold;
    text-align: center;
`;

export const H1: React.FC<H1Props> = (props) => {

    return(
        <H1Style>
            <Text>{props.title}</Text>
        </H1Style>
    );

}