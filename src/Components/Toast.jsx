import { toast } from "react-toastify";

export const notify = (msg) => toast(msg ?? "Something went wrong");