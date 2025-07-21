import type { LoginData } from "../types/login.types";
import { instance } from "./axios";

const loginApi = {
  post: (data: LoginData) => instance.post("/auth/login", { ...data }),
  isLogin: () => instance.get("/app/check"),
};

const userApi = {
  post: (data: any) => instance.post("/user", { ...data }),
  getAll: () => instance.get("/user"),
  getOne: (params: { id: number }) => instance.get(`/user/${params.id}`),
  patch: (data: any) => instance.patch("/user", { ...data }),
  postAddress: (data: any) => instance.post("/user/address", { ...data }),
  getAddress: (params: { id: number }) =>
    instance.get("/user/address/", { params: params }),
  deleteAddress: (params: { id: number }) =>
    instance.delete(`/user/address/${params.id}`),
  deleteUser: (params: { id: number }) => instance.delete(`/user/${params.id}`),
  getUserPagination: (params: { page: number; limit: number }) =>
    instance.get(`/user/pagination/${params.limit}/${params.page}`),
  search: (query: string) => instance.get(`user/search?query=${query}`),
};

const equipmentApi = {
  post: (data: any) => instance.post("/equipment", { ...data }),
  getAll: (params?: { available: number }) =>
    instance.get("/equipment", { params }),
  getOne: (params: { id: number }) =>
    instance.get("/equipment", { params: params }),
  patch: (data: any) => instance.patch("/equipment", { ...data }),
  getCategory: () => instance.get("/equipment/category"),
  addCategory: (data: any) => instance.post("/equipment/category", { ...data }),
  delete: (params: { id: number }) =>
    instance.delete(`/equipment/${params.id}`, {}),
  getPagination: (params: { page: number; perPage: number }) =>
    instance.get("/equipment", { params: params }),
  search: (query: string) => instance.get(`/equipment/search?query=${query}`),
};

const rentalApi = {
  post: (data: any) => instance.post("/rentals", { ...data }),
  getAll: () => instance.get("/rentals", {}),
  getOne: (params: { id: number }) => instance.get(`/rentals/${params.id}`, {}),
  getFilter: (query: { id: number; e_id: number }) =>
    instance.get(`/rentals/filter?id=${query.id}&&e_id=${query.e_id}`),
  patch: (data: any) => instance.patch("/rentals", { ...data }),
  delete: (params: { id: number }) =>
    instance.delete(`/rentals`, { params: params }),
  getPagination: (params: { page: number; perPage: number }) =>
    instance.get(`/rentals/paginate`, { params: params }),
};

export { userApi, rentalApi, equipmentApi, loginApi };
