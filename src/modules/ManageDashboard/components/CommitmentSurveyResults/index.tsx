import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";
import { COLORS } from "constant";
import { CommitmentSurveyResults as CommitmentSurveyResultsType } from "types";

interface CommitmentSurveyResultsProps {
  data: CommitmentSurveyResultsType[] | undefined;
}

const SEGMENTS_COLORS = [COLORS.primary.main, COLORS.gray.thin, COLORS.primary.lightest];

const CommitmentSurveyResults = (props: CommitmentSurveyResultsProps) => {
  console.log(props.data);

  return (
    <Box height={"350px"}>
      <ResponsiveContainer width="100%" height={"100%"}>
        <PieChart>
          <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name }) => name}
          >
            {props.data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={SEGMENTS_COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CommitmentSurveyResults;
