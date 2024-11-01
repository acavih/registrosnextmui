import CanvasButtonWrapper from '../CanvasButtonWraper';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

/*const data = [
    { name: 'Enero', value: 120 },
    { name: 'Febrero', value: 200 },
    { name: 'Marzo', value: 150 },
    { name: 'Abril', value: 80 },
    { name: 'Mayo', value: 70 },
];
*/
const RegistrosBarChart = ({data, title}) => {
    const options = {
        chart: {
            type: 'column'

        },
        title: {
            text: title,
            align: 'left'
        },
        xAxis: {
            categories: data.map(d => d.name),
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '1000 metric tons (MT)'
            }
        },
        tooltip: {
            valueSuffix: ' (1000 MT)'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: title,
                data: data.map(d => d.value)
            }
        ]
    }
    return (
        <CanvasButtonWrapper>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </CanvasButtonWrapper>
    );
};

export default RegistrosBarChart;
