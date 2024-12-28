import React from "react";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { Snackbar } from "@mui/material";

const ExplainMe = () => {
  const [topic, setTopic] = useState("");
  const [topicResponse, setTopicResponse] = useState("");

  const [topicError, setTopicError] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiUri = process.env.REACT_APP_EXPLAIN_ME_API_URI;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (topic === "" || topic.length < 3) {
      setTopicError("Topic needs to be atleast 3 characters long");
      setOpen(true);
      return;
    }

    setIsLoading(true);
    const response = await axios.post(apiUri, topic, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);
    setTopicResponse(response.data.message);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={topicError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundImage:
                "linear-gradient(45deg, rgba(138, 43, 226, 0.7), rgba(138, 43, 226, 0.9))",
              color: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
            },
          }}
        />
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 6 }}>
          <form className="form-group" onSubmit={handleSubmit}>
            <Grid container rowSpacing={2}>
              <Grid item size={{ xs: 12 }}>
                <label className="label" htmlFor="topic">
                  Topic
                </label>
              </Grid>
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 11 }}>
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="How does a rocket work?"
                  required
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                <button
                  className="form-button"
                  disabled={isLoading}
                  type="submit"
                >
                  Go
                </button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} sx={{ my: 1 }}>
          {isLoading && <div className="loading-text">Let me think...</div>}
          {!isLoading && topicResponse !== "" && (
            <article>
              <h2>Explanation:</h2>
              <p>
                {topicResponse.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < topicResponse.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </article>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ExplainMe;
