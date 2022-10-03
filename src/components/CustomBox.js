import styled from 'styled-components';
import { Box } from '@mui/material';

const CustomBox = styled(Box)`
  min-height: ${props => (props.minHeight || '100px')};;
  border: 1px solid #fff8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${props => (props.pl || '10px')};
  padding-right: 10px;
  backgroundColor: ${props => (props.backgroundColor || 'white')};
`;

export default CustomBox;