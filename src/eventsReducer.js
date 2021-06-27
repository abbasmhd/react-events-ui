const eventsReducer = (state, action) => {

  function removeEvent(id) {
    return state.eventList.filter((item) => item.id !== id);
  }

  switch (action.type) {

    case 'setEventList': {
      return {
        ...state,
        eventList: action.eventList,
        isLoading: false,
        pageIndex: action.pageIndex,
        recordNo: action.recordNo,
        totalPages: action.totalPages,
        totalCount: action.totalCount,
        hasPreviousPage: action.hasPreviousPage,
        hasNextPage: action.hasNextPage,
      };
    }

    case 'showError': {
      return { ...state, hasError: true, error: action.message, isLoading: false };
    }

    case 'setEventItem': {
      return { ...state, eventItem: action.eventItem, isLoading: false };
    }

    case 'saveEvent': {
      return { ...state, isLoading: false, redirect: true };
    }

    case 'deleteEvent': {
      return { ...state, eventList: removeEvent(action.eventId), isLoading: false };
    }

    default:
      return state;
  }
};
export default eventsReducer;