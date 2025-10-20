/**
this file responsible for defining the search-related routes for the Express application.
 */

import { Router} from 'express';
import corsMiddleware from '../middleware/cors.middleware.js';
import { validateSearchQuery, sanitizeInput } from '../middleware/validation.middleware.js';
import { rateLimitSearch } from '../middleware/rateLimiting.middleware.js';
import SearchController from '../controllers/search.controller.js';

const searchController = new SearchController();
const router = Router();

// Global Middleware used acrose all routes
router.use(corsMiddleware);        // CORS handling 
router.use(rateLimitSearch);       // Rate limiting 

// get request releated middleware added input sanitation and validation
router.get(
  '/suggestions',
  [sanitizeInput, validateSearchQuery],
  (req, res) => searchController.getSuggestions(req, res)
);
 


// get request releated middleware added input sanitation and validation
router.get(
  '/search',
  [sanitizeInput, validateSearchQuery],
  (req, res) => searchController.searchDetails(req, res)
);

export default router;
