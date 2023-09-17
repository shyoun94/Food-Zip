import { Mobile, PC } from "./MediaQuery/MediaQuery";
import { GlobalStyle } from "./components/styles/Globalstyle";
import { GlobalStylePC } from "./components/styles/GlobalstylePC";
import { LayoutMobile, LayoutPC } from "./pages/Layout/Layout";
import Routers from "./routes/Routers";

function App() {
  return (
    <>
      <>
        <Mobile>
          <GlobalStyle />
          <LayoutMobile />
          <Routers />
        </Mobile>
      </>
      <>
        <PC>
          <GlobalStylePC />
          <LayoutPC />
          <Routers />
        </PC>
      </>
    </>
  );
}
export default App;
