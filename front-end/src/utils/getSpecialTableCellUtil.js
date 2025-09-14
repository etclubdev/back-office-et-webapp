import { trimText } from "./trimText"

export const getSpecialTableCell = (row, col) => {
    switch (col.field) {
        case "image_url":
            return <img src={row[col.field]} alt="" />

        case "visible":
            return <>{row[col.field] ? "Có" : "Không"}</>

        case "dob":
        case "start_date":
        case "end_date":
        case "created_on":
        case "last_modified_on":
            return new Date(row[col.field]).toLocaleDateString('en-GB')

        case "cv_link":
            return <a href={row[col.field]} target="_blank" rel="noopener noreferrer">CV</a>

        default:
            return trimText(row[col.field], 60);
    }
}