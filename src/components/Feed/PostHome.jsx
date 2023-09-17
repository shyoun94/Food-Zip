import React, { useState, useEffect } from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
import Modal from "../Modal/Modal/Modal";
import { feed } from "../../api/post";
import { useRef } from "react";
import Loading from "../../pages/Loading/Loading";
import EmptyHome from "./EmptyHome";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

const List = styled.ul`
  background-color: white;
  padding: 57px 24px 69px 24px;
  @media (min-width: 768px) {
    max-width: 630px;
    flex-basis: 600px;
  }
  @media (min-width: 1024px) {
    max-width: 600px;
  }
`;
const Main = styled.main`
  @media (min-width: 768px) {
    margin-left: auto;
    width: calc(100vw - var(--nav-medium-width));
    display: flex;
  }
  @media (min-width: 1024px) {
    margin-left: auto;
    width: calc(100vw - var(--nav-wide-width));
    display: flex;
  }
`;
export default function PostHome() {
  const [modal, setModal] = useRecoilState(modalState);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [myFeed, setMyFeed] = useState([]);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const token = localStorage.getItem("token");
  const getFeed = async options => {
    const res = await feed(options);
    if (options.test === 1) setMyFeed(res.data.posts);
    return res.data.posts;
  };

  const loadFeed = async options => {
    const posts = await getFeed(options);
    setMyFeed(prev => [...prev, ...posts]);
    setSkip(prev => prev + posts.length);
    setLoading(false);
  };
  useEffect(() => {
    const onIntersect = entries => {
      const target = entries[0];
      if (target.isIntersecting) setPage(p => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 0.5 });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer, loading]);

  useEffect(() => {
    loadFeed({ token, limit: 10, skip });
  }, [page]);

  const modalOpen = id => {
    setModal({
      show: true,
      postId: id,
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <Main>
          <List>
            {myFeed.map(item => (
              <li key={item.id}>
                <PostItem
                  modalOpen={modalOpen}
                  otherInfo={item}
                  getFeed={getFeed}
                  commentCnt={item.commentCount}
                  skip={skip}
                />
              </li>
            ))}
          </List>
          <div ref={observer} />
          {modal.show && <Modal type="report" />}
        </Main>
      ) : (
        <EmptyHome />
      )}
    </>
  );
}
