import React from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterMenu from "./FilterMenu";
const Library = () => {
  return (
    <div className="library text-center">
      <Typography className="my-3" variant="h5">
        Library
      </Typography>
      <div className="flex justify-center">
        <TextField
          label="Search your library"
          variant="outlined"
          size="small"
          color="searchbar"
          className="w-full"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className="cursor-pointer" />
              </InputAdornment>
            ),
          }}
        />
        <FilterMenu />
      </div>
      <p className="text-gray-400 mt-2">
        Your library is empty, follow some novel to fill it!
      </p>
    </div>
  );
};

export default Library;
