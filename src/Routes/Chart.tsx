import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  //IHistorical를 14개나 받아오므로 []가 있어야 함
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <>
      {isLoading ? (
        "차트 로딩 중.."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              //api를 보면 숫자가 number가 아닌 string으로 만들어져있어 에러나서 숫자로 바꿈
              //에이펙스가 해당 위치가 숫자가 아니면 에러띄우면서 거부한다
              data:
                data?.map((price) => [
                  price.time_close,
                  price.open,
                  price.high,
                  price.low,
                  price.close,
                ]) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
