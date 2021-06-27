import React from 'react';
import toastr from 'toastr';
import Router from 'next/router';

import { Header } from './Header';
import { Menu } from './Menu';
import EventForm from './EventForm';
import useEventItemManager from './useEventItemManager';

function AddEvent() {
    const {
        isLoading,
        eventItem,
        hasError,
        error,
        redirect,
        saveEvent,
    } = useEventItemManager();

    function showErrorMessage(message) {
        toastr.options = {
            positionClass: 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 3000
        }
        toastr.clear()
        toastr.error(message);
    }

    const saveCallback = (item) => {
        saveEvent(item);
    }

    if (redirect) {
        console.info("redirect", redirect);
        Router.push("/");
    }

    if (hasError) {
        showErrorMessage(error);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <Menu />
            <div className="container">
                <div className="row">
                    <div className="col margintopbottom">
                        <h2>Add Event</h2>
                        <EventForm eventItem={eventItem} saveCallback={saveCallback} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEvent;
