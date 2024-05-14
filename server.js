
// const http = require("http");
// const fs = require("fs");

// const PORT = 3000;

// // Read books data from file
// fs.readFile("books.json", function(err, data) {
//     try {
//         if (err) throw err;
//         // Converting to JSON
//         let books = JSON.parse(data);

//         // Create the HTTP server
//         const server = http.createServer((req, res) => {
//             res.setHeader('Content-Type', 'application/json');

//             // Handle different HTTP methods
//             switch (req.method) {
//                 case 'GET':
//                     if (req.url === '/api/books') {
//                         // GET /books: Retrieve a list of all books
//                         res.statusCode = 200;
//                         res.end(JSON.stringify(books));
//                     } else if (req.url.startsWith('/api/books/')) {
//                         // GET /books/:id: Retrieve a specific book by its ID
//                         const id = parseInt(req.url.split('/')[3]);
//                         const book = books.find(b => b.id === id);
//                         if (book) {
//                             res.statusCode = 200;
//                             res.end(JSON.stringify(book));
//                         } else {
//                             res.statusCode = 404;
//                             res.end(JSON.stringify({ error: 'Book not found' }));
//                         }
//                     } else {
//                         res.statusCode = 404;
//                         res.end(JSON.stringify({ error: 'Endpoint not found' }));
//                     }
//                     break;
//                 case 'POST':   
//                     if (req.url === '/api/books') {
//                         // POST /books: Create a new book
//                         let body = '';
//                         req.on('data', (chunk) => {
//                             body += chunk.toString();
//                         });
//                         req.on('end', () => {
//                             try {
//                                 const newBook = JSON.parse(body);
//                                 // Validate incoming data
//                                 if (!validateData(newBook)) {
//                                     res.statusCode = 400;
//                                     res.end(JSON.stringify({ error: 'Invalid data format' }));
//                                     return;
//                                 }
//                                 newBook.id = books.length + 1;
//                                 books.push(newBook);
//                                 saveBooks(books);
//                                 res.statusCode = 201;
//                                 res.end(JSON.stringify(newBook));
//                             } catch (error) {
//                                 res.statusCode = 400;
//                                 res.end(JSON.stringify({ error: 'Invalid JSON data' }));
//                             }
//                         });
//                     } else {
//                         res.statusCode = 404;
//                         res.end(JSON.stringify({ error: 'Endpoint not found' }));
//                     }
//                     break;
//                 case 'PUT':  
//                     if (req.url.startsWith('/api/books/')) {
//                         // PUT /books/:id: Update an existing book by its ID
//                         const id = parseInt(req.url.split('/')[3]);
//                         let body = '';
//                         req.on('data', (chunk) => {
//                             body += chunk.toString();
//                         });
//                         req.on('end', () => {
//                             try {
//                                 const updatedBook = JSON.parse(body);
//                                 updatedBook.id = id;
//                                 const index = books.findIndex(b => b.id === id);
//                                 if (index !== -1) {
//                                     books[index] = updatedBook;
//                                     saveBooks(books);
//                                     res.statusCode = 200;
//                                     res.end(JSON.stringify(updatedBook));
//                                 } else {
//                                     res.statusCode = 404;
//                                     res.end(JSON.stringify({ error: 'Book not found' }));
//                                 }
//                             } catch (error) {
//                                 res.statusCode = 400;
//                                 res.end(JSON.stringify({ error: 'Invalid JSON data' }));
//                             }
//                         });
//                     } else {
//                         res.statusCode = 404;
//                         res.end(JSON.stringify({ error: 'Endpoint not found' }));
//                     }
//                     break;
//                 case 'PATCH':
//                     if (req.url.startsWith('/api/books/')) {
//                         // PATCH /books/:id: Partial update of an existing book by its ID
//                         const id = parseInt(req.url.split('/')[3]);
//                         let body = '';
//                         req.on('data', (chunk) => {
//                             body += chunk.toString();
//                         });
//                         req.on('end', () => {
//                             try {
//                                 const partialUpdate = JSON.parse(body);
//                                 const index = books.findIndex(b => b.id === id);
//                                 if (index !== -1) {
//                                     books[index] = { ...books[index], ...partialUpdate };
//                                     saveBooks(books);
//                                     res.statusCode = 200;
//                                     res.end(JSON.stringify(books[index]));
//                                 } else {
//                                     res.statusCode = 404;
//                                     res.end(JSON.stringify({ error: 'Book not found' }));
//                                 }
//                             } catch (error) {
//                                 res.statusCode = 400;
//                                 res.end(JSON.stringify({ error: 'Invalid JSON data' }));
//                             }
//                         });
//                     } else {
//                         res.statusCode = 404;
//                         res.end(JSON.stringify({ error: 'Endpoint not found' }));
//                     }
//                     break;
//                 case 'DELETE':
//                     if (req.url.startsWith('/api/books/')) {
//                         // DELETE /books/:id: Delete a book by its ID
//                         const id = parseInt(req.url.split('/')[3]);
//                         const index = books.findIndex(b => b.id === id);
//                         if (index !== -1) {
//                             const deletedBook = books.splice(index, 1)[0];
//                             saveBooks(books);
//                             res.statusCode = 200;
//                             res.end(JSON.stringify(deletedBook));
//                         } else {
//                             res.statusCode = 404;
//                             res.end(JSON.stringify({ error: 'Book not found' }));
//                         }
//                     } else {
//                         res.statusCode = 404;
//                         res.end(JSON.stringify({ error: 'Endpoint not found' }));
//                     }
//                     break;
//                 default:
//                     res.statusCode = 404;
//                     res.end(JSON.stringify({ error: 'Endpoint not found' }));
//             }
//         });

//         server.listen(PORT, () => {
//             console.log(`Server running at http://localhost:${PORT}/`);
//         });
//     } catch (error) {
//         console.error('Error reading file:', error);
//         res.statusCode = 500;
//         res.end(JSON.stringify({ error: 'Internal server error' }));
//     }
// });

// // Validation function
// function validateData(data) {
//     return data.title && data.author; 
// }

// // Save books data to file
// function saveBooks(data) {
//     fs.writeFile("books.json", JSON.stringify(data, null, 2), (err) => {
//         if (err) throw err;
//         console.log('Books data saved to books.json');
//     });
// }


const http = require("http");
const fs = require("fs");

fs.readFile("books.json", function(err, data) {
    if (err) throw err;

    // Converting to JSON
    let books = JSON.parse(data);

    // Create the HTTP server
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        // Handle different HTTP methods
        switch (req.method) {
            case 'GET':
                if (req.url === '/api/books') {
                    // GET /books: Retrieve a list of all books
                    res.statusCode = 200;
                    res.end(JSON.stringify(books));
                } else if (req.url.startsWith('/api/books/')) {
                    // GET /books/:id: Retrieve a specific book by its ID
                    const id = parseInt(req.url.split('/')[3]);
                    const book = books.find(b => b.id === id);
                    if (book) {
                        res.statusCode = 200;
                        res.end(JSON.stringify(book));
                    } else {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 'Book not found' }));
                    }
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Endpoint not found' }));
                }
                break;
            case 'POST':
                if (req.url === '/api/books') {
                    // POST /books: Create a new book
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        const newBook = JSON.parse(body);
                        newBook.id = books.length + 1;
                        books.push(newBook);
                        saveBooks(books);
                        res.statusCode = 201;
                        res.end(JSON.stringify(newBook));
                    });
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Endpoint not found' }));
                }
                break;
            case 'PUT':
                if (req.url.startsWith('/api/books/')) {
                    // PUT /books/:id: Update an existing book by its ID
                    const id = parseInt(req.url.split('/')[3]);
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        const updatedBook = JSON.parse(body);
                        updatedBook.id = id;
                        const index = books.findIndex(b => b.id === id);
                        if (index !== -1) {
                            books[index] = updatedBook;
                            saveBooks(books);
                            res.statusCode = 200;
                            res.end(JSON.stringify(updatedBook));
                        } else {
                            res.statusCode = 404;
                            res.end(JSON.stringify({ error: 'Book not found' }));
                        }
                    });
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Endpoint not found' }));
                }
                break;
            case 'PATCH':
                if (req.url.startsWith('/api/books/')) {
                    // PATCH /books/:id: Partial update of an existing book by its ID
                    const id = parseInt(req.url.split('/')[3]);
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        const partialUpdate = JSON.parse(body);
                        const index = books.findIndex(b => b.id === id);
                        if (index !== -1) {
                            books[index] = { ...books[index], ...partialUpdate };
                            saveBooks(books);
                            res.statusCode = 200;
                            res.end(JSON.stringify(books[index]));
                        } else {
                            res.statusCode = 404;
                            res.end(JSON.stringify({ error: 'Book not found' }));
                        }
                    });
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Endpoint not found' }));
                }
                break;
            case 'DELETE':
                if (req.url.startsWith('/api/books/')) {
                    // DELETE /books/:id: Delete a book by its ID
                    const id = parseInt(req.url.split('/')[3]);
                    const index = books.findIndex(b => b.id === id);
                    if (index !== -1) {
                        const deletedBook = books.splice(index, 1)[0];
                        saveBooks(books);
                        res.statusCode = 200;
                        res.end(JSON.stringify(deletedBook));
                    } else {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 'Book not found' }));
                    }
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'Endpoint not found' }));
                }
                break;
            default:
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Endpoint not found' }));
        }
    });

    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });

    function saveBooks(data) {
        fs.writeFile("books.json", JSON.stringify(data, null, 2), (err) => {
            if (err) throw err;
            console.log('Books data saved to books.json');
        });
    }
});

