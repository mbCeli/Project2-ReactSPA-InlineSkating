import {
  Stack,
  Box,
  Grid2,
  SvgIcon,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  Typography,
  TablePagination, //from material ui example
  TableSortLabel, //from material ui example
  Modal,
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import axios from "axios";

import { baseURL } from "../App";

export default function HomePage() {
  const [profile, setProfile] = useState({});
  //to track pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  //to sort by
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("asc");
  //to handle the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  //for adding new data
  const [newActivityData, setNewActivityData] = useState({
    date: "",
    route_name: "",
    time: "",
    distance: "",
    calories_burned: "",
    comments: "",
  });

  //get profile info
  const getProfile = () => {
    axios
      .get(`${baseURL}/profile`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfile();
  }, []);

  // sort function for activities by date
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // calculate sorted and paginated activities based on their state
  const sortedActivities = profile?.recent_activity?.sort((a, b) =>
    order === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );
  const paginatedActivities = sortedActivities
    ? sortedActivities.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    : [];

  if (!profile || !profile.recent_activity) {
    return <Typography>Error: Unable to fetch recent activities.</Typography>;
  }

  //handle opening and closing modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setNewActivityData({ ...activity });
    handleOpenModal();
  };

  const handleInputChange = (e) => {
    setNewActivityData({
      ...newActivityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateActivity = () => {
    // Logic to add or update activities based on newActivityData
    // Reset form data and close modal
    setNewActivityData({
      date: "",
      route_name: "",
      time: "",
      distance: "",
      calories_burned: "",
      comments: "",
    });
    handleCloseModal();
  };

  //add new activity
const handleAddActivity = () => {
  const newActivity = { ...newActivityData };
  setProfile((prevProfile) => ({
    ...prevProfile,
    recent_activity: [...prevProfile.recent_activity, newActivity],
  }));
  setNewActivityData({
    date: "",
    route_name: "",
    time: "",
    distance: "",
    calories_burned: "",
    comments: "",
  });
  handleCloseModal(); // Close the modal after adding the new activity
};

  return (
    <Stack
      aria-label="home-page"
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "2px solid red",
        width: "86.5vw",
        height: "90vh",
        marginTop: "9.2vh",
      }}
    >
      {/* Profile Dashboard */}
      <Box
        aria-label="left-side"
        borderRadius={15}
        sx={{
          marginLeft: "1vw",
          marginRight: "2vw",
          marginTop: "1vh",
          backgroundColor: "secondary.light",
          width: "35vw",
          height: "88vh",
        }}
      >
        {/* Personal Info */}
        <Grid2
          container
          spacing={4}
          columns={12}
          sx={{
            marginTop: "8vh",

            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid2 size={12} m={1} sx={{ textAlign: "center" }}>
            <img src={profile.image} alt="user picture" />
          </Grid2>
          <Grid2 size={12} m={1} component="h3" sx={{ textAlign: "center" }}>
            {profile.name}
          </Grid2>
          <Grid2 size={3} m={1} sx={{ textAlign: "center" }}>
            {profile.age}
          </Grid2>
          <Grid2 size={3} m={1} sx={{ textAlign: "center" }}>
            {profile.location}
          </Grid2>
          <Grid2 size={3} m={1} sx={{ textAlign: "center" }}>
            {profile.skating_since}
          </Grid2>

          {/* Equipment */}
          <Grid2
            container
            size={12}
            spacing={1}
            m={1}
            sx={{ textAlign: "center", justifyContent: "center" }}
          >
            <Grid2 size={12} m={2} component="h3">
              My Equipment
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Skates </span>
              <br />
              {profile?.skates?.name}
              <br />
              Type - {profile?.skates?.type}
              <br />
              <img src={profile?.skates?.image} alt="skates pictures" />
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Helmet </span>
              <br />
              {profile?.helmet?.name}
              <br />
              Model - {profile?.helmet?.model}
              <br />
              <img src={profile?.helmet?.image} alt="helmet pictures" />
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Knee Pads</span>
              <br />
              {profile?.knee_pads?.name}
              <br />
              Model - {profile?.knee_pads?.model}
              <br />
              <img src={profile?.knee_pads?.image} alt="knee_pads pictures" />
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Wrist Guards</span>
              <br />
              {profile?.wrist_protectors?.name}
              <br />
              Model - {profile?.wrist_protectors?.model}
              <br />
              <img
                src={profile?.wrist_protectors?.image}
                alt="wrist_protectors pictures"
              />
            </Grid2>
          </Grid2>
        </Grid2>

        {/* Stats */}
        <Grid2
          container
          size={12}
          spacing={1}
          m={1}
          sx={{ textAlign: "center", justifyContent: "center" }}
        >
          <Grid2 size={12} m={2} component="h3">
            So Far
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Weekly</span>
            <br />
            Distance - {profile?.skating_stats?.weekly_distance} m
            <br />
            Sessions - {profile?.skating_stats?.weekly_sessions}
            <br />
            Time - {profile?.skating_stats?.weekly_time} min
            <br />
            Calories - {profile?.skating_stats?.weekly_calories}
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Monthly</span>
            <br />
            Distance - {profile?.skating_stats?.monthly_distance} m
            <br />
            Sessions - {profile?.skating_stats?.monthly_sessions}
            <br />
            Time - {profile?.skating_stats?.monthly_time} min
            <br />
            Calories - {profile?.skating_stats?.monthly_calories}
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Yearly Goals</span>
            <br />
            Distance - {profile?.skating_goals?.yearly_distance_goal} m
            <br />
            Sessions - {profile?.skating_goals?.yearly_sessions_goal}
            <br />
            Time - {profile?.skating_goals?.yearly_time_goal} min
            <br />
            Calories - {profile?.skating_goals?.yearly_calories_goal}
          </Grid2>
        </Grid2>
      </Box>

      <Stack
        aria-label="right-side"
        spacing={10}
        sx={{
          marginRight: "1vw",
          marginTop: "1vh",
          width: "50vw",
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
            {profile?.challenges?.map((challenge) => {
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

        <Typography
          sx={{
            alignSelf: "flex-start",
            fontWeight: "bold",
            fontSize: "1.5rem",
            maxWidth: "40vw",
            height: "auto",
          }}
        >
          Recent Activity
        </Typography>

        {/* Recent Activity Table */}
        <Stack
          borderRadius={15}
          sx={{
            width: "50vw",
            height: "35vh",
            backgroundColor: "primary.light",
            margin: 0,
            paddingTop: "4vh",
          }}
        >
          {/* Add new activity */}
          <Stack
            sx={{ width: "17%", alignSelf: "flex-end", marginRight: "2%" }}
          >
            <Button onClick={handleOpenModal} variant="contained">
              <SvgIcon>
                <AddIcon fontSize="small" />
              </SvgIcon>
              Add new
            </Button>
          </Stack>

          {/* Recent Activity Table */}
          <TableContainer
            sx={{ maxWidth: "100%", maxHeight: "100%", overflowX: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" onClick={() => handleSort("date")}>
                    <TableSortLabel
                      active={orderBy === "date"}
                      direction={orderBy === "date" ? order : "asc"}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Place / Route</TableCell>
                  <TableCell align="center">Duration</TableCell>
                  <TableCell align="center">Distance</TableCell>
                  <TableCell align="center">Calories</TableCell>
                  <TableCell align="center">Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell align="center" sx={{ maxWidth: "70px" }}>
                      {activity.date}
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: "70px" }}>
                      {activity.route_name}
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: "20px" }}>
                      {activity.time} min
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: "20px" }}>
                      {activity.distance} km
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: "20px" }}>
                      {activity.calories_burned}
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: "500px" }}>
                      {activity.comments}
                      <Stack sx={{ width: "5%", alignSelf: "flex-end" }}>
                        <Button
                          onClick={handleOpenModal}
                          variant="text"
                          size="small"
                        >
                          Edit...
                          <EditIcon fontSize="small" />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 6, 9]}
            component="div"
            count={sortedActivities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />

          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 8,
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <TextField
              required  
                name="date"
                label="Date"
                placeholder="YYYY-MM-DD"
                value={newActivityData.date}
                onChange={handleInputChange}
              />

              <TextField
                required
                name="route_name"
                label="Route or Place name"
                value={newActivityData.route_name}
                onChange={handleInputChange}
              />

              <TextField
                required
                name="time"
                label="Duration"
                placeholder="minutes"
                value={newActivityData.time}
                onChange={handleInputChange}
              />

              <TextField
                required
                name="distance"
                label="Distance"
                placeholder="km"
                value={newActivityData.distance}
                onChange={handleInputChange}
              />

              <TextField
                name="calories_burned"
                label="Calories Burned"
                value={newActivityData.calories_burned}
                onChange={handleInputChange}
              />

              <TextField
                multiline
                rows={4}
                name="comments"
                label="Add additional comments"
                value={newActivityData.comments}
                onChange={handleInputChange}
              />

              <Button onClick={handleAddActivity}>
                {editingActivity ? "Update Activity" : "Add Activity"}
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </Box>
          </Modal>
        </Stack>
      </Stack>
    </Stack>
  );
}
