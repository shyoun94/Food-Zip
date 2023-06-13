import { GlobalStyle } from "./components/styles/Globalstyle";
import styled from "styled-components";
import ProfileInformation from "./components/Profile/ProfileInformation";
import Modal from "./components/Modal/Modal";
import RecommendList from "./components/Profile/RecommendList";
import PostList from "./components/Post/PostList/PostList";
import Routers from "./routes/Routers";
import EmptyHome from "./components/Feed/EmptyHome";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #e4ebe5;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Routers />
      {/* <ProfileInformation type="your" />
      <RecommendList />
      <PostList /> */}
      {/* <Modal type="setting" /> */}
      <EmptyHome />
    </Container>
  );
}
export default App;
