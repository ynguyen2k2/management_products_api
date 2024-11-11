const createNewQuery = `
INSERT INTO products(name,description,cover,catagoryId) values($1,$2,$3,$3) RETURN *`

export default productQueries = {
    createNewQuery
}