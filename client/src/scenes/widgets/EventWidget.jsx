import { Box ,Typography,Button,Divider,  useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";

const EventWidget = ({
  userId,
  eventUserId,
  organiserId,
  eventHead,
  eventDesc,
  eventDate,
  eventRegEndDate,
  eventApplyLink,
  department

}) => {
    const dispatch= useDispatch();
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const evdate=[eventDate.substr(0,4),eventDate.substr(5,2),eventDate.substr(8,2)];
    const regend= [eventRegEndDate.substr(0,4),eventRegEndDate.substr(5,2),eventRegEndDate.substr(8,2)];


    return (
      <WidgetWrapper sx={{
        mt: "1rem"
      }}>
      <FlexBetween>
      <Typography
      color={palette.neutral.dark}
      variant="h5"
      fontWeight="500"
      sx={{ mb: "1.5rem" }} > {eventHead} </Typography>

      <Typography
      color={palette.neutral.dark}
      variant="h6"
      fontWeight="500"
      sx={{ mb: "1.5rem" }} >
      {evdate[2]} - {evdate[1]} - {evdate[0]} </Typography>
      </FlexBetween>
      <WidgetWrapper m="1rem 0" sx={{padding: "0"}}>
        <Box
        sx={{ padding: "0"}}>
          {eventDesc}
        </Box>
        <Box>
        <Typography
        variant="h6"
        fontWeight="500"
        >
          Organising Department: - {department}
          </Typography>
        <FlexBetween>
        <Box>
            <Typography>Registration ends: </Typography>
            <Typography>{regend[2]} - {regend[1]} - {regend[0]}</Typography>
        </Box>
            <Button
              // onClick={handleButtonClick}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Register
            </Button>
        </FlexBetween>
        </Box>
      </WidgetWrapper>
          <Divider />
      </WidgetWrapper>

    );
};

export default EventWidget;
