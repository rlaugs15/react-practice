import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.divColor};
  padding: 15px;
  border-radius: 15px;
`;

const Tab = styled.div`
  font-size: 20px;
  font-weight: 555;
`;

const Des = styled.div`
  font-size: 27px;
  padding: 5px 8px;
`;

const Views = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
`;

const View = styled.div<{ isActive: boolean }>`
  display: block;
  text-align: center;
  background-color: ${(props) => props.theme.divColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  padding: 15px 0;
  border-radius: 15px;
  a {
    display: block;
  }
`;

const Button = styled.div`
  display: inline-block;
  font-size: 30px;
  background-color: ${(props) => props.theme.divColor};
  padding: 3px;
  width: 40px;
  height: 40px;
  border-radius: 80px;
  text-align: center;
`;

interface Params {
  coinId: string;
}
interface State {
  name: string;
}
interface ITickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
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
      ath_price: number | null;
      ath_date: string | null;
      percent_from_price_ath: number | null;
    };
  };
}
interface IInfo {
  id: string;
  name: string;
  rank: number;
  description: string;
  type: string;
  coin_counter: number;
  ico_counter: number;
}

function Coin() {
  const { coinId } = useParams<Params>();
  const { state } = useLocation<State>();
  //디스트럭처링으로 isLoading과 data라는 값을 추출하고 infoLoading, infoData라는 변수로 저장
  const { isLoading: tikckersLoading, data: tickersData } = useQuery<ITickers>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId) /* ,
    {
      refetchInterval: 3000, //3초마다 값을 갱신
    } */
  );
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );

  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  const priceMatch = useRouteMatch(`/${coinId}/price`);
  //한 곳에 2개의 useQuery를 사용할 땐 아래와 같이 이름을 부여해준다.
  const loading = infoLoading || tikckersLoading;
  return (
    <>
      <Container>
        <Button>
          <Link to={"/"}>&lArr;</Link>
        </Button>
        <Helmet>
          <title>
            {/*loading ? "loading" : info?.name은 홈페이지로부터 온게 아니라면 실행*/}
            {state?.name ? state.name : loading ? "로딩 중.." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          {state?.name ? state.name : loading ? "로딩 중.." : infoData?.name}
        </Header>
        <Tabs>
          <Tab>Rank: {infoData?.rank}</Tab>
          <Tab>Symbol: {tickersData?.symbol}</Tab>
          <Tab>Type: {infoData?.type}</Tab>
        </Tabs>
        <Des>{infoData?.description}</Des>

        <Views>
          {/* 링크에 들어가있지 않으면 null을 반환하므로 !==null */}
          <View isActive={chartMatch !== null}>
            <Link to={`/${coinId}/chart`}>Chart</Link>
          </View>
          <View isActive={priceMatch !== null}>
            <Link to={`/${coinId}/price`}>Price</Link>
          </View>
        </Views>

        <Switch>
          {/*리액트는 똑똑해서 아래처럼 URL매개변수 써도 됨*/}
          <Route path={"/:coinId/chart"}>
            <Chart coinId={coinId} />
          </Route>
          <Route path={"/:coinId/Price"}>
            <Price coinId={coinId} />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default Coin;
