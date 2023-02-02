import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  post: {
    cursor: "pointer",
    borderRadius: "25px",
    "&:hover": {
      background: "rgba(200,200,200,0.2)",
    },
  },
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "#556CD6",
    },
  },
});

export { useStyles };
