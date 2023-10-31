import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./Routes/Coins";
import DarkModeBtn from "./themes/DarkModeBtn";
import Coin from "./Routes/Coin";

export interface IDarkMode {
  isDarkMode: boolean;
  toggleDarkMode: () => void; //(prev: boolean) => void;는 안 됐음
}

function Router({ isDarkMode, toggleDarkMode }: IDarkMode) {
  return (
    <BrowserRouter>
      <Route>
        <DarkModeBtn isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </Route>
      {/*Switch: 한 번에 하나의 라우터를 렌더링*/}
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
