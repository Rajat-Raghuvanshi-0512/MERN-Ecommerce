class ApiFeatures {

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        //Selecting name query from mongodb and matching with query
        const keyword = this.queryStr.keyword &&
        {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i" //case insensitive
            }
        }
        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        //To make copy of query 
        let queryCopy = { ...this.queryStr }
        //Removing some fields from category
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach(key => {
            delete queryCopy[key]
        })

        //Filter for price and rating
        let queryString = JSON.stringify(queryCopy)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryString))
        return this;
    }

    page(ResultsPerPage) {
        let CurrentPage = Number(this.queryStr.page) || 1
        const skip = ResultsPerPage * (CurrentPage - 1)
        this.query = this.query.limit(ResultsPerPage).skip(skip)
        return this;
    }

}
module.exports = ApiFeatures;