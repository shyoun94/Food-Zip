import styled from "styled-components";

const CarouselWrapper = styled.div`
  width: 100%;
  height: 228px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto 22px auto;
  @media (min-width: 768px) {
    height: 520px;
  }
`;

const CarouselImages = styled.div`
  img {
    width: 100%;
    height: 228px;
    border-radius: 8px;
    object-fit: cover;
    @media (min-width: 768px) {
      height: 480px;
    }
  }
  img.inactive {
    display: none;
  }
`;

const CarouselControlButton = styled.button`
  position: absolute;
  top: 54%;
  transform: translateY(-80%);
  font-size: 22px;
  border: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  translate: 0;
  &:hover {
    background-color: #767676;
    opacity: 0.7;
  }
`;

const LeftButton = styled(CarouselControlButton)`
  left: 0;
  & img {
    translate: -0.5px -0.1px;
  }
`;

const RightButton = styled(CarouselControlButton)`
  right: 0;
  & img {
    translate: -2px;
  }
`;

const CarouselIndicator = styled.div`
  position: absolute;
  display: flex;
  align-self: center;
  gap: 5px;
  margin: 16px 0;
  bottom: 0;
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  &.active {
    background-color: rgba(255, 255, 255, 1);
  }
`;
export {
  CarouselWrapper,
  CarouselImages,
  CarouselControlButton,
  LeftButton,
  RightButton,
  CarouselIndicator,
  Dot,
};
