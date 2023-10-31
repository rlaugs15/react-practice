import { styled } from "styled-components";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { IDarkMode } from "../Router";

const Bg = styled.div`
  display: flex;
`;
const Icon = styled.div`
  display: flex;
  border-radius: 5px;
  margin: 7px;
  font-size: 22px;
  padding: 10px;
  color: ${(props) => (props.theme.bgColor === "navy" ? "#F57C00" : "#FEFD48")};
  background-color: ${(props) =>
    props.theme.bgColor === "navy" ? "#81D4FA" : "navy"};
`;

function DarkModeBtn({ isDarkMode, toggleDarkMode }: IDarkMode) {
  return (
    <>
      <Bg>
        <Icon onClick={() => toggleDarkMode()}>
          {isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
        </Icon>
      </Bg>
    </>
  );
}
export default DarkModeBtn;
