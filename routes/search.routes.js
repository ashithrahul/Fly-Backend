import { Router} from 'express';
import corsMiddleware from '../middleware/cors.middleware.js';
import { validateSearchQuery, sanitizeInput } from '../middleware/validation.middleware.js';
import { rateLimitSearch } from '../middleware/rateLimiting.middleware.js';
import SearchController from '../controllers/search.controller.js';
const searchController = new SearchController();

const router = Router();
router.use(corsMiddleware);
router.use(rateLimitSearch);

router.get(
  '/suggestions',
  [sanitizeInput, validateSearchQuery],
  (req, res) => searchController.getSuggestions(req, res)
);
 


router.get(
  '/search',
  [sanitizeInput, validateSearchQuery],
  (req, res) => searchController.searchDetails(req, res)
);


export default router;
