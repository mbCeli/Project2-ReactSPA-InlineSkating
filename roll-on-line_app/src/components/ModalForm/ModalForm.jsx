import { Box, Modal, TextField, Button } from '@mui/material';

import { useState, useEffect } from 'react';

import axios from 'axios';

import { baseURL } from '../../App';

import './ModalForm.css';


export default function ModalForm() {
  //to handle the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState([]);
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

  const [date, setDate] = useState("");
  const [route_name, setRoute_name] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const [calories_burned, setCalories_burned] = useState("");
  const [comments, setComments] = useState("");

  const activityId = activities.map((activity) => activity.id);
  const getActivities = () => {
    axios
      .get(`${baseURL}/recent_activity`)
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getActivities();
  }, []);

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

  useEffect(
    (activityId) => {
      // as I am going to update the data I need to get it first
      axios
        .get(`${baseURL}/recent_activity/${activityId}`) // I need the id of the activity that Im going to edit
        .then((response) => {
          const oneActivity = response.data;
          setDate(oneActivity.date);
          setRoute_name(oneActivity.route_name);
          setTime(oneActivity.time);
          setDistance(oneActivity.distance);
          setCalories_burned(oneActivity.calories_burned);
          setComments(oneActivity.comments);
        })
        .catch((error) => console.log("Could not get activity", error));
    },
    [activityId]
  );

  const handleInputChange = (e) => {
    setEditingActivity({
      ...editingActivity,
      [e.target.name]: e.target.value,
    });
  };

  /*   const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setNewActivityData({ ...activity });
    handleOpenModal();
  }; */

  //edit activity (PUT)
  const handleUpdateActivity = (e) => {
    e.preventDefault();

    axios
      .put(`${baseURL}/recent_activity/${activityId}`, editingActivity)
      .then(() => {
        setEditingActivity(null);
        setActivities(editingActivity);
        // Close the modal after adding the new activity
        handleCloseModal();
      })
      .catch((error) => {
        console.error(`Error adding activity. Please try again. ${error}`);
        // Handle any error scenarios or display error messages
      });
  };

  return (
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

        <Button
          onClick={
            editingMode
              ? () => handleUpdateActivity(activityId)
              : handleAddActivity
          }
        >
          {editingMode ? "Update Activity" : "Add Activity"}
        </Button>
        <Button onClick={handleCloseModal}>Cancel</Button>
      </Box>
    </Modal>
  );
}
