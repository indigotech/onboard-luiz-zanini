import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native'

const H1Style = styled.Text`
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #000000;
    font-weight: bold;
    text-align: center;
`;

export const H1: React.FC = (props) => {

    return(
        <H1Style>
            <Text>{props.children}</Text>
        </H1Style>
    );

}