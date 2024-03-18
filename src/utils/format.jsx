import moment from "moment"
import { DATE_FORMAT } from "../constants/format";

// ---- Format number to display currency ----//
export const formatCurrency = (data, type = "vi-VN") => {
    if (!data) return 0;
    return data.toLocaleString(type);
  };
  
  // ---- Format date to display with format ----//
  export const formatDate = (date, format = DATE_FORMAT) => {
    if (!!!date) return "";
    return moment(date).format(format);
  };