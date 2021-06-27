import React, { useState } from 'react';
import Link from 'next/link';
import SweetAlert from "react-bootstrap-sweetalert"
import toastr from 'toastr'

import useEventDataManager from "./useEventDataManager"
import { localeDate } from "./Utils"


function EventList() {

    const {
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
        deleteEvent,
    } = useEventDataManager();

    const [showAlert, setShowAlert] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    function showConfirm(item) {
        setSelectedItem(item);
        setShowAlert(true);
    }

    function onDelete(e) {
        deleteEvent(selectedItem.id);
        setShowAlert(false);
    }

    function onCancel(e) {
        setSelectedItem({});
        setShowAlert(false);
    }

    function showErrorMessage(message) {
        toastr.options = {
            positionClass: 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 3000
        }
        toastr.clear()
        toastr.error(message);
    }

    if (hasError) {
        showErrorMessage(error);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Event List</h2>
            <h6 className="margintopbottom20"> </h6>
            <table className="table">
                <thead>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Timezone</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {eventList.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                {/* <th scope="row">{index + recordNo}</th> */}
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.timezone}</td>
                                <td>{localeDate(item.startDate)}</td>
                                <td>{localeDate(item.endDate)}</td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <Link href={{ pathname: "editevent", query: { id: item.id } }}>
                                            <a className="btn btn-outline-primary">Edit</a>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => { showConfirm(item); }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <SweetAlert
                show={showAlert}
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={onDelete}
                onCancel={onCancel}
                focusCancelBtn
            >
                You will not be able to recover this item!
            </SweetAlert>
        </div>
    );
}

export default EventList;
