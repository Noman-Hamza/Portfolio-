import ServiceModel from "../models/ServiceModel.js";


export const ServicesCreateService = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let reqBody = req.body;
        reqBody.user_id = user_id;
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
        let user_id = req.headers.user_id;
        let serviceID = req.params.serviceID;
        let reqBody = req.body;
        let data = await ServiceModel.updateOne({_id: serviceID, user_id: user_id}, {$set: reqBody});
        return {status: "success", "Message": "Service Updated successfully", data: data};
    } catch (err) {
        return {status: "error", "Message": err.toString()};
    }
};

export const ServicesRemoveService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.user_id = user_id;
        let data = await ServiceModel.deleteOne(reqBody);
        return {status: "success", message: "Service Removed Successfully", data: data};
    } catch (err) {
        return {status: "error", "Message": err.toString()};
    }
};
