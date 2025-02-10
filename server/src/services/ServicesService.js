import ServiceModel from "../models/ServiceModel.js";


export const ServicesCreateService = async (req, res) => {
    try {

        let reqBody = req.body;
        await ServiceModel.create(reqBody);

        return {status: "success", "Message": "Service Created successfully"};
    } catch (err) {
        return {status: "error", "Message": err.toString()};
    }
};

export const ServicesReadService = async (req, res) => {
    try {
        let data = await ServiceModel.find();
        return {status: "success", "Message": "Services Read successfully", data: data};
    } catch (err) {
        return {status: "error", "Message": err.toString()};
    }
};

export const ServicesUpdateService = async (req, res) => {
    try {
        let serviceID = req.params.serviceID;
        let reqBody = req.body;
        let data = await ServiceModel.updateOne({_id:serviceID}, {$set: reqBody});
        return {status: "success", "Message": "Service Updated successfully", data: data};
    } catch (err) {
        return {status: "error", "Message": err.toString()};
    }
};

export const ServicesRemoveService = async (req) => {
    try {

        let reqBody = req.body;
        let data = await ServiceModel.deleteOne(reqBody);
        return {status: "success", message: "Service Removed Successfully", data: data};
    } catch (err) {
        return {status: "error", "Message": err.toString()};
    }
};
