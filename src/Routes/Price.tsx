import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoinTickers } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-top: 30px;
  border-radius: 30px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.divColor};
`;
const View = styled.span`
  font-weight: 555;
  font-size: 30px;
  padding: 30px 0;
`;

interface PriceProps {
  coinId: string;
}
interface ITickers {
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<ITickers>(["pri", coinId], () =>
    fetchCoinTickers(coinId)
  );
  return (
    <>
      {isLoading ? (
        "pirce 로딩 중.."
      ) : (
        <Container>
          <View>
            현재 가격: <br />
            &nbsp;&nbsp;&nbsp;&nbsp; ${data?.quotes.USD.price}
          </View>
          <View>
            24시간 내 거래량: <br />
            &nbsp;&nbsp;&nbsp;&nbsp; ${data?.quotes.USD.volume_24h}
          </View>
          <View>
            24시간 내 거래량의 변동: <br />
            &nbsp;&nbsp;&nbsp;&nbsp; ${data?.quotes.USD.volume_24h_change_24h}
          </View>
          <View>
            시가총액: <br />
            &nbsp;&nbsp;&nbsp;&nbsp; ${data?.quotes.USD.market_cap}
          </View>
        </Container>
      )}
    </>
  );
}

export default Price;
