import { useEffect, useReducer } from 'react';
import axios from 'axios';

import eventsReducer from './eventsReducer';

function useEventItemManager(id) {

  const [{ isLoading, eventItem, hasError, error, redirect }, dispatch] =
    useReducer(eventsReducer, {
      isLoading: true,
      eventItem: {},
      hasError: false,
      error: "",
      redirect: false
    });

  function saveEvent(item) {
    const saveData = async function () {
      try {
        if (item.id) {
          await axios.put(`${process.env.API_URL}/Events`, { ...item });
        } else {
          await axios.post(`${process.env.API_URL}/Events`, { ...item });
        }
        dispatch({ type: 'saveEvent' })
      } catch (err) {
        dispatch({ type: 'showError', message: err.response.data.errors.reduce((acc, { message }) => `${acc} <br /> ${message}`, "") })
      }
    };

    saveData();
  }

  useEffect(() => {

    const fetchData = async function (id) {
      try {
        const result = await axios.get(`${process.env.API_URL}/Events?id=${id}`);
        const data = result && result.data;

        dispatch({
          type: 'setEventItem',
          eventItem: data,
          hasError: false,
          error: ""
        });
      } catch (err) {
        dispatch({ type: 'showError', message: err.response.data.errors.reduce((accumulator, current) => `${accumulator.message} <br /> ${current.message}`, { message: "" }) })
      }
    };

    if (id) {
      fetchData(id);
    } else {
      dispatch({
        type: 'setEventItem',
        eventItem: {},
        hasError: false,
      });
    }

    return () => {
      console.log('cleanup');
    };

  }, []);

  return {
    isLoading,
    eventItem,
    hasError,
    error,
    redirect,
    saveEvent
  };
}
export default useEventItemManager;