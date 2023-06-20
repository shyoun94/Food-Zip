import React, { useEffect, useRef, useState } from "react";
import BasicProfileInput from "../../../assets/images/basic-profile-lg.svg";
import BasicProfile from "../../../assets/images/basic-profile-lg.png";
import ImgButton from "../../../assets/images/upload-file.svg";
import styled from "styled-components";
import { ButtonStyle } from "../../common/Button/Button";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileInputForm = styled.form`
  width: 322px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const ProfileImgDiv = styled.div`
  position: relative;
  margin: 0 auto;
`;

const ProfileInputImgButton = styled.button`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 36px;
    height: 36px;
    bottom: 0;
    right: 0;
    transform: translateY(-30px);
    background: url(${ImgButton}) no-repeat center / cover;
  }
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin: 30px 0;
`;

const ProfileInput = styled.input`
  display: none;
`;

const ProfileFormLabel = styled.label`
  color: #767676;
  position: relative;
`;

const ProfileFormInput = styled.input`
  width: 100%;
  display: block;
  margin: 10px 0 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dbdbdb;
  font-size: 14px;
  &::placeholder {
    color: #dbdbdb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #286140;
  }
`;
const StartButton = styled(ButtonStyle)`
  margin-top: 18px;
`;
const StyledError = styled.small`
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -10px;
`;

export default function ProfileForm({ userInfo, setUserInfo }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/myprofile/edit") {
      setValue("image", userInfo?.image || BasicProfileInput); // Set a default value for image
      setValue("username", userInfo?.username || null); // Set a default value for username
      setValue("accountname", userInfo?.accountname || null); // Set a default value for accountname
      setValue("intro", userInfo?.intro || null); // Set a default value for intro
    } else if (location.pathname === "/signup/profile") {
      setValue("image", BasicProfileInput); // Set a default value for image
      setValue("username", null); // Set a default value for username
      setValue("accountname", null); // Set a default value for accountname
      setValue("intro", null); // Set a default value for intro
    }
  }, [location.pathname, userInfo]);

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [imgFile, setImgFile] = useState(BasicProfile);
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);
  const data = location.state;
  useEffect(() => {
    console.log("프로필 이미지:", profileImg);
  }, [profileImg]);
  const convertURLToFile = async (url, filename) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: data.type });
  };

  const handleImageChange = async event => {
    const formData = new FormData();
    const file = event.target.files[0];

    formData.append("image", file);

    const res = await axios.post(
      "https://api.mandarin.weniv.co.kr/image/uploadfile",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    );
    const imgUrl = "https://api.mandarin.weniv.co.kr/" + res.data.filename;
    setProfileImg(imgUrl);
  };

  const navigate = useNavigate();
  // 사진을 변경하지 않으면 handleImageChange함수가 실행되지 않아서 푸짐이가 업로드 되지않아서 원래 기본이미지가 프로필 이미지로 저장됨
  // 사진을 변경하지 않는 경우 폼 제출 버튼을 눌러서 푸짐이 이미지가 업로드되고 푸짐이 이미지로 유저정보에 저장되도록 해야함
  const handleFormSubmit = async formData => {
    if (location.pathname === "/signup/profile") {
      try {
        if (!profileImg) {
          console.log("프로필 이미지 설정안해서 푸짐이가 프사임");
          // 기본 이미지 URL에서 파일 객체 생성
          const defaultImageToUpload = await convertURLToFile(
            BasicProfile,
            "basic-profile-lg.png",
          );
          const imgformData = new FormData();
          imgformData.append("image", defaultImageToUpload);
          const imgUploadRes = await axios.post(
            "https://api.mandarin.weniv.co.kr/image/uploadfile",
            imgformData,
            {
              headers: {
                "Content-type": "multipart/form-data",
              },
            },
          );
          const basicProfile =
            "https://api.mandarin.weniv.co.kr/" + imgUploadRes.data.filename;
          console.log("기본이미지로 서버에 올라감!!! 주소: ", basicProfile);
          setProfileImg(basicProfile);
          console.log("프로필 이미지:", profileImg);
        }
        const res = await axios.post(
          "https://api.mandarin.weniv.co.kr/user/",
          {
            user: {
              username: formData.username,
              email: data.email,
              password: data.password,
              accountname: formData.accountname,
              intro: formData.intro,
              image: profileImg,
            },
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          },
        );
        console.log(JSON.stringify(res.data));
        navigate("/login");
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }
    } else if (location.pathname === "/myprofile/edit") {
      try {
        setProfileImg(userInfo?.image || BasicProfileInput);
        const res = await axios.put(
          "https://api.mandarin.weniv.co.kr/user/",
          {
            user: {
              username: formData.username,
              accountname: formData.accountname,
              intro: formData.intro,
              image: profileImg || userInfo?.image,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
        localStorage.setItem("accountname", formData.accountname);
        console.log(JSON.stringify(res.data));
        navigate("/myprofile");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <ProfileInputForm onSubmit={handleSubmit(handleFormSubmit)}>
      <ProfileImgDiv>
        <label>
          <ProfileInput
            id="profileImg"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </label>

        <ProfileInputImgButton
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          <ProfileImg
            src={profileImg || userInfo?.image || BasicProfileInput}
            alt="기본 프로필"
          />
        </ProfileInputImgButton>
      </ProfileImgDiv>
      <ProfileFormLabel>
        사용자 이름
        <ProfileFormInput
          id="username"
          type="text"
          defaultValue={userInfo?.username || ""}
          placeholder="2~10자 이내여야 합니다."
          {...register("username", {
            required: "사용자 이름은 필수 입력입니다.",
            minLength: {
              value: 2,
              message: "사용자 이름은 최소 2자 이상이어야 합니다.",
            },
            maxLength: {
              value: 10,
              message: "사용자 이름은 최대 10자까지 허용됩니다.",
            },
          })}
        />
        {errors.username && (
          <StyledError role="alert">{errors.username.message}</StyledError>
        )}
      </ProfileFormLabel>

      <ProfileFormLabel>
        계정 ID
        <ProfileFormInput
          id="accountname"
          type="text"
          defaultValue={userInfo?.accountname || ""}
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          {...register("accountname", {
            required: "계정 ID는 필수 입력입니다.",
            pattern: {
              value: /^[0-9a-zA-Z._]+$/,
              message: "영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.",
            },
          })}
        />
        {errors.accountname && (
          <StyledError role="alert">{errors.accountname.message}</StyledError>
        )}
      </ProfileFormLabel>
      <ProfileFormLabel>
        소개
        <ProfileFormInput
          id="intro"
          defaultValue={userInfo?.intro || ""}
          type="text"
          placeholder="자신과 선호하는 음식에 대해 소개해주세요!"
          {...register("intro")}
        />
      </ProfileFormLabel>

      {/* {location.pathname === "/signup/profile" && (
        <StartButton type="submit" bgColor={isValid ? "active" : "inactive"}>
          FOOD ZIP 시작하기
        </StartButton>
      )} */}
      <StartButton type="submit" bgColor={isValid ? "active" : "inactive"}>
        FOOD ZIP 시작하기
      </StartButton>
    </ProfileInputForm>
  );
}
