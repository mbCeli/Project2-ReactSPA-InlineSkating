import { Box, Stack, SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import axios from "axios";

import { baseURL } from "../../App";
import "./ChallengesCarousel.css";

export default function ChallengesCarousel() {
  const [challenges, setChallenges] = useState([]);

  //get challenges info (GET)
  const getChallenges = () => {
    axios
      .get(`${baseURL}/challenges`)
      .then((response) => setChallenges(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getChallenges();
  }, []);

  return (
    <Stack
      aria-label="right-side"
      spacing={10}
      sx={{
        marginRight: "1vw",
        marginTop: "1vh",
        width: "49vw",
        height: "88vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Challenges carousel */}
      <Stack
        arial-label="top-carusel"
        sx={{
          width: "50vw",
          height: "40vh",
          backgroundColor: "primary.light",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Swiper
          className="swiper_container"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
        >
          {challenges.map((challenge) => {
            return (
              <SwiperSlide key={challenge.id} className="swiper-slide">
                <Box
                  className="carousel-box"
                  borderRadius={5}
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    height: "80%",
                    backgroundColor: "secondary.light",
                    paddingTop: "5vh",
                  }}
                >
                  {challenge.name}
                  <br />
                  {challenge.goal_type}
                  <br />
                  {challenge.goal_value}
                  <br />
                  {challenge.start_date}
                  <br />
                  {challenge.end_date}
                  <br />
                  {challenge.status}
                </Box>
              </SwiperSlide>
            );
          })}
          <br />
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <SvgIcon>
                <ArrowBackIcon />
              </SvgIcon>
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next slider-arrow">
              <SvgIcon>
                <ArrowForwardIcon />
              </SvgIcon>
            </div>
          </div>
        </Swiper>
      </Stack>
    </Stack>
  );
}
