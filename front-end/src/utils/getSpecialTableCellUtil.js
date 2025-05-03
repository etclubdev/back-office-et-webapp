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

        default:
            return row[col.field]
    }
}