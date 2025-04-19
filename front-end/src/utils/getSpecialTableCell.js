export const getSpecialTableCell = (row, col) => {
    switch(col.field) {
      case "image_url":
        return <img src={row[col.field]} alt="" />
      case "visible": 
        return <>{row[col.field] ? "Có" : "Không"}</>
      default:
        return row[col.field]
    }
}