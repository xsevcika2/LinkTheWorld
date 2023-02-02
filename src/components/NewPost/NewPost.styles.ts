import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  anchorBottom: {
    borderRadius: "10px",
    position: "fixed",
    padding: "15px",
    bottom: 0,
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(5px)",
  },
  input: {
    backgroundColor: "#FFF",
  },
});

export { useStyles };
