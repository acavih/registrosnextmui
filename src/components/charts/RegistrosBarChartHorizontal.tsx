import { Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CanvasButtonWrapper from '../CanvasButtonWraper';

function HorizontalBarChart({data: horizontalBarChartData, title}) {
    const options: Highcharts.Options = {
        chart: {
            type: 'bar'
        },
        title: {
            text: title,
            align: 'left'
        },
        xAxis: {
            categories: horizontalBarChartData.map(d => d.name),
            gridLineWidth: 1,
            lineWidth: 0,
            labels: {
                style: {
                    fontSize: 18 as any
                }
            }
        },
        yAxis: {
            min: 0,
            labels: {
                overflow: 'justify',
                style: {
                    fontSize: 15 as any
                }
            },
            gridLineWidth: 0
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            series: {
                lineWidth: 50
            },
            bar: {
                borderRadius: '50%',
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 160,
            floating: true,
            borderWidth: 1,
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Values',
            data: horizontalBarChartData.map(a => a.value)
        } as any]
    };

    return (
        <CanvasButtonWrapper>
            <Box>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Box>
        </CanvasButtonWrapper>
    );
}
  
export default HorizontalBarChart;