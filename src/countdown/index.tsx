import { Container } from '@chakra-ui/react';
import { ShowCounter } from './ShowCounter';

type CountdownProps = {
    endDate: Date
}

export const Countdown: React.FC<CountdownProps> = (props): JSX.Element => {
    const { endDate } = props;

    return (
        <Container maxW='container.lg' pt={4}>
            <ShowCounter endDate={endDate} />
        </Container>
    )
}