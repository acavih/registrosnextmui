import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CanvasButtonWrapper from '../CanvasButtonWraper';

const RegistrosPieChart = ({data, titleChart}) => {
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: titleChart
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: data.map(d => ({...d, y: d.value}))
            }
        ]
    }

    return (
        <CanvasButtonWrapper>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </CanvasButtonWrapper>
    );
};

export default RegistrosPieChart;
