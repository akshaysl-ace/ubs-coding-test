import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Show {
  id: number;
  name: string;
  ended?: string;
  image?: { medium: string };
  genres?: string[];
  rating?: { average: number | null };
  status?: string;
  summary?: string;
}

interface MovieState {
  query: string;
  shows: { show: Show }[];
  selectedMovies: Show[];
  loading: boolean;
  error: string | null;
  isDropdownOpen: boolean;
}

const initialState: MovieState = {
  query: "",
  shows: [],
  selectedMovies: [],
  loading: false,
  error: null,
  isDropdownOpen: false,
};

export const fetchShows = createAsyncThunk<
  { show: Show }[],
  string,
  { rejectValue: string }
>("movies/fetchShows", async (query: string, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to fetch shows");
    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Unknown error"
    );
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setShows(state, action: PayloadAction<{ show: Show }[]>) {
      state.shows = action.payload;
    },
    setIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    selectShow(state, action: PayloadAction<Show>) {
      if (
        !state.selectedMovies.some((movie) => movie.id === action.payload.id)
      ) {
        state.selectedMovies.push(action.payload);
      }
      state.query = "";
      state.isDropdownOpen = false;
    },
    deleteMovie(state, action: PayloadAction<number>) {
      state.selectedMovies = state.selectedMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchShows.fulfilled,
        (state, action: PayloadAction<{ show: Show }[]>) => {
          state.shows = action.payload;
          state.loading = false;
          if (
            !state.isDropdownOpen &&
            !state.selectedMovies.find((i) => i.name === state.query)
          ) {
            state.isDropdownOpen = true;
          }
        }
      )
      .addCase(
        fetchShows.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch shows";
          state.isDropdownOpen = false;
          state.loading = false;
        }
      );
  },
});

export const {
  setQuery,
  setShows,
  setIsDropdownOpen,
  setLoading,
  setError,
  selectShow,
  deleteMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
