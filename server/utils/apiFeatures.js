class APIFeatures {
  //Initialize the class
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Shallow copy of the object
    const queryObj = { ...this.queryString };
    // Filtering out the fields not meant for filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`
    );

    // Convert string to object
    const queryObjWithOperators = JSON.parse(queryStr);
    console.log(queryObjWithOperators);
    // Apply regex for partial text search and handle MongoDB operators for numbers
    Object.keys(queryObjWithOperators).forEach((key) => {
      if (typeof queryObjWithOperators[key] === 'object') {
        // For MongoDB operators, ensure the value is converted to the appropriate type
        Object.keys(queryObjWithOperators[key]).forEach((operator) => {
          queryObjWithOperators[key][operator] = this.convertToNumber(
            queryObjWithOperators[key][operator]
          );
        });
      } else if (typeof queryObjWithOperators[key] === 'string') {
        // Apply regex for partial text search on string fields
        queryObjWithOperators[key] = new RegExp(
          queryObjWithOperators[key],
          'i'
        ); // 'i' for case-insensitive
      }
    });

    this.query = this.query.find(queryObjWithOperators);
    return this;
  }

  convertToNumber(value) {
    // Convert value to number if possible, otherwise return the original value
    const numberValue = parseFloat(value);
    return Number.isNaN(numberValue) ? value : numberValue;
  }

  sort() {
    //Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitField() {
    //Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    //Pagination
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
