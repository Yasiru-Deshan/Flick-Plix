const router = require('express').Router();
const Movie = require('../models/Movie');

//CREATE

router.post('/', async (req, res) => {
	const newMovie = new Movie(req.body);
	try {
		const savedMovie = await newMovie.save();
		res.status(201).json(savedMovie);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE

router.put('/:id', async (req, res) => {
	try {
		const updatedMovie = await Movie.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		);
		res.status(200).json(updatedMovie);
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE

router.delete('/:id', async (req, res) => {
	try {
		await Movie.findByIdAndDelete(req.params.id);
		res.status(200).json('The movie has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET

router.get('/find/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET RANDOM

router.get('/random', async (req, res) => {
	const type = req.query.type;
	let movie;
	try {
		if (type === 'series') {
			movie = await Movie.aggregate([
				{ $match: { isSeries: true } },
				{ $sample: { size: 1 } }
			]);
		} else {
			movie = await Movie.aggregate([
				{ $match: { isSeries: false } },
				{ $sample: { size: 1 } }
			]);
		}
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL

router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		res.status(200).json(movies.reverse());
	} catch (err) {
		res.status(500).json(err);
	}
});

//get movie by genre
router.get("/movie/:genre", async(req,res)=>{
	try{
		const movies = await Movie.find({ genre: req.params.genre})
		res.status(200).json(movies);
	}catch(err){
		res.status(500).json(err);
	}
})

//like/dislike a post

router.put("/:id/like", async(req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie.likes.includes(req.body.userId)){
            await movie.updateOne({ $push: { likes: req.body.userId }});
            res.status(200).json("The movie has been liked");
        }else{
            await movie.updateOne({ $pull: { likes: req.body.userId }});
            res.status(200).json("The movie has been disliked");
        }
    }catch(err){
        res.status(500).json(err);
    }

})





module.exports = router;
