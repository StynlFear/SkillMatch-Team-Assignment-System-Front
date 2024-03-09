import React from "react";
import { Card, CardContent, CardHeader, CardActions, Typography, Button } from "@mui/material";

const ProjectCard = ({ title, status, details }) => {
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={status}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {details}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
