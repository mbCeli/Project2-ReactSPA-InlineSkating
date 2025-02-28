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

import "./RecentActivities.css";

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);
  //to track pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  //to sort by
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("asc");
  //to handle the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //to edit/update an activity
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

  //handle opening and closing modal
  const handleOpenModal = (editMode = false, activity = null) => {
    setIsModalOpen(true);
    setEditingMode(editMode);
    if (editMode && activity) {
      setEditingActivity({ ...activity }); // Populate editingActivity with the selected activity's data
    } else {
      setEditingActivity(null); // If not editing, reset editingActivity
    }
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
    if (editingMode) {
      setEditingActivity({
        ...editingActivity,
        [e.target.name]: e.target.value,
      });
    } else {
      setNewActivityData({
        ...newActivityData,
        [e.target.name]: e.target.value,
      });
    }
  };

  //edit activity (PUT)
  const handleUpdateActivity = (e) => {
    e.preventDefault();

    if (!editingActivity) return; // Prevent update if no activity is being edited

    const updatedActivity = {
      ...editingActivity, // Get the data from editingActivity
    };

    axios
      .put(`${baseURL}/recent_activity/${editingActivity.id}`, updatedActivity)
      .then(() => {
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity.id === editingActivity.id ? updatedActivity : activity
          )
        );

        handleCloseModal(); // Close modal after update
      })
      .catch((error) => {
        console.error("Error updating activity. Please try again.", error);
      });
  };

  //delet activity (PUT)
  const handleDelete = (activityId) => {
    axios
      .delete(`${baseURL}/recent_activity/${activityId}`)
      .then(() => {
        // Update the state by filtering out the deleted activity
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== activityId)
        );
      })
      .catch((error) => console.log("Activity could not be deleted:", error));
  };

  return (
    <Stack sx={{ marginTop: "-1vh" }}>
      <Stack
        borderRadius={15}
        sx={{
          width: "47vw",
          height: "42vh",
          backgroundColor: "#254159",
          margin: 0,
          paddingTop: "2vh",
        }}
      >
        {/* Add new activity */}
        <Stack sx={{ width: "auto", 
        marginRight: "2%", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between",
         }}>
          <Typography
            sx={{
              alignSelf: "flex-start",
              fontWeight: "bold",
              fontSize: "1rem",
              maxWidth: "40vw",
              height: "0px",
              color: "#FEF9F3",
              marginLeft: "2.5vw",
            }}
          >
            Recent Activity
          </Typography>
          <Button
            onClick={() => handleOpenModal(false)}
            variant="contained"
            className="add-button"
            sx={{
              backgroundColor: "#8C4830",
              color: "#FECC97",
              fontSize: "0.6rem",
            }}
          >
            <AddIcon fontSize="small" />
            Add new
          </Button>
        </Stack>

        {/* Recent Activity Table */}
        <TableContainer
          sx={{
            width: "95z%",
            height: "90%",
            overflowX: "hidden",
            paddingRight: "50px"
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "#FECC97" }}
                  align="center"
                  onClick={() => handleSort("date")}
                >
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? order : "asc"}
                    sx={{ color: "#FECC97", fontSize: "0.7rem" }}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FECC97", fontSize: "0.7rem", padding: "0", }}
                >
                  Place / Route
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FECC97", fontSize: "0.7rem", padding: "0",}}
                >
                  Duration
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FECC97", fontSize: "0.7rem", padding: "0 10px", }}
                >
                  Distance
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FECC97", fontSize: "0.7rem", padding: "0 10px", }}
                >
                  Calories
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FECC97", fontSize: "0.7rem", padding: "0", }}
                >
                  Comments
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FECC97", fontSize: "0.7rem", padding: "0", }}
                >
                  Edit / Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "70px",
                      color: "#FEF9F3",
                      fontSize: "0.6rem",
                    }}
                  >
                    {activity.date}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "70px",
                      color: "#FEF9F3",
                      fontSize: "0.6rem",
                    }}
                  >
                    {activity.route_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "20px",
                      color: "#FEF9F3",
                      fontSize: "0.6rem",
                    }}
                  >
                    {activity.time} min
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "20px",
                      color: "#FEF9F3",
                      fontSize: "0.6rem",
                    }}
                  >
                    {activity.distance} km
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "20px",
                      color: "#FEF9F3",
                      fontSize: "0.6rem",
                    }}
                  >
                    {activity.calories_burned}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      maxWidth: "500px",
                      color: "#FEF9F3",
                      fontSize: "0.6rem",
                    }}
                  >
                    {activity.comments}
                  </TableCell>
                  <TableCell sx={{ maxWidth: "10px" }}>
                    <Button
                      onClick={() => handleOpenModal(true, activity)}
                      variant="text"
                      size="small"
                      sx={{
                        backgroundColor: "#8C4830",
                        color: "#FECC97",
                        marginBottom: "0.1rem",
                        fontSize: "0.6rem",
                      }}
                    >
                      Edit...
                      <EditIcon fontSize="small" />
                    </Button>

                    <Button
                      onClick={() => handleDelete(activity.id)}
                      variant="text"
                      size="small"
                      sx={{
                        backgroundColor: "red",
                        color: "#FECC97",
                        fontSize: "0.6rem",
                      }}
                    >
                      Delete
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color: "#FECC97"}}
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
            value={editingMode ? editingActivity.date : newActivityData.date}
            onChange={handleInputChange}
          />

          <TextField
            required
            name="route_name"
            label="Route or Place name"
            value={
              editingMode
                ? editingActivity.route_name
                : newActivityData.route_name
            }
            onChange={handleInputChange}
          />

          <TextField
            required
            name="time"
            label="Duration"
            placeholder="minutes"
            value={editingMode ? editingActivity.time : newActivityData.time}
            onChange={handleInputChange}
          />

          <TextField
            required
            name="distance"
            label="Distance"
            placeholder="km"
            value={
              editingMode ? editingActivity.distance : newActivityData.distance
            }
            onChange={handleInputChange}
          />

          <TextField
            name="calories_burned"
            label="Calories Burned"
            value={
              editingMode
                ? editingActivity.calories_burned
                : newActivityData.calories_burned
            }
            onChange={handleInputChange}
          />

          <TextField
            multiline
            rows={4}
            name="comments"
            label="Add additional comments"
            value={
              editingMode ? editingActivity.comments : newActivityData.comments
            }
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
