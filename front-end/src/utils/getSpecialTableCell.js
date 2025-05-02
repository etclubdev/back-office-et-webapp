import dayjs from "dayjs";

export const getSpecialTableCell = (row, col) => {
  switch (col.field) {
    case "image_url":
      return <img src={row[col.field]} alt="" style={{ width: "50px" }} />;
    case "visible":
      return <>{row[col.field] ? "Có" : "Không"}</>;
    case "start_date":
    case "end_date":
    case "created_on":
    case "last_modified_on":
      return <>{dayjs(row[col.field]).format("DD-MM-YYYY")}</>;
    default:
      return row[col.field];
  }
};
