const Food = require('../Model/food.model');

exports.addFood = async (req, res) => {
    try {
        let imagePath = "";
        const { name, description, price, category } = req.body;

        let food = await Food.findOne({ name: name, isDeleted: false });
        if (food) {
            return res.status(400).json({ message: "Food already exists" });
        }
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/");
        }
        food = await Food.create({
            name,
            description,
            price,
            category,
            image: imagePath
        });

        res.status(201).json({ message: "Product added successfully." , food});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.foodList = async (req, res) => {
    try {
        const food = await Food.find({ isDeleted: false });
        if (!food) {
            return res.status(404).json({ message: "No products found",  success: true });
        }
        res.status(200).json({data:food});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error",success: false });
    }
};

exports.foodItem = async (req, res) => {
    try {
        let food = await Food.findById({_id:req.query.foodId , isDeleted:false});
        if (!food) {
            return res.status(404).json({ message: 'Food not found.' });
        }
        res.status(200).json(food);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }
}   

exports.foodUpdate = async (req, res) => {
    try {
        let food = await Food.findById({_id:req.query.foodId , isDeleted:false});
        if (!food) {
            return res.status(404).json({ message: 'Food not found.' });
        }
        food =await Food.findByIdAndUpdate({_id:food.id}, req.body,{new:true})
        res.status(200).json({food,message: 'updated food...'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }
} 


exports.deleteFood = async (req, res) => {
    try {
      const foodId = req.query.foodId;
      let food = await Food.findOne({ _id: foodId, isDeleted: false });
  
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }
  
      // Mark the food item as deleted
      await Food.findByIdAndUpdate(foodId, { isDeleted: true }, { new: true });
      res.status(200).json({ success: true, message: "Food item deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  