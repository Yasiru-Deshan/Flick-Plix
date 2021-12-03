const Trailers = require('../models/trailerModel')

//Filter,sorting and paginating
class APIfeatures{
    constructor (query, queryString){
        this.query = query;
        this.queryString = queryString;
        }
        filtering(){

            const queryObj = {...this.queryString}//queryString = req.query
            
          //  console.log({before: queryObj})

            const excludeFields = ['page', 'sort', 'limit']
            excludeFields.forEach(el => delete(queryObj[el]))
            
           // console.log({after: queryObj})//after delete page

            let queryStr = JSON.stringify(queryObj)
            queryStr =queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$'+match)

          //  console.log({queryStr})
            //gte = greater than or equal 
            //lte = lesser than or equal 
            //lt =lesser than
            //gt = greater than 
            
            this.query.find(JSON.parse(queryStr))
            
            return this;
        }
        sorting(){
            if(this.queryString.sort){
                const sortBy = this.queryString.sort.split(',').join(' ')
                this.query =this.query.sort(sortBy)
            }else{
                this.query =this.query.sort('-createdAt')
            
                //console.log(sortBy)
            }
            return this;
        }
        paginating(){
            const page =this.queryString.page * 1|| 1
            const limit = this.queryString.limit * 1|| 9
            const skip = (page -1 ) * limit;
            this.query = this.query.skip(skip).limit(limit)
            return this;

        }
}

const trailerCtrl = {
    getTrailers: async (req, res) =>{

        try {
           
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()
            
            const trailers = await features.query
            res.json({
                status: 'success',
                result: trailers.length,
                trailers: trailers
            })
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        },
    createTrailer: async (req, res) =>{
            try {
               const {trailer_id, title, price, description, content,images,category} =req.body;
                if(!images) return res.status(400).json({msg: "No image upload"})
                const trailer = await Trailers.findOne({trailer_id})
                if(trailer){
                return res.status(400).json({msg:"This trailer already exists"})
                }
                const newTrailer = new Trailers({
                    trailer_id, title:title.toLowerCase(), price , description , content, images,category  
                })
                await newTrailer.save()

               // res.json(newProduct)
                res.json({msg: "created a trailer"})

            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
            },
     deleteTrailer: async (req, res) =>{
                try {
                    await Trailers.findByIdAndDelete(req.params.id)
                    res.json({msg: "Deleted a Trailer"})
                } catch (err) {
                    return res.status(500).json({msg: err.message})
                }
                },
    updateTrailer: async (req, res) =>{
                    try {
                        const {title, price, description,content,images,category} =req.body;
                        if(!images) return res.status(400).json({msg:"No image uploded"})

                        await Trailers.findOneAndUpdate({_id: req.params.id}, {
                            title:title.toLowerCase(), price , description , content, images,category  
                        })
                        res.json({msg: "Updated a Trailer"})
                    } catch (err) {
                        return res.status(500).json({msg: err.message})
                    }
              }

    }
module.exports = trailerCtrl