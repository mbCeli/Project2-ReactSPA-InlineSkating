import {
  Button,
  Box,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination, //from material ui example
  TableSortLabel, //from material ui example
  Modal,
  TextField,
  Typography,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";

import axios from "axios";

import { baseURL } from "../../App";

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);
  //to track pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  //to sort by
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("asc");

  //get activity info (GET)
  const getActivities = () => {
    axios
      .get(`${baseURL}/recent_activity`)
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getActivities();
  }, []);

  // calculate sorted and paginated activities based on their state
  const sortedActivities = activities.sort((a, b) =>
    order === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );
  const paginatedActivities = sortedActivities
    ? sortedActivities.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    : [];

  if (!activities) {
    return <Typography>Error: Unable to fetch recent activities.</Typography>;
  }

  // sort function for activities by date
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
  //to check whether I press the add or edit button
  const [editingMode, setEditingMode] = useState(false);

  //handle opening and closing modal
  const handleOpenModal = (editMode = false) => {
    setIsModalOpen(true);
    setEditingMode(editMode);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //create new activity (POST)
  const handleAddActivity = (e) => {
    e.preventDefault();
    const newActivity = { ...newActivityData }; // make a copy of the original object so we don't modify the original

    const requestBody = {
      id: newActivity.id,
      date: newActivity.date,
      route_name: newActivity.route_name,
      distance: newActivity.distance,
      time: newActivity.time,
      calories_burned: newActivity.calories_burned,
      comments: newActivity.comments,
    };

    //post request to the API, and add the new activity
    axios
      .post(`${baseURL}/recent_activity`, requestBody)
      .then((response) => {
        setActivities((prevActivities) => [
          ...prevActivities, //I want to add an activity so I make a copy of the existing activities
          response.data,
        ]);

        // reset the form data
        setNewActivityData({
          date: "",
          route_name: "",
          time: "",
          distance: "",
          calories_burned: "",
          comments: "",
        });
        // Close the modal after adding the new activity
        handleCloseModal();
      })
      .catch((error) => {
        console.error(`Error adding activity. Please try again. ${error}`);
        // Handle any error scenarios or display error messages
      });
  };

  const handleInputChange = (e) => {
    setNewActivityData({
      ...newActivityData,
      [e.target.name]: e.target.value,
    });
  };

  //edit activity (PUT)
  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setNewActivityData({ ...activity });
    handleOpenModal();
  };

  const handleUpdateActivity = (e) => {
    e.preventDefault();
    const updatedActivity = { ...newActivityData }; // Make a copy of the original object so we don't modify the original
    const activityId = editingActivity.id;
    axios
      .put(`${baseURL}/profile/recent_activity/${activityId}`, {
        updatedActivity,
      })
      .then((response) => {
        setProfile((prevProfile) => ({
          ...prevProfile, // this is for keeping the existing profile data
          recent_activity: prevProfile.recent_activity.map(
            (
              activity // this will go to the existing array of activities within the existing profile data and for each activity
            ) =>
              activity.id === activityId ? response.data.newActivity : activity // it will check if the id of the activity is the same as the id of the activity we are trying to update, if it is, it will return the new activity, if not, it will return the existing activity
          ),
        }));
        // Reset the form data
        setNewActivityData({
          date: "",
          route_name: "",
          time: "",
          distance: "",
          calories_burned: "",
          comments: "",
        });
        // Close the modal after adding the new activity
        handleCloseModal();
      })
      .catch((error) => {
        console.error(`Error adding activity. Please try again. ${error}`);
        // Handle any error scenarios or display error messages
      });
  };

  return (
    <Stack>
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
        <Stack sx={{ width: "17%", alignSelf: "flex-end", marginRight: "2%" }}>
          <Button
            onClick={() => handleOpenModal(false)}
            variant="contained"
            className="add-button"
          >
            <SvgIcon>
              <AddIcon fontSize="small" />
            </SvgIcon>
            Add new
          </Button>
        </Stack>

        {/* Recent Activity Table */}
        <TableContainer
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            overflowX: "auto",
            fontSize: "0.1rem",
          }}
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
                    <Stack
                      sx={{
                        width: "5%",
                        alignSelf: "flex-end",
                        display: "inline-block",
                      }}
                    >
                      <Button
                        onClick={() => handleOpenModal(true)}
                        variant="text"
                        size="small"
                      >
                        Edit...
                        <EditIcon fontSize="small" />
                      </Button>
                    </Stack>
                    <Stack
                      sx={{
                        width: "5%",
                        alignSelf: "flex-end",
                        display: "inline-block",
                      }}
                    >
                      <Button
                        /* onClick={handleDelete} */
                        variant="text"
                        size="small"
                      >
                        Delete
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 4, 8]}
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
      </Stack>

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

          {/* If Add New Activity is clicked, it will call the handleAddActivity function, if Edit Activity is clicked, it will call the handleUpdateActivity function*/}

          <Button
            onClick={editingMode ? handleUpdateActivity : handleAddActivity}
          >
            {editingMode ? "Update Activity" : "Add Activity"}
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </Box>
      </Modal>
    </Stack>
  );
}
