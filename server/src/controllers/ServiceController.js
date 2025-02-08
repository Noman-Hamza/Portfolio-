import { ServicesCreateService, ServicesReadService, ServicesRemoveService, ServicesUpdateService } from "../services/ServicesService.js";
///Create
export const ServicesCreate = async (req, res) => {
    let result = await ServicesCreateService(req);
    return res.status(200).json(result);
};
///Read
export const ServicesRead = async (req, res) => {
    let result = await ServicesReadService(req);
    return res.status(200).json(result);
};
///Update
export const ServicesUpdate = async (req, res) => {
    let result = await ServicesUpdateService(req);
    return res.status(200).json(result);
};
///Delete
export const ServicesRemove = async (req, res) => {
    let result = await ServicesRemoveService(req);
    return res.status(200).json(result);
};
