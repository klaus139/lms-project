import React, { FC, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/user/userApi";
import { styles } from "@/app/styles/style";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      setActive(false);
      toast.success("User role updated successfully");
    }
    if (deleteSuccess) {
      refetch();
      setOpen(false);
      toast.success("User deleted successfully");
    }
  }, [updateError, isSuccess, deleteSuccess]); // Add dependencies to the useEffect hook

  const column = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-red-700 text-red-500"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "",
      headerName: "Email",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail
                className="dark:text-white text-black mt-3"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const id = userId;
    await deleteUser({ id });
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[220px] dark:bg-[#57c7ac] dark:border dark:border-[#ffffff6c] !h-[35px]`}
              onClick={() => setActive(!active)}
            >
              Add New Member
            </div>
          </div>
          <Box
            m="40px 0 0 0 "
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#180202" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none",
                color: theme === "dark" ? "#380b0b" : "#000",
                backgroundColor: theme === "dark" ? "#334396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#334396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#b7ebde !important" : "#000",
              },
              "&. MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={column} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center dark:bg-[#021f57] w-auto m-[20px] p-[30px]">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="w-full flex items-center justify-between mb-6 mt-5">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c57a] p-2`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-red-500 p-2`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center dark:bg-[#021233] bg-gray-900 w-auto m-[20px] p-[30px]">
                <h1 className="text-white justify-center items-center flex mx-auto text-[25px] text-500">
                  Add New Member
                </h1>
                <div className="w-full mt-5 relative mb-1">
                  <label className={`${styles.label}`} htmlFor="password">
                    change the value
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="password"
                    placeholder="email"
                    className={`
              
             ${styles.input}`}
                  />
                  <label className={`${styles.label}`} htmlFor="role">
                    Role:
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`${styles.input}`}
                  >
                    <option value="admin" className='mb-2'>Admin</option>
                    <option value="user">User</option>
                  </select>

                  <button className={`${styles.button} mt-[30px]`} onClick={handleSubmit}>
                    Add Member
                  </button>

               
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
