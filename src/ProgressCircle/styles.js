import styled from "styled-components/native"
import {TextInput} from 'react-native'

export const Container = styled.View`
   width: 200px;
   height: 200px;
   background-color: #000;
   border-radius: 100px;
   align-items: center;
   justify-content: center;
   elevation: 10;
   border: 10px solid #0F7EC0;
 `;

export const Text = styled(TextInput)`
 font-size: ${props => props.radius / 6};
 color: ${props => props.textColor ?? props.color};
 text-align: center;
  margin-top: 80px; 
`;
