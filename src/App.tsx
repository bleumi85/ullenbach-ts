import { Box, Heading } from '@chakra-ui/react';
import { Countdown } from 'countdown';

const App = () => {
    var endDate = new Date(2022, 9, 8, 11);

    return (
        <Box p={3}>
            <Heading fontSize={['lg', '2xl', '4xl', '7xl']} textAlign='center'>Hochzeits Countdown</Heading>
            <Heading fontSize={['2xs', 'sm', 'lg', '2xl']} textAlign='center'>
                Damit du immer weißt wie lange es noch bis zum {endDate.toLocaleDateString('de-DE', {weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'})} dauert.
            </Heading>
            <Countdown endDate={endDate} />
        </Box>
    )
}

export default App;