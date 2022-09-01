import { Box, Grid, GridItem, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import moment from 'moment';
import { Component } from 'react';

type ShowCounterState = {
    labelValue: number,
    absolute: {
        months: number, days: number, hours: number, minutes: number, seconds: number
    },
    total: {
        days: number, hours: number, minutes: number, seconds: number
    }
}

type ShowCounterProps = {
    endDate: Date
}

export class ShowCounter extends Component<ShowCounterProps, ShowCounterState> {
    state: ShowCounterState = {
        labelValue: 0,
        absolute: {
            months: 99, days: 99, hours: 99, minutes: 99, seconds: 99
        },
        total: {
            days: 99, hours: 99, minutes: 99, seconds: 99
        }
    }

    sizeMap: number[][];
    marks: { value: number, label: string }[];
    interval: NodeJS.Timer;

    componentDidMount() {
        this.sizeMap = [
            [12, 6, 6, 6, 6],
            [0, 12, 4, 4, 4],
            [0, 0, 12, 6, 6],
            [0, 0, 0, 12, 12],
            [0, 0, 0, 0, 12]
        ];

        this.marks = [
            { value: 0, label: 'Monate' },
            { value: 1, label: 'Tage' },
            { value: 2, label: 'Stunden' },
            { value: 3, label: 'Minuten' },
            { value: 4, label: 'Sekunden' }
        ];

        this.interval = setInterval(() => {
            const date = this.calculateCountdown(this.props.endDate);
            date ? this.setState(prevState => ({
                ...prevState,
                absolute: { months: date.months, days: date.days, hours: date.hours, minutes: date.mins, seconds: date.secs },
                total: { days: date.daysTotal, hours: date.hoursTotal, minutes: date.minsTotal, seconds: date.secsTotal }
            })) : this.stop();
        }, 1000);
    }

    componentWillUnmount() {
        this.stop();
    }

    calculateCountdown(endDate: Date) {
        let diff = moment(endDate).diff(moment());
        let duration = moment.duration(diff);

        const timeLeft = {
            months: duration.months(),
            days: duration.days(),
            daysTotal: duration.asDays(),
            hours: duration.hours(),
            hoursTotal: duration.asHours(),
            mins: duration.minutes(),
            minsTotal: duration.asMinutes(),
            secs: duration.seconds(),
            secsTotal: duration.asSeconds()
        }

        return timeLeft;
    }

    stop() {
        clearInterval(this.interval);
    }

    addThousandPoints(value: number) {
        let temp_str = Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        while (temp_str.length < 2) {
            temp_str = '0' + value
        }
        return temp_str
    }

    handleChange = (newValue: number) => {
        this.setState(prevState => ({
            ...prevState,
            labelValue: newValue
        }))
    }

    render() {
        const { labelValue, absolute, total } = this.state;

        if (!this.sizeMap) return null;

        return (
            <Grid templateColumns='repeat(12, 1fr)' gap={3} w='100%'>
                <GridItem colSpan={12} w='100%'>
                    <Box p={6}>
                        <Slider min={0} max={4} w='100%' value={labelValue} onChange={this.handleChange}>
                            {this.marks.map((mark, index) => (
                                <SliderMark key={index} value={mark.value}>
                                    {mark.label}
                                </SliderMark>
                            ))}
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                </GridItem>
                {labelValue > 0 ? null :
                    <GridItem colSpan={this.sizeMap[labelValue][0]} bg='whiteAlpha.900' p={2} textAlign='center' boxShadow='md'>
                        {this.addThousandPoints(absolute.months)}
                    </GridItem>
                }
                {labelValue > 1 ? null :
                    <GridItem colSpan={this.sizeMap[labelValue][1]} bg='whiteAlpha.900' p={2} textAlign='center' boxShadow='md'>
                        {labelValue === 1 ? this.addThousandPoints(total.days) : this.addThousandPoints(absolute.days)}
                    </GridItem>
                }
                {labelValue > 2 ? null :
                    <GridItem colSpan={this.sizeMap[labelValue][2]} bg='whiteAlpha.900' p={2} textAlign='center' boxShadow='md'>
                        {labelValue === 2 ? this.addThousandPoints(total.hours) : this.addThousandPoints(absolute.hours)}
                    </GridItem>
                }
                {labelValue > 3 ? null :
                    <GridItem colSpan={this.sizeMap[labelValue][3]} bg='whiteAlpha.900' p={2} textAlign='center' boxShadow='md'>
                        {labelValue === 3 ? this.addThousandPoints(total.minutes) : this.addThousandPoints(absolute.minutes)}
                    </GridItem>
                }
                {labelValue > 4 ? null :
                    <GridItem colSpan={this.sizeMap[labelValue][4]} bg='whiteAlpha.900' p={2} textAlign='center' boxShadow='md'>
                        {labelValue === 4 ? this.addThousandPoints(total.seconds) : this.addThousandPoints(absolute.seconds)}
                    </GridItem>
                }
            </Grid>
        )
    }
}