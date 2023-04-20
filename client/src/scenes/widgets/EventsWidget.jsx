import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography, Divider, useTheme } from "@mui/material";
import { setEvents } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import EventWidget from "./EventWidget";

const EventsWidget = ({userId, isProfile=false}) => {

    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);
    const token = useSelector((state) => state.token);
      const { palette } = useTheme();

      const getEvents = async () => {
        try{
      const response = await fetch("http://localhost:3001/events", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setEvents({ events: data }));
    }catch(error){
      console.log("Error Fetching events:", error);
    }
    };

    const getUserEvents = async () => {
      const response = await fetch(
        `http://localhost:3001/events/${userId}/events`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setEvents({ events: data }));
    };

    useEffect(() => {
      if (isProfile) {
        getUserEvents();
      } else {
        getEvents();
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return (
      <>
      <WidgetWrapper
      sx={{
        mt: "1rem"
      }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Event List
      </Typography>
      {events.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            eventHead,
            eventDesc,
            department,
            eventDate,
            eventRegEndDate,
            eventApplyLink
          }) => (
            <EventWidget
            key={_id}
            userId={_id}
            eventUserId={userId}
            organiserId={`${firstName} ${lastName}`}
            eventHead={eventHead}
            eventDesc={eventDesc}
            department={department}
            eventDate={eventDate}
            eventRegEndDate={eventRegEndDate}
            eventApplyLink={eventApplyLink}

            />
          )
        )}
        </WidgetWrapper>
      </>
    );
    };

export default EventsWidget;



// const EventsWidget = ({userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events);
//   const token = useSelector((state) => state.token);
//
//   const getEvents = async () => {
//   const response = await fetch("http://localhost:3001/events", {
//     method: "GET",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await response.json();
//   dispatch(setEvents({ events: data }));
// };
//
// const getUserEvents = async () => {
//   const response = await fetch(
//     `http://localhost:3001/events/${userId}/events`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   const data = await response.json();
//   dispatch(setEvents({ events: data }));
// };
//
//
// useEffect(() => {
//   if (isProfile) {
//     getUserEvents();
//   } else {
//     getEvents();
//   }
// }, []); // eslint-disable-line react-hooks/exhaustive-deps
//
// return (
//   <>
//   {events.map(
//       ({
//         _id,
//         userId,
//         firstName,
//         lastName,
//         eventHead,
//         eventDesc,
//         department,
//         eventDate,
//         eventRegEndDate,
//         eventApplyLink
//       }) => (
//         <EventWidget
//         key={_id}
//         eventId={_id}
//         eventUserId={userId}
//         eventHead={eventHead}
//         eventDesc={eventDesc}
//         organiserId={`${firstName} ${lastName}`}
//         eventDate={eventDate}
//         eventRegEndDate={eventRegEndDate}
//         eventApplyLink={eventApplyLink}
//         department={department}
//         />
//       )
//     )}
//   </>
// );
// };
