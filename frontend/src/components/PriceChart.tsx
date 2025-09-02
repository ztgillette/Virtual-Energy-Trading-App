import { VChart } from '@visactor/react-vchart';
import '@arco-design/web-react/dist/css/arco.css';
import { initVChartArcoTheme } from '@visactor/vchart-arco-theme';
initVChartArcoTheme({ defaultMode: 'light' });

type Props = {
  data: number[]
}

function createValues(data: number[]) {

  let data_values = [];

  for(let i=0; i<data.length; i++) {

    let min = (i % 12) * 5;
    let hour = Math.floor(i / 12);

    let min_str = min.toString();
    let hour_str = hour.toString();

    if(min_str.length == 1) {
      min_str = "0" + min_str;
    }

    let time_str = hour_str + ":" + min_str;

    let data_item = { time: time_str, price: data[i]};
    data_values.push(data_item);

  }

  return data_values;

}

export default function PriceChart({data}: Props) {

  const hasData = Array.isArray(data) && data.length > 0;

  const spec = {
    type: 'line',
    data: {
      values: hasData ? createValues(data) : []
    },
    xField: 'time',
    yField: 'price',
    axes: [
      {
        orient: 'bottom' as const,   // keep as literal
        type: 'band' as const,
        title: { visible: true, text: 'Time' },
        tick: { tickCount: 8 },
      },
      {
        orient: 'left' as const,
        type: 'linear' as const,
        title: { visible: true, text: 'Price ($/MWh)' },
        label: { visible: hasData },
      }
    ],
    point: false
  };

  return (
    <div style={{ width: 600, height: 300 }}>

      <VChart spec={spec} />
    </div>
  );
}
