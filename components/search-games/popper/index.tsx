import { Popper } from "@mui/material";
import { PopperProps } from "@mui/material/Popper/BasePopper.types";
export function SearchGamesPopper(props: PopperProps) {
  return (
    <Popper
      sx={{
        borderRadius: "0 0 20px 20px",
        "& .MuiPaper-root": {
          borderRadius: "0 0 20px 20px",
          border: "1px solid var(--border-default)",
          borderTop: "none",
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
        },
        "& .MuiAutocomplete-noOptions, & .MuiAutocomplete-loading": {
          color: "var(--text-secondary)",
        },
      }}
      {...props}
    />
  );
}
