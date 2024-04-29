import { useCallback, useReducer } from "react";

type ErrorType = {
  message: string;
};

type ChessMastersState = {
  isLoading: boolean;
  data: string[];
  error?: string;
};

type SetLoadingAction = {
  type: "CHESSMASTERS_SET_LOADING";
};

type SetDataAction = {
  type: "CHESSMASTERS_SET_DATA";
  payload: {
    data: string[];
  };
};

type SetErrorAction = {
  type: "CHESSMASTERS_SET_ERROR";
  payload: {
    error: string;
  };
};

type ChessMastersAction = SetLoadingAction | SetDataAction | SetErrorAction;

type DataReturn = {
  players: string[];
};

const initialChessMastersState = {
  isLoading: true,
  data: [],
  error: undefined,
};

const reducer = (state: ChessMastersState, action: ChessMastersAction) => {
  switch (action.type) {
    case "CHESSMASTERS_SET_LOADING":
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case "CHESSMASTERS_SET_DATA":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    case "CHESSMASTERS_SET_ERROR":
      return {
        ...state,
        isLoading: false,
        data: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const useChessMastersState = () => {
  const [state, dispatch] = useReducer(reducer, initialChessMastersState);

  const fetchData = useCallback(() => {
    const fetchChessMasters = async () => {
      dispatch({
        type: "CHESSMASTERS_SET_LOADING",
      });

      try {
        const response = await fetch("https://api.chess.com/pub/titled/GM");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: DataReturn = await response.json();

        dispatch({
          type: "CHESSMASTERS_SET_DATA",
          payload: {
            data: data.players,
          },
        });
      } catch (error) {
        dispatch({
          type: "CHESSMASTERS_SET_ERROR",
          payload: {
            error: (error as ErrorType)?.message || "Unknown error",
          },
        });
      }
    };

    fetchChessMasters();
  }, [dispatch]);

  return {
    state,
    fetchData,
  };
};
