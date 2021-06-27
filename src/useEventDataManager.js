import { useEffect, useReducer } from 'react';
import axios from 'axios';

import eventsReducer from './eventsReducer';

function useEventDataManager() {

  const [{ isLoading, eventList, pageIndex, recordNo, totalPages, totalCount, hasPreviousPage, hasNextPage, hasError, error }, dispatch] =
    useReducer(eventsReducer, {
      isLoading: true,
      eventList: [],
      pageIndex: 1,
      recordNo: 1,
      totalPages: 1,
      totalCount: 1,
      hasPreviousPage: true,
      hasNextPage: true,
      hasError: false,
      error: "",
    });

  function deleteEvent(id) {
    const deleteData = async function (eventId) {
      try {
        await axios.delete(`${process.env.API_URL}/Events?id=${eventId}`);
        dispatch({ type: 'deleteEvent', eventId })
      } catch (err) {
        dispatch({ type: 'showError', message: err.response.data.errors.reduce((accumulator, current) => `${accumulator.message} <br /> ${current.message}`, { message: "" }) })
      }
    };
    deleteData(id);
  }

  useEffect(() => {

    const fetchData = async function () {
      try {
        const pageSize = process.env.API_PAGESIZE;
        const result = await axios.get(`${process.env.API_URL}/Events/List?pageNo=1&pageSize=${pageSize}`);
        const data = result && result.data;

        dispatch({
          type: 'setEventList',
          eventList: data.items,
          pageIndex: data.pageIndex,
          recordNo: data.recordNo,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
          hasPreviousPage: data.hasPreviousPage,
          hasNextPage: data.hasNextPage,
          hasError: false,
          error: "",
        });
      } catch (err) {
        dispatch({ type: 'showError', message: err.response.data.errors.reduce((accumulator, current) => `${accumulator.message} <br /> ${current.message}`, { message: "" }) })
      }
    };

    fetchData();

    return () => {
      console.log('cleanup');
    };

  }, []);

  return {
    isLoading,
    eventList,
    pageIndex,
    recordNo,
    totalPages,
    totalCount,
    hasPreviousPage,
    hasNextPage,
    hasError,
    error,
    deleteEvent
  };
}
export default useEventDataManager;