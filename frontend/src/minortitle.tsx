import React from "react";
import { Box, Typography } from "@mui/material";

const MinorTitle: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4, // smaller vertical padding
        px: 2,
      }}
    >
      <Typography variant="h6" align="center">
        Here is a practical example of two factor authentication
      </Typography>
    </Box>
  );
};

export default MinorTitle;
