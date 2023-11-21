import styled from 'styled-components';

const Heading = styled.h1`
	font-size: 56px;
	font-weight: 700;
	line-height: 128%;
	text-align: center;
`;

interface Props {
	text: string;
}

const Title = ({ text }: Props) => {
	return <Heading>{text}</Heading>;
};

export default Title;
