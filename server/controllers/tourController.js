import mongoose from "mongoose"
import Tour from "../models/Tour.js"

//! get all Tours
export const getAllTours = async (req,res) =>{
    try {
        const { 
          page = 1, 
          limit = 10, 
          sortBy = 'createdAt', 
          order = 'desc',
          minPrice,
          maxPrice,
          difficulty
        } = req.query;
  
        const query = {};
        
        // Price range filter
        if (minPrice && maxPrice) {
          query.price = { 
            $gte: parseFloat(minPrice), 
            $lte: parseFloat(maxPrice) 
          };
        }
  
        // Difficulty filter
        if (difficulty) {
          query.difficulty = difficulty;
        }
  
        const Tours = await Tour.find(query)
          .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
          .limit(parseInt(limit))
          .skip((page - 1) * limit);
  
        const total = await Tour.countDocuments(query);
  
        res.json({
          Tours,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalTours: total
        });
    } catch (error) {
        res.status(500).json({ 
          message: 'Error fetching Tours', 
          error: error.message 
        });
    }
}

export const getTourByCategory = async (req, res, next) => {
  const tours = await Tour.find({ 
    category: req.params.category 
  });

  if (!tours || tours.length === 0) {
    return next(new ErrorResponse(`No tours found in ${req.params.category} category`, 404));
  }

  res.status(200).json({
    success: true,
    results: tours.length,
    data: tours
  });
};

//! get details of a packge 
export const getTourById = async (req,res) =>{
    try {
        const pckg = await Tour.findById(req.params.id);
        
        if (!pckg) {
          return res.status(404).json({ message: 'Tour not found' });
        }
  
        res.json(pckg);
      } catch (error) {
        res.status(500).json({ 
          message: 'Error fetching Tour', 
          error: error.message 
        });
    }
}

//! create a new Tour (Admin only)
export const createTour = async (req,res) => {
    try {
        const newTour = new Tour(req.body);
        console.log("ewtour",newTour)
        await newTour.save();
        console.log("tour",newTour)
        res.status(201).json({
          message: 'Tour created successfully',
          Tour: newTour
        });
      } catch (error) {
        res.status(400).json({ 
          message: 'Error creating Tour', 
          error: error.message 
        });
      }
}

//! update existing Tour (Admin only)
export const updateTour = async (req,res) => {
    try {
        console.log("req.body",req.body)
        const updatedTour = await Tour.findByIdAndUpdate(
          req.params.id, 
          req.body, 
          { new: true, runValidators: true }
        );

        console.log("upda",updateTour)
  
        if (!updatedTour) {
          return res.status(404).json({ message: 'Tour not found' });
        }
  
        res.json({
          message: 'Tour updated successfully',
          Tour: updatedTour
        });
      } catch (error) {
        res.status(400).json({ 
          message: 'Error updating Tour', 
          error: error.message 
        });
      }
}

//! delete a Tour (Admin only)
export const deleteTour = async (req,res) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
  
        if (!deletedTour) {
          return res.status(404).json({ message: 'Tour not found' });
        }
  
        res.json({ 
          message: 'Tour deleted successfully',
          Tour: deletedTour
        });
      } catch (error) {
        res.status(500).json({ 
          message: 'Error deleting Tour', 
          error: error.message 
        });
      }
}
