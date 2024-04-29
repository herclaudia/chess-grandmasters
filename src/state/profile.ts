import { useCallback, useReducer } from "react";

type ProfileDetails = {
  "@id": string;
  avatar: string;
  player_id: number;
  url: string;
  name: string;
  username: string;
  title: string;
  followers: number;
  country: string;
  location: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  verified: boolean;
  league: string;
};

type ErrorType = {
  message: string;
};

type ProfileState = {
  isLoading: boolean;
  data: ProfileDetails | null;
  error?: string;
};

type SetLoadingAction = {
  type: "PROFILE_SET_LOADING";
  payload: undefined;
};

type SetDataAction = {
  type: "PROFILE_SET_DATA";
  payload: {
    data: ProfileDetails;
  };
};

type SetErrorAction = {
  type: "PROFILE_SET_ERROR";
  payload: {
    error: string;
  };
};

type ProfileAction = SetLoadingAction | SetDataAction | SetErrorAction;

const initialDetailsState = {
  isLoading: true,
  data: null,
  error: undefined,
};

const reducer = (state: ProfileState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case "PROFILE_SET_LOADING":
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case "PROFILE_SET_DATA":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    case "PROFILE_SET_ERROR":
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

type Options = {
  username: string;
};

export const useProfileState = ({ username }: Options) => {
  const [state, dispatch] = useReducer(reducer, initialDetailsState);

  const fetchProfilePage = useCallback(() => {
    const fetchProfilePageFunc = async () => {
      try {
        const response = await fetch(
          `https://api.chess.com/pub/player/${username}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ProfileDetails = await response.json();

        dispatch({
          type: "PROFILE_SET_DATA",
          payload: {
            data,
          },
        });
      } catch (error) {
        dispatch({
          type: "PROFILE_SET_ERROR",
          payload: {
            error: (error as ErrorType)?.message || "Unknown error",
          },
        });
      }
    };

    fetchProfilePageFunc();
  }, [username, dispatch]);

  return {
    state,
    fetchProfilePage,
  };
};
