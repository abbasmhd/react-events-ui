import React, { useState, forwardRef } from 'react';
import Link from 'next/link';
import DatePicker from "react-datepicker";

function EventForm({ eventItem, saveCallback }) {

    const [name, setName] = useState(eventItem.name);
    const [description, setDescription] = useState(eventItem.description);
    const [timezone, setTimezone] = useState(eventItem.timezone);
    const [startDate, setStartDate] = useState(Date.parse(eventItem.startDate || new Date()));
    const [endDate, setEndDate] = useState(Date.parse(eventItem.endDate || new Date()));

    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <input type="text" className="form-control" defaultValue={value} onClick={onClick} ref={ref} />
    ));

    function submitForm(e) {
        e.preventDefault();
        saveCallback({ id: eventItem.id, name, description, timezone, startDate: new Date(startDate).toJSON(), endDate: new Date(endDate).toJSON() });
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="timezone" className="form-label">Timezone</label>
                <input
                    type="text"
                    className="form-control"
                    value={timezone}
                    onChange={e => setTimezone(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Start Date</label><br />
                <DatePicker
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setStartDate(date)}
                    customInput={<DateInput />}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="endDate" className="form-label">End Date</label><br />
                <DatePicker
                    selected={endDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setEndDate(date)}
                    customInput={<DateInput />}
                />
            </div>

            <button type="submit" className="btn btn-outline-primary">Save</button>
            <Link href="/">
                <a className="btn btn-outline-primary">Cancel</a>
            </Link>
        </form>
    );
}

export default EventForm;