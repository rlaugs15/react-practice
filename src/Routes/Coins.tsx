import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.divColor};
  display: flex;
  justify-content: center;
  border-radius: 15px;
  margin: 30px 0;
`;

const Title = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
  padding: 8px;
`;

const CoinList = styled.ul``;

const Coin = styled.ul`
  background-color: ${(props) => props.theme.divColor};
  margin: 5px;
  font-size: 25px;
  padding: 8px;
  border-radius: 15px;
  display: block;
  a {
    display: flex;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 34px;
  height: 34px;
  margin-right: 5px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);
  if (data && data) {
    console.log("코인스 심볼 접수", data);
  } else {
    console.log("코인스 심볼 접수 못 함", data);
  }
  return (
    <>
      {isLoading ? (
        "로딩 중..."
      ) : (
        <Container>
          <Helmet>
            <title>코인</title>
          </Helmet>
          <Header>
            <Title>코인</Title>
          </Header>
          {isLoading ? (
            "로딩 중..."
          ) : (
            <CoinList>
              {data?.slice(0, 100).map((coin) => (
                <Coin key={coin.id}>
                  <Link
                    to={{
                      pathname: `/${coin.id}`,
                      state: { name: coin.name },
                    }}
                  >
                    <Img
                      src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                    {coin.name}
                  </Link>
                </Coin>
              ))}
            </CoinList>
          )}
        </Container>
      )}
    </>
  );
}
export default Coins;
