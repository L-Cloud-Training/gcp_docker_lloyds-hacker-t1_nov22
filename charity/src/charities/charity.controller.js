var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;
let express = require('express');

function CharityController () {

    const test4Test = async (req, res, next) => {
        // console.log(connection);
        return res.status(200).json({ "test": "test" });
    }
    
    const createCharity = async (req, res) => {
        try {
            conn = typeorm.getConnection();
            charityRepo = await conn.getRepository("Charity");
            result = await charityRepo.create(req.body);
            charity = await charityRepo.save(result);
            return res.status(200).json(charity);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const getAllCharities = async (req, res) => {
        
        try {
            conn = typeorm.getConnection();
            charityRepo = await conn.getRepository("Charity");
            charities = await charityRepo.find();            
            return res.status(200).json(charities);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const getCharityById = async (req, res) => {

        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            charityRepo = await conn.getRepository("Charity");
            charity = await charityRepo.find({ id: parseInt(id) });
            return res.status(200).json(charity);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const getCharityFundsById = async (req, res) => {

        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            charityRepo = await conn.getRepository("Charity");
            //charityfunds = await charityRepo.find({ where : { id: parseInt(id)}, select : ['funds'] });
            charityfunds = await charityRepo.createQueryBuilder("charity").select(['charity.funds']).getOne();
            //return res.status(200).result(charityfunds)
            return res.status(200).json(charityfunds);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const updateCharity = async (req, res) => {
        
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            charityRepo = await conn.getRepository("Charity");
            charity = await charityRepo.update(parseInt(id), req.body);
            return res.status(200).json(charity);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const updateCharityFunds = async (req, res) => {
        
        const { id } = req.params;
        console.log(req.body.funds, id);

        try {
            conn = typeorm.getConnection();
            charityRepo = await conn.getRepository("Charity");
            //updateFunds = charityRepo.createQueryBuilder().update("Charity").set({ "funds" : parseFloat(funds)}).where({id: parseInt(id)});
            updateFunds = charityRepo.createQueryBuilder().update("Charity").set({funds : parseFloat(req.body.funds)}).where("id = :id", {id: parseInt(id)}).execute();
            //charity = await charityRepo.update(parseInt(id), req.body);
            updatedCharity = await charityRepo.find({ id: parseInt(id) });
            return res.status(200).json(updatedCharity);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const deleteCharity = async (req, res) => {
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            charityRepo = await conn.getRepository("Charity");
            charity = await charityRepo.delete(parseInt(id));
            return res.status(200).json(charity);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    return {
        createCharity,
        getAllCharities,
        getCharityById,
        getCharityFundsById,
        updateCharity,
        updateCharityFunds,
        deleteCharity,
        test4Test
    };
}

module.exports = CharityController;