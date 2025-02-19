import {
  Button,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination, //from material ui example
  TableSortLabel, //from material ui example
  Typography,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";

import axios from "axios";

import { baseURL } from "../../App";
import Modal from "../ModalForm/ModalForm";

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);
  //to track pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
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

  //delet activity (PUT)
  const handleDelete = (activityId) => {
    axios
      .delete(`${baseURL}/recent_activity/${activityId}`)
      .then(() => location.reload())
      .catch((error) => console.log("Activity could not be deleted:", error));
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
          height: "39vh",
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
                <TableCell align="center">Edit / Delete</TableCell>
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
                  <TableCell align="left" sx={{ maxWidth: "500px" }}>
                    {activity.comments}
                  </TableCell>
                  <TableCell sx={{ maxWidth: "10px" }}>
                    <Button
                      onClick={() => handleOpenModal(true)}
                      variant="text"
                      size="small"
                    >
                      Edit...
                      <EditIcon fontSize="small" />
                    </Button>

                    <Button
                      onClick={() => handleDelete(activity.id)}
                      variant="text"
                      size="small"
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

          {/* Modal questionaire */}
      <Modal />
    </Stack>
  );
}
